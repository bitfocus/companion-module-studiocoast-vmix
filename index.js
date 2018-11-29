var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions

	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
	self.init_tcp();

};

instance.prototype.init = function() {
	var self = this;

	debug = self.debug;
	log = self.log;

	self.status(1,'Connecting'); // status ok!

	self.init_tcp();
};

instance.prototype.init_tcp = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
		delete self.socket;
	}

	if (self.config.host) {
		self.socket = new tcp(self.config.host, 8099);

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
		})

		self.socket.on('data', function (data) {});
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
			width: 6,
			regex: self.REGEX_IP
		}
	]
};


// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
	}

	debug("destroy", self.id);;
};


instance.prototype.actions = function(system) {
	var self = this;
	self.system.emit('instance_actions', self.id, {

		'quickPlay': {
			label: 'Quick Play input to Program',
			options: [
				{
					type: 'textinput',
					label: 'Input number',
					id: 'pgmId',
					regex: self.REGEX_NUMBER
				}
			]
		},
		'pgmSel': {
			label: 'Send Input to Program',
			options: [
				{
					type: 'textinput',
					label: 'Input number',
					id: 'pgmId',
					regex: self.REGEX_NUMBER
				}
			]
		},
		'prwSel': {
			label: 'Send Input to Preview',
			options: [
				{
					type: 'textinput',
					label: 'Input number',
					id: 'prwId',
					regex: self.REGEX_NUMBER
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
			label: 'Play List Functions',
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
			label: 'Open Play list',
			options: [
				{
					type: 'textinput',
					label: 'Playlist name',
					id: 'plName'
				}
			]
		},
		'overlayPgm': {
			label: 'Toggle Overlay on Program',
			options: [
				{
					type: 'textinput',
					label: 'Input number',
					id: 'pgmId',
					regex: self.REGEX_NUMBER
				},
				{
					type: 'dropdown',
					label: 'Select Overlay',
					id: 'overlayId',
					choices: [
						{ id: 'OverlayInput1',     label: 'Overlay nr 1'},
						{ id: 'OverlayInput2',     label: 'Overlay nr 2'},
						{ id: 'OverlayInput3',     label: 'Overlay nr 3'},
						{ id: 'OverlayInput4',     label: 'Overlay nr 4'}
					]
				}
			]
		},
		'overlayPrw': {
			label: 'Set Overlay on Preview',
			options: [
				{
					type: 'textinput',
					label: 'Input number',
					id: 'prwId',
					regex: self.REGEX_NUMBER
				},
				{
					type: 'dropdown',
					label: 'Select Overlay',
					id: 'overlayId',
					choices: [
						{ id: 'PreviewOverlayInput1',     label: 'Overlay nr 1'},
						{ id: 'PreviewOverlayInput2',     label: 'Overlay nr 2'},
						{ id: 'PreviewOverlayInput3',     label: 'Overlay nr 3'},
						{ id: 'PreviewOverlayInput4',     label: 'Overlay nr 4'}
					]
				}
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
					regex: '/^[0-9]*$/'
				}
			]
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

			case 'overlayPgm':
				cmd = 'FUNCTION  '+opt.overlayId +' Input='+ opt.pgmId;
				break;

			case 'overlayPrw':
				cmd = 'FUNCTION  '+opt.overlayId +' Input='+ opt.prwId;
				break;

			case 'volumeFade':
				cmd = 'FUNCTION  SetVolumeFade value=' + opt.fade_Min + ',' + opt.fade_Time + '&input=' + opt.fade_Input;
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

instance_skel.extendedBy(instance);
exports = module.exports = instance;
