import type { CompanionVariableDefinitions, JsonValue } from '@companion-module/base'
import type VMixInstance from '../index.js'
import { calcDuration, calcRemaining, volumeTodB, volumeToLinear } from '../utils.js'

export type DynamicVariablesSchema = {
  [key: `dynamic_value_${number}`]: string
  [key: `dynamic_input_${number}`]: string
  [key: `dynamic_input_${number}_name`]: string
  [key: `dynamic_input_${number}_full_title`]: string
  [key: `dynamic_input_${number}_number`]: number
  [key: `dynamic_input_${number}_guid`]: string
  [key: `dynamic_input_${number}_type`]: string
  [key: `dynamic_input_${number}_mix_${number}_tally_preview`]: string
  [key: `dynamic_input_${number}_mix_${number}_tally_program`]: string
  [key: `dynamic_input_${number}_playing`]: string
  [key: `dynamic_input_${number}_loop`]: string
  [key: `dynamic_input_${number}_mute`]: string
  [key: `dynamic_input_${number}_audio`]: string
  [key: `dynamic_input_${number}_solo`]: string
  [key: `dynamic_input_${number}_duration`]: string
  [key: `dynamic_input_${number}_remaining`]: string
  [key: `dynamic_input_${number}_remaining_ss`]: string
  [key: `dynamic_input_${number}_remaining_ss.ms`]: string
  [key: `dynamic_input_${number}_remaining_mm.ss`]: string
  [key: `dynamic_input_${number}_remaining_mm.ss.ms`]: string
  [key: `dynamic_input_${number}_position_panx`]: number | string
  [key: `dynamic_input_${number}_position_pany`]: number | string
  [key: `dynamic_input_${number}_position_zoomx`]: number | string
  [key: `dynamic_input_${number}_position_zoomy`]: number | string
  [key: `dynamic_input_${number}_position_cropx1`]: number | string
  [key: `dynamic_input_${number}_position_cropx2`]: number | string
  [key: `dynamic_input_${number}_position_cropy1`]: number | string
  [key: `dynamic_input_${number}_position_cropy2`]: number | string
  [key: `dynamic_input_${number}_cc_hue`]: number | string
  [key: `dynamic_input_${number}_cc_saturation`]: number | string
  [key: `dynamic_input_${number}_cc_liftr`]: number | string
  [key: `dynamic_input_${number}_cc_liftg`]: number | string
  [key: `dynamic_input_${number}_cc_liftb`]: number | string
  [key: `dynamic_input_${number}_cc_lifty`]: number | string
  [key: `dynamic_input_${number}_cc_gammar`]: number | string
  [key: `dynamic_input_${number}_cc_gammag`]: number | string
  [key: `dynamic_input_${number}_cc_gammab`]: number | string
  [key: `dynamic_input_${number}_cc_gammay`]: number | string
  [key: `dynamic_input_${number}_cc_gainr`]: number | string
  [key: `dynamic_input_${number}_cc_gaing`]: number | string
  [key: `dynamic_input_${number}_cc_gainb`]: number | string
  [key: `dynamic_input_${number}_cc_gainy`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_name`]: string
  [key: `dynamic_input_${number}_layer_${number}_number`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_key`]: string
  [key: `dynamic_input_${number}_layer_${number}_panx`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_pany`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_x`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_y`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_zoomx`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_zoomy`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_width`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_height`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_cropx1`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_cropx2`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_cropy1`]: number | string
  [key: `dynamic_input_${number}_layer_${number}_cropy2`]: number | string
  [key: `dynamic_input_${number}_layer_${string | number}_titletext`]: string
  [key: `dynamic_input_${number}_volume`]: string
  [key: `dynamic_input_${number}_volume_db`]: string
  [key: `dynamic_input_${number}_volume_linear`]: number | string
  [key: `dynamic_input_${number}_volume_${'f1' | 'f2'}`]: string
  [key: `dynamic_input_${number}_volume_${'f1' | 'f2'}_db`]: string
  [key: `dynamic_input_${number}_volume_${'f1' | 'f2'}_linear`]: number | string
  [key: `dynamic_input_${number}_meter${'f1' | 'f2'}`]: string
  [key: `dynamic_input_${number}_meter${'f1' | 'f2'}_avg_1s`]: string
  [key: `dynamic_input_${number}_meter${'f1' | 'f2'}_avg_3s`]: string
  [key: `dynamic_input_${number}_meter${'f1' | 'f2'}_peak_1s`]: string
  [key: `dynamic_input_${number}_meter${'f1' | 'f2'}_peak_3s`]: string
  [key: `dynamic_input_${number}_framedelay`]: number
  [key: `dynamic_input_${number}_list_${number}_name`]: string
  [key: `dynamic_input_${number}_list_${number}_selected`]: string
  [key: `dynamic_input_${number}_selected`]: number | string
  [key: `dynamic_input_${number}_selectedindex`]: number | string
  [key: `dynamic_input_${number}_selected_name`]: string
  [key: `dynamic_input_${number}_call_password`]: string
  [key: `dynamic_input_${number}_call_connected`]: string
  [key: `dynamic_input_${number}_call_video_source`]: string
  [key: `dynamic_input_${number}_call_audio_source`]: string
  [key: `dynamic_input_${number}_json`]: JsonValue
}

