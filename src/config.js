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
			id: 'tcpPort',
			label: 'TCP Port (Default: 8099)',
			width: 3,
			default: 8099,
			regex: this.REGEX_PORT
		},
		{
			type: 'textinput',
			id: 'apiPollInterval',
			label: 'API Polling interval (ms) (default: 250, min: 100, 0 for disabled)',
			width: 12,
			default: 500,
			regex: this.REGEX_NUMBER
		},
		{
      type: 'text',
      id: 'apiPollInfo',
      width: 12,
      label: 'API Poll Interval warning',
      value:
        'Adjusting the API Polling Interval can impact performance. <br />' +
        'A lower invterval allows for more responsive feedback, but may impact CPU usage. <br />' +
        'See the help section for more details.' 
    }
	];
};
