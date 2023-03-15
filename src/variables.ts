import VMixInstance from './'
import { CompanionVariableDefinition } from '@companion-module/base'
import { volumeTodB, volumeToLinear, formatTime, AUDIOBUSSESMASTER } from './utils'
import { Input } from './data'
import { isEqual } from 'lodash'

interface InstanceVariableValue {
  [key: string]: string | number | undefined
}

const mixId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

export class Variables {
  private readonly instance: VMixInstance
  private currentDefinitions: Set<CompanionVariableDefinition> = new Set()

  constructor(instance: VMixInstance) {
    this.instance = instance
  }

  /**
   * @param variables Object of variablenames and their values
   * @description Updates or removes variable for current instance
   */
  public readonly set = (variables: InstanceVariableValue): void => {
    const newVariables: { [variableId: string]: string | undefined } = {}

    for (const name in variables) {
      newVariables[name] = variables[name]?.toString()
    }

    this.instance.setVariableValues(newVariables)
    this.instance.checkFeedbacks('buttonText')
  }

  /**
   * @description Sets variable definitions
   */
  public readonly updateDefinitions = (): void => {
    const variables: Set<CompanionVariableDefinition> = new Set([
      // Status
      { name: 'Connected to vMix', variableId: 'connected_state' },
      { name: 'Fade To Black Active', variableId: 'ftb_active' },
      { name: 'playList Active', variableId: 'playlist_active' },
      { name: 'Fullscreen Output Active', variableId: 'fullscreen_active' },
      { name: 'External Output Active', variableId: 'external_active' },
      { name: 'MultiCorder Active', variableId: 'multicorder_active' },
      { name: 'Stream 1 Active', variableId: 'stream_1_active' },
      { name: 'Stream 2 Active', variableId: 'stream_2_active' },
      { name: 'Stream 3 Active', variableId: 'stream_3_active' },
      { name: 'Recording Active', variableId: 'recording_active' },
      { name: 'Recording Duration', variableId: 'recording_duration' },
      { name: 'Recording HH:MM:SS', variableId: 'recording_hms' },

      // Layers
      { name: 'Layer Routing Input', variableId: 'layer_routing_input' },
      { name: 'Layer Routing Layer', variableId: 'layer_routing_layer' },
    ])

      // Audio
      ;[...AUDIOBUSSESMASTER, 'Selected'].forEach((bus) => {
        variables.add({ name: `Bus ${bus} Volume`, variableId: `bus_${bus.toLowerCase()}_volume` })
        variables.add({ name: `Bus ${bus} dB`, variableId: `bus_${bus.toLowerCase()}_volume_db` })
        variables.add({ name: `Bus ${bus} Volume Linear`, variableId: `bus_${bus.toLowerCase()}_volume_linear` })
        if (bus !== 'Headphones') {
          variables.add({ name: `Bus ${bus} MeterF1`, variableId: `bus_${bus.toLowerCase()}_meterf1` })
          variables.add({ name: `Bus ${bus} MeterFz`, variableId: `bus_${bus.toLowerCase()}_meterf2` })
          variables.add({ name: `Bus ${bus} MeterF1 Avg 1s`, variableId: `bus_${bus.toLowerCase()}_meterf1_avg_1s` })
          variables.add({ name: `Bus ${bus} MeterF1 Avg 3s`, variableId: `bus_${bus.toLowerCase()}_meterf1_avg_3s` })
          variables.add({ name: `Bus ${bus} MeterF2 Avg 1s`, variableId: `bus_${bus.toLowerCase()}_meterf1_avg_1s` })
          variables.add({ name: `Bus ${bus} MeterF2 Avg 3s`, variableId: `bus_${bus.toLowerCase()}_meterf1_avg_3s` })
          variables.add({ name: `Bus ${bus} MeterF1 Peak 1s`, variableId: `bus_${bus.toLowerCase()}_meterf1_peak_1s` })
          variables.add({ name: `Bus ${bus} MeterF1 Peak 3s`, variableId: `bus_${bus.toLowerCase()}_meterf1_peak_3s` })
          variables.add({ name: `Bus ${bus} MeterF2 Peak 1s`, variableId: `bus_${bus.toLowerCase()}_meterf1_peak_1s` })
          variables.add({ name: `Bus ${bus} MeterF2 Peak 3s`, variableId: `bus_${bus.toLowerCase()}_meterf1_peak_3s` })
          if (bus !== 'Master') {
            variables.add({ name: `Bus ${bus} Mute`, variableId: `bus_${bus.toLowerCase()}_mute` })
            variables.add({ name: `Bus ${bus} Solo`, variableId: `bus_${bus.toLowerCase()}_solo` })
          }
        }
      })

      // Overlay
      ;[1, 2, 3, 4].forEach((overlay) => {
        variables.add({ name: `Overlay ${overlay} Input Short Title`, variableId: `overlay_${overlay}_input_name` })
        variables.add({ name: `Overlay ${overlay} Input Number`, variableId: `overlay_${overlay}_input` })
        variables.add({ name: `Overlay ${overlay} Active PGM`, variableId: `overlay_${overlay}_pgm` })
        variables.add({ name: `Overlay ${overlay} Active PRV`, variableId: `overlay_${overlay}_prv` })
      })

      // Mix
      ;['Preview', 'Program'].forEach((type) => {
        this.instance.data.mix.filter(mix => mix.active).forEach((mix) => {
          variables.add({ name: `Mix ${mix.number} ${type}`, variableId: `mix_${mix.number}_${type.toLowerCase()}` })
          variables.add({
            name: `Mix ${mix.number} ${type} Short Title`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_name`,
          })
          variables.add({ name: `Mix ${mix.number} ${type} GUID`, variableId: `mix_${mix.number}_${type.toLowerCase()}_guid` })

          for (let i = 1; i < 11; i++) {
            variables.add({
              name: `Mix ${mix.number} ${type} Layer ${i} Number`,
              variableId: `mix_${mix.number}_${type.toLowerCase()}_layer_${i}_number`,
            })
            variables.add({
              name: `Mix ${mix.number} ${type} Layer ${i} Name`,
              variableId: `mix_${mix.number}_${type.toLowerCase()}_layer_${i}_name`,
            })
            variables.add({
              name: `Mix ${mix.number} ${type} Layer ${i} Key`,
              variableId: `mix_${mix.number}_${type.toLowerCase()}_layer_${i}_key`,
            })
          }
        })

        variables.add({ name: 'Mix Selected', variableId: 'mix_selected' })
        variables.add({ name: `Mix Selected ${type}`, variableId: `mix_selected_${type.toLowerCase()}` })
        variables.add({ name: `Mix Selected ${type} Short Title`, variableId: `mix_selected_${type.toLowerCase()}_name` })
        variables.add({ name: `Mix Selected ${type} GUID`, variableId: `mix_selected_${type.toLowerCase()}_guid` })

        for (let i = 1; i < 11; i++) {
          variables.add({
            name: `Mix Selected ${type} Layer ${i} Number`,
            variableId: `mix_selected_${type.toLowerCase()}_layer_${i}_number`,
          })
          variables.add({
            name: `Mix Selected ${type} Layer ${i} Name`,
            variableId: `mix_selected_${type.toLowerCase()}_layer_${i}_name`,
          })
          variables.add({
            name: `Mix Selected ${type} Layer ${i} Key`,
            variableId: `mix_selected_${type.toLowerCase()}_layer_${i}_key`,
          })
        }
      })

      // Dyanmic Inputs/Values
      ;[1, 2, 3, 4].forEach((dynamic) => {
        variables.add({ name: `Dynamic Input ${dynamic}`, variableId: `dynamic_input_${dynamic}` })
        variables.add({ name: `Dynamic Value ${dynamic}`, variableId: `dynamic_value_${dynamic}` })
      })

    // Inputs
    const inputNumberVariables = new Set<CompanionVariableDefinition>()
    const inputNameVariables = new Set<CompanionVariableDefinition>()
    const inputKeyVariables = new Set<CompanionVariableDefinition>()

    this.instance.data.inputs.forEach((input) => {
      let inputName = input.shortTitle ? input.shortTitle : input.title
      inputName = inputName.replace(/[^a-z0-9-_.]+/gi, '').toLowerCase()

      const inputTypes = [input.number, inputName, input.key]

      for (const [index, type] of inputTypes.entries()) {
        const title = type === inputName ? input.shortTitle || input.title : type
        let inputSet = inputNumberVariables
        if (index === 1) inputSet = inputNameVariables
        if (index === 2) inputSet = inputKeyVariables

        inputSet.add({ name: `Input ${title} Short Title`, variableId: `input_${type}_name` })
        inputSet.add({ name: `Input ${title} GUID`, variableId: `input_${type}_guid` })
        inputSet.add({ name: `Input ${title} Type`, variableId: `input_${type}_type` })

        this.instance.data.mix.filter(mix => mix.active).forEach((mix) => {
          inputSet.add({
            name: `Input ${title} Mix ${mix.number} Tally Preview`,
            variableId: `input_${type}_mix_${mix.number}_tally_preview`,
          })
          inputSet.add({
            name: `Input ${title} Mix ${mix.number} Tally Program`,
            variableId: `input_${type}_mix_${mix.number}_tally_program`,
          })
        })

        inputSet.add({ name: `Input ${title} Muted`, variableId: `input_${type}_mute` })
        inputSet.add({ name: `Input ${title} Audio`, variableId: `input_${type}_audio` })

        if (input.duration > 1) {
          inputSet.add({ name: `Input ${title} Duration`, variableId: `input_${type}_duration` })
        }

        if (input.position !== undefined) {
          inputSet.add({ name: `Input ${title} Remaining`, variableId: `input_${type}_remaining` })
        }

        for (let i = 1; i < 11; i++) {
          inputSet.add({
            name: `Input ${title} layer ${i} Name`,
            variableId: `input_${type}_layer_${i}_name`,
          })
          inputSet.add({
            name: `Input ${title} layer ${i} Number`,
            variableId: `input_${type}_layer_${i}_number`,
          })
        }

        if (input.text) {
          input.text.forEach((textLayer) => {
            inputSet.add({
              name: `Input ${title} layer ${textLayer.index} Title Text`,
              variableId: `input_${type}_layer_${textLayer.index}_titletext`,
            })
          })
        }

        if (input.type === 'VideoList') {
          inputSet.add({
            name: `Input ${title} Selected Index`,
            variableId: `input_${type}_selected`,
          })
          inputSet.add({
            name: `Input ${title} Selected Index Name`,
            variableId: `input_${type}_selected_name`,
          })
        }

        if (input.list) {
          input.list.forEach(listItem => {
            inputSet.add({
              name: `Input ${title} List ${listItem.index + 1} Name`,
              variableId: `input_${type}_list_${listItem.index + 1}_name`
            })
            inputSet.add({
              name: `Input ${title} List ${listItem.index + 1} Selected`,
              variableId: `input_${type}_list_${listItem.index + 1}_selected`
            })
          })
        }

        if (input.type === 'VideoCall') {
          inputSet.add({ name: `Input ${title} Call Password`, variableId: `input_${type}_call_password` })
          inputSet.add({
            name: `Input ${title} Call Connected`,
            variableId: `input_${type}_call_connected`,
          })
          inputSet.add({
            name: `Input ${title} Call Video Source`,
            variableId: `input_${type}_call_video_source`,
          })
          inputSet.add({
            name: `Input ${title} Call Audio Source`,
            variableId: `input_${type}_call_audio_source`,
          })
        }

        inputSet.add({ name: `Input ${title} Volume`, variableId: `input_${type}_volume` })
        inputSet.add({ name: `Input ${title} Volume dB`, variableId: `input_${type}_volume_db` })
        inputSet.add({ name: `Input ${title} Volume Linear`, variableId: `input_${type}_volume_linear` })

        if (input.meterF1 !== undefined) {
          inputSet.add({ name: `Input ${title} MeterF1`, variableId: `input_${type}_meterf1` })
        }

        if (input.meterF2 !== undefined) {
          inputSet.add({ name: `Input ${title} MeterF2`, variableId: `input_${type}_meterf2` })
        }
      }
    })

    this.instance.timers.forEach((timer) => {
      const formats = ['hh:mm:ss', 'mm:ss', 'mm:ss.ms', 'mm:ss.sss']
      const dataArr = [
        timer.get({ defaultValue: '00:00:00', format: 'hh:mm:ss' }),
        timer.get({ defaultValue: '00:00', format: 'mm:ss' }),
        timer.get({ defaultValue: '00:00.0', format: 'mm:ss.ms' }),
        timer.get({ defaultValue: '00:00.000', format: 'mm:ss.sss' }),
      ]

      dataArr.forEach((data, index) => {
        const prefix = `timer_${timer.id}_${formats[index]}_`

        for (const key in data) {
          variables.add({ name: `Timer ${timer.id} ${formats[index]} ${key}`, variableId: prefix + key })
        }
      })
    })

    // Filter variables displayed based on Config settings
    let filteredVariables = [...variables]
    if (this.instance.config.variablesShowInputs) filteredVariables = [...filteredVariables, ...inputNameVariables]
    if (this.instance.config.variablesShowInputNumbers)
      filteredVariables = [...filteredVariables, ...inputNumberVariables]
    if (this.instance.config.variablesShowInputGUID) filteredVariables = [...filteredVariables, ...inputKeyVariables]

    // Prevent triggering a definitions update unless there's a change
    if (!isEqual(filteredVariables, [...this.currentDefinitions])) {
      this.currentDefinitions = new Set(filteredVariables)

      this.instance.setVariableDefinitions(filteredVariables)
    }
  }

  /**
   * @description Update variables for Timers
   */
  public readonly updateTimerVariables = (): void => {
    const newVariables: InstanceVariableValue = {}

    this.instance.timers.forEach((timer) => {
      const formats = ['hh:mm:ss', 'mm:ss', 'mm:ss.ms', 'mm:ss.sss']
      const dataArr = [
        timer.get({ defaultValue: '00:00:00', format: 'hh:mm:ss' }),
        timer.get({ defaultValue: '00:00', format: 'mm:ss' }),
        timer.get({ defaultValue: '00:00.0', format: 'mm:ss.ms' }),
        timer.get({ defaultValue: '00:00.000', format: 'mm:ss.sss' }),
      ]

      dataArr.forEach((data, index) => {
        const prefix = `timer_${timer.id}_${formats[index]}_`

        for (const key in data) {
          newVariables[prefix + key] = data[key]
        }
      })
    })

    this.set(newVariables)
  }

  /**
   * @description Update variables
   */
  public readonly updateVariables = async (): Promise<void> => {
    const newVariables: InstanceVariableValue = {}

    const calcDuration = (input: Input): { mm: string; ss: string; ms: string } | null => {
      if (input.duration > 1) {
        const inPosition = input.markIn ? input.markIn : 0
        const outPosition = input.markOut ? input.markOut : input.duration
        const duration = outPosition - inPosition
        const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

        const mm = (time: number): string => padding(Math.floor(time / 60000))
        const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
        const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

        return { mm: mm(duration), ss: ss(duration), ms: ms(duration) }
      }

      return null
    }

    const calcRemaining = (
      input: Input
    ): { ms: string; ss: string; ssms: string; mmss: string; mmssms: string } | null => {
      if (input.position !== undefined) {
        const inPosition = input.position
        const outPosition = input.markOut ? input.markOut : input.duration
        const duration = outPosition - inPosition
        const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

        const mm = (time: number): string => padding(Math.floor(time / 60000))
        const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
        const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

        return {
          ms: duration.toString(),
          ss: `${padding(Math.floor(duration / 1000))}`,
          ssms: `${padding(Math.floor(duration / 1000))}.${ms(duration)}`,
          mmss: `${mm(duration)}:${ss(duration)}`,
          mmssms: `${mm(duration)}:${ss(duration)}.${ms(duration)}`,
        }
      }
      return null
    }

    // Status
    newVariables['connected_state'] = this.instance.connected.toString()
    newVariables['ftb_active'] = this.instance.data.status.fadeToBlack.toString()
    newVariables['playlist_active'] = this.instance.data.status.playList.toString()
    newVariables['fullscreen_active'] = this.instance.data.status.fullscreen.toString()
    newVariables['external_active'] = this.instance.data.status.external.toString()
    newVariables['multicorder_active'] = this.instance.data.status.multiCorder.toString()
    newVariables['stream_1_active'] = this.instance.data.status.stream[0].toString()
    newVariables['stream_2_active'] = this.instance.data.status.stream[1].toString()
    newVariables['stream_3_active'] = this.instance.data.status.stream[2].toString()
    newVariables['recording_active'] = this.instance.data.status.recording.toString()
    newVariables['recording_duration'] = formatTime(this.instance.data.recording.duration, 's', 'auto')
    newVariables['recording_hms'] = formatTime(this.instance.data.recording.duration, 's', 'hh:mm:ss')

    // Mix
    for (const id of mixId) {
      const mixProgramInput = await this.instance.data.getInput(this.instance.data.mix[id - 1].program)
      const mixPreviewInput = await this.instance.data.getInput(this.instance.data.mix[id - 1].preview)

      const mixVariables = async (mix: string | number): Promise<void> => {
        if (mixProgramInput) {
          const inputAudio = mixProgramInput.muted === undefined ? false : mixProgramInput.muted
          newVariables[`mix_${mix}_program`] = this.instance.data.mix[id - 1].program
          newVariables[`mix_${mix}_program_name`] = await this.instance.data.getInputTitle(
            this.instance.data.mix[id - 1].program
          )
          newVariables[`mix_${mix}_program_guid`] = mixProgramInput ? mixProgramInput?.key : ''
          newVariables[`mix_${mix}_program_audio`] = (!inputAudio).toString()
          newVariables[`mix_${mix}_program_meterf1`] = volumeTodB(mixProgramInput.meterF1 || 0).toFixed(1)
          newVariables[`mix_${mix}_program_meterf2`] = volumeTodB(mixProgramInput.meterF2 || 0).toFixed(1)

          const audioLevel = this.instance.data.audioLevels.find((level) => level.key === mixProgramInput.key)
          if (audioLevel) {
            const audioLevelData = this.instance.data.getAudioLevelData(audioLevel)
            newVariables[`mix_${mix}_program_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg).toFixed(1)
            newVariables[`mix_${mix}_program_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg).toFixed(1)
            newVariables[`mix_${mix}_program_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg).toFixed(1)
            newVariables[`mix_${mix}_program_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg).toFixed(1)
            newVariables[`mix_${mix}_program_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak).toFixed(1)
            newVariables[`mix_${mix}_program_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak).toFixed(1)
            newVariables[`mix_${mix}_program_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak).toFixed(1)
            newVariables[`mix_${mix}_program_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak).toFixed(1)
          }

          const inputDuration = calcDuration(mixProgramInput)

          if (inputDuration !== null) {
            newVariables[`mix_${mix}_program_duration`] = inputDuration.ms
          }

          const inputRemaining = calcRemaining(mixProgramInput)

          if (inputRemaining !== null) {
            newVariables[`mix_${mix}_program_remaining`] = inputRemaining.ms
          }

          for (let i = 1; i < 11; i++) {
            newVariables[`mix_${mix}_program_layer_${i}_number`] = ''
            newVariables[`mix_${mix}_program_layer_${i}_name`] = ''
            newVariables[`mix_${mix}_program_layer_${i}_key`] = ''
          }

          for (const layer of mixProgramInput.overlay || []) {
            const mixProgramInputLayer = await this.instance.data.getInput(layer.key)
            newVariables[`mix_${mix}_program_layer_${layer.index + 1}_number`] = mixProgramInputLayer?.number || ''
            newVariables[`mix_${mix}_program_layer_${layer.index + 1}_name`] =
              mixProgramInputLayer?.shortTitle || mixProgramInputLayer?.title || ''
            newVariables[`mix_${mix}_program_layer_${layer.index + 1}_key`] = layer.key
          }
        }

        if (mixPreviewInput) {
          const inputAudio = mixPreviewInput.muted === undefined ? false : mixPreviewInput.muted
          newVariables[`mix_${mix}_preview`] = this.instance.data.mix[id - 1].preview
          newVariables[`mix_${mix}_preview_name`] = await this.instance.data.getInputTitle(
            this.instance.data.mix[id - 1].preview
          )
          newVariables[`mix_${mix}_preview_guid`] = mixPreviewInput?.key
          newVariables[`mix_${mix}_preview_mute`] = inputAudio.toString()
          newVariables[`mix_${mix}_preview_audio`] = (!inputAudio).toString()
          newVariables[`mix_${mix}_preview_meterf1`] = volumeTodB(mixPreviewInput.meterF1 || 0).toFixed(1)
          newVariables[`mix_${mix}_preview_meterf2`] = volumeTodB(mixPreviewInput.meterF2 || 0).toFixed(1)

          const audioLevel = this.instance.data.audioLevels.find((level) => level.key === mixPreviewInput.key)
          if (audioLevel) {
            const audioLevelData = this.instance.data.getAudioLevelData(audioLevel)
            newVariables[`mix_${mix}_preview_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak).toFixed(1)
          }

          const inputDuration = calcDuration(mixPreviewInput)

          if (inputDuration !== null) {
            newVariables[`mix_${mix}_preview_duration`] = inputDuration.ms
          }

          const inputRemaining = calcRemaining(mixPreviewInput)

          if (inputRemaining !== null) {
            newVariables[`mix_${mix}_preview_remaining`] = inputRemaining.ms
          }

          for (let i = 1; i < 11; i++) {
            newVariables[`mix_${mix}_preview_layer_${i}_number`] = ''
            newVariables[`mix_${mix}_preview_layer_${i}_name`] = ''
            newVariables[`mix_${mix}_preview_layer_${i}_key`] = ''
          }

          for (const layer of mixPreviewInput.overlay || []) {
            const mixPreviewInputLayer = await this.instance.data.getInput(layer.key)
            newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_number`] = mixPreviewInputLayer?.number || ''
            newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_name`] =
              mixPreviewInputLayer?.shortTitle || mixPreviewInputLayer?.title || ''
            newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_key`] = layer.key
          }
        }
      }

      mixVariables(id)
      if (this.instance.routingData.mix === id - 1) mixVariables('selected')
    }

    newVariables['mix_selected'] = this.instance.routingData.mix + 1

    // Audio
    AUDIOBUSSESMASTER.forEach((id) => {
      const audioBus = this.instance.data.getAudioBus(id === 'Headphones' ? 'Master' : id)
      let volume: number | string | undefined = audioBus?.[id === 'Headphones' ? 'headphonesVolume' : 'volume']
      let volumedB
      let volumeLinear
      const meterF1 = audioBus?.meterF1 ? volumeTodB(audioBus.meterF1).toFixed(1) : ''
      const meterF2 = audioBus?.meterF2 ? volumeTodB(audioBus.meterF2).toFixed(1) : ''

      if (volume !== undefined) {
        volumedB = volumeTodB(volume).toFixed(1)
        volumeLinear = Math.round(volumeToLinear(volume))
      } else {
        volume = ''
        volumedB = ''
        volumeLinear = ''
      }

      newVariables[`bus_${id.toLowerCase()}_volume`] = parseFloat(volume + '').toFixed(2)
      newVariables[`bus_${id.toLowerCase()}_volume_db`] = volumedB
      newVariables[`bus_${id.toLowerCase()}_volume_linear`] = volumeLinear

      if (id !== 'Headphones') {
        newVariables[`bus_${id.toLowerCase()}_meterf1`] = meterF1
        newVariables[`bus_${id.toLowerCase()}_meterf2`] = meterF2
      }

      if (id !== 'Headphones') {
        const audioLevelID = id === 'Master' ? 'master' : `bus${id}`
        const audioLevel = this.instance.data.audioLevels.find((level) => level.key === audioLevelID)
        if (audioLevel) {
          const audioLevelData = this.instance.data.getAudioLevelData(audioLevel)
          newVariables[`bus_${id.toLowerCase()}_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak).toFixed(1)
        }
      }

      if (id !== 'Master' && id !== 'Headphones') {
        newVariables[`bus_${id.toLowerCase()}_mute`] = audioBus?.muted ? 'true' : 'false'
        newVariables[`bus_${id.toLowerCase()}_solo`] = audioBus?.solo ? 'true' : 'false'
      }
    })

