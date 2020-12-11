const events = {
	inputProgram: [
		'Input',
		'InputMix2',
		'InputMix3',
		'InputMix4'
	],
	inputPreview: [
		'InputPreview',
		'InputPreviewMix2',
		'InputPreviewMix3',
		'InputPreviewMix4'
	],
	inputDynamic: [
		'InputDynamic1',
		'InputDynamic2',
		'InputDynamic3',
		'InputDynamic4'
	],
	inputState: [
		'InputPlaying',
		'InputVolume',
		'InputAudio',
		'InputSolo'
	],
	inputAudio: [
		'InputHeadphones',
		'InputMasterAudio',
		'InputBusAAudio',
		'InputBusBAudio',
		'InputBusCAudio',
		'InputBusDAudio',
		'InputBusEAudio',
		'InputBusFAudio',
		'InputBusGAudio'
	],
	overlays: [
		'Overlay1',
		'Overlay2',
		'Overlay3',
		'Overlay4'
	],
	vMixState: [
		'FadeToBlack',
		'Recording',
		'Streaming',
		'External',
		'MultiCorder',
		'Fullscreen'
	],
	busAudio: [
		'MasterVolume',
		'MasterAudio',
		'MasterHeadphones',
		'BusAVolume',
		'BusAAudio',
		'BusBVolume',
		'BusBAudio',
		'BusCVolume',
		'BusCAudio',
		'BusDVolume',
		'BusDAudio',
		'BusEVolume',
		'BusEAudio',
		'BusFVolume',
		'BusFAudio',
		'BusGVolume',
		'BusGAudio'
	],
	replay: [
		'ReplayPlaying',
		'ReplayCamera1',
		'ReplayCamera2',
		'ReplayCamera3',
		'ReplayCamera4',
		'ReplayCamera5',
		'ReplayCamera6',
		'ReplayCamera7',
		'ReplayCamera8',
		'ReplayACamera1',
		'ReplayACamera2',
		'ReplayACamera3',
		'ReplayACamera4',
		'ReplayACamera5',
		'ReplayACamera6',
		'ReplayACamera7',
		'ReplayACamera8',
		'ReplayBCamera1',
		'ReplayBCamera2',
		'ReplayBCamera3',
		'ReplayBCamera4',
		'ReplayBCamera5',
		'ReplayBCamera6',
		'ReplayBCamera7',
		'ReplayBCamera8',
		'ReplayRecording',
		'ReplayPlayForward',
		'ReplayPlayBackward'
	]
};

const bufferDelay = 50;
const feedbackBuffer = new Set();
const variableBuffer = new Set();
let bufferCheckTimeout;

