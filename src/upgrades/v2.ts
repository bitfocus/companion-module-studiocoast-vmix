import { type CompanionStaticUpgradeScript, type CompanionStaticUpgradeResult } from '@companion-module/base'
import { type Config, getConfigFields } from '../config.js'

const stringToInt = (option: unknown, defaultValue: number, min: number, max: number): number => {
  let newValue = parseInt(option as string, 10)
  if (isNaN(newValue)) newValue = defaultValue
  if (newValue < min) newValue = min
  if (newValue > max) newValue = max

  return newValue
}

const upgradeV2_0_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const config = props.config
  const actions = props.actions
  const feedbacks = props.feedbacks
  const vMixConfig = getConfigFields()

  vMixConfig.forEach((configOption) => {
    if (config !== null && configOption.type !== 'static-text' && configOption.type !== 'bonjour-device') {
      if (config[configOption.id] === undefined && configOption.default !== undefined) config[configOption.id] = configOption.default
    }
  })

  if (config !== null && config.errorInfo !== undefined) {
    config.connectionErrorLog = Boolean(config.errorInfo)
    delete config.errorInfo
  }

  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: config,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  // Actions
  actions.forEach((action) => {
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
      'BrowserNavigate',
    ]

    if (toLowerCamelCase.includes(action.actionId)) {
      action.actionId = action.actionId.charAt(0).toLowerCase() + action.actionId.substr(1)
    }

    // Action Changes
    let actionChanged = true
    if (action.actionId === 'transitionMix' && action.options?.duration?.value !== undefined) {
      action.options.duration.value = stringToInt(action.options.duration.value, 1000, 0, 9999)
    } else if (action.actionId === 'setTransitionDuration' && action.options?.duration?.value !== undefined) {
      action.options.duration.value = stringToInt(action.options.duration.value, 1000, 0, 9999)
    } else if (action.actionId === 'selectPlayList') {
      action.options.value = { isExpression: false, value: action.options.playlistName?.value || '' }
      delete action.options.playlistName
    } else if (action.actionId === 'multiViewOverlay') {
      action.options.value = action.options.selectedIndex
      delete action.options.selectedIndex
    } else if (action.actionId === 'setMultiViewOverlay') {
      action.options.layer = { isExpression: false, value: stringToInt(action.options.selectedIndex, 1, 0, 10) }
      action.options.layerInput = action.options.LayerInput
      delete action.options.selectedIndex
      delete action.options.LayerInput
    } else if (action.actionId === 'setMultiViewOverlayOnPreview') {
      action.options.layer = { isExpression: false, value: stringToInt(action.options.selectedIndex, 1, 0, 10) }
      action.options.layerInput = action.options.LayerInput
      delete action.options.selectedIndex
      delete action.options.LayerInput
    } else if (action.actionId === 'setMultiViewOverlayOnProgram') {
      action.options.layer = { isExpression: false, value: stringToInt(action.options.selectedIndex, 1, 0, 10) }
      action.options.layerInput = action.options.LayerInput
      delete action.options.selectedIndex
      delete action.options.LayerInput
    } else if (action.actionId === 'setMultiViewOverlayDestinationLayer') {
      action.options.destinationLayer = { isExpression: false, value: action.options.destinationLayer?.value }
    } else if (action.actionId === 'virtualSet') {
      action.options.selectedIndex = { isExpression: false, value: stringToInt(action.options.selectedIndex?.value, 1, 1, 4) + '' }
    } else if (action.actionId === 'videoCallVideoSource') {
      action.options.value = action.options.functionID
      delete action.options.functionID
    } else if (action.actionId === 'setVolumeFade') {
      action.options.fadeMin = { isExpression: false, value: stringToInt(action.options.fadeMin?.value, 0, 0, 100) }
      action.options.fadeTime = { isExpression: false, value: stringToInt(action.options.fadeTime?.value, 2000, 0, 60000) }
    } else if (action.actionId === 'AudioOnOff') {
      action.actionId = 'audio'
    } else if (action.actionId === 'audioPlugin') {
      action.options.value = { isExpression: false, value: stringToInt(action.options.value, 1, 1, 1000) }
    } else if (action.actionId === 'StartCountdown') {
      action.actionId = 'controlCountdown'
      action.options.functionID = { isExpression: false, value: 'StartCountdown' }
      action.options.selectedIndex = { isExpression: false, value: action.options.selectedIndex?.value }
    } else if (action.actionId === 'StopCountdown') {
      action.actionId = 'controlCountdown'
      action.options.functionID = { isExpression: false, value: 'StopCountdown' }
      action.options.selectedIndex = { isExpression: false, value: action.options.selectedIndex?.value }
    } else if (action.actionId === 'PauseCountdown') {
      action.actionId = 'controlCountdown'
      action.options.functionID = { isExpression: false, value: 'PauseCountdown' }
      action.options.selectedIndex = { isExpression: false, value: action.options.selectedIndex?.value }
    } else if (action.actionId === 'selectTitlePreset') {
      action.options.value = { isExpression: false, value: action.options.selectedIndex?.value }
      delete action.options.selectedIndex
    } else if (action.actionId === 'videoPlayhead') {
      action.options.value = { isExpression: false, value: stringToInt(action.options.value?.value, 0, 0, Infinity) }
    } else if (action.actionId === 'replayMark') {
      action.options.value = { isExpression: false, value: stringToInt(action.options.value?.value, 0, 0, Infinity) }
    } else if (action.actionId === 'replayMoveInOut') {
      action.options.value = { isExpression: false, value: stringToInt(action.options.value?.value, 30, 0, Infinity) }
    } else if (action.actionId === 'replayChangeDirection') {
      action.options.channel = { isExpression: false, value: 'Current' }
    } else if (action.actionId === 'replayChangeSpeed') {
      action.options.channel = { isExpression: false, value: 'Current' }
    } else if (action.actionId === 'replayFastForwardBackward') {
      action.options.channel = { isExpression: false, value: 'Current' }
      action.options.value = { isExpression: false, value: stringToInt(action.options.value?.value, 10, 0, Infinity) }
    } else if (action.actionId === 'replayJumpFrames') {
      action.options.value = { isExpression: false, value: stringToInt(action.options.value?.value, 60, -Infinity, Infinity) }
    } else if (action.actionId === 'replayJumpToNow') {
      action.options.channel = { isExpression: false, value: 'Current' }
    } else if (action.actionId === 'replayPlay') {
      action.options.channel = { isExpression: false, value: 'Current' }
    } else if (action.actionId === 'replayPause') {
      action.options.channel = { isExpression: false, value: 'Current' }
    } else if (action.actionId === 'replayPlayEvent') {
      action.options.channel = { isExpression: false, value: 'Current' }
      action.options.value = { isExpression: false, value: stringToInt(action.options.value, 0, 0, 1000) }
    } else if (action.actionId === 'replayPlaySelectedEventToOutput') {
      action.options.channel = { isExpression: false, value: 'Current' }
    } else if (action.actionId === 'replayPlayEventsByIDToOutput') {
      action.options.channel = { isExpression: false, value: 'Current' }
      action.options.value = { isExpression: false, value: stringToInt(action.options.value, 0, 0, 1000) }
    } else {
      actionChanged = false
    }

    if (actionChanged) changes.updatedActions.push(action)
  })

  // Feedbacks
  feedbacks.forEach((feedback) => {
    let feedbackChange = true
    if (feedback.feedbackId === 'inputPreview' || feedback.feedbackId === 'inputLive') {
      if (feedback.options.tally?.value === 'corner') feedback.options.tally = { isExpression: false, value: 'cornerTL' }
      if (feedback.options.tally?.value === 'cornerR') feedback.options.tally = { isExpression: false, value: 'cornerTR' }
    } else if (feedback.feedbackId === 'overlayStatusPGM') {
      feedback.feedbackId = 'overlayStatus'
      feedback.options.input = { isExpression: false, value: '' }

      delete feedback.options.value
    } else if (feedback.feedbackId === 'inputAudio') {
      feedback.options.bgLive = feedback.options.bg
      feedback.options.bgMuted = { isExpression: false, value: 0xff0000 }

      delete feedback.options.bg
    } else if (feedback.feedbackId === 'inputMute') {
      feedback.feedbackId = 'inputAudio'
      feedback.options.bgLive = { isExpression: false, value: 0x00ff00 }
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

  return changes
}

const upgradeV2_0_6: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions
  const feedbacks = props.feedbacks

  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (action.actionId === 'SetMultiViewOverlayDestinationLayer' || action.actionId === 'setMultiViewOverlayDestinationLayer') {
      action.actionId = 'setMultiViewOverlayDestinationLayer'
      action.options.destinationLayer = { isExpression: false, value: action.options.destinationLayer?.value }
      changes.updatedActions.push(action)
    }
  })

  feedbacks.forEach((feedback) => {
    if (feedback.feedbackId === 'selectedDestinationLayer' || feedback.feedbackId === 'SelectedDestinationLayer') {
      feedback.feedbackId = 'selectedDestinationLayer'
      feedback.options.selectedIndex = { isExpression: false, value: feedback.options.selectedIndex?.value }
      changes.updatedFeedbacks.push(feedback)
    }
  })

  return changes
}

export default [upgradeV2_0_0, upgradeV2_0_6]