    const selectedBus = this.instance.data.getAudioBus(this.instance.routingData.bus)
    if (selectedBus !== null) {
      newVariables.bus_selected = this.instance.routingData.bus
      newVariables.bus_selected_volume = selectedBus.volume.toFixed(2)
      newVariables.bus_selected_volume_db = volumeTodB(selectedBus.volume).toFixed(1)
      newVariables.bus_selected_volume_linear = Math.round(volumeToLinear(selectedBus.volume))
      newVariables.bus_selected_meterf1 = selectedBus.meterF1.toFixed(1)
      newVariables.bus_selected_meterf2 = selectedBus.meterF2.toFixed(1)
      newVariables.bus_selected_mute = selectedBus.muted ? 'true' : 'false'
      newVariables.bus_selected_solo = selectedBus.solo ? 'true' : 'false'
    }

    // Overlay
    const getOverlayInput = async (id: number): Promise<Input | null> => {
      const overlay = this.instance.data.overlays[id - 1]

      return overlay && overlay.input !== null ? await this.instance.data.getInput(overlay.input) : null
    }

    const overlays = [0, 1, 2, 3]
    for (const id of overlays) {
      if (this.instance.data.overlays[id] && this.instance.data.overlays[id].input !== null) {
        const overlay = await getOverlayInput(id + 1)
        newVariables[`overlay_${id + 1}_input_name`] = overlay?.shortTitle || overlay?.title || ''
        newVariables[`overlay_${id + 1}_input`] = overlay?.number || ''
        newVariables[`overlay_${id + 1}_pgm`] = (!this.instance.data.overlays[id].preview).toString()
        newVariables[`overlay_${id + 1}_prv`] = this.instance.data.overlays[id].preview.toString()
      } else {
        newVariables[`overlay_${id + 1}_input_name`] = ''
        newVariables[`overlay_${id + 1}_input`] = ''
        newVariables[`overlay_${id + 1}_pgm`] = 'false'
        newVariables[`overlay_${id + 1}_prv`] = 'false'
      }
    }

