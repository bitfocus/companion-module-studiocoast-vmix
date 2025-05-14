import type { SomeCompanionConfigField } from '@companion-module/base'

export interface Config {
  label: string
  host: string
  tcpPort: number
  connectionErrorLog: boolean
  apiPollInterval: number
  volumeLinear: boolean
  shiftDelimiter: string
  shiftBlinkPrvPrgm: boolean
  shiftBlinkLayerRouting: boolean
  variablesShowInputs: boolean
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
      type: 'checkbox',
      id: 'connectionErrorLog',
      label: 'Enable',
      width: 1,
      default: true,
    },
    {
      type: 'static-text',
      id: 'errorInfo',
      width: 11,
      label: 'Log connection errors (Default: Enabled)',
      value: 'Disabling this can help with clutter in the Log when vMix is closed.',
    },
    {
      type: 'number',
      id: 'apiPollInterval',
      label: 'API Polling interval (ms) (default: 250, min: 100, 0 for disabled)',
      width: 12,
      default: 250,
      min: 0,
      max: 60000,
    },
    {
      type: 'static-text',
      id: 'apiPollInfo',
      width: 12,
      label: 'API Poll Interval warning',
      value:
        'Adjusting the API Polling Interval can impact performance. <br />' +
        'A lower invterval allows for more responsive feedback, but may impact CPU usage. <br />' +
        'See the help section for more details.',
    },
    {
      type: 'checkbox',
      id: 'volumeLinear',
      label: 'Linear vol scale',
      width: 4,
      default: false,
    },
    { type: 'textinput', id: 'shiftDelimiter', width: 12, label: 'Shift Separator', default: '|' },
    {
      type: 'static-text',
      id: 'shiftBlinkInfo',
      width: 12,
      label: 'Feedback Blink',
      value: 'When using button shifts, this will enable feedback to blink if active on a separate button layer',
    },
    {
      type: 'checkbox',
      id: 'shiftBlinkPrvPrgm',
      width: 3,
      label: 'Prv/Prgm Blink',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'shiftBlinkLayerRouting',
      width: 3,
      label: 'Layer Routing Blink',
      default: true,
    },
    {
      type: 'static-text',
      id: 'variablesInfo',
      width: 12,
      label: 'Instance Variables',
      value:
        'Toggle which variables are shown in the Variables List (all will still be usable, even if not displayed in the list). Disabling variables being shown can improve the performance of the Companion Web UI.',
    },

    {
      type: 'static-text',
      id: 'variableInfo',
      width: 12,
      label: 'Variable Selection',
      value: `Processing large amounts of variables (tens to hundreds of thousands) can degrade Companion performance, and so for large vMix productions (or situations where Companion is running on a 
			low power device eg a Rapberry Pi) it is beneficial to limit what variables are generated to just those you wish to utilize.`,
    },

    // Input Variables
    {
      type: 'checkbox',
      id: 'variablesShowInputs',
      width: 12,
      label: 'Input Variables by Name (eg "input_vt1_remaining")',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputNumbers',
      width: 12,
      label: 'Input Variables by Number (eg "input_5_remaining")',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputGUID',
      width: 12,
      label: 'Input Variables by GUID (eg "input_89b3994b-c010-4c9b-a743-01193d63620e_remaining")',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputPosition',
      width: 12,
      label: 'Input Position Variables (eg "input_logo_position_panx")',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputCC',
      width: 12,
      label: 'Input Color Correction Variables (eg "input_logo_cc_hue)',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputLayers',
      width: 12,
      label: 'Input Layer Name/Number/GUID (eg "input_groupshot_layer_1_name")',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputLayerPosition',
      width: 12,
      label: 'Input Layer Position Variables (eg "input_groupshot_layer_1_panx")',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputList',
      width: 12,
      label: 'Input List Variables (eg "input_photos_list_1_name")',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputTitleIndex',
      width: 12,
      label: 'Input Title Variables by index (eg "input_scores_layer_1_titletext")',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputTitleName',
      width: 12,
      label: 'Input Title Variables by name (eg "input_scores_layer_team1_titletext")',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputVolume',
      width: 12,
      label: 'Input Volume Variables (eg "input_music_volume_db")',
      default: false,
    },

    // Audio Variables
    {
      type: 'checkbox',
      id: 'variablesShowAudio',
      width: 12,
      label: 'Bus Audio Variables (eg "bus_master_volume_db")',
      default: false,
    },

    // Dynamic Variables
    {
      type: 'checkbox',
      id: 'variablesShowDynamicInput',
      width: 12,
      label: 'Dynamic Input Variables (eg "dynamic_input_1_name")',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowDynamicValues',
      width: 12,
      label: 'Dynamic Value Variables (eg "dynamic_value_1")',
      default: false,
    },

    // Mix Variables
    {
      type: 'checkbox',
      id: 'variablesShowMix',
      width: 12,
      label: 'Mix input Variables (eg "mix_1_preview_name")',
      default: false,
    },

    // Output Variables
    {
      type: 'checkbox',
      id: 'variablesShowOutputs',
      width: 12,
      label: 'Output Variables (eg "output_1_source")',
      default: false,
    },

    // Overlay Variables
    {
      type: 'checkbox',
      id: 'variablesShowOverlays',
      width: 12,
      label: 'Overlay Variables (eg "overlay_1_input_name")',
      default: false,
    },

    // Replay Variables
    {
      type: 'checkbox',
      id: 'variablesShowReplay',
      width: 12,
      label: 'Replay Variables (eg "replay_recording")',
      default: false,
    },

    // Transition Variables
    {
      type: 'checkbox',
      id: 'variablesShowTransitions',
      width: 12,
      label: 'Transition Variables (eg "transition_1_effect")',
      default: false,
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
      isVisible: (config) => config.debugSettings === true,
    },
    {
      type: 'checkbox',
      id: 'debugVersionUpdateNotifications',
      width: 12,
      label: 'Log entries with new version information/warnings on startup',
      default: true,
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
    shiftDelimiter: '/',
    shiftBlinkPrvPrgm: true,
    shiftBlinkLayerRouting: true,
    variablesShowInputs: true,
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
  }
}
