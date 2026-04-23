import { type CompanionStaticUpgradeScript, type CompanionStaticUpgradeResult } from '@companion-module/base'
import type { Config } from '../config.js'

const upgradeV4_0_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const config = props.config
  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  if (!config) return changes

  if (config.strictInputVariableTypes !== undefined) delete config.strictInputVariableTypes
  if (config.variablesShowInputCC === undefined) config.variablesShowInputCC = false
  if (config.variablesShowInputLayers === undefined) config.variablesShowInputLayers = false
  if (config.variablesShowInputList === undefined) config.variablesShowInputList = false
  if (config.variablesShowInputTitleIndex === undefined) config.variablesShowInputTitleIndex = false
  if (config.variablesShowInputTitleName === undefined) config.variablesShowInputTitleName = false
  if (config.variablesShowInputVolume === undefined) config.variablesShowInputVolume = false
  if (config.variablesShowAudio === undefined) config.variablesShowAudio = false
  if (config.variablesShowDynamicInputs === undefined) config.variablesShowDynamicInputs = false
  if (config.variablesShowDynamicValues === undefined) config.variablesShowDynamicValues = false
  if (config.variablesShowMix === undefined) config.variablesShowMix = false
  if (config.variablesShowOutputs === undefined) config.variablesShowOutputs = false
  if (config.variablesShowOverlays === undefined) config.variablesShowOverlays = false
  if (config.variablesShowReplay === undefined) config.variablesShowReplay = false
  if (config.variablesShowTransitions === undefined) config.variablesShowTransitions = false
  if (config.debugSettings === undefined) config.debugSettings = false
  if (config.debugVariableDefinitionDelay === undefined) config.debugVariableDefinitionDelay = 2000
  if (config.debugVersionUpdateNotifications === undefined) config.debugVersionUpdateNotifications = true

  changes.updatedConfig = config

  return changes
}

const upgradeV4_0_2: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const config = props.config
  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  if (!config) return changes

  if (config.variablesShowDynamicInputs === undefined) config.variablesShowDynamicInputs = Boolean(config.variablesShowDynamicInput) || false

  changes.updatedConfig = config

  return changes
}

const upgradeV4_1_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const config = props.config
  const actions = props.actions
  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (action.actionId === 'replayPlayEvent' || action.actionId === 'replayPlayEventsByIDToOutput') {
      action.options.value = { isExpression: false, value: action.options.value?.value }
      changes.updatedActions.push(action)
    }
  })

  if (!config) return changes

  if (config.variablesShowInputsLowercase === undefined) config.variablesShowInputsLowercase = true

  changes.updatedConfig = config

  return changes
}

const upgradeV4_2_0: CompanionStaticUpgradeScript<Config> = (_context, props): CompanionStaticUpgradeResult<Config, undefined> => {
  const actions = props.actions
  const changes: CompanionStaticUpgradeResult<Config, undefined> = {
    updatedConfig: null,
    updatedSecrets: null,
    updatedActions: [],
    updatedFeedbacks: [],
  }

  actions.forEach((action) => {
    if (action.actionId === 'overlayFunctions' && action.options.functionID !== undefined) {
      const functionID = action.options.functionID.value as string
      if (functionID === 'OverlayInput1' || functionID === 'OverlayInput2' || functionID === 'OverlayInput3' || functionID === 'OverlayInput4') {
        action.options.type = { isExpression: false, value: 'OverlayInput' }
        action.options.overlay = { isExpression: false, value: functionID.charAt(12) }
      } else if (functionID === 'PreviewOverlayInput1' || functionID === 'PreviewOverlayInput2' || functionID === 'PreviewOverlayInput3' || functionID === 'PreviewOverlayInput4') {
        action.options.type = { isExpression: false, value: 'PreviewOverlayInput' }
        action.options.overlay = { isExpression: false, value: functionID.charAt(19) }
      } else if (functionID === 'OverlayInput1In' || functionID === 'OverlayInput2In' || functionID === 'OverlayInput3In' || functionID === 'OverlayInput4In') {
        action.options.type = { isExpression: false, value: 'In' }
        action.options.overlay = { isExpression: false, value: functionID.charAt(12) }
      } else if (functionID === 'OverlayInput1Out' || functionID === 'OverlayInput2Out' || functionID === 'OverlayInput3Out' || functionID === 'OverlayInput4Out') {
        action.options.type = { isExpression: false, value: 'Out' }
        action.options.overlay = { isExpression: false, value: functionID.charAt(12) }
      } else if (functionID === 'OverlayInput1Off' || functionID === 'OverlayInput2Off' || functionID === 'OverlayInput3Off' || functionID === 'OverlayInput4Off') {
        action.options.type = { isExpression: false, value: 'Off' }
        action.options.overlay = { isExpression: false, value: functionID.charAt(12) }
      } else if (functionID === 'OverlayInput1Zoom' || functionID === 'OverlayInput2Zoom' || functionID === 'OverlayInput3Zoom' || functionID === 'OverlayInput4Zoom') {
        action.options.type = { isExpression: false, value: 'Zoom' }
        action.options.overlay = { isExpression: false, value: functionID.charAt(12) }
      } else if (functionID === 'OverlayInputAllOff') {
        action.options.type = { isExpression: false, value: 'OverlayInputAllOff' }
        action.options.overlay = { isExpression: false, value: '' }
      }

      delete action.options.functionID

      changes.updatedActions.push(action)
    }
  })

  return changes
}

export default [upgradeV4_0_0, upgradeV4_0_2, upgradeV4_1_0, upgradeV4_2_0]
