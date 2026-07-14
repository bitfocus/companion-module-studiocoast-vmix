import type { SomeCompanionConfigField, JsonValue } from '@companion-module/base'
import type { AudioPreset } from './audioPresets.js'

export interface Config {
  label: string
  host: string
  tcpPort: number
  connectionErrorLog: boolean
  apiPollInterval: number
  volumeLinear: boolean
  variablesShowInputs: boolean
  variablesShowInputsLowercase: boolean
  variablesShowInputNumbers: boolean
  variablesShowInputGUID: boolean
  variablesShowInputPosition: boolean
  variablesShowInputCC: boolean
  variablesShowInputLayers: boolean
  variablesShowInputLayerPosition: boolean
  variablesShowInputList: boolean
  variablesShowInputTitleIndex: boolean
  variablesShowInputTitleName: boolean
  variablesShowInputVolume: boolean
  variablesShowInputJSON: boolean
  variablesShowAudio: boolean
  variablesShowDynamicInputs: boolean
  variablesShowDynamicValues: boolean
  variablesShowMix: boolean
  variablesShowOutputs: boolean
  variablesShowOverlays: boolean
  variablesShowReplay: boolean
  variablesShowTransitions: boolean
  debugSettings: boolean
  debugVariableDefinitionDelay: number
  debugVersionUpdateNotifications: boolean

  audioPresets: Record<string, AudioPreset>

  [x: string]: JsonValue
}

