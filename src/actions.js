exports.getActions = function () {
	const mixSelect = {
		type: 'dropdown',
		label: 'Mix',
		id: 'mix',
		default: 0,
		choices: [1, 2, 3, 4].map((id, index) => ({ id: index, label: id })),
	}

	const input = {
		type: 'textinput',
		label: 'Input (Nr/Name/GUID)',
		id: 'input',
	}

	const audioBusMaster = {
		type: 'dropdown',
		label: 'Bus',
		id: 'value',
		default: 'Master',
		choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id) => ({ id, label: id })),
	}

	const audioBus = {
		type: 'dropdown',
		label: 'Bus',
		id: 'value',
		default: 'A',
		choices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id) => ({ id, label: id })),
	}

	return {
		PreviewInput: {
			label: 'Input - Send Input to Preview',
			options: [input, mixSelect],
		},

		PreviewInputNext: { label: 'Input - Send Next input to Preview' },

		PreviewInputPrevious: { label: 'Input - Send Previous input to Preview' },

		programCut: {
			label: 'Transition - Send Input to Program',
			options: [input, mixSelect],
		},

		transitionMix: {
			label: 'Transition - Transition mix',
			options: [
				mixSelect,
				{
					type: 'dropdown',
					label: 'Select transition',
					id: 'functionID',
					default: 'Cut',
					choices: [
						'Cut',
						'Fade',
						'Zoom',
						'Wipe',
						'Slide',
						'Fly',
						'CrossZoom',
						'FlyRotate',
						'Cube',
						'CubeZoom',
						'VerticalWipe',
						'VerticalSlide',
						'Merge',
						'WipeReverse',
						'SlideReverse',
						'VerticalWipeReverse',
						'VerticalSlideReverse',
					].map((transition) => ({ id: transition, label: transition })),
				},
				{
					type: 'textinput',
					label: 'Duration',
					id: 'duration',
					default: 1000,
				},
			],
		},

		transition: {
			label: 'Transition - Auto Transition',
			options: [
				{
					type: 'dropdown',
					label: 'Select transition',
					id: 'functionID',
					default: 'Transition1',
					choices: [
						{ id: 'Transition1', label: 'Transition 1' },
						{ id: 'Transition2', label: 'Transition 2' },
						{ id: 'Transition3', label: 'Transition 3' },
						{ id: 'Transition4', label: 'Transition 4' },
						{ id: 'Stinger1', label: 'Stinger 1' },
						{ id: 'Stinger2', label: 'Stinger 2' },
						{ id: 'Stinger3', label: 'Stinger 3' },
						{ id: 'Stinger4', label: 'Stinger 4' },
					],
				},
			],
		},

		SetTransitionEffect: {
			label: 'Transition - Set Auto Transition Effect',
			options: [
				{
					type: 'dropdown',
					label: 'Select transition',
					id: 'functionID',
					default: 'SetTransitionEffect1',
					choices: [
						{ id: 'SetTransitionEffect1', label: 'Transition 1' },
						{ id: 'SetTransitionEffect2', label: 'Transition 2' },
						{ id: 'SetTransitionEffect3', label: 'Transition 3' },
						{ id: 'SetTransitionEffect4', label: 'Transition 4' },
					],
				},
				{
					type: 'dropdown',
					label: 'Select transition type',
					id: 'value',
					default: 'Cut',
					choices: [
						'Cut',
						'Fade',
						'Zoom',
						'Wipe',
						'Slide',
						'Fly',
						'CrossZoom',
						'FlyRotate',
						'Cube',
						'CubeZoom',
						'VerticalWipe',
						'VerticalSlide',
						'Merge',
						'WipeReverse',
						'SlideReverse',
						'VerticalWipeReverse',
						'VerticalSlideReverse',
					].map((transition) => ({ id: transition, label: transition })),
				},
			],
		},

		SetTransitionDuration: {
			label: 'Transition - Set Auto Transition Duration',
			options: [
				{
					type: 'dropdown',
					label: 'Select transition',
					id: 'functionID',
					default: 'SetTransitionDuration1',
					choices: [
						{ id: 'SetTransitionDuration1', label: 'Transition 1' },
						{ id: 'SetTransitionDuration2', label: 'Transition 2' },
						{ id: 'SetTransitionDuration3', label: 'Transition 3' },
						{ id: 'SetTransitionDuration4', label: 'Transition 4' },
					],
				},
				{
					type: 'textinput',
					label: 'Duration',
					id: 'duration',
					default: 1000,
				},
			],
		},

		QuickPlay: {
			label: 'Transition - Quick Play input to Program',
			options: [input],
		},

		outputSet: {
			label: 'Output - Set Output Source',
			options: [
				{
					type: 'dropdown',
					label: 'Select Output',
					id: 'functionID',
					default: 'SetOutput2',
					choices: [
						{ id: 'SetOutput2', label: 'Output 2' },
						{ id: 'SetOutput3', label: 'Output 3' },
						{ id: 'SetOutput4', label: 'Output 4' },
						{ id: 'SetOutputExternal2', label: 'Output External 2' },
						{ id: 'SetOutputFullscreen', label: 'Output Fullscreen 1' },
						{ id: 'SetOutputFullscreen2', label: 'Output Fullscreen 2' },
					],
				},
				{
					type: 'dropdown',
					label: 'Select Input Type',
					id: 'value',
					default: 'Output',
					choices: [
						{ id: 'Output', label: 'Output (Program)' },
						{ id: 'Preview', label: 'Preview' },
						{ id: 'MultiView', label: 'Multiview' },
						{ id: 'Input', label: 'Input' },
					],
				},
				input,
			],
		},

		toggleFunctions: {
			label: 'Output - Toggle Functions',
			options: [
				{
					type: 'dropdown',
					label: 'Toggle Function',
					id: 'functionID',
					default: 'StartStopMultiCorder',
					choices: [
						{ id: 'StartStopMultiCorder', label: 'Start / Stop MultCorder' },
						{ id: 'StartStopRecording', label: 'Start / Stop Recording' },
						{ id: 'StartStopStreaming', label: 'Start / Stop Stream' },
						{ id: 'StartStopExternal', label: 'Start / Stop External' },
						{ id: 'Fullscreen', label: 'Start / Stop Fullscreen' },
						{ id: 'FadeToBlack', label: 'Fade To Black' },
					],
				},
				{
					type: 'dropdown',
					label: 'Stream Start/Stop value',
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
		},

		playListFunctions: {
			label: 'Playlist - Functions',
			options: [
				{
					type: 'dropdown',
					label: 'Playlist Function',
					id: 'functionID',
					default: 'StartPlayList',
					choices: [
						{ id: 'StartPlayList', label: 'Start Play List' },
						{ id: 'StopPlayList', label: 'Stop Play List' },
						{ id: 'NextPlayListEntry', label: 'Next Item in Play List' },
						{ id: 'PreviousPlayListEntry', label: 'Previous Item in Play List' },
					],
				},
			],
		},

		SelectPlayList: {
			label: 'Playlist - Open/Select Playlist',
			options: [
				{
					type: 'textinput',
					label: 'Playlist name',
					id: 'playlistName',
				},
			],
		},

		overlayFunctions: {
			label: 'Overlay - Functions',
			options: [
				{
					type: 'dropdown',
					label: 'Select Overlay Function',
					id: 'functionID',
					default: 'OverlayInput1',
					choices: [
						{ id: 'OverlayInput1', label: 'Toggle Overlay 1 on program' },
						{ id: 'OverlayInput2', label: 'Toggle Overlay 2 on program' },
						{ id: 'OverlayInput3', label: 'Toggle Overlay 3 on program' },
						{ id: 'OverlayInput4', label: 'Toggle Overlay 4 on program' },
						{ id: 'PreviewOverlayInput1', label: 'Toggle Overlay 1 on preview' },
						{ id: 'PreviewOverlayInput2', label: 'Toggle Overlay 2 on preview' },
						{ id: 'PreviewOverlayInput3', label: 'Toggle Overlay 3 on preview' },
						{ id: 'PreviewOverlayInput4', label: 'Toggle Overlay 4 on preview' },
						{ id: 'OverlayInput1In', label: 'Transition Overlay 1 on' },
						{ id: 'OverlayInput2In', label: 'Transition Overlay 2 on' },
						{ id: 'OverlayInput3In', label: 'Transition Overlay 3 on' },
						{ id: 'OverlayInput4In', label: 'Transition Overlay 4 on' },
						{ id: 'OverlayInput1Out', label: 'Transition Overlay 1 off' },
						{ id: 'OverlayInput2Out', label: 'Transition Overlay 2 off' },
						{ id: 'OverlayInput3Out', label: 'Transition Overlay 3 off' },
						{ id: 'OverlayInput4Out', label: 'Transition Overlay 4 off' },
						{ id: 'OverlayInput1Off', label: 'Set Overlay 1 off' },
						{ id: 'OverlayInput2Off', label: 'Set Overlay 2 off' },
						{ id: 'OverlayInput3Off', label: 'Set Overlay 3 off' },
						{ id: 'OverlayInput4Off', label: 'Set Overlay 4 off' },
						{ id: 'OverlayInputAllOff', label: 'Set All Overlays off' },
						{ id: 'OverlayInput1Zoom', label: 'Zoom PIP Overlay 1 to/from fulscreen' },
						{ id: 'OverlayInput2Zoom', label: 'Zoom PIP Overlay 2 to/from fulscreen' },
						{ id: 'OverlayInput3Zoom', label: 'Zoom PIP Overlay 3 to/from fulscreen' },
						{ id: 'OverlayInput4Zoom', label: 'Zoom PIP Overlay 4 to/from fulscreen' },
					],
				},
				input,
			],
		},

		MultiViewOverlay: {
			label: 'Layers / MultiView - Toggle Overlay Layer on Input',
			options: [
				{
					type: 'dropdown',
					label: 'Layers / MultiView Function',
					id: 'functionID',
					default: 'MultiViewOverlay',
					choices: [
						{ id: 'MultiViewOverlay', label: 'Toggle Overlay Layer on Input' },
						{ id: 'MultiViewOverlayOff', label: 'Set Overlay Layer Off' },
						{ id: 'MultiViewOverlayOn', label: 'Set Overlay Layer On' },
					],
				},
				{
					type: 'textinput',
					label: 'MultiView Input',
					id: 'input',
				},
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 1,
				},
			],
		},

		SetMultiViewOverlay: {
			label: 'Layers / MultiView - Set Input as Multiview Overlay Layer on an input',
			options: [
				{
					type: 'textinput',
					label: 'MultiView Input',
					id: 'input',
				},
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 1,
				},
				{
					type: 'textinput',
					label: 'Input to use on Layer',
					id: 'LayerInput',
					default: 1,
				},
			],
		},

		SetMultiViewOverlayOnPreview: {
			label: 'Layers / MultiView - Set Input as Multiview Overlay Layer on active Preview input',
			options: [
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 1,
				},
				{
					type: 'textinput',
					label: 'Input to use on Layer',
					id: 'LayerInput',
					default: 1,
				},
				mixSelect,
			],
		},

		SetMultiViewOverlayOnProgram: {
			label: 'Layers / MultiView - Set Input as Multiview Overlay Layer on active Program input',
			options: [
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 1,
				},
				{
					type: 'textinput',
					label: 'Input to use on Layer',
					id: 'LayerInput',
					default: 1,
				},
				mixSelect,
			],
		},

		SetMultiViewOverlayDestinationInput: {
			label: 'Layers / MultiView - Set Destination Input for Routable Multiview Overlay Layer',
			options: [
				{
					type: 'textinput',
					label: 'Destination MV Input',
					id: 'destinationInput',
					default: 1,
				}
			],
		},

		SetMultiViewOverlayDestinationLayer: {
			label: 'Layers / MultiView - Set Destination Layer for Routable Multiview Overlay Layer',
			options: [
				{
					type: 'number',
					label: 'Destination Layer of destination Input',
					id: 'destinationLayer',
					default: 1,
					min: 1,
					max: 10,
				}
			],
		},

		SetMultiViewOverlaySourceInput: {
			label: 'Layers / MultiView - Set Source Input for Routable Multiview Overlay Layer',
			options: [
				{
					type: 'textinput',
					label: 'Input to be routed to destination layer of destination input',
					id: 'sourceIndex',
					default: 1,
				}
			],
		},

		VirtualSet: {
			label: 'VirtualSet - Zoom To Selected Preset',
			options: [
				input,
				{
					type: 'textinput',
					label: 'Preset (1-10)',
					id: 'selectedIndex',
					default: 1,
				},
			],
		},

		VideoCallVideoSource: {
			label: 'VideoCall - Select Video Source',
			options: [
				input,
				{
					type: 'dropdown',
					label: 'Select Output',
					id: 'functionID',
					default: 'Output1',
					choices: [
						{ id: 'Output1', label: 'Output 1' },
						{ id: 'Output2', label: 'Output 2' },
						{ id: 'Output3', label: 'Output 3' },
						{ id: 'Output4', label: 'Output 4' },
					],
				},
			],
		},

		VideoCallAudioSource: {
			label: 'VideoCall - Select Audio Source',
			options: [
				input,
				{
					type: 'dropdown',
					label: 'Bus',
					id: 'value',
					default: 'BusA',
					choices: [
						{ id: 'Master', label: 'Master' },
						{ id: 'Headphones', label: 'Headphones' },
						{ id: 'BusA', label: 'A' },
						{ id: 'BusB', label: 'B' },
						{ id: 'BusC', label: 'C' },
						{ id: 'BusD', label: 'D' },
						{ id: 'BusE', label: 'E' },
						{ id: 'BusF', label: 'F' },
						{ id: 'BusG', label: 'G' },
					],
				},
			],
		},

		SetVolumeFade: {
			label: 'Audio - Set Volume Fade',
			options: [
				{
					type: 'textinput',
					label: 'Fade to volume',
					id: 'fadeMin',
					default: '0',
					regex: '/^[0-9]*$/',
				},
				{
					type: 'textinput',
					label: 'Fade time in ms',
					id: 'fadeTime',
					default: '2000',
					regex: '/^(?!(0))[0-9]*$/',
				},
				input,
			],
		},

		AudioBus: {
			label: 'Audio - Route Input to Bus',
			options: [
				input,
				audioBusMaster,
				{
					type: 'dropdown',
					label: 'Option',
					id: 'functionID',
					default: 'AudioBus',
					choices: [
						{ id: 'AudioBus', label: 'Toggle' },
						{ id: 'AudioBusOn', label: 'On' },
						{ id: 'AudioBusOff', label: 'Off' },
					],
				},
			],
		},

		BusXSendToMaster: {
			label: 'Audio - Route Bus to Master',
			options: [audioBus],
		},

		BusXAudio: {
			label: 'Audio - Bus Mute',
			options: [
				audioBusMaster,
				{
					type: 'dropdown',
					label: 'Option',
					id: 'functionID',
					default: 'BusXAudio',
					choices: [
						{ id: 'BusXAudio', label: 'Toggle Bus Mute' },
						{ id: 'BusXAudioOn', label: 'Set Bus Audio ON' },
						{ id: 'BusXAudioOff', label: 'Set Bus Audio OFF' },
					],
				},
			],
		},

		Audio: {
			label: 'Audio - Input Mute',
			options: [input],
		},

		AudioOnOff: {
			label: 'Audio - Input On/Off',
			options: [
				input,
				{
					type: 'dropdown',
					label: 'Option',
					id: 'functionID',
					default: 'AudioOn',
					choices: [
						{ id: 'AudioOn', label: 'Set input Audio ON' },
						{ id: 'AudioOff', label: 'Set input Audio OFF' },
					],
				},
			],
		},

		BusXSolo: {
			label: 'Audio - Bus Solo',
			options: [
				audioBus,
				{
					type: 'dropdown',
					label: 'Option',
					id: 'functionID',
					default: 'BusXSolo',
					choices: [
						{ id: 'BusXSolo', label: 'Toggle' },
						{ id: 'BusXSoloOn', label: 'On' },
						{ id: 'BusXSoloOff', label: 'Off' },
					],
				},
			],
		},

		Solo: {
			label: 'Audio - Input Solo',
			options: [
				input,
				{
					type: 'dropdown',
					label: 'Option',
					id: 'functionID',
					default: 'Solo',
					choices: [
						{ id: 'Solo', label: 'Toggle' },
						{ id: 'SoloOn', label: 'On' },
						{ id: 'SoloOff', label: 'Off' },
					],
				},
			],
		},

		AudioPlugin: {
			label: 'Audio - Audio Plugin On/Off/Toggle/Show On Input',
			options: [
				input,
				{
					type: 'textinput',
					label: 'Plugin Number',
					id: 'value',
					default: '1',
				},
				{
					type: 'dropdown',
					label: 'Option',
					id: 'functionID',
					default: 'AudioPluginOnOff',
					choices: [
						{ id: 'AudioPluginOnOff', label: 'Toggle' },
						{ id: 'AudioPluginOn', label: 'On' },
						{ id: 'AudioPluginOff', label: 'Off' },
						{ id: 'AudioPluginShow', label: 'Show' },
					],
				},
			],
		},

		AudioChannelMatrixApplyPreset: {
			label: 'Audio - Channel Matrix Apply Preset',
			options: [
				input,
				{
					type: 'textinput',
					label: 'Preset Name',
					id: 'value',
					default: '',
				},
			],
		},

		StartCountdown: {
			label: 'Title - Start Countdown',
			options: [
				input,
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 0,
				},
			],
		},

		StopCountdown: {
			label: 'Title - Stop Countdown',
			options: [
				input,
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 0,
				},
			],
		},

		PauseCountdown: {
			label: 'Title - Pause Countdown',
			options: [
				input,
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 0,
				},
			],
		},

		SetCountdown: {
			label: 'Title - Set Countdown Time',
			options: [
				{
					type: 'textinput',
					label: 'Time (00:00:00)',
					id: 'value',
					default: '00:10:00',
					regex: '/^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]$/',
				},
				input,
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 0,
				},
			],
		},

		ChangeCountdown: {
			label: 'Title - Change Countdown Time',
			options: [
				{
					type: 'textinput',
					label: 'Time (00:00:00)',
					id: 'value',
					default: '00:10:00',
					regex: '/^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]$/',
				},
				input,
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 0,
				},
			],
		},

		SetText: {
			label: 'Title - Adjust title text',
			options: [
				input,
				{
					type: 'textinput',
					label: 'Layer',
					id: 'selectedIndex',
					default: 0,
				},
				{
					type: 'dropdown',
					label: 'Adjustment',
					id: 'adjustment',
					default: 'Set',
					choices: ['Set', 'Increment', 'Decrement'].map((item) => ({ id: item, label: item })),
				},
				{
					type: 'textinput',
					label: 'value',
					id: 'value',
					default: '',
				},
			],
		},

		SelectTitlePreset: {
			label: 'Title - Select Title Preset',
			options: [
				input,
				{
					type: 'textinput',
					label: 'Preset Index',
					id: 'selectedIndex',
					default: 0,
				},
			],
		},

		TitlePreset: {
			label: 'Title - Select Next or Prev Title Preset',
			options: [
				input,
				{
					type: 'dropdown',
					label: 'Option',
					id: 'functionID',
					default: 'NextTitlePreset',
					choices: [
						{ id: 'NextTitlePreset', label: 'Select Next Title Preset' },
						{ id: 'PreviousTitlePreset', label: 'Select Previous Title Preset' },
					],
				},
			],
		},

		TitleBeginAnimation: {
			label: 'Title - Begin Animation Page',
			options: [
				input,
				{
					type: 'dropdown',
					label: 'Option',
					id: 'value',
					default: 'Page1',
					choices: [
						{ id: 'TransitionIn', label: 'Transition In' },
						{ id: 'TransitionOut', label: 'Transition Out' },
						{ id: 'Page1', label: 'Page 1' },
						{ id: 'Page2', label: 'Page 2' },
						{ id: 'Page3', label: 'Page 3' },
						{ id: 'Page4', label: 'Page 4' },
						{ id: 'Page5', label: 'Page 5' },
						{ id: 'Page6', label: 'Page 6' },
						{ id: 'Page7', label: 'Page 7' },
						{ id: 'Page8', label: 'Page 8' },
						{ id: 'Page9', label: 'Page 9' },
						{ id: 'Page10', label: 'Page 10' },
						{ id: 'Continuous', label: 'Continuous' },
						{ id: 'DataChangeIn', label: 'Data Change In' },
						{ id: 'DataChangeOut', label: 'Data Change Out' },
					],
				},
			],
		},

		dataSourceAutoNext: {
			label: 'DataSource - AutoNext',
			options: [
				{
					type: 'dropdown',
					label: 'AutoNext State',
					id: 'functionID',
					defaut: 'DataSourceAutoNextOn',
					choices: [
						{ id: 'DataSourceAutoNextOn', label: 'On' },
						{ id: 'DataSourceAutoNextOff', label: 'Off' },
						{ id: 'DataSourceAutoNextOnOff', label: 'On/Off' },
					],
				},
				{
					type: 'textinput',
					label: 'Name,Table',
					id: 'value',
				},
			],
		},

		DataSourceNextRow: {
			label: 'DataSource - Next Row',
			options: [
				{
					type: 'textinput',
					label: 'Name,Table',
					id: 'value',
				},
			],
		},

		DataSourcePreviousRow: {
			label: 'DataSource - Previous Row',
			options: [
				{
					type: 'textinput',
					label: 'Name,Table',
					id: 'value',
				},
			],
		},

		DataSourceSelectRow: {
			label: 'DataSource - Select Row',
			options: [
				{
					type: 'textinput',
					label: 'Name,Table,Index',
					id: 'value',
				},
			],
		},

		NextPicture: {
			label: 'Slides/List - Next Picture/Slide/Index',
			options: [input],
		},

		PreviousPicture: {
			label: 'Slides/List - Previous Picture/Slide/Index',
			options: [input],
		},

		SelectIndex: {
			label: 'Slides/List - Select Specific Picture/Slide/Index',
			options: [
				input,
				{
					type: 'number',
					label: 'Select Index',
					id: 'value',
					default: '1',
					min: 1,
					max: 999,
				},
			],
		},

		videoActions: {
			label: 'Video - Playback Actions',
			options: [
				input,
				{
					type: 'checkbox',
					label: 'Affect Preview instead of inputs',
					id: 'inputType',
					default: false,
				},
				{
					type: 'dropdown',
					label: 'Options',
					id: 'functionID',
					default: 'Play',
					choices: [
						{ id: 'Play', label: 'Play Video' },
						{ id: 'Pause', label: 'Pause Video' },
						{ id: 'PlayPause', label: 'Toggle Play and Pause' },
						{ id: 'Restart', label: 'Restart Video' },
						{ id: 'LoopOn', label: 'Loop Video On' },
						{ id: 'LoopOff', label: 'Loop Video Off' },
					],
				},
			],
		},

		//	Be aware this action should work as explained in the "Vmix Shortcode Docks" but seems to be % based and not on mili seconds. Use With Care
		videoPlayhead: {
			label: 'Video - Adjust or Set Playhead',
			options: [
				input,
				{
					type: 'checkbox',
					label: 'Affect Preview instead of inputs',
					id: 'inputType',
					default: false,
				},
				{
					type: 'dropdown',
					label: 'Adjustment',
					id: 'adjustment',
					default: 'Set',
					choices: ['Set', 'Increment', 'Decrement'].map((item) => ({ id: item, label: item })),
				},
				{
					type: 'textinput',
					label: 'value (in ms), but seems broken or some wierd % based setup',
					id: 'value',
					default: '',
				},
			],
		},

		videoMark: {
			label: 'Video - Mark Functions',
			options: [
				input,
				{
					type: 'checkbox',
					label: 'Affect Preview instead of inputs',
					id: 'inputType',
					default: false,
				},
				{
					type: 'dropdown',
					label: 'Function',
					id: 'functionID',
					default: 'MarkIn',
					choices: [
						{ id: 'MarkIn', label: 'Mark In' },
						{ id: 'MarkOut', label: 'Mark Out' },
						{ id: 'MarkReset', label: 'Mark Reset' },
						{ id: 'MarkResetIn', label: 'Mark Reset In' },
						{ id: 'MarkResetOut', label: 'Mark Reset Out' },
					],
				},
			],
		},

		replayACamera: {
			label: 'Replay - A Camera',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'functionID',
					default: 'ReplayACamera1',
					choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayACamera${item}`, label: `Camera ${item}` })),
				},
			],
		},

		replayBCamera: {
			label: 'Replay - B Camera',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'functionID',
					default: 'ReplayBCamera1',
					choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayBCamera${item}`, label: `Camera ${item}` })),
				},
			],
		},

		replayCamera: {
			label: 'Replay - Selected Channel Camera',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'functionID',
					default: 'ReplayCamera1',
					choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayCamera${item}`, label: `Camera ${item}` })),
				},
			],
		},

		replaySelectChannel: {
			label: 'Replay - Select Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'functionID',
					default: 'ReplaySelectChannelAB',
					choices: ['ReplaySelectChannelAB', 'ReplaySelectChannelA', 'ReplaySelectChannelB'].map((item) => ({
						id: item,
						label: item.substr(19),
					})),
				},
			],
		},

		replayMark: {
			label: 'Replay - Mark Functions',
			options: [
				{
					type: 'dropdown',
					label: 'Function',
					id: 'functionID',
					default: 'ReplayMarkIn',
					choices: [
						'ReplayMarkCancel',
						'ReplayMarkIn',
						'ReplayMarkInLive',
						'ReplayMarkInOut',
						'ReplayMarkInOutLive',
						'ReplayMarkInOutRecorded',
						'ReplayMarkInRecorded',
						'ReplayMarkInRecordedNow',
						'ReplayMarkOut',
					].map((item) => ({ id: item, label: item.substr(10) })),
				},
				{
					type: 'textinput',
					label: 'Seconds (when used)',
					id: 'value',
					default: '',
				},
			],
		},

		replayMoveInOut: {
			label: 'Replay - Move Selected Event In/Out',
			options: [
				{
					type: 'dropdown',
					label: 'In / Out',
					id: 'functionID',
					default: 'ReplayMoveSelectedInPoint',
					choices: [
						{ id: 'ReplayMoveSelectedInPoint', label: 'Move In Point' },
						{ id: 'ReplayMoveSelectedOutPoint', label: 'Move Out Point' },
					],
				},
				{
					type: 'textinput',
					label: 'Frames',
					id: 'value',
					default: '30',
				},
			],
		},

		replayUpdateInOut: {
			label: 'Replay - Move Selected Event In/Out to Now',
			options: [
				{
					type: 'dropdown',
					label: 'In / Out',
					id: 'functionID',
					default: 'ReplayUpdateSelectedInPoint',
					choices: [
						{ id: 'ReplayUpdateSelectedInPoint', label: 'Move In Point' },
						{ id: 'ReplayUpdateSelectedOutPoint', label: 'Move Out Point' },
					],
				},
			],
		},

		replaySelectEvents: {
			label: 'Replay - Replay Select Events',
			options: [
				{
					type: 'dropdown',
					label: 'Events',
					id: 'functionID',
					default: 'ReplaySelectEvents1',
					choices: [
						'ReplaySelectEvents1',
						'ReplaySelectEvents2',
						'ReplaySelectEvents3',
						'ReplaySelectEvents4',
						'ReplaySelectEvents5',
						'ReplaySelectEvents6',
						'ReplaySelectEvents7',
						'ReplaySelectEvents8',
					].map((item, index) => ({ id: item, label: `Events ${index + 1}` })),
				},
			],
		},

		ReplayChangeDirection: { label: 'Replay - Change Direction' },

		ReplayChangeSpeed: {
			label: 'Replay - Change Speed',
			options: [
				{
					type: 'textinput',
					label: 'Change -1 to 1',
					id: 'value',
					default: '0.1',
				},
			],
		},

		replayMoveEvent: {
			label: 'Replay - Move event',
			options: [
				{
					type: 'dropdown',
					label: 'Last/Slected',
					id: 'functionID',
					default: 'ReplaySelectEvents1',
					choices: [
						{ id: 'ReplayMoveLastEvent', label: 'Move Last' },
						{ id: 'ReplayMoveSelectedEvent', label: 'Move Selected' },
					],
				},
				{
					type: 'dropdown',
					label: 'Destination',
					id: 'value',
					default: 0,
					choices: [0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => ({ id: item, label: `Events ${index + 1}` })),
				},
			],
		},

		ReplayMoveEventUpDown: {
			label: 'Replay - Move Selected Event Up/Down',
			options: [
				{
					type: 'dropdown',
					label: 'Direction',
					id: 'functionID',
					default: 'ReplayMoveSelectedEventUp',
					choices: [
						{ id: 'ReplayMoveSelectedEventUp', label: 'Move Up' },
						{ id: 'ReplayMoveSelectedEventDown', label: 'Move Down' },
					],
				},
			],
		},

		replayFastForwardBackward: {
			label: 'Replay - Fast Forward/Backward',
			options: [
				{
					type: 'dropdown',
					label: 'Direction',
					id: 'functionID',
					default: 'ReplayFastForward',
					choices: [
						{ id: 'ReplayFastForward', label: 'Forward' },
						{ id: 'ReplayFastBackward', label: 'Backward' },
					],
				},
				{
					type: 'textinput',
					label: 'Seconds',
					id: 'value',
					default: '10',
				},
			],
		},

		ReplayJumpFrames: {
			label: 'Replay - Jump Frames',
			options: [
				{
					type: 'textinput',
					label: 'Frames',
					id: 'value',
					default: '60',
				},
			],
		},

		replayRecording: {
			label: 'Replay - Recording Start/Stop/Toggle',
			options: [
				{
					type: 'dropdown',
					label: 'Recording',
					id: 'functionID',
					default: 'ReplayToggleRecording',
					choices: [
						{ id: 'ReplayStartRecording', label: 'Start' },
						{ id: 'ReplayStopRecording', label: 'Stop' },
						{ id: 'ReplayToggleRecording', label: 'Toggle' },
					],
				},
			],
		},

		ReplayJumpToNow: { label: 'Replay - Jump To Now' },

		ReplayLiveToggle: { label: 'Replay - Toggle Live' },

		ReplayPlay: { label: 'Replay - Play' },

		ReplayPause: { label: 'Replay - Pause' },

		ReplayPlayEvent: {
			label: 'Replay - Play Event',
			options: [
				{
					type: 'textinput',
					label: 'Event ID',
					id: 'value',
					default: '0',
				},
			],
		},

		ReplayPlaySelectedEventToOutput: { label: 'Replay - Play Selected Event To Output' },

		ReplayPlayEventsByIDToOutput: {
			label: 'Replay - Play Events By ID To Output',
			options: [
				{
					type: 'textinput',
					label: 'Event ID',
					id: 'value',
					default: '0',
				},
			],
		},

		replayToggleCamera: {
			label: 'Replay - Toggle Selected Event Camera',
			options: [
				{
					type: 'dropdown',
					label: 'Destination',
					id: 'camera',
					default: '1',
					choices: ['1', '2', '3', '4'].map((item) => ({ id: item, label: `Camera ${item}` })),
				},
			],
		},

		browser: {
			label: 'Browser - Functions',
			options: [
				input,
				{
					type: 'dropdown',
					label: 'Function',
					id: 'functionID',
					default: 'BrowserReload',
					choices: [
						{ id: 'BrowserReload', label: 'Reload' },
						{ id: 'BrowserBack', label: 'Back' },
						{ id: 'BrowserForward', label: 'Forward' },
						{ id: 'BrowserKeyboardDisabled', label: 'Keyboard Disabled' },
						{ id: 'BrowserKeyboardEnabled', label: 'Keyboard Enabled' },
						{ id: 'BrowserMouseDisabled', label: 'Mouse Disabled' },
						{ id: 'BrowserMouseEnabled', label: 'Mousen Enabled' },
					],
				},
			],
		},

		BrowserNavigate: {
			label: 'Browser - Navigate',
			options: [
				input,
				{
					type: 'textinput',
					label: 'URL',
					id: 'value',
				},
			],
		},

		KeyPress: {
			label: 'General - KeyPress',
			options: [
				{
					type: 'textinput',
					label: 'Key',
					id: 'value',
				},
			],
		},

		ScriptStart: {
			label: 'Scripting - Script start',
			options: [
				{
					type: 'textinput',
					label: 'Script name',
					id: 'value',
				},
			],
		},

		ScriptStop: {
			label: 'Scripting - Script stop',
			options: [
				{
					type: 'textinput',
					label: 'Script name',
					id: 'value',
				},
			],
		},

		ScriptStopAll: { label: 'Scripting - Script stop all' },

		tbar: {
			label: 'Set t-bar position',
			options: [
				{
					type: 'number',
					label: 'postion 0-255',
					id: 'fader',
					min: 0,
					max: 255,
					default: 0,
				},
			],
		},

		Dynamic: {
			label: 'Set Dynamic Inputs and Values',
			options: [
				{
					type: 'dropdown',
					label: 'Select Type',
					id: 'type',
					default: 'Input',
					choices: [
						{ id: 'Input', label: 'Dynamic Input' },
						{ id: 'Value', label: 'Dynamic Value' },
					],
				},
				{
					type: 'dropdown',
					label: 'Select Number',
					id: 'number',
					default: '1',
					choices: [
						{ id: '1', label: '1' },
						{ id: '2', label: '2' },
						{ id: '3', label: '3' },
						{ id: '4', label: '4' },
					],
				},
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '',
				},
			],
		},

		command: {
			label: 'Run custom command',
			options: [
				{
					type: 'textinput',
					label: 'Command',
					id: 'command',
					default: '',
				},
			],
		},
	}
}

exports.executeAction = function (action) {
	var opt = {}
	var cmd

	// All input values should be encoded. See vMix TCP Api
	for (const property in action.options) {
		// if an option includes a variable, get it's value and replace the name for the actual value
		if (String(action.options[property]).includes('$(')) {
			x = String(action.options[property].split('$(')[1]).split(')')[0]
			var str = x.split(':') // Split instance and variable
			var selctInstances = str[0]
			var selctVariable = str[1]
			var temp

			// Gets the value of the selected value
			this.system.emit('variable_get', selctInstances, selctVariable, (definitions) => (temp = definitions))
			opt[property] = String(action.options[property]).split('$(')[0] + temp + String(action.options[property]).split('$(')[1].split(')')[1]
		} else {
			opt[property] = action.options[property]
		}
			opt[property] = encodeURIComponent(opt[property])
	}

	if (action.action === 'programCut') {
		if (opt.mix == undefined || opt.mix == 0) {
			cmd = `FUNCTION CutDirect Input=${opt.input}`
		} else {
			cmd = `FUNCTION Cut Input=${opt.input}&Mix=${opt.mix}`
		}
	} else if (action.action === 'outputSet') {
		cmd = `FUNCTION ${opt.functionID} Value=${opt.value}`
		if (opt.value === 'Input') {
			cmd += `&Input=${opt.input}`
		}
	} else if (action.action === 'SelectPlayList') {
		cmd = `FUNCTION SelectPlayList value=${opt.playlistName}`
	} else if (action.action === 'SetVolumeFade') {
		cmd = `FUNCTION SetVolumeFade Value=${opt.fadeMin},${opt.fadeTime !== undefined ? opt.fadeTime : '2000'}&input=${
			opt.input
		}`
	} else if (action.action === 'command') {
		// If this should be done then it should be done manualy i thing and not by me xD, there is a lot of pit falls that can break working configs.
		// var command = action.options.command.split(' ')[0];
		// var perams = encodeURI(action.options.command.split(' ').splice(1).join(' '));
		// var perams = action.options.command.split(' ').splice(1).join(' ');
		// cmd = `FUNCTION ${command} ${perams}`;
		cmd = `FUNCTION ${action.options.command}`
	} else if (action.action === 'MultiViewOverlay') {
		cmd = `FUNCTION ${opt.functionID} Input=${opt.input}&Value=${opt.selectedIndex}`
	} else if (action.action === 'SetMultiViewOverlay') {
		cmd = `FUNCTION SetMultiViewOverlay Input=${opt.input}&Value=${opt.selectedIndex},${opt.LayerInput}`
	} else if (action.action === 'SetMultiViewOverlayOnPreview') {
		cmd = `FUNCTION SetMultiViewOverlay Input=${this.data.mix[opt.mix].preview}&Value=${opt.selectedIndex},${
			opt.LayerInput
		}`
	} else if (action.action === 'SetMultiViewOverlayOnProgram') {
		cmd = `FUNCTION SetMultiViewOverlay Input=${this.data.mix[opt.mix].program}&Value=${opt.selectedIndex},${
			opt.LayerInput
		}`
	} else if (action.action === 'SetMultiViewOverlayDestinationInput') {
		this.destinationInput = parseInt(opt.destinationInput)
		this.checkFeedbacks("selectedDestinationInput")
	} else if (action.action === 'SetMultiViewOverlayDestinationLayer') {
		this.destinationLayer = opt.destinationLayer
		this.checkFeedbacks("selectedDestinationLayer")
	} else if (action.action === 'SetMultiViewOverlaySourceInput') {
		if (opt.sourceIndex == "0") {
			cmd = `FUNCTION SetMultiViewOverlay Input=${this.destinationInput}&Value=${this.destinationLayer},`
		} else {
			cmd = `FUNCTION SetMultiViewOverlay Input=${this.destinationInput}&Value=${this.destinationLayer},${
				opt.sourceIndex
			}`
		}
	} else if (action.action === 'VirtualSet') {
		cmd = `FUNCTION SelectIndex Input=${opt.input}&Value=${opt.selectedIndex}`
	} else if (action.action === 'SetText') {
		let text = opt.value

		// URL Encode plus and equals symbols to perform addition/subtraction on value instead of setting to a value.
		if (opt.adjustment === 'Increment') {
			text = '%2b%3d' + text
		} else if (opt.adjustment === 'Decrement') {
			text = '-%3d' + text
		}

		cmd = `FUNCTION SetText Input=${opt.input}&SelectedIndex=${opt.selectedIndex}&Value=${text}`
	} else if (action.action === 'SelectTitlePreset') {
		cmd = `FUNCTION SelectTitlePreset Input=${opt.input}&Value=${opt.selectedIndex}`
	} else if (action.action === 'TitlePreset') {
		cmd = `FUNCTION ${opt.functionID} Input=${opt.input}`
	} else if (action.action === 'TitleBeginAnimation') {
		cmd = `FUNCTION TitleBeginAnimation Input=${opt.input}&Value=${opt.value}`
	} else if (action.action === 'videoActions' || action.action === 'videoMark') {
		if (opt.inputType == true) {
			cmd = `FUNCTION ${opt.functionID} Input=0`
		} else {
			cmd = `FUNCTION ${opt.functionID} Input=${opt.input}`
		}
	} else if (action.action === 'videoPlayhead') {
		let text = opt.value

		// URL Encode plus and equals symbols to perform addition/subtraction on value instead of setting to a value.
		if (opt.adjustment === 'Increment') {
			text = '%2b%3d' + text
		} else if (opt.adjustment === 'Decrement') {
			text = '-%3d' + text
		}

		if (opt.inputType == true) {
			cmd = `FUNCTION SetPosition Input=0&Value=${text}`
		} else {
			cmd = `FUNCTION SetPosition Input=${opt.input}&Value=${text}`
		}
	} else if (action.action === 'BusXAudio') {
		if (opt.value == 'Master') {
			if (opt.functionID == 'BusXAudio') {
				cmd = `FUNCTION MasterAudio`
			}
			if (opt.functionID == 'BusXAudioOn') {
				cmd = `FUNCTION MasterAudioON`
			}
			if (opt.functionID == 'BusXAudioOff') {
				cmd = `FUNCTION MasterAudioOFF`
			}
		} else {
			cmd = `FUNCTION ${opt.functionID} Value=${opt.value}`
		}
	} else if (action.action === 'AudioOnOff') {
		cmd = `FUNCTION ${opt.functionID} Input=${opt.input}`
	} else if (action.action === 'VideoCallAudioSource') {
		cmd = `FUNCTION VideoCallAudioSource Input=${opt.input}&Value=${opt.value}`
	} else if (action.action === 'VideoCallVideoSource') {
		cmd = `FUNCTION VideoCallVideoSource Input=${opt.input}&Value=${opt.functionID}`
	} else if (action.action === 'replayRecording') {
		if ((opt.functionID = 'ReplayToggleRecording')) {
			cmd = `FUNCTION ${this.data.replay.recording ? 'ReplayStopRecording' : 'ReplayStartRecording'}`
		} else {
			cmd = `FUNCTION ${opt.functionID}`
		}
	} else if (action.action === 'replayToggleCamera') {
		cmd = `FUNCTION ReplayToggleSelectedEventCamera${opt.camera}`
	} else if (action.action === 'tbar') {
		cmd = `FUNCTION SetFader value=${opt.fader}`
	} else if (action.action === 'Dynamic') {
		cmd = `FUNCTION SetDynamic${opt.type}${opt.number} Value=${opt.value}`
	} else {
		const vMixFunction = opt.functionID || action.action
		const params = ['duration', 'input', 'mix', 'selectedIndex', 'value']
			.filter((param) => opt[param] !== undefined)
			.map((param) => `${param}=${opt[param]}`)
			.join('&')

		cmd = `FUNCTION ${vMixFunction} ${params}`
	}

	if (cmd !== undefined) {
		this.debug(`sending ${cmd} to ${this.config.host}`)

		if (this.socket !== undefined && this.socket.connected) {
			this.socket.send(cmd + '\r\n')
		} else {
			this.debug('Socket not connected.')
		}
	}
}
