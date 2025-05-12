import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '../'
import { Mix } from '../data'
import { calcDuration, calcRemaining, volumeTodB } from '../utils'

type MixID = number | 'selected'
type MixType = 'preview' | 'program'

type VariablesMixIDs =
  | `mix_${MixID}_${MixType}`
  | `mix_${MixID}_${MixType}_name`
  | `mix_${MixID}_${MixType}_guid`
  | `mix_${MixID}_${MixType}_playing`
  | `mix_${MixID}_${MixType}_loop`
  | `mix_${MixID}_${MixType}_audio`
  | `mix_${MixID}_${MixType}_mute`
  | `mix_${MixID}_${MixType}_framedelay`
  | `mix_${MixID}_${MixType}_meterf1`
  | `mix_${MixID}_${MixType}_meterf2`
  | `mix_${MixID}_${MixType}_meterf1_avg_1s`
  | `mix_${MixID}_${MixType}_meterf2_avg_1s`
  | `mix_${MixID}_${MixType}_meterf1_avg_3s`
  | `mix_${MixID}_${MixType}_meterf2_avg_3s`
  | `mix_${MixID}_${MixType}_meterf1_peak_1s`
  | `mix_${MixID}_${MixType}_meterf2_peak_1s`
  | `mix_${MixID}_${MixType}_meterf1_peak_3s`
  | `mix_${MixID}_${MixType}_meterf2_peak_3s`
  | `mix_${MixID}_${MixType}_duration`
  | `mix_${MixID}_${MixType}_remaining`
  | `mix_${MixID}_${MixType}_position_panx`
  | `mix_${MixID}_${MixType}_position_pany`
  | `mix_${MixID}_${MixType}_position_zoomx`
  | `mix_${MixID}_${MixType}_position_zoomy`
  | `mix_${MixID}_${MixType}_position_cropx1`
  | `mix_${MixID}_${MixType}_position_cropx2`
  | `mix_${MixID}_${MixType}_position_cropy1`
  | `mix_${MixID}_${MixType}_position_cropy2`
  | `mix_${MixID}_${MixType}_cc_hue`
  | `mix_${MixID}_${MixType}_cc_saturation`
  | `mix_${MixID}_${MixType}_cc_liftr`
  | `mix_${MixID}_${MixType}_cc_liftg`
  | `mix_${MixID}_${MixType}_cc_liftb`
  | `mix_${MixID}_${MixType}_cc_lifty`
  | `mix_${MixID}_${MixType}_cc_gammar`
  | `mix_${MixID}_${MixType}_cc_gammag`
  | `mix_${MixID}_${MixType}_cc_gammab`
  | `mix_${MixID}_${MixType}_cc_gammay`
  | `mix_${MixID}_${MixType}_cc_gainr`
  | `mix_${MixID}_${MixType}_cc_gaing`
  | `mix_${MixID}_${MixType}_cc_gainb`
  | `mix_${MixID}_${MixType}_cc_gainy`
  | `mix_${MixID}_${MixType}_layer_${number}_number`
  | `mix_${MixID}_${MixType}_layer_${number}_name`
  | `mix_${MixID}_${MixType}_layer_${number}_key`
  | `mix_${MixID}_${MixType}_layer_${number}_panx`
  | `mix_${MixID}_${MixType}_layer_${number}_pany`
  | `mix_${MixID}_${MixType}_layer_${number}_x`
  | `mix_${MixID}_${MixType}_layer_${number}_y`
  | `mix_${MixID}_${MixType}_layer_${number}_zoomx`
  | `mix_${MixID}_${MixType}_layer_${number}_zoomy`
  | `mix_${MixID}_${MixType}_layer_${number}_width`
  | `mix_${MixID}_${MixType}_layer_${number}_height`
  | `mix_${MixID}_${MixType}_layer_${number}_cropx1`
  | `mix_${MixID}_${MixType}_layer_${number}_cropx2`
  | `mix_${MixID}_${MixType}_layer_${number}_cropy1`
  | `mix_${MixID}_${MixType}_layer_${number}_cropy2`
  | `mix_selected`

type VariablesMixValues = Partial<Record<VariablesMixIDs, string | number | undefined>>

