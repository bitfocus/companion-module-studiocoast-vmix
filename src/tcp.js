const tcp = require('../../../tcp')
const { parseAPI } = require('./api')
const { parseActivactor } = require('./activators')

exports.init = function () {
	if (this.socket !== undefined) {
		this.socket.destroy()
		if (this.pollAPI) {
			clearInterval(this.pollAPI)
		}
		delete this.socket
	}

	// Notify the user at startup that they have disabled connection errors in the log
	if (this.config.errorLog == false) {
		this.log(
			'warn',
			'Network errors has been disabled and will not be shown in this Log. Please enabled them in the config if you want to see them again.'
		)
	}

	if (this.config.host) {
		this.socket = new tcp(this.config.host, this.config.tcpPort)

		this.socket.on('status_change', (status, message) => {
			this.status(status, message)
		})

		this.socket.on('error', (err) => {
			this.debug('Network error', err)
			this.status(this.STATE_ERROR, err)

			if (this.config.errorLog == true) {
				this.log('error', 'Network error: ' + err.message)
			}

			if (this.pollAPI) {
				clearInterval(this.pollAPI)
				delete this.pollAPI
			}
		})

		this.socket.on('connect', () => {
			this.status(this.STATE_OK)
			this.debug('Connected')

			if (this.config.apiPollInterval != 0) {
				this.socket.send('XML\r\n')
				this.socket.send('SUBSCRIBE ACTS\r\n')
				this.pollAPI = setInterval(
					() => {
						this.socket.send('XML\r\n')
					},
					this.config.apiPollInterval < 100 ? 100 : this.config.apiPollInterval
				)
			}
		})

		const processMessages = (message) => {
			// vMix XML data
			if (message.includes('<vmix>') && message.includes('</vmix>')) {
				const start = message.indexOf('<vmix>')
				const stop = message.indexOf('</vmix>') + 7

				parseAPI.bind(this)(message.slice(start, stop))
			}

			// Activators
			else if (message.includes('ACTS OK')) {
				parseActivactor.bind(this)(message.substr(8))
			}
		}

		let messageBuffer = ''
		let errorNotificationSent = false

		this.socket.on('data', (data) => {
			let i = 0,
				message = '',
				xmlBuffer = ''

			try {
				messageBuffer += data
			} catch (e) {
				if (errorNotificationSent === false) {
					this.log(
						'error',
						'Feedback data discarded due to buffer overload.  Try increasing the API Polling Interval.  This is a one-time message.'
					)
					errorNotificationSent = true
				}
				messageBuffer = ''
			}

			while ((i = messageBuffer.indexOf('\r\n')) !== -1) {
				message = messageBuffer.substr(0, i + 2)
				messageBuffer = messageBuffer.substr(i + 2)

				if (message.startsWith('<vmix>') || xmlBuffer.length > 0) {
					xmlBuffer += message
					if (xmlBuffer.includes('<vmix>') && xmlBuffer.includes('</vmix>')) {
						processMessages(xmlBuffer)
						xmlBuffer = ''
					}
				} else {
					processMessages(message)
				}
			}
		})
	}
}
