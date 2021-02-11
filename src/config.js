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
			type: 'checkbox',
			id: 'volumeLinear',
			label: 'Linear volume scale',
			width: 3,
			default: false,
		},
		{
			type: 'textinput',
			id: 'apiPollInterval',
			label: 'API Polling interval (ms) (default: 250, min: 100, 0 for disabled)',
			width: 12,
			default: 250,
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
		},
		{
			type: 'text',
			id: 't-barInfo',
			width: 12,
			label: 'T-bar',
			value: 'The module will listen to the variable $(internal:tbar) and when that value changes, it will send it to vMix'
		},
		{
			type: 'checkbox',
			id: 'tbarEnabled',
			width: 1,
			label: 'Enable',
			default: false
		},
		{
			type: 'number',
			id: 'tbarMin',
			width: 5,
			label: 'lower min value',
			default: 2,
			min: 0,
			max: 250
		},
		{
			type: 'number',
			id: 'tbarMax',
			width: 5,
			label: 'Upper max value',
			default: 253,
			min: 10,
			max: 255
		},
	];
};
