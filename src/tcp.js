const tcp = require('../../../tcp');
const { parseAPI } = require('./api');

exports.init = function() {
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

			this.pollAPI = setInterval(() => {
				this.socket.send('XML\r\n');
			}, this.config.apiPollInterval < 100 ? 100 : this.config.apiPollInterval);
		});

		this.socket.on('data', data => {
			data = data.toString();

			if (data.includes('<vmix>')) {
				const start = data.indexOf('<vmix>');
				const stop = data.indexOf('</vmix>') + 7;

				parseAPI.bind(this)(data.slice(start, stop));
			}
		});
	}
};
