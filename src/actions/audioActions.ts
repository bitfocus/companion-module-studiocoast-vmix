import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { type AudioBusOption, type AudioBusMasterOption, type AudioBusMasterHeadphonesOption, type EmptyOptions, options, volumeToLinear } from '../utils.js'
import type VMixInstance from '../index.js'

export type AudioActionsSchema = {
  audioBus: CompanionActionSchema<{
    input: string
    value: AudioBusMasterOption
    functionID: 'AudioBus' | 'AudioBusOn' | 'AudioBusOff'
  }>
  busXSendToMaster: CompanionActionSchema<{
    value: AudioBusOption
    functionID: 'BusXSendToMaster' | 'BusXSendToMasterOn' | 'BusXSendToMasterOff'
  }>
  busXAudio: CompanionActionSchema<{
    value: AudioBusMasterOption
    functionID: 'BusXAudio' | 'BusXAudioOn' | 'BusXAudioOff'
  }>
  busXAudioPlugin: CompanionActionSchema<{
    value: AudioBusMasterOption
    functionID: 'BusXAudioPluginOnOff' | 'BusXAudioPluginOn' | 'BusXAudioPluginOff' | 'BusXAudioPluginShow'
    plugin: number
  }>
  audio: CompanionActionSchema<{
    input: string
    functionID: 'Audio' | 'AudioOn' | 'AudioOff'
  }>
  audioAuto: CompanionActionSchema<{
    input: string
    functionID: 'AudioAuto' | 'AudioAutoOn' | 'AudioAutoOff'
  }>
  busXSolo: CompanionActionSchema<{
    value: AudioBusOption
    functionID: 'BusXSolo' | 'BusXSoloOn' | 'BusXSoloOff'
  }>
  solo: CompanionActionSchema<{
    input: string
    functionID: 'Solo' | 'SoloOn' | 'SoloOff'
  }>
  setInputVolume: CompanionActionSchema<{
    input: string
    adjustment: 'Set' | 'Increase' | 'Decrease'
    amount: string
  }>
  setBusVolumeFade: CompanionActionSchema<{
    value: AudioBusMasterOption
    fadeVol: string
    fadeTime: string
  }>
  setVolumeFade: CompanionActionSchema<{
    fadeMin: string
    fadeTime: string
    input: string
  }>
  setBusVolume: CompanionActionSchema<{
    value: AudioBusMasterHeadphonesOption
    adjustment: 'Set' | 'Increase' | 'Decrease'
    amount: string
  }>
  audioPlugin: CompanionActionSchema<{
    input: string
    value: number
    functionID: 'AudioPluginOnOff' | 'AudioPluginOn' | 'AudioPluginOff' | 'AudioPluginShow'
  }>
  audioChannelMatrixApplyPreset: CompanionActionSchema<{
    input: string
    value: string
  }>
  setVolumeBusMixer: CompanionActionSchema<{
    input: string
    value: AudioBusMasterOption
    amount: number
  }>
  setVolumeChannel: CompanionActionSchema<{
    input: string
    channel: string
    adjustment: 'Set' | 'Increase' | 'Decrease'
    amount: string
  }>
  setVolumeChannelMixer: CompanionActionSchema<{
    input: string
    channel: string
    adjustment: 'Set' | 'Increase' | 'Decrease'
    amount: string
  }>
  setBalance: CompanionActionSchema<{
    input: string
    adjustment: 'Set' | 'Increase' | 'Decrease'
    amount: number
  }>
  setGain: CompanionActionSchema<{
    input: string
    channel: 'Both' | '1' | '2'
    adjustment: 'Set' | 'Increase' | 'Decrease'
    amount: number
  }>
  soloPFL: CompanionActionSchema<{
    input: string
    functionID: 'SoloPFL' | 'SoloPFLOn' | 'SoloPFLOff'
  }>
  soloAllOff: EmptyOptions
  audioMixerShowHide: EmptyOptions
}

