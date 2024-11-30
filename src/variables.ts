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
  public currentVariables: any = {}

  constructor(instance: VMixInstance) {
    this.instance = instance
  }

  /**
   * @param variables Object of variable names and their values
   * @description Updates or removes variable for current instance
   */
  public readonly set = (variables: InstanceVariableValue): void => {
    const newVariables: { [variableId: string]: string | undefined } = {}
    const changes: { [variableId: string]: string | undefined } = {}

    for (const name in variables) {
      if (this.currentVariables[name] !== variables[name]) changes[name] = variables[name]?.toString()
      newVariables[name] = variables[name]?.toString()
    }

    for (const name in this.currentVariables) {
      if (variables[name] === undefined) {
        changes[name] = undefined
      }
    }

    this.currentVariables = newVariables
    this.instance.setVariableValues(changes)
    this.instance.checkFeedbacks('buttonText')

    if (this.instance.apiProcessing.hold) {
      this.instance.apiProcessing.variables = new Date().getTime()
      const duration = this.instance.apiProcessing.variables - this.instance.apiProcessing.request
      const freshStart = new Date().getTime() - this.instance.startTime.getTime() < 5000

      if (duration > this.instance.config.apiPollInterval && !freshStart) {
        if (duration > this.instance.config.apiPollInterval * 3) {
          this.instance.log(
            'warn',
            `API Processing took ${duration}ms, but the API Polling Interval is set to ${this.instance.config.apiPollInterval}ms`
          )
        } else {
          this.instance.log(
            'debug',
            `API Processing took ${duration}ms, but the API Polling Interval is set to ${this.instance.config.apiPollInterval}ms`
          )
        }
      }

      this.instance.apiProcessing = {
        hold: false,
        holdCount: 0,
        request: 0,
        response: 0,
        parsed: 0,
        feedbacks: 0,
        variables: 0,
      }
    }
  }

  /**
   * @description Sets variable definitions
   */
  public readonly updateDefinitions = async (): Promise<void> => {
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
      { name: 'Stream 3 Active', variableId: 'stream_3_active' },
      { name: 'Stream 3 Active', variableId: 'stream_3_active' },
      { name: 'Recording Active', variableId: 'recording_active' },
      { name: 'Recording Duration', variableId: 'recording_duration' },
      { name: 'Recording HH:MM:SS', variableId: 'recording_hms' },
      { name: 'Recording File Name 1', variableId: 'recording_filename1' },
      { name: 'Recording File Path 1', variableId: 'recording_filepath1' },
      { name: 'Recording File Name 2', variableId: 'recording_filename2' },
      { name: 'Recording File Path 2', variableId: 'recording_filepath2' },

      // Audio
      { name: 'Bus Any Solo', variableId: 'bus_any_solo' },

      // Input
      { name: 'Input Any Solo', variableId: 'input_any_solo' },

      // Output
      { name: 'Fullscreen 1 Source', variableId: 'fullscreen_1_source' },
      { name: 'Fullscreen 2 Source', variableId: 'fullscreen_2_source' },
      { name: 'Output 1 Source', variableId: 'output_1_source' },
      { name: 'Output 1 NDI', variableId: 'output_1_ndi' },
      { name: 'Output 1 SRT', variableId: 'output_1_srt' },
      { name: 'Output 2 Source', variableId: 'output_2_source' },
      { name: 'Output 2 NDI', variableId: 'output_2_ndi' },
      { name: 'Output 2 SRT', variableId: 'output_2_srt' },
      { name: 'Output 3 Source', variableId: 'output_3_source' },
      { name: 'Output 3 NDI', variableId: 'output_3_ndi' },
      { name: 'Output 3 SRT', variableId: 'output_3_srt' },
      { name: 'Output 4 Source', variableId: 'output_4_source' },
      { name: 'Output 4 NDI', variableId: 'output_4_ndi' },
      { name: 'Output 4 SRT', variableId: 'output_4_srt' },

      // Layers
      { name: 'Layer Routing Input', variableId: 'layer_routing_input' },
      { name: 'Layer Routing Layer', variableId: 'layer_routing_layer' },

      // Replay
      { name: 'Replay Recording', variableId: 'replay_recording' },
      { name: 'Replay Live', variableId: 'replay_live' },
      { name: 'Replay Forward', variableId: 'replay_forward' },
      { name: 'Replay Channel Mode', variableId: 'replay_channel_mode' },
      { name: 'Replay Events', variableId: 'replay_events' },
      { name: 'Replay Events A', variableId: 'replay_eventsa' },
      { name: 'Replay Events B', variableId: 'replay_eventsb' },
      { name: 'Replay Camera A', variableId: 'replay_cameraa' },
      { name: 'Replay Camera B', variableId: 'replay_camerab' },
      { name: 'Replay Speed', variableId: 'replay_speed' },
      { name: 'Replay Speed A', variableId: 'replay_speeda' },
      { name: 'Replay Speed B', variableId: 'replay_speedb' },
      { name: 'Replay Timecode', variableId: 'replay_timecode' },
      { name: 'Replay Timecode A', variableId: 'replay_timecodea' },
      { name: 'Replay Timecode B', variableId: 'replay_timecodeb' },
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
          variables.add({ name: `Bus ${bus} Send to Master`, variableId: `bus_${bus.toLowerCase()}_sendtomaster` })
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
      this.instance.data.mix
        .filter((mix) => mix.active)
        .forEach((mix) => {
          variables.add({ name: `Mix ${mix.number} ${type}`, variableId: `mix_${mix.number}_${type.toLowerCase()}` })
          variables.add({
            name: `Mix ${mix.number} ${type} Short Title`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_name`,
          })
          variables.add({
            name: `Mix ${mix.number} ${type} GUID`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_guid`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Frame Delay`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_framedelay`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F1`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf1`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F2`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf2`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F1 Avg 1s`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf1_avg_1s`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F2 Avg 1s`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf2_avg_1s`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F1 Avg 3s`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf1_avg_3s`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F2 Avg 3s`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf2_avg_3s`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F1 Peak 1s`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf1_peak_1s`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F2 Peak 1s`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf2_peak_1s`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F1 Peak 3s`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf1_peak_3s`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Meter F2 Peak 3s`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_meterf2_peak_3s`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Duration`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_duration`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Remaining`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_remaining`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Position Pan X`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_position_panx`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Position Pan Y`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_position_pany`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Position Zoom X`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_position_zoomx`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Position Zoom X`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_position_zoomx`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Position Crop X1`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_position_cropx1`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Position Crop X2`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_position_cropx2`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Position Crop Y1`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_position_cropy1`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} Position Crop Y2`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_position_cropy2`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Hue`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_hue`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Saturation`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_saturation`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Lift R`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_liftr`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Lift G`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_liftg`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Lift B`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_liftb`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Lift Y`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_lifty`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Gamma R`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_gammar`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Gamma G`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_gammag`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Gamma B`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_gammab`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Gamma Y`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_gammay`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Gain R`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_gainr`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Gain G`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_gaing`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Gain B`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_gainb`,
          })

          variables.add({
            name: `Mix ${mix.number} ${type} CC Gain Y`,
            variableId: `mix_${mix.number}_${type.toLowerCase()}_cc_gainy`,
          })

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
    for (let dynamic = 0; dynamic < 4; dynamic++) {
      variables.add({ name: `Dynamic Input ${dynamic + 1}`, variableId: `dynamic_input_${dynamic + 1}` })
      variables.add({ name: `Dynamic Value ${dynamic + 1}`, variableId: `dynamic_value_${dynamic + 1}` })

      const input = await this.instance.data.getInput(this.instance.data.dynamicInput[dynamic]?.value)

      if (input) {
        variables.add({
          name: `Dynamic Input ${dynamic + 1} Short Title`,
          variableId: `dynamic_input_${dynamic + 1}_name`,
        })
        variables.add({ name: `Dynamic Input ${dynamic + 1} GUID`, variableId: `dynamic_input_${dynamic + 1}_guid` })
        variables.add({ name: `Dynamic Input ${dynamic + 1} Type`, variableId: `dynamic_input_${dynamic + 1}_type` })

        this.instance.data.mix
          .filter((mix) => mix.active)
          .forEach((mix) => {
            variables.add({
              name: `Dynamic Input ${dynamic + 1} Mix ${mix.number} Tally Preview`,
              variableId: `dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_preview`,
            })
            variables.add({
              name: `Dynamic Input ${dynamic + 1} Mix ${mix.number} Tally Program`,
              variableId: `dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_program`,
            })
          })

        variables.add({
          name: `Dynamic Input ${dynamic + 1} Playing`,
          variableId: `dynamic_input_${dynamic + 1}_playing`,
        })
        variables.add({ name: `Dynamic Input ${dynamic + 1} Loop`, variableId: `dynamic_input_${dynamic + 1}_loop` })
        variables.add({ name: `Dynamic Input ${dynamic + 1} Muted`, variableId: `dynamic_input_${dynamic + 1}_mute` })
        variables.add({ name: `Dynamic Input ${dynamic + 1} Audio`, variableId: `dynamic_input_${dynamic + 1}_audio` })
        variables.add({ name: `Dynamic Input ${dynamic + 1} Solo`, variableId: `dynamic_input_${dynamic + 1}_solo` })

        if (input.duration > 1) {
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Duration`,
            variableId: `dynamic_input_${dynamic + 1}_duration`,
          })
        }

        if (input.position !== undefined) {
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Remaining`,
            variableId: `dynamic_input_${dynamic + 1}_remaining`,
          })
        }

        for (let i = 1; i < 11; i++) {
          variables.add({
            name: `Dynamic Input ${dynamic + 1} layer ${i} Name`,
            variableId: `dynamic_input_${dynamic + 1}_layer_${i}_name`,
          })
          variables.add({
            name: `Dynamic Input ${dynamic + 1} layer ${i} Number`,
            variableId: `dynamic_input_${dynamic + 1}_layer_${i}_number`,
          })
        }

        if (input.text) {
          input.text.forEach((textLayer) => {
            variables.add({
              name: `Dynamic Input ${dynamic + 1} layer ${textLayer.index} Title Text`,
              variableId: `dynamic_input_${dynamic + 1}_layer_${textLayer.index}_titletext`,
            })
          })
        }

        if (input.type === 'VideoList' || input.type === 'VirtualSet') {
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Selected Index`,
            variableId: `dynamic_input_${dynamic + 1}_selected`,
          })
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Selected Index Name`,
            variableId: `dynamic_input_${dynamic + 1}_selected_name`,
          })
        }

        if (input.list) {
          input.list.forEach((listItem) => {
            variables.add({
              name: `Dynamic Input ${dynamic + 1} List ${listItem.index + 1} Name`,
              variableId: `dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_name`,
            })
            variables.add({
              name: `Dynamic Input ${dynamic + 1} List ${listItem.index + 1} Selected`,
              variableId: `dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_selected`,
            })
          })
        }

        if (input.type === 'VideoCall') {
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Call Password`,
            variableId: `dynamic_input_${dynamic + 1}_call_password`,
          })
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Call Connected`,
            variableId: `dynamic_input_${dynamic + 1}_call_connected`,
          })
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Call Video Source`,
            variableId: `dynamic_input_${dynamic + 1}_call_video_source`,
          })
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Call Audio Source`,
            variableId: `dynamic_input_${dynamic + 1}_call_audio_source`,
          })
        }

        variables.add({
          name: `Dynamic Input ${dynamic + 1} Volume`,
          variableId: `dynamic_input_${dynamic + 1}_volume`,
        })
        variables.add({
          name: `Dynamic Input ${dynamic + 1} Volume dB`,
          variableId: `dynamic_input_${dynamic + 1}_volume_db`,
        })
        variables.add({
          name: `Dynamic Input ${dynamic + 1} Volume Linear`,
          variableId: `dynamic_input_${dynamic + 1}_volume_linear`,
        })

        if (input.volumeF1 !== undefined) {
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Volume F1`,
            variableId: `dynamic_input_${dynamic + 1}_volume_f1`,
          })
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Volume F1 dB`,
            variableId: `dynamic_input_${dynamic + 1}_volume_f1_db`,
          })
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Volume F1 Linear`,
            variableId: `dynamic_input_${dynamic + 1}_volume_f1_linear`,
          })
        }

        if (input.volumeF2 !== undefined) {
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Volume F2`,
            variableId: `dynamic_input_${dynamic + 1}_volume_f2`,
          })
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Volume F2 dB`,
            variableId: `dynamic_input_${dynamic + 1}_volume_f2_db`,
          })
          variables.add({
            name: `Dynamic Input ${dynamic + 1} Volume F2 Linear`,
            variableId: `dynamic_input_${dynamic + 1}_volume_f2_linear`,
          })
        }

        if (input.meterF1 !== undefined) {
          variables.add({
            name: `Dynamic Input ${dynamic + 1} MeterF1`,
            variableId: `dynamic_input_${dynamic + 1}_meterf1`,
          })
        }

        if (input.meterF2 !== undefined) {
          variables.add({
            name: `Dynamic Input ${dynamic + 1} MeterF2`,
            variableId: `dynamic_input_${dynamic + 1}_meterf2`,
          })
        }

        variables.add({
          name: `Dynamic Input ${dynamic + 1} Frame Delay`,
          variableId: `dynamic_input_${dynamic + 1}_framedelay`,
        })
      }
    }

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

        this.instance.data.mix
          .filter((mix) => mix.active)
          .forEach((mix) => {
            inputSet.add({
              name: `Input ${title} Mix ${mix.number} Tally Preview`,
              variableId: `input_${type}_mix_${mix.number}_tally_preview`,
            })
            inputSet.add({
              name: `Input ${title} Mix ${mix.number} Tally Program`,
              variableId: `input_${type}_mix_${mix.number}_tally_program`,
            })
          })

        inputSet.add({ name: `Input ${title} Playing`, variableId: `input_${type}_playing` })
        inputSet.add({ name: `Input ${title} Loop`, variableId: `input_${type}_loop` })
        inputSet.add({ name: `Input ${title} Muted`, variableId: `input_${type}_mute` })
        inputSet.add({ name: `Input ${title} Audio`, variableId: `input_${type}_audio` })
        inputSet.add({ name: `Input ${title} Solo`, variableId: `input_${type}_solo` })

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
          inputSet.add({
            name: `Input ${title} layer ${i} Key`,
            variableId: `input_${type}_layer_${i}_key`,
          })

          if (this.instance.config.variablesShowInputLayerPosition) {
            inputSet.add({
              name: `Input ${title} layer ${i} Pan X (Percent)`,
              variableId: `input_${type}_layer_${i}_panx`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Pan Y (Percent)`,
              variableId: `input_${type}_layer_${i}_pany`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Pan X (Pixels)`,
              variableId: `input_${type}_layer_${i}_x`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Pan Y (Pixels)`,
              variableId: `input_${type}_layer_${i}_y`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Zoom X`,
              variableId: `input_${type}_layer_${i}_zoomx`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Zoom Y`,
              variableId: `input_${type}_layer_${i}_zoomy`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Width`,
              variableId: `input_${type}_layer_${i}_width`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Height`,
              variableId: `input_${type}_layer_${i}_height`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Crop X1`,
              variableId: `input_${type}_layer_${i}_cropx1`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Crop X2`,
              variableId: `input_${type}_layer_${i}_cropx2`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Crop Y1`,
              variableId: `input_${type}_layer_${i}_cropy1`,
            })
            inputSet.add({
              name: `Input ${title} layer ${i} Crop Y2`,
              variableId: `input_${type}_layer_${i}_cropy2`,
            })
          }
        }

        if (input.text) {
          input.text.forEach((textLayer) => {
            inputSet.add({
              name: `Input ${title} layer ${textLayer.index} Title Text`,
              variableId: `input_${type}_layer_${textLayer.index}_titletext`,
            })
          })
        }

        if (input.type === 'VideoList' || input.type === 'VirtualSet') {
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
          input.list.forEach((listItem) => {
            inputSet.add({
              name: `Input ${title} List ${listItem.index + 1} Name`,
              variableId: `input_${type}_list_${listItem.index + 1}_name`,
            })
            inputSet.add({
              name: `Input ${title} List ${listItem.index + 1} Selected`,
              variableId: `input_${type}_list_${listItem.index + 1}_selected`,
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
        inputSet.add({ name: `Input ${title} Frame Delay`, variableId: `input_${type}_framedelay` })

        if (input.volumeF1 !== undefined) {
          inputSet.add({ name: `Input ${title} Volume F1`, variableId: `input_${type}_volume_f1` })
          inputSet.add({ name: `Input ${title} Volume F1 dB`, variableId: `input_${type}_volume_f1_db` })
          inputSet.add({ name: `Input ${title} Volume F1 Linear`, variableId: `input_${type}_volume_f1_linear` })
        }

        if (input.volumeF2 !== undefined) {
          inputSet.add({ name: `Input ${title} Volume F2`, variableId: `input_${type}_volume_f2` })
          inputSet.add({ name: `Input ${title} Volume F2 dB`, variableId: `input_${type}_volume_f2_db` })
          inputSet.add({ name: `Input ${title} Volume F2 Linear`, variableId: `input_${type}_volume_f2_linear` })
        }

        if (input.meterF1 !== undefined) {
          inputSet.add({ name: `Input ${title} MeterF1`, variableId: `input_${type}_meterf1` })
        }

        if (input.meterF2 !== undefined) {
          inputSet.add({ name: `Input ${title} MeterF2`, variableId: `input_${type}_meterf2` })
        }
        if (this.instance.config.variablesShowInputPosition) {
          inputSet.add({ name: `Input ${title} Position Pan X`, variableId: `input_${type}_position_panx` })
          inputSet.add({ name: `Input ${title} Position Pan Y`, variableId: `input_${type}_position_pany` })
          inputSet.add({ name: `Input ${title} Position Zoom X`, variableId: `input_${type}_position_zoomx` })
          inputSet.add({ name: `Input ${title} Position Zoom X`, variableId: `input_${type}_position_zoomy` })
          inputSet.add({ name: `Input ${title} Position Crop X1`, variableId: `input_${type}_position_cropx1` })
          inputSet.add({ name: `Input ${title} Position Crop X2`, variableId: `input_${type}_position_cropx2` })
          inputSet.add({ name: `Input ${title} Position Crop Y1`, variableId: `input_${type}_position_cropy1` })
          inputSet.add({ name: `Input ${title} Position Crop Y2`, variableId: `input_${type}_position_cropy2` })

          inputSet.add({ name: `Input ${title} Colour Correction Hue`, variableId: `input_${type}_cc_hue` })
          inputSet.add({
            name: `Input ${title} Colour Correction Saturation`,
            variableId: `input_${type}_cc_saturation`,
          })
          inputSet.add({ name: `Input ${title} Colour Correction Lift R`, variableId: `input_${type}_cc_liftr` })
          inputSet.add({ name: `Input ${title} Colour Correction Lift G`, variableId: `input_${type}_cc_liftg` })
          inputSet.add({ name: `Input ${title} Colour Correction Lift B`, variableId: `input_${type}_cc_liftb` })
          inputSet.add({ name: `Input ${title} Colour Correction Lift Y`, variableId: `input_${type}_cc_lifty` })
          inputSet.add({ name: `Input ${title} Colour Correction Gamma R`, variableId: `input_${type}_cc_gammar` })
          inputSet.add({ name: `Input ${title} Colour Correction Gamma G`, variableId: `input_${type}_cc_gammag` })
          inputSet.add({ name: `Input ${title} Colour Correction Gamma B`, variableId: `input_${type}_cc_gammab` })
          inputSet.add({ name: `Input ${title} Colour Correction Gamma Y`, variableId: `input_${type}_cc_gammay` })
          inputSet.add({ name: `Input ${title} Colour Correction Gain R`, variableId: `input_${type}_cc_gainr` })
          inputSet.add({ name: `Input ${title} Colour Correction Gain G`, variableId: `input_${type}_cc_gaing` })
          inputSet.add({ name: `Input ${title} Colour Correction Gain B`, variableId: `input_${type}_cc_gainb` })
          inputSet.add({ name: `Input ${title} Colour Correction Gain Y`, variableId: `input_${type}_cc_gainy` })
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

    const calcDuration = (
      input: Input
    ): { ms: string; ss: string; ssms: string; mmss: string; mmssms: string } | null => {
      if (input.duration > 1) {
        const inPosition = input.markIn ? input.markIn : 0
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
    newVariables['stream_4_active'] = this.instance.data.status.stream[3].toString()
    newVariables['stream_5_active'] = this.instance.data.status.stream[4].toString()
    newVariables['recording_active'] = this.instance.data.status.recording.toString()
    newVariables['recording_duration'] = formatTime(this.instance.data.recording.duration, 's', 'auto')
    newVariables['recording_hms'] = formatTime(this.instance.data.recording.duration, 's', 'hh:mm:ss')
    const recordingFile1 = this.instance.data.recording.filename1.split('\\')
    const recordingFile2 = this.instance.data.recording.filename2.split('\\')
    const recordingFilename1 = recordingFile1[recordingFile1.length - 1] || ''
    const recordingFilepath1 = recordingFile1
    recordingFilepath1.pop()
    const recordingFilename2 = recordingFile2[recordingFile2.length - 1] || ''
    const recordingFilepath2 = recordingFile2
    recordingFilepath2.pop()

    newVariables['recording_filename1'] = recordingFilename1
    newVariables['recording_filepath1'] = recordingFilepath1.join('\\') + '\\'
    newVariables['recording_filename2'] = recordingFilename2
    newVariables['recording_filepath2'] = recordingFilepath2.join('\\') + '\\'

    // Output
    newVariables['fullscreen_1_source'] = ''
    newVariables['fullscreen_2_source'] = ''
    newVariables['output_1_source'] = ''
    newVariables['output_1_ndi'] = ''
    newVariables['output_1_srt'] = ''
    newVariables['output_2_source'] = ''
    newVariables['output_2_ndi'] = ''
    newVariables['output_2_srt'] = ''
    newVariables['output_3_source'] = ''
    newVariables['output_3_ndi'] = ''
    newVariables['output_3_srt'] = ''
    newVariables['output_4_source'] = ''
    newVariables['output_4_ndi'] = ''
    newVariables['output_4_srt'] = ''

    this.instance.data.outputs.forEach((output) => {
      const variableID = `${output.type}_${output.number}`
      let source = ''
      if (output.source === 'Input') {
        source = `Input${output.input}`
      } else if (output.source === 'Mix') {
        source = `Mix${output.mix + 1}`
      } else {
        source = output.source
      }

      newVariables[`${variableID}_source`] = source

      if (output.type === 'output') {
        newVariables[`${variableID}_ndi`] = output.ndi.toString()
        newVariables[`${variableID}_srt`] = output.srt.toString()
      }
    })

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
          newVariables[`mix_${mix}_program_playing`] = (mixProgramInput.state === 'Running').toString()
          newVariables[`mix_${mix}_program_loop`] = mixProgramInput.loop.toString()
          newVariables[`mix_${mix}_program_audio`] = (!inputAudio).toString()
          newVariables[`mix_${mix}_program_meterf1`] = volumeTodB((mixProgramInput.meterF1 || 0) * 100).toFixed(1)
          newVariables[`mix_${mix}_program_meterf2`] = volumeTodB((mixProgramInput.meterF2 || 0) * 100).toFixed(1)

          const audioLevel = this.instance.data.audioLevels.find((level) => level.key === mixProgramInput.key)
          if (audioLevel) {
            const audioLevelData = this.instance.data.getAudioLevelData(audioLevel)
            newVariables[`mix_${mix}_program_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg * 100).toFixed(1)
            newVariables[`mix_${mix}_program_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg * 100).toFixed(1)
            newVariables[`mix_${mix}_program_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg * 100).toFixed(1)
            newVariables[`mix_${mix}_program_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg * 100).toFixed(1)
            newVariables[`mix_${mix}_program_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak * 100).toFixed(
              1
            )
            newVariables[`mix_${mix}_program_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak * 100).toFixed(
              1
            )
            newVariables[`mix_${mix}_program_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak * 100).toFixed(
              1
            )
            newVariables[`mix_${mix}_program_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak * 100).toFixed(
              1
            )
          }

          const inputDuration = calcDuration(mixProgramInput)

          if (inputDuration !== null) {
            newVariables[`mix_${mix}_program_duration`] = inputDuration.ms
          }

          const inputRemaining = calcRemaining(mixProgramInput)

          if (inputRemaining !== null) {
            newVariables[`mix_${mix}_program_remaining`] = inputRemaining.ms
          }

          if (!(this.instance.config.strictInputVariableTypes && !this.instance.config.variablesShowInputPosition)) {
            newVariables[`mix_${mix}_program_position_panx`] = mixProgramInput.inputPosition?.panX ?? ''
            newVariables[`mix_${mix}_program_position_pany`] = mixProgramInput.inputPosition?.panY ?? ''
            newVariables[`mix_${mix}_program_position_zoomx`] = mixProgramInput.inputPosition?.zoomX ?? ''
            newVariables[`mix_${mix}_program_position_zoomy`] = mixProgramInput.inputPosition?.zoomY ?? ''
            newVariables[`mix_${mix}_program_position_cropx1`] = mixProgramInput.inputPosition?.cropX1 ?? ''
            newVariables[`mix_${mix}_program_position_cropx2`] = mixProgramInput.inputPosition?.cropX2 ?? ''
            newVariables[`mix_${mix}_program_position_cropy1`] = mixProgramInput.inputPosition?.cropY1 ?? ''
            newVariables[`mix_${mix}_program_position_cropy2`] = mixProgramInput.inputPosition?.cropY2 ?? ''
            newVariables[`mix_${mix}_program_cc_hue`] = mixProgramInput.cc?.hue ?? ''
            newVariables[`mix_${mix}_program_cc_saturation`] = mixProgramInput.cc?.saturation ?? ''
            newVariables[`mix_${mix}_program_cc_liftr`] = mixProgramInput.cc?.liftR ?? ''
            newVariables[`mix_${mix}_program_cc_liftg`] = mixProgramInput.cc?.liftG ?? ''
            newVariables[`mix_${mix}_program_cc_liftb`] = mixProgramInput.cc?.liftB ?? ''
            newVariables[`mix_${mix}_program_cc_lifty`] = mixProgramInput.cc?.liftY ?? ''
            newVariables[`mix_${mix}_program_cc_gammar`] = mixProgramInput.cc?.gammaR ?? ''
            newVariables[`mix_${mix}_program_cc_gammag`] = mixProgramInput.cc?.gammaG ?? ''
            newVariables[`mix_${mix}_program_cc_gammab`] = mixProgramInput.cc?.gammaB ?? ''
            newVariables[`mix_${mix}_program_cc_gammay`] = mixProgramInput.cc?.gammaY ?? ''
            newVariables[`mix_${mix}_program_cc_gainr`] = mixProgramInput.cc?.gainR ?? ''
            newVariables[`mix_${mix}_program_cc_gaing`] = mixProgramInput.cc?.gainG ?? ''
            newVariables[`mix_${mix}_program_cc_gainb`] = mixProgramInput.cc?.gainB ?? ''
            newVariables[`mix_${mix}_program_cc_gainy`] = mixProgramInput.cc?.gainY ?? ''
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

            if (
              !(this.instance.config.strictInputVariableTypes && !this.instance.config.variablesShowInputLayerPosition)
            ) {
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_panx`] = layer.panX ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_pany`] = layer.panY ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_x`] = layer.x ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_y`] = layer.y ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_zoomx`] = layer.zoomX ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_zoomy`] = layer.zoomY ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_width`] = layer.width ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_height`] = layer.height ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_cropx1`] = layer.cropX1 ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_cropx2`] = layer.cropX2 ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_cropy1`] = layer.cropY1 ?? ''
              newVariables[`mix_${mix}_program_layer_${layer.index + 1}_cropy2`] = layer.cropY2 ?? ''
            }
          }

          newVariables[`mix_${mix}_preview_framedelay`] = mixProgramInput.frameDelay ?? 0
        }

        if (mixPreviewInput) {
          const inputAudio = mixPreviewInput.muted === undefined ? false : mixPreviewInput.muted
          newVariables[`mix_${mix}_preview`] = this.instance.data.mix[id - 1].preview
          newVariables[`mix_${mix}_preview_name`] = await this.instance.data.getInputTitle(
            this.instance.data.mix[id - 1].preview
          )
          newVariables[`mix_${mix}_preview_guid`] = mixPreviewInput.key
          newVariables[`mix_${mix}_preview_playing`] = (mixPreviewInput.state === 'Running').toString()
          newVariables[`mix_${mix}_preview_loop`] = mixPreviewInput.loop.toString()
          newVariables[`mix_${mix}_preview_mute`] = inputAudio.toString()
          newVariables[`mix_${mix}_preview_audio`] = (!inputAudio).toString()
          newVariables[`mix_${mix}_preview_meterf1`] = volumeTodB((mixPreviewInput.meterF1 || 0) * 100).toFixed(1)
          newVariables[`mix_${mix}_preview_meterf2`] = volumeTodB((mixPreviewInput.meterF2 || 0) * 100).toFixed(1)

          const audioLevel = this.instance.data.audioLevels.find((level) => level.key === mixPreviewInput.key)
          if (audioLevel) {
            const audioLevelData = this.instance.data.getAudioLevelData(audioLevel)
            newVariables[`mix_${mix}_preview_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg * 100).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg * 100).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg * 100).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg * 100).toFixed(1)
            newVariables[`mix_${mix}_preview_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak * 100).toFixed(
              1
            )
            newVariables[`mix_${mix}_preview_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak * 100).toFixed(
              1
            )
            newVariables[`mix_${mix}_preview_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak * 100).toFixed(
              1
            )
            newVariables[`mix_${mix}_preview_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak * 100).toFixed(
              1
            )
          }

          const inputDuration = calcDuration(mixPreviewInput)

          if (inputDuration !== null) {
            newVariables[`mix_${mix}_preview_duration`] = inputDuration.ms
          }

          const inputRemaining = calcRemaining(mixPreviewInput)

          if (inputRemaining !== null) {
            newVariables[`mix_${mix}_preview_remaining`] = inputRemaining.ms
          }

          if (!(this.instance.config.strictInputVariableTypes && !this.instance.config.variablesShowInputPosition)) {
            newVariables[`mix_${mix}_preview_position_panx`] = mixPreviewInput.inputPosition?.panX ?? ''
            newVariables[`mix_${mix}_preview_position_pany`] = mixPreviewInput.inputPosition?.panY ?? ''
            newVariables[`mix_${mix}_preview_position_zoomx`] = mixPreviewInput.inputPosition?.zoomX ?? ''
            newVariables[`mix_${mix}_preview_position_zoomy`] = mixPreviewInput.inputPosition?.zoomY ?? ''
            newVariables[`mix_${mix}_preview_position_cropx1`] = mixPreviewInput.inputPosition?.cropX1 ?? ''
            newVariables[`mix_${mix}_preview_position_cropx2`] = mixPreviewInput.inputPosition?.cropX2 ?? ''
            newVariables[`mix_${mix}_preview_position_cropy1`] = mixPreviewInput.inputPosition?.cropY1 ?? ''
            newVariables[`mix_${mix}_preview_position_cropy2`] = mixPreviewInput.inputPosition?.cropY2 ?? ''
            newVariables[`mix_${mix}_preview_cc_hue`] = mixPreviewInput.cc?.hue ?? ''
            newVariables[`mix_${mix}_preview_cc_saturation`] = mixPreviewInput.cc?.saturation ?? ''
            newVariables[`mix_${mix}_preview_cc_liftr`] = mixPreviewInput.cc?.liftR ?? ''
            newVariables[`mix_${mix}_preview_cc_liftg`] = mixPreviewInput.cc?.liftG ?? ''
            newVariables[`mix_${mix}_preview_cc_liftb`] = mixPreviewInput.cc?.liftB ?? ''
            newVariables[`mix_${mix}_preview_cc_lifty`] = mixPreviewInput.cc?.liftY ?? ''
            newVariables[`mix_${mix}_preview_cc_gammar`] = mixPreviewInput.cc?.gammaR ?? ''
            newVariables[`mix_${mix}_preview_cc_gammag`] = mixPreviewInput.cc?.gammaG ?? ''
            newVariables[`mix_${mix}_preview_cc_gammab`] = mixPreviewInput.cc?.gammaB ?? ''
            newVariables[`mix_${mix}_preview_cc_gammay`] = mixPreviewInput.cc?.gammaY ?? ''
            newVariables[`mix_${mix}_preview_cc_gainr`] = mixPreviewInput.cc?.gainR ?? ''
            newVariables[`mix_${mix}_preview_cc_gaing`] = mixPreviewInput.cc?.gainG ?? ''
            newVariables[`mix_${mix}_preview_cc_gainb`] = mixPreviewInput.cc?.gainB ?? ''
            newVariables[`mix_${mix}_preview_cc_gainy`] = mixPreviewInput.cc?.gainY ?? ''
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

            if (
              !(this.instance.config.strictInputVariableTypes && !this.instance.config.variablesShowInputLayerPosition)
            ) {
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_panx`] = layer.panX ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_pany`] = layer.panY ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_x`] = layer.x ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_y`] = layer.y ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_zoomx`] = layer.zoomX ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_zoomy`] = layer.zoomY ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_width`] = layer.width ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_height`] = layer.height ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_cropx1`] = layer.cropX1 ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_cropx2`] = layer.cropX2 ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_cropy1`] = layer.cropY1 ?? ''
              newVariables[`mix_${mix}_preview_layer_${layer.index + 1}_cropy2`] = layer.cropY2 ?? ''
            }
          }

          newVariables[`mix_${mix}_preview_framedelay`] = mixPreviewInput.frameDelay ?? 0
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
          newVariables[`bus_${id.toLowerCase()}_meterf1_avg_1s`] = volumeTodB(
            audioLevelData.s1MeterF1Avg * 100
          ).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf2_avg_1s`] = volumeTodB(
            audioLevelData.s1MeterF2Avg * 100
          ).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf1_avg_3s`] = volumeTodB(
            audioLevelData.s3MeterF1Avg * 100
          ).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf2_avg_3s`] = volumeTodB(
            audioLevelData.s3MeterF2Avg * 100
          ).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf1_peak_1s`] = volumeTodB(
            audioLevelData.s1MeterF1Peak * 100
          ).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf2_peak_1s`] = volumeTodB(
            audioLevelData.s1MeterF2Peak * 100
          ).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf1_peak_3s`] = volumeTodB(
            audioLevelData.s3MeterF1Peak * 100
          ).toFixed(1)
          newVariables[`bus_${id.toLowerCase()}_meterf2_peak_3s`] = volumeTodB(
            audioLevelData.s3MeterF2Peak * 100
          ).toFixed(1)
        }
      }

      if (id !== 'Master' && id !== 'Headphones') {
        newVariables[`bus_${id.toLowerCase()}_mute`] = audioBus?.muted ? 'true' : 'false'
        newVariables[`bus_${id.toLowerCase()}_solo`] = audioBus?.solo ? 'true' : 'false'
        newVariables[`bus_${id.toLowerCase()}_sendtomaster`] = audioBus?.sendToMaster ? 'true' : 'false'
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

    newVariables.bus_any_solo = this.instance.data.audio.some((bus) => bus.solo).toString()

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
    for (let dynamic = 0; dynamic < 4; dynamic++) {
      newVariables[`dynamic_input_${dynamic + 1}`] = this.instance.data.dynamicInput[dynamic]?.value || ''
      newVariables[`dynamic_value_${dynamic + 1}`] = this.instance.data.dynamicValue[dynamic]?.value || ''

      if (this.instance.data.dynamicInput[dynamic]?.value) {
        const input = await this.instance.data.getInput(this.instance.data.dynamicInput[dynamic]?.value)

        if (input) {
          newVariables[`dynamic_input_${dynamic + 1}_name`] = input.shortTitle || input.title
          newVariables[`dynamic_input_${dynamic + 1}_number`] = input.number
          newVariables[`dynamic_input_${dynamic + 1}_guid`] = input.key
          newVariables[`dynamic_input_${dynamic + 1}_type`] = input.type

          this.instance.data.mix.forEach((mix) => {
            const tallyPreview =
              this.instance.data.mix[mix.number - 1].previewTally.includes(input.key) ||
              this.instance.data.mix[mix.number - 1].preview === input.number
            const tallyProgram =
              this.instance.data.mix[mix.number - 1].programTally.includes(input.key) ||
              this.instance.data.mix[mix.number - 1].program === input.number

            newVariables[`dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_preview`] = tallyPreview.toString()
            newVariables[`dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_program`] = tallyProgram.toString()
          })

          const inputAudio = input.muted === undefined ? false : input.muted

          newVariables[`dynamic_input_${dynamic + 1}_playing`] = (input.state === 'Running').toString()
          newVariables[`dynamic_input_${dynamic + 1}_loop`] = input.loop.toString()
          newVariables[`dynamic_input_${dynamic + 1}_mute`] = inputAudio.toString()
          newVariables[`dynamic_input_${dynamic + 1}_audio`] = (!inputAudio).toString()
          newVariables[`dynamic_input_${dynamic + 1}_solo`] = input.solo?.toString() || 'false'

          const meterF1 = input.meterF1 !== undefined ? volumeTodB(input.meterF1 * 100).toFixed(1) : ''
          const meterF2 = input.meterF2 !== undefined ? volumeTodB(input.meterF2 * 100).toFixed(1) : ''

          newVariables[`dynamic_input_${dynamic + 1}_meterf1`] = meterF1
          newVariables[`dynamic_input_${dynamic + 1}_meterf2`] = meterF2

          const audioLevel = this.instance.data.audioLevels.find((level) => level.key === input.key)
          if (audioLevel) {
            const audioLevelData = this.instance.data.getAudioLevelData(audioLevel)

            newVariables[`dynamic_input_${dynamic + 1}_meterf1_avg_1s`] = volumeTodB(
              audioLevelData.s1MeterF1Avg * 100
            ).toFixed(1)
            newVariables[`dynamic_input_${dynamic + 1}_meterf2_avg_1s`] = volumeTodB(
              audioLevelData.s1MeterF2Avg * 100
            ).toFixed(1)
            newVariables[`dynamic_input_${dynamic + 1}_meterf1_avg_3s`] = volumeTodB(
              audioLevelData.s3MeterF1Avg * 100
            ).toFixed(1)
            newVariables[`dynamic_input_${dynamic + 1}_meterf2_avg_3s`] = volumeTodB(
              audioLevelData.s3MeterF2Avg * 100
            ).toFixed(1)
            newVariables[`dynamic_input_${dynamic + 1}_meterf1_peak_1s`] = volumeTodB(
              audioLevelData.s1MeterF1Peak * 100
            ).toFixed(1)
            newVariables[`dynamic_input_${dynamic + 1}_meterf2_peak_1s`] = volumeTodB(
              audioLevelData.s1MeterF2Peak * 100
            ).toFixed(1)
            newVariables[`dynamic_input_${dynamic + 1}_meterf1_peak_3s`] = volumeTodB(
              audioLevelData.s3MeterF1Peak * 100
            ).toFixed(1)
            newVariables[`dynamic_input_${dynamic + 1}_meterf2_peak_3s`] = volumeTodB(
              audioLevelData.s3MeterF2Peak * 100
            ).toFixed(1)
          }

          if (input.duration > 1) {
            const inPosition = input.markIn ? input.markIn : 0
            const outPosition = input.markOut ? input.markOut : input.duration
            const duration = outPosition - inPosition
            const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

            const mm = (time: number): string => padding(Math.floor(time / 60000))
            const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
            const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

            newVariables[`dynamic_input_${dynamic + 1}_duration`] = `${mm(duration)}:${ss(duration)}.${ms(duration)}`
          }

          const inputDuration = calcDuration(input)

          if (inputDuration !== null) {
            newVariables[`dynamic_input_${dynamic + 1}_duration`] = `${inputDuration.mmssms}`
          }

          const inputRemaining = calcRemaining(input)

          if (inputRemaining !== null) {
            newVariables[`dynamic_input_${dynamic + 1}_remaining`] = inputRemaining.ms
            newVariables[`dynamic_input_${dynamic + 1}_remaining_ss`] = inputRemaining.ss
            newVariables[`dynamic_input_${dynamic + 1}_remaining_ss.ms`] = inputRemaining.ssms
            newVariables[`dynamic_input_${dynamic + 1}_remaining_mm:ss`] = inputRemaining.mmss
            newVariables[`dynamic_input_${dynamic + 1}_remaining_mm:ss.ms`] = inputRemaining.mmssms
          }

          if (!(this.instance.config.strictInputVariableTypes && !this.instance.config.variablesShowInputPosition)) {
            newVariables[`dynamic_input_${dynamic + 1}_position_panx`] = input.inputPosition?.panX ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_position_pany`] = input.inputPosition?.panY ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_position_zoomx`] = input.inputPosition?.zoomX ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_position_zoomy`] = input.inputPosition?.zoomY ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_position_cropx1`] = input.inputPosition?.cropX1 ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_position_cropx2`] = input.inputPosition?.cropX2 ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_position_cropy1`] = input.inputPosition?.cropY1 ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_position_cropy2`] = input.inputPosition?.cropY2 ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_hue`] = input.cc?.hue ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_saturation`] = input.cc?.saturation ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_liftr`] = input.cc?.liftR ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_liftg`] = input.cc?.liftG ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_liftb`] = input.cc?.liftB ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_lifty`] = input.cc?.liftY ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_gammar`] = input.cc?.gammaR ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_gammag`] = input.cc?.gammaG ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_gammab`] = input.cc?.gammaB ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_gammay`] = input.cc?.gammaY ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_gainr`] = input.cc?.gainR ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_gaing`] = input.cc?.gainG ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_gainb`] = input.cc?.gainB ?? ''
            newVariables[`dynamic_input_${dynamic + 1}_cc_gainy`] = input.cc?.gainY ?? ''
          }

          for (let i = 0; i < 10; i++) {
            newVariables[`dynamic_input_${dynamic + 1}_layer_${i + 1}_name`] = ''
            newVariables[`dynamic_input_${dynamic + 1}_layer_${i + 1}_number`] = ''
          }

          for (const layer of input.overlay || []) {
            const overlayInput = await this.instance.data.getInput(layer.key)
            let overlayinputName = ''

            if (overlayInput)
              overlayinputName = overlayInput.shortTitle
                ? overlayInput.shortTitle.replace(/[^a-z0-9-_. ]+/gi, '')
                : overlayInput.title.replace(/[^a-z0-9-_. ]+/gi, '')

            newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_name`] = overlayinputName
            newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_number`] = overlayInput?.number || ''
            newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_key`] = overlayInput?.key || ''

            if (
              !(this.instance.config.strictInputVariableTypes && !this.instance.config.variablesShowInputLayerPosition)
            ) {
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_panx`] = layer.panX ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_pany`] = layer.panY ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_x`] = layer.x ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_y`] = layer.y ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_zoomx`] = layer.zoomX ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_zoomy`] = layer.zoomY ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_width`] = layer.width ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_height`] = layer.height ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_cropx1`] = layer.cropX1 ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_cropx2`] = layer.cropX2 ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_cropy1`] = layer.cropY1 ?? ''
              newVariables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_cropy2`] = layer.cropY2 ?? ''
            }
          }

          if (input.text) {
            input.text.forEach((textLayer) => {
              newVariables[`dynamic_input_${dynamic + 1}_layer_${textLayer.index}_titletext`] = textLayer.value
            })
          }

          if (input.list) {
            input.list.forEach((listItem) => {
              newVariables[`dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_name`] = listItem.filename
              newVariables[`dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_selected`] =
                listItem.selected.toString()

              if (listItem.selected) {
                newVariables[`dynamic_input_${dynamic + 1}_selected`] = listItem.index + 1
                newVariables[`dynamic_input_${dynamic + 1}_selected_name`] = listItem.filename
              }
            })
          }

          if (input.type === 'VirtualSet' && input.selectedIndex !== undefined) {
            newVariables[`dynamic_input_${dynamic + 1}_selected`] = input.selectedIndex
          }

          if (input.type === 'VideoCall') {
            let audioSource = input.callAudioSource as string
            if (audioSource.startsWith('Bus')) {
              audioSource = audioSource.substr(3)
            }

            newVariables[`dynamic_input_${dynamic + 1}_call_password`] = input.callPassword
            newVariables[`dynamic_input_${dynamic + 1}_call_connected`] = input.callConnected
              ? 'Connected'
              : 'Disconnected'
            newVariables[`dynamic_input_${dynamic + 1}_call_video_source`] = input.callVideoSource
            newVariables[`dynamic_input_${dynamic + 1}_call_audio_source`] = input.callAudioSource
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

          newVariables[`dynamic_input_${dynamic + 1}_volume`] = volume
          newVariables[`dynamic_input_${dynamic + 1}_volume_db`] = volumedB
          newVariables[`dynamic_input_${dynamic + 1}_volume_linear`] = volumeLinear
          newVariables[`dynamic_input_${dynamic + 1}_framedelay`] = input.frameDelay ?? 0

          newVariables[`dynamic_input_${dynamic + 1}_volume_f1`] = ''
          newVariables[`dynamic_input_${dynamic + 1}_volume_f1_db`] = ''
          newVariables[`dynamic_input_${dynamic + 1}_volume_f1_linear`] = ''

          if (input.volumeF1 !== undefined) {
            newVariables[`dynamic_input_${dynamic + 1}_volume_f1`] = (input.volumeF1 * 100).toFixed(2)
            newVariables[`dynamic_input_${dynamic + 1}_volume_f1_db`] = volumeTodB(input.volumeF1 * 100).toFixed(1)
            newVariables[`dynamic_input_${dynamic + 1}_volume_f1_linear`] = Math.round(volumeToLinear(input.volumeF1 * 100))
          }

          newVariables[`dynamic_input_${dynamic + 1}_volume_f2`] = ''
          newVariables[`dynamic_input_${dynamic + 1}_volume_f2_db`] = ''
          newVariables[`dynamic_input_${dynamic + 1}_volume_f2_linear`] = ''

          if (input.volumeF2 !== undefined) {
            newVariables[`dynamic_input_${dynamic + 1}_volume_f2`] = (input.volumeF2 * 100).toFixed(2)
            newVariables[`dynamic_input_${dynamic + 1}_volume_f2_db`] = volumeTodB(input.volumeF2 * 100).toFixed(1)
            newVariables[`dynamic_input_${dynamic + 1}_volume_f2_linear`] = Math.round(volumeToLinear(input.volumeF2 * 100))
          }
        }
      }
    }

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

      let inputTypes = []

      if (this.instance.config.strictInputVariableTypes) {
        if (this.instance.config.variablesShowInputs && useNamedInput) {
          inputTypes.push(input.shortTitle || input.title)
          inputTypes.push(inputName.toLowerCase())
        }
        if (this.instance.config.variablesShowInputNumbers) inputTypes.push(input.key)
        if (this.instance.config.variablesShowInputGUID) inputTypes.push(input.key)
      } else {
        inputTypes = [
          input.number,
          input.key,
          useNamedInput ? input.shortTitle || input.title : false,
          useNamedInput ? inputName.toLowerCase() : false,
        ].filter((x) => x !== false)
      }

      for (const type of inputTypes) {
        newVariables[`input_${type}_name`] = input.shortTitle || input.title
        newVariables[`input_${type}_number`] = input.number
        newVariables[`input_${type}_guid`] = input.key
        newVariables[`input_${type}_type`] = input.type

        this.instance.data.mix.forEach((mix) => {
          const tallyPreview =
            this.instance.data.mix[mix.number - 1].previewTally.includes(input.key) ||
            this.instance.data.mix[mix.number - 1].preview === input.number
          const tallyProgram =
            this.instance.data.mix[mix.number - 1].programTally.includes(input.key) ||
            this.instance.data.mix[mix.number - 1].program === input.number

          newVariables[`input_${type}_mix_${mix.number}_tally_preview`] = tallyPreview.toString()
          newVariables[`input_${type}_mix_${mix.number}_tally_program`] = tallyProgram.toString()
        })

        const inputAudio = input.muted === undefined ? false : input.muted

        newVariables[`input_${type}_playing`] = (input.state === 'Running').toString()
        newVariables[`input_${type}_loop`] = input.loop.toString()
        newVariables[`input_${type}_mute`] = inputAudio.toString()
        newVariables[`input_${type}_audio`] = (!inputAudio).toString()
        newVariables[`input_${type}_solo`] = input.solo?.toString() || 'false'

        const meterF1 = input.meterF1 !== undefined ? volumeTodB(input.meterF1 * 100).toFixed(1) : ''
        const meterF2 = input.meterF2 !== undefined ? volumeTodB(input.meterF2 * 100).toFixed(1) : ''

        newVariables[`input_${type}_meterf1`] = meterF1
        newVariables[`input_${type}_meterf2`] = meterF2

        const audioLevel = this.instance.data.audioLevels.find((level) => level.key === input.key)
        if (audioLevel) {
          const audioLevelData = this.instance.data.getAudioLevelData(audioLevel)

          newVariables[`input_${type}_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg * 100).toFixed(1)
          newVariables[`input_${type}_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg * 100).toFixed(1)
          newVariables[`input_${type}_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg * 100).toFixed(1)
          newVariables[`input_${type}_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg * 100).toFixed(1)
          newVariables[`input_${type}_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak * 100).toFixed(1)
          newVariables[`input_${type}_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak * 100).toFixed(1)
          newVariables[`input_${type}_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak * 100).toFixed(1)
          newVariables[`input_${type}_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak * 100).toFixed(1)
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
          newVariables[`input_${type}_duration`] = `${inputDuration.mmssms}`
        }

        const inputRemaining = calcRemaining(input)

        if (inputRemaining !== null) {
          newVariables[`input_${type}_remaining`] = inputRemaining.ms
          newVariables[`input_${type}_remaining_ss`] = inputRemaining.ss
          newVariables[`input_${type}_remaining_ss.ms`] = inputRemaining.ssms
          newVariables[`input_${type}_remaining_mm:ss`] = inputRemaining.mmss
          newVariables[`input_${type}_remaining_mm:ss.ms`] = inputRemaining.mmssms
        }

        if (!(this.instance.config.strictInputVariableTypes && !this.instance.config.variablesShowInputPosition)) {
          newVariables[`input_${type}_position_panx`] = input.inputPosition?.panX ?? ''
          newVariables[`input_${type}_position_pany`] = input.inputPosition?.panY ?? ''
          newVariables[`input_${type}_position_zoomx`] = input.inputPosition?.zoomX ?? ''
          newVariables[`input_${type}_position_zoomy`] = input.inputPosition?.zoomY ?? ''
          newVariables[`input_${type}_position_cropx1`] = input.inputPosition?.cropX1 ?? ''
          newVariables[`input_${type}_position_cropx2`] = input.inputPosition?.cropX2 ?? ''
          newVariables[`input_${type}_position_cropy1`] = input.inputPosition?.cropY1 ?? ''
          newVariables[`input_${type}_position_cropy2`] = input.inputPosition?.cropY2 ?? ''
          newVariables[`input_${type}_cc_hue`] = input.cc?.hue ?? ''
          newVariables[`input_${type}_cc_saturation`] = input.cc?.saturation ?? ''
          newVariables[`input_${type}_cc_liftr`] = input.cc?.liftR ?? ''
          newVariables[`input_${type}_cc_liftg`] = input.cc?.liftG ?? ''
          newVariables[`input_${type}_cc_liftb`] = input.cc?.liftB ?? ''
          newVariables[`input_${type}_cc_lifty`] = input.cc?.liftY ?? ''
          newVariables[`input_${type}_cc_gammar`] = input.cc?.gammaR ?? ''
          newVariables[`input_${type}_cc_gammag`] = input.cc?.gammaG ?? ''
          newVariables[`input_${type}_cc_gammab`] = input.cc?.gammaB ?? ''
          newVariables[`input_${type}_cc_gammay`] = input.cc?.gammaY ?? ''
          newVariables[`input_${type}_cc_gainr`] = input.cc?.gainR ?? ''
          newVariables[`input_${type}_cc_gaing`] = input.cc?.gainG ?? ''
          newVariables[`input_${type}_cc_gainb`] = input.cc?.gainB ?? ''
          newVariables[`input_${type}_cc_gainy`] = input.cc?.gainY ?? ''
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

          if (
            !(this.instance.config.strictInputVariableTypes && !this.instance.config.variablesShowInputLayerPosition)
          ) {
            newVariables[`input_${type}_layer_${layer.index + 1}_panx`] = layer.panX ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_pany`] = layer.panY ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_x`] = layer.x ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_y`] = layer.y ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_zoomx`] = layer.zoomX ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_zoomy`] = layer.zoomY ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_width`] = layer.width ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_height`] = layer.height ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_cropx1`] = layer.cropX1 ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_cropx2`] = layer.cropX2 ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_cropy1`] = layer.cropY1 ?? ''
            newVariables[`input_${type}_layer_${layer.index + 1}_cropy2`] = layer.cropY2 ?? ''
          }
        }

        if (input.text) {
          input.text.forEach((textLayer) => {
            newVariables[`input_${type}_layer_${textLayer.index}_titletext`] = textLayer.value
          })
        }

        if (input.list) {
          input.list.forEach((listItem) => {
            newVariables[`input_${type}_list_${listItem.index + 1}_name`] = listItem.filename
            newVariables[`input_${type}_list_${listItem.index + 1}_selected`] = listItem.selected.toString()

            if (listItem.selected) {
              newVariables[`input_${type}_selected`] = listItem.index + 1
              newVariables[`input_${type}_selected_name`] = listItem.filename
            }
          })
        }

        if (
          (input.type === 'VirtualSet' || input.type === 'Photos' || input.type === 'PowerPoint') &&
          input.selectedIndex !== undefined
        ) {
          newVariables[`input_${type}_selected`] = input.selectedIndex
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
        newVariables[`input_${type}_framedelay`] = input.frameDelay ?? 0

        newVariables[`input_${type}_volume_f1`] = ''
        newVariables[`input_${type}_volume_f1_db`] = ''
        newVariables[`input_${type}_volume_f1_linear`] = ''

        if (input.volumeF1 !== undefined) {
          newVariables[`input_${type}_volume_f1`] = (input.volumeF1 * 100).toFixed(2)
          newVariables[`input_${type}_volume_f1_db`] = volumeTodB(input.volumeF1 * 100).toFixed(1)
          newVariables[`input_${type}_volume_f1_linear`] = Math.round(volumeToLinear(input.volumeF1 * 100))
        }

        newVariables[`input_${type}_volume_f2`] = ''
        newVariables[`input_${type}_volume_f2_db`] = ''
        newVariables[`input_${type}_volume_f2_linear`] = ''
        
        if (input.volumeF2 !== undefined) {
          newVariables[`input_${type}_volume_f2`] = (input.volumeF2 * 100).toFixed(2)
          newVariables[`input_${type}_volume_f2_db`] = volumeTodB(input.volumeF2 * 100).toFixed(1)
          newVariables[`input_${type}_volume_f2_linear`] = Math.round(volumeToLinear(input.volumeF2 * 100))
        }
      }
    }

    newVariables.input_any_solo = this.instance.data.inputs.some((input) => input.solo).toString()

    // Replay
    newVariables.replay_recording = this.instance.data.replay.recording.toString()
    newVariables.replay_live = this.instance.data.replay.live.toString()
    newVariables.replay_forward = this.instance.data.replay.forward.toString()
    newVariables.replay_channel_mode = this.instance.data.replay.channelMode
    newVariables.replay_events = this.instance.data.replay.events
    newVariables.replay_eventsa = this.instance.data.replay.eventsA
    newVariables.replay_eventsb = this.instance.data.replay.eventsB
    newVariables.replay_cameraa = this.instance.data.replay.cameraA
    newVariables.replay_camerab = this.instance.data.replay.cameraB
    newVariables.replay_speed = this.instance.data.replay.speed
    newVariables.replay_speeda = this.instance.data.replay.speedA
    newVariables.replay_speedb = this.instance.data.replay.speedB
    newVariables.replay_timecode = this.instance.data.replay.timecode
    newVariables.replay_timecodea = this.instance.data.replay.timecodeA
    newVariables.replay_timecodeb = this.instance.data.replay.timecodeB

    this.set(newVariables)

    this.updateDefinitions()
  }
}