    // Layers
    const layerRoutingInput = await this.instance.data.getInput(this.instance.routingData.layer.destinationInput || '')
    if (layerRoutingInput) {
      const inputName = layerRoutingInput.shortTitle
        ? layerRoutingInput.shortTitle.replace(/[^a-z0-9-_.]+/gi, '')
        : layerRoutingInput.title.replace(/[^a-z0-9-_.]+/gi, '')
      newVariables['layer_routing_input'] = inputName
    } else {
      newVariables['layer_routing_input'] = ''
    }

    newVariables['layer_routing_layer'] = this.instance.routingData.layer.destinationLayer || ''

      // Dyanmic Inputs/Values
      ;[0, 1, 2, 3].forEach((dynamic) => {
        newVariables[`dynamic_input_${dynamic + 1}`] = this.instance.data.dynamicInput[dynamic]?.value || ''
        newVariables[`dynamic_value_${dynamic + 1}`] = this.instance.data.dynamicValue[dynamic]?.value || ''
      })

    // Inputs
    const inputNames: string[] = []

    for (const input of this.instance.data.inputs) {
      const inputName = input.shortTitle
        ? input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '')
        : input.title.replace(/[^a-z0-9-_.]+/gi, '')
      let useNamedInput = false

      // Prevent inputs with duplicate names from overwriting eachother. First input takes priority as per vMix API
      if (!inputNames.includes(inputName.toLowerCase())) {
        inputNames.push(inputName.toLowerCase())
        useNamedInput = true
      }