export const dynamicDefinitions = async (instance: VMixInstance): Promise<CompanionVariableDefinitions> => {
  const definitions: CompanionVariableDefinitions = {}
  const dynamicIDs = [0, 1, 2, 3]

  for (const dynamic of dynamicIDs) {
    if (instance.config.variablesShowDynamicInputs) definitions[`dynamic_input_${dynamic + 1}`] = { name: `Dynamic Input ${dynamic + 1}` }
    if (instance.config.variablesShowDynamicValues) definitions[`dynamic_value_${dynamic + 1}`] = { name: `Dynamic Value ${dynamic + 1}` }

    const input = await instance.data.getInput(instance.data.dynamicInput[dynamic]?.value)

    if (input && instance.config.variablesShowDynamicInputs) {
      definitions[`dynamic_input_${dynamic + 1}_name`] = { name: `Dynamic Input ${dynamic + 1} Short Title` }
      definitions[`dynamic_input_${dynamic + 1}_full_title`] = { name: `Dynamic Input ${dynamic + 1} Full Title` }
      definitions[`dynamic_input_${dynamic + 1}_number`] = { name: `Dynamic Input ${dynamic + 1} Number` }
      definitions[`dynamic_input_${dynamic + 1}_guid`] = { name: `Dynamic Input ${dynamic + 1} GUID` }
      definitions[`dynamic_input_${dynamic + 1}_type`] = { name: `Dynamic Input ${dynamic + 1} Type` }

      instance.data.mix
        .filter((mix) => mix.active)
        .forEach((mix) => {
          definitions[`dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_preview`] = { name: `Dynamic Input ${dynamic + 1} Mix ${mix.number} Tally Preview` }
          definitions[`dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_program`] = { name: `Dynamic Input ${dynamic + 1} Mix ${mix.number} Tally Program` }
        })

      definitions[`dynamic_input_${dynamic + 1}_playing`] = { name: `Dynamic Input ${dynamic + 1} Playing` }
      definitions[`dynamic_input_${dynamic + 1}_loop`] = { name: `Dynamic Input ${dynamic + 1} Loop` }
      definitions[`dynamic_input_${dynamic + 1}_mute`] = { name: `Dynamic Input ${dynamic + 1} Muted` }
      definitions[`dynamic_input_${dynamic + 1}_audio`] = { name: `Dynamic Input ${dynamic + 1} Audio` }
      definitions[`dynamic_input_${dynamic + 1}_solo`] = { name: `Dynamic Input ${dynamic + 1} Solo` }

      if (input.duration > 1) {
        definitions[`dynamic_input_${dynamic + 1}_duration`] = { name: `Dynamic Input ${dynamic + 1} Duration` }
      }

      if (input.position !== undefined) {
        definitions[`dynamic_input_${dynamic + 1}_remaining`] = { name: `Dynamic Input ${dynamic + 1} Remaining` }
        definitions[`dynamic_input_${dynamic + 1}_remaining_ss`] = { name: `Dynamic Input ${dynamic + 1} Remaining ss` }
        definitions[`dynamic_input_${dynamic + 1}_remaining_ss.ms`] = { name: `Dynamic Input ${dynamic + 1} Remaining ss.ms` }
        definitions[`dynamic_input_${dynamic + 1}_remaining_mm.ss`] = { name: `Dynamic Input ${dynamic + 1} Remaining mm:ss` }
        definitions[`dynamic_input_${dynamic + 1}_remaining_mm.ss.ms`] = { name: `Dynamic Input ${dynamic + 1} Remaining mm:ss.ms` }
      }

      if (instance.config.variablesShowInputLayers) {
        for (let i = 1; i < 11; i++) {
          definitions[`dynamic_input_${dynamic + 1}_layer_${i}_number`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Number` }
          definitions[`dynamic_input_${dynamic + 1}_layer_${i}_name`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Name` }
          definitions[`dynamic_input_${dynamic + 1}_layer_${i}_key`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Key` }

          if (instance.config.variablesShowInputLayerPosition) {
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_panx`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Pan X (Percent)` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_pany`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Pan Y (Percent)` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_x`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Pan X (Pixels)` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_y`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Pan Y (Pixels)` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_zoomx`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Zoom X` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_zoomy`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Zoom Y` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_width`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Width` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_height`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Height` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_cropx1`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Crop X1` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_cropx2`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Crop X2` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_cropy1`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Crop Y1` }
            definitions[`dynamic_input_${dynamic + 1}_layer_${i}_cropy2`] = { name: `Dynamic Input ${dynamic + 1}Layer ${i} Crop Y2` }
          }
        }
      }

      if (input.text && (instance.config.variablesShowInputTitleIndex || instance.config.variablesShowInputTitleName)) {
        input.text.forEach((textLayer) => {
          if (instance.config.variablesShowInputTitleIndex) {
            definitions[`dynamic_input_${dynamic + 1}_layer_${textLayer.index}_titletext`] = { name: `Dynamic Input ${dynamic + 1} layer ${textLayer.index} Title Text` }
          }

          if (instance.config.variablesShowInputTitleName) {
            definitions[`dynamic_input_${dynamic + 1}_layer_${textLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titletext`] = {
              name: `Dynamic Input ${dynamic + 1} layer ${textLayer.name} Title Text`,
            }
          }
        })
      }

      if (input.type === 'PowerPoint') {
        definitions[`dynamic_input_${dynamic + 1}_selected`] = { name: `Dynamic Input ${dynamic + 1} Selected Index` }
      }

      if (input.type === 'VideoList' || input.type === 'VirtualSet' || input.type === 'Photos') {
        ;(definitions[`dynamic_input_${dynamic + 1}_selected`] = { name: `Dynamic Input ${dynamic + 1} Selected Position` }),
          (definitions[`dynamic_input_${dynamic + 1}_selectedindex`] = { name: `Dynamic Input ${dynamic + 1} Selected Index` })
        definitions[`dynamic_input_${dynamic + 1}_selected_name`] = { name: `Dynamic Input ${dynamic + 1} Selected Name` }
      }

      if (input.list && instance.config.variablesShowInputList) {
        input.list.forEach((listItem) => {
          definitions[`dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_name`] = { name: `Dynamic Input ${dynamic + 1} List ${listItem.index + 1} Name` }
          definitions[`dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_selected`] = { name: `Dynamic Input ${dynamic + 1} List ${listItem.index + 1} Selected` }
        })
      }

      if (input.type === 'VideoCall') {
        definitions[`dynamic_input_${dynamic + 1}_call_password`] = { name: `Dynamic Input ${dynamic + 1} Call Password` }
        definitions[`dynamic_input_${dynamic + 1}_call_connected`] = { name: `Dynamic Input ${dynamic + 1} Call Connected` }
        definitions[`dynamic_input_${dynamic + 1}_call_video_source`] = { name: `Dynamic Input ${dynamic + 1} Call Video Source` }
        definitions[`dynamic_input_${dynamic + 1}_call_audio_source`] = { name: `Dynamic Input ${dynamic + 1} Call Audio Source` }
      }

      if (instance.config.variablesShowInputVolume) {
        definitions[`dynamic_input_${dynamic + 1}_volume`] = { name: `Dynamic Input ${dynamic + 1} Volume` }
        definitions[`dynamic_input_${dynamic + 1}_volume_db`] = { name: `Dynamic Input ${dynamic + 1} Volume dB` }
        definitions[`dynamic_input_${dynamic + 1}_volume_linear`] = { name: `Dynamic Input ${dynamic + 1} Volume Linear` }

        if (input.volumeF1 !== undefined) {
          definitions[`dynamic_input_${dynamic + 1}_volume_f1`] = { name: `Dynamic Input ${dynamic + 1} Volume F1` }
          definitions[`dynamic_input_${dynamic + 1}_volume_f1_db`] = { name: `Dynamic Input ${dynamic + 1} Volume F1 dB` }
          definitions[`dynamic_input_${dynamic + 1}_volume_f1_linear`] = { name: `Dynamic Input ${dynamic + 1} Volume F1 Linear` }
        }

        if (input.volumeF2 !== undefined) {
          definitions[`dynamic_input_${dynamic + 1}_volume_f2`] = { name: `Dynamic Input ${dynamic + 1} Volume F2` }
          definitions[`dynamic_input_${dynamic + 1}_volume_f2_db`] = { name: `Dynamic Input ${dynamic + 1} Volume F2 dB` }
          definitions[`dynamic_input_${dynamic + 1}_volume_f2_linear`] = { name: `Dynamic Input ${dynamic + 1} Volume F2 Linear` }
        }

        if (input.meterF1 !== undefined) {
          definitions[`dynamic_input_${dynamic + 1}_meterf1`] = { name: `Dynamic Input ${dynamic + 1} MeterF1` }
        }

        if (input.meterF2 !== undefined) {
          definitions[`dynamic_input_${dynamic + 1}_meterf2`] = { name: `Dynamic Input ${dynamic + 1} MeterF2` }
        }

        const audioLevel = instance.data.audioLevels.find((level) => level.key === input.key)
        if (audioLevel) {
          definitions[`dynamic_input_${dynamic + 1}_meterf1_avg_1s`] = { name: `Dynamic Input ${dynamic + 1} Meter F1 Average 1s` }
          definitions[`dynamic_input_${dynamic + 1}_meterf2_avg_1s`] = { name: `Dynamic Input ${dynamic + 1} Meter F2 Average 1s` }
          definitions[`dynamic_input_${dynamic + 1}_meterf1_avg_3s`] = { name: `Dynamic Input ${dynamic + 1} Meter F1 Average 3s` }
          definitions[`dynamic_input_${dynamic + 1}_meterf2_avg_3s`] = { name: `Dynamic Input ${dynamic + 1} Meter F2 Average 3s` }
          definitions[`dynamic_input_${dynamic + 1}_meterf1_peak_1s`] = { name: `Dynamic Input ${dynamic + 1} Meter F1 Peak 1s` }
          definitions[`dynamic_input_${dynamic + 1}_meterf2_peak_1s`] = { name: `Dynamic Input ${dynamic + 1} Meter F2 Peak 1s` }
          definitions[`dynamic_input_${dynamic + 1}_meterf1_peak_3s`] = { name: `Dynamic Input ${dynamic + 1} Meter F1 Peak 3s` }
          definitions[`dynamic_input_${dynamic + 1}_meterf2_peak_3s`] = { name: `Dynamic Input ${dynamic + 1} Meter F2 Peak 3s` }
        }
      }

      if (instance.config.variablesShowInputCC) {
        definitions[`dynamic_input_${dynamic + 1}_cc_hue`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Hue` }
        definitions[`dynamic_input_${dynamic + 1}_cc_saturation`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Saturation` }
        definitions[`dynamic_input_${dynamic + 1}_cc_liftr`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Lift R` }
        definitions[`dynamic_input_${dynamic + 1}_cc_liftg`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Lift G` }
        definitions[`dynamic_input_${dynamic + 1}_cc_liftb`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Lift B` }
        definitions[`dynamic_input_${dynamic + 1}_cc_lifty`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Lift Y` }
        definitions[`dynamic_input_${dynamic + 1}_cc_gammar`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Gamma R` }
        definitions[`dynamic_input_${dynamic + 1}_cc_gammag`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Gamma G` }
        definitions[`dynamic_input_${dynamic + 1}_cc_gammab`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Gamma B` }
        definitions[`dynamic_input_${dynamic + 1}_cc_gammay`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Gamma Y` }
        definitions[`dynamic_input_${dynamic + 1}_cc_gainr`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Gain R` }
        definitions[`dynamic_input_${dynamic + 1}_cc_gaing`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Gain G` }
        definitions[`dynamic_input_${dynamic + 1}_cc_gainb`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Gain B` }
        definitions[`dynamic_input_${dynamic + 1}_cc_gainy`] = { name: `Dynamic Input ${dynamic + 1} Colour Correction Gain Y` }
      }

      if (instance.config.variablesShowInputJSON) {
        definitions[`dynamic_input_${dynamic + 1}_json`] = { name: `Dynamic Input ${dynamic + 1} JSON data` }
      }

      definitions[`dynamic_input_${dynamic + 1}_framedelay`] = { name: `Dynamic Input ${dynamic + 1} Frame Delay` }
    }
  }

  return definitions
}

export const dynamicValues = async (instance: VMixInstance): Promise<DynamicVariablesSchema> => {
  const variables: DynamicVariablesSchema = {}
  const dynamicIDs = [0, 1, 2, 3]

  for (const dynamic of dynamicIDs) {
    if (instance.config.variablesShowDynamicInputs) variables[`dynamic_input_${dynamic + 1}`] = instance.data.dynamicInput[dynamic]?.value || ''
    if (instance.config.variablesShowDynamicValues) variables[`dynamic_value_${dynamic + 1}`] = instance.data.dynamicValue[dynamic]?.value || ''

    if (instance.config.variablesShowDynamicInputs && instance.data.dynamicInput[dynamic]?.value) {
      const input = await instance.data.getInput(instance.data.dynamicInput[dynamic]?.value)

      if (input) {
        variables[`dynamic_input_${dynamic + 1}_name`] = input.shortTitle || input.title
        variables[`dynamic_input_${dynamic + 1}_full_title`] = input.title
        variables[`dynamic_input_${dynamic + 1}_number`] = input.number
        variables[`dynamic_input_${dynamic + 1}_guid`] = input.key
        variables[`dynamic_input_${dynamic + 1}_type`] = input.type

        instance.data.mix
          .filter((mix) => mix.active)
          .forEach((mix) => {
            const tallyPreview = instance.data.mix[mix.number - 1].previewTally.includes(input.key) || instance.data.mix[mix.number - 1].preview === input.number
            const tallyProgram = instance.data.mix[mix.number - 1].programTally.includes(input.key) || instance.data.mix[mix.number - 1].program === input.number

            variables[`dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_preview`] = tallyPreview.toString()
            variables[`dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_program`] = tallyProgram.toString()
          })

        const inputAudio = input.muted === undefined ? false : input.muted

        variables[`dynamic_input_${dynamic + 1}_playing`] = (input.state === 'Running').toString()
        variables[`dynamic_input_${dynamic + 1}_loop`] = input.loop.toString()
        variables[`dynamic_input_${dynamic + 1}_mute`] = inputAudio.toString()
        variables[`dynamic_input_${dynamic + 1}_audio`] = (!inputAudio).toString()
        variables[`dynamic_input_${dynamic + 1}_solo`] = input.solo?.toString() || 'false'

        if (input.duration > 1) {
          const inPosition = input.markIn ? input.markIn : 0
          const outPosition = input.markOut ? input.markOut : input.duration
          const duration = outPosition - inPosition
          const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

          const mm = (time: number): string => padding(Math.floor(time / 60000))
          const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
          const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

          variables[`dynamic_input_${dynamic + 1}_duration`] = `${mm(duration)}:${ss(duration)}.${ms(duration)}`
        }

        const inputDuration = calcDuration(input)

        if (inputDuration !== null) {
          variables[`dynamic_input_${dynamic + 1}_duration`] = `${inputDuration.mmssms}`
        }

        const inputRemaining = calcRemaining(input)

        if (inputRemaining !== null) {
          variables[`dynamic_input_${dynamic + 1}_remaining`] = inputRemaining.ms
          variables[`dynamic_input_${dynamic + 1}_remaining_ss`] = inputRemaining.ss
          variables[`dynamic_input_${dynamic + 1}_remaining_ss.ms`] = inputRemaining.ssms
          variables[`dynamic_input_${dynamic + 1}_remaining_mm.ss`] = inputRemaining.mmss
          variables[`dynamic_input_${dynamic + 1}_remaining_mm.ss.ms`] = inputRemaining.mmssms
        }

        if (instance.config.variablesShowInputPosition) {
          variables[`dynamic_input_${dynamic + 1}_position_panx`] = input.inputPosition?.panX ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_pany`] = input.inputPosition?.panY ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_zoomx`] = input.inputPosition?.zoomX ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_zoomy`] = input.inputPosition?.zoomY ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_cropx1`] = input.inputPosition?.cropX1 ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_cropx2`] = input.inputPosition?.cropX2 ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_cropy1`] = input.inputPosition?.cropY1 ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_cropy2`] = input.inputPosition?.cropY2 ?? ''
        }

        if (instance.config.variablesShowInputCC) {
          variables[`dynamic_input_${dynamic + 1}_cc_hue`] = input.cc?.hue ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_saturation`] = input.cc?.saturation ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_liftr`] = input.cc?.liftR ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_liftg`] = input.cc?.liftG ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_liftb`] = input.cc?.liftB ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_lifty`] = input.cc?.liftY ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_gammar`] = input.cc?.gammaR ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_gammag`] = input.cc?.gammaG ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_gammab`] = input.cc?.gammaB ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_gammay`] = input.cc?.gammaY ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_gainr`] = input.cc?.gainR ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_gaing`] = input.cc?.gainG ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_gainb`] = input.cc?.gainB ?? ''
          variables[`dynamic_input_${dynamic + 1}_cc_gainy`] = input.cc?.gainY ?? ''
        }

        if (instance.config.variablesShowInputLayers) {
          for (let i = 0; i < 10; i++) {
            variables[`dynamic_input_${dynamic + 1}_layer_${i + 1}_name`] = ''
            variables[`dynamic_input_${dynamic + 1}_layer_${i + 1}_number`] = ''
            variables[`dynamic_input_${dynamic + 1}_layer_${i + 1}_key`] = ''
          }

          for (const layer of input.overlay || []) {
            const overlayInput = await instance.data.getInput(layer.key)
            let overlayinputName = ''

            if (overlayInput)
              overlayinputName = overlayInput.shortTitle ? overlayInput.shortTitle.replace(/[^a-z0-9-_. ]+/gi, '') : overlayInput.title.replace(/[^a-z0-9-_. ]+/gi, '')

            variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_name`] = overlayinputName
            variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_number`] = overlayInput?.number || ''
            variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_key`] = overlayInput?.key || ''

            if (instance.config.variablesShowInputLayerPosition) {
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_panx`] = layer.panX ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_pany`] = layer.panY ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_x`] = layer.x ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_y`] = layer.y ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_zoomx`] = layer.zoomX ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_zoomy`] = layer.zoomY ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_width`] = layer.width ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_height`] = layer.height ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_cropx1`] = layer.cropX1 ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_cropx2`] = layer.cropX2 ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_cropy1`] = layer.cropY1 ?? ''
              variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_cropy2`] = layer.cropY2 ?? ''
            }
          }
        }

        if (input.text && (instance.config.variablesShowInputTitleIndex || instance.config.variablesShowInputTitleName)) {
          input.text.forEach((textLayer) => {
            if (instance.config.variablesShowInputTitleIndex) variables[`dynamic_input_${dynamic + 1}_layer_${textLayer.index}_titletext`] = textLayer.value
            if (instance.config.variablesShowInputTitleName)
              variables[`dynamic_input_${dynamic + 1}_layer_${textLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titletext`] = textLayer.value
          })
        }

        if (input.list && instance.config.variablesShowInputList) {
          input.list.forEach((listItem) => {
            variables[`dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_name`] = listItem.filename
            variables[`dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_selected`] = listItem.selected.toString()

            if (listItem.selected) {
              variables[`dynamic_input_${dynamic + 1}_selected`] = listItem.index + 1
              variables[`dynamic_input_${dynamic + 1}_selected_name`] = listItem.filename
            }
          })
        }

        if (input.type === 'PowerPoint' && input.selectedIndex !== undefined) {
          variables[`dynamic_input_${dynamic + 1}_selected`] = input.selectedIndex
        }

        if (input.type === 'Photos' || input.type === 'VideoList' || input.type === 'VirtualSet') {
          variables[`dynamic_input_${dynamic + 1}_selected`] = input.position
          variables[`dynamic_input_${dynamic + 1}_selectedindex`] = input.selectedIndex || ''
          variables[`dynamic_input_${dynamic + 1}_selected_name`] = input.title.split(`${input.shortTitle} - `)[1]
        }

        if (input.type === 'VideoCall') {
          let audioSource = input.callAudioSource as string
          if (audioSource.startsWith('Bus')) {
            audioSource = audioSource.substr(3)
          }

          variables[`dynamic_input_${dynamic + 1}_call_password`] = input.callPassword || ''
          variables[`dynamic_input_${dynamic + 1}_call_connected`] = input.callConnected ? 'Connected' : 'Disconnected'
          variables[`dynamic_input_${dynamic + 1}_call_video_source`] = input.callVideoSource || ''
          variables[`dynamic_input_${dynamic + 1}_call_audio_source`] = input.callAudioSource || ''
        }

        if (instance.config.variablesShowInputVolume) {
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

          variables[`dynamic_input_${dynamic + 1}_volume`] = volume
          variables[`dynamic_input_${dynamic + 1}_volume_db`] = volumedB
          variables[`dynamic_input_${dynamic + 1}_volume_linear`] = volumeLinear

          if (input.volumeF1 !== undefined) {
            variables[`dynamic_input_${dynamic + 1}_volume_f1`] = (input.volumeF1 * 100).toFixed(2)
            variables[`dynamic_input_${dynamic + 1}_volume_f1_db`] = volumeTodB(input.volumeF1 * 100).toFixed(1)
            variables[`dynamic_input_${dynamic + 1}_volume_f1_linear`] = Math.round(volumeToLinear(input.volumeF1 * 100))
          }

          if (input.volumeF2 !== undefined) {
            variables[`dynamic_input_${dynamic + 1}_volume_f2`] = (input.volumeF2 * 100).toFixed(2)
            variables[`dynamic_input_${dynamic + 1}_volume_f2_db`] = volumeTodB(input.volumeF2 * 100).toFixed(1)
            variables[`dynamic_input_${dynamic + 1}_volume_f2_linear`] = Math.round(volumeToLinear(input.volumeF2 * 100))
          }

          if (input.meterF1 !== undefined) {
            variables[`dynamic_input_${dynamic + 1}_meterf1`] = volumeTodB(input.meterF1 * 100).toFixed(1)
          }
          if (input.meterF2 !== undefined) {
            variables[`dynamic_input_${dynamic + 1}_meterf2`] = volumeTodB(input.meterF2 * 100).toFixed(1)
          }

          const audioLevel = instance.data.audioLevels.find((level) => level.key === input.key)
          if (audioLevel) {
            const audioLevelData = instance.data.getAudioLevelData(audioLevel)
            variables[`dynamic_input_${dynamic + 1}_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg * 100).toFixed(1)
            variables[`dynamic_input_${dynamic + 1}_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg * 100).toFixed(1)
            variables[`dynamic_input_${dynamic + 1}_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg * 100).toFixed(1)
            variables[`dynamic_input_${dynamic + 1}_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg * 100).toFixed(1)
            variables[`dynamic_input_${dynamic + 1}_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak * 100).toFixed(1)
            variables[`dynamic_input_${dynamic + 1}_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak * 100).toFixed(1)
            variables[`dynamic_input_${dynamic + 1}_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak * 100).toFixed(1)
            variables[`dynamic_input_${dynamic + 1}_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak * 100).toFixed(1)
          }
        }

        if (instance.config.variablesShowInputJSON) {
          variables[`dynamic_input_${dynamic + 1}_json`] = (input as unknown as JsonValue) || {}
        }

        variables[`dynamic_input_${dynamic + 1}_framedelay`] = input.frameDelay ?? 0
      }
    }
  }

  return variables
}