export const getAudioActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<AudioActionsSchema> => {
  return {
    audioBus: {
      name: 'Audio - Route Input to Bus',
      description: 'Routes the audio from an Input to the specified Bus',
      options: [
        options.input,
        options.audioBusMaster,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'AudioBus',
          choices: [
            { id: 'AudioBus', label: 'Toggle' },
            { id: 'AudioBusOn', label: 'On' },
            { id: 'AudioBusOff', label: 'Off' },
          ],
          expressionDescription: `Valid Values: 'AudioBus', 'AudioBusOn', 'AudioBusOff'`,
        },
      ],
      callback: async (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        const commandOptions = { ...action.options, value: selected }

        return sendBasicCommand({ ...action, options: commandOptions })
      },
    },

    busXSendToMaster: {
      name: 'Audio - Route Bus to Master',
      description: 'Routes the audio from a Bus to Master',
      options: [
        options.audioBus,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'BusXSendToMaster',
          choices: [
            { id: 'BusXSendToMaster', label: 'Toggle Bus to Master' },
            { id: 'BusXSendToMasterOn', label: 'Set Bus to Master ON' },
            { id: 'BusXSendToMasterOff', label: 'Set Bus toMaster OFF' },
          ],
          expressionDescription: `Valid Values: 'BusXSendToMaster', 'BusXSendToMasterOn', 'BusXSendToMasterOff'`,
        },
      ],
      callback: async (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        if (selected === 'Master') return
        const commandOptions = { ...action.options, value: selected }

        return sendBasicCommand({ ...action, options: commandOptions })
      },
    },

    busXAudio: {
      name: 'Audio - Bus Mute',
      description: 'Mutes a Bus',
      options: [
        options.audioBusMaster,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'BusXAudio',
          choices: [
            { id: 'BusXAudio', label: 'Toggle Bus Mute' },
            { id: 'BusXAudioOn', label: 'Set Bus Audio ON' },
            { id: 'BusXAudioOff', label: 'Set Bus Audio OFF' },
          ],
          expressionDescription: `Valid Values: 'BusXAudio', 'BusXAudioOn', 'BusXAudioOff'`,
        },
      ],
      callback: async (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        let command = 'FUNCTION '

        if (selected === 'Master') {
          if (action.options.functionID == 'BusXAudio') command += 'MasterAudio'
          if (action.options.functionID == 'BusXAudioOn') command += 'MasterAudioON'
          if (action.options.functionID == 'BusXAudioOff') command += 'MasterAudioOFF'
        } else {
          command += `${action.options.functionID} Value=${selected}`
        }

        return instance.tcp.sendCommand(command)
      },
    },

    busXAudioPlugin: {
      name: 'Audio - Bus Plugins',
      description: 'Set Audio Plugins on a Bus',
      options: [
        options.audioBusMaster,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'BusXAudioPluginOnOff',
          choices: [
            { id: 'BusXAudioPluginOnOff', label: 'Toggle Plugin' },
            { id: 'BusXAudioPluginOn', label: 'Set Plugin ON' },
            { id: 'BusXAudioPluginOff', label: 'Set Plugin OFF' },
            { id: 'BusXAudioPluginShow', label: 'Show Audio Plugin Editor' },
          ],
          expressionDescription: `Valid Values: 'BusXAudioPluginOnOff', 'BusXAudioPluginOn', 'BusXAudioPluginOff', 'BusXAudioPluginShow'`,
        },
        {
          type: 'number',
          label: 'Plugin',
          id: 'plugin',
          default: 1,
          min: 1,
          max: 1000,
          step: 1,
        },
      ],
      callback: async (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        let command = 'FUNCTION '

        if (selected === 'Master') {
          if (action.options.functionID == 'BusXAudioPluginOnOff') command += `MasterAudioPluginOnOff Value=${action.options.plugin}`
          if (action.options.functionID == 'BusXAudioPluginOn') command += `MasterAudioPluginOn Value=${action.options.plugin}`
          if (action.options.functionID == 'BusXAudioPluginOff') command += `MasterAudioPluginOff Value=${action.options.plugin}`
          if (action.options.functionID == 'BusXAudioPluginShow') command += `MasterAudioPluginShow Value=${action.options.plugin}`
        } else {
          command += `${action.options.functionID} Value=${selected},${action.options.plugin}`
        }

        return instance.tcp.sendCommand(command)
      },
    },

    audio: {
      name: 'Audio - Input Mute',
      description: "Mutes an Input's audio",
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'Audio',
          choices: [
            { id: 'Audio', label: 'Toggle input Audio' },
            { id: 'AudioOn', label: 'Set input Audio ON' },
            { id: 'AudioOff', label: 'Set input Audio OFF' },
          ],
          expressionDescription: `Valid Values: 'Audio', 'AudioOn', 'AudioOff'`,
        },
      ],
      callback: sendBasicCommand,
    },

    audioAuto: {
      name: 'Audio - Input Audio Auto',
      description: "Sets an Input's auto toggle audio when transitioned in/out",
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'AudioAuto',
          choices: [
            { id: 'AudioAuto', label: 'Toggle input Audio Auto' },
            { id: 'AudioAutoOn', label: 'Set input Audio Auto ON' },
            { id: 'AudioAutoOff', label: 'Set input Audio Auto OFF' },
          ],
          expressionDescription: `Valid Values: 'AudioAuto', 'AudioAutoOn', 'AudioAutoOff'`,
        },
      ],
      callback: sendBasicCommand,
    },

    busXSolo: {
      name: 'Audio - Bus Solo',
      description: 'Solos a specified Bus',
      options: [
        options.audioBus,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'BusXSolo',
          choices: [
            { id: 'BusXSolo', label: 'Toggle' },
            { id: 'BusXSoloOn', label: 'On' },
            { id: 'BusXSoloOff', label: 'Off' },
          ],
          expressionDescription: `Valid Values: 'BusXSolo', 'BusXSoloOn', 'BusXSoloOff'`,
        },
      ],
      callback: async (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        if (selected === 'Master') return
        const commandOptions = { ...action.options, value: selected }

        return sendBasicCommand({ ...action, options: commandOptions })
      },
    },

    solo: {
      name: 'Audio - Input Solo',
      description: 'Solos a specified Input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'Solo',
          choices: [
            { id: 'Solo', label: 'Toggle' },
            { id: 'SoloOn', label: 'On' },
            { id: 'SoloOff', label: 'Off' },
          ],
          expressionDescription: `Valid Values: 'Solo', 'SoloOn', 'SoloOff'`,
        },
      ],
      callback: sendBasicCommand,
    },

    setInputVolume: {
      name: 'Audio - Set Input Volume',
      description: "Sets an Input's Volume",
      options: [
        options.input,
        options.adjustment,
        {
          type: 'textinput',
          label: 'Volume',
          description: 'Whole numbers from 0 to 100',
          id: 'amount',
          default: '100',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const selected = action.options.input
        const amount = parseFloat(action.options.amount)
        const input = await instance.data.getInput(selected)

        if (input === null || input.volume === undefined) return

        let target = amount

        if (action.options.adjustment === 'Increase') {
          target = volumeToLinear(input.volume) + amount
          if (target > 100) target = 100
        } else if (action.options.adjustment === 'Decrease') {
          target = volumeToLinear(input.volume) - amount
          if (target < 0) target = 0
        }

        target = Math.round(target)

        if (isNaN(target)) return

        return instance.tcp.sendCommand(`FUNCTION SetVolume input=${input.key}&Value=${target}`)
      },
    },

    setBusVolumeFade: {
      name: 'Audio - Fade Bus Volume',
      description: 'Requires vMix 28+',
      options: [
        options.audioBusMaster,
        {
          type: 'textinput',
          label: 'Fade to volume (Whole number 0 to 100)',
          id: 'fadeVol',
          default: '0',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Fade time in ms',
          id: 'fadeTime',
          default: '2000',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        const fadeVol = action.options.fadeVol
        const fadeTime = action.options.fadeTime

        const shortcut = selected === 'Master' ? `SetMasterVolumeFade` : `SetBus${selected}VolumeFade`

        return instance.tcp.sendCommand(`FUNCTION ${shortcut} value=${fadeVol},${fadeTime}`)
      },
    },

    setVolumeFade: {
      name: 'Audio - Fade Input Volume',
      description: "Fades an Input's Volume",
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Fade to volume',
          description: 'Whole number from 0 to 100',
          id: 'fadeMin',
          default: '0',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Fade time in ms',
          id: 'fadeTime',
          default: '2000',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const input = action.options.input
        const fadeMin = action.options.fadeMin
        const fadeTime = action.options.fadeTime

        return instance.tcp.sendCommand(`FUNCTION SetVolumeFade Value=${fadeMin},${fadeTime}&input=${encodeURIComponent(input)}`)
      },
    },

    setBusVolume: {
      name: 'Audio - Set Bus Volume',
      description: 'Sets Bus Volume',
      options: [
        options.audioBusMasterHeadphones,
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          description: 'Whole number from 0 to 100',
          id: 'amount',
          default: '100',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        const amount = parseFloat(action.options.amount)
        let command = `Set${selected === 'Master' ? '' : 'Bus'}${selected}Volume`
        if (selected === 'Headphones') command = 'SetHeadphonesVolume'

        const bus = instance.data.getAudioBus(selected !== 'Headphones' ? selected : 'Master')
        if (bus === null) return
        const currentVolume = selected !== 'Headphones' ? bus.volume : bus.headphonesVolume
        if (currentVolume === undefined) return

        let target = amount

        if (action.options.adjustment === 'Increase') {
          target = volumeToLinear(currentVolume) + amount
          if (target > 100) target = 100
        } else if (action.options.adjustment === 'Decrease') {
          target = volumeToLinear(currentVolume) - amount
          if (target < 0) target = 0
        }

        target = Math.round(target)

        if (isNaN(target)) return

        return instance.tcp.sendCommand(`FUNCTION ${command} Value=${target}`)
      },
    },

    audioPlugin: {
      name: 'Audio - Audio Plugin On/Off/Toggle/Show On Input',
      description: 'Changes the state of an Audio Plugin on an Input',
      options: [
        options.input,
        {
          type: 'number',
          label: 'Plugin Number',
          description: '1 to 1000',
          id: 'value',
          default: 1,
          min: 1,
          max: 1000,
        },
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'AudioPluginOnOff',
          choices: [
            { id: 'AudioPluginOnOff', label: 'Toggle' },
            { id: 'AudioPluginOn', label: 'On' },
            { id: 'AudioPluginOff', label: 'Off' },
            { id: 'AudioPluginShow', label: 'Show' },
          ],
          expressionDescription: `Valid Values: 'AudioPluginOnOff', 'AudioPluginOn', 'AudioPluginOff', 'AudioPluginShow'`,
        },
      ],
      callback: sendBasicCommand,
    },

    audioChannelMatrixApplyPreset: {
      name: 'Audio - Channel Matrix Apply Preset',
      description: 'Apply preset to channel matrix',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Preset Name',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    setVolumeBusMixer: {
      name: 'Audio - Set Volume Input Bus Mixer',
      description: 'Sets the volume being sent by an Input to a specific Bus',
      options: [
        options.input,
        options.audioBusMaster,
        {
          type: 'number',
          label: 'Value',
          id: 'amount',
          default: 100,
          min: 0,
          max: 100,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)
        let bus: string = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        if (bus === 'Master') bus = 'M'

        if (input === null) return

        return instance.tcp.sendCommand(`FUNCTION SetVolumeBusMixer Input=${input.key}&Value=${action.options.value},${action.options.amount}`)
      },
    },

    setVolumeChannel: {
      name: 'Audio - Set Input separate mono Channel Volume',
      description: 'Sets the volume of Channel 1 or 2 on a separate mono input',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Channel (1 or 2)',
          id: 'channel',
          default: '1',
          useVariables: true,
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          id: 'amount',
          default: '100',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const selected = action.options.input
        const amount = parseFloat(action.options.amount)
        const channel = parseInt(action.options.channel)
        const input = await instance.data.getInput(selected)

        if (input === null || isNaN(amount) || isNaN(channel) || input.volumeF1 === undefined || input.volumeF2 === undefined) return

        const currentValue = channel === 1 ? Math.round(volumeToLinear(input.volumeF1 * 100)) : Math.round(volumeToLinear(input.volumeF2 * 100))
        let newValue = amount

        if (action.options.adjustment !== 'Set') {
          if (action.options.adjustment === 'Increase') {
            newValue = currentValue + amount
          } else {
            newValue = currentValue - amount
          }
        }

        if (newValue > 100) newValue = 100
        if (newValue < 0) newValue = 0

        return instance.tcp.sendCommand(`FUNCTION ${channel === 1 ? 'SetVolumeChannel1' : 'SetVolumeChannel2'} Input=${input.key}&Value=${newValue}`)
      },
    },

    setVolumeChannelMixer: {
      name: 'Audio - Set Input Channel Volume',
      description: "Set Volume of an Input's sub channel",
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Channel',
          description: '1 to 16',
          id: 'channel',
          default: '1',
          useVariables: true,
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          description: '0 to 100',
          id: 'amount',
          default: '100',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)
        const amount = parseFloat(action.options.amount)
        const channel = parseInt(action.options.channel)

        if (input === null || input.volume === undefined || isNaN(amount) || isNaN(channel)) return

        let currentValue = instance.data.channelMixer[input.key]?.find((audioChannel) => audioChannel.channel === channel)?.volume
        if (currentValue === undefined) currentValue = 1
        currentValue = Math.round(volumeToLinear(currentValue * 100))
        let newValue = amount

        if (action.options.adjustment !== 'Set') {
          if (action.options.adjustment === 'Increase') {
            newValue = currentValue + amount
          } else {
            newValue = currentValue - amount
          }
        }

        if (newValue > 100) newValue = 100
        if (newValue < 0) newValue = 0

        return instance.tcp.sendCommand(`FUNCTION SetVolumeChannelMixer Input=${input.key}&Value=${channel},${newValue}`)
      },
    },

    setBalance: {
      name: 'Audio - Set Input Balance',
      description: 'Adjusts the balance on an Input',
      options: [
        options.input,
        options.adjustment,
        {
          type: 'number',
          label: 'Value',
          description: 'Valid Values: -1 to 1',
          id: 'amount',
          default: 0,
          min: -1,
          max: 1,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)
        const amount = action.options.amount
        let newValue = amount

        if (input === null) return

        if (action.options.adjustment !== 'Set') {
          if (input.balance === undefined) {
            return instance.log('warn', `Unable to adjust balance of input ${action.options.input}, input does not have a balance value`)
          }

          if (action.options.adjustment === 'Increase') {
            newValue = Math.min(input.balance + amount, 1)
          } else {
            newValue = Math.max(input.balance - amount, -1)
          }
        }

        return instance.tcp.sendCommand(`FUNCTION SetBalance Input=${input.key}&Value=${newValue.toFixed(2)}`)
      },
    },

    setGain: {
      name: 'Audio - Set Input Gain',
      description: 'Sets an Inputs Gain on both channels or individually',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Channel',
          id: 'channel',
          default: 'Both',
          description: 'Channel 2 only supports Set due to vMix limitations',
          choices: [
            { id: 'Both', label: 'Both' },
            { id: '1', label: '1' },
            { id: '2', label: '2' },
          ],
          expressionDescription: `Valid Values: 'Both', '1', '2'`,
        },
        options.adjustment,
        {
          type: 'number',
          label: 'Value (dB)',
          description: 'Valid Values: 0 to 24',
          id: 'amount',
          default: 0,
          min: 0,
          max: 24,
          step: 1,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)
        const amount = action.options.amount
        let newValue = amount
        let type = 'SetGain'
        if (action.options.channel === '1') type = 'SetGainChannel1'
        if (action.options.channel === '2') type = 'SetGainChannel2'

        if (input === null) return

        if (action.options.adjustment !== 'Set') {
          if (type === 'SetGainChannel2') {
            return instance.log('warn', `Unable to ${action.options.adjustment} Channel 2, vMix only provides data on Channel 1 Gain`)
          }

          if (input.gain === undefined) {
            return instance.log('warn', `Unable to adjust gain of input ${action.options.input}, input does not have a gain value`)
          }

          if (action.options.adjustment === 'Increase') {
            newValue = Math.min(input.gain + amount, 24)
          } else {
            newValue = Math.max(input.gain - amount, 0)
          }
        }

        return instance.tcp.sendCommand(`FUNCTION ${type} Input=${input.key}&Value=${Math.round(newValue)}`)
      },
    },

    soloPFL: {
      name: 'Audio - Set AFL/PFL mode on an input',
      description: 'Set After-Fader Listen or Pre-Fade Listen when soloing an INput',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Channel',
          id: 'functionID',
          default: 'SoloPFL',
          choices: [
            { id: 'SoloPFL', label: 'Toggle AFL/PFL' },
            { id: 'SoloPFLOn', label: 'PFL On' },
            { id: 'SoloPFLOff', label: 'PFL Off' },
          ],
          expressionDescription: `Valid Values: 'SoloPFL', 'SoloPFLOn', 'SoloPFLOff'`,
        },
      ],
      callback: sendBasicCommand,
    },

    soloAllOff: {
      name: 'Audio - Solo All Off',
      description: 'Disables Solo on all Busses and Inputs',
      options: [],
      callback: sendBasicCommand,
    },

    audioMixerShowHide: {
      name: 'Audio - Show / Hide Audio Mixer',
      description: 'Shows or Hides the Audio Mixer window',
      options: [],
      callback: sendBasicCommand,
    },
  }
}

