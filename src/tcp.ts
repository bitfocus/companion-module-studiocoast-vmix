import { InstanceStatus, TCPHelper as tcp } from '@companion-module/base'
import VMixInstance from './'

interface MessageBuffer {
  dataLength: number
  message: Buffer
}

interface TCPSockets {
  activator: tcp | null
  functions: tcp | null
  xml: tcp | null
}

export class TCP {
  private readonly instance: VMixInstance
  private messageBuffer: MessageBuffer = {
    dataLength: 0,
    message: Buffer.from(''),
  }
  private pingInterval: NodeJS.Timer | null = null
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

    if (this.pingInterval !== null) {
      clearInterval(this.pingInterval)
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
    if (this.tcpHost === undefined || this.tcpPort === undefined) {
      this.instance.log(
        'warn',
        `Unable to connect to vMix, please confugre a host and port in the instance configuration`
      )
      return
    }

    // The functions socket is primary and controls the module status and startup of activator and xml sockets
    this.sockets.functions = new tcp(this.tcpHost, this.tcpPort)

    this.sockets.functions.on('status_change', (status, message) => {
      this.instance.log('debug', `Function socket - Status: ${status}${message ? ' - Message: ' + message : ''}`)

      if (status === 'ok') {
        this.instance.connected = true
        this.instance.updateStatus(InstanceStatus.Ok)
        this.instance.variables?.updateVariables()
      } else if (status === 'connecting') {
        this.instance.connected = false
        this.instance.updateStatus(InstanceStatus.Connecting)
      } else if (status === 'disconnected') {
        this.instance.connected = false
        this.instance.updateStatus(InstanceStatus.Disconnected)
      } else if (status === 'unknown_error') {
        this.instance.connected = false
        this.instance.updateStatus(InstanceStatus.UnknownError)
      }
    })

    this.sockets.functions.on('error', (err: Error) => {
      this.instance.updateStatus(InstanceStatus.UnknownError)
      this.instance.log(
        this.instance.config.connectionErrorLog ? 'error' : 'debug',
        'Function Socket err: ' + err.message
      )
    })

    this.sockets.functions.on('connect', () => {
      this.instance.log('debug', 'Connected Function Socket')

      if (this.sockets.activator) {
        this.sockets.activator.destroy()
      }

      if (this.sockets.xml) {
        this.sockets.xml.destroy()
      }

      this.sockets.activator = new tcp(this.tcpHost, this.tcpPort)
      this.sockets.xml = new tcp(this.tcpHost, this.tcpPort)

      this.initActivators()
      this.initXML()
    })

    this.sockets.functions.on('data', (data: Buffer) => {
      const message = data.toString().split(/\r?\n/)

      if (message.includes('PING OK PONG')) {
        return
      }

      this.instance.log('debug', `Command Response: ${message}`)
    })

    if (this.pingInterval === null) {
      this.pingInterval = setInterval(() => {
        if (this.sockets.activator?.isConnected) this.sockets.activator?.send('PING\r\n')
        if (this.sockets.functions?.isConnected) this.sockets.functions?.send('PING\r\n')
      }, 3000)
    }
  }

  /**
   * @description Create connection and Listeners for Activator socket
   */
  private readonly initActivators = (): void => {
    this.sockets.activator?.on('error', (err: Error) => {
      this.instance.log('debug', 'ACT Socket err: ' + err.message)
    })

    this.sockets.activator?.on('connect', () => {
      this.instance.log('debug', 'Connected Activator Socket')

      this.sockets.activator?.send('SUBSCRIBE ACTS\r\n').catch((err) => {
        this.instance.log('debug', err.message)
      })
    })

    this.sockets.activator?.on('status_change', (status, message) => {
      this.instance.log('debug', `Activator socket - Status: ${status}${message ? ' - Message: ' + message : ''}`)
    })

    this.sockets.activator?.on('data', (data: Buffer) => {
      const messages = data.toString().split(/\r?\n/)

      messages.forEach((message) => {
        if (
          message.startsWith('VERSION') ||
          message.startsWith('SUBSCRIBE OK') ||
          message === 'PING OK PONG' ||
          message === ''
        ) {
          return
        } else if (message.startsWith('ACTS OK')) {
          if (this.instance.activators) this.instance.activators.parse(message.substr(8).trim())
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

    this.sockets.activator?.send(initialRequests.join('\r\n')).catch((err) => {
      this.instance.log('debug', err.message)
    })
  }

  /**
   * @description Create Listeners for XML and Command socket
   */
  private readonly initXML = (): void => {
    this.sockets.xml?.on('error', (err: Error) => {
      this.instance.log('debug', 'XML Socket err: ' + err.message)
    })

    this.sockets.xml?.on('connect', () => {
      this.instance.log('debug', 'Connected XML Socket')
      this.initXMLPolling()
    })

    this.sockets.activator?.on('status_change', (status, message) => {
      this.instance.log('debug', `XML socket - Status: ${status}${message ? ' - Message: ' + message : ''}`)
    })

    this.sockets.xml?.on('data', (data: Buffer) => {
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
          // Debugging for issue #159
          if (
            this.messageBuffer.message.toString().includes('<vmix>') &&
            this.messageBuffer.message.toString().includes('</vmix>')
          ) {
            const dataStart = this.messageBuffer.message.toString().indexOf('<vmix>')
            const dataStop = this.messageBuffer.message.toString().indexOf('</vmix>')

            if (dataStart !== -1 && dataStop !== -1) {
              const data = this.messageBuffer.message.toString().slice(dataStart, dataStop + 7)

              this.instance.log(
                'debug',
                `Message prefix issue - Message length: ${this.messageBuffer.message.length}, Buffer length: ${
                  this.messageBuffer.dataLength
                }, Full Message: ${this.messageBuffer.message.toString()}`
              )
              this.instance.data.update(data)
            }
          } else {
            this.instance.log('debug', `Unknown TCP message: ${message}`)
          }
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
      this.sockets.xml?.send('XML\r\n').catch((err) => {
        this.instance.log('debug', err.message)
      })

      this.pollAPI = setInterval(
        () => {
          if (this.sockets.xml?.isConnected)
            this.sockets.xml?.send('XML\r\n').catch((err) => {
              this.instance.log('debug', err.message)
            })
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
    if (this.sockets.functions && this.sockets.functions.isConnected) {
      const message = `${command}\r\n`

      this.instance.log('debug', `Sending command: ${message}`)

      this.sockets.functions.send(message).catch((err) => {
        if (err) this.instance.log('debug', err.message)
      })
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

      this.tcpHost = this.instance.config.host
      this.tcpPort = this.instance.config.tcpPort

      let ready = true

      // Protect against edge case of attempting to destroy a socket that's not in a state where it can be destroyed
      const destorySocket = (type: 'activator' | 'functions' | 'xml') => {
        const socket = this.sockets[type] as any
        if (socket && (socket.isConnected, socket.isConnected)) {
          socket.destroy()
        } else {
          if (socket !== null) {
            this.instance.log('debug', `vMix socket error: Cannot update connections while they're initializing`)
            ready = false
          }
        }
      }

      if (this.sockets.activator) destorySocket('activator')
      if (this.sockets.functions) destorySocket('functions')
      if (this.sockets.xml) destorySocket('xml')

      if (ready) this.init()
    } else if (pollIntervalCheck) {
      this.initXMLPolling()
    }
  }
}
