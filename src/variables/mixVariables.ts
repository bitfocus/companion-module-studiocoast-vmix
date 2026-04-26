import type { CompanionVariableDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'
import type { Mix } from '../data.js'
import { calcDuration, calcRemaining, volumeTodB } from '../utils.js'

type MixType = 'preview' | 'program'

type MixMeterTypes = 'f1' | 'f2'
type MixPositionTypes = 'panx' | 'pany' | 'zoomx' | 'zoomy' | 'cropx1' | 'cropx2' | 'cropy1' | 'cropy2'
type MixCCTypes = 'hue' | 'saturation' | 'liftr' | 'liftg' | 'liftb' | 'lifty' | 'gammar' | 'gammag' | 'gammab' | 'gammay' | 'gainr' | 'gaing' | 'gainb' | 'gainy'
type MixLayerTypes = 'number' | 'name' | 'key' | 'panx' | 'pany' | 'x' | 'y' | 'zoomx' | 'zoomy' | 'width' | 'height' | 'cropx1' | 'cropx2' | 'cropy1' | 'cropy2'

export type MixVariablesSchema = Partial<{
  [key: `mix_${string}_${MixType}`]: number
  [key: `mix_${string}_${MixType}_name`]: string
  [key: `mix_${string}_${MixType}_full_title`]: string
  [key: `mix_${string}_${MixType}_guid`]: string
  [key: `mix_${string}_${MixType}_playing`]: string
  [key: `mix_${string}_${MixType}_loop`]: string
  [key: `mix_${string}_${MixType}_audio`]: string
  [key: `mix_${string}_${MixType}_mute`]: string
  [key: `mix_${string}_${MixType}_framedelay`]: number
  [key: `mix_${string}_${MixType}_meter${MixMeterTypes}`]: string
  [key: `mix_${string}_${MixType}_meter${MixMeterTypes}_avg_1s`]: string
  [key: `mix_${string}_${MixType}_meter${MixMeterTypes}_avg_3s`]: string
  [key: `mix_${string}_${MixType}_meter${MixMeterTypes}_peak_1s`]: string
  [key: `mix_${string}_${MixType}_meter${MixMeterTypes}_peak_3s`]: string
  [key: `mix_${string}_${MixType}_position`]: string
  [key: `mix_${string}_${MixType}_duration`]: string
  [key: `mix_${string}_${MixType}_remaining`]: string
  [key: `mix_${string}_${MixType}_position_${MixPositionTypes}`]: number | string
  [key: `mix_${string}_${MixType}_cc_${MixCCTypes}`]: number | string
  [key: `mix_${string}_${MixType}_layer_${number}_${MixLayerTypes}`]: number | string
  mix_selected: number
}>

export const mixDefinitions = async (instance: VMixInstance): Promise<CompanionVariableDefinitions<MixVariablesSchema>> => {
  const definitions: CompanionVariableDefinitions<MixVariablesSchema> = {
    mix_selected: { name: `Mix Selected` },
  }

  if (!instance.config.variablesShowMix) return definitions

  const mixTypes = ['Preview', 'Program']
  const mixes = instance.data.mix.filter((mix) => mix.active)

  const setDefinitions = async (mix: Mix, selected: boolean = false): Promise<void> => {
    const id = selected ? 'Selected' : mix.number.toString()
    const mixProgramInput = await instance.data.getInput(mix.program)
    const mixPreviewInput = await instance.data.getInput(mix.preview)

    for (const type of mixTypes) {
      const input = type === 'Preview' ? mixPreviewInput : mixProgramInput
      if (!input) continue

      const lowercaseType = type.toLowerCase() as MixType

      definitions[`mix_${id.toLowerCase()}_${lowercaseType}`] = { name: `Mix ${id} ${type}` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_name`] = { name: `Mix ${id} ${type} Short Title` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_full_title`] = { name: `Mix ${id} ${type} Full Title` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_guid`] = { name: `Mix ${id} ${type} GUID` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_playing`] = { name: `Mix ${id} ${type} Playing` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_loop`] = { name: `Mix ${id} ${type} Loop` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_audio`] = { name: `Mix ${id} ${type} Audio` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_mute`] = { name: `Mix ${id} ${type} Mute` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_framedelay`] = { name: `Mix ${id} ${type} Frame Delay` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_duration`] = { name: `Mix ${id} ${type} Duration` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_position`] = { name: `Mix ${id} ${type} Position` }
      definitions[`mix_${id.toLowerCase()}_${lowercaseType}_remaining`] = { name: `Mix ${id} ${type} Remaining` }

      if (instance.config.variablesShowInputVolume) {
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf1`] = { name: `Mix ${id} ${type} Meter F1` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf2`] = { name: `Mix ${id} ${type} Meter F2` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf1_avg_1s`] = { name: `Mix ${id} ${type} Meter F1 Avg 1s` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf2_avg_1s`] = { name: `Mix ${id} ${type} Meter F2 Avg 1s` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf1_avg_3s`] = { name: `Mix ${id} ${type} Meter F1 Avg 3s` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf2_avg_3s`] = { name: `Mix ${id} ${type} Meter F2 Avg 3s` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf1_peak_1s`] = { name: `Mix ${id} ${type} Meter F1 Peak 1s` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf2_peak_1s`] = { name: `Mix ${id} ${type} Meter F2 Peak 1s` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf1_peak_3s`] = { name: `Mix ${id} ${type} Meter F1 Peak 3s` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_meterf2_peak_3s`] = { name: `Mix ${id} ${type} Meter F2 Peak 3s` }
      }

      if (instance.config.variablesShowInputPosition) {
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_position_panx`] = { name: `Mix ${id} ${type} Position Pan X` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_position_pany`] = { name: `Mix ${id} ${type} Position Pan Y` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_position_zoomx`] = { name: `Mix ${id} ${type} Position Zoom X` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_position_zoomy`] = { name: `Mix ${id} ${type} Position Zoom Y` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_position_cropx1`] = { name: `Mix ${id} ${type} Position Crop X1` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_position_cropx2`] = { name: `Mix ${id} ${type} Position Crop X2` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_position_cropy1`] = { name: `Mix ${id} ${type} Position Crop Y1` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_position_cropy2`] = { name: `Mix ${id} ${type} Position Crop Y2` }
      }

      if (instance.config.variablesShowInputCC) {
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_hue`] = { name: `Mix ${id} ${type} CC Hue` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_saturation`] = { name: `Mix ${id} ${type} CC Saturation` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_liftr`] = { name: `Mix ${id} ${type} CC Lift R` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_liftg`] = { name: `Mix ${id} ${type} CC Lift G` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_liftb`] = { name: `Mix ${id} ${type} CC Lift B` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_lifty`] = { name: `Mix ${id} ${type} CC Lift Y` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_gammar`] = { name: `Mix ${id} ${type} CC Gamma R` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_gammag`] = { name: `Mix ${id} ${type} CC Gamma G` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_gammab`] = { name: `Mix ${id} ${type} CC Gamma B` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_gammay`] = { name: `Mix ${id} ${type} CC Gamma Y` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_gainr`] = { name: `Mix ${id} ${type} CC Gain R` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_gaing`] = { name: `Mix ${id} ${type} CC Gain G` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_gainb`] = { name: `Mix ${id} ${type} CC Gain B` }
        definitions[`mix_${id.toLowerCase()}_${lowercaseType}_cc_gainy`] = { name: `Mix ${id} ${type} CC Gain Y` }
      }

      if (instance.config.variablesShowInputLayers) {
        for (let i = 1; i < 11; i++) {
          definitions[`mix_${id.toLowerCase()}_${lowercaseType}_layer_${i}_number`] = { name: `Mix ${id} ${type} Layer ${i} Number` }
          definitions[`mix_${id.toLowerCase()}_${lowercaseType}_layer_${i}_name`] = { name: `Mix ${id} ${type} Layer ${i} Name` }
          definitions[`mix_${id.toLowerCase()}_${lowercaseType}_layer_${i}_key`] = { name: `Mix ${id} ${type} Layer ${i} Key` }

          if (instance.config.variablesShowInputLayerPosition) {
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_panx`] = { name: `Mix ${id} ${type} Layer ${i} Pan X` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_pany`] = { name: `Mix ${id} ${type} Layer ${i} Pan Y` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_x`] = { name: `Mix ${id} ${type} Layer ${i} X` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_y`] = { name: `Mix ${id} ${type} Layer ${i} Y` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_zoomx`] = { name: `Mix ${id} ${type} Layer ${i} Zoom X` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_zoomy`] = { name: `Mix ${id} ${type} Layer ${i} Zoom Y` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_width`] = { name: `Mix ${id} ${type} Layer ${i} Width` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_height`] = { name: `Mix ${id} ${type} Layer ${i} Height` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_cropx1`] = { name: `Mix ${id} ${type} Layer ${i} Crop X1` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_cropx2`] = { name: `Mix ${id} ${type} Layer ${i} Crop X2` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_cropy1`] = { name: `Mix ${id} ${type} Layer ${i} Crop Y1` }
            definitions[`mix_${id}_${lowercaseType}_layer_${i}_cropy2`] = { name: `Mix ${id} ${type} Layer ${i} Crop Y2` }
          }
        }
      }
    }
  }

  for (const mix of mixes) {
    await setDefinitions(mix)
    if (mix.number === instance.routingData.mix + 1) await setDefinitions(mix, true)
  }

  return definitions
}

