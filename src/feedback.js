const { uniqueId } = require('lodash')
const { volumeAmplitudeToLinear } = require('./utils')

exports.initFeedbacks = function () {
	const feedbacks = {}

	const foregroundColor = {
		type: 'colorpicker',
		label: 'Foreground color',
		id: 'fg',
		default: this.rgb(255, 255, 255),
	}

	const foregroundColorBlack = {
		type: 'colorpicker',
		label: 'Foreground color',
		id: 'fgBlack',
		default: this.rgb(0, 0, 0),
	}

	const backgroundColorPreview = {
		type: 'colorpicker',
		label: 'Background color',
		id: 'bg',
		default: this.rgb(0, 255, 0),
	}

	const backgroundColorProgram = {
		type: 'colorpicker',
		label: 'Background color',
		id: 'bg',
		default: this.rgb(255, 0, 0),
	}

	const backgroundColorLayer = {
		type: 'colorpicker',
		label: 'Background color',
		id: 'bgLayer',
		default: this.rgb(0, 51, 204),
	}

	const backgroundColorDestination = {
		type: 'colorpicker',
		label: 'Background color',
		id: 'bgDestination',
		default: this.rgb(255, 255, 0),
	}

	const backgroundColorSource = {
		type: 'colorpicker',
		label: 'Background color',
		id: 'bgSource',
		default: this.rgb(255, 255, 255),
	}

	const input = {
		type: 'textinput',
		label: 'Input (Nr/Name/GUID)',
		id: 'input',
		default: '1',
	}

	const selectedIndex = {
		type: 'number',
		label: 'Selected Index',
		id: 'selectedIndex',
		default: 1,
		min: 1,
		max: 9999,
	}

	const mixInput = {
		type: 'dropdown',
		label: 'Mix',
		id: 'mix',
		default: 0,
		choices: [1, 2, 3, 4].map((id, index) => ({ id: index, label: id })),
	}

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
		],
	}

	const layerTallyIndicator = {
		type: 'dropdown',
		label: 'Layer Tally Indicator',
		id: 'tally',
		default: '',
		choices: [
			{ id: '', label: 'None' },
			{ id: 'border', label: 'Border' },
			{ id: 'corner', label: 'Corner Top Left' },
			{ id: 'cornerR', label: 'Corner Top Right' },
			{ id: 'cornerBL', label: 'Corner Bottom Left' },
			{ id: 'cornerBR', label: 'Corner Bottom Right' },
			{ id: 'full', label: 'Full Background' },
		],
	}

	feedbacks.inputPreview = {
		label: 'Preview - Change colors based on previewed input',
		description: 'If the specified input is previewed, change colors of the bank',
		options: [input, mixInput, foregroundColor, backgroundColorPreview, backgroundColorLayer, layerTallyIndicator],
	}

	feedbacks.inputLive = {
		label: 'Live - Change colors based on live input',
		description: 'If the specified input is live, change colors of the bank',
		options: [input, mixInput, foregroundColor, backgroundColorProgram, backgroundColorLayer, layerTallyIndicator],
	}

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
				choices: ['Any', '1', '2', '3', '4', 'Stinger 1', 'Stinger 2', 'Stinger 3', 'Stinger 4'].map((id, index) => ({
					id: index.toString(),
					label: id,
				})),
			},
			foregroundColor,
			{
				type: 'colorpicker',
				label: 'Preview Background Color',
				id: 'bgPreview',
				default: this.rgb(0, 255, 0),
			},
			{
				type: 'colorpicker',
				label: 'Program Background Color',
				id: 'bgProgram',
				default: this.rgb(255, 0, 0),
			},
		],
	}

	feedbacks.overlayStatusPGM = {
		label: 'Overlay - Overlay on PGM or PRV',
		description: 'Indicates if an overlay is previewed, or live',
		options: [
			{
				type: 'dropdown',
				label: 'Any input in overlay, active on',
				id: 'value',
				default: 'both',
				choices: [
					{ id: 'both', label: 'Program and Preview' },
					{ id: 'pgm', label: 'Program Only' },
					{ id: 'prv', label: 'Preview Only' },
				],
			},
			{
				type: 'dropdown',
				label: 'Overlay',
				id: 'overlay',
				default: '1',
				choices: ['Any', '1', '2', '3', '4', 'Stinger 1', 'Stinger 2', 'Stinger 3', 'Stinger 4'].map((id, index) => ({
					id: index.toString(),
					label: id,
				})),
			},
			foregroundColor,
			{
				type: 'colorpicker',
				label: 'Preview Background Color',
				id: 'bgPreview',
				default: this.rgb(0, 255, 0),
			},
			{
				type: 'colorpicker',
				label: 'Program Background Color',
				id: 'bgProgram',
				default: this.rgb(255, 0, 0),
			},
		],
	}

	feedbacks.videoTimer = {
		label: 'Video - Video Timer',
		description: 'Time remaining on video input',
		options: [
			input,
			{
				type: 'colorpicker',
				label: 'Text color',
				id: 'color',
				default: this.rgb(255, 255, 255),
			},
			{
				type: 'colorpicker',
				label: 'Text color under 30s',
				id: 'color30',
				default: this.rgb(255, 255, 0),
			},
			{
				type: 'colorpicker',
				label: 'Text color under 10s',
				id: 'color10',
				default: this.rgb(255, 0, 0),
			},
			{
				type: 'checkbox',
				label: 'Disable color change if looping',
				id: 'loop',
				default: false,
			},
		],
	}

	feedbacks.status = {
		label: 'vMix - status',
		description: 'Current status of vMix, such as recording, external, etc...',
		options: [
			{
				type: 'dropdown',
				label: 'Status Type',
				id: 'status',
				default: 'connection',
				choices: [
					'connection',
					'fadeToBlack',
					'recording',
					'external',
					'streaming',
					'multiCorder',
					'fullscreen',
					'playList',
				].map((id) => ({ id, label: id })),
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
					{ id: '2', label: '2' },
				],
			},
		],
	}

	feedbacks.busMute = {
		label: 'Audio - Bus mute',
		description: 'Indicate if a bus is muted',
		options: [
			{
				type: 'dropdown',
				label: 'Bus',
				id: 'bus',
				default: 'Master',
				choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id) => ({ id, label: id })),
			},
			foregroundColor,
			backgroundColorProgram,
		],
	}

	feedbacks.inputMute = {
		label: 'Audio - Input mute',
		description: 'Indicate if an input is muted',
		options: [input, foregroundColor, backgroundColorProgram],
	}

	feedbacks.inputAudio = {
		label: 'Audio - Input Audio',
		description: 'Indicate if an inputs Audio is ON',
		options: [input, foregroundColor, backgroundColorProgram],
	}

	feedbacks.inputSolo = {
		label: 'Audio - Input solo',
		description: 'Indicate if an input is set to Solo',
		options: [input, foregroundColor, backgroundColorProgram],
	}

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
				choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id) => ({ id, label: id })),
			},
			foregroundColor,
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: this.rgb(255, 255, 0),
			},
		],
	}

	feedbacks.liveInputVolume = {
		label: 'Audio - Input live dB value',
		description: 'Indicate what the live dB value on an input is',
		options: [
			input,
			{
				type: 'checkbox',
				label: 'Show the actual dB Value',
				id: 'value',
				default: false,
			},
			{
				type: 'checkbox',
				label: 'Color Text',
				id: 'colortxt',
				default: true,
			},
			{
				type: 'checkbox',
				label: 'Color Baggroung',
				id: 'colorbg',
				default: false,
			},
			{
				type: 'colorpicker',
				label: 'Basse Text Color',
				id: 'colorbase',
				default: this.rgb(255, 255, 255),
			},
			{
				type: 'colorpicker',
				label: 'Text color above -1 dB',
				id: 'color',
				default: this.rgb(255, 0, 0),
			},
			{
				type: 'colorpicker',
				label: 'Text color below -1 dB',
				id: 'color1',
				default: this.rgb(255, 255, 0),
			},
			{
				type: 'colorpicker',
				label: 'Text color below -6 dB',
				id: 'color6',
				default: this.rgb(0, 255, 0),
			},
			{
				type: 'colorpicker',
				label: 'Text color below -18 dB',
				id: 'color18',
				default: this.rgb(0, 192, 0),
			},
			{
				type: 'colorpicker',
				label: 'Text color below -36 dB',
				id: 'color36',
				default: this.rgb(0, 128, 0),
			},
		],
	}

	feedbacks.liveBusVolume = {
		label: 'Audio - Bus live dB value',
		description: 'Indicate what the live dB value on a bus is',
		options: [
			{
				type: 'dropdown',
				label: 'Bus',
				id: 'bus',
				default: 'Master',
				choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id) => ({ id, label: id })),
			},
			{
				type: 'checkbox',
				label: 'Show the actual dB value',
				id: 'value',
				default: false,
			},
			{
				type: 'checkbox',
				label: 'Color Text',
				id: 'colortxt',
				default: true,
			},
			{
				type: 'checkbox',
				label: 'Color Baggroung',
				id: 'colorbg',
				default: false,
			},
			{
				type: 'colorpicker',
				label: 'Basse Text Color',
				id: 'colorbase',
				default: this.rgb(255, 255, 255),
			},
			{
				type: 'colorpicker',
				label: 'Text color above -1 dB',
				id: 'color',
				default: this.rgb(255, 0, 0),
			},
			{
				type: 'colorpicker',
				label: 'Text color below -1 dB',
				id: 'color1',
				default: this.rgb(255, 255, 0),
			},
			{
				type: 'colorpicker',
				label: 'Text color below -6 dB',
				id: 'color6',
				default: this.rgb(0, 255, 0),
			},
			{
				type: 'colorpicker',
				label: 'Text color below -18 dB',
				id: 'color18',
				default: this.rgb(0, 192, 0),
			},
			{
				type: 'colorpicker',
				label: 'Text color below -36 dB',
				id: 'color36',
				default: this.rgb(0, 128, 0),
			},
		],
	}

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
				regex: this.REGEX_FLOAT_OR_INT,
			},
			foregroundColor,
			backgroundColorPreview,
		],
	}

	feedbacks.busVolumeLevel = {
		label: 'Audio - Bus Volume',
		description: 'Indicate if an output bus fader is within a set range',
		options: [
			{
				type: 'dropdown',
				label: 'Bus',
				id: 'bus',
				default: 'Master',
				choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Headphones'].map((id) => ({ id, label: id })),
			},
			comparison,
			{
				type: 'textinput',
				label: 'Value',
				id: 'value',
				default: '100',
				regex: this.REGEX_FLOAT_OR_INT,
			},
			foregroundColor,
			backgroundColorPreview,
		],
	}

	feedbacks.titleLayer = {
		label: 'Title - Layer',
		description: 'Returns the text of a title by title index or name',
		options: [
			input,
			{
				type: 'textinput',
				label: 'Layer',
				id: 'layer',
				default: '',
			},
		],
	}

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
					{ id: 'live', label: 'Live' },
				],
			},
			foregroundColor,
			backgroundColorProgram,
		],
	}

	feedbacks.replayEvents = {
		label: 'Replay - Events Tab',
		description: 'Indicates currently selected Events tab',
		options: [
			{
				type: 'dropdown',
				label: 'Events',
				id: 'events',
				default: '1',
				choices: ['1', '2', '3', '4', '5', '6', '7', '8'].map((id) => ({ id, label: id })),
			},
			foregroundColor,
			backgroundColorProgram,
		],
	}

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
					{ id: 'selected', label: 'Replay Selected' },
				],
			},
			{
				type: 'dropdown',
				label: 'Camera',
				id: 'camera',
				default: '1',
				choices: ['1', '2', '3', '4', '5', '6', '7', '8'].map((id) => ({ id, label: id })),
			},
			foregroundColor,
			backgroundColorProgram,
		],
	}

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
					{ id: 'B', label: 'B' },
				],
			},
			foregroundColor,
			backgroundColorProgram,
		],
	}

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
				],
			},
			foregroundColor,
			backgroundColorProgram,
		],
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
				choices: ['Master', 'Headphones', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id, index) => ({
					id: index > 1 ? `Bus${id}` : id,
					label: id,
				})),
			},
			foregroundColor,
			backgroundColorProgram,
		],
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
				default: this.rgb(0, 0, 0),
			},
			{
				type: 'colorpicker',
				label: 'Empty List Warning Bagground',
				id: 'eb',
				default: this.rgb(255, 255, 0),
			},
		],
	}

	feedbacks.inputSelectedIndexName = {
		label: 'Slides/List - Show Selected Slide/Index Name',
		description: 'Indicates what slide/index is selected',
		options: [
			input,
			{
				type: 'checkbox',
				label: 'Show Index Name',
				id: 'value1',
				default: true,
			},
			{
				type: 'checkbox',
				label: 'Show Index nr.',
				id: 'value2',
				default: false,
			},
		],
	}

	feedbacks.multiviewLayer = {
		label: 'Layers / MultiView - Display what input is on X Layer',
		description: 'Returns the input used in a Multiview Layer',
		options: [
			input,
			{
				type: 'number',
				label: 'Layer (1-10)',
				id: 'layer',
				default: 1,
				min: 1,
				max: 10,
			},
			{
				type: 'checkbox',
				label: 'Show input title',
				id: 'value',
				default: true,
			},
			{
				type: 'checkbox',
				label: 'Show input nr.',
				id: 'value2',
				default: false,
			},
		],
	}

	feedbacks.inputOnMultiview = {
		label: 'Layers / MultiView - check if X input in on Layer / MultiView on Y input',
		description: 'If the specified input is used in a Layer / MultiView, change colors of the bank',
		options: [
			{
				type: 'textinput',
				label: 'Input X (Nr/Name/GUID)',
				id: 'input',
				default: '1',
			},
			{
				type: 'textinput',
				label: 'Input Y (Nr/Name/GUID)',
				id: 'inputMV',
				default: '1',
			},
			{
				type: 'number',
				label: 'Layer (1-10, 0 = Any layer)',
				id: 'layer',
				default: 0,
				min: 0,
				max: 10,
			},
			{
				type: 'dropdown',
				label: 'Layer Tally Indicator',
				id: 'tally',
				default: 'cornerR',
				choices: [
					{ id: '', label: 'None' },
					{ id: 'border', label: 'Border' },
					{ id: 'corner', label: 'Corner Top Left' },
					{ id: 'cornerR', label: 'Corner Top Right' },
					{ id: 'cornerBL', label: 'Corner Bottom Left' },
					{ id: 'cornerBR', label: 'Corner Bottom Right' },
					{ id: 'full', label: 'Full Background' },
				],
			},
			foregroundColor,
			backgroundColorLayer,
		],
	}

	feedbacks.selectedDestinationInput = {
		label: 'Layers / MultiView - check selected destination input',
		description: 'If the input is selected as destination Input, change colors of the bank',
		options: [
			input,
			foregroundColorBlack,
			backgroundColorDestination,
		],
	}

	feedbacks.selectedDestinationLayer = {
		label: 'Layers / MultiView - check selected destination layer',
		description: 'If the layer is selected as destination Layer, change colors of the bank',
		options: [
			selectedIndex,
			foregroundColorBlack,
			backgroundColorDestination,
		],
	}

	feedbacks.routableMultiviewLayer = {
		label: 'Layers / MultiView - check if input in on destination Layer / MultiView of destination input',
		description: 'If the specified input is on destination Layer of destination input, change colors of the bank',
		options: [
			input,
			foregroundColorBlack,
			backgroundColorSource,
		],
	}

	return feedbacks
}

