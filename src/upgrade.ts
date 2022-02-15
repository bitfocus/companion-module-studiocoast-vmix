import { CompanionStaticUpgradeScript } from '../../../instance_skel_types'
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
const upgradeV1_2_0: CompanionStaticUpgradeScript = (_context, config, actions, feedbacks) => {
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

  // Actions
  actions = actions.map(action => {
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
      action.options.input = action.options.pgmId
    } else if (action.action === 'outputSet') {
      action.options.functionID = action.options.outputId
      action.options.value = action.options.outputType
      action.options.input = action.options.outputInputId
      delete action.options.outputId
      delete action.options.outputType
      delete action.options.outputInputId
    } else if (action.action === 'toggle_functions') {
      action.action = 'toggleFunctions'
      action.options.functionID = action.options.toggleID
      delete action.options.toggleID
    } else if (action.action === 'playList_Functions') {
      action.action = 'playListFunctions'
      action.options.functionID = action.options.plfId
      delete action.options.plfId
    } else if (action.action === 'open_pl') {
      action.action = 'SelectPlayList'
      action.options.playlistName = action.options.plName
      delete action.options.plName
    } else if (action.action === 'overlayFunctions') {
      action.options.functionID = action.options.overlayFunc
      action.options.input = action.options.inputId
      delete action.options.overlayFunc
      delete action.options.inputId
    } else if (action.action === 'volumeFade') {
      action.action = 'SetVolumeFade'
      action.options.fadeMin = action.options.fade_Min
      action.options.fadeTime = action.options.fade_Time
      action.options.input = action.options.fade_Input
      delete action.options.fade_Min
      delete action.options.fade_Time
      delete action.options.fade_Input
    } else if (action.action === 'startCountdown') {
      action.action = 'StartCountdown'
      action.options.input = action.options.countdownStartInput
      delete action.options.countdownStartInput
    } else if (action.action === 'stopCountdown') {
      action.action = 'StartCountdown'
      action.options.input = action.options.countdownStopInput
      delete action.options.countdownStopInput
    } else if (action.action === 'setCountdownTime') {
      action.action = 'SetCountdown'
      action.options.value = action.options.countdownTime
      action.options.input = action.options.countdownSetInput
      delete action.options.countdownTime
      delete action.options.countdownSetInput
    } else if (action.action === 'nextPicture') {
      action.action = 'NextPicture'
      action.options.input = action.options.nPictureInput
      delete action.options.nPictureInput
    } else if (action.action === 'previousPicture') {
      action.action = 'PreviousPicture'
      action.options.input = action.options.pPictureInput
      delete action.options.pPictureInput
    } else if (action.action === 'keyPress') {
      action.action = 'KeyPress'
      action.options.value = action.options.key
      delete action.options.key
    } else if (action.action === 'scriptStart') {
      action.action = 'ScriptStart'
      action.options.value = action.options.script
      delete action.options.script
    } else if (action.action === 'scriptStop') {
      action.action = 'scriptStop'
      action.options.value = action.options.script
      delete action.options.script
    } else if (action.action === 'scriptStopAll') {
      action.action = 'ScriptStopAll'
    }

    action.label = action.instance + ':' + action.action

    return action
  })

  // Feedbacks
  feedbacks = feedbacks.map(feedback => {
    if (feedback.type === 'input_preview') {
      feedback.type = 'inputPreview'
      feedback.options.mix = 1
    } else if (feedback.type === 'input_live') {
      feedback.type = 'inputLive'
      feedback.options.mix = 1
    }

    return feedback
  })

  return changed
}

