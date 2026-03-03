import type { AudioBusses } from './data'
import { type LoadAudioPresetOptions } from './actions/audioPresetActions'
import type VMixInstance from './index'
import { volumeToLinear } from './utils'

type BusPreset = {
  bus: 'master' | 'busA' | 'busB' | 'busC' | 'busD' | 'busE' | 'busF' | 'busG'
  volume: number
  muted: boolean
  headphonesVolume?: number
  solo: boolean
  sendToMaster: boolean
}

type InputPreset = {
  id: string | number
  volume: number
  audioAuto: boolean
  muted: boolean
  solo: boolean
  audioBusses: AudioBusses
  channelMixer: Array<null | string | number>
}

export type AudioPreset = {
  name: string
  busses: BusPreset[]
  inputs: InputPreset[]
}

type SavePresetSettings = {
  name: string
  includeBusses: boolean
  includeInputs: boolean
  inputReference: 'title' | 'number' | 'key'
  inputFilter: string
}

export class AudioPresets {
  instance: VMixInstance
  presets: Record<string, AudioPreset> = {}

  constructor(instance: VMixInstance) {
    this.instance = instance
  }

  loadPreset = async (data: AudioPreset, settings: LoadAudioPresetOptions, checkStatus: boolean = false): Promise<string[] | void> => {
    const commandList: string[] = []

    if (settings.busses.length > 0) {
      const presetBusses = data.busses.filter((presetBus) => {
        if (!settings.busses.includes('busFilter') || settings.busFilter.length === 0) return true

        const filter = settings.busFilter.split(',').map((filter) => filter.trim().toLowerCase())
        let id = presetBus.bus.toLowerCase()
        if (id !== 'master') id = id.charAt(3)

        return filter.includes(id)
      })

      presetBusses.forEach((presetBus) => {
        let id = presetBus.bus.toLowerCase()
        if (id !== 'master') id = id.charAt(3)

        const bus = this.instance.data.getAudioBus(presetBus.bus)
        if (!bus) return

        if (settings.busses.includes('busRouting')) {
          if (bus.bus !== 'master' && bus?.sendToMaster !== presetBus.sendToMaster) {
            const busID = presetBus.bus.split('bus')[1]
            commandList.push(`FUNCTION BusXSendToMaster Value=${busID}`)
          }
        }

        if (settings.busses.includes('busVolumes')) {
          if (bus.bus === 'master' && presetBus.headphonesVolume !== undefined && bus.headphonesVolume !== presetBus.headphonesVolume) {
            const volume = Math.round(presetBus.headphonesVolume)
            commandList.push(`FUNCTION SetHeadphonesVolume Value=${volume}`)
          }

          if (bus.volume !== presetBus.volume) {
            const command = id === 'master' ? `SetMasterVolume` : `SetBus${id.toUpperCase()}Volume`
            const fade = parseFloat(settings.busFade)

            const volume = Math.round(volumeToLinear(presetBus.volume))

            if (!isNaN(fade) && fade > 0) {
              commandList.push(`FUNCTION ${command}Fade Value=${volume},${fade}`)
            } else {
              commandList.push(`FUNCTION ${command} Value=${volume}`)
            }
          }
        }

        if (settings.busses.includes('busMute')) {
          if (bus.muted !== presetBus.muted) commandList.push(`FUNCTION BusXAudio Value=${id === 'master' ? 'M' : id.toUpperCase()}`)
        }

        if (settings.busses.includes('busSolo')) {
          if (bus.solo !== presetBus.solo) commandList.push(`FUNCTION BusXSolo Value=${id === 'master' ? 'M' : id.toUpperCase()}`)
        }
      })
    }

    if (settings.inputs.length > 0) {
      const presetInputs = data.inputs.filter((presetInput) => {
        if (!settings.inputs.includes('inputFilter') || settings.inputFilter.length === 0) return true

        const filter = settings.busFilter.split(',').map((filter) => filter.trim().toLowerCase())

        return filter.includes(presetInput.id + '')
      })

      for (const presetInput of presetInputs) {
        const input = await this.instance.data.getInput(presetInput.id)

        if (!input) {
          return
        }

        if (settings.inputs.includes('inputRouting') && input.audioBusses && presetInput.audioBusses) {
          Object.keys(presetInput.audioBusses).forEach((bus) => {
            if (input.audioBusses && input.audioBusses[bus] !== presetInput.audioBusses[bus]) commandList.push(`FUNCTION AudioBus Input=${input.key}&Value=${bus}`)
          })
        }

        if (presetInput.volume !== undefined && settings.inputs.includes('inputVolumes') && input.volume !== presetInput.volume) {
          const fade = parseFloat(settings.busFade)
          const volume = Math.round(volumeToLinear(presetInput.volume))

          if (!isNaN(fade) && fade > 0) {
            commandList.push(`FUNCTION SetVolumeFade Input=${input.key}&Value=${volume},${fade}`)
          } else {
            commandList.push(`FUNCTION SetVolume Input=${input.key}&Value=${volume}`)
          }
        }

        if (presetInput.muted !== undefined && settings.inputs.includes('inputMute') && input.muted !== presetInput.muted) {
          commandList.push(`FUNCTION Audio Input=${input.key}`)
        }

        if (presetInput.solo !== undefined && settings.inputs.includes('inputSolo') && input.solo !== presetInput.solo) {
          commandList.push(`FUNCTION Solo Input=${input.key}`)
        }

        if (settings.inputs.includes('inputAudioAuto') && input.audioAuto !== presetInput.audioAuto) {
          commandList.push(`FUNCTION AudioAuto Input=${input.key}`)
        }

        if (settings.inputs.includes('inputChannelMixer')) {
          const channelMixer = this.instance.data.channelMixer[input.key]

          if (channelMixer) {
            channelMixer.forEach((channel) => {
              if (channel.volume !== presetInput.channelMixer[channel.channel]) {
                let value = presetInput.channelMixer[channel.channel]
                if (typeof value === 'number') {
                  value = Math.round(Math.pow(value, 0.25) * 100)
                  commandList.push(`FUNCTION SetVolumeChannelMixer${channel.channel} Input=${input.key}&Value=${value}`)
                }
              }
            })
          }
        }
      }
    }

    if (checkStatus) {
      return commandList
    }

    const commandDelay = async (): Promise<void> => {
      const delay = parseInt(settings.commandDelay)

      if (isNaN(delay) || delay === 0) return

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, delay)
      })
    }

    for (const command of commandList) {
      await this.instance.tcp?.sendCommand(command)
      await commandDelay()
    }

    this.instance.log('info', `Loading Audio Preset: ${data.name}`)

    return
  }

  deletePreset = async (name: string): Promise<void> => {
    this.instance.log('info', `Deleting preset: ${name}`)
    delete this.presets[name]

    this.instance.config.audioPresets = this.presets
    this.instance.saveConfig(this.instance.config)
    this.instance.checkFeedbacks('audioPresetActive')
  }

  savePreset = async (settings: SavePresetSettings): Promise<void> => {
    const newDefinition = this.presets[settings.name] !== undefined

    const newPreset: AudioPreset = {
      name: settings.name,
      busses: [],
      inputs: [],
    }

    if (settings.includeBusses) {
      newPreset.busses = this.instance.data.audio.map((bus) => {
        return {
          bus: bus.bus,
          volume: bus.volume,
          muted: bus.muted,
          headphonesVolume: bus.headphonesVolume,
          solo: bus.solo,
          sendToMaster: bus.sendToMaster,
        }
      })
    }

    if (settings.includeInputs) {
      const audioInputs = this.instance.data.inputs
        .filter((input) => {
          if (settings.inputFilter === '') return true

          const filters = settings.inputFilter.split(',')
          let hit = false

          filters.forEach((filter) => {
            if (filter === input.title || filter === input.shortTitle || filter === input.key || filter === input.number.toString()) hit = true
          })

          return hit
        })
        .filter((input) => input.volume !== undefined && input.muted !== undefined)
        .map((input) => {
          let id: string | number = input.key
          if (settings.inputReference === 'title') id = input.title
          if (settings.inputReference === 'number') id = input.number

          const inputData = {
            id,
            volume: input.volume as number,
            audioAuto: input.audioAuto as boolean,
            muted: input.muted as boolean,
            solo: input.solo as boolean,
            audioBusses: input.audioBusses as AudioBusses,
            channelMixer: [],
          } as InputPreset

          const channelMixer = this.instance.data.channelMixer[input.key] || []

          channelMixer.forEach((channel) => {
            inputData.channelMixer[channel.channel] = channel.volume
          })

          return inputData
        })

      newPreset.inputs = audioInputs
    }

    this.presets[newPreset.name] = newPreset

    this.instance.log('info', `Saving preset: ${newPreset.name}`)
    this.instance.config.audioPresets = this.presets
    this.instance.saveConfig(this.instance.config)

    if (newDefinition) await this.instance.variables?.updateDefinitions()
    this.instance.checkFeedbacks('audioPresetActive')
    return
  }
}
