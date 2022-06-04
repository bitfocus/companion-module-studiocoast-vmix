import VMixInstance from './'
import { volumeTodB, volumeToLinear, formatTime, AUDIOBUSSESMASTER } from './utils'
import { Input } from './data'
import _ from 'lodash'

interface InstanceVariableDefinition {
  label: string
  name: string
  type?: string
}

interface InstanceVariableValue {
  [key: string]: string | number | undefined
}

export class Variables {
  private readonly instance: VMixInstance
  private currentDefinitions: Set<InstanceVariableDefinition> = new Set()

  constructor(instance: VMixInstance) {
    this.instance = instance
  }

  /**
   * @param name Instance variable name
   * @returns Value of instance variable or undefined
   * @description Retrieves instance variable from any vMix instances
   */
  public readonly get = (variable: string): string | undefined => {
    let data

    this.instance.parseVariables(variable, (value) => {
      data = value
    })

    return data
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

    this.instance.setVariables(newVariables)
    this.instance.checkFeedbacks('buttonText')
  }

  /**
   * @description Sets variable definitions
   */
  public readonly updateDefinitions = (): void => {
    const variables: Set<InstanceVariableDefinition> = new Set([
      // Status
      { label: 'Connected to vMix', name: 'connected_state' },
      { label: 'Fade To Black Active', name: 'ftb_active' },
      { label: 'playList Active', name: 'playlist_active' },
      { label: 'Fullscreen Output Active', name: 'fullscreen_active' },
      { label: 'External Output Active', name: 'external_active' },
      { label: 'MultiCorder Active', name: 'multicorder_active' },
      { label: 'Stream 1 Active', name: 'stream_1_active' },
      { label: 'Stream 2 Active', name: 'stream_2_active' },
      { label: 'Stream 3 Active', name: 'stream_3_active' },
      { label: 'Recording Active', name: 'recording_active' },
      { label: 'Recording Duration', name: 'recording_duration' },
      { label: 'Recording HH:MM:SS', name: 'recording_hms' },

      // Mix
      { label: 'Mix 1 Program', name: 'mix_1_program' },
      { label: 'Mix 1 Program Short Title', name: 'mix_1_program_name' },
      { label: 'Mix 1 Program GUID', name: 'mix_1_program_guid' },
      { label: 'Mix 1 Preview', name: 'mix_1_preview' },
      { label: 'Mix 1 Preview Short Title', name: 'mix_1_preview_name' },
      { label: 'Mix 1 Preview GUID', name: 'mix_1_preview_guid' },
      { label: 'Mix 2 Program', name: 'mix_2_program' },
      { label: 'Mix 2 Program Short Title', name: 'mix_2_program_name' },
      { label: 'Mix 2 Program GUID', name: 'mix_2_program_guid' },
      { label: 'Mix 2 Preview', name: 'mix_2_preview' },
      { label: 'Mix 2 Preview Short Title', name: 'mix_2_preview_name' },
      { label: 'Mix 2 Preview GUID', name: 'mix_2_preview_guid' },
      { label: 'Mix 3 Program', name: 'mix_3_program' },
      { label: 'Mix 3 Program Short Title', name: 'mix_3_program_name' },
      { label: 'Mix 3 Program GUID', name: 'mix_3_program_guid' },
      { label: 'Mix 3 Preview', name: 'mix_3_preview' },
      { label: 'Mix 3 Preview Short Title', name: 'mix_3_preview_name' },
      { label: 'Mix 3 Preview GUID', name: 'mix_3_preview_guid' },
      { label: 'Mix 4 Program', name: 'mix_4_program' },
      { label: 'Mix 4 Program Short Title', name: 'mix_4_program_name' },
      { label: 'Mix 4 Program GUID', name: 'mix_4_program_guid' },
      { label: 'Mix 4 Preview', name: 'mix_4_preview' },
      { label: 'Mix 4 Preview Short Title', name: 'mix_4_preview_name' },
      { label: 'Mix 4 Preview GUID', name: 'mix_4_preview_guid' },
      { label: 'Mix Selected', name: 'mix_selected' },

      // Audio
      { label: 'Bus Master Volume', name: 'bus_master_volume' },
      { label: 'Bus Master dB', name: 'bus_master_volume_db' },
      { label: 'Bus Master Volume Linear', name: 'bus_master_volume_linear' },
      { label: 'Bus Master MeterF1', name: 'bus_master_meterf1' },
      { label: 'Bus Master MeterF2', name: 'bus_master_meterf2' },
      { label: 'Bus Headphones Volume', name: 'bus_headphones_volume' },
      { label: 'Bus Headphones dB', name: 'bus_headphones_volume_db' },
      { label: 'Bus Headphones Volume Linear', name: 'bus_headphones_volume_linear' },
      { label: 'Bus A Volume', name: 'bus_a_volume' },
      { label: 'Bus A dB', name: 'bus_a_volume_db' },
      { label: 'Bus A Volume Linear', name: 'bus_a_volume_linear' },
      { label: 'Bus A MeterF1', name: 'bus_a_meterf1' },
      { label: 'Bus A MeterFz', name: 'bus_a_meterf2' },
      { label: 'Bus A Mute', name: 'bus_a_mute' },
      { label: 'Bus A Solo', name: 'bus_a_solo' },
      { label: 'Bus B Volume', name: 'bus_b_volume' },
      { label: 'Bus B dB', name: 'bus_b_volume_db' },
      { label: 'Bus B Volume Linear', name: 'bus_b_volume_linear' },
      { label: 'Bus B MeterF1', name: 'bus_b_meterf1' },
      { label: 'Bus B MeterFz', name: 'bus_b_meterf2' },
      { label: 'Bus B Mute', name: 'bus_b_mute' },
      { label: 'Bus B Solo', name: 'bus_b_solo' },
      { label: 'Bus C Volume', name: 'bus_c_volume' },
      { label: 'Bus C dB', name: 'bus_c_volume_db' },
      { label: 'Bus C Volume Linear', name: 'bus_c_volume_linear' },
      { label: 'Bus C MeterF1', name: 'bus_c_meterf1' },
      { label: 'Bus C MeterFz', name: 'bus_c_meterf2' },
      { label: 'Bus C Mute', name: 'bus_c_mute' },
      { label: 'Bus C Solo', name: 'bus_c_solo' },
      { label: 'Bus D Volume', name: 'bus_d_volume' },
      { label: 'Bus D dB', name: 'bus_d_volume_db' },
      { label: 'Bus D Volume Linear', name: 'bus_d_volume_linear' },
      { label: 'Bus D MeterF1', name: 'bus_d_meterf1' },
      { label: 'Bus D MeterFz', name: 'bus_d_meterf2' },
      { label: 'Bus D Mute', name: 'bus_d_mute' },
      { label: 'Bus D Solo', name: 'bus_d_solo' },
      { label: 'Bus E Volume', name: 'bus_e_volume' },
      { label: 'Bus E dB', name: 'bus_e_volume_db' },
      { label: 'Bus E Volume Linear', name: 'bus_e_volume_linear' },
      { label: 'Bus E MeterF1', name: 'bus_e_meterf1' },
      { label: 'Bus E MeterFz', name: 'bus_e_meterf2' },
      { label: 'Bus E Mute', name: 'bus_e_mute' },
      { label: 'Bus E Solo', name: 'bus_e_solo' },
      { label: 'Bus F Volume', name: 'bus_f_volume' },
      { label: 'Bus F dB', name: 'bus_f_volume_db' },
      { label: 'Bus F Volume Linear', name: 'bus_f_volume_linear' },
      { label: 'Bus F MeterF1', name: 'bus_f_meterf1' },
      { label: 'Bus F MeterFz', name: 'bus_f_meterf2' },
      { label: 'Bus F Mute', name: 'bus_f_mute' },
      { label: 'Bus F Solo', name: 'bus_f_solo' },
      { label: 'Bus G Volume', name: 'bus_g_volume' },
      { label: 'Bus G dB', name: 'bus_g_volume_db' },
      { label: 'Bus G Volume Linear', name: 'bus_g_volume_linear' },
      { label: 'Bus G MeterF1', name: 'bus_g_meterf1' },
      { label: 'Bus G MeterFz', name: 'bus_g_meterf2' },
      { label: 'Bus G Mute', name: 'bus_g_mute' },
      { label: 'Bus G Solo', name: 'bus_g_solo' },

      // Overlay
      { label: 'Overlay 1 Input Short Title', name: 'overlay_1_input_name' },
      { label: 'Overlay 1 Input Number', name: 'overlay_1_input' },
      { label: 'Overlay 1 Active PGM', name: 'overlay_1_pgm' },
      { label: 'Overlay 1 Active PRV', name: 'overlay_1_prv' },
      { label: 'Overlay 2 Input Short Title', name: 'overlay_2_input_name' },
      { label: 'Overlay 2 Input Number', name: 'overlay_2_input' },
      { label: 'Overlay 2 Active PGM', name: 'overlay_2_pgm' },
      { label: 'Overlay 2 Active PRV', name: 'overlay_2_prv' },
      { label: 'Overlay 3 Input Short Title', name: 'overlay_3_input_name' },
      { label: 'Overlay 3 Input Number', name: 'overlay_3_input' },
      { label: 'Overlay 3 Active PGM', name: 'overlay_3_pgm' },
      { label: 'Overlay 3 Active PRV', name: 'overlay_3_prv' },
      { label: 'Overlay 4 Input Short Title', name: 'overlay_4_input_name' },
      { label: 'Overlay 4 Input Number', name: 'overlay_4_input' },
      { label: 'Overlay 4 Active PGM', name: 'overlay_4_pgm' },
      { label: 'Overlay 4 Active PRV', name: 'overlay_4_prv' },

      // Dyanmic Inputs/Values
      { label: 'Dynamic Input 1', name: 'dynamic_input_1' },
      { label: 'Dynamic Input 2', name: 'dynamic_input_2' },
      { label: 'Dynamic Input 3', name: 'dynamic_input_3' },
      { label: 'Dynamic Input 4', name: 'dynamic_input_4' },
      { label: 'Dynamic Value 1', name: 'dynamic_value_1' },
      { label: 'Dynamic Value 2', name: 'dynamic_value_2' },
      { label: 'Dynamic Value 3', name: 'dynamic_value_3' },
      { label: 'Dynamic Value 4', name: 'dynamic_value_4' },

      // Layers
      { label: 'Layer Routing Input', name: 'layer_routing_input' },
      { label: 'Layer Routing Layer', name: 'layer_routing_layer' },
    ])

    // Inputs
    const inputNumberVariables = new Set<InstanceVariableDefinition>()
    const inputNameVariables = new Set<InstanceVariableDefinition>()
    const inputKeyVariables = new Set<InstanceVariableDefinition>()

    this.instance.data.inputs.forEach((input) => {
      const inputName = input.shortTitle
        ? input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '')
        : input.title.replace(/[^a-z0-9-_.]+/gi, '')

      inputNumberVariables.add({ label: `Input ${input.number} Short Title`, name: `input_${input.number}_name` })
      inputNumberVariables.add({ label: `Input ${input.number} GUID`, name: `input_${input.number}_guid` })
      inputNumberVariables.add({ label: `Input ${input.number} Type`, name: `input_${input.number}_type` })
      inputNameVariables.add({
        label: `Input ${input.shortTitle || input.title} Number`,
        name: `input_${inputName.toLowerCase()}_number`,
      })
      inputNameVariables.add({
        label: `Input ${input.shortTitle || input.title} GUID`,
        name: `input_${inputName.toLowerCase()}_guid`,
      })
      inputNameVariables.add({
        label: `Input ${input.shortTitle || input.title} Type`,
        name: `input_${inputName.toLowerCase()}_type`,
      })
      inputKeyVariables.add({ label: `Input ${input.key} Short Title`, name: `input_${input.key}_name` })
      inputKeyVariables.add({ label: `Input ${input.key} Number`, name: `input_${input.key}_number` })
      inputKeyVariables.add({ label: `Input ${input.key} Type`, name: `input_${input.key}_type` })

      this.instance.data.mix.forEach((mix) => {
        inputNumberVariables.add({
          label: `Input ${input.number} Mix ${mix.number} Tally Preview`,
          name: `input_${input.number}_mix_${mix.number}_tally_preview`,
        })
        inputNumberVariables.add({
          label: `Input ${input.number} Mix ${mix.number} Tally Program`,
          name: `input_${input.number}_mix_${mix.number}_tally_program`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Mix ${mix.number} Tally Preview`,
          name: `input_${input.shortTitle || input.title}_mix_${mix.number}_tally_preview`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Mix ${mix.number} Tally Program`,
          name: `input_${input.shortTitle || input.title}_mix_${mix.number}_tally_program`,
        })
        inputKeyVariables.add({
          label: `Input ${input.key} Mix ${mix.number} Tally Preview`,
          name: `input_${input.key}_mix_${mix.number}_tally_preview`,
        })
        inputKeyVariables.add({
          label: `Input ${input.key} Mix ${mix.number} Tally Program`,
          name: `input_${input.key}_mix_${mix.number}_tally_program`,
        })
      })

      inputNumberVariables.add({ label: `Input ${input.number} Muted`, name: `input_${input.number}_mute` })
      inputNumberVariables.add({ label: `Input ${input.number} Audio`, name: `input_${input.number}_audio` })
      inputNameVariables.add({
        label: `Input ${input.shortTitle || input.title} Muted`,
        name: `input_${inputName.toLowerCase()}_mute`,
      })
      inputNameVariables.add({
        label: `Input ${input.shortTitle || input.title} Audio`,
        name: `input_${inputName.toLowerCase()}_audio`,
      })
      inputKeyVariables.add({ label: `Input ${input.key} Muted`, name: `input_${input.key}_mute` })
      inputKeyVariables.add({ label: `Input ${input.key} Audio`, name: `input_${input.key}_audio` })

      if (input.duration > 1) {
        inputNumberVariables.add({ label: `Input ${input.number} Duration`, name: `input_${input.number}_duration` })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Duration`,
          name: `input_${inputName.toLowerCase()}_duration`,
        })
        inputKeyVariables.add({ label: `Input ${input.key} Duration`, name: `input_${input.key}_duration` })
      }

      if (input.position !== undefined) {
        inputNumberVariables.add({
          label: `Input ${input.number} Remaining ss`,
          name: `input_${input.number}_remaining_ss`,
        })
        inputNumberVariables.add({
          label: `Input ${input.number} Remaining ss.ms`,
          name: `input_${input.number}_remaining_ss.ms`,
        })
        inputNumberVariables.add({
          label: `Input ${input.number} Remaining mm:ss`,
          name: `input_${input.number}_remaining_mm:ss`,
        })
        inputNumberVariables.add({
          label: `Input ${input.number} Remaining mm:ss.ms`,
          name: `input_${input.number}_remaining_mm:ss.ms`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Remaining ss`,
          name: `input_${inputName.toLowerCase()}_remaining_ss`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Remaining ss.ms`,
          name: `input_${inputName.toLowerCase()}_remaining_ss.ms`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Remaining mm:ss`,
          name: `input_${inputName.toLowerCase()}_remaining_mm:ss`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Remaining mm:ss.ms`,
          name: `input_${inputName.toLowerCase()}_remaining_mm:ss.ms`,
        })
        inputKeyVariables.add({ label: `Input ${input.key} Remaining ss`, name: `input_${input.key}_remaining_ss` })
        inputKeyVariables.add({
          label: `Input ${input.key} Remaining ss.ms`,
          name: `input_${input.key}_remaining_ss.ms`,
        })
        inputKeyVariables.add({
          label: `Input ${input.key} Remaining mm:ss`,
          name: `input_${input.key}_remaining_mm:ss`,
        })
        inputKeyVariables.add({
          label: `Input ${input.key} Remaining mm:ss.ms`,
          name: `input_${input.key}_remaining_mm:ss.ms`,
        })
      }

      for (let i = 1; i < 11; i++) {
        inputNumberVariables.add({
          label: `Input ${input.number} layer ${i} Name`,
          name: `input_${input.number}_layer_${i}_name`,
        })
        inputNumberVariables.add({
          label: `Input ${input.number} layer ${i} Number`,
          name: `input_${input.number}_layer_${i}_number`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} layer ${i} Name`,
          name: `input_${inputName.toLowerCase()}_layer_${i}_name`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} layer ${i} Number`,
          name: `input_${inputName.toLowerCase()}_layer_${i}_number`,
        })
        inputKeyVariables.add({
          label: `Input ${input.key} layer ${i} Name`,
          name: `input_${input.key}_layer_${i}_name`,
        })
        inputKeyVariables.add({
          label: `Input ${input.key} layer ${i} Number`,
          name: `input_${input.key}_layer_${i}_number`,
        })
      }

      if (input.text) {
        input.text.forEach((textLayer) => {
          inputNumberVariables.add({
            label: `Input ${input.number} layer ${textLayer.index} Title Text`,
            name: `input_${input.number}_layer_${textLayer.index}_titletext`,
          })
          inputNameVariables.add({
            label: `Input ${input.shortTitle || input.title} layer ${textLayer.index} Title Text`,
            name: `input_${inputName.toLowerCase()}_layer_${textLayer.index}_titletext`,
          })
          inputKeyVariables.add({
            label: `Input ${input.key} layer ${textLayer.index} Title Text`,
            name: `input_${input.key}_layer_${textLayer.index}_titletext`,
          })
        })
      }

      if (input.type === 'VideoList') {
        inputNumberVariables.add({
          label: `Input ${input.number} Selected Index`,
          name: `input_${input.number}_selected`,
        })
        inputNumberVariables.add({
          label: `Input ${input.number} Selected Index Name`,
          name: `input_${input.number}_selected_name`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Selected Index`,
          name: `input_${inputName.toLowerCase()}_selected`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Selected Index Name`,
          name: `input_${inputName.toLowerCase()}_selected_name`,
        })
        inputKeyVariables.add({ label: `Input ${input.key} Selected Index`, name: `input_${input.key}_selected` })
        inputKeyVariables.add({
          label: `Input ${input.key} Selected Index Name`,
          name: `input_${input.key}_selected_name`,
        })
      }

      if (input.type === 'VideoCall') {
        inputNumberVariables.add({
          label: `Input ${input.number} Call Password`,
          name: `input_${input.number}_call_password`,
        })
        inputNumberVariables.add({
          label: `Input ${input.number} Call Connected`,
          name: `input_${input.number}_call_connected`,
        })
        inputNumberVariables.add({
          label: `Input ${input.number} Call Video Source`,
          name: `input_${input.number}_call_video_source`,
        })
        inputNumberVariables.add({
          label: `Input ${input.number} Call Audio Source`,
          name: `input_${input.number}_call_audio_source`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Call Password`,
          name: `input_${inputName.toLowerCase()}_call_password`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Call Connected`,
          name: `input_${inputName.toLowerCase()}_call_connected`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Call Video Source`,
          name: `input_${inputName.toLowerCase()}_call_video_source`,
        })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} Call Audio Source`,
          name: `input_${inputName.toLowerCase()}_call_audio_source`,
        })
        inputKeyVariables.add({ label: `Input ${input.key} Call Password`, name: `input_${input.key}_call_password` })
        inputKeyVariables.add({ label: `Input ${input.key} Call Connected`, name: `input_${input.key}_call_connected` })
        inputKeyVariables.add({
          label: `Input ${input.key} Call Video Source`,
          name: `input_${input.key}_call_video_source`,
        })
        inputKeyVariables.add({
          label: `Input ${input.key} Call Audio Source`,
          name: `input_${input.key}_call_audio_source`,
        })
      }

      inputNumberVariables.add({ label: `Input ${input.number} Volume`, name: `input_${input.number}_volume` })
      inputNumberVariables.add({ label: `Input ${input.number} Volume dB`, name: `input_${input.number}_volume_db` })
      inputNumberVariables.add({
        label: `Input ${input.number} Volume Linear`,
        name: `input_${input.number}_volume_linear`,
      })
      inputNameVariables.add({
        label: `Input ${input.shortTitle || input.title} Volume`,
        name: `input_${inputName.toLowerCase()}_volume`,
      })
      inputNameVariables.add({
        label: `Input ${input.shortTitle || input.title} Volume dB`,
        name: `input_${inputName.toLowerCase()}_volume_db`,
      })
      inputNameVariables.add({
        label: `Input ${input.shortTitle || input.title} Volume Linear`,
        name: `input_${inputName.toLowerCase()}_volume_linear`,
      })
      inputKeyVariables.add({ label: `Input ${input.key} Volume`, name: `input_${input.key}_volume` })
      inputKeyVariables.add({ label: `Input ${input.key} Volume dB`, name: `input_${input.key}_volume_db` })
      inputKeyVariables.add({ label: `Input ${input.key} Volume Linear`, name: `input_${input.key}_volume_linear` })

      if (input.meterF1 !== undefined) {
        inputNumberVariables.add({ label: `Input ${input.number} MeterF1`, name: `input_${input.number}_meterf1` })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} MeterF1`,
          name: `input_${inputName.toLowerCase()}_meterf1`,
        })
        inputKeyVariables.add({ label: `Input ${input.key} MeterF1`, name: `input_${input.key}_meterf1` })
      }

      if (input.meterF2 !== undefined) {
        inputNumberVariables.add({ label: `Input ${input.number} MeterF2`, name: `input_${input.number}_meterf2` })
        inputNameVariables.add({
          label: `Input ${input.shortTitle || input.title} MeterF2`,
          name: `input_${inputName.toLowerCase()}_meterf2`,
        })
        inputKeyVariables.add({ label: `Input ${input.key} MeterF2`, name: `input_${input.key}_meterf2` })
      }
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
   * @description Update variables
   */
  public readonly updateVariables = (): void => {
    const newVariables: InstanceVariableValue = {}

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
    mixId.forEach((id) => {
      newVariables[`mix_${id + 1}_program`] = this.instance.data.mix[id].program
      newVariables[`mix_${id + 1}_program_name`] = this.instance.data.getInputTitle(this.instance.data.mix[id].program)
      newVariables[`mix_${id + 1}_program_guid`] = this.instance.data.getInput(this.instance.data.mix[id].program)
        ? this.instance.data.getInput(this.instance.data.mix[id].program)?.key
        : ''
      newVariables[`mix_${id + 1}_preview`] = this.instance.data.mix[id].preview
      newVariables[`mix_${id + 1}_preview_name`] = this.instance.data.getInputTitle(this.instance.data.mix[id].preview)
      newVariables[`mix_${id + 1}_preview_guid`] = this.instance.data.getInput(this.instance.data.mix[id].preview)
        ? this.instance.data.getInput(this.instance.data.mix[id].preview)?.key
        : ''
    })

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
        volume = Math.round(volume)
        volumedB = volumeTodB(volume).toFixed(1)
        volumeLinear = volumeToLinear(volume)
      } else {
        volume = ''
        volumedB = ''
        volumeLinear = ''
      }

      newVariables[`bus_${id.toLowerCase()}_volume`] = volume
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
    const getOverlayInput = (id: number): Input | null => {
      const overlay = this.instance.data.overlays[id - 1]

      return overlay && overlay.input !== null ? this.instance.data.getInput(overlay.input) : null
    }

    const overlays = [0, 1, 2, 3]
    overlays.forEach((id) => {
      if (this.instance.data.overlays[id] && this.instance.data.overlays[id].input !== null) {
        newVariables[`overlay_${id + 1}_input_name`] =
          getOverlayInput(id + 1)?.shortTitle || getOverlayInput(id + 1)?.title || ''
        newVariables[`overlay_${id + 1}_input`] = getOverlayInput(id + 1)?.number || ''
        newVariables[`overlay_${id + 1}_pgm`] = (!this.instance.data.overlays[id].preview).toString()
        newVariables[`overlay_${id + 1}_prv`] = this.instance.data.overlays[id].preview.toString()
      } else {
        newVariables[`overlay_${id + 1}_input_name`] = ''
        newVariables[`overlay_${id + 1}_input`] = ''
        newVariables[`overlay_${id + 1}_pgm`] = 'false'
        newVariables[`overlay_${id + 1}_prv`] = 'false'
      }
    })

    // Layers
    const layerRoutingInput = this.instance.data.getInput(this.instance.routingData.layer.destinationInput || '')
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

    this.instance.data.inputs.forEach((input) => {
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

      if (input.position !== undefined) {
        const inPosition = input.position
        const outPosition = input.markOut ? input.markOut : input.duration
        const duration = outPosition - inPosition
        const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

        const mm = (time: number): string => padding(Math.floor(time / 60000))
        const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
        const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

        newVariables[`input_${input.number}_remaining_ss`] = `${padding(Math.floor(duration / 1000))}`
        newVariables[`input_${input.number}_remaining_ss.ms`] = `${padding(Math.floor(duration / 1000))}.${ms(
          duration
        )}`
        newVariables[`input_${input.number}_remaining_mm:ss`] = `${mm(duration)}:${ss(duration)}`
        newVariables[`input_${input.number}_remaining_mm:ss.ms`] = `${mm(duration)}:${ss(duration)}.${ms(duration)}`
        newVariables[`input_${input.key}_remaining_ss`] = `${padding(Math.floor(duration / 1000))}`
        newVariables[`input_${input.key}_remaining_ss.ms`] = `${padding(Math.floor(duration / 1000))}.${ms(duration)}`
        newVariables[`input_${input.key}_remaining_mm:ss`] = `${mm(duration)}:${ss(duration)}`
        newVariables[`input_${input.key}_remaining_mm:ss.ms`] = `${mm(duration)}:${ss(duration)}.${ms(duration)}`

        if (useNamedInput) {
          newVariables[`input_${inputName.toLowerCase()}_remaining_ss`] = `${padding(Math.floor(duration / 1000))}`
          newVariables[`input_${inputName.toLowerCase()}_remaining_ss.ms`] = `${padding(
            Math.floor(duration / 1000)
          )}.${ms(duration)}`
          newVariables[`input_${inputName.toLowerCase()}_remaining_mm:ss`] = `${mm(duration)}:${ss(duration)}`
          newVariables[`input_${inputName.toLowerCase()}_remaining_mm:ss.ms`] = `${mm(duration)}:${ss(duration)}.${ms(
            duration
          )}`
        }
      }

      for (let i = 1; i < 11; i++) {
        newVariables[`input_${input.number}_layer_${i + 1}_name`] = ''
        newVariables[`input_${input.number}_layer_${i + 1}_number`] = ''
        newVariables[`input_${input.key}_layer_${i + 1}_name`] = ''
        newVariables[`input_${input.key}_layer_${i + 1}_number`] = ''

        if (useNamedInput) {
          newVariables[`input_${inputName.toLowerCase()}_layer_${i + 1}_name`] = ''
          newVariables[`input_${inputName.toLowerCase()}_layer_${i + 1}_number`] = ''
        }
      }

      input.overlay?.forEach((layer) => {
        const overlayInput = this.instance.data.getInput(layer.key)
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
      })

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
        volume = Math.round(input.volume)
        volumedB = volumeTodB(input.volume).toFixed(1)
        volumeLinear = volumeToLinear(input.volume)
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
    })

    this.set(newVariables)

    this.updateDefinitions()
  }
}
