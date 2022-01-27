// @ts-expect-error: Could not find a declaration file for module
import tcp from '../../../tcp'
import VMixInstance from './'

interface MessageBuffer {
  dataLength: number
  message: Buffer
}

// OK, Warning, Error, Unknown
type TCPStatus = 0 | 1 | 2 | null

interface TCPSockets {
  activator: typeof tcp
  functions: typeof tcp
  xml: typeof tcp
}

export class TCP {
  private readonly instance: VMixInstance
  private messageBuffer: MessageBuffer = {
    dataLength: 0,
    message: Buffer.from(''),
  }
  private pollAPI: NodeJS.Timer | null = null
  private pollInterval = 250
  private sizeWarning = false
  private sockets: TCPSockets = {
    activator: null,
    functions: null,
    xml: null,
  }
  private tcpHost: string
  private tcpPort: number

  constructor(instance: VMixInstance) {
    this.instance = instance
    this.pollInterval = instance.config.apiPollInterval
    this.tcpHost = instance.config.host
    this.tcpPort = instance.config.tcpPort

    this.init()
  }

  /**
   * @description Close connection on instance disable/removal
   */
  public readonly destroy = (): void => {
    if (this.pollAPI !== null) {
      clearInterval(this.pollAPI)
    }

    if (this.sockets.activator) {
      this.sockets.activator.destroy()
    }

    if (this.sockets.functions) {
      this.sockets.functions.destroy()
    }

    if (this.sockets.xml) {
      this.sockets.xml.destroy()
    }
  }

  /**
   * @description Create a TCP connection to vMix and start API polling
   */
  public readonly init = (): void => {
    // The functions socket is primary and controls the module status and startup of activator and xml sockets
    this.sockets.functions = new tcp(this.tcpHost, this.tcpPort)

    this.sockets.functions.on('status_change', (status: TCPStatus, message: string) => {
      this.instance.status(status, message)
      this.instance.connected = status === 0
    })

    this.sockets.functions.on('error', (err: Error) => {
      this.instance.status(this.instance.STATUS_ERROR, err.message)
      this.instance.log('error', 'Function Socket err: ' + err.message)
    })

    this.sockets.functions.on('connect', () => {
      this.instance.status(0)
      this.instance.log('debug', 'Connected Function Socket')

      this.sockets.activator = new tcp(this.tcpHost, this.tcpPort)
      this.sockets.xml = new tcp(this.tcpHost, this.tcpPort)

      this.initActivators()
      this.initXML()
    })

    this.sockets.functions.on('data', (data: Buffer) => {
      const message = data.toString().split(/\r?\n/)
      this.instance.log('debug', `Command Response: ${message}`)
    })
  }

  /**
   * @description Create connection and Listeners for Activator socket
   */
  private readonly initActivators = (): void => {
    this.sockets.activator.on('error', (err: Error) => {
      this.instance.log('error', 'ACT Socket err: ' + err.message)
    })

    this.sockets.activator.on('connect', () => {
      this.instance.log('debug', 'Connected Activator Socket')
      this.sockets.activator.send('SUBSCRIBE ACTS\r\n')
    })

    this.sockets.activator.on('data', (data: Buffer) => {
      const messages = data.toString().split(/\r?\n/)

      messages.forEach((message) => {
        if (message.startsWith('VERSION') || message.startsWith('SUBSCRIBE OK') || message === '') {
          return
        } else if (message.startsWith('ACTS OK')) {
          this.instance.activators.parse(message.substr(8).trim())
        } else {
          this.instance.log('debug', `Unknown activator message: ${message}`)
        }
      })
    })
  }

  /**
   * @description Request initial Activator data
   */
  public readonly initActivatorData = (): void => {
    const initialRequests = [
      'ACTS BusASolo',
      'ACTS BusBSolo',
      'ACTS BusCSolo',
      'ACTS BusDSolo',
      'ACTS BusESolo',
      'ACTS BusFSolo',
      'ACTS BusGSolo',
    ]

    this.sockets.activator.send(initialRequests.join('\r\n'))
  }

  /**
   * @description Create Listeners for XML and Command socket
   */
  private readonly initXML = (): void => {
    this.sockets.xml.on('error', (err: Error) => {
      this.instance.log('error', 'XML Socket err: ' + err.message)

      if (this.sockets.xml) {
        this.sockets.xml.destroy()
      }
    })

    this.sockets.xml.on('connect', () => {
      this.instance.log('debug', 'Connected XML Socket')
      this.initXMLPolling()
    })

    this.sockets.xml.on('data', (data: Buffer) => {
      const splitData = data.toString().split(/\r?\n/)

      // Ignore version message on connection establishment
      if (data.toString().startsWith('VERSION')) {
        return
      }

      if (data.toString().startsWith('XML')) {
        this.messageBuffer.dataLength = parseInt(splitData[0].split(' ')[1], 10)
        this.messageBuffer.message = data

        // If XML data is larger than 2 full TCP messages (8KB per message) send a warning
        if (!this.sizeWarning && this.messageBuffer.dataLength > 131072) {
          this.sizeWarning = true
          this.instance.log('warn', 'Large vMix XML data size!')
        }
      } else {
        this.messageBuffer.message = Buffer.concat([this.messageBuffer.message, data])
      }

      if (this.messageBuffer.message.length >= this.messageBuffer.dataLength) {
        // Strip message prefix and any trailing new lines/whitespace
        const prefixLength = this.messageBuffer.message.length - this.messageBuffer.dataLength
        const message = this.messageBuffer.message.slice(prefixLength).toString().trim()

        if (message.startsWith('<vmix>') && message.endsWith('</vmix>')) {
          this.instance.data.update(message)
        } else {
          this.instance.log('debug', `Unknown TCP message: ${message}`)
        }
      }
    })
  }

  /**
   * @description Start polling for API data and subscribe to activator changes
   */
  public readonly initXMLPolling = (): void => {
    if (this.pollAPI !== null) {
      clearInterval(this.pollAPI)
    }

    // Check if API Polling is disabled
    if (this.instance.config.apiPollInterval != 0) {
      this.sockets.xml.send('XML\r\n')

      this.pollAPI = setInterval(
        () => {
          if (this.sockets.xml.connected) this.sockets.xml.send('XML\r\n')
        },
        this.instance.config.apiPollInterval < 100 ? 100 : this.instance.config.apiPollInterval
      )
    }
  }

  /**
   * @param command function and any params
   * @description Check TCP connection status and format command to send to vMix
   */
  public readonly sendCommand = (command: string): void => {
    if (this.sockets.functions && this.sockets.functions.connected) {
      const message = `${command}\r\n`

      this.sockets.functions.send(message)
      this.instance.log('debug', `Sending command: ${message}`)
    }
  }

  /**
   * @description Check for config changes and start new connections/polling if needed
   */
  public readonly update = (): void => {
    const hostCheck = this.instance.config.host !== this.tcpHost || this.instance.config.tcpPort !== this.tcpPort
    const pollIntervalCheck = this.instance.config.apiPollInterval !== this.pollInterval

    if (hostCheck) {
      if (this.pollAPI !== null) {
        clearInterval(this.pollAPI)
      }

      if (this.sockets.activator && this.sockets.activator.connected) {
        this.sockets.activator.close()
      }

      if (this.sockets.functions && this.sockets.functions.connected) {
        this.sockets.functions.close()
      }

      if (this.sockets.xml && this.sockets.xml.connected) {
        this.sockets.xml.close()
      }

      this.init()
    } else if (pollIntervalCheck) {
      this.initXMLPolling()
    }
  }
}