exports.parseActivactor = function (message) {
	const updateBuffer = (type, name, value) => {
		if (type === 'feedback') {
			feedbackBuffer.add(name);
		} else {

			// Adds variable to be updated, or updates the pending value if it already exists in set
			let hit = false;
			variableBuffer.forEach(item => {
				if (item.name === name) {
					hit = true;
					item.value = value;
				}
			});

			if (!hit) {
				variableBuffer.add({ name, value });
			}
		}

		if (!bufferCheckTimeout) {
			bufferCheckTimeout = setTimeout(() => {
				feedbackBuffer.forEach(feedback => {
					this.checkFeedbacks(feedback);
				});
				variableBuffer.forEach(variable => {
					this.setVariable(variable.name, variable.value);
				});

				feedbackBuffer.clear();
				variableBuffer.clear();
				bufferCheckTimeout = null;
			}, bufferDelay);
		} else {
		}
	};

	const params = message.split(' ');

	if (events.inputProgram.includes(params[0]) || events.inputPreview.includes(params[0])) {
		// Note - InputMix2 to InputMix4 activator messages are inconsistent, and may not always reflect what's live in vMix
		const mix = events.inputProgram.includes(params[0]) ? events.inputProgram.indexOf(params[0]) : events.inputPreview.indexOf(params[0]);
		const input = params[1];
		const state = params[2];
		const type = events.inputProgram.includes(params[0]) ? 'program' : 'preview';

		if (state === '1') {
			this.data.mix[mix][type] = parseInt(input, 10);

			// Update layer tally
			const checkTally = (layerType, input) => {
				if (input && !this.data.mix[mix][layerType].includes(input.key)) {
					this.data.mix[mix][layerType].push(input.key);

					input.overlay.forEach(layer => {
						checkTally(layerType, this.data.inputs.find(input => input.key === layer.key));
					})
				}
			};

			this.data.mix[mix][type + 'Tally'] = [];
			checkTally(type + 'Tally', this.data.inputs.find(input => input.number == this.data.mix[mix][type]));

			updateBuffer('feedback', type === 'program' ? 'inputLive' : 'inputPreview');
		}
	}

	else if (events.inputDynamic.includes(params[0])) {
		// Waiting on v24
	}

	else if (events.inputState.includes(params[0])) {
		const input = this.data.inputs.find(input => input.number === params[1]);
		if (!input) {
			return
		}

		if (params[0] === 'InputPlaying') {
			input.state = params[2] === '0' ? 'Paused' : 'Running';
		}

		else if (params[0] === 'InputVolume') {
			const volume = Math.round(parseFloat(params[2] * 100));

			if (input.shortTitle) {
				let inputName = input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '');
				updateBuffer('variable', `input_volume_${inputName}`, volume);
			}
			updateBuffer('feedback', 'inputVolumeLevel');
		}

		else if (params[0] === 'InputAudio') {
			input.muted = params[2] === '1' ? 'False' : 'True';
			updateBuffer('feedback', 'inputMute');
		}

		else if (params[0] === 'InputSolo') {
			input.solo = params[2] === '0' ? 'False' : 'True';
			updateBuffer('feedback', 'inputSolo');
		}

	}

	else if (events.inputAudio.includes(params[0])) {
		const input = this.data.inputs.find(input => input.number === params[1]);
		if (!input) {
			return
		}

		if (params[0] === 'InputHeadphones') {
			// Unused
		} else {
			let bus = params[0] === 'InputMasterAudio' ? 'M' : params[0][8];
			let audiobusses = input.audiobusses.split(',');

			if (params[2] === '1') {
				audiobusses.push(bus);
			} else {
				audiobusses = audiobusses.filter(item => item !== bus);
			}

			input.audiobusses = audiobusses.join(',');
			updateBuffer('feedback', 'inputBusRouting');
		}
	}

	else if (params[0].startsWith('InputVolumeChannelMixer')) {
		const input = this.data.inputs.find(input => input.number === params[1]);
		if (!input) {
			return
		}

		const channel = params[0].substr(23);
		this.activatorData.channelMixer[input.key][channel - 1].volume = Math.round(parseFloat(params[2] * 100));
	}

	else if (events.overlays.includes(params[0])) {
		// Unused - Activator doesn't differentiate between preview and program overlays
	}

	else if (events.vMixState.includes(params[0])) {
		const status = params[0][0].toLowerCase() + params[0].substr(1);

		this.data.status[status] = params[2] === '1';
		updateBuffer('feedback', 'status');
	}

	else if (events.busAudio.includes(params[0])) {
		let id = params[0].startsWith('Master') ? 'master' : params[0][3];
		if (!params[0].startsWith('Master')) {
			id = 'bus' + id;
		}

		if (params[0] === 'MasterHeadphones') {
			updateBuffer('variable', 'bus_volume_headphones', Math.round(parseFloat(params[1] * 100)));
		}
		else if (params[0].endsWith('Volume')) {
			const bus = this.data.audio.find(item => item.bus === id);
			if (bus) {
				bus.volume = Math.round(parseFloat(params[2] * 100)).toString();
			}

			const variableID = params[0].startsWith('Master') ? 'master' : params[0][3];
			updateBuffer('variable', `bus_volume_${variableID.toLowerCase()}`, Math.round(parseFloat(params[1] * 100)));
			updateBuffer('feedback', 'busVolumeLevel');
			updateBuffer('feedback', 'liveBusVolume');

		}
		else if (params[0].endsWith('Audio')) {
			const bus = this.data.audio.find(item => item.bus === id);
			if (bus) {
				bus.muted = params[1] === '0' ? 'True' : 'False';
			}

			updateBuffer('feedback', 'busMute');
		}
	}

	else if (events.replay.includes(params[0])) {
		if (params[0].startsWith('ReplayCamera')) {
			// Unused
		}
		else if (params[0].includes('Camera')) {
			const camera = params[0][6];

			if (params[1] === '1') {
				this.data.replay['camera' + camera] = params[0].substr(13);
				updateBuffer('feedback', 'replayCamera');
			}
		}
		else if (params[0] === 'ReplayPlayForward') {
			// Unused
		}
		else if (params[0] === 'ReplayPlayBackward') {
			// Unused
		}
	}

	else if (params[0].startsWith('VideoCallAudioSource')) {
		const input = this.data.inputs.find(input => input.number === params[1]);
		if (!input) {
			return
		}

		if (!this.activatorData.videoCall[input.key]) {
			this.activatorData.videoCall[input.key] = {};
		}

		this.activatorData.videoCall[input.key].audioSource = params[0].substr(20);
		updateBuffer('feedback', 'videoCallAudioSource');
	}

	else if (params[0] === 'ButtonPress') {
		// Unused
	}

	else {
		this.debug(`Unknown vMix activator: ${params[0]}`)
	}
};