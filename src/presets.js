exports.initPresets = function() {
	const presets = [];

	const createPreset = (category, item, actions, feedbacks) => {
		return {
			category,
			label: item.label,
			bank: {
				style: 'text',
				text: item.label,
				size: item.size || 'auto',
				color: item.color || this.rgb(255, 255, 255),
				bgcolor: item.bgcolor || this.rgb(0, 0, 0)
			},
			actions,
			feedbacks
		};
	};

	// Mix 1
	const mix1PreviewProgram = [
		{ id: 'PreviewInput', mix: '1', input: '1', label: 'PRV 1', size: '24' },
		{ id: 'PreviewInput', mix: '1', input: '2', label: 'PRV 2', size: '24' },
		{ id: 'PreviewInput', mix: '1', input: '3', label: 'PRV 3', size: '24' },
		{ id: 'PreviewInput', mix: '1', input: '4', label: 'PRV 4', size: '24' },
		{ id: 'PreviewInput', mix: '1', input: '5', label: 'PRV 5', size: '24' },
		{ id: 'PreviewInput', mix: '1', input: '6', label: 'PRV 6', size: '24' },
		{ id: 'PreviewInput', mix: '1', input: '7', label: 'PRV 7', size: '24' },
		{ id: 'PreviewInput', mix: '1', input: '8', label: 'PRV 8', size: '24' },
		{ id: 'programCut', mix: '1', input: '1', label: 'PRGM 1', size: '24' },
		{ id: 'programCut', mix: '1', input: '2', label: 'PRGM 2', size: '24' },
		{ id: 'programCut', mix: '1', input: '3', label: 'PRGM 3', size: '24' },
		{ id: 'programCut', mix: '1', input: '4', label: 'PRGM 4', size: '24' },
		{ id: 'programCut', mix: '1', input: '5', label: 'PRGM 5', size: '24' },
		{ id: 'programCut', mix: '1', input: '6', label: 'PRGM 6', size: '24' },
		{ id: 'programCut', mix: '1', input: '7', label: 'PRGM 7', size: '24' },
		{ id: 'programCut', mix: '1', input: '8', label: 'PRGM 8', size: '24' },
		{ id: 'transitionMix', mix: '1', type: 'Cut', label: 'Cut', size: '24' },
		{ id: 'transitionMix', mix: '1', type: 'Fade', label: 'Fade', size: '24' },
		{ id: 'transition', label: 'AUTO', size: '24'}
	];

	mix1PreviewProgram.forEach(item => {
		const actions = [];
		const feedbacks = [];

		if (item.id === 'PreviewInput') {
			actions.push({ action: item.id, options: { mix: item.mix, input: item.input } });
			feedbacks.push({ type: 'inputPreview', options: { mix: item.mix, input: item.input, fg: this.rgb(255, 255, 255), bg: this.rgb(0, 255, 0) } });
		}
		
		else if (item.id === 'programCut') {
			actions.push({ action: item.id, options: { mix: item.mix, input: item.input } });
			feedbacks.push({ type: 'inputLive', options: { mix: item.mix, input: item.input, fg: this.rgb(255, 255, 255), bg: this.rgb(255, 0, 0) } });
		}
		
		else if (item.id === 'transitionMix') {
			actions.push({ action: item.id, options: { mix: item.mix, functionID: item.type } });
		}
		
		else {
			actions.push({ action: item.id, options: { functionID: 'Transition1' } });
		}

		const preset = createPreset('Mix 1', item, actions, feedbacks);
		presets.push(preset);
	});

	// Mix 2-4
	const mix2PreviewProgram = [
		{ id: 'PreviewInput', mix: '2', input: '1', label: 'PRV MIX 2', size: '24' },
		{ id: 'PreviewInput', mix: '3', input: '1', label: 'PRV MIX 3', size: '24' },
		{ id: 'PreviewInput', mix: '4', input: '1', label: 'PRV MIX 4', size: '24' },
		{ id: 'programCut', mix: '2', input: '1', label: 'PRGM MIX 2', size: '24' },
		{ id: 'programCut', mix: '3', input: '1', label: 'PRGM MIX 3', size: '24' },
		{ id: 'programCut', mix: '4', input: '1', label: 'PRGM MIX 4', size: '24' },
		{ id: 'transitionMix', mix: '2', type: 'Cut', label: 'Cut MIX 2', size: '24' },
		{ id: 'transitionMix', mix: '3', type: 'Cut', label: 'Cut MIX 3', size: '24' },
		{ id: 'transitionMix', mix: '4', type: 'Cut', label: 'Cut MIX 4', size: '24' },
		{ id: 'transitionMix', mix: '2', type: 'Fade', label: 'Fade MIX 2', size: '24' },
		{ id: 'transitionMix', mix: '3', type: 'Fade', label: 'Fade MIX 3', size: '24' },
		{ id: 'transitionMix', mix: '4', type: 'Fade', label: 'Fade MIX 4', size: '24' },
	];

	mix2PreviewProgram.forEach(item => {
		const actions = [];
		const feedbacks = [];

		if (item.id === 'PreviewInput') {
			actions.push({ action: item.id, options: { mix: item.mix, input: item.input } });
			feedbacks.push({ type: 'inputPreview', options: { mix: item.mix, input: item.input, fg: this.rgb(255, 255, 255), bg: this.rgb(0, 255, 0) } });
		}
		
		else if (item.id === 'programCut') {
			actions.push({ action: item.id, options: { mix: item.mix, input: item.input } });
			feedbacks.push({ type: 'inputLive', options: { mix: item.mix, input: item.input, fg: this.rgb(255, 255, 255), bg: this.rgb(255, 0, 0) } });
		}
		
		else if (item.id === 'transitionMix') {
			actions.push({ action: item.id, options: { mix: item.mix, functionID: item.type } });
		}
		
		const preset = createPreset('Mix 2-4', item, actions, feedbacks);
		presets.push(preset);
	});
	
	// Replay
	const replayCameras = [
		{ channel: 'A', camera: '1', size: '24', label: 'A Cam 1' },
		{ channel: 'A', camera: '2', size: '24', label: 'A Cam 2' },
		{ channel: 'A', camera: '3', size: '24', label: 'A Cam 3' },
		{ channel: 'A', camera: '4', size: '24', label: 'A Cam 4' },
		{ channel: 'B', camera: '1', size: '24', label: 'B Cam 1' },
		{ channel: 'B', camera: '2', size: '24', label: 'B Cam 2' },
		{ channel: 'B', camera: '3', size: '24', label: 'B Cam 3' },
		{ channel: 'B', camera: '4', size: '24', label: 'B Cam 4' }
	];

	const replayFunctions = [
		{ id: 'replayRecording', label: 'Rec' },
		{ id: 'ReplayLiveToggle', label: 'Live' },
		{ id: 'ReplayJumpToNow', label: 'Jump to Now' },
		{ id: 'ReplayPlay', label: 'Play Events' },
		{ id: 'ReplayPause', label: 'Pause Events' }
	];

	const replayMarks = [
		{ id: 'replayMark', functionID: 'ReplayMarkIn', label: 'Mark In' },
		{ id: 'replayMark', functionID: 'ReplayMarkOut', label: 'Mark Out' },
		{ id: 'replayMark', functionID: 'ReplayMarkInOut', value: '10', label: 'Mark Last 10' },
		{ id: 'replayMark', functionID: 'ReplayMarkInOut', value: '30', label: 'Mark Last 30' },
		{ id: 'replayUpdateInOut', functionID: 'ReplayUpdateSelectedInPoint', size: '18', label: 'Update In' },
		{ id: 'replayUpdateInOut', functionID: 'ReplayUpdateSelectedOutPoint', size: '18', label: 'Update Out' }
	];

	replayCameras.forEach(item => {
		const actions = [{ action: item.channel === 'A' ? 'replayACamera' : 'replayBCamera', options: { functionID: `Replay${item.channel}Camera${item.camera}` } }];
		const feedbacks = [{ type: 'replayCamera', options: { channel: item.channel, camera: item.camera, fg: this.rgb(255, 255, 255), bg: this.rgb(255, 0, 0) } }];
		const preset = createPreset('Replay', item, actions, feedbacks);
		presets.push(preset);
	});

	replayFunctions.forEach(item => {
		const actions = [];
		const feedbacks = [];

		if (item.id === 'replayRecording') {
			actions.push({ action: item.id, options: { functionID: 'ReplayStartRecording' } });
			feedbacks.push({ type: 'replayStatus', options: { status: 'recording', fg: this.rgb(255, 255, 255), bg: this.rgb(255, 0, 0) } });
		}
		
		else if (item.id === 'ReplayLiveToggle') {
			actions.push({ action: item.id });
			feedbacks.push({ type: 'replayStatus', options: { status: 'live', fg: this.rgb(255, 255, 255), bg: this.rgb(255, 0, 0) } });
		}
		
		else {
			actions.push({ action: item.id });
		}

		const preset = createPreset('Replay', item, actions, feedbacks);
		presets.push(preset);
	});

	replayMarks.forEach(item => {
		const actions = [{ action: item.id, options: { functionID: item.functionID } }];

		if (item.value) {
			actions[0].options.value = item.value;
		}

		const preset = createPreset('Replay', item, actions, []);
		presets.push(preset);
	});

	// General Commands
	const commands = [
		{ id: 'NextPicture', size: '18', label: 'Next Photo' },
		{ id: 'PreviousPicture', size: '18', label: 'Prev Photo' },
		{ id: 'KeyPress', size: '18', label: 'Send Key Press' },
		{ id: 'ScriptStart', size: '18', label: 'Script Start' },
		{ id: 'ScriptStop', size: '18', label: 'Script Stop' },
		{ id: 'ScriptStopAll', size: '14', label: 'Script Stop All' },
		{ id: 'command', size: '14', label: 'Custom Command' }
	];

	commands.forEach(item => {
		const actions = [];

		if (['NextPicture', 'PreviousPicture'].includes(item.id)) {
			actions.push({ action: item.id, options: { input: '1' } });
		} else if (['KeyPress', 'ScriptStart', 'ScriptStop', 'ScriptStopAll'].includes(item.id)) {
			actions.push({ action: item.id, options: { value: '' } });
		} else if (item.id === 'command') {
			actions.push({ action: item.id, options: { command: '' } });
		}

		const preset = createPreset('General Commands', item, actions, []);
		presets.push(preset);
	});

	// Transitions
	const presetTransitions = [
		{ id: 'Transition1', size: '14', label: 'Transition 1' },
		{ id: 'Transition2', size: '14', label: 'Transition 2' },
		{ id: 'Transition3', size: '14', label: 'Transition 3' },
		{ id: 'Transition4', size: '14', label: 'Transition 4' },
		{ id: 'Stinger1', size: '18', label: 'Stinger 1' },
		{ id: 'Stinger2', size: '18', label: 'Stinger 2' }
	];

	const individualTransitions = [
		{ id: 'Cut', size: '18', label: 'Cut' },
		{ id: 'Fade', size: '18', label: 'Fade' },
		{ id: 'Zoom', size: '18', label: 'Zoome' },
		{ id: 'Wipe', size: '18', label: 'Wipe' },
		{ id: 'Slide', size: '18', label: 'Slide' },
		{ id: 'Fly', size: '18', label: 'Fly' },
		{ id: 'CrossZoom', size: '18', label: 'Cross Zoom' },
		{ id: 'FlyRotate', size: '18', label: 'Fly Rotate' },
		{ id: 'Cube', size: '18', label: 'Cube' },
		{ id: 'CubeZoom', size: '18', label: 'Cube Zoom' },
		{ id: 'VerticalWipe', size: '18', label: 'Vertical Wipe' },
		{ id: 'VerticalSlide', size: '18', label: 'Vertical Slide' },
		{ id: 'Merge', size: '18', label: 'Merge' },
		{ id: 'WipeReverse', size: '18', label: 'Wipe Reverse' },
		{ id: 'SlideReverse', size: '18', label: 'Slide Reverse' },
		{ id: 'VerticalWipeReverse', size: '14', label: 'Vertical Wipe Reverse' },
		{ id: 'VerticalSlideReverse', size: '14', label: 'Vertical Slide Reverse' }
	];

	presetTransitions.forEach(item => {
		const actions = [{ action: 'transition', options: { functionID: item.id } }];
		const preset = createPreset('Transitions', item, actions, []);
		presets.push(preset);
	});

	individualTransitions.forEach(item => {
		const actions = [{ action: 'transitionMix', options: { functionID: item.id, mix: 0, duration: 1000 } }];
		const preset = createPreset('Transitions', item, actions, []);
		presets.push(preset);
	});

	// vMix Functions
	const toggleFunctions = [
		{ id: 'StartStopMultiCorder', size: '18', label: 'Toggle Multi', status: 'multiCorder' },
		{ id: 'StartStopRecording', size: '18', label: 'Toggle Rec', status: 'recording' },
		{ id: 'StartStopStreaming', size: '18', label: 'Toggle Stream', status: 'streaming' },
		{ id: 'StartStopExternal', size: '18', label: 'Toggle Ext', status: 'external' },
		{ id: 'Fullscreen', size: '18', label: 'Toggle Full', status: 'fullscreen' },
		{ id: 'FadeToBlack', size: '18', label: 'Toggle FTB', status: 'fadeToBlack' }
	];

	toggleFunctions.forEach(item => {
		const actions = [{ action: 'toggleFunctions', options: { functionID: item.id, value: '' } }];
		const feedbacks = [{ type: 'status', options: { status: item.status, color: this.rgb(255, 255, 255), bgcolor: this.rgb(255, 0, 0), value: '' } }];
		const preset = createPreset('vMix Functions', item, actions, feedbacks);
		presets.push(preset);
	});

	// Outputs
	const outputRouting = [
		{ id: 'SetOutput2', size: '14', label: 'Output2\\n-\\n' },
		{ id: 'SetOutput3', size: '14', label: 'Output3\\n-\\n' },
		{ id: 'SetOutput4', size: '14', label: 'Output4\\n-\\n' },
		{ id: 'SetOutputExternal2', size: '14', label: 'External\\n-\\n' },
		{ id: 'SetOutputFullscreen', size: '14', label: 'FS 1\\n-\\n' },
		{ id: 'SetOutputFullscreen2', size: '14', label: 'FS 2\\n-\\n' }
	];

	const outputTypes = [
		{ id: 'Output', short: 'PGM' },
		{ id: 'Preview', short: 'Prev' },
		{ id: 'MultiView', short: 'Multi' },
		{ id: 'Input', short: 'In' }
	];

	outputRouting.forEach(item => {
		outputTypes.forEach(type => {
			const presetItem = { ...item, label: item.label + type.short };
			const actions = [{ action: 'outputSet', options: { functionID: item.id, value: type.id, input: '1' } }];
			const preset = createPreset('Outputs', presetItem, actions, []);
			presets.push(preset);
		});
	});

	// Playlist
	const playlistFunctions = [
		{ id: 'StartPlayList', size: '18', label: 'Playlist Start' },
		{ id: 'StopPlayList', size: '18', label: 'Playlist Stop' },
		{ id: 'NextPlayListEntry', size: '18', label: 'Playlist Next' },
		{ id: 'PreviousPlayListEntry', size: '18', label: 'Playlist Prev' }
	];

	playlistFunctions.forEach(item => {
		const actions = [{ action: 'playListFunctions', options: { functionID: item.id } }];
		const preset = createPreset('PlayList', item, actions, []);
		presets.push(preset);
	});

	// Overlays
	const overlayFunctions = [
		{ id: 'OverlayInput1', size: '18', label: 'PGM OVL 1' },
		{ id: 'OverlayInput2', size: '18', label: 'PGM OVL 2' },
		{ id: 'OverlayInput3', size: '18', label: 'PGM OVL 3' },
		{ id: 'OverlayInput4', size: '18', label: 'PGM OVL 4' },
		{ id: 'PreviewOverlayInput1', size: '18', label: 'PREW OVL 1' },
		{ id: 'PreviewOverlayInput2', size: '18', label: 'PREW OVL 2' },
		{ id: 'PreviewOverlayInput3', size: '18', label: 'PREW OVL 3' },
		{ id: 'PreviewOverlayInput4', size: '18', label: 'PREW OVL 4' },
		{ id: 'OverlayInput1In', size: '14', label: 'Tran OVL 1 ON' },
		{ id: 'OverlayInput2In', size: '14', label: 'Tran OVL 2 ON' },
		{ id: 'OverlayInput3In', size: '14', label: 'Tran OVL 3 ON' },
		{ id: 'OverlayInput4In', size: '14', label: 'Tran OVL 4 ON' },
		{ id: 'OverlayInput1Out', size: '14', label: 'Tran OVL 1 OFF' },
		{ id: 'OverlayInput2Out', size: '14', label: 'Tran OVL 2 OFF' },
		{ id: 'OverlayInput3Out', size: '14', label: 'Tran OVL 3 OFF' },
		{ id: 'OverlayInput4Out', size: '14', label: 'Tran OVL 4 OFF' },
		{ id: 'OverlayInput1Off', size: '18', label: 'Set OVL 1 OFF' },
		{ id: 'OverlayInput2Off', size: '18', label: 'Set OVL 2 OFF' },
		{ id: 'OverlayInput3Off', size: '18', label: 'Set OVL 3 OFF' },
		{ id: 'OverlayInput4Off', size: '18', label: 'Set OVL 4 OFF' },
		{ id: 'OverlayInputAllOff', size: '14', label: 'Set All OVL OFF' },
		{ id: 'OverlayInput1Zoom', size: '18', label: 'PIP OVL 1 Z/F' },
		{ id: 'OverlayInput2Zoom', size: '18', label: 'PIP OVL 2 Z/F' },
		{ id: 'OverlayInput3Zoom', size: '18', label: 'PIP OVL 3 Z/F' },
		{ id: 'OverlayInput4Zoom', size: '18', label: 'PIP OVL 4 Z/F' }
	];

	overlayFunctions.forEach(item => {
		const actions = [{ action: 'overlayFunctions', options: { functionID: item.id, input: 1 } }];
		const preset = createPreset('Overlays', item, actions, []);
		presets.push(preset);
	});

	// Audio
	const audioRouting = [
		{ id: 'Audio', size: '18', label: 'Input Mute' },
		{ id: 'BusXAudio', size: '18', label: 'Bus Mute' },
		{ id: 'Solo', size: '18', label: 'Input Solo' },
		{ id: 'BusXSolo', size: '18', label: 'Bus Solo' },
		{ id: 'BusXSendToMaster', size: '14', label: 'Send Bus to Master' },
		{ id: 'AudioBus', size: '14', label: 'Send Input to Bus' }
	];

	const inputVolume = [
		{ size: '18', label: 'In 1 Vol 0%', volume: '0' },
		{ size: '18', label: 'In 1 Vol 10%', volume: '10' },
		{ size: '18', label: 'In 1 Vol 20%', volume: '20' },
		{ size: '18', label: 'In 1 Vol 30%', volume: '30' },
		{ size: '18', label: 'In 1 Vol 40%', volume: '40' },
		{ size: '18', label: 'In 1 Vol 50%', volume: '50' },
		{ size: '18', label: 'In 1 Vol 60%', volume: '60' },
		{ size: '18', label: 'In 1 Vol 70%', volume: '70' },
		{ size: '18', label: 'In 1 Vol 80%', volume: '80' },
		{ size: '18', label: 'In 1 Vol 90%', volume: '90' },
		{ size: '18', label: 'In 1 Vol 100%', volume: '100' }
	];

	audioRouting.forEach(item => {
		const actions = [{ action: item.id, options: {} }];

		if (['Audio', 'Solo', 'AudioBus'].includes(item.id)) {
			actions[0].options.input = '';
		}

		if (['AudioBus', 'BusXAudio', 'BusXSolo', 'BusXSendToMaster'].includes(item.id)) {
			actions[0].options.value = 'A';
		}

		const feedbacks = [];

		if (item.id === 'BusXAudio') {
			feedbacks.push({
				type: 'busMute',
				options: {
					bus: 'A',
					fg: this.rgb(255, 255, 255),
					bg: this.rgb(255, 0, 0)
				}
			});
		}
		
		else if (item.id === 'Audio') {
			feedbacks.push({
				type: 'inputMute',
				options: {
					input: '',
					fg: this.rgb(255, 255, 255),
					bg: this.rgb(255, 0, 0)
				}
			});
		}
		
		else if (item.id === 'Solo') {
			feedbacks.push({
				type: 'inputSolo',
				options: {
					input: '',
					fg: this.rgb(255, 255, 255),
					bg: this.rgb(255, 0, 0)
				}
			});
		}
		
		else if (item.id === 'AudioBus') {
			feedbacks.push({
				type: 'inputBusRouting',
				options: {
					input: '',
					bus: 'A',
					fg: this.rgb(255, 255, 255),
					bg: this.rgb(0, 255, 0)
				}
			});
		}

		const preset = createPreset('Audio', item, actions, feedbacks);
		presets.push(preset);
	});

	inputVolume.forEach(item => {
		const actions = [{ action: 'SetVolumeFade', options: { input: '1', fadeMin: item.volume, fadeTime: '2000' } }];
		const preset = createPreset('Audio', item, actions, []);
		presets.push(preset);
	});

	// Countdown
	const countdownFunctions = [
		{ id: 'StartCountdown', size: '18', label: 'CND Start' },
		{ id: 'StopCountdown', size: '18', label: 'CND Stop' },
		{ id: 'PauseCountdown', size: '18', label: 'CND Pause' },
		{ id: 'SetCountdown', size: '18', label: 'CND 0 sec', time: '00:00:00' },
		{ id: 'SetCountdown', size: '18', label: 'CND 10 sec', time: '00:00:10' },
		{ id: 'SetCountdown', size: '18', label: 'CND 30 sec', time: '00:00:30' },
		{ id: 'SetCountdown', size: '18', label: 'CND 60 sec', time: '00:01:00' },
		{ id: 'SetCountdown', size: '18', label: 'CND 120 sec', time: '00:02:00' }
	];

	countdownFunctions.forEach(item => {
		const actions = [{ action: item.id, options: { intput: '1' } }];
		if (item.id === 'SetCountdown') {
			actions[0].options.value = item.time;
		}

		const preset = createPreset('Countdown', item, actions, []);
		presets.push(preset);
	});

	this.setPresetDefinitions(presets);
};
