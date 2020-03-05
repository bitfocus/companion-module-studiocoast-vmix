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

		this.socket.on('data', data => {
			data = data
				.toString()
				.split(/\r?\n/)
				.filter(text => text.startsWith('TALLY OK'));

			if (data[0]) {
				const tally = data[0].substring(9).split('');
				const newPreview = tally.indexOf('2') === -1 ? this.data.mix[0].preview : tally.indexOf('2') + 1;
				const newProgram = tally.indexOf('1') === -1 ? this.data.mix[0].program : tally.indexOf('1') + 1;
				const changes = [];

				if (newPreview !== this.data.mix[0].preview) {
					changes.push('inputPreview');
				}

				if (newProgram !== this.data.mix[0].program) {
					changes.push('inputLive');
				}

				this.data.mix[0].preview = newPreview;
				this.data.mix[0].program = newProgram;

				changes.forEach(change => {
					this.checkFeedbacks(change);
				});
			}
		});
	}
};
