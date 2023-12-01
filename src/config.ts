import { SomeCompanionConfigField } from '@companion-module/base'

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
  variablesShowInputLayerPosition: boolean
  strictInputVariableTypes: boolean
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
    { type: 'textinput', id: 'shiftDelimiter', width: 12, label: 'Shift Separator', default: '/' },
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
        'Toggle which variables are shown in the Instance Variables List (all will still be usable, even if not displayed in the list)',
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputs',
      width: 4,
      label: 'Input Variables by Name',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputNumbers',
      width: 4,
      label: 'Input Variables by Number',
      default: true,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputGUID',
      width: 4,
      label: 'Input Variables by GUID',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputPosition',
      width: 4,
      label: 'Input Position/Colour Correction Variables',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'variablesShowInputLayerPosition',
      width: 4,
      label: 'Input Layer Postion Variables',
      default: false,
    },
    {
      type: 'checkbox',
      id: 'strictInputVariableTypes',
      width: 12,
      label:
        'Limit Input Variable Types - Toggle on to not only hide certain input variables from auto-complete but disable their use. May improve performance when enabled',
      default: false,
    },
  ]
}
