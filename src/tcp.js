const tcp = require('../../../tcp');
const { parseAPI } = require('./api');

exports.init = function () {
	if (this.socket !== undefined) {
		this.socket.destroy();
		if (this.pollAPI) {
			clearInterval(this.pollAPI);
		}
		delete this.socket;
	}

	if (this.config.host) {
		this.socket = new tcp(this.config.host, this.config.tcpPort);

		this.socket.on('status_change', (status, message) => {
			this.status(status, message);
		});

		this.socket.on('error', err => {
			this.debug('Network error', err);
			this.status(this.STATE_ERROR, err);
			this.log('error', 'Network error: ' + err.message);
		});

		this.socket.on('connect', () => {
			this.status(this.STATE_OK);
			this.debug('Connected');

			if (this.config.apiPollInterval != 0) {
				this.socket.send('XML\r\n');
				this.pollAPI = setInterval(() => {
					this.socket.send('XML\r\n');
				}, this.config.apiPollInterval < 100 ? 100 : this.config.apiPollInterval);
			}
		});


		const processMessages = (message) => {

			// vMix XML data
			if (message.includes('<vmix>') && message.includes('</vmix>')) {
				const start = message.indexOf('<vmix>');
				const stop = message.indexOf('</vmix>') + 7;

				parseAPI.bind(this)(message.slice(start, stop));
			}
		};
		
		let messageBuffer = '';
		this.socket.on('data', data => {
			messageBuffer += data.toString();

			if (messageBuffer.endsWith('\r\n')) {
				let xmlBuffer = '';

				messageBuffer.split('\r\n')
					.filter(message => message != '')
					.forEach(message => {
						// Check if fragment is XML data
						if (message.startsWith('<vmix>') || xmlBuffer.length > 0) {
							xmlBuffer += message;
							if (xmlBuffer.includes('<vmix>') && xmlBuffer.includes('</vmix>')) {
								processMessages(xmlBuffer);
								xmlBuffer = '';
							}
						} else {
							processMessages(message);
						}
					});

				messageBuffer = '';
			}
		});
	}
};
