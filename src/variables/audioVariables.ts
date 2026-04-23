import type { CompanionVariableDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'
import type { AudioBus } from '../data.js'
import { AUDIOBUSSESMASTER, volumeTodB, volumeToLinear } from '../utils.js'

export type AudioVariablesSchema = {
  bus_selected: string
  bus_any_solo: string
  [key: `bus_${string}_volume`]: string
  [key: `bus_${string}_volume_db`]: string
  [key: `bus_${string}_volume_linear`]: string | number
  [key: `bus_${string}_meterf${number}`]: string
  [key: `bus_${string}_meterf${number}_avg_1s`]: string
  [key: `bus_${string}_meterf${number}_avg_3s`]: string
  [key: `bus_${string}_meterf${number}_peak_1s`]: string
  [key: `bus_${string}_meterf${number}_peak_3s`]: string
  [key: `bus_${string}_mute`]: string
  [key: `bus_${string}_solo`]: string
  [key: `bus_${string}_sendtomaster`]: string
}

export const audioDefinitions = (instance: VMixInstance): CompanionVariableDefinitions<AudioVariablesSchema> => {
  const definitions: CompanionVariableDefinitions<AudioVariablesSchema> = {
    bus_selected: { name: 'Selected Bus' },
    bus_any_solo: { name: 'Bus Any Solo' },
  }

  const busses = [...AUDIOBUSSESMASTER, 'Selected']

  if (instance.config.variablesShowAudio) {
    busses.forEach((bus) => {
      definitions[`bus_${bus.toLowerCase()}_volume`] = { name: `Bus ${bus} Volume` }
      definitions[`bus_${bus.toLowerCase()}_volume_db`] = { name: `Bus ${bus} dB` }
      definitions[`bus_${bus.toLowerCase()}_volume_linear`] = { name: `Bus ${bus} Volume Linear` }

      if (bus !== 'Headphones') {
        for (let i = 1; i < 3; i++) {
          const audioLevelID = bus === 'Master' ? 'master' : `bus${bus}`
          const audioLevel = instance.data.audioLevels.find((level) => level.key === audioLevelID)
          if (audioLevel) {
            definitions[`bus_${bus.toLowerCase()}_meterf${i}`] = { name: `Bus ${bus} MeterF${i}` }
            definitions[`bus_${bus.toLowerCase()}_meterf${i}_avg_1s`] = { name: `Bus ${bus} MeterF${i} Avg 1s` }
            definitions[`bus_${bus.toLowerCase()}_meterf${i}_avg_3s`] = { name: `Bus ${bus} MeterF${i} Avg 3s` }
            definitions[`bus_${bus.toLowerCase()}_meterf${i}_peak_1s`] = { name: `Bus ${bus} MeterF${i} Peak 1s` }
            definitions[`bus_${bus.toLowerCase()}_meterf${i}_peak_3s`] = { name: `Bus ${bus} MeterF${i} Peak 3s` }
          }
        }

        if (bus !== 'Master') {
          definitions[`bus_${bus.toLowerCase()}_mute`] = { name: `Bus ${bus} Mute` }
          definitions[`bus_${bus.toLowerCase()}_solo`] = { name: `Bus ${bus} Solo` }
          definitions[`bus_${bus.toLowerCase()}_sendtomaster`] = { name: `Bus ${bus} Send to Master` }
        }
      }
    })
  }

  return definitions
}

export const audioValues = async (instance: VMixInstance): Promise<AudioVariablesSchema> => {
  const variables: AudioVariablesSchema = {
    bus_selected: '',
    bus_any_solo: '',
  }
  const busses = [...AUDIOBUSSESMASTER, 'Selected']

  variables.bus_selected = instance.routingData.bus
  variables.bus_any_solo = instance.data.audio.some((bus) => bus.solo).toString()

  if (instance.config.variablesShowAudio) {
    busses.forEach((id) => {
      let audioBus: AudioBus | null = null

      if (id === 'Selected') {
        audioBus = instance.data.getAudioBus(instance.routingData.bus)
      } else {
        audioBus = instance.data.getAudioBus(id === 'Headphones' ? 'Master' : id)
      }

      let volume: number | string | undefined = audioBus?.[id === 'Headphones' ? 'headphonesVolume' : 'volume']
      let volumedB
      let volumeLinear
      const meterF1 = audioBus?.meterF1 ? volumeTodB(audioBus.meterF1 * 100).toFixed(1) : ''
      const meterF2 = audioBus?.meterF2 ? volumeTodB(audioBus.meterF2 * 100).toFixed(1) : ''

      if (volume !== undefined) {
        volumedB = volumeTodB(volume).toFixed(1)
        volumeLinear = Math.round(volumeToLinear(volume))
      } else {
        volume = ''
        volumedB = ''
        volumeLinear = ''
      }

      const parsedVolume = parseFloat(volume + '')
      variables[`bus_${id.toLowerCase()}_volume`] = isNaN(parsedVolume) ? '' : parsedVolume.toFixed(2)
      variables[`bus_${id.toLowerCase()}_volume_db`] = volumedB
      variables[`bus_${id.toLowerCase()}_volume_linear`] = volumeLinear

      if (id !== 'Headphones') {
        const audioLevelID = id === 'Master' ? 'master' : `bus${id}`
        const audioLevel = instance.data.audioLevels.find((level) => level.key === audioLevelID)
        if (audioLevel) {
          variables[`bus_${id.toLowerCase()}_meterf1`] = meterF1
          variables[`bus_${id.toLowerCase()}_meterf2`] = meterF2

          const audioLevelData = instance.data.getAudioLevelData(audioLevel)
          variables[`bus_${id.toLowerCase()}_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg * 100).toFixed(1)
          variables[`bus_${id.toLowerCase()}_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg * 100).toFixed(1)
          variables[`bus_${id.toLowerCase()}_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg * 100).toFixed(1)
          variables[`bus_${id.toLowerCase()}_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg * 100).toFixed(1)
          variables[`bus_${id.toLowerCase()}_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak * 100).toFixed(1)
          variables[`bus_${id.toLowerCase()}_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak * 100).toFixed(1)
          variables[`bus_${id.toLowerCase()}_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak * 100).toFixed(1)
          variables[`bus_${id.toLowerCase()}_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak * 100).toFixed(1)
        }
      }

      if (id !== 'Master' && id !== 'Headphones') {
        variables[`bus_${id.toLowerCase()}_mute`] = audioBus?.muted ? 'true' : 'false'
        variables[`bus_${id.toLowerCase()}_solo`] = audioBus?.solo ? 'true' : 'false'
        variables[`bus_${id.toLowerCase()}_sendtomaster`] = audioBus?.sendToMaster ? 'true' : 'false'
      }
    })
  }

  return variables
}