export const mixValues = async (instance: VMixInstance): Promise<MixVariablesSchema> => {
  const variables: MixVariablesSchema = {
    mix_selected: undefined,
  }
  if (!instance.config.variablesShowMix) return variables

  const mixTypes: MixType[] = ['preview', 'program']
  const mixes = instance.data.mix.filter((mix) => mix.active)

  const setVariables = async (mix: Mix, selected: boolean = false) => {
    const id = selected ? 'selected' : mix.number.toString()
    const mixProgramInput = await instance.data.getInput(mix.program)
    const mixPreviewInput = await instance.data.getInput(mix.preview)

    for (const type of mixTypes) {
      const input = type === 'preview' ? mixPreviewInput : mixProgramInput
      if (!input) continue

      const inputAudio = input.muted === undefined ? false : input.muted
      variables[`mix_${id}_${type}`] = mix[type as 'preview' | 'program']
      variables[`mix_${id}_${type}_name`] = await instance.data.getInputTitle(mix[type as 'preview' | 'program'])
      variables[`mix_${id}_${type}_full_title`] = input.title
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

			if (input.position !== undefined) {
				variables[`mix_${id}_${type}_position`] = input.position.toString()
			}

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
          variables[`mix_${id}_${type}_layer_${i}_number`] = undefined
          variables[`mix_${id}_${type}_layer_${i}_name`] = ''
          variables[`mix_${id}_${type}_layer_${i}_key`] = ''
        }

        for (const layer of input.overlay || []) {
          const inputLayer = await instance.data.getInput(layer.key)

          variables[`mix_${id}_${type}_layer_${layer.index + 1}_number`] = inputLayer?.number || undefined
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
