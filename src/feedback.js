exports.initFeedbacks = function() {
	const feedbacks = {};

	const foregroundColor = {
		type: 'colorpicker',
		label: 'Foreground color',
		id: 'fg',
		default: this.rgb(255, 255, 255)
	};

	const backgroundColorPreview = {
		type: 'colorpicker',
		label: 'Background color',
		id: 'bg',
		default: this.rgb(0, 255, 0)
	};

	const backgroundColorProgram = {
		type: 'colorpicker',
		label: 'Background color',
		id: 'bg',
		default: this.rgb(255, 0, 0)
	};

	const input = {
		type: 'textinput',
		label: 'Input',
		id: 'input',
		default: 1
	};

	const mixInput = {
		type: 'dropdown',
		label: 'Mix',
		id: 'mix',
		default: 0,
		choices: [1, 2, 3, 4].map((id, index) => ({ id: index, label: id }))
	};

	feedbacks.inputPreview = {
		label: 'Change colors based on previewed input',
		description: 'If the specified input is previewed, change colors of the bank',
		options: [input, mixInput, foregroundColor, backgroundColorPreview]
	};

	feedbacks.inputLive = {
		label: 'Change colors based on live input',
		description: 'If the specified input is live, change colors of the bank',
		options: [input, mixInput, foregroundColor, backgroundColorProgram]
	};

	feedbacks.overlayStatus = {
		label: 'Overlay status',
		description: 'Indicates if an input is previewed, or live, as an overlay',
		options: [
			input,
			{
				type: 'dropdown',
				label: 'Overlay',
				id: 'overlay',
				default: '1',
				choices: ['Any', '1', '2', '3', '4', 'Stinger 1', 'Stinger 2'].map((id, index) => ({ id: index.toString(), label: id }))
			},
			foregroundColor,
			{
				type: 'colorpicker',
				label: 'Preview Background Color',
				id: 'bgPreview',
				default: this.rgb(0, 255, 0)
			},
			{
				type: 'colorpicker',
				label: 'Program Background Color',
				id: 'bgProgram',
				default: this.rgb(255, 0, 0)
			}
		]
	};

	feedbacks.videoTimer = {
		label: 'Video Timer',
		description: 'Time remaining on video input',
		options: [
			input,
			{
				type: 'colorpicker',
				label: 'Text color',
				id: 'color',
				default: this.rgb(255, 255, 255)
			},
			{
				type: 'colorpicker',
				label: 'Text color under 30s',
				id: 'color30',
				default: this.rgb(255, 255, 0)
			},
			{
				type: 'colorpicker',
				label: 'Text color under 10s',
				id: 'color10',
				default: this.rgb(255, 0, 0)
			},
			{
				type: 'checkbox',
				label: 'Disable color change if looping',
				id: 'loop',
				default: false
			}
		]
	};

	feedbacks.status = {
		label: 'vMix status',
		description: 'Current status of vMix, such as recording, external, etc...',
		options: [
			{
				type: 'dropdown',
				label: 'Status Type',
				id: 'status',
				default: 'connection',
				choices: ['connection', 'fadeToBlack', 'recording', 'external', 'streaming', 'multiCorder', 'fullscreen', 'playList'].map(id => ({ id, label: id }))
			},
			foregroundColor,
			backgroundColorProgram,
			{
				type: 'textinput',
				label: 'Stream Value (0 to 2, blank for all)',
				id: 'value',
				default: '',
			}
		]
	};

	feedbacks.busMute = {
		label: 'Bus mute',
		description: 'Indicate if a bus is muted',
		options: [
			{
				type: 'dropdown',
				label: 'Bus',
				id: 'bus',
				default: 'Master',
				choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map(id => ({ id, label: id }))
			},
			foregroundColor,
			backgroundColorProgram
		]
	};

	feedbacks.inputMute = {
		label: 'Input mute',
		description: 'Indicate if an input is muted',
		options: [input, foregroundColor, backgroundColorProgram]
	};

	feedbacks.inputSolo = {
		label: 'Input solo',
		description: 'Indicate if an input is set to Solo',
		options: [input, foregroundColor, backgroundColorProgram]
	};

	feedbacks.inputBusRouting = {
		label: 'Input Bus Routing',
		description: 'Indicate which busses an input will output to',
		options: [
			input,
			{
				type: 'dropdown',
				label: 'Bus',
				id: 'bus',
				default: 'Master',
				choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map(id => ({ id, label: id }))
			},
			foregroundColor,
			backgroundColorPreview
		]
	};

	feedbacks.titleLayer = {
		label: 'Title Layer',
		description: 'Returns the text of a title by title index or name',
		options: [
			input,
			{
				type: 'textinput',
				label: 'Layer',
				id: 'layer',
				default: ''
			}
		]
	};

	feedbacks.replayStatus = {
		label: 'Replay Recording/Live',
		description: 'Indicates current recording or live status of a replay input',
		options: [
			{
				type: 'dropdown',
				label: 'Type',
				id: 'status',
				default: 'recording',
				choices: [
					{ id: 'recording', label: 'Recording' },
					{ id: 'live', label: 'Live' }
				]
			},
			foregroundColor,
			backgroundColorProgram
		]
	};

	feedbacks.replayEvents = {
		label: 'Replay Events Tab',
		description: 'Indicates currently selected Events tab',
		options: [
			{
				type: 'dropdown',
				label: 'Events',
				id: 'events',
				default: '1',
				choices: ['1', '2', '3', '4', '5', '6', '7', '8'].map(id => ({ id, label: id }))
			},
			foregroundColor,
			backgroundColorProgram
		]
	};

	feedbacks.replayCamera = {
		label: 'Replay Recording/Live',
		description: 'Indicates current recording or live status of a replay input',
		options: [
			{
				type: 'dropdown',
				label: 'Replay Channel',
				id: 'channel',
				default: 'A',
				choices: [
					{ id: 'A', label: 'Replay A' },
					{ id: 'B', label: 'Replay B' }
				]
			},
			{
				type: 'dropdown',
				label: 'Camera',
				id: 'camera',
				default: '1',
				choices: ['1', '2', '3', '4'].map(id => ({ id, label: id }))
			},
			foregroundColor,
			backgroundColorProgram
		]
	};

	return feedbacks;
};

