import type { CompanionFeedbackSchema } from '@companion-module/base'
import { type CompanionFeedbackDefinitions } from '@companion-module/base'
import { presets } from 'companion-module-utils'
import { type AudioBusOption, type AudioBusMasterOption, options, volumeToLinear } from '../utils.js'
import type VMixInstance from '../index.js'

export type AudioFeedbacksSchema = {
  busMute: CompanionFeedbackSchema<{
    value: AudioBusMasterOption
  }>
  busSolo: CompanionFeedbackSchema<{
    value: AudioBusOption
  }>
  busSendToMaster: CompanionFeedbackSchema<{
    value: AudioBusOption
  }>
  inputAudio: CompanionFeedbackSchema<{
    input: string
  }>
  inputAudioAuto: CompanionFeedbackSchema<{
    input: string
  }>
  inputSolo: CompanionFeedbackSchema<{
    input: string
  }>
  inputBusRouting: CompanionFeedbackSchema<{
    input: string
    value: AudioBusMasterOption
  }>
  liveBusVolume: CompanionFeedbackSchema<{
    value: AudioBusMasterOption
    colorTxt: boolean
    colorBG: boolean
    colorBase: number
    color: number
    color1: number
    color6: number
    color18: number
    color36: number
  }>
  liveInputVolume: CompanionFeedbackSchema<{
    input: string
    colorTxt: boolean
    colorBG: boolean
    colorBase: number
    color: number
    color1: number
    color6: number
    color18: number
    color36: number
  }>
  busVolumeLevel: CompanionFeedbackSchema<{
    bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Headphones'
    comparison: 'eq' | 'lt' | 'lte' | 'gt' | 'gte'
    value: number
  }>
  inputVolumeLevel: CompanionFeedbackSchema<{
    input: string
    comparison: 'eq' | 'lt' | 'lte' | 'gt' | 'gte'
    value: number
  }>
  busVolumeMeter: CompanionFeedbackSchema<{
    value: AudioBusMasterOption
  }>
  inputVolumeMeter: CompanionFeedbackSchema<{
    input: string
  }>
}

