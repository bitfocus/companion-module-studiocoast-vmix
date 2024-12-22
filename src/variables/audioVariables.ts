import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '../'
import { AudioBus } from '../data'
import { AUDIOBUSSESMASTER, volumeTodB, volumeToLinear } from '../utils'
import { InstanceVariableValue } from '../variables'

export const audioDefinitions = (_instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []
  const busses = [...AUDIOBUSSESMASTER, 'Selected']

  definitions.push(
    { name: 'Selected Bus', variableId: 'bus_selected' },
    { name: 'Bus Any Solo', variableId: 'bus_any_solo' }
  )

  busses.forEach((bus) => {
    definitions.push(
      { name: `Bus ${bus} Volume`, variableId: `bus_${bus.toLowerCase()}_volume` },
      { name: `Bus ${bus} dB`, variableId: `bus_${bus.toLowerCase()}_volume_db` },
      { name: `Bus ${bus} Volume Linear`, variableId: `bus_${bus.toLowerCase()}_volume_linear` }
    )

    if (bus !== 'Headphones') {
      for (let i = 1; i < 3; i++) {
        definitions.push(
          { name: `Bus ${bus} MeterF${i}`, variableId: `bus_${bus.toLowerCase()}_meterf${i}` },
          { name: `Bus ${bus} MeterF${i} Avg 1s`, variableId: `bus_${bus.toLowerCase()}_meterf${i}_avg_1s` },
          { name: `Bus ${bus} MeterF${i} Avg 3s`, variableId: `bus_${bus.toLowerCase()}_meterf${i}_avg_3s` },
          { name: `Bus ${bus} MeterF${i} Peak 1s`, variableId: `bus_${bus.toLowerCase()}_meterf${i}_peak_1s` },
          { name: `Bus ${bus} MeterF${i} Peak 3s`, variableId: `bus_${bus.toLowerCase()}_meterf${i}_peak_3s` }
        )
      }

      if (bus !== 'Master') {
        definitions.push(
          { name: `Bus ${bus} Mute`, variableId: `bus_${bus.toLowerCase()}_mute` },
          { name: `Bus ${bus} Solo`, variableId: `bus_${bus.toLowerCase()}_solo` },
          { name: `Bus ${bus} Send to Master`, variableId: `bus_${bus.toLowerCase()}_sendtomaster` }
        )
      }
    }
  })

  return definitions
}

export const audioValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: InstanceVariableValue = {}
  const busses = [...AUDIOBUSSESMASTER, 'Selected']

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

    variables[`bus_${id.toLowerCase()}_volume`] = parseFloat(volume + '').toFixed(2)
    variables[`bus_${id.toLowerCase()}_volume_db`] = volumedB
    variables[`bus_${id.toLowerCase()}_volume_linear`] = volumeLinear

    if (id !== 'Headphones') {
      variables[`bus_${id.toLowerCase()}_meterf1`] = meterF1
      variables[`bus_${id.toLowerCase()}_meterf2`] = meterF2
    }

    if (id !== 'Headphones') {
      const audioLevelID = id === 'Master' ? 'master' : `bus${id}`
      const audioLevel = instance.data.audioLevels.find((level) => level.key === audioLevelID)
      if (audioLevel) {
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

  variables.bus_selected = instance.routingData.bus
  variables.bus_any_solo = instance.data.audio.some((bus) => bus.solo).toString()

  return variables
}
