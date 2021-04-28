exports.getConfigFields = function () {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 6,
			default: '127.0.0.1',
			regex: this.REGEX_IP,
		},
		{
			type: 'textinput',
			id: 'tcpPort',
			label: 'TCP Port (Default: 8099)',
			width: 6,
			default: 8099,
			regex: this.REGEX_PORT,
		},
		{
			type: 'text',
			id: 'tcpInfo',
			width: 12,
			label: 'TCP port vs HTTP port in vMix',
			value:
				'Please <b>only</b> change the TCP port if you know what it does. <br />' +
				"The TCP port in vMix is locked as default to port: 8099 and <b>can't</b> be changed by the user. <br />" +
				'But some users have requested this functionality as it enables proxying/port remapping <br />' +
				'from AWS instances and similar VM setups. <br />' +
				"The HTTP port that can be changed in vMix isn't used in Companion 2.2.0 and above.",
		},
		{
			type: 'textinput',
			id: 'apiPollInterval',
			label: 'API Polling interval (ms) (default: 250, min: 100, 0 for disabled)',
			width: 12,
			default: 250,
			regex: this.REGEX_NUMBER,
		},
		{
			type: 'text',
			id: 'apiPollInfo',
			width: 12,
			label: 'API Poll Interval warning',
			value:
				'Adjusting the API Polling Interval can impact performance. <br />' +
				'A lower invterval allows for more responsive feedback, but may impact CPU usage. <br />' +
				'See the help section for more details.',
		},
		{
			type: 'checkbox',
			id: 'errorLog',
			label: 'Enable',
			width: 1,
			default: true,
		},
		{
			type: 'text',
			id: 'errorInfo',
			width: 11,
			label: 'Log connection errors to log. (Default: Enabled)',
			value: 'Disabling this can help with clutter in the Log when vMix is closed.',
		},
		{
			type: 'checkbox',
			id: 'volumeLinear',
			label: 'Enable',
			width: 1,
			default: false,
		},
		{
			type: 'text',
			id: 'linearScaleInfo',
			width: 11,
			label: 'Linear volume scale. (Default: Disabled)',
			value: 'Enable linear volume scale instead of an exponential scale.',
		},
		{
			type: 'text',
			id: 't-barInfo',
			width: 12,
			label: 'T-bar',
			value:
				'The module will listen to the variable $(internal:tbar) and when that value changes, it will send it to vMix',
		},
		{
			type: 'checkbox',
			id: 'tbarEnabled',
			width: 1,
			label: 'Enable',
			default: false,
		},
		{
			type: 'number',
			id: 'tbarMin',
			width: 5,
			label: 'lower min value',
			default: 2,
			min: 0,
			max: 250,
		},
		{
			type: 'number',
			id: 'tbarMax',
			width: 5,
			label: 'Upper max value',
			default: 253,
			min: 10,
			max: 255,
		},
	]
}