      const inputTypes = [
        input.number,
        input.key,
        useNamedInput ? input.shortTitle || input.title : false,
        useNamedInput ? inputName.toLowerCase() : false,
      ].filter((x) => x !== false)

      for (const type of inputTypes) {
        newVariables[`input_${type}_name`] = input.shortTitle || input.title
        newVariables[`input_${type}_number`] = input.number
        newVariables[`input_${type}_guid`] = input.key
        newVariables[`input_${type}_type`] = input.type

        this.instance.data.mix.forEach((mix) => {
          const tallyPreview = this.instance.data.mix[0].previewTally.includes(input.key).toString()
          const tallyProgram = this.instance.data.mix[0].programTally.includes(input.key).toString()

          newVariables[`input_${type}_mix_${mix.number}_tally_preview`] = tallyPreview
          newVariables[`input_${type}_mix_${mix.number}_tally_program`] = tallyProgram
        })

        const inputAudio = input.muted === undefined ? false : input.muted

        newVariables[`input_${type}_mute`] = inputAudio.toString()
        newVariables[`input_${type}_audio`] = (!inputAudio).toString()

        const meterF1 = input.meterF1 !== undefined ? volumeTodB(input.meterF1).toFixed(1) : ''
        const meterF2 = input.meterF2 !== undefined ? volumeTodB(input.meterF2).toFixed(1) : ''

        newVariables[`input_${type}_meterf1`] = meterF1
        newVariables[`input_${type}_meterf2`] = meterF2

        const audioLevel = this.instance.data.audioLevels.find((level) => level.key === input.key)
        if (audioLevel) {
          const audioLevelData = this.instance.data.getAudioLevelData(audioLevel)

          newVariables[`input_${type}_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg).toFixed(1)
          newVariables[`input_${type}_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg).toFixed(1)
          newVariables[`input_${type}_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg).toFixed(1)
          newVariables[`input_${type}_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg).toFixed(1)
          newVariables[`input_${type}_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak).toFixed(1)
          newVariables[`input_${type}_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak).toFixed(1)
          newVariables[`input_${type}_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak).toFixed(1)
          newVariables[`input_${type}_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak).toFixed(1)
        }

        if (input.duration > 1) {
          const inPosition = input.markIn ? input.markIn : 0
          const outPosition = input.markOut ? input.markOut : input.duration
          const duration = outPosition - inPosition
          const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

          const mm = (time: number): string => padding(Math.floor(time / 60000))
          const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
          const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

          newVariables[`input_${type}_duration`] = `${mm(duration)}:${ss(duration)}.${ms(duration)}`
        }

        const inputDuration = calcDuration(input)

        if (inputDuration !== null) {
          newVariables[`input_${type}_duration`] = `${inputDuration.mm}:${inputDuration.ss}.${inputDuration.ms}`
        }

        const inputRemaining = calcRemaining(input)

        if (inputRemaining !== null) {
          newVariables[`input_${type}_remaining`] = inputRemaining.ms
          newVariables[`input_${type}_remaining_ss`] = inputRemaining.ss
          newVariables[`input_${type}_remaining_ss.ms`] = inputRemaining.ssms
          newVariables[`input_${type}_remaining_mm:ss`] = inputRemaining.mmss
          newVariables[`input_${type}_remaining_mm:ss.ms`] = inputRemaining.mmssms
        }

        for (let i = 0; i < 10; i++) {
          newVariables[`input_${type}_layer_${i + 1}_name`] = ''
          newVariables[`input_${type}_layer_${i + 1}_number`] = ''
        }

        for (const layer of input.overlay || []) {
          const overlayInput = await this.instance.data.getInput(layer.key)
          let overlayinputName = ''

          if (overlayInput)
            overlayinputName = overlayInput.shortTitle
              ? overlayInput.shortTitle.replace(/[^a-z0-9-_. ]+/gi, '')
              : overlayInput.title.replace(/[^a-z0-9-_. ]+/gi, '')

          newVariables[`input_${type}_layer_${layer.index + 1}_name`] = overlayinputName
          newVariables[`input_${type}_layer_${layer.index + 1}_number`] = overlayInput?.number || ''
          newVariables[`input_${type}_layer_${layer.index + 1}_key`] = overlayInput?.key || ''
        }

        if (input.text) {
          input.text.forEach((textLayer) => {
            newVariables[`input_${type}_layer_${textLayer.index}_titletext`] = textLayer.value
          })
        }

        if (input.list) {
          input.list.forEach(listItem => {
            newVariables[`input_${type}_list_${listItem.index + 1}_name`] = listItem.filename
            newVariables[`input_${type}_list_${listItem.index + 1}_selected`] = listItem.selected.toString()

            if (listItem.selected) {
              newVariables[`input_${type}_selected`] = listItem.index + 1
              newVariables[`input_${type}_selected_name`] = listItem.filename
            }
          })
        }

        if (input.type === 'VideoCall') {
          let audioSource = input.callAudioSource as string
          if (audioSource.startsWith('Bus')) {
            audioSource = audioSource.substr(3)
          }

          newVariables[`input_${type}_call_password`] = input.callPassword
          newVariables[`input_${type}_call_connected`] = input.callConnected ? 'Connected' : 'Disconnected'
          newVariables[`input_${type}_call_video_source`] = input.callVideoSource
          newVariables[`input_${type}_call_audio_source`] = input.callAudioSource
        }

        let volume
        let volumedB
        let volumeLinear

        if (input.volume !== undefined) {
          volume = input.volume.toFixed(2)
          volumedB = volumeTodB(input.volume).toFixed(1)
          volumeLinear = Math.round(volumeToLinear(input.volume))
        } else {
          volume = ''
          volumedB = ''
          volumeLinear = ''
        }

        newVariables[`input_${type}_volume`] = volume
        newVariables[`input_${type}_volume_db`] = volumedB
        newVariables[`input_${type}_volume_linear`] = volumeLinear
      }
    }

    this.set(newVariables)

    this.updateDefinitions()
  }
}
