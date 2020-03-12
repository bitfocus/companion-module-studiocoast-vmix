const tcp = require('../../../tcp');

exports.init = function() {
	if (this.socket !== undefined) {
		this.socket.destroy();
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
			this.socket.send('SUBSCRIBE TALLY\r\n');
		});
	}
};
