import { combineRgb, CompanionStaticUpgradeScript, CompanionStaticUpgradeResult } from '@companion-module/base'
import { Config } from './config'
import { getActions } from './actions'
import { getConfigFields } from './config'

/**
 * @param option string value to be parsed
 * @param defaultValue value to be returned if option is NaN
 * @param min minimum value
 * @param max maximum value
 * @returns parsed value within the confines of the min/max values
 * @description upgrades options that were numbers previously stored as a string
 */
const stringToInt = (option: unknown, defaultValue: number, min: number, max: number): number => {
  let newValue = parseInt(option as string, 10)
  if (isNaN(newValue)) newValue = defaultValue
  if (newValue < min) newValue = min
  if (newValue > max) newValue = max

  return newValue
}

/* eslint-disable */
const upgradeV1_2_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config> => {
  let config: any = props.config
  let actions: any = props.actions
  let feedbacks: any = props.feedbacks

  if (config.port) {
    config.tcpPort = config.port
    delete config.port
  }

  if (!config.httpPort) {
    config.httpPort = 8088
  }

  const changes: CompanionStaticUpgradeResult<Config> = {
    updatedConfig: config,
    updatedActions: [],
    updatedFeedbacks: []
  }

  // Actions
  actions = actions.map((action: any) => {
    if (action.actionId === 'prwSel') {
      action.actionId = 'PreviewInput'
      action.options.input = action.options.prwId
      action.options.mix = 0
      delete action.options.prwId
    } else if (action.actionId === 'prwNext') {
      action.actionId = 'PreviewInputNext'
    } else if (action.actionId === 'prwPrv') {
      action.actionId = 'PreviewInputPrevious'
    } else if (action.actionId === 'pgmSel') {
      action.actionId = 'programCut'
      action.options.input = action.options.pgmId
      action.options.mix = 0
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

    action.label = action.instance + ':' + action.actionId

    changes.updatedActions.push(action)

    return action
  })

  // Feedbacks
  feedbacks = feedbacks.map((feedback: any) => {
    if (feedback.feedbackId === 'input_preview') {
      feedback.feedbackId = 'inputPreview'
      feedback.options.mix = 1
      changes.updatedFeedbacks.push(feedback)
    } else if (feedback.feedbackId === 'input_live') {
      feedback.feedbackId = 'inputLive'
      feedback.options.mix = 1
      changes.updatedFeedbacks.push(feedback)
    }

    return feedback
  })

  return changes
}

/* eslint-disable */
const upgradeV2_0_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config> => {
  let config: any = props.config
  let actions: any = props.actions
  let feedbacks: any = props.feedbacks

  // actions, feedbacks, and config used to ensure default values for options
  const vMixActions: any = getActions({} as any)
  const vMixConfig = getConfigFields()

  // Config
  vMixConfig.forEach((configOption: any) => {
    if (config[configOption.id] === undefined && configOption.default)
      config[configOption.id] = configOption.default
  })

  if (config.errorInfo !== undefined) {
    config.connectionErrorLog = config.errorInfo
    delete config.errorInfo
  }

  const changes: CompanionStaticUpgradeResult<Config> = {
    updatedConfig: config,
    updatedActions: [],
    updatedFeedbacks: []
  }

  // Actions
  actions.map((action: any) => {
    // Renaming legacy action names
    const toLowerCamelCase: string[] = [
      'PreviewInput',
      'PreviewInputNext',
      'PreviewInputPrevious',
      'SetTransitionEffect',
      'SetTransitionDuration',
      'QuickPlay',
      'SelectPlayList',
      'MultiViewOverlay',
      'SetMultiViewOverlay',
      'SetMultiViewOverlayOnPreview',
      'SetMultiViewOverlayOnProgram',
      'SetMultiViewOverlayDestinationInput',
      'SetMultiViewOverlayDestinationLayer',
      'SetMultiViewOverlaySourceInput',
      'VirtualSet',
      'VideoCallAudioSource',
      'VideoCallVideoSource',
      'SetVolumeFade',
      'AudioBus',
      'BusXSendToMaster',
      'BusXAudio',
      'Audio',
      'BusXSolo',
      'Solo',
      'AudioPlugin',
      'AudioChannelMatrixApplyPreset',
      'SetCountdown',
      'ChangeCountdown',
      'SetText',
      'SelectTitlePreset',
      'TitlePreset',
      'TitleBeginAnimation',
      'DataSourceNextRow',
      'DataSourcePreviousRow',
      'DataSourceSelectRow',
      'NextPicture',
      'PreviousPicture',
      'SelectIndex',
      'ReplayChangeDirection',
      'ReplayChangeSpeed',
      'ReplayMoveEventUpDown',
      'ReplayJumpFrames',
      'ReplayJumpToNow',
      'ReplayLiveToggle',
      'ReplayPlay',
      'ReplayPause',
      'ReplayPlayEvent',
      'ReplayPlaySelectedEventToOutput',
      'ReplayPlayEventsByIDToOutput',
      'KeyPress',
      'ScriptStart',
      'ScriptStop',
      'ScriptStopAll',
      'Dynamic',
      'BrowserNavigate'
    ]

    if (toLowerCamelCase.includes(action.actionId)) {
      action.actionId = action.actionId.charAt(0).toLowerCase() + action.actionId.substr(1)
    }

    // Action Changes
    let actionChanged = true
    if (action.actionId === 'transitionMix') {
      action.options.duration = stringToInt(action.options.duration, 1000, 0, 9999)
    } else if (action.actionId === 'setTransitionDuration') {
      action.options.duration = stringToInt(action.options.duration, 1000, 0, 9999)
    } else if (action.actionId === 'selectPlayList') {
      action.options.value = action.options.playlistName || ''
      delete action.options.playlistName
    } else if (action.actionId === 'multiViewOverlay') {
      action.options.value = action.options.selectedIndex
      delete action.options.selectedIndex
    } else if (action.actionId === 'setMultiViewOverlay') {
      action.options.layer = stringToInt(action.options.selectedIndex, 1, 0, 10)
      action.options.layerInput = action.options.LayerInput
      delete action.options.selectedIndex
      delete action.options.LayerInput
    } else if (action.actionId === 'setMultiViewOverlayOnPreview') {
      action.options.layer = stringToInt(action.options.selectedIndex, 1, 0, 10)
      action.options.layerInput = action.options.LayerInput
      delete action.options.selectedIndex
      delete action.options.LayerInput
    } else if (action.actionId === 'setMultiViewOverlayOnProgram') {
      action.options.layer = stringToInt(action.options.selectedIndex, 1, 0, 10)
      action.options.layerInput = action.options.LayerInput
      delete action.options.selectedIndex
      delete action.options.LayerInput
    } else if (action.actionId === 'setMultiViewOverlayDestinationLayer') {
      action.options.destinationLayer = action.options.destinationLayer + ''
    } else if (action.actionId === 'virtualSet') {
      action.options.selectedIndex = stringToInt(action.options.selectedIndex, 1, 1, 4) + ''
    } else if (action.actionId === 'videoCallVideoSource') {
      action.options.value = action.options.functionID
      delete action.options.functionID
    } else if (action.actionId === 'setVolumeFade') {
      action.options.fadeMin = stringToInt(action.options.fadeMin, 0, 0, 100)
      action.options.fadeTime = stringToInt(action.options.fadeTime, 2000, 0, 60000)
    } else if (action.actionId === 'AudioOnOff') {
      action.actionId = 'audio'
    } else if (action.actionId === 'audioPlugin') {
      action.options.value = stringToInt(action.options.value, 1, 1, 1000)
    } else if (action.actionId === 'StartCountdown') {
      action.actionId = 'controlCountdown'
      action.options.functionID = 'StartCountdown'
      action.options.selectedIndex = action.options.selectedIndex + ''
    } else if (action.actionId === 'StopCountdown') {
      action.actionId = 'controlCountdown'
      action.options.functionID = 'StopCountdown'
      action.options.selectedIndex = action.options.selectedIndex + ''
    } else if (action.actionId === 'PauseCountdown') {
      action.actionId = 'controlCountdown'
      action.options.functionID = 'PauseCountdown'
      action.options.selectedIndex = action.options.selectedIndex + ''
    } else if (action.actionId === 'selectTitlePreset') {
      action.options.value = action.options.selectedIndex + ''
      delete action.options.selectedIndex
    } else if (action.actionId === 'videoPlayhead') {
      action.options.value = stringToInt(action.options.value, 0, 0, Infinity)
    } else if (action.actionId === 'replayMark') {
      action.options.value = stringToInt(action.options.value, 0, 0, Infinity)
    } else if (action.actionId === 'replayMoveInOut') {
      action.options.value = stringToInt(action.options.value, 30, 0, Infinity)
    } else if (action.actionId === 'replayChangeDirection') {
      action.options.channel = 'Current'
    } else if (action.actionId === 'replayChangeSpeed') {
      action.options.channel = 'Current'
    } else if (action.actionId === 'replayFastForwardBackward') {
      action.options.channel = 'Current'
      action.options.value = stringToInt(action.options.value, 10, 0, Infinity)
    } else if (action.actionId === 'replayJumpFrames') {
      action.options.value = stringToInt(action.options.value, 60, -Infinity, Infinity)
    } else if (action.actionId === 'replayJumpToNow') {
      action.options.channel = 'Current'
    } else if (action.actionId === 'replayPlay') {
      action.options.channel = 'Current'
    } else if (action.actionId === 'replayPause') {
      action.options.channel = 'Current'
    } else if (action.actionId === 'replayPlayEvent') {
      action.options.channel = 'Current'
      action.options.value = stringToInt(action.options.value, 0, 0, 1000)
    } else if (action.actionId === 'replayPlaySelectedEventToOutput') {
      action.options.channel = 'Current'
    } else if (action.actionId === 'replayPlayEventsByIDToOutput') {
      action.options.channel = 'Current'
      action.options.value = stringToInt(action.options.value, 0, 0, 1000)
    } else {
      actionChanged = false
    }

    // Setting defaults
    if (vMixActions[action.actionId] && vMixActions[action.actionId].options.length > 0) {
      vMixActions[action.actionId].options.forEach((option: any) => {
        if (action.options[option.id] === undefined) {
          action.options[option.id] = option.default
          actionChanged = true
        }
      })
    }

    if (actionChanged) changes.updatedActions.push(action)
  })

  // Feedbacks
  feedbacks = feedbacks
    .map((feedback: any) => {
      let feedbackChange = true
      if (feedback.feedbackId === 'inputPreview' || feedback.feedbackId === 'inputLive') {
        if (feedback.options.tally === 'corner') feedback.options.tally = 'cornerTL'
        if (feedback.options.tally === 'cornerR') feedback.options.tally = 'cornerTR'
      } else if (feedback.feedbackId === 'overlayStatusPGM') {
        feedback.feedbackId = 'overlayStatus'
        feedback.options.input = ''

        delete feedback.options.value
      } else if (feedback.feedbackId === 'inputAudio') {
        feedback.options.bgLive = feedback.options.bg
        feedback.options.bgMuted = combineRgb(255, 0, 0)

        delete feedback.options.bg
      } else if (feedback.feedbackId === 'inputMute') {
        feedback.feedbackId = 'inputAudio'
        feedback.options.bgLive = combineRgb(0, 255, 0)
        feedback.options.bgMuted = feedback.options.bg

        delete feedback.options.bg
      } else if (feedback.feedbackId === 'liveInputVolume' || feedback.feedbackId === 'liveBusVolume') {
        feedback.options.dBShow = feedback.options.value
        feedback.options.colorTxt = feedback.options.colortxt
        feedback.options.colorBG = feedback.options.colorbg
        feedback.options.colorBase = feedback.options.colorbase

        delete feedback.options.value
        delete feedback.options.colortxt
        delete feedback.options.colorbg
        delete feedback.options.colorbase
      } else if (feedback.feedbackId === 'inputVolumeLevel' || feedback.feedbackId === 'busVolumeLevel') {
        feedback.options.value = parseFloat(feedback.options.value as string)
        if (isNaN(feedback.options.value)) feedback.options.value = 100
      } else if (feedback.feedbackId === 'inputOnMultiview') {
        feedback.options.inputX = feedback.options.input
        feedback.options.inputY = feedback.options.inputMV

        delete feedback.options.input
        delete feedback.options.inputMV
        delete feedback.options.tally
      } else {
        feedbackChange = false
      }

      if (feedbackChange) changes.updatedFeedbacks.push(feedback)
      return feedback
    })
    .filter((feedback: any) => {
      // Feedback that should have just been instance variables have been deprecated
      const deprecated: string[] = ['titleLayer', 'inputSelectedIndexName', 'multiviewLayer']

      return !deprecated.includes(feedback.feedbackId)
    })

  return changes
}

/* eslint-disable */
const upgradeV2_0_6: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config> => {
  let actions: any = props.actions
  let feedbacks: any = props.feedbacks

  const changes: CompanionStaticUpgradeResult<Config> = {
    updatedConfig: null,
    updatedActions: [],
    updatedFeedbacks: []
  }

  actions.forEach((action: any) => {
    if (action.actionId === 'SetMultiViewOverlayDestinationLayer' || action.actionId === 'setMultiViewOverlayDestinationLayer') {
      action.actionId = 'setMultiViewOverlayDestinationLayer'
      action.options.destinationLayer = action.options.destinationLayer + ''
      changes.updatedActions.push(action)
    }
  })

  feedbacks.forEach((feedback: any) => {
    if (feedback.feedbackId === 'selectedDestinationLayer' || feedback.feedbackId === 'SelectedDestinationLayer') {
      feedback.feedbackId = 'selectedDestinationLayer'
      feedback.options.selectedIndex = feedback.options.selectedIndex + ''
      changes.updatedFeedbacks.push(feedback)
    }
  })

  return changes
}

/* eslint-disable */
const upgradeV3_5_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config> => {
  let actions: any = props.actions
  let config: any = props.config

  const changes: CompanionStaticUpgradeResult<Config> = {
    updatedConfig: null,
    updatedActions: [],
    updatedFeedbacks: []
  }

  if (config && config.tbar !== undefined) {
    delete config.tbar
    changes.updatedConfig = config
  }

  actions.forEach((action: any) => {
    if (action.actionId === 'tbar') {
      action.options.value = action.options.value + ''
      changes.updatedActions.push(action)
    }
  })

  return changes
}

const adjustmentFix: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config> => {
  let actions: any = props.actions

  const changes: CompanionStaticUpgradeResult<Config> = {
    updatedConfig: null,
    updatedActions: [],
    updatedFeedbacks: []
  }

  actions.forEach((action: any) => {
    if (action.actionId === 'videoPlayhead' || action.actionId === 'setText') {
      if (action.options.adjustment === 'Increment') action.options.adjustment = 'Increase'
      if (action.options.adjustment === 'Decrement') action.options.adjustment = 'Decrease'
      changes.updatedActions.push(action)
    }
  })

  return changes
}

const upgradeV3_6_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config> => {
  let actions: any = props.actions
  let feedbacks: any = props.feedbacks

  const changes: CompanionStaticUpgradeResult<Config> = {
    updatedConfig: null,
    updatedActions: [],
    updatedFeedbacks: []
  }

  actions.forEach((action: any) => {
    if (['previewInput', 'programCut', 'setMultiViewOverlayOnPreview', 'setMultiViewOverlayOnProgram', 'mixSelect'].includes(action.actionId)) {
      action.options.mixVariable = ''
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'setVolumeFade') {
      action.options.fadeMin = action.options.fadeMin + ''
      action.options.fadeTime = action.options.fadeTime + ''
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'transitionMix') {
      action.options.mixVariable = ''
      action.options.duration = action.options.duration + ''
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'replayMark') {
      action.options.value = action.options.value + ''
      action.options.value2 = '10'
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'replayMoveInOut') {
      action.options.value = action.options.value + ''
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'replayJumpFrames') {
      action.options.value = action.options.value + ''
      changes.updatedActions.push(action)
    }
  })

  feedbacks.forEach((feedback: any) => {
    if (['inputPreview', 'inputLive', 'mixSelect'].includes(feedback.feedbackId)) {
      feedback.options.mixVariable = ''
      changes.updatedFeedbacks.push(feedback)
    }

    if ([
      'status',
      'busMute',
      'busSolo',
      'inputAudio',
      'inputAudioAuto',
      'inputSolo',
      'inputBusRouting',
      'busVolumeLevel',
      'inputVolumeLevel',
      'inputLoop',
      'replayStatus',
      'replayEvents',
      'replayCamera',
      'replaySelectedChannel',
      'videoCallAudioSource',
      'videoCallVideoSource',
      'selectedDestinationInput',
      'selectedDestinationLayer',
      'routableMultiviewLayer',
      'inputOnMultiview',
      'mixSelect',
      'busSelect',
      'buttonShift'
    ].includes(feedback.feedbackId)) {
      if (!feedback.style) feedback.style = {}

      feedback.style.bgcolor = feedback.options.bg
      feedback.style.color = feedback.options.fg
      if (feedback.options.bg) delete feedback.options.bg
      if (feedback.options.fg) delete feedback.options.fg

      if (feedback.feedbackId === 'replayEvents') {
        feedback.options.channel = 'A'
      }

      if (feedback.feedbackId === 'inputOnMultiview') {
        feedback.options.layer = feedback.options.layer + ''
      }

      changes.updatedFeedbacks.push(feedback)
    }

    if (feedback.feedbackId === 'inputAudio') {
      if (!feedback.style) feedback.style = {}

      feedback.style.bgcolor = feedback.options.bgMuted
      feedback.style.color = feedback.options.fg
      if (feedback.options.bgMuted) delete feedback.options.bgMuted
      if (feedback.options.fg) delete feedback.options.fg

      changes.updatedFeedbacks.push(feedback)
    }

    if (feedback.feedbackId === 'inputSelectedIndex') {
      feedback.options.selectedIndex = feedback.options.selectedIndex + ''

      changes.updatedFeedbacks.push(feedback)
    }
  })

  return changes
}

export const getUpgrades = (): CompanionStaticUpgradeScript<Config>[] => {
  return [upgradeV1_2_0, upgradeV2_0_0, upgradeV2_0_6, upgradeV3_5_0, adjustmentFix, upgradeV3_6_0]
}