export const getConfigFields = (): SomeCompanionConfigField[] => {
  return [
    {
      type: 'static-text',
      id: 'connectionInfo',
      width: 12,
      label: 'Connection Info',
      value: `Companion uses vMix's TCP port (8099). Do NOT enter your Web Controller port, and ensure that the Web Controller is NOT set to 8099 as that will cause a conflict.`,
    },
    {
      type: 'textinput',
      id: 'host',
      label: 'Target host',
      width: 6,
      default: '127.0.0.1',
    },
    {
      type: 'number',
      id: 'tcpPort',
      label: 'TCP Port',
      width: 6,
      default: 8099,
      min: 1,
      max: 65535,
      step: 1,
    },

    {
      type: 'static-text',
      id: 'configBreak1',
      width: 12,
      label: '---',
      value: '',
    },

    {
      type: 'static-text',
      id: 'errorInfo',
      width: 11,
      label: 'Log connection errors (Default: Enabled)',
      value: 'Disabling this can help with clutter in the Log when vMix is closed.',
    },
    {
      type: 'checkbox',
      id: 'connectionErrorLog',
      label: 'Enable',
      width: 1,
      default: true,
    },
    {
      type: 'static-text',
      id: 'apiPollInfo',
      width: 12,
      label: 'API Poll Interval warning',
      value:
        'Adjusting the API Polling Interval can impact performance. <br />' +
        'A lower interval allows for more responsive feedback, but may impact CPU usage. <br />' +
        'See the help section for more details.',
    },
    {
      type: 'number',
      id: 'apiPollInterval',
      label: 'API Polling interval (ms)',
      description: 'default: 250, min: 100, 0 for disabled',
      width: 12,
      default: 250,
      min: 0,
      max: 60000,
    },
    {
      type: 'checkbox',
      id: 'volumeLinear',
      label: 'Linear vol scale',
      width: 4,
      default: false,
    },

    {
      type: 'static-text',
      id: 'configBreak2',
      width: 12,
      label: '---',
      value: '',
    },

    {
      type: 'static-text',
      id: 'variableInfo',
      width: 12,
      label: 'Variable Selection',
      value: `Processing large amounts of variables (tens to hundreds of thousands) can degrade Companion performance, and so for large vMix productions (or situations where Companion is running on a 
			low power device eg a Raspberry Pi) it is beneficial to limit what variables are generated to just those you wish to utilize.`,
    },

    // Input Variables
    {
      type: 'checkbox',
      id: 'variablesShowInputs',
      width: 12,
      label: 'Input Variables by Name\n(input_vt1_remaining).',
      tooltip: "Note: Variable names don't support some characters/symbols, these will be omitted from any input names in variables",
      default: true,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputsLowercase',
      width: 12,
      label: 'Enable to set input names in Variables to lowercase',
      tooltip: 'eg an Input named VT1 in vMix would be "input_vt1_remaining"',
      default: true,
      isVisibleExpression: `$(options:variablesShowInputs)`,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputNumbers',
      width: 12,
      label: 'Input Variables by Number\n(input_5_remaining)',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputGUID',
      width: 12,
      label: 'Input Variables by GUID\n(input_89b3994b-c010_remaining)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputPosition',
      width: 12,
      label: 'Input Position Variables\n(input_logo_position_panx)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputCC',
      width: 12,
      label: 'Input Color Correction Variables\n(input_logo_cc_hu)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputLayers',
      width: 12,
      label: 'Input Layer Name/Number/GUID\n(input_groupshot_layer_1_name)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputLayerPosition',
      width: 12,
      label: 'Input Layer Position Variables\n(input_groupshot_layer_1_panx)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputList',
      width: 12,
      label: 'Input List Variables\n(input_photos_list_1_name)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputTitleIndex',
      width: 12,
      label: 'Input Title Variables by index\n(input_scores_layer_1_titletext)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputTitleName',
      width: 12,
      label: 'Input Title Variables by name\n(input_scores_layer_team1_titletext)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputVolume',
      width: 12,
      label: 'Input Volume Variables\n(input_music_volume_db)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputJSON',
      width: 12,
      label: 'Input JSON data',
      default: false,
    },

    // Audio Variables
    {
      type: 'checkbox',
      id: 'variablesShowAudio',
      width: 12,
      label: 'Bus Audio Variables\n(bus_master_volume_db)',
      default: false,
    },

    // Dynamic Variables
    {
      type: 'checkbox',
      id: 'variablesShowDynamicInputs',
      width: 12,
      label: 'Dynamic Input Variables\n(dynamic_input_1_name)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowDynamicValues',
      width: 12,
      label: 'Dynamic Value Variables\n(dynamic_value_1)',
      default: false,
    },

    // Mix Variables
    {
      type: 'checkbox',
      id: 'variablesShowMix',
      width: 12,
      label: 'Mix input Variables\n(mix_1_preview_name)',
      default: false,
    },

    // Output Variables
    {
      type: 'checkbox',
      id: 'variablesShowOutputs',
      width: 12,
      label: 'Output Variables\n(output_1_source)',
      default: false,
    },

    // Overlay Variables
    {
      type: 'checkbox',
      id: 'variablesShowOverlays',
      width: 12,
      label: 'Overlay Variables\n(overlay_1_input_name)',
      default: false,
    },

    // Replay Variables
    {
      type: 'checkbox',
      id: 'variablesShowReplay',
      width: 12,
      label: 'Replay Variables\n(replay_recording)',
      default: false,
    },

    // Transition Variables
    {
      type: 'checkbox',
      id: 'variablesShowTransitions',
      width: 12,
      label: 'Transition Variables\n(transition_1_effect)',
      default: false,
    },

    {
      type: 'static-text',
      id: 'configBreak3',
      width: 12,
      label: '---',
      value: '',
    },

    // Debug Settings
    {
      type: 'static-text',
      id: 'debug',
      width: 12,
      label: 'Debug',
      value: `Only enable if you know what you're doing, can negatively impact performance and cause unexpected issues if misused.`,
    },
    {
      type: 'checkbox',
      id: 'debugSettings',
      width: 12,
      label: 'Enable Debug Options',
      default: false,
    },
    {
      type: 'number',
      id: 'debugVariableDefinitionDelay',
      label: 'Variable Definition update frequency (ms)',
      width: 6,
      default: 5000,
      min: 0,
      max: 60000,
      isVisibleExpression: `$(options:debugSettings)`,
    },
    {
      type: 'checkbox',
      id: 'debugVersionUpdateNotifications',
      width: 12,
      label: 'Log entries with new version information/warnings on startup',
      default: true,
      isVisibleExpression: `$(options:debugSettings)`,
    },
  ]
}

export const defaultConfig = (): Config => {
  return {
    label: '',
    host: '',
    tcpPort: 8099,
    connectionErrorLog: true,
    apiPollInterval: 250,
    volumeLinear: false,
    variablesShowInputs: true,
    variablesShowInputsLowercase: true,
    variablesShowInputNumbers: true,
    variablesShowInputGUID: false,
    variablesShowInputPosition: false,
    variablesShowInputCC: false,
    variablesShowInputLayers: false,
    variablesShowInputLayerPosition: false,
    variablesShowInputList: false,
    variablesShowInputTitleIndex: false,
    variablesShowInputTitleName: false,
    variablesShowInputVolume: false,
    variablesShowInputJSON: false,
    variablesShowAudio: false,
    variablesShowDynamicInputs: false,
    variablesShowDynamicValues: false,
    variablesShowMix: false,
    variablesShowOutputs: false,
    variablesShowOverlays: false,
    variablesShowReplay: false,
    variablesShowTransitions: false,
    debugSettings: false,
    debugVariableDefinitionDelay: 2000,
    debugVersionUpdateNotifications: true,

    audioPresets: {},
  }
}
