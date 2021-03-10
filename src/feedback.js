const { volumeAmplitudeToLinear } = require('./utils');

exports.initFeedbacks = function () {
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
		label: 'Input (Nr/Name/GUID)',
		id: 'input',
		default: '1'
	};

	const selectedIndex = {
		type: 'number',
		label: 'Selected Index',
		id: 'selectedIndex',
		default: 1,
		min: 1,
		max: 9999,
	};

	const mixInput = {
		type: 'dropdown',
		label: 'Mix',
		id: 'mix',
		default: 0,
		choices: [1, 2, 3, 4].map((id, index) => ({ id: index, label: id }))
	};

	const comparison = {
		type: 'dropdown',
		label: 'Comparison',
		id: 'comparison',
		default: 'eq',
		choices: [
			{ id: 'eq', label: '=' },
			{ id: 'lt', label: '<' },
			{ id: 'lte', label: '<=' },
			{ id: 'gt', label: '>' },
			{ id: 'gte', label: '>=' },
		]
	};

	const layerTallyIndicator = {
		type: 'dropdown',
		label: 'Layer Tally Indicator',
		id: 'tally',
		default: '',
		choices: [
			{ id: '', label: 'None' },
			{ id: 'border', label: 'Border' },
			{ id: 'corner', label: 'Corner' }
		]
	};

	feedbacks.inputPreview = {
		label: 'Preview - Change colors based on previewed input',
		description: 'If the specified input is previewed, change colors of the bank',
		options: [input, mixInput, foregroundColor, backgroundColorPreview, layerTallyIndicator]
	};

	feedbacks.inputLive = {
		label: 'Live - Change colors based on live input',
		description: 'If the specified input is live, change colors of the bank',
		options: [input, mixInput, foregroundColor, backgroundColorProgram, layerTallyIndicator]
	};

	feedbacks.overlayStatus = {
		label: 'Overlay - Overlay status',
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
		label: 'Video - Video Timer',
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
		label: 'vMix - status',
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
				type: 'dropdown',
				label: 'Stream Feedback Value',
				id: 'value',
				default: '',
				choices: [
					{ id: '', label: 'All' },
					{ id: '0', label: '0' },
					{ id: '1', label: '1' },
					{ id: '2', label: '2' }
				]
			}
		]
	};

	feedbacks.busMute = {
		label: 'Audio - Bus mute',
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
		label: 'Audio - Input mute',
		description: 'Indicate if an input is muted',
		options: [input, foregroundColor, backgroundColorProgram]
	};

	feedbacks.inputAudio = {
		label: 'Audio - Input Audio',
		description: 'Indicate if an inputs Audio is ON',
		options: [input, foregroundColor, backgroundColorProgram]
	};

	feedbacks.inputSolo = {
		label: 'Audio - Input solo',
		description: 'Indicate if an input is set to Solo',
		options: [input, foregroundColor, backgroundColorProgram]
	};

	feedbacks.inputBusRouting = {
		label: 'Audio - Input Bus Routing',
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
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: this.rgb(255, 255, 0)
			}
		]
	};

	feedbacks.liveInputVolume = {
		label: 'Audio - Input live dB value',
		description: 'Indicate what the live dB value on an input is',
		options: [
			input,
			{
				type: 'checkbox',
				label: 'Show the actual dB Value',
				id: 'value',
				default: false
			},
			{
				type: 'checkbox',
				label: 'Color Text',
				id: 'colortxt',
				default: true
			},
			{
				type: 'checkbox',
				label: 'Color Baggroung',
				id: 'colorbg',
				default: false
			},
			{
				type: 'colorpicker',
				label: 'Basse Text Color',
				id: 'colorbase',
				default: this.rgb(255, 255, 255)
			},
			{
				type: 'colorpicker',
				label: 'Text color above -1 dB',
				id: 'color',
				default: this.rgb(255, 0, 0)
			},
			{
				type: 'colorpicker',
				label: 'Text color below -1 dB',
				id: 'color1',
				default: this.rgb(255, 255, 0)
			},
			{
				type: 'colorpicker',
				label: 'Text color below -6 dB',
				id: 'color6',
				default: this.rgb(0, 255, 0)
			},
			{
				type: 'colorpicker',
				label: 'Text color below -18 dB',
				id: 'color18',
				default: this.rgb(0, 192, 0)
			},
			{
				type: 'colorpicker',
				label: 'Text color below -36 dB',
				id: 'color36',
				default: this.rgb(0, 128, 0)
			}
		]
	};

	feedbacks.liveBusVolume = {
		label: 'Audio - Bus live dB value',
		description: 'Indicate what the live dB value on a bus is',
		options: [
			{
				type: 'dropdown',
				label: 'Bus',
				id: 'bus',
				default: 'Master',
				choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map(id => ({ id, label: id }))
			},
			{
				type: 'checkbox',
				label: 'Show the actual dB value',
				id: 'value',
				default: false
			},
			{
				type: 'checkbox',
				label: 'Color Text',
				id: 'colortxt',
				default: true
			},
			{
				type: 'checkbox',
				label: 'Color Baggroung',
				id: 'colorbg',
				default: false
			},
			{
				type: 'colorpicker',
				label: 'Basse Text Color',
				id: 'colorbase',
				default: this.rgb(255, 255, 255)
			},
			{
				type: 'colorpicker',
				label: 'Text color above -1 dB',
				id: 'color',
				default: this.rgb(255, 0, 0)
			},
			{
				type: 'colorpicker',
				label: 'Text color below -1 dB',
				id: 'color1',
				default: this.rgb(255, 255, 0)
			},
			{
				type: 'colorpicker',
				label: 'Text color below -6 dB',
				id: 'color6',
				default: this.rgb(0, 255, 0)
			},
			{
				type: 'colorpicker',
				label: 'Text color below -18 dB',
				id: 'color18',
				default: this.rgb(0, 192, 0)
			},
			{
				type: 'colorpicker',
				label: 'Text color below -36 dB',
				id: 'color36',
				default: this.rgb(0, 128, 0)
			}
		]
	};

	feedbacks.inputVolumeLevel = {
		label: 'Audio - Input Volume',
		description: 'Indicate if an input fader is in a set value',
		options: [
			input,
			comparison,
			{
				type: 'textinput',
				label: 'Value',
				id: 'value',
				default: '100',
				regex: this.REGEX_FLOAT_OR_INT
			},
			foregroundColor,
			backgroundColorPreview
		]
	};

	feedbacks.busVolumeLevel = {
		label: 'Audio - Bus Volume',
		description: 'Indicate if an output bus fader is within a set range',
		options: [
			{
				type: 'dropdown',
				label: 'Bus',
				id: 'bus',
				default: 'Master',
				choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Headphones'].map(id => ({ id, label: id }))
			},
			comparison,
			{
				type: 'textinput',
				label: 'Value',
				id: 'value',
				default: '100',
				regex: this.REGEX_FLOAT_OR_INT
			},
			foregroundColor,
			backgroundColorPreview
		]
	};

	feedbacks.titleLayer = {
		label: 'Title - Layer',
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
		label: 'Replay - Recording/Live',
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
		label: 'Replay - Events Tab',
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
		label: 'Replay - Camera Live',
		description: 'Indicates current recording or live status of a replay input',
		options: [
			{
				type: 'dropdown',
				label: 'Replay Channel',
				id: 'channel',
				default: 'A',
				choices: [
					{ id: 'A', label: 'Replay A' },
					{ id: 'B', label: 'Replay B' },
					{ id: 'selected', label: 'Replay Selected' }
				]
			},
			{
				type: 'dropdown',
				label: 'Camera',
				id: 'camera',
				default: '1',
				choices: ['1', '2', '3', '4', '5', '6', '7', '8'].map(id => ({ id, label: id }))
			},
			foregroundColor,
			backgroundColorProgram
		]
	};

	feedbacks.replaySelectedChannel = {
		label: 'Replay - Selected Channel',
		description: 'Indicates currently selected channel',
		options: [
			{
				type: 'dropdown',
				label: 'Replay Channel',
				id: 'channel',
				default: 'AB',
				choices: [
					{ id: 'AB', label: 'A|B' },
					{ id: 'A', label: 'A' },
					{ id: 'B', label: 'B' }
				]
			},
			foregroundColor,
			backgroundColorProgram
		]
	};
	
	feedbacks.videoCallVideoSource = {
		label: 'Video Call - Video Source',
		description: 'Indicates video source for a video call',
		options: [
			input,
			{
				type: 'dropdown',
				label: 'Select Source',
				id: 'source',
				default: 'Output1',
				choices: [
					{ id: 'Output1', label: 'Output 1' },
					{ id: 'Output2', label: 'Output 2' },
					{ id: 'Output3', label: 'Output 3' },
					{ id: 'Output4', label: 'Output 4' },
				]
			},
			foregroundColor,
			backgroundColorProgram
		]
	}

	feedbacks.videoCallAudioSource = {
		label: 'Video Call - Audio Source',
		description: 'Indicates audio source for a video call',
		options: [
			input,
			{
				type: 'dropdown',
				label: 'Source',
				id: 'source',
				default: 'Master',
				choices: ['Master', 'Headphones', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id, index) => ({ id: index > 1 ? `Bus${id}` : id, label: id }))
			},
			foregroundColor,
			backgroundColorProgram
		]
	}

	feedbacks.inputSelectedIndex = {
		label: 'Slides/List - Change Colors Based On Selected Slide/Index',
		description: 'If the specified slide/index is selected, change colors of the bank',
		options: [
			input, 
			selectedIndex, 
			foregroundColor, 
			backgroundColorProgram,
			{
				type: 'colorpicker',
				label: 'Empty List Warning Text',
				id: 'et',
				default: this.rgb(0,0,0)
			},
			{
				type: 'colorpicker',
				label: 'Empty List Warning Bagground',
				id: 'eb',
				default: this.rgb(255,255,0)
			},
		]
	};

	feedbacks.inputSelectedIndexName = {
		label: 'Slides/List - Show Selected Slide/Index Name',
		description: 'Indicates what slide/index is selected',
		options: [
			input,
			{
				type: 'checkbox',
				label: 'Show Index Name',
				id: 'value1',
				default: true
			},
			{
				type: 'checkbox',
				label: 'Show Index nr.',
				id: 'value2',
				default: false
			}
		]
	};

	return feedbacks;
};

