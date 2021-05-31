exports.upgradeV1_2_0 = function (config, actions, releaseActions, feedbacks) {
	let changed = false

	if (config.port) {
		changed = true
		config.tcpPort = config.port
		delete config.port
	}

	if (!config.httpPort) {
		changed = true
		config.httpPort = 8088
	}

	const actionUpgrade = (action) => {
		if (action.action === 'prwSel') {
			action.action = 'PreviewInput'
			action.options.input = action.options.prwId
			action.options.mix = 0
			delete action.options.prwId
		} else if (action.action === 'prwNext') {
			action.action = 'PreviewInputNext'
		} else if (action.action === 'prwPrv') {
			action.action = 'PreviewInputPrevious'
		} else if (action.action === 'pgmSel') {
			action.action = 'programCut'
			action.options.input = action.options.pgmId
			action.options.mix = 0
			delete action.options.pgmId
		} else if (action.action === 'transition') {
			action.options.functionID = action.options.transId
			delete action.options.transId
		} else if (action.action === 'quickPlay') {
			action.action = 'QuickPlay'
			actions.options.input = action.options.pgmId
		} else if (action.action === 'outputSet') {
			actions.options.functionID = actions.options.outputId
			actions.options.value = actions.options.outputType
			actions.options.input = actions.options.outputInputId
			delete action.options.outputId
			delete action.options.outputType
			delete action.options.outputInputId
		} else if (action.action === 'toggle_functions') {
			action.action = 'toggleFunctions'
			actions.options.functionID = actions.options.toggleID
			delete action.options.toggleID
		} else if (action.action === 'playList_Functions') {
			action.action = 'playListFunctions'
			actions.options.functionID = actions.options.plfId
			delete action.options.plfId
		} else if (action.action === 'open_pl') {
			action.action = 'SelectPlayList'
			actions.options.playlistName = actions.options.plName
			delete action.options.plName
		} else if (action.action === 'overlayFunctions') {
			actions.options.functionID = actions.options.overlayFunc
			actions.options.input = actions.options.inputId
			delete action.options.overlayFunc
			delete action.options.inputId
		} else if (action.action === 'volumeFade') {
			action.action = 'SetVolumeFade'
			actions.options.fadeMin = actions.options.fade_Min
			actions.options.fadeTime = actions.options.fade_Time
			actions.options.input = actions.options.fade_Input
			delete action.options.fade_Min
			delete action.options.fade_Time
			delete action.options.fade_Input
		} else if (action.action === 'startCountdown') {
			action.action = 'StartCountdown'
			actions.options.input = actions.options.countdownStartInput
			delete action.options.countdownStartInput
		} else if (action.action === 'stopCountdown') {
			action.action = 'StartCountdown'
			actions.options.input = actions.options.countdownStopInput
			delete action.options.countdownStopInput
		} else if (action.action === 'setCountdownTime') {
			action.action = 'SetCountdown'
			actions.options.value = actions.options.countdownTime
			actions.options.input = actions.options.countdownSetInput
			delete action.options.countdownTime
			delete action.options.countdownSetInput
		} else if (action.action === 'nextPicture') {
			action.action = 'NextPicture'
			actions.options.input = actions.options.nPictureInput
			delete action.options.nPictureInput
		} else if (action.action === 'previousPicture') {
			action.action = 'PreviousPicture'
			actions.options.input = actions.options.pPictureInput
			delete action.options.pPictureInput
		} else if (action.action === 'keyPress') {
			action.action = 'KeyPress'
			actions.options.value = actions.options.key
			delete actions.options.key
		} else if (action.action === 'scriptStart') {
			action.action = 'ScriptStart'
			action.options.value = action.options.script
			delete actions.options.script
		} else if (action.action === 'scriptStop') {
			action.action = 'scriptStop'
			action.options.value = action.options.script
			delete actions.options.script
		} else if (action.action === 'scriptStopAll') {
			action.action = 'ScriptStopAll'
		}

		action.label = action.instance + ':' + action.action
	}

	actions.forEach(actionUpgrade)
	releaseActions.forEach(actionUpgrade)

	feedbacks.forEach((feedback) => {
		if (feedback.type === 'input_preview') {
			feedback.type = 'inputPreview'
			feedback.mix = 1
		} else if (feedback.type === 'input_live') {
			feedback.type = 'inputLive'
			feedback.mix = 1
		}
	})

	return changed
}