/* eslint-disable */
const upgradeV2_0_0: CompanionStaticUpgradeScript = (context, config, actions, feedbacks) => {
  // actions, feedbacks, and config used to ensure default values for options
  const vMixActions: any = getActions({} as any)
  const vMixConfig = getConfigFields()

  // Config
  vMixConfig.forEach(configOption => {
    if (config[configOption.id] === undefined && configOption.type !== 'text')
      config[configOption.id] = configOption.default
  })

  if (config.errorInfo !== undefined) {
    config.connectionErrorLog = config.errorInfo
    delete config.errorInfo
  }

  // Actions
  actions.map(action => {
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

    if (toLowerCamelCase.includes(action.action)) {
      action.action = action.action.charAt(0).toLowerCase() + action.action.substr(1)
    }

    // Action Changes
    if (action.action === 'transitionMix') {
      action.options.duration = stringToInt(action.options.duration, 1000, 0, 9999)
    } else if (action.action === 'setTransitionDuration') {
      action.options.duration = stringToInt(action.options.duration, 1000, 0, 9999)
    } else if (action.action === 'selectPlayList') {
      action.options.value = action.options.playlistName || ''
      delete action.options.playlistName
    } else if (action.action === 'multiViewOverlay') {
      action.options.value = action.options.selectedIndex
      delete action.options.selectedIndex
    } else if (action.action === 'setMultiViewOverlay') {
      action.options.layer = stringToInt(action.options.selectedIndex, 1, 0, 10)
      action.options.layerInput = action.options.LayerInput
      delete action.options.selectedIndex
      delete action.options.LayerInput
    } else if (action.action === 'setMultiViewOverlayOnPreview') {
      action.options.layer = stringToInt(action.options.selectedIndex, 1, 0, 10)
      action.options.layerInput = action.options.LayerInput
      delete action.options.selectedIndex
      delete action.options.LayerInput
    } else if (action.action === 'setMultiViewOverlayOnProgram') {
      action.options.layer = stringToInt(action.options.selectedIndex, 1, 0, 10)
      action.options.layerInput = action.options.LayerInput
      delete action.options.selectedIndex
      delete action.options.LayerInput
    } else if (action.action === 'setMultiViewOverlayDestinationLayer') {
      action.options.destinationLayer = action.options.destinationLayer + ''
    } else if (action.action === 'virtualSet') {
      action.options.selectedIndex = stringToInt(action.options.selectedIndex, 1, 1, 4) + ''
    } else if (action.action === 'videoCallVideoSource') {
      action.options.value = action.options.functionID
      delete action.options.functionID
    } else if (action.action === 'setVolumeFade') {
      action.options.fadeMin = stringToInt(action.options.fadeMin, 0, 0, 100)
      action.options.fadeTime = stringToInt(action.options.fadeTime, 2000, 0, 60000)
    } else if (action.action === 'AudioOnOff') {
      action.action = 'audio'
    } else if (action.action === 'audioPlugin') {
      action.options.value = stringToInt(action.options.value, 1, 1, 1000)
    } else if (action.action === 'StartCountdown') {
      action.action = 'controlCountdown'
      action.options.functionID = 'StartCountdown'
      action.options.selectedIndex = action.options.selectedIndex + ''
    } else if (action.action === 'StopCountdown') {
      action.action = 'controlCountdown'
      action.options.functionID = 'StopCountdown'
      action.options.selectedIndex = action.options.selectedIndex + ''
    } else if (action.action === 'PauseCountdown') {
      action.action = 'controlCountdown'
      action.options.functionID = 'PauseCountdown'
      action.options.selectedIndex = action.options.selectedIndex + ''
    } else if (action.action === 'SelectTitlePreset') {
      action.options.value = action.options.selectedIndex
      delete action.options.selectedIndex
    } else if (action.action === 'videoPlayhead') {
      action.options.value = stringToInt(action.options.value, 0, 0, Infinity)
    } else if (action.action === 'replayMark') {
      action.options.value = stringToInt(action.options.value, 0, 0, Infinity)
    } else if (action.action === 'replayMoveInOut') {
      action.options.value = stringToInt(action.options.value, 30, 0, Infinity)
    } else if (action.action === 'replayChangeDirection') {
      action.options.channel = 'Current'
    } else if (action.action === 'replayChangeSpeed') {
      action.options.channel = 'Current'
    } else if (action.action === 'replayFastForwardBackward') {
      action.options.channel = 'Current'
      action.options.value = stringToInt(action.options.value, 10, 0, Infinity)
    } else if (action.action === 'replayJumpFrames') {
      action.options.value = stringToInt(action.options.value, 60, -Infinity, Infinity)
    } else if (action.action === 'replayJumpToNow') {
      action.options.channel = 'Current'
    } else if (action.action === 'replayPlay') {
      action.options.channel = 'Current'
    } else if (action.action === 'replayPause') {
      action.options.channel = 'Current'
    } else if (action.action === 'replayPlayEvent') {
      action.options.channel = 'Current'
      action.options.value = stringToInt(action.options.value, 0, 0, 1000)
    } else if (action.action === 'replayPlaySelectedEventToOutput') {
      action.options.channel = 'Current'
    } else if (action.action === 'replayPlayEventsByIDToOutput') {
      action.options.channel = 'Current'
      action.options.value = stringToInt(action.options.value, 0, 0, 1000)
    }

    // Setting defaults
    if (vMixActions[action.action] && vMixActions[action.action].options.length > 0) {
      vMixActions[action.action].options.forEach((option: any) => {
        if (action.options[option.id] === undefined) action.options[option.id] = option.default
      })
    }
  })

  // Feedbacks
  feedbacks = feedbacks
    .map(feedback => {
      if (feedback.type === 'inputPreview' || feedback.type === 'inputLive') {
        if (feedback.options.tally === 'corner') feedback.options.tally = 'cornerTL'
        if (feedback.options.tally === 'cornerR') feedback.options.tally = 'cornerTR'
      } else if (feedback.type === 'overlayStatusPGM') {
        feedback.type = 'overlayStatus'
        feedback.options.input = ''

        delete feedback.options.value
      } else if (feedback.type === 'inputAudio') {
        feedback.options.bgLive = feedback.options.bg
        feedback.options.bgMuted = context.rgb(255, 0, 0)

        delete feedback.options.bg
      } else if (feedback.type === 'inputMute') {
        feedback.type = 'inputAudio'
        feedback.options.bgLive = context.rgb(0, 255, 0)
        feedback.options.bgMuted = feedback.options.bg

        delete feedback.options.bg
      } else if (feedback.type === 'liveInputVolume' || feedback.type === 'liveBusVolume') {
        feedback.options.dBShow = feedback.options.value
        feedback.options.colorTxt = feedback.options.colortxt
        feedback.options.colorBG = feedback.options.colorbg
        feedback.options.colorBase = feedback.options.colorbase

        delete feedback.options.value
        delete feedback.options.colortxt
        delete feedback.options.colorbg
        delete feedback.options.colorbase
      } else if (feedback.type === 'inputVolumeLevel' || feedback.type === 'busVolumeLevel') {
        feedback.options.value = parseFloat(feedback.options.value as string)
        if (isNaN(feedback.options.value)) feedback.options.value = 100
      } else if (feedback.type === 'inputOnMultiview') {
        feedback.options.inputX = feedback.options.input
        feedback.options.inputY = feedback.options.inputMV

        delete feedback.options.input
        delete feedback.options.inputMV
        delete feedback.options.tally
      }

      return feedback
    })
    .filter(feedback => {
      // Feedback that should have just been instance variables have been deprecated
      const deprecated: string[] = ['titleLayer', 'inputSelectedIndexName', 'multiviewLayer']

      return !deprecated.includes(feedback.type)
    })

  return true
}

/* eslint-disable */
const upgradeV2_0_6: CompanionStaticUpgradeScript = (_context, _config, actions, feedbacks) => {

  actions.forEach(action => {
    if (action.action === 'SetMultiViewOverlayDestinationLayer' || action.action === 'setMultiViewOverlayDestinationLayer') {
      action.action = 'setMultiViewOverlayDestinationLayer'
      action.options.destinationLayer = action.options.destinationLayer + ''
    }
  })

  feedbacks.forEach(feedback => {
    if (feedback.type === 'selectedDestinationLayer' || feedback.type === 'SelectedDestinationLayer') {
      feedback.type = 'selectedDestinationLayer'
      feedback.options.selectedIndex = feedback.options.selectedIndex + ''
    }
  })

  return true
}

export const getUpgrades = (): CompanionStaticUpgradeScript[] => {
  return [upgradeV1_2_0, upgradeV2_0_0, upgradeV2_0_6]
}