export const mixDefinitions = async (instance: VMixInstance): Promise<CompanionVariableDefinition[]> => {
  const definitions: CompanionVariableDefinition[] = []

  if (!instance.config.variablesShowMix) return definitions

  const mixTypes = ['Preview', 'Program']
  const mixes = instance.data.mix.filter((mix) => mix.active)

  const setDefinitions = async (mix: Mix, selected: boolean = false): Promise<void> => {
    const id = selected ? 'Selected' : mix.number.toString()
    const mixProgramInput = await instance.data.getInput(mix.program)
    const mixPreviewInput = await instance.data.getInput(mix.preview)

    for (const type of mixTypes) {
      const input = type === 'preview' ? mixPreviewInput : mixProgramInput
      if (!input) return

      definitions.push(
        { name: `Mix ${id} ${type}`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}` },
        { name: `Mix ${id} ${type} Short Title`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_name` },
        { name: `Mix ${id} ${type} GUID`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_guid` },
        { name: `Mix ${id} ${type} Playing`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_playing` },
        { name: `Mix ${id} ${type} Loop`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_loop` },
        { name: `Mix ${id} ${type} Audio`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_audio` },
        { name: `Mix ${id} ${type} Mute`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_mute` },
        { name: `Mix ${id} ${type} Frame Delay`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_framedelay` },
        { name: `Mix ${id} ${type} Duration`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_duration` },
        { name: `Mix ${id} ${type} Remaining`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_remaining` }
      )

      if (instance.config.variablesShowInputVolume) {
        definitions.push(
          { name: `Mix ${id} ${type} Meter F1`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1` },
          { name: `Mix ${id} ${type} Meter F2`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2` },
          { name: `Mix ${id} ${type} Meter F1 Avg 1s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1_avg_1s` },
          { name: `Mix ${id} ${type} Meter F2 Avg 1s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2_avg_1s` },
          { name: `Mix ${id} ${type} Meter F1 Avg 3s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1_avg_3s` },
          { name: `Mix ${id} ${type} Meter F2 Avg 3s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2_avg_3s` },
          { name: `Mix ${id} ${type} Meter F1 Peak 1s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1_peak_1s` },
          { name: `Mix ${id} ${type} Meter F2 Peak 1s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2_peak_1s` },
          { name: `Mix ${id} ${type} Meter F1 Peak 3s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1_peak_3s` },
          { name: `Mix ${id} ${type} Meter F2 Peak 3s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2_peak_3s` }
        )
      }

      if (instance.config.variablesShowInputPosition) {
        definitions.push(
          { name: `Mix ${id} ${type} Position Pan X`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_panx` },
          { name: `Mix ${id} ${type} Position Pan Y`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_pany` },
          { name: `Mix ${id} ${type} Position Zoom X`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_zoomx` },
          { name: `Mix ${id} ${type} Position Zoom Y`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_zoomy` },
          { name: `Mix ${id} ${type} Position Crop X1`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_cropx1` },
          { name: `Mix ${id} ${type} Position Crop X2`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_cropx2` },
          { name: `Mix ${id} ${type} Position Crop Y1`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_cropy1` },
          { name: `Mix ${id} ${type} Position Crop Y2`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_cropy2` }
        )
      }

      if (instance.config.variablesShowInputCC) {
        definitions.push(
          { name: `Mix ${id} ${type} CC Hue`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_hue` },
          { name: `Mix ${id} ${type} CC Saturation`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_saturation` },
          { name: `Mix ${id} ${type} CC Lift R`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_liftr` },
          { name: `Mix ${id} ${type} CC Lift G`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_liftg` },
          { name: `Mix ${id} ${type} CC Lift B`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_liftb` },
          { name: `Mix ${id} ${type} CC Lift Y`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_lifty` },
          { name: `Mix ${id} ${type} CC Gamma R`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_gammar` },
          { name: `Mix ${id} ${type} CC Gamma G`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_gammag` },
          { name: `Mix ${id} ${type} CC Gamma B`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_gammab` },
          { name: `Mix ${id} ${type} CC Gamma Y`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_gammay` },
          { name: `Mix ${id} ${type} CC Gain R`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_gainr` },
          { name: `Mix ${id} ${type} CC Gain G`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_gaing` },
          { name: `Mix ${id} ${type} CC Gain B`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_gainb` },
          { name: `Mix ${id} ${type} CC Gain Y`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_gainy` }
        )
      }

      if (instance.config.variablesShowInputLayers) {
        for (let i = 1; i < 11; i++) {
          definitions.push(
            { name: `Mix ${id} ${type} Layer ${i} Number`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_layer_${i}_number` },
            { name: `Mix ${id} ${type} Layer ${i} Name`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_layer_${i}_name` },
            { name: `Mix ${id} ${type} Layer ${i} Key`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_layer_${i}_key` }
          )

          if (instance.config.variablesShowInputLayerPosition) {
            definitions.push(
              { name: `Mix ${id} ${type} Layer ${i} Pan X`, variableId: `mix_${id}_${type}_layer_${i}_panx` },
              { name: `Mix ${id} ${type} Layer ${i} Pan Y`, variableId: `mix_${id}_${type}_layer_${i}_pany` },
              { name: `Mix ${id} ${type} Layer ${i} X`, variableId: `mix_${id}_${type}_layer_${i}_x` },
              { name: `Mix ${id} ${type} Layer ${i} Y`, variableId: `mix_${id}_${type}_layer_${i}_y` },
              { name: `Mix ${id} ${type} Layer ${i} Zoom X`, variableId: `mix_${id}_${type}_layer_${i}_zoomx` },
              { name: `Mix ${id} ${type} Layer ${i} Zoom Y`, variableId: `mix_${id}_${type}_layer_${i}_zoomy` },
              { name: `Mix ${id} ${type} Layer ${i} Width`, variableId: `mix_${id}_${type}_layer_${i}_width` },
              { name: `Mix ${id} ${type} Layer ${i} Height`, variableId: `mix_${id}_${type}_layer_${i}_height` },
              { name: `Mix ${id} ${type} Layer ${i} Crop X1`, variableId: `mix_${id}_${type}_layer_${i}_cropx1` },
              { name: `Mix ${id} ${type} Layer ${i} Crop X2`, variableId: `mix_${id}_${type}_layer_${i}_cropx2` },
              { name: `Mix ${id} ${type} Layer ${i} Crop Y1`, variableId: `mix_${id}_${type}_layer_${i}_cropy1` },
              { name: `Mix ${id} ${type} Layer ${i} Crop Y2`, variableId: `mix_${id}_${type}_layer_${i}_cropy2` }
            )
          }
        }
      }
    }
  }

  for (const mix of mixes) {
    await setDefinitions(mix)
    if (mix.number === instance.routingData.mix + 1) await setDefinitions(mix, true)
  }

  definitions.push({ name: `Mix Selected`, variableId: `mix_selected` })

  return definitions
}

export const mixValues = async (instance: VMixInstance): Promise<VariablesMixValues> => {
  const variables: VariablesMixValues = {}
  if (!instance.config.variablesShowMix) return variables

  const mixTypes: MixType[] = ['preview', 'program']
  const mixes = instance.data.mix.filter((mix) => mix.active)

  const setVariables = async (mix: Mix, selected: boolean = false) => {
    const id = selected ? 'selected' : mix.number
    const mixProgramInput = await instance.data.getInput(mix.program)
    const mixPreviewInput = await instance.data.getInput(mix.preview)

    for (const type of mixTypes) {
      const input = type === 'preview' ? mixPreviewInput : mixProgramInput
      if (!input) return

      const inputAudio = input.muted === undefined ? false : input.muted
      variables[`mix_${id}_${type}`] = mix[type as 'preview' | 'program']
      variables[`mix_${id}_${type}_name`] = await instance.data.getInputTitle(mix[type as 'preview' | 'program'])
      variables[`mix_${id}_${type}_guid`] = input.key
      variables[`mix_${id}_${type}_playing`] = (input.state === 'Running').toString()
      variables[`mix_${id}_${type}_loop`] = input.loop.toString()
      variables[`mix_${id}_${type}_mute`] = inputAudio.toString()
      variables[`mix_${id}_${type}_audio`] = (!inputAudio).toString()
      variables[`mix_${id}_${type}_meterf1`] = volumeTodB((input.meterF1 || 0) * 100).toFixed(1)
      variables[`mix_${id}_${type}_meterf2`] = volumeTodB((input.meterF2 || 0) * 100).toFixed(1)

      if (instance.config.variablesShowInputVolume) {
        const audioLevel = instance.data.audioLevels.find((level) => level.key === input.key)
        const audioLevelData = audioLevel ? instance.data.getAudioLevelData(audioLevel) : false
        variables[`mix_${id}_${type}_meterf1_avg_1s`] = audioLevelData ? volumeTodB(audioLevelData.s1MeterF1Avg * 100).toFixed(1) : ''
        variables[`mix_${id}_${type}_meterf2_avg_1s`] = audioLevelData ? volumeTodB(audioLevelData.s1MeterF2Avg * 100).toFixed(1) : ''
        variables[`mix_${id}_${type}_meterf1_avg_3s`] = audioLevelData ? volumeTodB(audioLevelData.s3MeterF1Avg * 100).toFixed(1) : ''
        variables[`mix_${id}_${type}_meterf2_avg_3s`] = audioLevelData ? volumeTodB(audioLevelData.s3MeterF2Avg * 100).toFixed(1) : ''
        variables[`mix_${id}_${type}_meterf1_peak_1s`] = audioLevelData ? volumeTodB(audioLevelData.s1MeterF1Peak * 100).toFixed(1) : ''
        variables[`mix_${id}_${type}_meterf2_peak_1s`] = audioLevelData ? volumeTodB(audioLevelData.s1MeterF2Peak * 100).toFixed(1) : ''
        variables[`mix_${id}_${type}_meterf1_peak_3s`] = audioLevelData ? volumeTodB(audioLevelData.s3MeterF1Peak * 100).toFixed(1) : ''
        variables[`mix_${id}_${type}_meterf2_peak_3s`] = audioLevelData ? volumeTodB(audioLevelData.s3MeterF2Peak * 100).toFixed(1) : ''
      }

      const inputDuration = calcDuration(input)

      if (inputDuration !== null) {
        variables[`mix_${id}_${type}_duration`] = inputDuration.ms
      } else {
				variables[`mix_${id}_${type}_duration`] = ''
			}

      const inputRemaining = calcRemaining(input)

      if (inputRemaining !== null) {
        variables[`mix_${id}_${type}_remaining`] = inputRemaining.ms
      } else {
				variables[`mix_${id}_${type}_remaining`] = ''
			}

      if (instance.config.variablesShowInputPosition) {
        variables[`mix_${id}_${type}_position_panx`] = input.inputPosition?.panX ?? ''
        variables[`mix_${id}_${type}_position_pany`] = input.inputPosition?.panY ?? ''
        variables[`mix_${id}_${type}_position_zoomx`] = input.inputPosition?.zoomX ?? ''
        variables[`mix_${id}_${type}_position_zoomy`] = input.inputPosition?.zoomY ?? ''
        variables[`mix_${id}_${type}_position_cropx1`] = input.inputPosition?.cropX1 ?? ''
        variables[`mix_${id}_${type}_position_cropx2`] = input.inputPosition?.cropX2 ?? ''
        variables[`mix_${id}_${type}_position_cropy1`] = input.inputPosition?.cropY1 ?? ''
        variables[`mix_${id}_${type}_position_cropy2`] = input.inputPosition?.cropY2 ?? ''
      }

      if (instance.config.variablesShowInputCC) {
        variables[`mix_${id}_${type}_cc_hue`] = input.cc?.hue ?? ''
        variables[`mix_${id}_${type}_cc_saturation`] = input.cc?.saturation ?? ''
        variables[`mix_${id}_${type}_cc_liftr`] = input.cc?.liftR ?? ''
        variables[`mix_${id}_${type}_cc_liftg`] = input.cc?.liftG ?? ''
        variables[`mix_${id}_${type}_cc_liftb`] = input.cc?.liftB ?? ''
        variables[`mix_${id}_${type}_cc_lifty`] = input.cc?.liftY ?? ''
        variables[`mix_${id}_${type}_cc_gammar`] = input.cc?.gammaR ?? ''
        variables[`mix_${id}_${type}_cc_gammag`] = input.cc?.gammaG ?? ''
        variables[`mix_${id}_${type}_cc_gammab`] = input.cc?.gammaB ?? ''
        variables[`mix_${id}_${type}_cc_gammay`] = input.cc?.gammaY ?? ''
        variables[`mix_${id}_${type}_cc_gainr`] = input.cc?.gainR ?? ''
        variables[`mix_${id}_${type}_cc_gaing`] = input.cc?.gainG ?? ''
        variables[`mix_${id}_${type}_cc_gainb`] = input.cc?.gainB ?? ''
        variables[`mix_${id}_${type}_cc_gainy`] = input.cc?.gainY ?? ''
      }

      if (instance.config.variablesShowInputLayers) {
        for (let i = 1; i < 11; i++) {
          variables[`mix_${id}_${type}_layer_${i}_number`] = ''
          variables[`mix_${id}_${type}_layer_${i}_name`] = ''
          variables[`mix_${id}_${type}_layer_${i}_key`] = ''
        }

        for (const layer of input.overlay || []) {
          const inputLayer = await instance.data.getInput(layer.key)

          variables[`mix_${id}_${type}_layer_${layer.index + 1}_number`] = inputLayer?.number || ''
          variables[`mix_${id}_${type}_layer_${layer.index + 1}_name`] = inputLayer?.shortTitle || inputLayer?.title || ''
          variables[`mix_${id}_${type}_layer_${layer.index + 1}_key`] = layer.key

          if (instance.config.variablesShowInputLayerPosition) {
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_panx`] = layer.panX ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_pany`] = layer.panY ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_x`] = layer.x ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_y`] = layer.y ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_zoomx`] = layer.zoomX ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_zoomy`] = layer.zoomY ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_width`] = layer.width ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_height`] = layer.height ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_cropx1`] = layer.cropX1 ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_cropx2`] = layer.cropX2 ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_cropy1`] = layer.cropY1 ?? ''
            variables[`mix_${id}_${type}_layer_${layer.index + 1}_cropy2`] = layer.cropY2 ?? ''
          }
        }
      }

      variables[`mix_${id}_${type}_framedelay`] = input.frameDelay ?? 0
    }
  }

  for (const mix of mixes) {
    await setVariables(mix)
    if (mix.number === instance.routingData.mix + 1) await setVariables(mix, true)
  }

  variables['mix_selected'] = instance.routingData.mix + 1

  return variables
}