exports.executeFeedback = function (feedback, bank) {
	const int = RegExp(/^\d+$/)
	var opt = {}

	// If an option includes a variable, get it's value and replace the name for the actual value
	for (const property in feedback.options) {
		// if an option includes a variable, get it's value and replace the name for the actual value
		if (String(feedback.options[property]).includes('$(')) {
			// Replaces all variables with their selected values
			this.parseVariables(feedback.options[property], (temp) => {
				opt[property] = temp
			})
		} else {
			opt[property] = feedback.options[property]
		}
			opt[property] = encodeURIComponent(opt[property])
	}

	const getInput = (value) => {
		let input

		if (int.test(value)) {
			input = this.data.inputs.find((item) => item.number === value)
		} else {
			input = this.data.inputs.find((item) => item.shortTitle === value || item.title === value || item.key === value)
		}

		return input
	}

	if (feedback.type === 'inputPreview' || feedback.type === 'inputLive') {
		const mix = opt.mix !== undefined ? opt.mix : 0
		const type = feedback.type === 'inputPreview' ? 'preview' : 'program'
		const input = getInput(opt.input)
		if (!input || this.data.mix[mix][type] === 0 || !this.data.inputs[this.data.mix[mix][type] - 1]) {
			return
		}

		const previewTitle =
			this.data.inputs[this.data.mix[mix][type] - 1].shortTitle || this.data.inputs[this.data.mix[mix][type] - 1].title
		const guidKey = this.data.inputs[this.data.mix[mix][type] - 1].key
		const idCheck = int.test(opt.input) && opt.input == this.data.mix[mix][type]
		const titleCheck = !int.test(opt.input) && opt.input === previewTitle
		const guidCheck = opt.input == guidKey
		const layerTallyCheck =
			opt.tally !== undefined &&
			opt.tally !== '' &&
			this.data.mix[mix][type + 'Tally'].includes(input.key)

		if (idCheck || titleCheck || guidCheck) {
			return { color: opt.fg, bgcolor: opt.bg }
		} else if (layerTallyCheck) {
			if (opt.tally == 'full') {
				return { color: opt.fg, bgcolor: opt.bgLayer }
			}
			return { img64: this.indicators.getImage(opt.tally, opt.bgLayer) }
		}
	} else if (feedback.type === 'overlayStatus') {
		let input = getInput(opt.input)
		let preview = false
		let program = false

		if (!input) {
			return
		}

		this.data.overlays.forEach((overlay) => {
			const overlayNumberCheck = overlay.number === opt.overlay || opt.overlay === '0'
			const overlayInputCheck = overlay.input === input.number

			if (overlayNumberCheck && overlayInputCheck) {
				if (overlay.preview) {
					preview = true
				} else {
					program = true
				}
			}
		})

		if (preview || program) {
			return {
				color: opt.fg,
				bgcolor: program ? opt.bgProgram : opt.bgPreview,
			}
		}
	} else if (feedback.type === 'overlayStatusPGM') {
		let preview = false
		let program = false

		this.data.overlays.forEach((overlay) => {
			const overlayNumberCheck = overlay.number === opt.overlay || opt.overlay === '0'
			const overlayActive = overlay.input != undefined

			if (overlayNumberCheck && overlayActive) {
				switch (opt.value) {
					case 'both':
						if (overlay.preview) {
							preview = true
						} else {
							program = true
						}
						break

					case 'pgm':
						if (overlay.preview) {
							// do nothing
						} else {
							program = true
						}
						break

					case 'prv':
						if (overlay.preview) {
							preview = true
						} else {
							// do nothing
						}
						break

					default:
						break
				}
			}
		})

		if (preview || program) {
			return {
				color: opt.fg,
				bgcolor: program ? opt.bgProgram : opt.bgPreview,
			}
		}
	} else if (feedback.type === 'videoTimer') {
		let input = getInput(opt.input)

		if (!input || input.duration === '0') {
			return
		}

		let markType = input.duration

		// Detect if there is a "Mark Out" in the video
		if (input.markOut) {
			markType = input.markOut
		}

		const remaining = parseInt(markType, 10) - parseInt(input.position, 10)

		const ms = Math.floor((remaining % 1000) / 100)
		let sec = Math.floor((remaining % 60000) / 1000)
		let min = Math.floor(remaining / 60000)

		const color = () => {
			if (opt.loop || sec > 30 || min > 0) {
				return opt.color
			}
			if (sec > 10) {
				return opt.color30
			}
			return opt.color10
		}

		if (sec < 10) {
			sec = '0' + sec
		}

		if (min < 10) {
			min = '0' + min
		}

		if (bank.text != '') {
			return { color: color(), text: bank.text + `\\n ${min}:${sec}.${ms}` }
		} else {
			return { color: color(), text: bank.text + `${min}:${sec}.${ms}` }
		}
	} else if (feedback.type === 'status') {
		if (opt.status === 'connection') {
			if (this.data.connected) return { color: opt.fg, bgcolor: opt.bg }
		} else {
			if (this.data.status !== undefined) {
				if (opt.status === 'streaming' && ['0', '1', '2'].includes(opt.value)) {
					if (this.data.status.stream[opt.value])
						return { color: opt.fg, bgcolor: opt.bg }
				} else {
					if (this.data.status[opt.status])
						return { color: opt.fg, bgcolor: opt.bg }
				}
			}
		}
	} else if (feedback.type === 'busMute') {
		const busID = opt.bus === 'Master' ? 'master' : `bus${opt.bus}`
		const bus = this.data.audio.find((item) => item.bus === busID)

		if (bus && bus.muted === 'True') {
			return { color: opt.fg, bgcolor: opt.bg }
		}
	} else if (feedback.type === 'inputMute') {
		let input = getInput(opt.input)

		if (input && input.muted === 'True') {
			return { color: opt.fg, bgcolor: opt.bg }
		}
	} else if (feedback.type === 'inputAudio') {
		let input = getInput(opt.input)

		if (input && input.muted === 'False') {
			return { color: opt.fg, bgcolor: opt.bg }
		}
	} else if (feedback.type === 'inputSolo') {
		let input = getInput(opt.input)

		if (input && input.solo === 'True') {
			return { color: opt.fg, bgcolor: opt.bg }
		}
	} else if (feedback.type === 'inputBusRouting') {
		let input = getInput(opt.input)
		const busID = opt.bus === 'Master' ? 'M' : opt.bus

		if (input && input.audiobusses && input.audiobusses.includes(busID)) {
			return { color: opt.fg, bgcolor: opt.bg }
		}
	} else if (feedback.type === 'liveInputVolume') {
		let input = getInput(opt.input)

		// Detect if there is sound enabled on an input
		if (!input) {
			return
		}

		var dBLeft = parseFloat(input.meterF1)
		var dBRight = parseFloat(input.meterF2)

		dBLeft = (20 * Math.log(dBLeft)) / Math.LN10
		dBRight = (20 * Math.log(dBRight)) / Math.LN10

		dB = Math.max(dBLeft, dBRight)
		dB = +dB.toFixed(1)

		const color = () => {
			if (dB > -1) {
				return opt.color
			} else if (dB > -6) {
				return opt.color1
			} else if (dB > -18) {
				return opt.color6
			} else if (dB > -36) {
				return opt.color18
			}
			return opt.color36
		}

		let txt = ''
		let colorfg = ''
		let colorbg = ''

		if (opt.value == true) {
			if (bank.text != '') {
				txt = bank.text + `\\n ${dB} dB`
			} else {
				txt = bank.text + `${dB} dB`
			}
		} else {
			txt = bank.text
		}

		if (opt.colortxt == true) {
			colorfg = color()
		} else {
			colorfg = opt.colorbase
		}

		if (opt.colorbg == true) {
			colorbg = color()
		}
		return { color: colorfg, bgcolor: colorbg, text: txt }
	} else if (feedback.type === 'liveBusVolume') {
		var dBLeft
		var dBRight

		if (opt.bus === 'Headphones') {
			return
		} else {
			const busID = opt.bus === 'Master' ? 'master' : 'bus' + opt.bus
			const bus = this.data.audio.find((output) => output.bus === busID)
			if (bus !== undefined) {
				dBLeft = parseFloat(bus.meterF1)
				dBRight = parseFloat(bus.meterF2)
			}
		}

		dBLeft = (20 * Math.log(dBLeft)) / Math.LN10
		dBRight = (20 * Math.log(dBRight)) / Math.LN10

		dB = Math.max(dBLeft, dBRight)
		dB = +dB.toFixed(1)

		const color = () => {
			if (dB > -1) {
				return opt.color
			} else if (dB > -6) {
				return opt.color1
			} else if (dB > -18) {
				return opt.color6
			} else if (dB > -36) {
				return opt.color18
			}
			return opt.color36
		}

		let txt = ''
		let colorfg = ''
		let colorbg = ''

		if (opt.value == true) {
			if (bank.text != '') {
				txt = bank.text + `\\n ${dB} dB`
			} else {
				txt = bank.text + `${dB} dB`
			}
		} else {
			txt = bank.text
		}

		if (opt.colortxt == true) {
			colorfg = color()
		} else {
			colorfg = opt.colorbase
		}

		if (opt.colorbg == true) {
			colorbg = color()
		}
		return { color: colorfg, bgcolor: colorbg, text: txt }
	} else if (feedback.type === 'inputVolumeLevel') {
		let input = getInput(opt.input)
		if (input === undefined || input.volume === undefined) {
			return
		}

		const volume = this.config.volumeLinear ? volumeAmplitudeToLinear(input.volume) : parseFloat(input.volume)
		const value = parseFloat(opt.value)

		const volumeInRange = {
			eq: volume === value,
			lt: volume < value,
			lte: volume <= value,
			gt: volume > value,
			gte: volume >= value,
		}

		if (volumeInRange[opt.comparison]) {
			return { color: opt.fg, bgcolor: opt.bg }
		}
	} else if (feedback.type === 'busVolumeLevel') {
		const value = parseFloat(opt.value)
		let volume

		if (opt.bus === 'Headphones') {
			const bus = this.data.audio.find((output) => output.bus === 'master')
			volume = this.config.volumeLinear
				? volumeAmplitudeToLinear(bus.headphonesVolume)
				: parseFloat(bus.headphonesVolume)
		} else {
			const busID = opt.bus === 'Master' ? 'master' : 'bus' + opt.bus
			const bus = this.data.audio.find((output) => output.bus === busID)
			if (bus !== undefined) {
				volume = this.config.volumeLinear ? volumeAmplitudeToLinear(bus.volume) : parseFloat(bus.volume)
			}
		}

		const volumeInRange = {
			eq: volume === value,
			lt: volume < value,
			lte: volume <= value,
			gt: volume > value,
			gte: volume >= value,
		}

		if (volumeInRange[opt.comparison]) {
			return { color: opt.fg, bgcolor: temp_opt.bg }
		}
	} else if (feedback.type === 'titleLayer') {
		let input = getInput(temp_opt.input)
		let text

		if (input && input.text) {
			if (int.test(temp_opt.layer)) {
				text = input.text.find((item) => item.index === temp_opt.layer)
			} else {
				text = input.text.find((item) => item.name === temp_opt.layer)
			}
		}

		if (text && text.value) {
			return { text: bank.text + text.value }
		}
	} else if (feedback.type === 'replayStatus') {
		if (this.data.replay[temp_opt.status]) {
			return { color: temp_opt.fg, bgcolor: temp_opt.bg }
		}
	} else if (feedback.type === 'replayEvents') {
		if (this.data.replay.events === temp_opt.events) {
			return { color: temp_opt.fg, bgcolor: temp_opt.bg }
		}
	} else if (feedback.type === 'replayCamera') {
		let channel = temp_opt.channel
		if (channel === 'selected') {
			// Backways compatibility - Default to channel A if prior to v24
			channel = this.data.replay.channelMode ? this.data.replay.channelMode : 'A'
			if (channel === 'AB') channel = 'A'
		}

		if (this.data.replay['camera' + channel] === temp_opt.camera) {
			return { color: temp_opt.fg, bgcolor: temp_opt.bg }
		}
	} else if (feedback.type === 'replaySelectedChannel') {
		if (this.data.replay.channelMode && this.data.replay.channelMode === temp_opt.channel) {
			return { color: temp_opt.fg, bgcolor: temp_opt.bg }
		}
	} else if (feedback.type === 'videoCallVideoSource') {
		let input = getInput(temp_opt.input)

		if (input && input.callVideoSource === temp_opt.source) {
			return { color: temp_opt.fg, bgcolor: temp_opt.bg }
		}
	} else if (feedback.type === 'videoCallAudioSource') {
		let input = getInput(temp_opt.input)

		if (
			input &&
			this.activatorData.videoCall[input.key] &&
			this.activatorData.videoCall[input.key].audioSource === temp_opt.source
		) {
			return { color: temp_opt.fg, bgcolor: temp_opt.bg }
		}
	} else if (feedback.type === 'inputSelectedIndex') {
		let input = getInput(temp_opt.input)

		if (!input) {
			return
		}

		if (input.type === 'VideoList') {
			if (input && parseInt(input.selectedIndex) === parseInt(temp_opt.selectedIndex)) {
				return { color: temp_opt.fg, bgcolor: temp_opt.bg }
			} else if (input && input.list[0].empty === true) {
				return { color: temp_opt.et, bgcolor: temp_opt.eb }
			}
		} else if (input.type === 'PowerPoint') {
			if (input && parseInt(input.selectedIndex) === parseInt(temp_opt.selectedIndex)) {
				return { color: temp_opt.fg, bgcolor: temp_opt.bg }
			}
		} else {
			return { color: this.rgb(255, 255, 255), bgcolor: this.rgb(0, 0, 0) }
		}
	} else if (feedback.type === 'inputSelectedIndexName') {
		let input = getInput(temp_opt.input)
		let selectedTitle = ''

		if (!input) {
			return
		}

		if (input.type === 'VideoList') {
			if (temp_opt.value1 === true) {
				selectedTitle = 'Empty List'
				let x = ''

				if (input.list.find((list) => list.selected === true)) {
					x = input.list.find((list) => list.selected === true).filename
				}

				if (temp_opt.value2 === true) {
					selectedTitle = ': ' + x
				} else {
					selectedTitle = x
				}
			}
			if (temp_opt.value2 === true) {
				selectedTitle = input.selectedIndex + selectedTitle
			}
		} else if (input.type === 'PowerPoint') {
			selectedTitle = input.selectedIndex
		}

		if (bank.text != '') {
			return { text: bank.text + `\\n${selectedTitle}` }
		} else {
			return { text: bank.text + `${selectedTitle}` }
		}
	} else if (feedback.type === 'multiviewLayer') {
		const inputMV = getInput(temp_opt.input)
		const layer = temp_opt.layer - 1
		let text = ''

		if (inputMV && inputMV.overlay) {
			let x = inputMV.overlay.find((item) => parseInt(item.index) === layer)
			if (x != undefined) {
				let shortTitle = getInput(x.key).shortTitle
				let number = getInput(x.key).number

				if (temp_opt.value2 == true) {
					text = text + number
				}
				if (temp_opt.value == true && temp_opt.value2 == true) {
					text = text + ' '
				}
				if (temp_opt.value == true) {
					text = text + shortTitle
				}
			}
		}

		if (text == '') {
			return
		} // if nothing is selected then only display what is int buttons title

		if (bank.text != '') {
			return { text: bank.text + `\\n${text}` }
		} else {
			return { text: bank.text + `${text}` }
		}
	} else if (feedback.type === 'inputOnMultiview') {
		const input = getInput(temp_opt.input)
		const inputMV = getInput(temp_opt.inputMV)
		const layer = temp_opt.layer - 1
		var tally = false

		if (inputMV && inputMV.overlay) {
			if (temp_opt.layer == '0') {
				// Check any layer
				tally = inputMV.overlay.find((item) => item.key === input.key) ? true : false
			} else {
				// Check specific Layer

				let x = inputMV.overlay.find((item) => parseInt(item.index) === layer)
				if (x != undefined) {
					tally = x.key == input.key
				}
			}
		}

		if (tally == true) {
			if (temp_opt.tally == 'full') {
				return { color: temp_opt.fg, bgcolor: temp_opt.bgLayer }
			}
			return { img64: this.indicators.getImage(temp_opt.tally, temp_opt.bgLayer) }
		}

	} else if (feedback.type === 'selectedDestinationInput'){
		this.checkFeedbacks("routableMultiviewLayer")
		if (parseInt(temp_opt.input) == this.destinationInput) {
			return { color: temp_opt.fgBlack, bgcolor: temp_opt.bgDestination }
		}

	} else if (feedback.type === 'selectedDestinationLayer'){
		this.checkFeedbacks("routableMultiviewLayer")
		if (parseInt(temp_opt.selectedIndex) == this.destinationLayer) {
			return { color: temp_opt.fgBlack, bgcolor: temp_opt.bgDestination }
		}

	} else if (feedback.type === 'routableMultiviewLayer') {
		const input = getInput(temp_opt.input)
		const inputMV = getInput(this.destinationInput.toString(10))
		const layer = this.destinationLayer - 1
		var tally = false

		if (inputMV && inputMV.overlay) {
			let x = inputMV.overlay.find((item) => parseInt(item.index) === layer)
			if (x != undefined) {
				tally = x.key == input.key
			}
		}

		if (tally == true) {
			return { color: temp_opt.fgBlack, bgcolor: temp_opt.bgSource }
		} else if (input === inputMV) {
			return { color: this.rgb(128, 128, 128), bgcolor: this.rgb(16, 16, 16)}
		}

	}
}
