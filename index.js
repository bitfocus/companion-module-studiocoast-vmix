var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions
	self.init_presets();

	self.tally = [];

	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;
	self.init_presets();

	self.config = config;
	self.init_tcp();
	self.actions();

};

instance.prototype.init = function() {
	var self = this;

	debug = self.debug;
	log = self.log;
	self.init_presets();

	self.status(1,'Connecting'); // status ok!

	self.init_tcp();
	self.init_feedbacks();
};

instance.prototype.init_tcp = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
		delete self.socket;
	}

	if (self.config.host) {
		self.socket = new tcp(self.config.host, self.config.port);

		self.socket.on('status_change', function (status, message) {
			self.status(status, message);
		});

		self.socket.on('error', function (err) {
			debug("Network error", err);
			self.status(self.STATE_ERROR, err);
			self.log('error',"Network error: " + err.message);
		});

		self.socket.on('connect', function () {
			self.status(self.STATE_OK);
			debug("Connected");

			// Subscribe to TALLY events
			self.socket.send('SUBSCRIBE TALLY\r\n');
		})

		self.socket.on('data', function (data) {
			data = data.toString();
			if (data.startsWith('TALLY OK')) {
				self.tally = data.substring(9, data.length-2).split('');
				self.checkFeedbacks('input_preview');
				self.checkFeedbacks('input_live');
			}
		});
	}
};


// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 5,
			default: '127.0.0.1',
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Target Port (Default: 8099)',
			width: 3,
			default: 8099,
			regex: self.REGEX_PORT
		},
		{
			type: 'dropdown',
			id: 'inputType',
			label: 'Input definition type:',
			width: 4,
			default: 'id',
			choices: [
				{ id: 'id', 		label: 'Input as ID (Number)' },
				{ id: 'title', 	label: 'Input as Title (Text)' }
			]
		}
	]
};

instance.prototype.CHOICES_COMMANDS = [
	{ id: 'quickPlay',				size: '18', label: 'Quick Play' },
	{ id: 'pgmSel',						size: '18', label: 'PGM Select' },
	{ id: 'prwSel',						size: '18', label: 'PRW Select' },
	{ id: 'prwNext',					size: '18', label: 'PRW Next' },
	{ id: 'prwPrv',						size: '18', label: 'PRW Prev' },
	{ id: 'nextPicture',			size: '18', label: 'Next Photo' },
	{ id: 'previousPicture',	size: '18', label: 'Prev Photo' },
	{ id: 'keyPress',					size: '18', label: 'Send Key Press' },
	{ id: 'scriptStart',			size: '18', label: 'Script Start' },
	{ id: 'scriptStop',				size: '18', label: 'Script Stop' },
	{ id: 'scriptStopAll',		size: '14', label: 'Script Stop All' },
	{ id: 'command',					size: '14', label: 'Custom Command' },
];

instance.prototype.CHOICES_COMMANDS_AUTO_TRANS = [
	{ id: 'Transition1',	size: '18', label: 'Trans 1' },
	{ id: 'Transition2',	size: '18', label: 'Trans 2' },
	{ id: 'Transition3',	size: '18', label: 'Trans 3' },
	{ id: 'Transition4',	size: '18', label: 'Trans 4' },
	{ id: 'Stinger1',			size: '18', label: 'Stinger 1' },
	{ id: 'Stinger2',			size: '18', label: 'Stinger 2' },
];

instance.prototype.CHOICES_COMMANDS_TOGGLES = [
	{ id: 'StartStopMultiCorder',	size: '18', label: 'Toggle Multi' },
	{ id: 'StartStopRecording',		size: '18', label: 'Toggle Rec' },
	{ id: 'StartStopStreaming',		size: '18', label: 'Toggle Stream' },
	{ id: 'StartStopExternal',		size: '18', label: 'Toggle Ext' },
	{ id: 'Fullscreen',						size: '18', label: 'Toggle Full' },
	{ id: 'FadeToBlack',					size: '18', label: 'Toggle FTB' },
];

