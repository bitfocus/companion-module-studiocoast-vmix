import type { CompanionVariableDefinition, CompanionVariableDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'
import { calcDuration, calcRemaining, volumeTodB, volumeToLinear } from '../utils.js'

export type InputVariablesSchema = Partial<{
  input_any_solo: string
  [key: `input_${string}_name`]: string
  [key: `input_${string}_full_title`]: string
  [key: `input_${string}_guid`]: string
  [key: `input_${string}_type`]: string
  [key: `input_${string}_number`]: number | string
  [key: `input_${string}_mix_${number}_tally_preview`]: string
  [key: `input_${string}_mix_${number}_tally_program`]: string
  [key: `input_${string}_playing`]: string
  [key: `input_${string}_loop`]: string
  [key: `input_${string}_mute`]: string
  [key: `input_${string}_audio`]: string
  [key: `input_${string}_solo`]: string
  [key: `input_${string}_duration`]: string
  [key: `input_${string}_position`]: string
  [key: `input_${string}_remaining`]: string
  [key: `input_${string}_remaining_ss`]: string
  [key: `input_${string}_remaining_ss.ms`]: string
  [key: `input_${string}_remaining_mm.ss`]: string
  [key: `input_${string}_remaining_mm.ss.ms`]: string
  [key: `input_${string}_layer_${number}_name`]: string
  [key: `input_${string}_layer_${number}_number`]: number | string
  [key: `input_${string}_layer_${number}_key`]: string
  [key: `input_${string}_layer_${number}_panx`]: number | string
  [key: `input_${string}_layer_${number}_pany`]: number | string
  [key: `input_${string}_layer_${number}_x`]: number | string
  [key: `input_${string}_layer_${number}_y`]: number | string
  [key: `input_${string}_layer_${number}_zoomx`]: number | string
  [key: `input_${string}_layer_${number}_zoomy`]: number | string
  [key: `input_${string}_layer_${number}_width`]: number | string
  [key: `input_${string}_layer_${number}_height`]: number | string
  [key: `input_${string}_layer_${number}_cropx1`]: number | string
  [key: `input_${string}_layer_${number}_cropx2`]: number | string
  [key: `input_${string}_layer_${number}_cropy1`]: number | string
  [key: `input_${string}_layer_${number}_cropy2`]: number | string
  [key: `input_${string}_layer_${number | string}_title${'text' | 'image' | 'color'}`]: string
  [key: `input_${string}_selected`]: number | string
  [key: `input_${string}_selectedindex`]: number | string
  [key: `input_${string}_selected_name`]: string
  [key: `input_${string}_list_${number}_name`]: string
  [key: `input_${string}_list_${number}_selected`]: string
  [key: `input_${string}_call_password`]: string
  [key: `input_${string}_call_connected`]: string
  [key: `input_${string}_call_video_source`]: string
  [key: `input_${string}_call_audio_source`]: string
  [key: `input_${string}_volume`]: string
  [key: `input_${string}_volume_db`]: string
  [key: `input_${string}_volume_linear`]: number | string
  [key: `input_${string}_framedelay`]: number
  [key: `input_${string}_volume_${'f1' | 'f2'}`]: string
  [key: `input_${string}_volume_${'f1' | 'f2'}_db`]: string
  [key: `input_${string}_volume_${'f1' | 'f2'}_linear`]: number | string
  [key: `input_${string}_meter${'f1' | 'f2'}`]: string
  [key: `input_${string}_meter${'f1' | 'f2'}_avg_1s`]: string
  [key: `input_${string}_meter${'f1' | 'f2'}_avg_3s`]: string
  [key: `input_${string}_meter${'f1' | 'f2'}_peak_1s`]: string
  [key: `input_${string}_meter${'f1' | 'f2'}_peak_3s`]: string
  [key: `input_${string}_position_panx`]: number | string
  [key: `input_${string}_position_pany`]: number | string
  [key: `input_${string}_position_zoomx`]: number | string
  [key: `input_${string}_position_zoomy`]: number | string
  [key: `input_${string}_position_cropx1`]: number | string
  [key: `input_${string}_position_cropx2`]: number | string
  [key: `input_${string}_position_cropy1`]: number | string
  [key: `input_${string}_position_cropy2`]: number | string
  [key: `input_${string}_cc_hue`]: number | string
  [key: `input_${string}_cc_saturation`]: number | string
  [key: `input_${string}_cc_liftr`]: number | string
  [key: `input_${string}_cc_liftg`]: number | string
  [key: `input_${string}_cc_liftb`]: number | string
  [key: `input_${string}_cc_lifty`]: number | string
  [key: `input_${string}_cc_gammar`]: number | string
  [key: `input_${string}_cc_gammag`]: number | string
  [key: `input_${string}_cc_gammab`]: number | string
  [key: `input_${string}_cc_gammay`]: number | string
  [key: `input_${string}_cc_gainr`]: number | string
  [key: `input_${string}_cc_gaing`]: number | string
  [key: `input_${string}_cc_gainb`]: number | string
  [key: `input_${string}_cc_gainy`]: number | string
}>

export const inputDefinitions = (instance: VMixInstance): CompanionVariableDefinitions => {
  const definitions: CompanionVariableDefinitions<InputVariablesSchema> = {
    input_any_solo: { name: 'Input Any Solo' },
  }

  const inputNumberVariables = new Map<string, CompanionVariableDefinition>()
  const inputNameVariables = new Map<string, CompanionVariableDefinition>()
  const inputKeyVariables = new Map<string, CompanionVariableDefinition>()

  definitions

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

      inputSet.set(`input_${type}_name`, { name: `Input ${title} Short Title` })
      inputSet.set(`input_${type}_full_title`, { name: `Input ${title} Full Title` })
      inputSet.set(`input_${type}_guid`, { name: `Input ${title} GUID` })
      inputSet.set(`input_${type}_type`, { name: `Input ${title} Type` })
      inputSet.set(`input_${type}_number`, { name: `Input ${title} Number` })

      instance.data.mix
        .filter((mix) => mix.active)
        .forEach((mix) => {
          inputSet.set(`input_${type}_mix_${mix.number}_tally_preview`, { name: `Input ${title} Mix ${mix.number} Tally Preview` })
          inputSet.set(`input_${type}_mix_${mix.number}_tally_program`, { name: `Input ${title} Mix ${mix.number} Tally Program` })
        })

      inputSet.set(`input_${type}_playing`, { name: `Input ${title} Playing` })
      inputSet.set(`input_${type}_loop`, { name: `Input ${title} Loop` })
      inputSet.set(`input_${type}_mute`, { name: `Input ${title} Muted` })
      inputSet.set(`input_${type}_audio`, { name: `Input ${title} Audio` })
      inputSet.set(`input_${type}_solo`, { name: `Input ${title} Solo` })

      if (input.duration > 1) {
        inputSet.set(`input_${type}_duration`, { name: `Input ${title} Duration` })
      }

      if (input.position !== undefined) {
        inputSet.set(`input_${type}_position`, { name: `Input ${title} Position` })
        inputSet.set(`input_${type}_remaining`, { name: `Input ${title} Remaining` })
        inputSet.set(`input_${type}_remaining_ss`, { name: `Input ${title} Remaining ss` })
        inputSet.set(`input_${type}_remaining_ss.ms`, { name: `Input ${title} Remaining ss.ms` })
        inputSet.set(`input_${type}_remaining_mm.ss`, { name: `Input ${title} Remaining mm:ss` })
        inputSet.set(`input_${type}_remaining_mm.ss.ms`, { name: `Input ${title} Remaining mm:ss.ms` })
      }

      if (instance.config.variablesShowInputLayers) {
        for (let i = 1; i < 11; i++) {
          inputSet.set(`input_${type}_layer_${i}_name`, { name: `Input ${title} layer ${i} Name` })
          inputSet.set(`input_${type}_layer_${i}_number`, { name: `Input ${title} layer ${i} Number` })
          inputSet.set(`input_${type}_layer_${i}_key`, { name: `Input ${title} layer ${i} Key` })

          if (instance.config.variablesShowInputLayerPosition) {
            inputSet.set(`input_${type}_layer_${i}_panx`, { name: `Input ${title} layer ${i} Pan X (Percent)` })
            inputSet.set(`input_${type}_layer_${i}_pany`, { name: `Input ${title} layer ${i} Pan Y (Percent)` })
            inputSet.set(`input_${type}_layer_${i}_x`, { name: `Input ${title} layer ${i} Pan X (Pixels)` })
            inputSet.set(`input_${type}_layer_${i}_y`, { name: `Input ${title} layer ${i} Pan Y (Pixels)` })
            inputSet.set(`input_${type}_layer_${i}_zoomx`, { name: `Input ${title} layer ${i} Zoom X` })
            inputSet.set(`input_${type}_layer_${i}_zoomy`, { name: `Input ${title} layer ${i} Zoom Y` })
            inputSet.set(`input_${type}_layer_${i}_width`, { name: `Input ${title} layer ${i} Width` })
            inputSet.set(`input_${type}_layer_${i}_height`, { name: `Input ${title} layer ${i} Height` })
            inputSet.set(`input_${type}_layer_${i}_cropx1`, { name: `Input ${title} layer ${i} Crop X1` })
            inputSet.set(`input_${type}_layer_${i}_cropx2`, { name: `Input ${title} layer ${i} Crop X2` })
            inputSet.set(`input_${type}_layer_${i}_cropy1`, { name: `Input ${title} layer ${i} Crop Y1` })
            inputSet.set(`input_${type}_layer_${i}_cropy2`, { name: `Input ${title} layer ${i} Crop Y2` })
          }
        }
      }

      if (instance.config.variablesShowInputTitleIndex || instance.config.variablesShowInputTitleName) {
        input.text?.forEach((textLayer) => {
          if (instance.config.variablesShowInputTitleIndex) {
            inputSet.set(`input_${type}_layer_${textLayer.index}_titletext`, { name: `Input ${title} layer ${textLayer.index} Title Text` })
          }

          if (instance.config.variablesShowInputTitleName) {
            inputSet.set(`input_${type}_layer_${textLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titletext`, {
              name: `Input ${title} layer ${textLayer.name} Title Text`,
            })
          }
        })

        input.image?.forEach((imageLayer) => {
          if (instance.config.variablesShowInputTitleIndex) {
            inputSet.set(`input_${type}_layer_${imageLayer.index}_titleimage`, { name: `Input ${title} layer ${imageLayer.index} Title Image` })
          }

          if (instance.config.variablesShowInputTitleName) {
            inputSet.set(`input_${type}_layer_${imageLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titleimage`, {
              name: `Input ${title} layer ${imageLayer.name} Title Text`,
            })
          }
        })

        input.color?.forEach((imageColor) => {
          if (instance.config.variablesShowInputTitleIndex) {
            inputSet.set(`input_${type}_layer_${imageColor.index}_titlecolor`, { name: `Input ${title} layer ${imageColor.index} Title Color` })
          }

          if (instance.config.variablesShowInputTitleName) {
            inputSet.set(`input_${type}_layer_${imageColor.name.replace(/[^a-z0-9-_.]+/gi, '')}_titlecolor`, {
              name: `Input ${title} layer ${imageColor.name} Title Text`,
            })
          }
        })
      }

      if (input.type === 'PowerPoint') {
        inputSet.set(`input_${type}_selected`, { name: `Input ${title} Selected Index` })
      }

      if (input.type === 'VideoList' || input.type === 'VirtualSet' || input.type === 'Photos') {
        inputSet.set(`input_${type}_selected`, { name: `Input ${title} Selected Position` })
        inputSet.set(`input_${type}_selectedindex`, { name: `Input ${title} Selected Index` })
        inputSet.set(`input_${type}_selected_name`, { name: `Input ${title} Selected Name` })
      }

      if (input.list && instance.config.variablesShowInputList) {
        input.list.forEach((listItem) => {
          inputSet.set(`input_${type}_list_${listItem.index + 1}_name`, { name: `Input ${title} List ${listItem.index + 1} Name` })
          inputSet.set(`input_${type}_list_${listItem.index + 1}_selected`, { name: `Input ${title} List ${listItem.index + 1} Selected` })
        })
      }

      if (input.type === 'VideoCall') {
        inputSet.set(`input_${type}_call_password`, { name: `Input ${title} Call Password` })
        inputSet.set(`input_${type}_call_connected`, { name: `Input ${title} Call Connected` })
        inputSet.set(`input_${type}_call_video_source`, { name: `Input ${title} Call Video Source` })
        inputSet.set(`input_${type}_call_audio_source`, { name: `Input ${title} Call Audio Source` })
      }

      if (instance.config.variablesShowInputVolume) {
        inputSet.set(`input_${type}_volume`, { name: `Input ${title} Volume` })
        inputSet.set(`input_${type}_volume_db`, { name: `Input ${title} Volume dB` })
        inputSet.set(`input_${type}_volume_linear`, { name: `Input ${title} Volume Linear` })

        if (input.volumeF1 !== undefined) {
          inputSet.set(`input_${type}_volume_f1`, { name: `Input ${title} Volume F1` })
          inputSet.set(`input_${type}_volume_f1_db`, { name: `Input ${title} Volume F1 dB` })
          inputSet.set(`input_${type}_volume_f1_linear`, { name: `Input ${title} Volume F1 Linear` })
        }

        if (input.volumeF2 !== undefined) {
          inputSet.set(`input_${type}_volume_f2`, { name: `Input ${title} Volume F2` })
          inputSet.set(`input_${type}_volume_f2_db`, { name: `Input ${title} Volume F2 dB` })
          inputSet.set(`input_${type}_volume_f2_linear`, { name: `Input ${title} Volume F2 Linear` })
        }

        if (input.meterF1 !== undefined) {
          inputSet.set(`input_${type}_meterf1`, { name: `Input ${title} MeterF1` })
        }

        if (input.meterF2 !== undefined) {
          inputSet.set(`input_${type}_meterf2`, { name: `Input ${title} MeterF2` })
        }

        const audioLevel = instance.data.audioLevels.find((level) => level.key === input.key)
        if (audioLevel) {
          inputSet.set(`input_${type}_meterf1_avg_1s`, { name: `Input ${title} Meter F1 Average 1s` })
          inputSet.set(`input_${type}_meterf2_avg_1s`, { name: `Input ${title} Meter F2 Average 1s` })
          inputSet.set(`input_${type}_meterf1_avg_3s`, { name: `Input ${title} Meter F1 Average 3s` })
          inputSet.set(`input_${type}_meterf2_avg_3s`, { name: `Input ${title} Meter F2 Average 3s` })
          inputSet.set(`input_${type}_meterf1_peak_1s`, { name: `Input ${title} Meter F1 Peak 1s` })
          inputSet.set(`input_${type}_meterf2_peak_1s`, { name: `Input ${title} Meter F2 Peak 1s` })
          inputSet.set(`input_${type}_meterf1_peak_3s`, { name: `Input ${title} Meter F1 Peak 3s` })
          inputSet.set(`input_${type}_meterf2_peak_3s`, { name: `Input ${title} Meter F2 Peak 3s` })
        }
      }

      inputSet.set(`input_${type}_framedelay`, { name: `Input ${title} Frame Delay` })

      if (instance.config.variablesShowInputPosition) {
        inputSet.set(`input_${type}_position_panx`, { name: `Input ${title} Position Pan X` })
        inputSet.set(`input_${type}_position_pany`, { name: `Input ${title} Position Pan Y` })
        inputSet.set(`input_${type}_position_zoomx`, { name: `Input ${title} Position Zoom X` })
        inputSet.set(`input_${type}_position_zoomy`, { name: `Input ${title} Position Zoom X` })
        inputSet.set(`input_${type}_position_cropx1`, { name: `Input ${title} Position Crop X1` })
        inputSet.set(`input_${type}_position_cropx2`, { name: `Input ${title} Position Crop X2` })
        inputSet.set(`input_${type}_position_cropy1`, { name: `Input ${title} Position Crop Y1` })
        inputSet.set(`input_${type}_position_cropy2`, { name: `Input ${title} Position Crop Y2` })
      }

      if (instance.config.variablesShowInputCC) {
        inputSet.set(`input_${type}_cc_hue`, { name: `Input ${title} Colour Correction Hue` })
        inputSet.set(`input_${type}_cc_saturation`, { name: `Input ${title} Colour Correction Saturation` })
        inputSet.set(`input_${type}_cc_liftr`, { name: `Input ${title} Colour Correction Lift R` })
        inputSet.set(`input_${type}_cc_liftg`, { name: `Input ${title} Colour Correction Lift G` })
        inputSet.set(`input_${type}_cc_liftb`, { name: `Input ${title} Colour Correction Lift B` })
        inputSet.set(`input_${type}_cc_lifty`, { name: `Input ${title} Colour Correction Lift Y` })
        inputSet.set(`input_${type}_cc_gammar`, { name: `Input ${title} Colour Correction Gamma R` })
        inputSet.set(`input_${type}_cc_gammag`, { name: `Input ${title} Colour Correction Gamma G` })
        inputSet.set(`input_${type}_cc_gammab`, { name: `Input ${title} Colour Correction Gamma B` })
        inputSet.set(`input_${type}_cc_gammay`, { name: `Input ${title} Colour Correction Gamma Y` })
        inputSet.set(`input_${type}_cc_gainr`, { name: `Input ${title} Colour Correction Gain R` })
        inputSet.set(`input_${type}_cc_gaing`, { name: `Input ${title} Colour Correction Gain G` })
        inputSet.set(`input_${type}_cc_gainb`, { name: `Input ${title} Colour Correction Gain B` })
        inputSet.set(`input_${type}_cc_gainy`, { name: `Input ${title} Colour Correction Gain Y` })
      }
    }
  })

  // Filter variables displayed based on Config settings
  let filteredVariables: CompanionVariableDefinitions<InputVariablesSchema> = { ...definitions }
  if (instance.config.variablesShowInputs) filteredVariables = { ...filteredVariables, ...Object.fromEntries(inputNameVariables) }
  if (instance.config.variablesShowInputNumbers) filteredVariables = { ...filteredVariables, ...Object.fromEntries(inputNumberVariables) }
  if (instance.config.variablesShowInputGUID) filteredVariables = { ...filteredVariables, ...Object.fromEntries(inputKeyVariables) }

  return filteredVariables
}

export const inputValues = async (instance: VMixInstance): Promise<InputVariablesSchema> => {
  const variables: InputVariablesSchema = {
    input_any_solo: instance.data.inputs.some((input) => input.solo).toString(),
  }

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

			if (input.position !== undefined) {
        variables[`input_${type}_position`] = input.position.toString()
			}

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
        variables[`input_${type}_selectedindex`] = input.selectedIndex || ''
        variables[`input_${type}_selected_name`] = input.title.split(`${input.shortTitle} - `)[1]
      }

      if (input.type === 'GT') {
        variables[`input_${type}_selectedindex`] = input.selectedIndex || ''
      }

      if (input.type === 'VideoCall') {
        let audioSource = input.callAudioSource as string
        if (audioSource.startsWith('Bus')) {
          audioSource = audioSource.substr(3)
        }

        variables[`input_${type}_call_password`] = input.callPassword || ''
        variables[`input_${type}_call_connected`] = input.callConnected ? 'Connected' : 'Disconnected'
        variables[`input_${type}_call_video_source`] = input.callVideoSource || ''
        variables[`input_${type}_call_audio_source`] = input.callAudioSource || ''
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