export const getAudioFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<AudioFeedbacksSchema> => {
  return {
    busMute: {
      type: 'boolean',
      name: 'Audio - Bus mute',
      description: 'Indicate if a bus is muted',
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      options: [options.audioBusMaster],
      callback: (feedback) => {
        let busID
        if (feedback.options.value === 'Selected') {
          busID = instance.routingData.bus === 'Master' ? 'master' : 'bus' + instance.routingData.bus
        } else {
          busID = feedback.options.value === 'Master' ? 'master' : 'bus' + feedback.options.value
        }

        const bus = instance.data.getAudioBus(busID)

        return bus?.muted || false
      },
    },

    busSolo: {
      type: 'boolean',
      name: 'Audio - Bus solo',
      description: 'Requires vMix v25+',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [options.audioBus],
      callback: (feedback) => {
        let busID
        if (feedback.options.value === 'Selected') {
          busID = instance.routingData.bus === 'Master' ? 'master' : 'bus' + instance.routingData.bus
        } else {
          busID = 'bus' + feedback.options.value
        }

        const bus = instance.data.getAudioBus(busID)

        return bus?.solo || false
      },
    },

    busSendToMaster: {
      type: 'boolean',
      name: 'Audio - Bus Send to Master',
      description: 'Requires vMix v27+',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [options.audioBus],
      callback: (feedback) => {
        let busID
        if (feedback.options.value === 'Selected') {
          busID = instance.routingData.bus === 'Master' ? 'master' : 'bus' + instance.routingData.bus
        } else {
          busID = 'bus' + feedback.options.value
        }

        const bus = instance.data.getAudioBus(busID)

        return bus?.sendToMaster || false
      },
    },

    inputAudio: {
      type: 'boolean',
      name: 'Audio - Input mute',
      description: 'Indicate if an input is muted or enabled',
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      options: [options.input],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        return input?.muted || false
      },
    },

    inputAudioAuto: {
      type: 'boolean',
      name: 'Audio - Input Audio Auto',
      description: 'Indicate if an input will auto enable/disable audio when transitioned to/from',
      defaultStyle: { color: 0x000000, bgcolor: 0x00ff00 },
      options: [options.input],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        return input?.audioAuto || false
      },
    },

    inputSolo: {
      type: 'boolean',
      name: 'Audio - Input solo',
      description: 'Indicate if an input is set to Solo',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [options.input],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        return input?.solo || false
      },
    },

    inputBusRouting: {
      type: 'boolean',
      name: 'Audio - Input Bus Routing',
      description: 'Indicate which busses an input will output to',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [options.input, options.audioBusMaster],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        if (feedback.options.value === 'Selected') {
          const bus = instance.routingData.bus === 'Master' ? 'M' : instance.routingData.bus
          return input?.audioBusses?.[bus] || false
        }

        const busID = feedback.options.value === 'Master' ? 'M' : feedback.options.value
        return input?.audioBusses?.[busID] || false
      },
    },

    liveBusVolume: {
      type: 'advanced',
      name: 'Audio - Bus live dB value',
      description: 'Indicate what the live dB value on a bus is',
      options: [
        options.audioBusMaster,
        {
          type: 'checkbox',
          label: 'Color Text',
          id: 'colorTxt',
          default: true,
        },
        {
          type: 'checkbox',
          label: 'Color Background',
          id: 'colorBG',
          default: false,
        },
        {
          type: 'colorpicker',
          label: 'Base Text Color',
          id: 'colorBase',
          default: 0x0ffffff,
        },
        {
          type: 'colorpicker',
          label: 'Text color above -1 dB',
          id: 'color',
          default: 0xff0000,
        },
        {
          type: 'colorpicker',
          label: 'Text color below -1 dB',
          id: 'color1',
          default: 0x0ffff00,
        },
        {
          type: 'colorpicker',
          label: 'Text color below -6 dB',
          id: 'color6',
          default: 0x00ff00,
        },
        {
          type: 'colorpicker',
          label: 'Text color below -18 dB',
          id: 'color18',
          default: 0x00c000,
        },
        {
          type: 'colorpicker',
          label: 'Text color below -36 dB',
          id: 'color36',
          default: 0x008000,
        },
      ],
      callback: (feedback) => {
        let busID
        if (feedback.options.value === 'Selected') {
          busID = instance.routingData.bus === 'Master' ? 'master' : 'bus' + instance.routingData.bus
        } else {
          busID = feedback.options.value === 'Master' ? 'master' : 'bus' + feedback.options.value
        }

        const bus = instance.data.getAudioBus(busID)

        if (bus) {
          const dBLeft = (20 * Math.log(bus.meterF1)) / Math.LN10
          const dBRight = (20 * Math.log(bus.meterF2)) / Math.LN10

          const dB = +Math.max(dBLeft, dBRight).toFixed(1)

          const color = () => {
            if (dB > -1) {
              return feedback.options.color
            } else if (dB > -6) {
              return feedback.options.color1
            } else if (dB > -18) {
              return feedback.options.color6
            } else if (dB > -36) {
              return feedback.options.color18
            }
            return feedback.options.color36
          }

          const colorFg = feedback.options.colorTxt ? color() : feedback.options.colorBase
          const colorBg = feedback.options.colorBG ? color() : undefined

          return { color: colorFg, bgcolor: colorBg }
        }

        return {}
      },
    },

    liveInputVolume: {
      type: 'advanced',
      name: 'Audio - Input live dB value',
      description: 'Indicate what the live dB value on an input is',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Color Text',
          id: 'colorTxt',
          default: true,
        },
        {
          type: 'checkbox',
          label: 'Color Background',
          id: 'colorBG',
          default: false,
        },
        {
          type: 'colorpicker',
          label: 'Base Text Color',
          id: 'colorBase',
          default: 0x0ffffff,
        },
        {
          type: 'colorpicker',
          label: 'Text color above -1 dB',
          id: 'color',
          default: 0xff0000,
        },
        {
          type: 'colorpicker',
          label: 'Text color below -1 dB',
          id: 'color1',
          default: 0x0ffff00,
        },
        {
          type: 'colorpicker',
          label: 'Text color below -6 dB',
          id: 'color6',
          default: 0x00ff00,
        },
        {
          type: 'colorpicker',
          label: 'Text color below -18 dB',
          id: 'color18',
          default: 0x00c000,
        },
        {
          type: 'colorpicker',
          label: 'Text color below -36 dB',
          id: 'color36',
          default: 0x008000,
        },
      ],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        // Detect if there is sound enabled on an input
        if (!input?.meterF1 || !input?.meterF2) {
          return {}
        }

        const dBLeft = (20 * Math.log(input.meterF1)) / Math.LN10
        const dBRight = (20 * Math.log(input.meterF2)) / Math.LN10
        const dB = +Math.max(dBLeft, dBRight).toFixed(1)

        const color = () => {
          if (dB > -1) {
            return feedback.options.color
          } else if (dB > -6) {
            return feedback.options.color1
          } else if (dB > -18) {
            return feedback.options.color6
          } else if (dB > -36) {
            return feedback.options.color18
          }
          return feedback.options.color36
        }

        const colorFg = feedback.options.colorTxt ? color() : feedback.options.colorBase
        const colorBg = feedback.options.colorBG ? color() : undefined

        return { color: colorFg, bgcolor: colorBg }
      },
    },

    busVolumeLevel: {
      type: 'boolean',
      name: 'Audio - Bus Volume',
      description: 'Indicate if an output bus fader is within a set range',
      defaultStyle: { color: 0x000000, bgcolor: 0x00ff00 },
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: 'Master',
          choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Headphones'].map((id) => ({ id, label: id })),
          expressionDescription: `Valid Values: 'Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Headphones'`,
        },
        options.comparison,
        {
          type: 'number',
          label: 'Value',
          id: 'value',
          min: 0,
          max: 100,
          default: 100,
          expressionDescription: `Valid Values: 0 to 100`,
        },
      ],
      callback: (feedback) => {
        let volume = 0

        if (feedback.options.bus === 'Headphones') {
          const bus = instance.data.audio.find((output) => output.bus === 'master')
          volume = instance.config.volumeLinear ? volumeToLinear(bus?.headphonesVolume || 0) : bus?.headphonesVolume || 0
        } else {
          const busID = feedback.options.bus === 'Master' ? 'master' : 'bus' + feedback.options.bus
          const bus = instance.data.getAudioBus(busID)
          volume = instance.config.volumeLinear ? volumeToLinear(bus?.volume || 0) : bus?.volume || 0
        }

        const volumeInRange = {
          eq: volume === feedback.options.value,
          lt: volume < feedback.options.value,
          lte: volume <= feedback.options.value,
          gt: volume > feedback.options.value,
          gte: volume >= feedback.options.value,
        }

        return volumeInRange[feedback.options.comparison]
      },
    },

    inputVolumeLevel: {
      type: 'boolean',
      name: 'Audio - Input Volume',
      description: 'Indicate if an input fader is in a set value',
      defaultStyle: { color: 0x000000, bgcolor: 0x00ff00 },
      options: [
        options.input,
        options.comparison,
        {
          type: 'number',
          label: 'Value',
          id: 'value',
          min: 0,
          max: 100,
          default: 100,
          expressionDescription: `Valid Values: 0 to 100`,
        },
      ],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        if (input?.volume === undefined) return false

        const volume = instance.config.volumeLinear ? volumeToLinear(input.volume) : input.volume

        const volumeInRange = {
          eq: volume === feedback.options.value,
          lt: volume < feedback.options.value,
          lte: volume <= feedback.options.value,
          gt: volume > feedback.options.value,
          gte: volume >= feedback.options.value,
        }

        return volumeInRange[feedback.options.comparison] || false
      },
    },

    busVolumeMeter: {
      type: 'advanced',
      name: 'Audio - Bus Volume Meters',
      description: 'Volume meters for a Bus',
      options: [options.audioBusMaster],
      callback: async (feedback) => {
        if (!feedback.image) return {}
        let id = feedback.options.value

        if (id === 'Selected') {
          id = instance.routingData.bus
          if (!id) return {}
        }
        const busID = id === 'Master' ? 'master' : 'bus' + id
        const bus = instance.data.getAudioBus(busID)

        if (!bus) return {}

        const meter = presets.meter1({
          width: feedback.image.width,
          height: feedback.image.height,
          meter1: volumeToLinear(bus.meterF1 * 100),
          meter2: volumeToLinear(bus.meterF2 * 100),
          muted: bus.muted,
        })

        return {
          imageBuffer: Buffer.from(meter).toString('base64'),
        }
      },
    },

    inputVolumeMeter: {
      type: 'advanced',
      name: 'Audio - Input Volume Meters',
      description: 'Volume meters for an input',
      options: [options.input],
      callback: async (feedback) => {
        if (!feedback.image) return {}
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        if (!input || input.meterF1 === undefined || input.meterF2 === undefined) {
          return {}
        }

        const meter = presets.meter1({
          width: feedback.image.width,
          height: feedback.image.height,
          meter1: volumeToLinear(input.meterF1 * 100),
          meter2: volumeToLinear(input.meterF2 * 100),
          muted: input.muted,
        })

        return {
          imageBuffer: Buffer.from(meter).toString('base64'),
        }
      },
    },
  }
}