export const vMixAudioFunctions: ActionFunctionsList<AudioActionsSchema> = {
  audioBus: ['AudioBus', 'AudioBusOn', 'AudioBusOff'],
  busXSendToMaster: ['BusXSendToMaster', 'BusXSendToMasterOn', 'BusXSendToMasterOff'],
  busXAudio: [
    'MasterAudio',
    'MasterAudioOn',
    'BusAAudio',
    'BusAAudioOn',
    'BusAAudioOff',
    'BusBAudio',
    'BusBAudioOn',
    'BusBAudioOff',
    'MasterAudioOff',
    'BusXAudio',
    'BusXAudioOn',
    'BusXAudioOff',
  ],
  busXAudioPlugin: [
    'BusAAudioPluginOnOff',
    'BusAAudioPluginOn',
    'BusAAudioPluginOff',
    'BusAAudioPluginShow',
    'BusBAudioPluginOnOff',
    'BusBAudioPluginOn',
    'BusBAudioPluginOff',
    'BusBAudioPluginShow',
    'BusXAudioPluginOnOff',
    'BusXAudioPluginOn',
    'BusXAudioPluginOff',
    'BusXAudioPluginShow',
    'MasterAudioPluginOnOff',
    'MasterAudioPluginOn',
    'MasterAudioPluginOff',
    'MasterAudioPluginShow',
  ],
  audio: ['Audio', 'AudioOn', 'AudioOff'],
  audioAuto: ['AudioAuto', 'AudioAutoOn', 'AudioAutoOff'],
  busXSolo: ['BusXSolo', 'BusXSoloOn', 'BusXSoloOff'],
  solo: ['Solo', 'SoloOn', 'SoloOff'],
  setInputVolume: ['SetVolume'],
  setBusVolumeFade: [
    'SetMasterVolumeFade',
    'SetBusAVolumeFade',
    'SetBusBVolumeFade',
    'SetBusCVolumeFade',
    'SetBusDVolumeFade',
    'SetBusEVolumeFade',
    'SetBusFVolumeFade',
    'SetBusGVolumeFade',
  ],
  setVolumeFade: ['SetVolumeFade'],
  setBusVolume: ['SetHeadphonesVolume', 'SetMasterVolume', 'SetBusAVolume', 'SetBusBVolume', 'SetBusCVolume', 'SetBusDVolume', 'SetBusEVolume', 'SetBusFVolume', 'SetBusGVolume'],
  audioPlugin: ['AudioPluginOnOff', 'AudioPluginOn', 'AudioPluginOff', 'AudioPluginShow'],
  audioChannelMatrixApplyPreset: ['AudioChannelMatrixApplyPreset'],
  setVolumeBusMixer: [
    'SetVolumeBusMixer',
    'SetVolumeBusMixerA',
    'SetVolumeBusMixerB',
    'SetVolumeBusMixerC',
    'SetVolumeBusMixerD',
    'SetVolumeBusMixerE',
    'SetVolumeBusMixerF',
    'SetVolumeBusMixerG',
    'SetVolumeBusMixerM',
  ],
  setVolumeChannel: ['SetVolumeChannel1', 'SetVolumeChannel2'],
  setVolumeChannelMixer: [
    'SetVolumeChannelMixer',
    'SetVolumeChannelMixer1',
    'SetVolumeChannelMixer2',
    'SetVolumeChannelMixer3',
    'SetVolumeChannelMixer4',
    'SetVolumeChannelMixer5',
    'SetVolumeChannelMixer6',
    'SetVolumeChannelMixer7',
    'SetVolumeChannelMixer8',
    'SetVolumeChannelMixer9',
    'SetVolumeChannelMixer10',
    'SetVolumeChannelMixer11',
    'SetVolumeChannelMixer12',
    'SetVolumeChannelMixer13',
    'SetVolumeChannelMixer14',
    'SetVolumeChannelMixer15',
    'SetVolumeChannelMixer16',
  ],
  setBalance: ['SetBalance'],
  setGain: ['SetGain', 'SetGainChannel1', 'SetGainChannel2'],
  soloPFL: ['SoloPFL', 'SoloPFLOn', 'SoloPFLOff'],
  soloAllOff: ['SoloAllOff'],
  audioMixerShowHide: ['AudioMixerShowHide'],
}
