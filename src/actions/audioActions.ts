import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { type AudioBusOption, type AudioBusMasterOption, type AudioBusMasterHeadphonesOption, type EmptyOptions, options, volumeToLinear } from '../utils'
import type VMixInstance from '../index'

type AudioBusOptions = {
  input: string
  value: AudioBusMasterOption
  functionID: 'AudioBus' | 'AudioBusOn' | 'AudioBusOff'
}

type BusXSendToMasterOptions = {
  value: AudioBusOption
}

type BusXAudioOptions = {
  value: AudioBusMasterOption
  functionID: 'BusXAudio' | 'BusXAudioOn' | 'BusXAudioOff'
}

type AudioOptions = {
  input: string
  functionID: 'Audio' | 'AudioOn' | 'AudioOff'
}

type AudioAutoOptions = {
  input: string
  functionID: 'AudioAuto' | 'AudioAutoOn' | 'AudioAutoOff'
}

type BusXSoloOptions = {
  value: AudioBusOption
  functionID: 'BusXSolo' | 'BusXSoloOn' | 'BusXSoloOff'
}

type SoloOptions = {
  input: string
  functionID: 'Solo' | 'SoloOn' | 'SoloOff'
}

type SetInputVolumeOptions = {
  input: string
  adjustment: 'Set' | 'Increase' | 'Decrease'
  amount: string
}

type SetBusVolumeFadeOptions = {
  value: AudioBusMasterOption
  fadeVol: string
  fadeTime: string
}

type SetVolumeFadeOptions = {
  fadeMin: string
  fadeTime: string
  input: string
}

type SetBusVolumeOptions = {
  value: AudioBusMasterHeadphonesOption
  adjustment: 'Set' | 'Increase' | 'Decrease'
  amount: string
}

type AudioPluginOptions = {
  input: string
  value: number
  functionID: 'AudioPluginOnOff' | 'AudioPluginOn' | 'AudioPluginOff' | 'AudioPluginShow'
}

type AudioChannelMatrixApplyPresetOptions = {
  input: string
  value: string
}

type SetVolumeChannelOptions = {
  input: string
  channel: string
  adjustment: 'Set' | 'Increase' | 'Decrease'
  amount: string
}

type SetVolumeChannelMixerOptions = {
  input: string
  channel: string
  adjustment: 'Set' | 'Increase' | 'Decrease'
  amount: string
}

type SoloAllOffOptions = EmptyOptions

type AudioMixerShowHideOptions = EmptyOptions

type AudioBusCallback = ActionCallback<'audioBus', AudioBusOptions>
type BusXSendToMasterCallback = ActionCallback<'busXSendToMaster', BusXSendToMasterOptions>
type BusXAudioCallback = ActionCallback<'busXAudio', BusXAudioOptions>
type AudioCallback = ActionCallback<'audio', AudioOptions>
type AudioAutoCallback = ActionCallback<'audioAuto', AudioAutoOptions>
type BusXSoloCallback = ActionCallback<'busXSolo', BusXSoloOptions>
type SoloCallback = ActionCallback<'solo', SoloOptions>
type SetInputVolumeCallback = ActionCallback<'setInputVolume', SetInputVolumeOptions>
type SetBusVolumeFadeCallback = ActionCallback<'setBusVolumeFade', SetBusVolumeFadeOptions>
type SetVolumeFadeCallback = ActionCallback<'setVolumeFade', SetVolumeFadeOptions>
type SetBusVolumeCallback = ActionCallback<'setBusVolume', SetBusVolumeOptions>
type AudioPluginCallback = ActionCallback<'audioPlugin', AudioPluginOptions>
type AudioChannelMatrixApplyPresetCallback = ActionCallback<'audioChannelMatrixApplyPreset', AudioChannelMatrixApplyPresetOptions>
type SetVolumeChannelCallback = ActionCallback<'setVolumeChannel', SetVolumeChannelOptions>
type SetVolumeChannelMixerCallback = ActionCallback<'setVolumeChannelMixer', SetVolumeChannelMixerOptions>
type SoloAllOffCallback = ActionCallback<'soloAllOff', SoloAllOffOptions>
type AudioMixerShowHideCallback = ActionCallback<'audioMixerShowHide', AudioMixerShowHideOptions>

export interface AudioActions {
  audioBus: VMixAction<AudioBusCallback>
  busXSendToMaster: VMixAction<BusXSendToMasterCallback>
  busXAudio: VMixAction<BusXAudioCallback>
  audio: VMixAction<AudioCallback>
  audioAuto: VMixAction<AudioAutoCallback>
  busXSolo: VMixAction<BusXSoloCallback>
  solo: VMixAction<SoloCallback>
  setInputVolume: VMixAction<SetInputVolumeCallback>
  setBusVolumeFade: VMixAction<SetBusVolumeFadeCallback>
  setVolumeFade: VMixAction<SetVolumeFadeCallback>
  setBusVolume: VMixAction<SetBusVolumeCallback>
  audioPlugin: VMixAction<AudioPluginCallback>
  audioChannelMatrixApplyPreset: VMixAction<AudioChannelMatrixApplyPresetCallback>
  setVolumeChannel: VMixAction<SetVolumeChannelCallback>
  setVolumeChannelMixer: VMixAction<SetVolumeChannelMixerCallback>
  soloAllOff: VMixAction<SoloAllOffCallback>
  audioMixerShowHide: VMixAction<AudioMixerShowHideCallback>

