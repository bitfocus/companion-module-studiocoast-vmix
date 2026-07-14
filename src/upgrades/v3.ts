import { type CompanionStaticUpgradeScript, type CompanionStaticUpgradeResult } from '@companion-module/base'
import type { Config } from '../config.js'

const upgradeV3_5_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions
  const config = props.config

  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  if (config && config.tbar !== undefined) {
    delete config.tbar
    changes.updatedConfig = config
  }

  actions.forEach((action) => {
    if (action.actionId === 'tbar') {
      action.options.value = { isExpression: false, value: action.options.value?.value }
      changes.updatedActions.push(action)
    }
  })

  return changes
}

const adjustmentFix: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions

  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (action.actionId === 'videoPlayhead' || action.actionId === 'setText') {
      if (action.options.adjustment?.value === 'Increment') action.options.adjustment = { isExpression: false, value: 'Increase' }
      if (action.options.adjustment?.value === 'Decrement') action.options.adjustment = { isExpression: false, value: 'Decrease' }
      changes.updatedActions.push(action)
    }
  })

  return changes
}

const upgradeV3_6_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions
  const feedbacks = props.feedbacks

  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (['previewInput', 'programCut', 'setMultiViewOverlayOnPreview', 'setMultiViewOverlayOnProgram', 'mixSelect'].includes(action.actionId)) {
      if (action.options.mixVariable === undefined) action.options.mixVariable = { isExpression: false, value: '' }
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'setVolumeFade') {
      if (typeof action.options.fadeMin !== 'string') action.options.fadeMin = { isExpression: false, value: action.options.fadeMin?.value }
      if (typeof action.options.fadeTime !== 'string') action.options.fadeTime = { isExpression: false, value: action.options.fadeTime?.value }
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'transitionMix') {
      if (action.options.mixVariable === undefined) action.options.mixVariable = { isExpression: false, value: '' }
      if (typeof action.options.duration !== 'string') action.options.duration = { isExpression: false, value: action.options.duration?.value }
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'replayMark') {
      if (typeof action.options.value !== 'string') action.options.value = { isExpression: false, value: action.options.value?.value }
      if (action.options.value2 === undefined) action.options.value2 = { isExpression: false, value: '10' }
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'replayMoveInOut') {
      if (typeof action.options.value !== 'string') action.options.value = { isExpression: false, value: action.options.value?.value }
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'replayJumpFrames') {
      if (typeof action.options.value !== 'string') action.options.value = { isExpression: false, value: action.options.value?.value }
      changes.updatedActions.push(action)
    }
  })

  feedbacks.forEach((feedback) => {
    if (['inputPreview', 'inputLive', 'mixSelect'].includes(feedback.feedbackId)) {
      if (feedback.options.mixVariable === undefined) feedback.options.mixVariable = { isExpression: false, value: '' }
      changes.updatedFeedbacks.push(feedback)
    }

    if (
      [
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
        'buttonShift',
      ].includes(feedback.feedbackId)
    ) {
      if (!feedback.style) feedback.style = {}

      if (feedback.style.bgcolor === undefined && feedback.options.bg) feedback.style.bgcolor = feedback.options.bg.value as number
      if (feedback.style.color === undefined && feedback.options.fg) feedback.style.color = feedback.options.fg.value as number
      if (feedback.options.bg) delete feedback.options.bg
      if (feedback.options.fg) delete feedback.options.fg

      if (feedback.feedbackId === 'replayEvents' && feedback.options.channel === undefined) {
        feedback.options.channel = { isExpression: false, value: 'A' }
      }

      if (feedback.feedbackId === 'inputOnMultiview' && typeof feedback.options.layer?.value !== 'string') {
        feedback.options.layer = { isExpression: false, value: feedback.options.layer?.value }
      }

      changes.updatedFeedbacks.push(feedback)
    }

    if (feedback.feedbackId === 'inputAudio') {
      if (!feedback.style) feedback.style = {}

      if (feedback.style.bgcolor === undefined && feedback.options.bg) feedback.style.bgcolor = feedback.options.bg.value as number
      if (feedback.style.color === undefined && feedback.options.fg) feedback.style.color = feedback.options.fg.value as number
      if (feedback.options.bgMuted) delete feedback.options.bgMuted
      if (feedback.options.fg) delete feedback.options.fg

      changes.updatedFeedbacks.push(feedback)
    }

    if (feedback.feedbackId === 'inputSelectedIndex') {
      if (typeof feedback.options.selectedIndex !== 'string') feedback.options.selectedIndex = { isExpression: false, value: feedback.options.selectedIndex?.value }

      changes.updatedFeedbacks.push(feedback)
    }
  })

  return changes
}

const upgradeV3_6_2: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions

  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (action.actionId === 'ptzMove' && action.options.functionID?.value === 'PTZStop') {
      action.options.functionID = { isExpression: false, value: 'PTZMoveStop' }
      changes.updatedActions.push(action)
    }
  })

  return changes
}

const upgradeV3_7_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions
  const feedbacks = props.feedbacks

  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (action.actionId === 'overlayFunctions') {
      action.options.mix = { isExpression: false, value: 0 }
      action.options.mixVariable = { isExpression: false, value: '' }
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'setTransitionEffect') {
      action.options.input = { isExpression: false, value: '' }
      changes.updatedActions.push(action)
    }
  })

  feedbacks.forEach((feedback) => {
    if (feedback.feedbackId === 'inputVolumeMeter') {
      feedback.options.channel = { isExpression: false, value: 'Both' }
      changes.updatedFeedbacks.push(feedback)
    }
  })

  return changes
}

const upgradeV3_8_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions
  const feedbacks = props.feedbacks

  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (action.actionId === 'setInputPostion') {
      action.actionId = 'inputPosition'
      action.options.setting = action.options.functionID
      action.options.zoomValue = { isExpression: false, value: '1' }
      action.options.cropValue = { isExpression: false, value: '0,0,1,1' }
      action.options.cropValue2 = { isExpression: false, value: '1' }
      action.options.panValue = { isExpression: false, value: '1' }

      if (action.options.setting?.value === 'SetZoom') {
        action.options.zoomValue = action.options.value
      } else {
        action.options.panValue = action.options.value
      }

      delete action.options.functionID
      delete action.options.value

      changes.updatedActions.push(action)
    }
  })

  feedbacks.forEach((feedback) => {
    if (feedback.feedbackId === 'inputLoop') {
      feedback.feedbackId = 'inputState'
      feedback.options.type = { isExpression: false, value: 'loop' }
      changes.updatedFeedbacks.push(feedback)
    }
  })

  return changes
}

const upgradeV3_9_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions
  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (action.actionId === 'transition') {
      if (action.options.mix === undefined) action.options.mix = { isExpression: false, value: 0 }
      if (action.options.mixVariable === undefined) action.options.mixVariable = { isExpression: false, value: '' }

      changes.updatedActions.push(action)
    }
  })

  return changes
}

const upgradeV3_9_6: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions
  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (action.actionId === 'overlayFunctions' && action.options.mix === undefined) {
      if (action.options.mixVariable === undefined) action.options.mixVariable = { isExpression: false, value: '' }
      changes.updatedActions.push(action)
    }
  })

  return changes
}

export default [upgradeV3_5_0, adjustmentFix, upgradeV3_6_0, upgradeV3_6_2, upgradeV3_7_0, upgradeV3_8_0, upgradeV3_9_0, upgradeV3_9_6]