exports.executeFeedback = function (feedback, bank) {
	const int = RegExp(/^\d+$/);

	const getInput = value => {
		let input;

		if (int.test(value)) {
			input = this.data.inputs.find(item => item.number === value);
		} else {
			input = this.data.inputs.find(item => item.shortTitle === value || item.title === value || item.key === value);
		}

		return input;
	};

	if (feedback.type === 'inputPreview' || feedback.type === 'inputLive') {
		const mix = feedback.options.mix !== undefined ? feedback.options.mix : 0;
		const type = feedback.type === 'inputPreview' ? 'preview' : 'program';
		const input = getInput(feedback.options.input);
		if (!input || this.data.mix[mix][type] === 0 || !this.data.inputs[this.data.mix[mix][type] - 1]) {
			return;
		}

		const previewTitle = this.data.inputs[this.data.mix[mix][type] - 1].shortTitle || this.data.inputs[this.data.mix[mix][type] - 1].title;
		const guidKey = this.data.inputs[this.data.mix[mix][type] - 1].key;
		const idCheck = int.test(feedback.options.input) && feedback.options.input == this.data.mix[mix][type];
		const titleCheck = !int.test(feedback.options.input) && feedback.options.input === previewTitle;
		const guidCheck = feedback.options.input == guidKey;
		const layerTallyCheck = feedback.options.tally !== undefined && feedback.options.tally !== '' && this.data.mix[mix][type + 'Tally'].includes(input.key);

		if (idCheck || titleCheck || guidCheck) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
		else if (layerTallyCheck) {
			return { img64: this.indicators.getImage(feedback.options.tally, feedback.options.bg) };
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

		let markType = input.duration;

		// Detect if there is a "Mark Out" in the video
		if (input.markOut) {
			markType = input.markOut;
		}

		const remaining = parseInt(markType, 10) - parseInt(input.position, 10);

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

		if (bank.text != '') {
			return { color: color(), text: bank.text + `\\n ${min}:${sec}.${ms}` };
		} else {
			return { color: color(), text: bank.text + `${min}:${sec}.${ms}` };
		}
	}

	else if (feedback.type === 'status') {
		if (feedback.options.status === 'connection') {
			if (this.data.connected) return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		} else {
			if (this.data.status !== undefined) {
				if (feedback.options.status === 'streaming' && ['0', '1', '2'].includes(feedback.options.value)) {
					if (this.data.status.stream[feedback.options.value]) return { color: feedback.options.fg, bgcolor: feedback.options.bg };
				} else {
					if (this.data.status[feedback.options.status]) return { color: feedback.options.fg, bgcolor: feedback.options.bg };
				}
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

	else if (feedback.type === 'inputAudio') {
		let input = getInput(feedback.options.input);

		if (input && input.muted === 'False') {
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

	else if (feedback.type === 'liveInputVolume') {
		let input = getInput(feedback.options.input);

		// Detect if there is sound enabled on an input
		if (!input) {
			return
		}

		var dBLeft = parseFloat(input.meterF1);
		var dBRight = parseFloat(input.meterF2);

		dBLeft = (20 * Math.log(dBLeft) / Math.LN10);
		dBRight = (20 * Math.log(dBRight) / Math.LN10);

		dB = Math.max(dBLeft, dBRight);
		dB = +dB.toFixed(1);

		const color = () => {
			if (dB > -1) {
				return feedback.options.color;
			}
			else if (dB > -6) {
				return feedback.options.color1;
			}
			else if (dB > -18) {
				return feedback.options.color6;
			}
			else if (dB > -36) {
				return feedback.options.color18;
			}
			return feedback.options.color36;
		};

		let txt = '';
		let colorfg = '';
		let colorbg = '';

		if (feedback.options.value == true) {
			if (bank.text != '') {
				txt = bank.text + `\\n ${dB} dB`;
			} else {
				txt = bank.text + `${dB} dB`;
			}
		}
		else {
			txt = bank.text;
		}

		if (feedback.options.colortxt == true) {
			colorfg = color();
		}
		else {
			colorfg = feedback.options.colorbase;
		}

		if (feedback.options.colorbg == true) {
			colorbg = color();
		}
		return {color: colorfg, bgcolor: colorbg, text: txt};
	}

	else if (feedback.type === 'liveBusVolume') {
		var dBLeft;
		var dBRight;

		if (feedback.options.bus === 'Headphones') {
			return
		}

		else {
			const busID = feedback.options.bus === 'Master' ? 'master' : ('bus' + feedback.options.bus);
			const bus = this.data.audio.find(output => output.bus === busID);
			if (bus !== undefined) {
				dBLeft = parseFloat(bus.meterF1);
				dBRight = parseFloat(bus.meterF2);
			}
		}

		dBLeft = (20 * Math.log(dBLeft) / Math.LN10);
		dBRight = (20 * Math.log(dBRight) / Math.LN10);

		dB = Math.max(dBLeft, dBRight);
		dB = +dB.toFixed(1);

		const color = () => {
			if (dB > -1) {
				return feedback.options.color;
			}
			else if (dB > -6) {
				return feedback.options.color1;
			}
			else if (dB > -18) {
				return feedback.options.color6;
			}
			else if (dB > -36) {
				return feedback.options.color18;
			}
			return feedback.options.color36;
		};

		let txt = '';
		let colorfg = '';
		let colorbg = '';

		if (feedback.options.value == true) {
			if (bank.text != '') {
				txt = bank.text + `\\n ${dB} dB`;
			} else {
				txt = bank.text + `${dB} dB`;
			}
		}
		else {
			txt = bank.text;
		}

		if (feedback.options.colortxt == true) {
			colorfg = color();
		}
		else {
			colorfg = feedback.options.colorbase;
		}

		if (feedback.options.colorbg == true) {
			colorbg = color();
		}
		return {color: colorfg, bgcolor: colorbg, text: txt};
	}

	else if (feedback.type === 'inputVolumeLevel') {
		let input = getInput(feedback.options.input);
		if (input === undefined || input.volume === undefined) {
			return;
		}

		const volume = this.config.volumeLinear ? volumeAmplitudeToLinear(input.volume) : parseFloat(input.volume);
		const value = parseFloat(feedback.options.value);

		const volumeInRange = {
			'eq': volume === value,
			'lt': volume < value,
			'lte': volume <= value,
			'gt': volume > value,
			'gte': volume >= value,
		};

		if (volumeInRange[feedback.options.comparison]) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg }
		}
	}

	else if (feedback.type === 'busVolumeLevel') {
		const value = parseFloat(feedback.options.value);
		let volume;

		if (feedback.options.bus === 'Headphones') {
			const bus = this.data.audio.find(output => output.bus === 'master');
			volume = this.config.volumeLinear ? volumeAmplitudeToLinear(bus.headphonesVolume) : parseFloat(bus.headphonesVolume);
		}

		else {
			const busID = feedback.options.bus === 'Master' ? 'master' : ('bus' + feedback.options.bus);
			const bus = this.data.audio.find(output => output.bus === busID);
			if (bus !== undefined) {
				volume = this.config.volumeLinear ? volumeAmplitudeToLinear(bus.volume) : parseFloat(bus.volume);
			}
		}

		const volumeInRange = {
			'eq': volume === value,
			'lt': volume < value,
			'lte': volume <= value,
			'gt': volume > value,
			'gte': volume >= value,
		};

		if (volumeInRange[feedback.options.comparison]) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg }
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
		let channel = feedback.options.channel;
		if (channel === 'selected') {
			// Backways compatibility - Default to channel A if prior to v24
			channel = this.data.replay.channelMode ? this.data.replay.channelMode : 'A';
			if (channel === 'AB') channel = 'A';
		}

		if (this.data.replay['camera' + channel] === feedback.options.camera) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}

	else if (feedback.type === 'replaySelectedChannel') {
		if (this.data.replay.channelMode && this.data.replay.channelMode === feedback.options.channel) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}

	else if (feedback.type === 'videoCallVideoSource') {
		let input = getInput(feedback.options.input);

		if (input && input.callVideoSource === feedback.options.source) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}

	else if (feedback.type === 'videoCallAudioSource') {
		let input = getInput(feedback.options.input);

		if (input && this.activatorData.videoCall[input.key] && this.activatorData.videoCall[input.key].audioSource === feedback.options.source) {
			return { color: feedback.options.fg, bgcolor: feedback.options.bg };
		}
	}

	else if (feedback.type === 'inputSelectedIndex') {
		let input = getInput(feedback.options.input);

		if (!input) {
			return
		}

		if (input.type === 'VideoList') {
			if (input && parseInt(input.selectedIndex) === parseInt(feedback.options.selectedIndex)) {
				return { color: feedback.options.fg, bgcolor: feedback.options.bg };
			}

			else if (input && input.list[0].empty === true) {
				return { color: feedback.options.et, bgcolor: feedback.options.eb }
			}
		}
		else if (input.type === 'PowerPoint') {
			if (input && parseInt(input.selectedIndex) === parseInt(feedback.options.selectedIndex)) {
				return { color: feedback.options.fg, bgcolor: feedback.options.bg };
			}
		}
		else {
			return { color: this.rgb(255,255,255), bgcolor: this.rgb(0,0,0) }
		}
	}

	else if (feedback.type === 'inputSelectedIndexName') {
		let input = getInput(feedback.options.input);
		let selectedTitle = '';

		if (!input) {
			return
		}

		if (input.type === 'VideoList') {
			if (feedback.options.value1 === true) {
				selectedTitle = 'Empty List';
				let x = '';
			
				if (input.list.find(list => list.selected === true)) {
					x = input.list.find(list => list.selected === true).filename;
				}	

				if (feedback.options.value2 === true) {
					selectedTitle = ': ' + x;
				} 
				else { selectedTitle = x; }
			}
			if (feedback.options.value2 === true){
				selectedTitle = input.selectedIndex + selectedTitle;
			}
	
		}
		else if (input.type === 'PowerPoint') {
			selectedTitle = input.selectedIndex;
		}

		if (bank.text != '') {
			return { text: bank.text + `\\n${selectedTitle}` };
		} else {
			return { text: bank.text + `${selectedTitle}` };
		}
	}

};