exports.executeFeedback = function(feedback, bank) {
	const int = RegExp(/^\d+$/);

	const getInput = value => {
		let input;

		if (int.test(value)) {
			input = this.data.inputs.find(item => item.number === value);
		} else {
			input = this.data.inputs.find(item => item.shortTitle === value || item.title === value);
		}

		return input;
	};

	if (feedback.type === 'inputPreview' || feedback.type === 'inputLive') {
		const mix = feedback.options.mix !== undefined ? feedback.options.mix : 0;
		const type = feedback.type === 'inputPreview' ? 'preview' : 'program';

		if (this.data.mix[mix][type] === 0 || !this.data.inputs[this.data.mix[mix][type] - 1]) {
			return;
		}

		const previewTitle = this.data.inputs[this.data.mix[mix][type] - 1].shortTitle;
		const idCheck = int.test(feedback.options.input) && feedback.options.input == this.data.mix[mix][type];
		const titleCheck = !int.test(feedback.options.input) && feedback.options.input === previewTitle;
		if (idCheck || titleCheck) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
	
	else if (feedback.type === 'overlayStatus') {
		let input = getInput(feedback.options.input);
		let preview = false;
		let program = false;

		if (!input) {
			return;
		}

		this.data.overlays.forEach(overlay => {
			const overlayNumberCheck = overlay.number === feedback.options.overlay || feedback.options.overlay === '0';
			const overlayInputCheck = overlay.input === input.number;

			if (overlayNumberCheck && overlayInputCheck) {
				if (overlay.preview) {
					preview = true;
				} else {
					program = true;
				}
			}
		});

		if (preview || program) {
			return {
				color: feedback.options.fg,
				bgcolor: program ? feedback.options.bgProgram : feedback.options.bgPreview
			};
		}
	}
	
	else if (feedback.type === 'videoTimer') {
		let input = getInput(feedback.options.input);

		if (!input || input.duration === '0') {
			return;
		}

		const remaining = parseInt(input.duration, 10) - parseInt(input.position, 10);
		const ms = Math.floor((remaining % 1000) / 100);
		let sec = Math.floor((remaining % 60000) / 1000);
		let min = Math.floor(remaining / 60000);

		const color = () => {
			if (feedback.options.loop || sec > 30 || min > 0) {
				return feedback.options.color;
			}
			if (sec > 10) {
				return feedback.options.color30;
			}
			return feedback.options.color10;
		};

		if (sec < 10) {
			sec = '0' + sec;
		}

		if (min < 10) {
			min = '0' + min;
		}

		return { color: color(), text: `${min}:${sec}.${ms}` };
	}
	
	else if (feedback.type === 'status') {
		if (feedback.options.status === 'connection') {
			if (this.data.connected) return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		} else {
			if (feedback.options.status === 'streaming' && ['0', '1', '2'].includes(feedback.options.value)) {
				if (this.data.status.stream[feedback.options.value]) return { color: feedback.options.fg, bgcolor: feedback.options.bg };
			} else {
				if (this.data.status[feedback.options.status]) return { color: feedback.options.fg, bgcolor: feedback.options.bg };
			}
		}
	}
	
	else if (feedback.type === 'busMute') {
		const busID = feedback.options.bus === 'Master' ? 'master' : `bus${feedback.options.bus}`;
		const bus = this.data.audio.find(item => item.bus === busID);

		if (bus && bus.muted === 'True') {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
	
	else if (feedback.type === 'inputMute') {
		let input = getInput(feedback.options.input);

		if (input && input.muted === 'True') {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
	
	else if (feedback.type === 'inputSolo') {
		let input = getInput(feedback.options.input);

		if (input && input.solo === 'True') {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
	
	else if (feedback.type === 'inputBusRouting') {
		let input = getInput(feedback.options.input);
		const busID = feedback.options.bus === 'Master' ? 'M' : feedback.options.bus;

		if (input && input.audiobusses && input.audiobusses.includes(busID)) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
	
	else if (feedback.type === 'titleLayer') {
		let input = getInput(feedback.options.input);
		let text;

		if (input && input.text) {
			if (int.test(feedback.options.layer)) {
				text = input.text.find(item => item.index === feedback.options.layer);
			} else {
				text = input.text.find(item => item.name === feedback.options.layer);
			}
		}

		if (text && text.value) {
			return { text: bank.text + text.value };
		}
	}
	
	else if (feedback.type === 'replayStatus') {
		if (this.data.replay[feedback.options.status]) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
	
	else if (feedback.type === 'replayEvents') {
		if (this.data.replay.events === feedback.options.events) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
	
	else if (feedback.type === 'replayCamera') {
		if (this.data.replay['camera' + feedback.options.channel] === feedback.options.camera) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}
};