instance.prototype.CHOICES_COMMANDS_OUTPUT_SOURCE = [
	{ id: 'SetOutput2',						size: '18', label: 'Out 2 = ' },
	{ id: 'SetOutput3',						size: '18', label: 'Out 3 = ' },
	{ id: 'SetOutput4',						size: '18', label: 'Out 4 = ' },
	{ id: 'SetOutputExternal2',		size: '18', label: 'Ext = ' },
	{ id: 'SetOutputFullscreen',	size: '18', label: 'Full 1 = ' },
	{ id: 'SetOutputFullscreen2',	size: '18', label: 'Full 2 = ' },
];

instance.prototype.CHOICES_COMMANDS_OUTPUT_SOURCE_TYPE = [
	{ id: 'Output',			short: 'PGM' },
	{ id: 'Preview',		short: 'Prev' },
	{ id: 'MultiView',	short: 'Multi' },
	{ id: 'Input',			short: 'In' },
];

instance.prototype.CHOICES_COMMANDS_PLAYLIST = [
	{ id: 'StartPlayList',					size: '18', label: 'Playlist Start' },
	{ id: 'StopPlayList',						size: '18', label: 'Playlist Stop' },
	{ id: 'NextPlayListEntry',			size: '18', label: 'Playlist Next' },
	{ id: 'PreviousPlayListEntry',	size: '18', label: 'Playlist Prev' },
];

instance.prototype.CHOICES_COMMANDS_OVERLAY_FUNCTIONS = [
	{ id: 'OverlayInput1',				size: '18', label: 'PGM OVL 1' },
	{ id: 'OverlayInput2',				size: '18', label: 'PGM OVL 2' },
	{ id: 'OverlayInput3',				size: '18', label: 'PGM OVL 3' },
	{ id: 'OverlayInput4',				size: '18', label: 'PGM OVL 4' },
	{ id: 'PreviewOverlayInput1',	size: '18', label: 'PREW OVL 1' },
	{ id: 'PreviewOverlayInput2',	size: '18', label: 'PREW OVL 2' },
	{ id: 'PreviewOverlayInput3',	size: '18', label: 'PREW OVL 3' },
	{ id: 'PreviewOverlayInput4',	size: '18', label: 'PREW OVL 4' },
	{ id: 'OverlayInput1In',      size: '14', label: 'Tran OVL 1 ON'},
	{ id: 'OverlayInput2In',      size: '14', label: 'Tran OVL 2 ON'},
	{ id: 'OverlayInput3In',      size: '14', label: 'Tran OVL 3 ON'},
	{ id: 'OverlayInput4In',      size: '14', label: 'Tran OVL 4 ON'},
	{ id: 'OverlayInput1Out',     size: '14', label: 'Tran OVL 1 OFF'},
	{ id: 'OverlayInput2Out',     size: '14', label: 'Tran OVL 2 OFF'},
	{ id: 'OverlayInput3Out',     size: '14', label: 'Tran OVL 3 OFF'},
	{ id: 'OverlayInput4Out',     size: '14', label: 'Tran OVL 4 OFF'},
	{ id: 'OverlayInput1Off',     size: '18', label: 'Set OVL 1 OFF'},
	{ id: 'OverlayInput2Off',     size: '18', label: 'Set OVL 2 OFF'},
	{ id: 'OverlayInput3Off',     size: '18', label: 'Set OVL 3 OFF'},
	{ id: 'OverlayInput4Off',     size: '18', label: 'Set OVL 4 OFF'},
	{ id: 'OverlayInputAllOff',		size: '14', label: 'Set All OVL OFF'},
	{ id: 'OverlayInput1Zoom',    size: '18', label: 'PIP OVL 1 Z/F'},
	{ id: 'OverlayInput2Zoom',    size: '18', label: 'PIP OVL 2 Z/F'},
	{ id: 'OverlayInput3Zoom',    size: '18', label: 'PIP OVL 3 Z/F'},
	{ id: 'OverlayInput4Zoom',    size: '18', label: 'PIP OVL 4 Z/F'},
]

instance.prototype.CHOICES_COMMANDS_VOLUME = [
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 0%', 	volume: '0' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 10%', 	volume: '10' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 20%', 	volume: '20' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 30%', 	volume: '30' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 40%', 	volume: '40' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 50%', 	volume: '50' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 60%', 	volume: '60' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 70%', 	volume: '70' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 80%',	volume: '80' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 90%',	volume: '90' },
	{ id: 'volumeFade',		size: '18', label: 'In 1 Vol 100%',	volume: '100' },
];

