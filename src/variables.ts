import VMixInstance from './'
import { CompanionVariableDefinition } from '@companion-module/base'
import { volumeTodB, volumeToLinear, formatTime, AUDIOBUSSESMASTER } from './utils'
import { Input } from './data'
import _ from 'lodash'

interface InstanceVariableValue {
  [key: string]: string | number | undefined
}

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

      // Mix
      { name: 'Mix 1 Program', variableId: 'mix_1_program' },
      { name: 'Mix 1 Program Short Title', variableId: 'mix_1_program_name' },
      { name: 'Mix 1 Program GUID', variableId: 'mix_1_program_guid' },
      { name: 'Mix 1 Preview', variableId: 'mix_1_preview' },
      { name: 'Mix 1 Preview Short Title', variableId: 'mix_1_preview_name' },
      { name: 'Mix 1 Preview GUID', variableId: 'mix_1_preview_guid' },
      { name: 'Mix 2 Program', variableId: 'mix_2_program' },
      { name: 'Mix 2 Program Short Title', variableId: 'mix_2_program_name' },
      { name: 'Mix 2 Program GUID', variableId: 'mix_2_program_guid' },
      { name: 'Mix 2 Preview', variableId: 'mix_2_preview' },
      { name: 'Mix 2 Preview Short Title', variableId: 'mix_2_preview_name' },
      { name: 'Mix 2 Preview GUID', variableId: 'mix_2_preview_guid' },
      { name: 'Mix 3 Program', variableId: 'mix_3_program' },
      { name: 'Mix 3 Program Short Title', variableId: 'mix_3_program_name' },
      { name: 'Mix 3 Program GUID', variableId: 'mix_3_program_guid' },
      { name: 'Mix 3 Preview', variableId: 'mix_3_preview' },
      { name: 'Mix 3 Preview Short Title', variableId: 'mix_3_preview_name' },
      { name: 'Mix 3 Preview GUID', variableId: 'mix_3_preview_guid' },
      { name: 'Mix 4 Program', variableId: 'mix_4_program' },
      { name: 'Mix 4 Program Short Title', variableId: 'mix_4_program_name' },
      { name: 'Mix 4 Program GUID', variableId: 'mix_4_program_guid' },
      { name: 'Mix 4 Preview', variableId: 'mix_4_preview' },
      { name: 'Mix 4 Preview Short Title', variableId: 'mix_4_preview_name' },
      { name: 'Mix 4 Preview GUID', variableId: 'mix_4_preview_guid' },
      { name: 'Mix Selected', variableId: 'mix_selected' },

      // Audio
      { name: 'Bus Master Volume', variableId: 'bus_master_volume' },
      { name: 'Bus Master dB', variableId: 'bus_master_volume_db' },
      { name: 'Bus Master Volume Linear', variableId: 'bus_master_volume_linear' },
      { name: 'Bus Master MeterF1', variableId: 'bus_master_meterf1' },
      { name: 'Bus Master MeterF2', variableId: 'bus_master_meterf2' },
      { name: 'Bus Headphones Volume', variableId: 'bus_headphones_volume' },
      { name: 'Bus Headphones dB', variableId: 'bus_headphones_volume_db' },
      { name: 'Bus Headphones Volume Linear', variableId: 'bus_headphones_volume_linear' },
      { name: 'Bus A Volume', variableId: 'bus_a_volume' },
      { name: 'Bus A dB', variableId: 'bus_a_volume_db' },
      { name: 'Bus A Volume Linear', variableId: 'bus_a_volume_linear' },
      { name: 'Bus A MeterF1', variableId: 'bus_a_meterf1' },
      { name: 'Bus A MeterFz', variableId: 'bus_a_meterf2' },
      { name: 'Bus A Mute', variableId: 'bus_a_mute' },
      { name: 'Bus A Solo', variableId: 'bus_a_solo' },
      { name: 'Bus B Volume', variableId: 'bus_b_volume' },
      { name: 'Bus B dB', variableId: 'bus_b_volume_db' },
      { name: 'Bus B Volume Linear', variableId: 'bus_b_volume_linear' },
      { name: 'Bus B MeterF1', variableId: 'bus_b_meterf1' },
      { name: 'Bus B MeterFz', variableId: 'bus_b_meterf2' },
      { name: 'Bus B Mute', variableId: 'bus_b_mute' },
      { name: 'Bus B Solo', variableId: 'bus_b_solo' },
      { name: 'Bus C Volume', variableId: 'bus_c_volume' },
      { name: 'Bus C dB', variableId: 'bus_c_volume_db' },
      { name: 'Bus C Volume Linear', variableId: 'bus_c_volume_linear' },
      { name: 'Bus C MeterF1', variableId: 'bus_c_meterf1' },
      { name: 'Bus C MeterFz', variableId: 'bus_c_meterf2' },
      { name: 'Bus C Mute', variableId: 'bus_c_mute' },
      { name: 'Bus C Solo', variableId: 'bus_c_solo' },
      { name: 'Bus D Volume', variableId: 'bus_d_volume' },
      { name: 'Bus D dB', variableId: 'bus_d_volume_db' },
      { name: 'Bus D Volume Linear', variableId: 'bus_d_volume_linear' },
      { name: 'Bus D MeterF1', variableId: 'bus_d_meterf1' },
      { name: 'Bus D MeterFz', variableId: 'bus_d_meterf2' },
      { name: 'Bus D Mute', variableId: 'bus_d_mute' },
      { name: 'Bus D Solo', variableId: 'bus_d_solo' },
      { name: 'Bus E Volume', variableId: 'bus_e_volume' },
      { name: 'Bus E dB', variableId: 'bus_e_volume_db' },
      { name: 'Bus E Volume Linear', variableId: 'bus_e_volume_linear' },
      { name: 'Bus E MeterF1', variableId: 'bus_e_meterf1' },
      { name: 'Bus E MeterFz', variableId: 'bus_e_meterf2' },
      { name: 'Bus E Mute', variableId: 'bus_e_mute' },
      { name: 'Bus E Solo', variableId: 'bus_e_solo' },
      { name: 'Bus F Volume', variableId: 'bus_f_volume' },
      { name: 'Bus F dB', variableId: 'bus_f_volume_db' },
      { name: 'Bus F Volume Linear', variableId: 'bus_f_volume_linear' },
      { name: 'Bus F MeterF1', variableId: 'bus_f_meterf1' },
      { name: 'Bus F MeterFz', variableId: 'bus_f_meterf2' },
      { name: 'Bus F Mute', variableId: 'bus_f_mute' },
      { name: 'Bus F Solo', variableId: 'bus_f_solo' },
      { name: 'Bus G Volume', variableId: 'bus_g_volume' },
      { name: 'Bus G dB', variableId: 'bus_g_volume_db' },
      { name: 'Bus G Volume Linear', variableId: 'bus_g_volume_linear' },
      { name: 'Bus G MeterF1', variableId: 'bus_g_meterf1' },
      { name: 'Bus G MeterFz', variableId: 'bus_g_meterf2' },
      { name: 'Bus G Mute', variableId: 'bus_g_mute' },
      { name: 'Bus G Solo', variableId: 'bus_g_solo' },

      // Overlay
      { name: 'Overlay 1 Input Short Title', variableId: 'overlay_1_input_name' },
      { name: 'Overlay 1 Input Number', variableId: 'overlay_1_input' },
      { name: 'Overlay 1 Active PGM', variableId: 'overlay_1_pgm' },
      { name: 'Overlay 1 Active PRV', variableId: 'overlay_1_prv' },
      { name: 'Overlay 2 Input Short Title', variableId: 'overlay_2_input_name' },
      { name: 'Overlay 2 Input Number', variableId: 'overlay_2_input' },
      { name: 'Overlay 2 Active PGM', variableId: 'overlay_2_pgm' },
      { name: 'Overlay 2 Active PRV', variableId: 'overlay_2_prv' },
      { name: 'Overlay 3 Input Short Title', variableId: 'overlay_3_input_name' },
      { name: 'Overlay 3 Input Number', variableId: 'overlay_3_input' },
      { name: 'Overlay 3 Active PGM', variableId: 'overlay_3_pgm' },
      { name: 'Overlay 3 Active PRV', variableId: 'overlay_3_prv' },
      { name: 'Overlay 4 Input Short Title', variableId: 'overlay_4_input_name' },
      { name: 'Overlay 4 Input Number', variableId: 'overlay_4_input' },
      { name: 'Overlay 4 Active PGM', variableId: 'overlay_4_pgm' },
      { name: 'Overlay 4 Active PRV', variableId: 'overlay_4_prv' },

      // Dyanmic Inputs/Values
      { name: 'Dynamic Input 1', variableId: 'dynamic_input_1' },
      { name: 'Dynamic Input 2', variableId: 'dynamic_input_2' },
      { name: 'Dynamic Input 3', variableId: 'dynamic_input_3' },
      { name: 'Dynamic Input 4', variableId: 'dynamic_input_4' },
      { name: 'Dynamic Value 1', variableId: 'dynamic_value_1' },
      { name: 'Dynamic Value 2', variableId: 'dynamic_value_2' },
      { name: 'Dynamic Value 3', variableId: 'dynamic_value_3' },
      { name: 'Dynamic Value 4', variableId: 'dynamic_value_4' },

      // Layers
      { name: 'Layer Routing Input', variableId: 'layer_routing_input' },
      { name: 'Layer Routing Layer', variableId: 'layer_routing_layer' },
    ])

    // Inputs
    const inputNumberVariables = new Set<CompanionVariableDefinition>()
    const inputNameVariables = new Set<CompanionVariableDefinition>()
    const inputKeyVariables = new Set<CompanionVariableDefinition>()

    this.instance.data.inputs.forEach((input) => {
      let inputName = input.shortTitle ? input.shortTitle : input.title
      inputName = inputName.replace(/[^a-z0-9-_.]+/gi, '').toLowerCase()

      inputNumberVariables.add({ name: `Input ${input.number} Short Title`, variableId: `input_${input.number}_name` })
      inputNumberVariables.add({ name: `Input ${input.number} GUID`, variableId: `input_${input.number}_guid` })
      inputNumberVariables.add({ name: `Input ${input.number} Type`, variableId: `input_${input.number}_type` })
      inputNameVariables.add({
        name: `Input ${input.shortTitle || input.title} Number`,
        variableId: `input_${inputName}_number`,
      })
      inputNameVariables.add({
        name: `Input ${input.shortTitle || input.title} GUID`,
        variableId: `input_${inputName}_guid`,
      })
      inputNameVariables.add({
        name: `Input ${input.shortTitle || input.title} Type`,
        variableId: `input_${inputName}_type`,
      })
      inputKeyVariables.add({ name: `Input ${input.key} Short Title`, variableId: `input_${input.key}_name` })
      inputKeyVariables.add({ name: `Input ${input.key} Number`, variableId: `input_${input.key}_number` })
      inputKeyVariables.add({ name: `Input ${input.key} Type`, variableId: `input_${input.key}_type` })

      this.instance.data.mix.forEach((mix) => {
        inputNumberVariables.add({
          name: `Input ${input.number} Mix ${mix.number} Tally Preview`,
          variableId: `input_${input.number}_mix_${mix.number}_tally_preview`,
        })
        inputNumberVariables.add({
          name: `Input ${input.number} Mix ${mix.number} Tally Program`,
          variableId: `input_${input.number}_mix_${mix.number}_tally_program`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Mix ${mix.number} Tally Preview`,
          variableId: `input_${inputName}_mix_${mix.number}_tally_preview`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Mix ${mix.number} Tally Program`,
          variableId: `input_${inputName}_mix_${mix.number}_tally_program`,
        })
        inputKeyVariables.add({
          name: `Input ${input.key} Mix ${mix.number} Tally Preview`,
          variableId: `input_${input.key}_mix_${mix.number}_tally_preview`,
        })
        inputKeyVariables.add({
          name: `Input ${input.key} Mix ${mix.number} Tally Program`,
          variableId: `input_${input.key}_mix_${mix.number}_tally_program`,
        })
      })

      inputNumberVariables.add({ name: `Input ${input.number} Muted`, variableId: `input_${input.number}_mute` })
      inputNumberVariables.add({ name: `Input ${input.number} Audio`, variableId: `input_${input.number}_audio` })
      inputNameVariables.add({
        name: `Input ${input.shortTitle || input.title} Muted`,
        variableId: `input_${inputName}_mute`,
      })
      inputNameVariables.add({
        name: `Input ${input.shortTitle || input.title} Audio`,
        variableId: `input_${inputName}_audio`,
      })
      inputKeyVariables.add({ name: `Input ${input.key} Muted`, variableId: `input_${input.key}_mute` })
      inputKeyVariables.add({ name: `Input ${input.key} Audio`, variableId: `input_${input.key}_audio` })

      if (input.duration > 1) {
        inputNumberVariables.add({
          name: `Input ${input.number} Duration`,
          variableId: `input_${input.number}_duration`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Duration`,
          variableId: `input_${inputName}_duration`,
        })
        inputKeyVariables.add({ name: `Input ${input.key} Duration`, variableId: `input_${input.key}_duration` })
      }

      if (input.position !== undefined) {
        inputNumberVariables.add({
          name: `Input ${input.number} Remaining`,
          variableId: `input_${input.number}_remaining`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Remaining`,
          variableId: `input_${inputName}_remaining`,
        })
        inputKeyVariables.add({
          name: `Input ${input.key} Remaining`,
          variableId: `input_${input.key}_remaining`,
        })
      }

      for (let i = 1; i < 11; i++) {
        inputNumberVariables.add({
          name: `Input ${input.number} layer ${i} Name`,
          variableId: `input_${input.number}_layer_${i}_name`,
        })
        inputNumberVariables.add({
          name: `Input ${input.number} layer ${i} Number`,
          variableId: `input_${input.number}_layer_${i}_number`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} layer ${i} Name`,
          variableId: `input_${inputName}_layer_${i}_name`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} layer ${i} Number`,
          variableId: `input_${inputName}_layer_${i}_number`,
        })
        inputKeyVariables.add({
          name: `Input ${input.key} layer ${i} Name`,
          variableId: `input_${input.key}_layer_${i}_name`,
        })
        inputKeyVariables.add({
          name: `Input ${input.key} layer ${i} Number`,
          variableId: `input_${input.key}_layer_${i}_number`,
        })
      }

      if (input.text) {
        input.text.forEach((textLayer) => {
          inputNumberVariables.add({
            name: `Input ${input.number} layer ${textLayer.index} Title Text`,
            variableId: `input_${input.number}_layer_${textLayer.index}_titletext`,
          })
          inputNameVariables.add({
            name: `Input ${input.shortTitle || input.title} layer ${textLayer.index} Title Text`,
            variableId: `input_${inputName.toLowerCase()}_layer_${textLayer.index}_titletext`,
          })
          inputKeyVariables.add({
            name: `Input ${input.key} layer ${textLayer.index} Title Text`,
            variableId: `input_${input.key}_layer_${textLayer.index}_titletext`,
          })
        })
      }

      if (input.type === 'VideoList') {
        inputNumberVariables.add({
          name: `Input ${input.number} Selected Index`,
          variableId: `input_${input.number}_selected`,
        })
        inputNumberVariables.add({
          name: `Input ${input.number} Selected Index Name`,
          variableId: `input_${input.number}_selected_name`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Selected Index`,
          variableId: `input_${inputName}_selected`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Selected Index Name`,
          variableId: `input_${inputName}_selected_name`,
        })
        inputKeyVariables.add({ name: `Input ${input.key} Selected Index`, variableId: `input_${input.key}_selected` })
        inputKeyVariables.add({
          name: `Input ${input.key} Selected Index Name`,
          variableId: `input_${input.key}_selected_name`,
        })
      }

      if (input.type === 'VideoCall') {
        inputNumberVariables.add({
          name: `Input ${input.number} Call Password`,
          variableId: `input_${input.number}_call_password`,
        })
        inputNumberVariables.add({
          name: `Input ${input.number} Call Connected`,
          variableId: `input_${input.number}_call_connected`,
        })
        inputNumberVariables.add({
          name: `Input ${input.number} Call Video Source`,
          variableId: `input_${input.number}_call_video_source`,
        })
        inputNumberVariables.add({
          name: `Input ${input.number} Call Audio Source`,
          variableId: `input_${input.number}_call_audio_source`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Call Password`,
          variableId: `input_${inputName}_call_password`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Call Connected`,
          variableId: `input_${inputName}_call_connected`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Call Video Source`,
          variableId: `input_${inputName}_call_video_source`,
        })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} Call Audio Source`,
          variableId: `input_${inputName}_call_audio_source`,
        })
        inputKeyVariables.add({
          name: `Input ${input.key} Call Password`,
          variableId: `input_${input.key}_call_password`,
        })
        inputKeyVariables.add({
          name: `Input ${input.key} Call Connected`,
          variableId: `input_${input.key}_call_connected`,
        })
        inputKeyVariables.add({
          name: `Input ${input.key} Call Video Source`,
          variableId: `input_${input.key}_call_video_source`,
        })
        inputKeyVariables.add({
          name: `Input ${input.key} Call Audio Source`,
          variableId: `input_${input.key}_call_audio_source`,
        })
      }

      inputNumberVariables.add({ name: `Input ${input.number} Volume`, variableId: `input_${input.number}_volume` })
      inputNumberVariables.add({
        name: `Input ${input.number} Volume dB`,
        variableId: `input_${input.number}_volume_db`,
      })
      inputNumberVariables.add({
        name: `Input ${input.number} Volume Linear`,
        variableId: `input_${input.number}_volume_linear`,
      })
      inputNameVariables.add({
        name: `Input ${input.shortTitle || input.title} Volume`,
        variableId: `input_${inputName}_volume`,
      })
      inputNameVariables.add({
        name: `Input ${input.shortTitle || input.title} Volume dB`,
        variableId: `input_${inputName}_volume_db`,
      })
      inputNameVariables.add({
        name: `Input ${input.shortTitle || input.title} Volume Linear`,
        variableId: `input_${inputName}_volume_linear`,
      })
      inputKeyVariables.add({ name: `Input ${input.key} Volume`, variableId: `input_${input.key}_volume` })
      inputKeyVariables.add({ name: `Input ${input.key} Volume dB`, variableId: `input_${input.key}_volume_db` })
      inputKeyVariables.add({
        name: `Input ${input.key} Volume Linear`,
        variableId: `input_${input.key}_volume_linear`,
      })

      if (input.meterF1 !== undefined) {
        inputNumberVariables.add({ name: `Input ${input.number} MeterF1`, variableId: `input_${input.number}_meterf1` })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} MeterF1`,
          variableId: `input_${inputName}_meterf1`,
        })
        inputKeyVariables.add({ name: `Input ${input.key} MeterF1`, variableId: `input_${input.key}_meterf1` })
      }

      if (input.meterF2 !== undefined) {
        inputNumberVariables.add({ name: `Input ${input.number} MeterF2`, variableId: `input_${input.number}_meterf2` })
        inputNameVariables.add({
          name: `Input ${input.shortTitle || input.title} MeterF2`,
          variableId: `input_${inputName}_meterf2`,
        })
        inputKeyVariables.add({ name: `Input ${input.key} MeterF2`, variableId: `input_${input.key}_meterf2` })
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
    if (!_.isEqual(filteredVariables, [...this.currentDefinitions])) {
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
    const mixId = [0, 1, 2, 3]

    for (const id of mixId) {
      const mixProgramInput = await this.instance.data.getInput(this.instance.data.mix[id].program)
      const mixPreviewInput = await this.instance.data.getInput(this.instance.data.mix[id].preview)

      if (mixProgramInput) {
        const inputAudio = mixProgramInput.muted === undefined ? false : mixProgramInput.muted
        newVariables[`mix_${id + 1}_program`] = this.instance.data.mix[id].program
        newVariables[`mix_${id + 1}_program_name`] = await this.instance.data.getInputTitle(
          this.instance.data.mix[id].program
        )
        newVariables[`mix_${id + 1}_program_guid`] = mixProgramInput ? mixProgramInput?.key : ''
        newVariables[`mix_${id + 1}_program_audio`] = (!inputAudio).toString()
        newVariables[`mix_${id + 1}_program_meterf1`] = mixProgramInput.meterF1
        newVariables[`mix_${id + 1}_program_meterf2`] = mixProgramInput.meterF2

        const inputDuration = calcDuration(mixProgramInput)

        if (inputDuration !== null) {
          newVariables[`mix_${id + 1}_program_duration`] = inputDuration.ms
        }

        const inputRemaining = calcRemaining(mixProgramInput)

        if (inputRemaining !== null) {
          newVariables[`mix_${id + 1}_program_remaining`] = inputRemaining.ms
        }
      }

      if (mixPreviewInput) {
        const inputAudio = mixPreviewInput.muted === undefined ? false : mixPreviewInput.muted
        newVariables[`mix_${id + 1}_preview`] = this.instance.data.mix[id].preview
        newVariables[`mix_${id + 1}_preview_name`] = await this.instance.data.getInputTitle(
          this.instance.data.mix[id].preview
        )
        newVariables[`mix_${id + 1}_preview_guid`] = mixPreviewInput?.key
        newVariables[`mix_${id + 1}_preview_mute`] = inputAudio.toString()
        newVariables[`mix_${id + 1}_preview_audio`] = (!inputAudio).toString()
        newVariables[`mix_${id + 1}_preview_meterf1`] = mixPreviewInput.meterF1
        newVariables[`mix_${id + 1}_preview_meterf2`] = mixPreviewInput.meterF2

        const inputDuration = calcDuration(mixPreviewInput)

        if (inputDuration !== null) {
          newVariables[`mix_${id + 1}_preview_duration`] = inputDuration.ms
        }

        const inputRemaining = calcRemaining(mixPreviewInput)

        if (inputRemaining !== null) {
          newVariables[`mix_${id + 1}_preview_remaining`] = inputRemaining.ms
        }
      }
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

      if (id !== 'Master' && id !== 'Headphones') {
        newVariables[`bus_${id.toLowerCase()}_mute`] = audioBus?.muted ? 'true' : 'false'
        newVariables[`bus_${id.toLowerCase()}_solo`] = audioBus?.solo ? 'true' : 'false'
      }
    })

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
    newVariables['dynamic_input_1'] = this.instance.data.dynamicInput[0]?.value || ''
    newVariables['dynamic_input_2'] = this.instance.data.dynamicInput[1]?.value || ''
    newVariables['dynamic_input_3'] = this.instance.data.dynamicInput[2]?.value || ''
    newVariables['dynamic_input_4'] = this.instance.data.dynamicInput[3]?.value || ''
    newVariables['dynamic_value_1'] = this.instance.data.dynamicValue[0]?.value || ''
    newVariables['dynamic_value_2'] = this.instance.data.dynamicValue[1]?.value || ''
    newVariables['dynamic_value_3'] = this.instance.data.dynamicValue[2]?.value || ''
    newVariables['dynamic_value_4'] = this.instance.data.dynamicValue[3]?.value || ''

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

      newVariables[`input_${input.number}_name`] = input.shortTitle || input.title
      newVariables[`input_${input.number}_guid`] = input.key
      newVariables[`input_${input.number}_type`] = input.type
      newVariables[`input_${input.key}_number`] = input.number
      newVariables[`input_${input.key}_name`] = input.shortTitle || input.title
      newVariables[`input_${input.key}_type`] = input.type

      if (useNamedInput) {
        newVariables[`input_${inputName.toLowerCase()}_number`] = input.number
        newVariables[`input_${inputName.toLowerCase()}_guid`] = input.key
        newVariables[`input_${inputName.toLowerCase()}_type`] = input.type
      }

      this.instance.data.mix.forEach((mix) => {
        const tallyPreview = this.instance.data.mix[0].previewTally.includes(input.key).toString()
        const tallyProgram = this.instance.data.mix[0].programTally.includes(input.key).toString()
        newVariables[`input_${input.number}_mix_${mix.number}_tally_preview`] = tallyPreview
        newVariables[`input_${input.number}_mix_${mix.number}_tally_program`] = tallyProgram
        if (useNamedInput) {
          newVariables[`input_${input.shortTitle || input.title}_mix_${mix.number}_tally_preview`] = tallyPreview
          newVariables[`input_${input.shortTitle || input.title}_mix_${mix.number}_tally_program`] = tallyProgram
          newVariables[`input_${inputName.toLowerCase()}_mix_${mix.number}_tally_preview`] = tallyPreview
          newVariables[`input_${inputName.toLowerCase()}_mix_${mix.number}_tally_program`] = tallyProgram
        }
        newVariables[`input_${input.key}_mix_${mix.number}_tally_preview`] = tallyPreview
        newVariables[`input_${input.key}_mix_${mix.number}_tally_program`] = tallyProgram
      })

      const inputAudio = input.muted === undefined ? false : input.muted

      newVariables[`input_${input.number}_mute`] = inputAudio.toString()
      newVariables[`input_${input.number}_audio`] = (!inputAudio).toString()

      if (useNamedInput) {
        newVariables[`input_${input.shortTitle || input.title}_mute`] = inputAudio.toString()
        newVariables[`input_${input.shortTitle || input.title}_audio`] = (!inputAudio).toString()
        newVariables[`input_${inputName.toLowerCase()}_mute`] = inputAudio.toString()
        newVariables[`input_${inputName.toLowerCase()}_audio`] = (!inputAudio).toString()
      }

      newVariables[`input_${input.key}_mute`] = inputAudio.toString()
      newVariables[`input_${input.key}_audio`] = (!inputAudio).toString()

      const meterF1 = input.meterF1 !== undefined ? volumeTodB(input.meterF1).toFixed(1) : ''
      const meterF2 = input.meterF2 !== undefined ? volumeTodB(input.meterF2).toFixed(1) : ''

      newVariables[`input_${input.number}_meterf1`] = meterF1
      newVariables[`input_${input.number}_meterf2`] = meterF2
      newVariables[`input_${input.key}_meterf1`] = meterF1
      newVariables[`input_${input.key}_meterf2`] = meterF2

      if (useNamedInput) {
        newVariables[`input_${inputName.toLowerCase()}_meterf1`] = meterF1
        newVariables[`input_${inputName.toLowerCase()}_meterf2`] = meterF2
      }

      if (input.duration > 1) {
        const inPosition = input.markIn ? input.markIn : 0
        const outPosition = input.markOut ? input.markOut : input.duration
        const duration = outPosition - inPosition
        const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

        const mm = (time: number): string => padding(Math.floor(time / 60000))
        const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
        const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

        newVariables[`input_${input.number}_duration`] = `${mm(duration)}:${ss(duration)}.${ms(duration)}`
        newVariables[`input_${input.key}_duration`] = `${mm(duration)}:${ss(duration)}.${ms(duration)}`

        if (useNamedInput) {
          newVariables[`input_${inputName.toLowerCase()}_duration`] = `${mm(duration)}:${ss(duration)}.${ms(duration)}`
        }
      }

      const inputDuration = calcDuration(input)

      if (inputDuration !== null) {
        newVariables[`input_${input.number}_duration`] = `${inputDuration.mm}:${inputDuration.ss}.${inputDuration.ms}`
        newVariables[`input_${input.key}_duration`] = `${inputDuration.mm}:${inputDuration.ss}.${inputDuration.ms}`

        if (useNamedInput) {
          newVariables[
            `input_${inputName.toLowerCase()}_duration`
          ] = `${inputDuration.mm}:${inputDuration.ss}.${inputDuration.ms}`
        }
      }

      const inputRemaining = calcRemaining(input)

      if (inputRemaining !== null) {
        newVariables[`input_${input.number}_remaining`] = inputRemaining.ms
        newVariables[`input_${input.number}_remaining_ss`] = inputRemaining.ss
        newVariables[`input_${input.number}_remaining_ss.ms`] = inputRemaining.ssms
        newVariables[`input_${input.number}_remaining_mm:ss`] = inputRemaining.mmss
        newVariables[`input_${input.number}_remaining_mm:ss.ms`] = inputRemaining.mmssms
        newVariables[`input_${input.key}_remaining`] = inputRemaining.ms
        newVariables[`input_${input.key}_remaining_ss`] = inputRemaining.ss
        newVariables[`input_${input.key}_remaining_ss.ms`] = inputRemaining.ssms
        newVariables[`input_${input.key}_remaining_mm:ss`] = inputRemaining.mmss
        newVariables[`input_${input.key}_remaining_mm:ss.ms`] = inputRemaining.mmssms

        if (useNamedInput) {
          newVariables[`input_${inputName.toLowerCase()}_remaining`] = inputRemaining.ms
          newVariables[`input_${inputName.toLowerCase()}_remaining_ss`] = inputRemaining.ss
          newVariables[`input_${inputName.toLowerCase()}_remaining_ss.ms`] = inputRemaining.ssms
          newVariables[`input_${inputName.toLowerCase()}_remaining_mm:ss`] = inputRemaining.mmss
          newVariables[`input_${inputName.toLowerCase()}_remaining_mm:ss.ms`] = inputRemaining.mmssms
        }
      }

      for (let i = 0; i < 10; i++) {
        newVariables[`input_${input.number}_layer_${i + 1}_name`] = ''
        newVariables[`input_${input.number}_layer_${i + 1}_number`] = ''
        newVariables[`input_${input.key}_layer_${i + 1}_name`] = ''
        newVariables[`input_${input.key}_layer_${i + 1}_number`] = ''

        if (useNamedInput) {
          newVariables[`input_${inputName.toLowerCase()}_layer_${i + 1}_name`] = ''
          newVariables[`input_${inputName.toLowerCase()}_layer_${i + 1}_number`] = ''
        }
      }

      for (const layer of input.overlay || []) {
        const overlayInput = await this.instance.data.getInput(layer.key)
        let overlayinputName = ''

        if (overlayInput)
          overlayinputName = overlayInput.shortTitle
            ? overlayInput.shortTitle.replace(/[^a-z0-9-_. ]+/gi, '')
            : overlayInput.title.replace(/[^a-z0-9-_. ]+/gi, '')

        newVariables[`input_${input.number}_layer_${layer.index + 1}_name`] = overlayinputName
        newVariables[`input_${input.number}_layer_${layer.index + 1}_number`] = overlayInput?.number || ''
        newVariables[`input_${input.number}_layer_${layer.index + 1}_key`] = overlayInput?.key || ''
        newVariables[`input_${input.key}_layer_${layer.index + 1}_name`] = overlayinputName
        newVariables[`input_${input.key}_layer_${layer.index + 1}_number`] = overlayInput?.number || ''
        newVariables[`input_${input.key}_layer_${layer.index + 1}_key`] = overlayInput?.key || ''

        if (useNamedInput) {
          newVariables[`input_${inputName.toLowerCase()}_layer_${layer.index + 1}_name`] = overlayinputName
          newVariables[`input_${inputName.toLowerCase()}_layer_${layer.index + 1}_number`] = overlayInput?.number || ''
          newVariables[`input_${inputName.toLowerCase()}_layer_${layer.index + 1}_key`] = overlayInput?.key || ''
        }
      }

      if (input.text) {
        input.text.forEach((textLayer) => {
          newVariables[`input_${input.number}_layer_${textLayer.index}_titletext`] = textLayer.value
          newVariables[`input_${input.key}_layer_${textLayer.index}_titletext`] = textLayer.value

          if (useNamedInput) {
            newVariables[`input_${inputName.toLowerCase()}_layer_${textLayer.index}_titletext`] = textLayer.value
          }
        })
      }

      if (input.type === 'VideoList') {
        let selectedTitle = 'Empty List'
        const selectedItem = input.list?.find((list) => list.selected === true)

        if (selectedItem) {
          selectedTitle = selectedItem.filename.replace(/[^a-z0-9-_.]+/gi, '')
        }

        newVariables[`input_${input.number}_selected`] = input.selectedIndex
        newVariables[`input_${input.number}_selected_name`] = selectedTitle
        newVariables[`input_${input.key}_selected`] = input.selectedIndex
        newVariables[`input_${input.key}_selected_name`] = selectedTitle

        if (useNamedInput) {
          newVariables[`input_${inputName.toLowerCase()}_selected`] = input.selectedIndex
          newVariables[`input_${inputName.toLowerCase()}_selected_name`] = selectedTitle
        }
      }

      if (input.type === 'VideoCall') {
        let audioSource = input.callAudioSource as string
        if (audioSource.startsWith('Bus')) {
          audioSource = audioSource.substr(3)
        }

        newVariables[`input_${input.number}_call_password`] = input.callPassword
        newVariables[`input_${input.number}_call_connected`] = input.callConnected ? 'Connected' : 'Disconnected'
        newVariables[`input_${input.number}_call_video_source`] = input.callVideoSource
        newVariables[`input_${input.number}_call_audio_source`] = input.callAudioSource
        newVariables[`input_${input.key}_call_password`] = input.callPassword
        newVariables[`input_${input.key}_call_connected`] = input.callConnected ? 'Connected' : 'Disconnected'
        newVariables[`input_${input.key}_call_video_source`] = input.callVideoSource
        newVariables[`input_${input.key}_call_audio_source`] = input.callAudioSource

        if (useNamedInput) {
          newVariables[`input_${inputName.toLowerCase()}_call_password`] = input.callPassword
          newVariables[`input_${inputName.toLowerCase()}_call_connected`] = input.callConnected
            ? 'Connected'
            : 'Disconnected'
          newVariables[`input_${inputName.toLowerCase()}_call_video_source`] = input.callVideoSource
          newVariables[`input_${inputName.toLowerCase()}_call_audio_source`] = input.callAudioSource
        }
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

      newVariables[`input_${input.number}_volume`] = volume
      newVariables[`input_${input.number}_volume_db`] = volumedB
      newVariables[`input_${input.number}_volume_linear`] = volumeLinear
      newVariables[`input_${input.key}_volume`] = volume
      newVariables[`input_${input.key}_volume_db`] = volumedB
      newVariables[`input_${input.key}_volume_linear`] = volumeLinear

      if (useNamedInput) {
        newVariables[`input_${inputName.toLowerCase()}_volume`] = volume
        newVariables[`input_${inputName.toLowerCase()}_volume_db`] = volumedB
        newVariables[`input_${inputName.toLowerCase()}_volume_linear`] = volumeLinear
      }
    }

    this.set(newVariables)

    this.updateDefinitions()
  }
}
