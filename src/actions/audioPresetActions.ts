import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'

export type AudioPresetActionsSchema = {
  loadAudioPreset: CompanionActionSchema<{
    name: string
    busses: ('busRouting' | 'busVolumes' | 'busMute' | 'busSolo' | 'busFilter')[]
    busFade: string
    busFilter: string
    inputs: ('inputRouting' | 'inputVolumes' | 'inputMute' | 'inputSolo' | 'inputAudioAuto' | 'inputChannelMixer' | 'inputFilter')[]
    inputFade: string
    inputFilter: string
    commandDelay: string
  }>
  deleteAudioPreset: CompanionActionSchema<{
    name: string
  }>
  saveAudioPreset: CompanionActionSchema<{
    name: string
    overwrite: boolean
    includeBusses: boolean
    includeInputs: boolean
    inputReference: 'title' | 'number' | 'key'
    filter: string
  }>
}

export const getAudioPresetActions = (instance: VMixInstance, _sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<AudioPresetActionsSchema> => {
  return {
    loadAudioPreset: {
      name: 'Audio Preset - Load',
      description: 'Load current Bus and/or Input Audio settings from a prior saved preset',
      options: [
        {
          type: 'textinput',
          label: 'Audio Preset Name or Variable',
          id: 'name',
          default: '',
          tooltip: 'This can be the Name of a preset created within this Companion connection, or a variable containing Audio Preset data',
          useVariables: true,
        },
        {
          type: 'multidropdown',
          label: 'Bus settings to load',
          id: 'busses',
          default: [],
          choices: [
            { id: 'busRouting', label: 'Bus Routing' },
            { id: 'busVolumes', label: 'Bus Volumes' },
            { id: 'busMute', label: 'Bus Mute' },
            { id: 'busSolo', label: 'Bus Solo' },
            { id: 'busFilter', label: 'Filter Busses to load' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Fade Bus Volume ms (leave empty for instant)',
          id: 'busFade',
          default: '',
          isVisibleExpression: `includes($(options:busses), 'busVolumes')`,
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'List of Busses load, eg M, A, B (leave blank for all)',
          id: 'busFilter',
          default: '',
          description: 'Comma separated',
          isVisibleExpression: `includes($(options:busses), 'busFilter')`,
          useVariables: true,
        },
        {
          type: 'multidropdown',
          label: 'Input settings to load',
          id: 'inputs',
          default: [],
          choices: [
            { id: 'inputRouting', label: 'Input Routing' },
            { id: 'inputVolumes', label: 'Input Volumes' },
            { id: 'inputMute', label: 'Input Mute' },
            { id: 'inputSolo', label: 'Input Solo' },
            { id: 'inputAudioAuto', label: 'Input Auto Audio mixing' },
            { id: 'inputChannelMixer', label: 'Input Channel Mixer' },
            { id: 'inputFilter', label: 'Filter Busses to load' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Fade Input Volume ms (leave empty for instant)',
          id: 'inputFade',
          default: '',
          isVisibleExpression: `includes($(options:inputs), 'inputVolumes')`,
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'List of inputs to load (leave blank for all)',
          id: 'inputFilter',
          default: '',
          description: 'Comma separated',
          isVisibleExpression: `includes($(options:inputs), 'inputFilter')`,
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Delay between commands sent to vMix in ms',
          id: 'commandDelay',
          default: '0',
          tooltip: 'Keep as low as possible, only increase if vMix has issues with large changes',
          useVariables: true,
        },
      ],
      callback: async (action, _context) => {
        let presetData = instance.audioPresets.presets[action.options.name]

        if (!presetData) {
          try {
            presetData = JSON.parse(action.options.name)
          } catch (e) {
            instance.log('warn', `Unable to parse Audio Preset data ${e}`)
            return
          }
        }

        if (!presetData.name || !Array.isArray(presetData.inputs) || !Array.isArray(presetData.busses)) {
          instance.log('warn', 'Invalid Audio Preset Data')
          instance.log('debug', JSON.stringify(presetData))
          return
        }

        instance.audioPresets.loadPreset(presetData, action.options)
      },
    },

    deleteAudioPreset: {
      name: 'Audio Preset - Delete',
      description: 'Delete a saved Audio Preset',
      options: [
        {
          type: 'textinput',
          label: 'Name for Audio Preset',
          id: 'name',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (action, _context) => {
        if (instance.audioPresets.presets[action.options.name]) {
          return instance.audioPresets.deletePreset(action.options.name)
        } else {
          instance.log('warn', `Unable to find preset to delete named: ${action.options.name}`)
        }
      },
    },

    saveAudioPreset: {
      name: 'Audio Preset - Save',
      description: 'Save current Bus and/or Input Audio settings to load again later',
      options: [
        {
          type: 'textinput',
          label: 'Name for Audio Preset',
          id: 'name',
          default: '',
          useVariables: true,
        },
        {
          type: 'checkbox',
          label: 'Overwrite preset if Name exists',
          id: 'overwrite',
          default: true,
        },
        {
          type: 'checkbox',
          label: 'Save Bus settings',
          id: 'includeBusses',
          default: true,
        },
        {
          type: 'checkbox',
          label: 'Save Input settings',
          id: 'includeInputs',
          default: true,
          disableAutoExpression: true,
        },
        {
          type: 'dropdown',
          label: 'Reference inputs by Title, Number, or Key',
          id: 'inputReference',
          default: 'title',
          choices: [
            { id: `title`, label: `Title` },
            { id: `number`, label: `Number` },
            { id: `key`, label: `Key` },
          ],
          isVisibleExpression: `$(options:includeInputs) === true`,
        },
        {
          type: 'textinput',
          label: 'List of inputs to save (leave blank for all)',
          id: 'filter',
          default: '',
          description: 'Comma separated',
          isVisibleExpression: `$(options:includeInputs) === true`,
          useVariables: true,
        },
      ],
      callback: async (action, _context) => {
        if (!action.options.overwrite && instance.audioPresets.presets[action.options.name] !== undefined) {
          return instance.log('warn', `Unable to Save Audio Preset: ${action.options.name} already exists`)
        }

        instance.audioPresets.savePreset({
          name: action.options.name,
          includeBusses: action.options.includeBusses,
          includeInputs: action.options.includeInputs,
          inputReference: action.options.inputReference,
          inputFilter: action.options.filter,
        })
      },
    },
  }
}
