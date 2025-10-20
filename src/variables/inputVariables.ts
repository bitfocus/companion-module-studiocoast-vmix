import type { CompanionVariableDefinition } from '@companion-module/base'
import type VMixInstance from '..'
import { calcDuration, calcRemaining, volumeTodB, volumeToLinear } from '../utils'
import type { InstanceVariableValue } from './variables'

type VariablesInputIDs =
  | 'input_any_solo'
  | `input_${string}_name`
  | `input_${string}_full_title`
  | `input_${string}_guid`
  | `input_${string}_type`
  | `input_${string}_number`
  | `input_${string}_mix_${number}_tally_preview`
  | `input_${string}_mix_${number}_tally_program`
  | `input_${string}_playing`
  | `input_${string}_loop`
  | `input_${string}_mute`
  | `input_${string}_audio`
  | `input_${string}_solo`
  | `input_${string}_duration`
  | `input_${string}_remaining`
  | `input_${string}_remaining_ss`
  | `input_${string}_remaining_ss.ms`
  | `input_${string}_remaining_mm.ss`
  | `input_${string}_remaining_mm.ss.ms`
  | `input_${string}_layer_${number}_name`
  | `input_${string}_layer_${number}_number`
  | `input_${string}_layer_${number}_key`
  | `input_${string}_layer_${number}_panx`
  | `input_${string}_layer_${number}_pany`
  | `input_${string}_layer_${number}_x`
  | `input_${string}_layer_${number}_y`
  | `input_${string}_layer_${number}_zoomx`
  | `input_${string}_layer_${number}_zoomy`
  | `input_${string}_layer_${number}_width`
  | `input_${string}_layer_${number}_height`
  | `input_${string}_layer_${number}_cropx1`
  | `input_${string}_layer_${number}_cropx2`
  | `input_${string}_layer_${number}_cropy1`
  | `input_${string}_layer_${number}_cropy2`
  | `input_${string}_layer_${number | string}_title${'text' | 'image' | 'color'}`
  | `input_${string}_selected`
  | `input_${string}_selectedindex`
  | `input_${string}_selected_name`
  | `input_${string}_list_${number}_name`
  | `input_${string}_list_${number}_selected`
  | `input_${string}_call_password`
  | `input_${string}_call_connected`
  | `input_${string}_call_video_source`
  | `input_${string}_call_audio_source`
  | `input_${string}_volume`
  | `input_${string}_volume_db`
  | `input_${string}_volume_linear`
  | `input_${string}_framedelay`
  | `input_${string}_volume_${'f1' | 'f2'}`
  | `input_${string}_volume_${'f1' | 'f2'}_db`
  | `input_${string}_volume_${'f1' | 'f2'}_linear`
  | `input_${string}_meter${'f1' | 'f2'}`
  | `input_${string}_meter${'f1' | 'f2'}_avg_1s`
  | `input_${string}_meter${'f1' | 'f2'}_avg_3s`
  | `input_${string}_meter${'f1' | 'f2'}_peak_1s`
  | `input_${string}_meter${'f1' | 'f2'}_peak_3s`
  | `input_${string}_position_panx`
  | `input_${string}_position_pany`
  | `input_${string}_position_zoomx`
  | `input_${string}_position_zoomy`
  | `input_${string}_position_cropx1`
  | `input_${string}_position_cropx2`
  | `input_${string}_position_cropy1`
  | `input_${string}_position_cropy2`
  | `input_${string}_cc_hue`
  | `input_${string}_cc_saturation`
  | `input_${string}_cc_liftr`
  | `input_${string}_cc_liftg`
  | `input_${string}_cc_liftb`
  | `input_${string}_cc_lifty`
  | `input_${string}_cc_gammar`
  | `input_${string}_cc_gammag`
  | `input_${string}_cc_gammab`
  | `input_${string}_cc_gammay`
  | `input_${string}_cc_gainr`
  | `input_${string}_cc_gaing`
  | `input_${string}_cc_gainb`
  | `input_${string}_cc_gainy`

type VariablesInputValues = Record<VariablesInputIDs, string | number | undefined>