instance.prototype.CHOICES_COMMANDS_COUNTDOWN_1 = [
	{ id: 'startCountdown',		size: '18', label: 'CND Start' },
	{ id: 'stopCountdown',		size: '18', label: 'CND Stop' },
];

instance.prototype.CHOICES_COMMANDS_COUNTDOWN_2 = [
	{ id: 'setCountdownTime',	size: '18', label: 'CND 0 sec',		time: '00:00:00' },
	{ id: 'setCountdownTime',	size: '18', label: 'CND 10 sec',	time: '00:00:10' },
	{ id: 'setCountdownTime',	size: '18', label: 'CND 30 sec',	time: '00:00:30' },
	{ id: 'setCountdownTime',	size: '18', label: 'CND 60 sec',	time: '00:01:00' },
	{ id: 'setCountdownTime',	size: '18', label: 'CND 120 sec',	time: '00:02:00' },
];

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [];
/*
		presets.push({
			category: 'Commands',
			label: self.CHOICES_COMMANDS[input].label,
			bank: {
				style: 'text',
				text: self.CHOICES_COMMANDS[input].label,
				size: pstSize_medium,
				color: '16777215',
				bgcolor: 0
			},
			actions: [{
				action: self.CHOICES_COMMANDS[input].id,
				options: {
					id: self.CHOICES_COMMANDS[input].value,
				}
			}]
		});
*/
	for (var input in self.CHOICES_COMMANDS) {
		presets.push({
			category: 'Commands',
			label: self.CHOICES_COMMANDS[input].label,
			bank: {
				style: 'text',
				text: self.CHOICES_COMMANDS[input].label,
				size: self.CHOICES_COMMANDS[input].size,
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [{
				action: self.CHOICES_COMMANDS[input].id,
			}]
		})
	}

	for (var input in self.CHOICES_COMMANDS_AUTO_TRANS) {
		presets.push({
			category: 'Auto Transition',
			label: self.CHOICES_COMMANDS_AUTO_TRANS[input].label,
			bank: {
				style: 'text',
				text: self.CHOICES_COMMANDS_AUTO_TRANS[input].label,
				size: self.CHOICES_COMMANDS_AUTO_TRANS[input].size,
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [{
				action: 'transition',
				options: {
					toggleID: self.CHOICES_COMMANDS_AUTO_TRANS[input].id
				}
			}]
		})
	}

	for (var input in self.CHOICES_COMMANDS_TOGGLES) {
		presets.push({
			category: 'Toggle Functions',
			label: self.CHOICES_COMMANDS_TOGGLES[input].label,
			bank: {
				style: 'text',
				text: self.CHOICES_COMMANDS_TOGGLES[input].label,
				size: self.CHOICES_COMMANDS_TOGGLES[input].size,
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [{
				action: 'toggle_functions',
				options: {
					toggleID: self.CHOICES_COMMANDS_TOGGLES[input].id
				}
			}]
		})
	}

	for (var input in self.CHOICES_COMMANDS_OUTPUT_SOURCE) {
		for (var x in self.CHOICES_COMMANDS_OUTPUT_SOURCE_TYPE) {
			presets.push({
				category: 'Output Source',
				label: self.CHOICES_COMMANDS_OUTPUT_SOURCE[input].label + self.CHOICES_COMMANDS_OUTPUT_SOURCE_TYPE[x].short,
				bank: {
					style: 'text',
					text: self.CHOICES_COMMANDS_OUTPUT_SOURCE[input].label + self.CHOICES_COMMANDS_OUTPUT_SOURCE_TYPE[x].short,
					size: self.CHOICES_COMMANDS_OUTPUT_SOURCE[input].size,
					color: '16777215',
					bgcolor: self.rgb(0,0,0)
				},
				actions: [{
					action: 'outputSet',
					options: {
						outputId: self.CHOICES_COMMANDS_OUTPUT_SOURCE[input].id,
						outputType: self.CHOICES_COMMANDS_OUTPUT_SOURCE_TYPE[x].id
					}
				}]
			})
		}
	}

	for (var input in self.CHOICES_COMMANDS_PLAYLIST) {
		presets.push({
			category: 'Playlist',
			label: self.CHOICES_COMMANDS_PLAYLIST[input].label,
			bank: {
				style: 'text',
				text: self.CHOICES_COMMANDS_PLAYLIST[input].label,
				size: self.CHOICES_COMMANDS_PLAYLIST[input].size,
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [{
				action: 'playList_Functions',
				options: {
					plfId: self.CHOICES_COMMANDS_PLAYLIST[input].id
				}
			}]
		})
	}

	presets.push({
		category: 'Playlist',
		label: 'Playlist Open',
		bank: {
			style: 'text',
			text: 'Playlist Open',
			size: '18',
			color: '16777215',
			bgcolor: self.rgb(0,0,0)
		},
		actions: [{
			action: 'open_pl'
		}]
	})

	for (var input in self.CHOICES_COMMANDS_OVERLAY_FUNCTIONS) {
		presets.push({
			category: 'Overlays',
			label: self.CHOICES_COMMANDS_OVERLAY_FUNCTIONS[input].label,
			bank: {
				style: 'text',
				text: self.CHOICES_COMMANDS_OVERLAY_FUNCTIONS[input].label,
				size: self.CHOICES_COMMANDS_OVERLAY_FUNCTIONS[input].size,
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [{
				action: 'overlayFunctions',
				options: {
					overlayFunc: self.CHOICES_COMMANDS_OVERLAY_FUNCTIONS[input].id,
				}
			}]
		})
	}

	for (var input in self.CHOICES_COMMANDS_VOLUME) {
		presets.push({
			category: 'Input Volume',
			label: self.CHOICES_COMMANDS_VOLUME[input].label,
			bank: {
				style: 'text',
				text: self.CHOICES_COMMANDS_VOLUME[input].label,
				size: self.CHOICES_COMMANDS_VOLUME[input].size,
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [{
				action: self.CHOICES_COMMANDS_VOLUME[input].id,
				options: {
					fade_Min: self.CHOICES_COMMANDS_VOLUME[input].volume
				}
			}]
		})
	}

	for (var input in self.CHOICES_COMMANDS_COUNTDOWN_1) {
		presets.push({
			category: 'Countdown',
			label: self.CHOICES_COMMANDS_COUNTDOWN_1[input].label,
			bank: {
				style: 'text',
				text: self.CHOICES_COMMANDS_COUNTDOWN_1[input].label,
				size: self.CHOICES_COMMANDS_COUNTDOWN_1[input].size,
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [{
				action: self.CHOICES_COMMANDS_COUNTDOWN_1[input].id,
			}]
		})
	}

	for (var input in self.CHOICES_COMMANDS_COUNTDOWN_2) {
		presets.push({
			category: 'Countdown',
			label: self.CHOICES_COMMANDS_COUNTDOWN_2[input].label,
			bank: {
				style: 'text',
				text: self.CHOICES_COMMANDS_COUNTDOWN_2[input].label,
				size: self.CHOICES_COMMANDS_COUNTDOWN_2[input].size,
				color: '16777215',
				bgcolor: self.rgb(0,0,0)
			},
			actions: [{
				action: self.CHOICES_COMMANDS_COUNTDOWN_2[input].id,
				options: {
					set: self.CHOICES_COMMANDS_COUNTDOWN_2[input].time
				}
			}]
		})
	}

	self.setPresetDefinitions(presets);
}

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
	}

	debug("destroy", self.id);
};


instance.prototype.actions = function(system) {
	var self = this;
	var regex_type = '';

	switch(self.config.inputType){

		case 'id':
			regex_type = self.REGEX_NUMBER;
			break;

		case 'title':
			regex_type = '';
			break;

	};

	self.system.emit('instance_actions', self.id, {

		'quickPlay': {
			label: 'Quick Play input to Program',
			options: [
				{
					type: 'textinput',
					label: 'Input',
					id: 'pgmId',
					regex: regex_type
				}
			]
		},
		'pgmSel': {
			label: 'Send Input to Program',
			options: [
				{
					type: 'textinput',
					label: 'Input',
					id: 'pgmId',
					regex: regex_type
				}
			]
		},
		'prwSel': {
			label: 'Send Input to Preview',
			options: [
				{
					type: 'textinput',
					label: 'Input',
					id: 'prwId',
					regex: regex_type
				}
			]
		},

		'prwNext': { label: 'Send Next input to Preview'},
		'prwPrv':  { label: 'Send Previous input to Preview'},

		'transition': {
			label: 'Auto Transition',
			options: [
				{
					type: 'dropdown',
					label: 'Select transition',
					id: 'transId',
					choices: [
						{ id: 'Transition1', label: 'Transition 1'},
						{ id: 'Transition2', label: 'Transition 2'},
						{ id: 'Transition3', label: 'Transition 3'},
						{ id: 'Transition4', label: 'Transition 4'},
						{ id: 'Stinger1',    label: 'Stinger 1'},
						{ id: 'Stinger2',    label: 'Stinger 2'}
					]
				}
			]
		},
		'toggle_functions': {
			label: 'Toggle Functions',
			options: [
				{
					type: 'dropdown',
					label: 'Toggle Function',
					id: 'toggleID',
					choices: [
						{ id: 'StartStopMultiCorder', label: 'Start / Stop MultCorder'},
						{ id: 'StartStopRecording',   label: 'Start / Stop Recording'},
						{ id: 'StartStopStreaming',   label: 'Start / Stop Stream'},
						{ id: 'StartStopExternal',    label: 'Start / Stop External'},
						{ id: 'Fullscreen',           label: 'Start / Stop Fullscreen'},
						{ id: 'FadeToBlack',          label: 'Fade To Black'}
					]
				}
			]
		},
		'playList_Functions': {
			label: 'PlayList Functions',
			options: [
				{
					type: 'dropdown',
					label: 'Playlist Function',
					id: 'plfId',
					choices: [
						{ id: 'StartPlayList',          label: 'Start Play List'},
						{ id: 'StopPlayList',           label: 'Stop Play List'},
						{ id: 'NextPlayListEntry',      label: 'Next Item in Play List'},
						{ id: 'PreviousPlayListEntry',   label: 'Previous Item in Play List'}
					]
				}
			]
		},
		'open_pl': {
			label: 'Open Playlist',
			options: [
				{
					type: 'textinput',
					label: 'Playlist name',
					id: 'plName'
				}
			]
		},
		'overlayFunctions': {
			label: 'Overlay Functions',
			options: [
				{
					type: 'dropdown',
					label: 'Select Overlay Function',
					id: 'overlayFunc',
					choices: [
						{ id: 'OverlayInput1',     				label: 'Toggle Overlay 1 on program'},
						{ id: 'OverlayInput2',     				label: 'Toggle Overlay 2 on program'},
						{ id: 'OverlayInput3',     				label: 'Toggle Overlay 3 on program'},
						{ id: 'OverlayInput4',     				label: 'Toggle Overlay 4 on program'},
						{ id: 'PreviewOverlayInput1',     label: 'Toggle Overlay 1 on preview'},
						{ id: 'PreviewOverlayInput2',     label: 'Toggle Overlay 2 on preview'},
						{ id: 'PreviewOverlayInput3',     label: 'Toggle Overlay 3 on preview'},
						{ id: 'PreviewOverlayInput4',     label: 'Toggle Overlay 4 on preview'},
						{ id: 'OverlayInput1In',      		label: 'Transition Overlay 1 on'},
						{ id: 'OverlayInput2In',      		label: 'Transition Overlay 2 on'},
						{ id: 'OverlayInput3In',      		label: 'Transition Overlay 3 on'},
						{ id: 'OverlayInput4In',      		label: 'Transition Overlay 4 on'},
						{ id: 'OverlayInput1Out',     		label: 'Transition Overlay 1 off'},
						{ id: 'OverlayInput2Out',     		label: 'Transition Overlay 2 off'},
						{ id: 'OverlayInput3Out',     		label: 'Transition Overlay 3 off'},
						{ id: 'OverlayInput4Out',     		label: 'Transition Overlay 4 off'},
						{ id: 'OverlayInput1Off',     		label: 'Set Overlay 1 off'},
						{ id: 'OverlayInput2Off',     		label: 'Set Overlay 2 off'},
						{ id: 'OverlayInput3Off',     		label: 'Set Overlay 3 off'},
						{ id: 'OverlayInput4Off',     		label: 'Set Overlay 4 off'},
						{ id: 'OverlayInputAllOff',				label: 'Set All Overlays off'},
						{ id: 'OverlayInput1Zoom',    		label: 'Zoom PIP Overlay 1 to/from fulscreen'},
						{ id: 'OverlayInput2Zoom',    		label: 'Zoom PIP Overlay 2 to/from fulscreen'},
						{ id: 'OverlayInput3Zoom',    		label: 'Zoom PIP Overlay 3 to/from fulscreen'},
						{ id: 'OverlayInput4Zoom',    		label: 'Zoom PIP Overlay 4 to/from fulscreen'},
					]
				},
				{
					type: 'textinput',
					label: 'Input',
					id: 'inputId',
					regex: regex_type
				}
			]
		},
		'outputSet': {
			label: 'Set Output Source',
			options: [
				{
					type: 'dropdown',
					label: 'Select Output',
					id: 'outputId',
					choices: [
						{ id: 'SetOutput2',     label: 'Output 2'},
						{ id: 'SetOutput3',     label: 'Output 3'},
						{ id: 'SetOutput4',     label: 'Output 4'},
						{ id: 'SetOutputExternal2',			label: 'Output External 2'},
						{ id: 'SetOutputFullscreen',	 	label: 'Output Fullscreen 1'},
						{ id: 'SetOutputFullscreen2',		label: 'Output Fullscreen 2'},
					]
				},
				{
					type: 'dropdown',
					label: 'Select Input Type',
					id: 'outputType',
					choices: [
						{ id: 'Output',					label: 'Output (Porgram)'},
						{ id: 'Preview',				label: 'Preview'},
						{ id: 'MultiView',			label: 'Multiview'},
						{ id: 'Input',					label: 'Input'}
					]
				},
				{
					type: 'textinput',
					label: 'Input',
					id: 'outputInputId',
					regex: regex_type
				},
			]
		},
		'volumeFade': {
			label: 'Set Volume Fade',
			options: [
				{
					type: 'textinput',
					label: 'Fade to volume',
					id: 'fade_Min',
					default: '000',
					regex: '/^[0-9]*$/'
				},
				{
					type: 'textinput',
					label: 'Fade time in ms',
					id: 'fade_Time',
					default: '2000',
					regex: '/^(?!(0))[0-9]*$/'
				},
				{
					type: 'textinput',
					label: 'Input',
					id: 'fade_Input',
					default: '1',
					regex: regex_type
				}
			]
		},
		'startCountdown': {
			label: 'Start Countdown',
			options: [
				{
					type: 'textinput',
					label: 'Input',
					id: 'countdownStartInput',
					default: '1',
					regex: regex_type
				}
			]
		},
		'stopCountdown': {
			label: 'Stop Countdown',
			options: [
				{
					type: 'textinput',
					label: 'Input',
					id: 'countdownStopInput',
					default: '1',
					regex: regex_type
				}
			]
		},
		'setCountdownTime': {
			label: 'Set Countdown Time',
			options: [
				{
					type: 'textinput',
					label: 'Time (00:00:00)',
					id: 'countdownTime',
					default: '00:10:00',
					regex: '/^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]$/'
				},
				{
					type: 'textinput',
					label: 'Input',
					id: 'countdownSetInput',
					default: '1',
					regex: regex_type
				}
			]
		},
		'nextPicture': {
			label: 'Next Picture/Slide',
			options: [
				{
					type: 'textinput',
					label: 'Input',
					id: 'nPictureInput',
					default: '1',
					regex: regex_type
				}
			]
		},
		'previousPicture': {
			label: 'Previous Picture/Slide',
			options: [
				{
					type: 'textinput',
					label: 'Input',
					id: 'pPictureInput',
					default: '1',
					regex: regex_type
				}
			]
		},
		'keyPress': {
			label: 'KeyPress',
			options: [
				{
					type: 'textinput',
					label: 'key',
					id: 'key'
				}
			]
		},
		'scriptStart': {
			label: 'Script start',
			options: [
				{
					type: 'textinput',
					label: 'Script name',
					id: 'script'
				}
			]
		},
		'scriptStop': {
			label: 'Script stop',
			options: [
				{
					type: 'textinput',
					label: 'Script name',
					id: 'script'
				}
			]
		},
		'scriptStopAll': {
			label: 'Script stop all'
		},
		'command': {
			label: 'Run custom command',
			options: [
				{
					type: 'textinput',
					label: 'Command',
					id: 'command',
					default: ''
				}
			]
		}
	});
};




	instance.prototype.action = function(action) {
		var self = this;
		var opt = action.options
		var cmd = ''
		switch (action.action) {

			case 'quickPlay':
				cmd = 'FUNCTION QuickPlay Input='+ opt.pgmId;
				break;

			case 'pgmSel':
				cmd = 'FUNCTION CutDirect Input='+ opt.pgmId;
				break;

			case 'prwSel':
				cmd = 'FUNCTION PreviewInput Input='+ opt.prwId;
				break;

			case 'prwNext':
				cmd = 'FUNCTION PreviewInputNext';
				break;

			case 'prwPrv':
				cmd = 'FUNCTION PreviewInputPrevious';
				break;

			case 'transition':
				cmd = 'FUNCTION '+ opt.transId;
				break;

			case 'toggle_functions':
				cmd = 'FUNCTION '+ opt.toggleID;
				break;

			case 'playList_Functions':
				cmd = 'FUNCTION '+ opt.plfId;
				break;

			case 'open_pl':
				cmd = 'FUNCTION SelectPlayList '+ opt.plName;
				break;

			case 'overlayFunctions':
				cmd = 'FUNCTION '+opt.overlayFunc +' Input='+ opt.inputId;
				break;

			case 'outputSet':
				cmd = 'FUNCTION '+opt.outputId + ' Value=' + opt.outputType + '&Input=' + opt.outputInputId;
				break;

			case 'volumeFade':
				cmd = 'FUNCTION SetVolumeFade value=' + opt.fade_Min + ',' + opt.fade_Time + '&input=' + opt.fade_Input;
				break;

			case 'startCountdown':
				cmd = 'FUNCTION StartCountdown Input='+ opt.countdownStartInput;
				break;

			case 'stopCountdown':
				cmd = 'FUNCTION StopCountdown Input='+ opt.countdownStopInput;
				break;

			case 'nextPicture':
				cmd = 'FUNCTION NextPicture Input='+ opt.nPictureInput;
				break;

			case 'previousPicture':
				cmd = 'FUNCTION PreviousPicture Input='+ opt.pPictureInput;
				break;

			case 'setCountdownTime':
				cmd = 'FUNCTION SetCountdown Value=' + opt.countdownTime + '&Input='+ opt.countdownSetInput;
				break;

			case 'keyPress':
				cmd = 'FUNCTION KeyPress Value=' + opt.key;
				break;

			case 'scriptStart':
				cmd = 'FUNCTION ScriptStart Value=' + opt.script;
				break;

			case 'scriptStop':
				cmd = 'FUNCTION ScriptStop Value=' + opt.script;
				break;

			case 'scriptStopAll':
				cmd = 'FUNCTION ScriptStopAll';
				break;

			case 'command':
				cmd = 'FUNCTION ' + opt.command;
				break;

	};





	if (cmd !== undefined) {

		debug('sending ',cmd,"to",self.config.host);

		if (self.socket !== undefined && self.socket.connected) {
			self.socket.send(cmd + '\r\n');
		} else {
			debug('Socket not connected :(');
		}

	}


};

instance.prototype.init_feedbacks = function() {
	var self = this;

	var feedbacks = {};
	feedbacks['input_preview'] = {
		label: 'Change colors based on previewed input',
		description: 'If the specified input is previewed, change colors of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: self.rgb(0,255,0)
			},
			{
				type: 'textinput',
				label: 'Input Number',
				id: 'index',
				default: 0,
				regex: self.REGEX_NUMBER
			}
		]
	};
	feedbacks['input_live'] = {
		label: 'Change colors based on live input',
		description: 'If the specified input is live, change colors of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: self.rgb(0,255,0)
			},
			{
				type: 'textinput',
				label: 'Input Number',
				id: 'index',
				default: 0,
				regex: self.REGEX_NUMBER
			}
		]
	};

	self.setFeedbackDefinitions(feedbacks);
}

instance.prototype.feedback = function(feedback, bank) {
	var self = this;
	if (feedback.type == 'input_preview') {
		if (self.tally[feedback.options.index-1] == 2) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
	if (feedback.type == 'input_live') {
		if (self.tally[feedback.options.index-1] == 1) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
}

instance_skel.extendedBy(instance);
exports = module.exports = instance;
