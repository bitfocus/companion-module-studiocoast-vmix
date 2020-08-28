exports.getConfigFields = function () {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 6,
			default: '127.0.0.1',
			regex: this.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'httpPort',
			label: 'HTTP Port (Default: 8088)',
			width: 3,
			default: 8088,
			regex: this.REGEX_PORT
		},
		{
			type: 'textinput',
			id: 'tcpPort',
			label: 'TCP Port (Default: 8099)',
			width: 3,
			default: 8099,
			regex: this.REGEX_PORT
		},
		{
			type: 'textinput',
			id: 'apiPollInterval',
			label: 'API Polling interval (ms) (default: 100, 0 for disabled)',
			width: 6,
			default: 100,
			regex: this.REGEX_NUMBER
		}
	];
};