  [key: string]: VMixAction<any>
}

export type AudioCallbacks =
  | AudioBusCallback
  | BusXSendToMasterCallback
  | BusXAudioCallback
  | AudioCallback
  | AudioAutoCallback
  | BusXSoloCallback
  | SoloCallback
  | SetInputVolumeCallback
  | SetBusVolumeFadeCallback
  | SetVolumeFadeCallback
  | SetBusVolumeCallback
  | AudioPluginCallback
  | AudioChannelMatrixApplyPresetCallback
  | SetVolumeChannelCallback
  | SetVolumeChannelMixerCallback
  | SoloAllOffCallback
  | AudioMixerShowHideCallback

export const vMixAudioActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): AudioActions => {
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
        },
      ],
      callback: async (action, context) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        const commandOptions = { ...action.options, value: selected }

        return sendBasicCommand({ ...action, options: commandOptions }, context)
      },
    },

    busXSendToMaster: {
      name: 'Audio - Route Bus to Master',
      description: 'Routes the audio from a Bus to Master',
      options: [options.audioBus],
      callback: async (action, context) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        if (selected === 'Master') return
        const commandOptions = { ...action.options, value: selected }

        return sendBasicCommand({ ...action, options: commandOptions }, context)
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

        if (instance.tcp) return instance.tcp.sendCommand(command)
        return
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
        },
      ],
      callback: async (action, context) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        if (selected === 'Master') return
        const commandOptions = { ...action.options, value: selected }

        return sendBasicCommand({ ...action, options: commandOptions }, context)
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
        },
      ],
      callback: sendBasicCommand,
    },

    setInputVolume: {
      name: 'Audio - Set Input Volume',
      description: "Sets an Input's Volume (Note: vMix Volume only supports whole numbers from 0 to 100)",
      options: [
        options.input,
        options.adjustment,
        {
          type: 'textinput',
          label: 'Volume',
          id: 'amount',
          default: '100',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const amount = parseFloat((await instance.parseOption(action.options.amount, context))[instance.buttonShift.state])
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

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION SetVolume input=${input.key}&Value=${target}`)
        }
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
          useVariables: { local: true },
        },
        {
          type: 'textinput',
          label: 'Fade time in ms',
          id: 'fadeTime',
          default: '2000',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        const fadeVol = (await instance.parseOption(action.options.fadeVol, context))[instance.buttonShift.state]
        const fadeTime = (await instance.parseOption(action.options.fadeTime, context))[instance.buttonShift.state]

        const shortcut = selected === 'Master' ? `SetMasterVolumeFade` : `SetBus${selected}VolumeFade`

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${shortcut} value=${fadeVol},${fadeTime}`)
        }
      },
    },

    setVolumeFade: {
      name: 'Audio - Fade Input Volume',
      description: "Fades an Input's Volume (Note: vMix Volume only supports whole numbers from 0 to 100)",
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Fade to volume',
          id: 'fadeMin',
          default: '0',
          useVariables: { local: true },
        },
        {
          type: 'textinput',
          label: 'Fade time in ms',
          id: 'fadeTime',
          default: '2000',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const fadeMin = (await instance.parseOption(action.options.fadeMin, context))[instance.buttonShift.state]
        const fadeTime = (await instance.parseOption(action.options.fadeTime, context))[instance.buttonShift.state]

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetVolumeFade Value=${fadeMin},${fadeTime}&input=${encodeURIComponent(input)}`)
      },
    },

    setBusVolume: {
      name: 'Audio - Set Bus Volume',
      description: 'Sets Bus Volume (Note: vMix Volume only supports whole numbers from 0 to 100)',
      options: [
        options.audioBusMasterHeadphones,
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          id: 'amount',
          default: '100',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        const amount = parseFloat((await instance.parseOption(action.options.amount, context))[instance.buttonShift.state])
        let command = `Set${selected === 'Master' ? '' : 'Bus'}${selected}Volume`
        if (selected === 'Headphones') command = 'SetHeadphonesVolume'

        const bus = instance.data.getAudioBus(selected !== 'Headphones' ? selected : 'Master')
        if (bus === null) return
        const currentVolume = bus.volume

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

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${command} Value=${target}`)
        }
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
          useVariables: { local: true },
        },
      ],
      callback: sendBasicCommand,
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
          useVariables: { local: true },
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          id: 'amount',
          default: '100',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const amount = parseFloat((await instance.parseOption(action.options.amount, context))[instance.buttonShift.state])
        const channel = parseInt((await instance.parseOption(action.options.channel, context))[instance.buttonShift.state])
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

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${channel === 1 ? 'SetVolumeChannel1' : 'SetVolumeChannel2'} Input=${input.key}&Value=${newValue}`)
        }
      },
    },

    setVolumeChannelMixer: {
      name: 'Audio - Set Input Channel Volume',
      description: "Set Volume of an Input's sub channel",
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Channel (1 to 16)',
          id: 'channel',
          default: '1',
          useVariables: { local: true },
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          id: 'amount',
          default: '100',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const amount = parseFloat((await instance.parseOption(action.options.amount, context))[instance.buttonShift.state])
        const channel = parseInt((await instance.parseOption(action.options.channel, context))[instance.buttonShift.state])
        const input = await instance.data.getInput(selected)

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

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION SetVolumeChannelMixer Input=${input.key}&Value=${channel},${newValue}`)
        }
      },
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
