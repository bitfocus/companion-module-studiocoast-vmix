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
		{ id: 'PreviewInput', mix: '0', input: '1', label: 'PRV 1', size: '24' },
		{ id: 'PreviewInput', mix: '0', input: '2', label: 'PRV 2', size: '24' },
		{ id: 'PreviewInput', mix: '0', input: '3', label: 'PRV 3', size: '24' },
		{ id: 'PreviewInput', mix: '0', input: '4', label: 'PRV 4', size: '24' },
		{ id: 'PreviewInput', mix: '0', input: '5', label: 'PRV 5', size: '24' },
		{ id: 'PreviewInput', mix: '0', input: '6', label: 'PRV 6', size: '24' },
		{ id: 'PreviewInput', mix: '0', input: '7', label: 'PRV 7', size: '24' },
		{ id: 'PreviewInput', mix: '0', input: '8', label: 'PRV 8', size: '24' },
		{ id: 'programCut', mix: '0', input: '1', label: 'PRGM 1', size: '24' },
		{ id: 'programCut', mix: '0', input: '2', label: 'PRGM 2', size: '24' },
		{ id: 'programCut', mix: '0', input: '3', label: 'PRGM 3', size: '24' },
		{ id: 'programCut', mix: '0', input: '4', label: 'PRGM 4', size: '24' },
		{ id: 'programCut', mix: '0', input: '5', label: 'PRGM 5', size: '24' },
		{ id: 'programCut', mix: '0', input: '6', label: 'PRGM 6', size: '24' },
		{ id: 'programCut', mix: '0', input: '7', label: 'PRGM 7', size: '24' },
		{ id: 'programCut', mix: '0', input: '8', label: 'PRGM 8', size: '24' },
		{ id: 'transitionMix', mix: '0', type: 'Cut', label: 'Cut', size: '24' },
		{ id: 'transitionMix', mix: '0', type: 'Fade', label: 'Fade', size: '24' },
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
		{ id: 'PreviewInput', mix: '1', input: '1', label: 'PRV MIX 2', size: '24' },
		{ id: 'PreviewInput', mix: '2', input: '1', label: 'PRV MIX 3', size: '24' },
		{ id: 'PreviewInput', mix: '3', input: '1', label: 'PRV MIX 4', size: '24' },
		{ id: 'programCut', mix: '1', input: '1', label: 'PRGM MIX 2', size: '24' },
		{ id: 'programCut', mix: '2', input: '1', label: 'PRGM MIX 3', size: '24' },
		{ id: 'programCut', mix: '3', input: '1', label: 'PRGM MIX 4', size: '24' },
		{ id: 'transitionMix', mix: '1', type: 'Cut', label: 'Cut MIX 2', size: '24' },
		{ id: 'transitionMix', mix: '2', type: 'Cut', label: 'Cut MIX 3', size: '24' },
		{ id: 'transitionMix', mix: '3', type: 'Cut', label: 'Cut MIX 4', size: '24' },
		{ id: 'transitionMix', mix: '1', type: 'Fade', label: 'Fade MIX 2', size: '24' },
		{ id: 'transitionMix', mix: '2', type: 'Fade', label: 'Fade MIX 3', size: '24' },
		{ id: 'transitionMix', mix: '3', type: 'Fade', label: 'Fade MIX 4', size: '24' },
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
		{ id: 'ReplayPause', label: 'Pause Events' },
		{ id: 'ReplayPlaySelectedEventToOutput', label: 'Play Selected Event' },
		{ id: 'ReplayPlayEventsByIDToOutput', label: 'Play Events By ID' },
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
		
		else if (item.id === 'ReplayPlayEventsByIDToOutput') {
			actions.push({ action: item.id });
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

	// Vmix Call Audio and Video
	const vmixCall = [
		{ id: 'VideoCallAudioSource', size: '18', label: 'Call 1 Master', input: '', value: 'Master' },
		{ id: 'VideoCallAudioSource', size: '18', label: 'Call 1 Head', input: '', value: 'Headphones' },
		{ id: 'VideoCallAudioSource', size: '18', label: 'Call 1 Bus A', input: '', value: 'BusA' },
		{ id: 'VideoCallAudioSource', size: '18', label: 'Call 1 Bus B', input: '', value: 'BusB' },
		{ id: 'VideoCallAudioSource', size: '18', label: 'Call 1 Bus C', input: '', value: 'BusC' },
		{ id: 'VideoCallAudioSource', size: '18', label: 'Call 1 Bus D', input: '', value: 'BusD' },
		{ id: 'VideoCallAudioSource', size: '18', label: 'Call 1 Bus E', input: '', value: 'BusE' },
		{ id: 'VideoCallAudioSource', size: '18', label: 'Call 1 Bus F', input: '', value: 'BusF' },
		{ id: 'VideoCallAudioSource', size: '18', label: 'Call 1 Bus G', input: '', value: 'BusG' },
		{ id: 'VideoCallVideoSource', size: '18', label: 'Call 1 Out 1', input: '', value: 'Output1' },
		{ id: 'VideoCallVideoSource', size: '18', label: 'Call 1 Out 2', input: '', value: 'Output2' },
		{ id: 'VideoCallVideoSource', size: '18', label: 'Call 1 Out 3', input: '', value: 'Output3' },
		{ id: 'VideoCallVideoSource', size: '18', label: 'Call 1 Out 4', input: '', value: 'Output4' },
	];

	vmixCall.forEach(item => {
		const actions = [];
		const feedbacks = [];

		if (item.id === 'VideoCallAudioSource') {
			actions.push({ action: item.id, options: { input: item.input, value: item.value } });
		}
		
		else if (item.id === 'VideoCallVideoSource') {
			actions.push({ action: item.id, options: { input: item.input, functionID: item.value } });
		}
		
		const preset = createPreset('Vmix Call', item, actions, feedbacks);
		presets.push(preset);
	});	
	
	// Titles and Graphics
	const title = [
		{ id: 'SetText', label: 'Set Title', input: '', layer: '0', adjustment: 'Set', value: '0' },
		{ id: 'SetText', label: 'Set Title +1', input: '', layer: '0', adjustment: 'Increment', value: '1' },
		{ id: 'SetText', label: 'Set Title -1', input: '', layer: '0', adjustment: 'Decrement', value: '1' },
		{ id: 'SelectTitlePreset', label: 'Title Preset 0', input: '', value: '0' },
		{ id: 'SelectTitlePreset', label: 'Title Preset 1', input: '', value: '1' },
		{ id: 'SelectTitlePreset', label: 'Title Preset 2', input: '', value: '2' },
		{ id: 'SelectTitlePreset', label: 'Title Preset 3', input: '', value: '3' },
		{ id: 'TitlePreset', size: '18', label: 'Nest Title', input: '', value: 'NextTitlePreset' },
		{ id: 'TitlePreset', size: '18', label: 'Prev Title', input: '', value: 'PreviousTitlePreset' },
		{ id: 'TitleBeginAnimation', size: '14', label: 'Title Transition In', input: '', value: 'TransitionIn' },
		{ id: 'TitleBeginAnimation', size: '14', label: 'Title Transition Out', input: '', value: 'TransitionOut' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 1', input: '', value: 'Page1' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 2', input: '', value: 'Page2' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 3', input: '', value: 'Page3' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 4', input: '', value: 'Page4' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 5', input: '', value: 'Page5' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 6', input: '', value: 'Page6' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 7', input: '', value: 'Page7' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 8', input: '', value: 'Page8' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 9', input: '', value: 'Page9' },
		{ id: 'TitleBeginAnimation', size: '18', label: 'Title Page 10', input: '', value: 'Page10' },
		{ id: 'TitleBeginAnimation', size: '14', label: 'Title Continuous', input: '', value: 'Continuous' },
		{ id: 'TitleBeginAnimation', size: '14', label: 'Title Data Change In', input: '', value: 'DataChangeIn' },
		{ id: 'TitleBeginAnimation', size: '14', label: 'Title Data Change Out', input: '', value: 'DataChangeOut' },
		{ id: 'ShowTitle', label: 'Title:', input: '', layer: '0' },
	];

	title.forEach(item => {
		const actions = [];
		const feedbacks = [];

		if (item.id === 'SetText') {
			actions.push({ action: item.id, options: { input: item.input, selectedIndex: item.layer, adjustment: item.adjustment, value: item.value } });
		}

		if (item.id === 'SelectTitlePreset') {
			actions.push({ action: item.id, options: { input: item.input, selectedIndex: item.value } });
		}
		
		else if (item.id === 'TitlePreset') {
			actions.push({ action: item.id, options: { input: item.input, functionID: item.value } });
		}
		
		else if (item.id === 'ShowTitle') {
			feedbacks.push({ type: 'titleLayer', options: { input: item.input, layer: item.value, bg: this.rgb(255, 0, 0) } });
		}

		else if (item.id === 'TitleBeginAnimation') {
			actions.push({ action: item.id, options: { input: item.input, value: item.value } });
		}

		const preset = createPreset('Titles and Graphics', item, actions, feedbacks);
		presets.push(preset);
	});	
	
	// Video Playback
	const videoActionsList = [
		{ id: 'videoActions', input: '0', inputType: 'true', type: 'Play', label: 'Play', size: '18' },
		{ id: 'videoActions', input: '0', inputType: 'true', type: 'Pause', label: 'Pause', size: '18' },
		{ id: 'videoActions', input: '0', inputType: 'true', type: 'PlayPause', label: 'Play Pause', size: '18' },
		{ id: 'videoActions', input: '0', inputType: 'true', type: 'Restart', label: 'Restart', size: '18' },
		{ id: 'videoActions', input: '0', inputType: 'true', type: 'LoopOn', label: 'Loop ON', size: '18' },
		{ id: 'videoActions', input: '0', inputType: 'true', type: 'LoopOff', label: 'Loop OFF', size: '18' },
		{ id: 'videoPlayhead', input: '0', inputType: 'true', type: 'Set', value: '10000', label: 'Playhead 10 sec', size: '14' },
		{ id: 'videoPlayhead', input: '0', inputType: 'true', type: 'Increment', value: '10000',label: 'Playhead +10 sec', size: '14' },
		{ id: 'videoPlayhead', input: '0', inputType: 'true', type: 'Decrement', value: '10000', label: 'Playhead -10 sec', size: '14' },
		{ id: 'videoMark', input: '0', inputType: 'true', type: 'MarkIn', label: 'Mark In', size: '18' },
		{ id: 'videoMark', input: '0', inputType: 'true', type: 'MarkOut', label: 'Mark Out', size: '18' },
		{ id: 'videoMark', input: '0', inputType: 'true', type: 'MarkReset', label: 'Clear In/Out', size: '18' },
		{ id: 'videoMark', input: '0', inputType: 'true', type: 'MarkResetIn', label: 'Clear In', size: '18' },
		{ id: 'videoMark', input: '0', inputType: 'true', type: 'MarkResetOut', label: 'Clear Out', size: '18' },
		{ id: 'videoTimer', input: '0', label: 'Video Timecode',},
	];

	videoActionsList.forEach(item => {
		const actions = [];
		const feedbacks = [];

		if (item.id === 'videoActions') {
			actions.push({ action: item.id, options: { input: item.input, inputType: item.inputType, functionID: item.type } });
		}
		
		else if (item.id === 'videoPlayhead') {
			actions.push({ action: item.id, options: { input: item.input, inputType: item.inputType, adjustment: item.type, value: item.value } });
		}
		
		else if (item.id === 'videoMark') {
			actions.push({ action: item.id, options: { input: item.input, inputType: item.inputType, functionID: item.type } });
		}
		
		else if (item.id === 'videoMark') {
			feedbacks.push({ type: 'videoTimer', options: { input: item.input, color: this.rgb(255, 255, 255), color30: this.rgb(255, 255, 0), color10: this.rgb(255, 0, 0) } });
		}
		const preset = createPreset('Video Playback input', item, actions, feedbacks);
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

	const presetTransitionsEffect = [
		{ id: 'SetTransitionEffect1', size: '18', label: 'T1 Set Cut', value: 'Cut' },
		{ id: 'SetTransitionEffect2', size: '18', label: 'T2 Set Fade', value: 'Fade' },
		{ id: 'SetTransitionEffect3', size: '18', label: 'T3 Set Zoom', value: 'Zoom' },
		{ id: 'SetTransitionEffect4', size: '18', label: 'T4 Set Merge', value: 'Merge' },
	];

	const presetTransitionsDuration = [
		{ id: 'SetTransitionDuration1', size: '18', label: 'T1 Set 250ms', value: '250' },
		{ id: 'SetTransitionDuration1', size: '18', label: 'T1 Set 500ms', value: '500' },
		{ id: 'SetTransitionDuration1', size: '18', label: 'T1 Set 1000ms', value: '1000' },
		{ id: 'SetTransitionDuration1', size: '18', label: 'T1 Set 1500ms', value: '1500' },
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
		const actions = [{ action: 'Transitions', options: { functionID: item.id } }];
		const preset = createPreset('Transitions', item, actions, []);
		presets.push(preset);
	});

	presetTransitionsEffect.forEach(item => {
		const actions = [{ action: 'SetTransitionEffect', options: { functionID: item.id, value: item.value } }];
		const preset = createPreset('Transitions', item, actions, []);
		presets.push(preset);
	});

	presetTransitionsDuration.forEach(item => {
		const actions = [{ action: 'SetTransitionDuration', options: { functionID: item.id, duration: item.value } }];
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
		{ id: 'OverlayInput1', size: '18', label: 'PGM OVL 1', overlay: '1' },
		{ id: 'OverlayInput2', size: '18', label: 'PGM OVL 2', overlay: '2' },
		{ id: 'OverlayInput3', size: '18', label: 'PGM OVL 3', overlay: '3' },
		{ id: 'OverlayInput4', size: '18', label: 'PGM OVL 4', overlay: '4' },
		{ id: 'PreviewOverlayInput1', size: '18', label: 'PREW OVL 1', overlay: '1' },
		{ id: 'PreviewOverlayInput2', size: '18', label: 'PREW OVL 2', overlay: '2' },
		{ id: 'PreviewOverlayInput3', size: '18', label: 'PREW OVL 3', overlay: '3' },
		{ id: 'PreviewOverlayInput4', size: '18', label: 'PREW OVL 4', overlay: '4' },
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
		{ id: 'OverlayInputAllOff', size: '14', label: 'Set All OVL OFF', },
		{ id: 'OverlayInput1Zoom', size: '18', label: 'PIP OVL 1 Z/F' },
		{ id: 'OverlayInput2Zoom', size: '18', label: 'PIP OVL 2 Z/F' },
		{ id: 'OverlayInput3Zoom', size: '18', label: 'PIP OVL 3 Z/F' },
		{ id: 'OverlayInput4Zoom', size: '18', label: 'PIP OVL 4 Z/F' }
	];

	overlayFunctions.forEach(item => {
		const actions = [{ action: 'overlayFunctions', options: { functionID: item.id, input: 1 } }];
		const feedbacks = [];

		if (item.id === 'OverlayInput1' || item.id === 'OverlayInput2' || item.id === 'OverlayInput3' || item.id === 'OverlayInput4' || item.id === 'PreviewOverlayInput1' || item.id === 'PreviewOverlayInput2' || item.id === 'PreviewOverlayInput3' || item.id === 'PreviewOverlayInput4') {
		feedbacks.push ({ type: 'overlayStatus', options: { input: item.input, overlay: item.overlay, fg: this.rgb(255, 255, 255), bgPreview: this.rgb(0, 255, 0), bgProgram: this.rgb(255, 0, 0) } });
		};

		const preset = createPreset('Overlays', item, actions, feedbacks);
		presets.push(preset);
	});

	// Multiview Overlays
	const multiviewoverlay = [
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L1',  type: 'MultiViewOverlay', input: '', layer: '1' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L2',  type: 'MultiViewOverlay', input: '', layer: '2' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L3',  type: 'MultiViewOverlay', input: '', layer: '3' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L4',  type: 'MultiViewOverlay', input: '', layer: '4' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L5',  type: 'MultiViewOverlay', input: '', layer: '5' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L6',  type: 'MultiViewOverlay', input: '', layer: '6' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L7',  type: 'MultiViewOverlay', input: '', layer: '7' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L8',  type: 'MultiViewOverlay', input: '', layer: '8' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L9',  type: 'MultiViewOverlay', input: '', layer: '9' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Toggle L10',  type: 'MultiViewOverlay', input: '', layer: '10' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L1 Off',  type: 'MultiViewOverlayOff', input: '', layer: '1' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L2 Off',  type: 'MultiViewOverlayOff', input: '', layer: '2' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L3 Off',  type: 'MultiViewOverlayOff', input: '', layer: '3' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L4 Off',  type: 'MultiViewOverlayOff', input: '', layer: '4' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L5 Off',  type: 'MultiViewOverlayOff', input: '', layer: '5' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L6 Off',  type: 'MultiViewOverlayOff', input: '', layer: '6' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L7 Off',  type: 'MultiViewOverlayOff', input: '', layer: '7' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L8 Off',  type: 'MultiViewOverlayOff', input: '', layer: '8' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L9 Off',  type: 'MultiViewOverlayOff', input: '', layer: '9' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L10 Off',  type: 'MultiViewOverlayOff', input: '', layer: '10' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L1 On',  type: 'MultiViewOverlayOn', input: '', layer: '1' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L2 On',  type: 'MultiViewOverlayOn', input: '', layer: '2' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L3 On',  type: 'MultiViewOverlayOn', input: '', layer: '3' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L4 On',  type: 'MultiViewOverlayOn', input: '', layer: '4' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L5 On',  type: 'MultiViewOverlayOn', input: '', layer: '5' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L6 On',  type: 'MultiViewOverlayOn', input: '', layer: '6' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L7 On',  type: 'MultiViewOverlayOn', input: '', layer: '7' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L8 On',  type: 'MultiViewOverlayOn', input: '', layer: '8' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L9 On',  type: 'MultiViewOverlayOn', input: '', layer: '9' },
		{ id: 'MultiViewOverlay', size: '18', label: 'Set L10 On',  type: 'MultiViewOverlayOn', input: '', layer: '10' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L1 To IN1', input: '', layer: '1', layerInput: '1' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L2 To IN1', input: '', layer: '2', layerInput: '1' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L3 To IN1', input: '', layer: '3', layerInput: '1' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L4 To IN1', input: '', layer: '4', layerInput: '1' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L5 To IN1', input: '', layer: '5', layerInput: '1' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L6 To IN1', input: '', layer: '6', layerInput: '1' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L7 To IN1', input: '', layer: '7', layerInput: '1' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L8 To IN1', input: '', layer: '8', layerInput: '1' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L9 To IN1', input: '', layer: '9', layerInput: '1' },
		{ id: 'SetMultiViewOverlay', size: '18', label: 'Set L10 To IN1', input: '', layer: '10', layerInput: '1' },
	];

	multiviewoverlay.forEach(item => {
		const actions = [];
		const feedbacks = [];

		if (item.id === 'MultiViewOverlay') {
			actions.push({ action: item.id, options: { functionID: item.type, input: item.input, selectedIndex: item.layer } });
		}
		
		else if (item.id === 'SetMultiViewOverlay') {
			actions.push({ action: item.id, options: { input: item.multiview, selectedIndex: item.layer, LayerInput: item.layerInput  } });
		}
		
		const preset = createPreset('MultiView Overlays', item, actions, feedbacks);
		presets.push(preset);
	});	

	// Audio
	const audioOnOff = [
		{ id: 'Audio', size: '18', label: 'Toggle Audio'},
		{ id: 'AudioOnOff', size: '14', label: 'Set Audio On', value: 'AudioOn' },
		{ id: 'AudioOnOff', size: '14', label: 'Set Audio Off', value: 'AudioOff' }
	];

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

	audioOnOff.forEach(item => {
		const actions = [];
		const feedbacks = [];

		if (item.id === 'Audio') {
			actions.push({ action: item.id, options: { input: '' } });
			feedbacks.push(
				{ type: 'inputAudio', options: { input: '1', fg: this.rgb(255, 255, 255), bg: this.rgb(255, 0, 0) } },
				{ type: 'liveInputVolume', options: { input: '1', value: 'false', color: this.rgb(255, 0, 0), color1: this.rgb(255, 255, 0), color6: this.rgb(0, 255, 0), color18: this.rgb(0, 192, 0),  color36: this.rgb(0, 128, 0) } }
			);
		}
		
		else if (item.id === 'AudioOnOff') {
			actions.push({ action: item.id, options: { input: item.input, functionID: item.value } });
			feedbacks.push(
				{ type: 'inputAudio', options: { input: '1', fg: this.rgb(255, 255, 255), bg: this.rgb(255, 0, 0) } },
				{ type: 'liveInputVolume', options: { input: '1', value: 'false', color: this.rgb(255, 0, 0), color1: this.rgb(255, 255, 0), color6: this.rgb(0, 255, 0), color18: this.rgb(0, 192, 0),  color36: this.rgb(0, 128, 0) } }
			);
		}
		
		const preset = createPreset('Audio', item, actions, feedbacks);
		presets.push(preset);
	});

	audioRouting.forEach(item => {
		const actions = [{ action: item.id, options: {} }];

		if (['Audio', 'Solo', 'AudioBus'].includes(item.id)) {
			actions[0].options.input = '1';
		}

		if (['AudioBus', 'BusXAudio', 'BusXSolo', 'BusXSendToMaster'].includes(item.id)) {
			actions[0].options.value = 'A';
		}

		const feedbacks = [];

		if (item.id === 'BusXAudio') {
			feedbacks.push(
				{ type: 'busMute', options: { bus: 'A', fg: this.rgb(255, 255, 255), bg: this.rgb(255, 0, 0) } },
				{ type: 'liveBusVolume', options: { bus: 'A', value: 'false', color: this.rgb(255, 0, 0), color1: this.rgb(255, 255, 0), color6: this.rgb(0, 255, 0), color18: this.rgb(0, 192, 0),  color36: this.rgb(0, 128, 0) } }
			);
		}
		
		else if (item.id === 'Audio') {
			feedbacks.push(
				{ type: 'inputMute', options: { input: '1', fg: this.rgb(255, 255, 255), bg: this.rgb(255, 0, 0) } },
				{ type: 'liveInputVolume', options: { input: '1', value: 'false', color: this.rgb(255, 0, 0), color1: this.rgb(255, 255, 0), color6: this.rgb(0, 255, 0), color18: this.rgb(0, 192, 0),  color36: this.rgb(0, 128, 0) } }
			);
		}

		else if (item.id === 'Solo') {
			feedbacks.push(
				{ type: 'inputSolo', options: { input: '1', fg: this.rgb(255, 255, 255), bg: this.rgb(255, 255, 0) } },
				{ type: 'liveInputVolume', options: { input: '1', value: 'false', color: this.rgb(255, 0, 0), color1: this.rgb(255, 255, 0), color6: this.rgb(0, 255, 0), color18: this.rgb(0, 192, 0),  color36: this.rgb(0, 128, 0) } }
			);
		}
		
		else if (item.id === 'AudioBus') {
			feedbacks.push({ type: 'inputBusRouting', options: { input: '1', bus: 'A', fg: this.rgb(255, 255, 255), bg: this.rgb(0, 255, 0) } });
		}

		const preset = createPreset('Audio', item, actions, feedbacks);
		presets.push(preset);
	});

	inputVolume.forEach(item => {
		const actions = [{ action: 'SetVolumeFade', options: { input: '1', fadeMin: item.volume, fadeTime: '2000' } }];
		const feedbacks =	[{ type: 'liveInputVolume', options: { input: '1', value: 'false', color: this.rgb(255, 0, 0), color1: this.rgb(255, 255, 0), color6: this.rgb(0, 255, 0), color18: this.rgb(0, 192, 0),  color36: this.rgb(0, 128, 0) } }];
		const preset = createPreset('Audio', item, actions, feedbacks);
		presets.push(preset);
	});

	// Countdown
	const countdownFunctions = [
		{ id: 'StartCountdown', size: '18', label: 'CND Start' },
		{ id: 'StopCountdown', size: '18', label: 'CND Stop' },
		{ id: 'PauseCountdown', size: '18', label: 'CND Pause' },
		{ id: 'ChangeCountdown', size: '14', label: 'Change 0 sec', time: '00:00:00' },	
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

		if (item.id === 'ChangeCountdown') {
			actions[0].options.value = item.time;
		}

		const preset = createPreset('Countdown', item, actions, []);
		presets.push(preset);
	});

	this.setPresetDefinitions(presets);
};
