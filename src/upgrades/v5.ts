import { type CompanionStaticUpgradeScript, type CompanionStaticUpgradeResult } from '@companion-module/base'
import type { Config } from '../config.js'

const upgradeV5_0_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  const upgradeMixSelect = (update: any): any => {
    if (update.options.mix?.value === -2) {
      update.options.mix = { isExpression: false, value: 'Selected' }
    } else {
      let currentValue = update.options.mix?.value

      if (currentValue !== undefined) {
        currentValue = (currentValue as number) + 1
      } else {
        currentValue = 1
      }

      update.options.mix = { isExpression: false, value: currentValue }
    }

    delete update.options.mixVariable
    return update
  }

  const mixSelectActions = ['previewInput', 'setMultiViewOverlayOnPreview', 'setMultiViewOverlayOnProgram', 'outputSet', 'programCut', 'transitionMix', 'transition', 'mixSelect']

  for (const action of props.actions) {
    if (action.actionId === 'toggleFunctions') {
      const functionID = action.options.functionID?.value as string
      if (functionID.includes('MultiCorder')) {
        action.actionId = 'multicorderFunctions'
        delete action.options.value
      } else if (functionID.includes('Recording')) {
        action.actionId = 'recordingFunctions'
        delete action.options.value
      } else if (functionID.includes('Streaming')) {
        action.actionId = 'streamingFunctions'
        let value: string | number = action.options.value?.value as string
        if (value !== '') value = !isNaN(parseInt(value)) ? parseInt(value) + 1 : ''
        if (action.options.value?.value !== '') action.options.value = { isExpression: false, value: value }
      } else if (functionID.includes('External')) {
        action.actionId = 'externalFunctions'
        delete action.options.value
      } else if (functionID.includes('Fullscreen')) {
        action.actionId = 'fullscreenFunctions'
        delete action.options.value
      } else if (functionID === 'FadeToBlack') {
        action.actionId = 'fadeToBlack'
        delete action.options.functionID
        delete action.options.value
      }

      changes.updatedActions.push(action)
    }

    if (action.actionId === 'overlayFunctions') {
      if (!Array.isArray(action.options.mix?.value)) {
        const newValue = [action.options.mix?.value === undefined ? 1 : action.options.mix.value]
        action.options.mix = { isExpression: false, value: newValue }
      } else {
        const values = action.options.mix?.value as number[]

        if (values.includes(-1) || values.includes(-2)) {
          const newValues: (string | number)[] = [...values.filter((x) => x >= 0).map((x) => x + 1)]
          if (values.includes(-1)) newValues.push('Selected')
          if (values.includes(-2) && action.options.mixVariable?.value) newValues.push(action.options.mixVariable.value as string)
          action.options.mix = { isExpression: true, value: JSON.stringify(newValues) }
        } else {
          action.options.mix = { isExpression: false, value: values.map((x) => x + 1) }
        }
      }

      delete action.options.mixVariable
      changes.updatedActions.push(action)
    }

    if (action.actionId === 'titleBeginAnimation') {
      if (action.options.value?.value === 'variable') {
        const currentValue = (action.options.variable?.value as string) || ''
        action.options.value = { isExpression: true, value: currentValue }
        delete action.options.variable
        changes.updatedActions.push(action)
      }
    }

    if (mixSelectActions.includes(action.actionId)) {
      changes.updatedActions.push(upgradeMixSelect(action))
    }

    if (action.actionId === 'ptzMove' || action.actionId === 'ptzFocusZoom') {
      action.options.value = { isExpression: false, value: action.options.Value?.value || '' }
      delete action.options.Value

      changes.updatedActions.push(action)
    }

    if (action.actionId === 'zoomMuteSelf') {
      if (!action.options.functionID && action.options.type?.value === 'Mute') action.options.functionID = { isExpression: false, value: 'zoomMuteSelf' }
      if (!action.options.functionID && action.options.type?.value === 'Unmute') action.options.functionID = { isExpression: false, value: 'zoomUnMuteSelf' }
      delete action.options.type

      changes.updatedActions.push(action)
    }

    if (action.actionId === 'busXSendToMaster') {
      action.options.functionID = { isExpression: false, value: 'BusXSendToMaster' }
      changes.updatedActions.push(action)
    }
  }

  const mixSelectFeedback = ['inputPreview', 'inputLive', 'mixSelect']
  for (const feedback of props.feedbacks) {
    if (mixSelectFeedback.includes(feedback.feedbackId)) {
      changes.updatedFeedbacks.push(upgradeMixSelect(feedback))
    }

    if (feedback.feedbackId === 'outputStatus' || feedback.feedbackId === 'outputNDISRT') {
      if (feedback.options.output?.value === 'Custom') {
        const currentValue = feedback.options.custom?.value || ''
        feedback.options.output = { isExpression: true, value: currentValue as string }
        delete feedback.options.custom
        changes.updatedFeedbacks.push(feedback)
      }
    }
  }

  if (props.config) {
    const newConfig = props.config
    delete newConfig.shiftDelimiter
    delete newConfig.shiftBlinkPrvPrgm
    delete newConfig.shiftBlinkLayerRouting
    newConfig.variablesShowInputJSON = false
    changes.updatedConfig = newConfig
  }

  return changes
}

export default [upgradeV5_0_0]
