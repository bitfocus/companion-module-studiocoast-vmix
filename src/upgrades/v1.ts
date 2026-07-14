import { type CompanionStaticUpgradeScript, type CompanionStaticUpgradeResult } from '@companion-module/base'
import type { Config } from '../config.js'

export const upgradeV1_2_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const config = props.config
  const actions = props.actions
  const feedbacks = props.feedbacks

  if (config !== null && config.port && typeof config.port === 'string') {
    config.tcpPort = parseInt(config.port)
    delete config.port
  }

  if (config !== null && !config.httpPort) {
    config.httpPort = 8088
  }

  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: config,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  // Actions
  actions.forEach((action) => {
    if (action.actionId === 'prwSel') {
      action.actionId = 'PreviewInput'
      action.options.input = action.options.prwId
      action.options.mix = { isExpression: false, value: 0 }
      delete action.options.prwId
    } else if (action.actionId === 'prwNext') {
      action.actionId = 'PreviewInputNext'
    } else if (action.actionId === 'prwPrv') {
      action.actionId = 'PreviewInputPrevious'
    } else if (action.actionId === 'pgmSel') {
      action.actionId = 'programCut'
      action.options.input = action.options.pgmId
      action.options.mix = { isExpression: false, value: 0 }
      delete action.options.pgmId
    } else if (action.actionId === 'transition') {
      action.options.functionID = action.options.transId
      delete action.options.transId
    } else if (action.actionId === 'quickPlay') {
      action.actionId = 'QuickPlay'
      action.options.input = action.options.pgmId
    } else if (action.actionId === 'outputSet') {
      action.options.functionID = action.options.outputId
      action.options.value = action.options.outputType
      action.options.input = action.options.outputInputId
      delete action.options.outputId
      delete action.options.outputType
      delete action.options.outputInputId
    } else if (action.actionId === 'toggle_functions') {
      action.actionId = 'toggleFunctions'
      action.options.functionID = action.options.toggleID
      delete action.options.toggleID
    } else if (action.actionId === 'playList_Functions') {
      action.actionId = 'playListFunctions'
      action.options.functionID = action.options.plfId
      delete action.options.plfId
    } else if (action.actionId === 'open_pl') {
      action.actionId = 'SelectPlayList'
      action.options.playlistName = action.options.plName
      delete action.options.plName
    } else if (action.actionId === 'overlayFunctions') {
      action.options.functionID = action.options.overlayFunc
      action.options.input = action.options.inputId
      delete action.options.overlayFunc
      delete action.options.inputId
    } else if (action.actionId === 'volumeFade') {
      action.actionId = 'SetVolumeFade'
      action.options.fadeMin = action.options.fade_Min
      action.options.fadeTime = action.options.fade_Time
      action.options.input = action.options.fade_Input
      delete action.options.fade_Min
      delete action.options.fade_Time
      delete action.options.fade_Input
    } else if (action.actionId === 'startCountdown') {
      action.actionId = 'StartCountdown'
      action.options.input = action.options.countdownStartInput
      delete action.options.countdownStartInput
    } else if (action.actionId === 'stopCountdown') {
      action.actionId = 'StartCountdown'
      action.options.input = action.options.countdownStopInput
      delete action.options.countdownStopInput
    } else if (action.actionId === 'setCountdownTime') {
      action.actionId = 'SetCountdown'
      action.options.value = action.options.countdownTime
      action.options.input = action.options.countdownSetInput
      delete action.options.countdownTime
      delete action.options.countdownSetInput
    } else if (action.actionId === 'nextPicture') {
      action.actionId = 'NextPicture'
      action.options.input = action.options.nPictureInput
      delete action.options.nPictureInput
    } else if (action.actionId === 'previousPicture') {
      action.actionId = 'PreviousPicture'
      action.options.input = action.options.pPictureInput
      delete action.options.pPictureInput
    } else if (action.actionId === 'keyPress') {
      action.actionId = 'KeyPress'
      action.options.value = action.options.key
      delete action.options.key
    } else if (action.actionId === 'scriptStart') {
      action.actionId = 'ScriptStart'
      action.options.value = action.options.script
      delete action.options.script
    } else if (action.actionId === 'scriptStop') {
      action.actionId = 'scriptStop'
      action.options.value = action.options.script
      delete action.options.script
    } else if (action.actionId === 'scriptStopAll') {
      action.actionId = 'ScriptStopAll'
    }

    changes.updatedActions.push(action)

    return action
  })

  // Feedbacks
  feedbacks.forEach((feedback) => {
    if (feedback.feedbackId === 'input_preview') {
      feedback.feedbackId = 'inputPreview'
      feedback.options.mix = { isExpression: false, value: 0 }
      changes.updatedFeedbacks.push(feedback)
    } else if (feedback.feedbackId === 'input_live') {
      feedback.feedbackId = 'inputLive'
      feedback.options.mix = { isExpression: false, value: 0 }
      changes.updatedFeedbacks.push(feedback)
    }

    return feedback
  })

  return changes
}

export default [upgradeV1_2_0]