export const inputDefinitions = (instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  const inputNumberVariables = new Set<CompanionVariableDefinition>()
  const inputNameVariables = new Set<CompanionVariableDefinition>()
  const inputKeyVariables = new Set<CompanionVariableDefinition>()

  definitions.push({ name: 'Input Any Solo', variableId: 'input_any_solo' })

  instance.data.inputs.forEach((input) => {
    let inputName = input.shortTitle ? input.shortTitle : input.title
    inputName = inputName.replace(/[^a-z0-9-_.]+/gi, '')
    if (instance.config.variablesShowInputsLowercase) inputName = inputName.toLowerCase()

    const inputTypes = [input.number, inputName, input.key]

    for (const [index, type] of inputTypes.entries()) {
      const title = type === inputName ? input.shortTitle || input.title : type
      if (!instance.config.variablesShowInputNumbers && index === 0) continue
      if (!instance.config.variablesShowInputs && index === 1) continue
      if (!instance.config.variablesShowInputGUID && index === 2) continue

      let inputSet = inputNumberVariables
      if (index === 1) inputSet = inputNameVariables
      if (index === 2) inputSet = inputKeyVariables

      inputSet.add({ name: `Input ${title} Short Title`, variableId: `input_${type}_name` })
      inputSet.add({ name: `Input ${title} Full Title`, variableId: `input_${type}_full_title` })
      inputSet.add({ name: `Input ${title} GUID`, variableId: `input_${type}_guid` })
      inputSet.add({ name: `Input ${title} Type`, variableId: `input_${type}_type` })
      inputSet.add({ name: `Input ${title} Number`, variableId: `input_${type}_number` })

      instance.data.mix
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
        inputSet.add({ name: `Input ${title} Remaining ss`, variableId: `input_${type}_remaining_ss` })
        inputSet.add({ name: `Input ${title} Remaining ss.ms`, variableId: `input_${type}_remaining_ss.ms` })
        inputSet.add({ name: `Input ${title} Remaining mm:ss`, variableId: `input_${type}_remaining_mm.ss` })
        inputSet.add({ name: `Input ${title} Remaining mm:ss.ms`, variableId: `input_${type}_remaining_mm.ss.ms` })
      }

      if (instance.config.variablesShowInputLayers) {
        for (let i = 1; i < 11; i++) {
          inputSet.add({ name: `Input ${title} layer ${i} Name`, variableId: `input_${type}_layer_${i}_name` })
          inputSet.add({ name: `Input ${title} layer ${i} Number`, variableId: `input_${type}_layer_${i}_number` })
          inputSet.add({ name: `Input ${title} layer ${i} Key`, variableId: `input_${type}_layer_${i}_key` })

          if (instance.config.variablesShowInputLayerPosition) {
            inputSet.add({ name: `Input ${title} layer ${i} Pan X (Percent)`, variableId: `input_${type}_layer_${i}_panx` })
            inputSet.add({ name: `Input ${title} layer ${i} Pan Y (Percent)`, variableId: `input_${type}_layer_${i}_pany` })
            inputSet.add({ name: `Input ${title} layer ${i} Pan X (Pixels)`, variableId: `input_${type}_layer_${i}_x` })
            inputSet.add({ name: `Input ${title} layer ${i} Pan Y (Pixels)`, variableId: `input_${type}_layer_${i}_y` })
            inputSet.add({ name: `Input ${title} layer ${i} Zoom X`, variableId: `input_${type}_layer_${i}_zoomx` })
            inputSet.add({ name: `Input ${title} layer ${i} Zoom Y`, variableId: `input_${type}_layer_${i}_zoomy` })
            inputSet.add({ name: `Input ${title} layer ${i} Width`, variableId: `input_${type}_layer_${i}_width` })
            inputSet.add({ name: `Input ${title} layer ${i} Height`, variableId: `input_${type}_layer_${i}_height` })
            inputSet.add({ name: `Input ${title} layer ${i} Crop X1`, variableId: `input_${type}_layer_${i}_cropx1` })
            inputSet.add({ name: `Input ${title} layer ${i} Crop X2`, variableId: `input_${type}_layer_${i}_cropx2` })
            inputSet.add({ name: `Input ${title} layer ${i} Crop Y1`, variableId: `input_${type}_layer_${i}_cropy1` })
            inputSet.add({ name: `Input ${title} layer ${i} Crop Y2`, variableId: `input_${type}_layer_${i}_cropy2` })
          }
        }
      }

      if (instance.config.variablesShowInputTitleIndex || instance.config.variablesShowInputTitleName) {
        input.text?.forEach((textLayer) => {
          if (instance.config.variablesShowInputTitleIndex) {
            inputSet.add({ name: `Input ${title} layer ${textLayer.index} Title Text`, variableId: `input_${type}_layer_${textLayer.index}_titletext` })
          }

          if (instance.config.variablesShowInputTitleName) {
            inputSet.add({
              name: `Input ${title} layer ${textLayer.name} Title Text`,
              variableId: `input_${type}_layer_${textLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titletext`,
            })
          }
        })

        input.image?.forEach((imageLayer) => {
          if (instance.config.variablesShowInputTitleIndex) {
            inputSet.add({ name: `Input ${title} layer ${imageLayer.index} Title Image`, variableId: `input_${type}_layer_${imageLayer.index}_titleimage` })
          }

          if (instance.config.variablesShowInputTitleName) {
            inputSet.add({
              name: `Input ${title} layer ${imageLayer.name} Title Text`,
              variableId: `input_${type}_layer_${imageLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titleimage`,
            })
          }
        })

        input.color?.forEach((imageColor) => {
          if (instance.config.variablesShowInputTitleIndex) {
            inputSet.add({ name: `Input ${title} layer ${imageColor.index} Title Color`, variableId: `input_${type}_layer_${imageColor.index}_titlecolor` })
          }

          if (instance.config.variablesShowInputTitleName) {
            inputSet.add({
              name: `Input ${title} layer ${imageColor.name} Title Text`,
              variableId: `input_${type}_layer_${imageColor.name.replace(/[^a-z0-9-_.]+/gi, '')}_titlecolor`,
            })
          }
        })
      }

      if (input.type === 'PowerPoint') {
        inputSet.add({ name: `Input ${title} Selected Index`, variableId: `input_${type}_selected` })
      }

      if (input.type === 'VideoList' || input.type === 'VirtualSet' || input.type === 'Photos') {
        inputSet.add({ name: `Input ${title} Selected Position`, variableId: `input_${type}_selected` })
        inputSet.add({ name: `Input ${title} Selected Index`, variableId: `input_${type}_selectedindex` })
        inputSet.add({ name: `Input ${title} Selected Name`, variableId: `input_${type}_selected_name` })
      }

      if (input.list && instance.config.variablesShowInputList) {
        input.list.forEach((listItem) => {
          inputSet.add({ name: `Input ${title} List ${listItem.index + 1} Name`, variableId: `input_${type}_list_${listItem.index + 1}_name` })
          inputSet.add({ name: `Input ${title} List ${listItem.index + 1} Selected`, variableId: `input_${type}_list_${listItem.index + 1}_selected` })
        })
      }

      if (input.type === 'VideoCall') {
        inputSet.add({ name: `Input ${title} Call Password`, variableId: `input_${type}_call_password` })
        inputSet.add({ name: `Input ${title} Call Connected`, variableId: `input_${type}_call_connected` })
        inputSet.add({ name: `Input ${title} Call Video Source`, variableId: `input_${type}_call_video_source` })
        inputSet.add({ name: `Input ${title} Call Audio Source`, variableId: `input_${type}_call_audio_source` })
      }

      if (instance.config.variablesShowInputVolume) {
        inputSet.add({ name: `Input ${title} Volume`, variableId: `input_${type}_volume` })
        inputSet.add({ name: `Input ${title} Volume dB`, variableId: `input_${type}_volume_db` })
        inputSet.add({ name: `Input ${title} Volume Linear`, variableId: `input_${type}_volume_linear` })

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

        const audioLevel = instance.data.audioLevels.find((level) => level.key === input.key)
        if (audioLevel) {
          inputSet.add({ name: `Input ${title} Meter F1 Average 1s`, variableId: `input_${type}_meterf1_avg_1s` })
          inputSet.add({ name: `Input ${title} Meter F2 Average 1s`, variableId: `input_${type}_meterf2_avg_1s` })
          inputSet.add({ name: `Input ${title} Meter F1 Average 3s`, variableId: `input_${type}_meterf1_avg_3s` })
          inputSet.add({ name: `Input ${title} Meter F2 Average 3s`, variableId: `input_${type}_meterf2_avg_3s` })
          inputSet.add({ name: `Input ${title} Meter F1 Peak 1s`, variableId: `input_${type}_meterf1_peak_1s` })
          inputSet.add({ name: `Input ${title} Meter F2 Peak 1s`, variableId: `input_${type}_meterf2_peak_1s` })
          inputSet.add({ name: `Input ${title} Meter F1 Peak 3s`, variableId: `input_${type}_meterf1_peak_3s` })
          inputSet.add({ name: `Input ${title} Meter F2 Peak 3s`, variableId: `input_${type}_meterf2_peak_3s` })
        }
      }

      inputSet.add({ name: `Input ${title} Frame Delay`, variableId: `input_${type}_framedelay` })

      if (instance.config.variablesShowInputPosition) {
        inputSet.add({ name: `Input ${title} Position Pan X`, variableId: `input_${type}_position_panx` })
        inputSet.add({ name: `Input ${title} Position Pan Y`, variableId: `input_${type}_position_pany` })
        inputSet.add({ name: `Input ${title} Position Zoom X`, variableId: `input_${type}_position_zoomx` })
        inputSet.add({ name: `Input ${title} Position Zoom X`, variableId: `input_${type}_position_zoomy` })
        inputSet.add({ name: `Input ${title} Position Crop X1`, variableId: `input_${type}_position_cropx1` })
        inputSet.add({ name: `Input ${title} Position Crop X2`, variableId: `input_${type}_position_cropx2` })
        inputSet.add({ name: `Input ${title} Position Crop Y1`, variableId: `input_${type}_position_cropy1` })
        inputSet.add({ name: `Input ${title} Position Crop Y2`, variableId: `input_${type}_position_cropy2` })
      }

      if (instance.config.variablesShowInputCC) {
        inputSet.add({ name: `Input ${title} Colour Correction Hue`, variableId: `input_${type}_cc_hue` })
        inputSet.add({ name: `Input ${title} Colour Correction Saturation`, variableId: `input_${type}_cc_saturation` })
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

  // Filter variables displayed based on Config settings
  let filteredVariables = [...definitions]
  if (instance.config.variablesShowInputs) filteredVariables = [...filteredVariables, ...inputNameVariables]
  if (instance.config.variablesShowInputNumbers) filteredVariables = [...filteredVariables, ...inputNumberVariables]
  if (instance.config.variablesShowInputGUID) filteredVariables = [...filteredVariables, ...inputKeyVariables]

  return filteredVariables
}

export const inputValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: VariablesInputValues = {}

  variables.input_any_solo = instance.data.inputs.some((input) => input.solo).toString()

  for (const input of instance.data.inputs) {
    const inputName = input.shortTitle ? input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '') : input.title.replace(/[^a-z0-9-_.]+/gi, '')

    const inputTypes: (string | number)[] = []
    if (instance.config.variablesShowInputNumbers) inputTypes.push(input.number)
    if (instance.config.variablesShowInputs) {
      inputTypes.push(instance.config.variablesShowInputsLowercase ? inputName.toLowerCase() : inputName)
    }
    if (instance.config.variablesShowInputGUID) inputTypes.push(input.key)

    for (const type of inputTypes) {
      variables[`input_${type}_name`] = input.shortTitle || input.title
      variables[`input_${type}_full_title`] = input.title
      variables[`input_${type}_number`] = input.number
      variables[`input_${type}_guid`] = input.key
      variables[`input_${type}_type`] = input.type

      instance.data.mix
        .filter((mix) => mix.active)
        .forEach((mix) => {
          const tallyPreview = instance.data.mix[mix.number - 1].previewTally.includes(input.key) || instance.data.mix[mix.number - 1].preview === input.number
          const tallyProgram = instance.data.mix[mix.number - 1].programTally.includes(input.key) || instance.data.mix[mix.number - 1].program === input.number

          variables[`input_${type}_mix_${mix.number}_tally_preview`] = tallyPreview.toString()
          variables[`input_${type}_mix_${mix.number}_tally_program`] = tallyProgram.toString()
        })

      const inputAudio = input.muted === undefined ? false : input.muted

      variables[`input_${type}_playing`] = (input.state === 'Running').toString()
      variables[`input_${type}_loop`] = input.loop.toString()
      variables[`input_${type}_mute`] = inputAudio.toString()
      variables[`input_${type}_audio`] = (!inputAudio).toString()
      variables[`input_${type}_solo`] = input.solo?.toString() || 'false'

      if (input.duration > 1) {
        const inPosition = input.markIn ? input.markIn : 0
        const outPosition = input.markOut ? input.markOut : input.duration
        const duration = outPosition - inPosition
        const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

        const mm = (time: number): string => padding(Math.floor(time / 60000))
        const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
        const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

        variables[`input_${type}_duration`] = `${mm(duration)}:${ss(duration)}.${ms(duration)}`
      }

      const inputDuration = calcDuration(input)

      if (inputDuration !== null) {
        variables[`input_${type}_duration`] = `${inputDuration.mmssms}`
      }

      const inputRemaining = calcRemaining(input)

      if (inputRemaining !== null) {
        variables[`input_${type}_remaining`] = inputRemaining.ms
        variables[`input_${type}_remaining_ss`] = inputRemaining.ss
        variables[`input_${type}_remaining_ss.ms`] = inputRemaining.ssms
        variables[`input_${type}_remaining_mm.ss`] = inputRemaining.mmss
        variables[`input_${type}_remaining_mm.ss.ms`] = inputRemaining.mmssms
      }

      if (instance.config.variablesShowInputPosition) {
        variables[`input_${type}_position_panx`] = input.inputPosition?.panX ?? ''
        variables[`input_${type}_position_pany`] = input.inputPosition?.panY ?? ''
        variables[`input_${type}_position_zoomx`] = input.inputPosition?.zoomX ?? ''
        variables[`input_${type}_position_zoomy`] = input.inputPosition?.zoomY ?? ''
        variables[`input_${type}_position_cropx1`] = input.inputPosition?.cropX1 ?? ''
        variables[`input_${type}_position_cropx2`] = input.inputPosition?.cropX2 ?? ''
        variables[`input_${type}_position_cropy1`] = input.inputPosition?.cropY1 ?? ''
        variables[`input_${type}_position_cropy2`] = input.inputPosition?.cropY2 ?? ''
      }

      if (instance.config.variablesShowInputCC) {
        variables[`input_${type}_cc_hue`] = input.cc?.hue ?? ''
        variables[`input_${type}_cc_saturation`] = input.cc?.saturation ?? ''
        variables[`input_${type}_cc_liftr`] = input.cc?.liftR ?? ''
        variables[`input_${type}_cc_liftg`] = input.cc?.liftG ?? ''
        variables[`input_${type}_cc_liftb`] = input.cc?.liftB ?? ''
        variables[`input_${type}_cc_lifty`] = input.cc?.liftY ?? ''
        variables[`input_${type}_cc_gammar`] = input.cc?.gammaR ?? ''
        variables[`input_${type}_cc_gammag`] = input.cc?.gammaG ?? ''
        variables[`input_${type}_cc_gammab`] = input.cc?.gammaB ?? ''
        variables[`input_${type}_cc_gammay`] = input.cc?.gammaY ?? ''
        variables[`input_${type}_cc_gainr`] = input.cc?.gainR ?? ''
        variables[`input_${type}_cc_gaing`] = input.cc?.gainG ?? ''
        variables[`input_${type}_cc_gainb`] = input.cc?.gainB ?? ''
        variables[`input_${type}_cc_gainy`] = input.cc?.gainY ?? ''
      }

      if (instance.config.variablesShowInputLayers) {
        for (let i = 0; i < 10; i++) {
          variables[`input_${type}_layer_${i + 1}_name`] = ''
          variables[`input_${type}_layer_${i + 1}_number`] = ''
          variables[`input_${type}_layer_${i + 1}_key`] = ''
        }

        for (const layer of input.overlay || []) {
          const overlayInput = await instance.data.getInput(layer.key)
          let overlayinputName = ''

          if (overlayInput)
            overlayinputName = overlayInput.shortTitle ? overlayInput.shortTitle.replace(/[^a-z0-9-_. ]+/gi, '') : overlayInput.title.replace(/[^a-z0-9-_. ]+/gi, '')

          variables[`input_${type}_layer_${layer.index + 1}_name`] = overlayinputName
          variables[`input_${type}_layer_${layer.index + 1}_number`] = overlayInput?.number || ''
          variables[`input_${type}_layer_${layer.index + 1}_key`] = overlayInput?.key || ''

          if (instance.config.variablesShowInputLayerPosition) {
            variables[`input_${type}_layer_${layer.index + 1}_panx`] = layer.panX ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_pany`] = layer.panY ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_x`] = layer.x ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_y`] = layer.y ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_zoomx`] = layer.zoomX ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_zoomy`] = layer.zoomY ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_width`] = layer.width ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_height`] = layer.height ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_cropx1`] = layer.cropX1 ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_cropx2`] = layer.cropX2 ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_cropy1`] = layer.cropY1 ?? ''
            variables[`input_${type}_layer_${layer.index + 1}_cropy2`] = layer.cropY2 ?? ''
          }
        }
      }

      if (instance.config.variablesShowInputTitleIndex || instance.config.variablesShowInputTitleName) {
        input.text?.forEach((textLayer) => {
          if (instance.config.variablesShowInputTitleIndex) variables[`input_${type}_layer_${textLayer.index}_titletext`] = textLayer.value
          if (instance.config.variablesShowInputTitleName) variables[`input_${type}_layer_${textLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titletext`] = textLayer.value
        })

        input.image?.forEach((imageLayer) => {
          if (instance.config.variablesShowInputTitleIndex) variables[`input_${type}_layer_${imageLayer.index}_titleimage`] = imageLayer.value
          if (instance.config.variablesShowInputTitleName) variables[`input_${type}_layer_${imageLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titleimage`] = imageLayer.value
        })

        input.color?.forEach((colorLayer) => {
          if (instance.config.variablesShowInputTitleIndex) variables[`input_${type}_layer_${colorLayer.index}_titlecolor`] = colorLayer.value
          if (instance.config.variablesShowInputTitleName) variables[`input_${type}_layer_${colorLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titlecolor`] = colorLayer.value
        })
      }

      if (input.list && instance.config.variablesShowInputList) {
        input.list.forEach((listItem) => {
          variables[`input_${type}_list_${listItem.index + 1}_name`] = listItem.filename
          variables[`input_${type}_list_${listItem.index + 1}_selected`] = listItem.selected.toString()

          if (listItem.selected) {
            variables[`input_${type}_selected`] = listItem.index + 1
            variables[`input_${type}_selected_name`] = listItem.filename
          }
        })
      }

      if (input.type === 'PowerPoint' && input.selectedIndex !== undefined) {
        variables[`input_${type}_selected`] = input.selectedIndex
      }

      if (input.type === 'Photos' || input.type === 'VideoList' || input.type === 'VirtualSet') {
        variables[`input_${type}_selected`] = input.position
        variables[`input_${type}_selectedindex`] = input.selectedIndex
        variables[`input_${type}_selected_name`] = input.title.split(`${input.shortTitle} - `)[1]
      }

      if (input.type === 'GT') {
        variables[`input_${type}_selectedindex`] = input.selectedIndex
      }

      if (input.type === 'VideoCall') {
        let audioSource = input.callAudioSource as string
        if (audioSource.startsWith('Bus')) {
          audioSource = audioSource.substr(3)
        }

        variables[`input_${type}_call_password`] = input.callPassword
        variables[`input_${type}_call_connected`] = input.callConnected ? 'Connected' : 'Disconnected'
        variables[`input_${type}_call_video_source`] = input.callVideoSource
        variables[`input_${type}_call_audio_source`] = input.callAudioSource
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

        variables[`input_${type}_volume`] = volume
        variables[`input_${type}_volume_db`] = volumedB
        variables[`input_${type}_volume_linear`] = volumeLinear

        if (input.volumeF1 !== undefined) {
          variables[`input_${type}_volume_f1`] = (input.volumeF1 * 100).toFixed(2)
          variables[`input_${type}_volume_f1_db`] = volumeTodB(input.volumeF1 * 100).toFixed(1)
          variables[`input_${type}_volume_f1_linear`] = Math.round(volumeToLinear(input.volumeF1 * 100))
        }

        if (input.volumeF2 !== undefined) {
          variables[`input_${type}_volume_f2`] = (input.volumeF2 * 100).toFixed(2)
          variables[`input_${type}_volume_f2_db`] = volumeTodB(input.volumeF2 * 100).toFixed(1)
          variables[`input_${type}_volume_f2_linear`] = Math.round(volumeToLinear(input.volumeF2 * 100))
        }

        if (input.meterF1 !== undefined) {
          variables[`input_${type}_meterf1`] = volumeTodB(input.meterF1 * 100).toFixed(1)
        }
        if (input.meterF2 !== undefined) {
          variables[`input_${type}_meterf2`] = volumeTodB(input.meterF2 * 100).toFixed(1)
        }

        const audioLevel = instance.data.audioLevels.find((level) => level.key === input.key)
        if (audioLevel) {
          const audioLevelData = instance.data.getAudioLevelData(audioLevel)

          variables[`input_${type}_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg * 100).toFixed(1)
          variables[`input_${type}_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg * 100).toFixed(1)
          variables[`input_${type}_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg * 100).toFixed(1)
          variables[`input_${type}_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg * 100).toFixed(1)
          variables[`input_${type}_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak * 100).toFixed(1)
          variables[`input_${type}_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak * 100).toFixed(1)
          variables[`input_${type}_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak * 100).toFixed(1)
          variables[`input_${type}_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak * 100).toFixed(1)
        }
      }

      variables[`input_${type}_framedelay`] = input.frameDelay ?? 0
    }
  }

  return variables
}
