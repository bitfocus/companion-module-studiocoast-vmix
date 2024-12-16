import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '../'
import { Mix } from '../data'
import { calcDuration, calcRemaining, volumeTodB } from '../utils'
import { InstanceVariableValue } from '../variables'

export const mixDefinitions = (instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []
  const mixTypes = ['Preview', 'Program']
  const mixes = ['Selected', ...instance.data.mix.filter((mix) => mix.active)]

  mixTypes.forEach((type) => {
    mixes.forEach((mix) => {
      const id = typeof mix === 'string' ? 'Selected' : mix.number.toString()

      definitions.push(
        { name: `Mix ${id} ${type}`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}` },
        { name: `Mix ${id} ${type} Short Title`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_name` },
        { name: `Mix ${id} ${type} GUID`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_guid` },
        { name: `Mix ${id} ${type} Playing`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_playing` },
        { name: `Mix ${id} ${type} Loop`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_loop` },
        { name: `Mix ${id} ${type} Audio`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_audio` },
        { name: `Mix ${id} ${type} Mute`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_mute` },
        { name: `Mix ${id} ${type} Frame Delay`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_framedelay` },
        { name: `Mix ${id} ${type} Meter F1`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1` },
        { name: `Mix ${id} ${type} Meter F2`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2` },
        { name: `Mix ${id} ${type} Meter F1 Avg 1s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1_avg_1s` },
        { name: `Mix ${id} ${type} Meter F2 Avg 1s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2_avg_1s` },
        { name: `Mix ${id} ${type} Meter F1 Avg 3s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1_avg_3s` },
        { name: `Mix ${id} ${type} Meter F2 Avg 3s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2_avg_3s` },
        { name: `Mix ${id} ${type} Meter F1 Peak 1s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1_peak_1s` },
        { name: `Mix ${id} ${type} Meter F2 Peak 1s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2_peak_1s` },
        { name: `Mix ${id} ${type} Meter F1 Peak 3s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf1_peak_3s` },
        { name: `Mix ${id} ${type} Meter F2 Peak 3s`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_meterf2_peak_3s` },
        { name: `Mix ${id} ${type} Duration`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_duration` },
        { name: `Mix ${id} ${type} Remaining`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_remaining` },
        { name: `Mix ${id} ${type} Position Pan X`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_panx` },
        { name: `Mix ${id} ${type} Position Pan Y`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_pany` },
        { name: `Mix ${id} ${type} Position Zoom X`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_zoomx` },
        { name: `Mix ${id} ${type} Position Zoom X`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_zoomx` },
        { name: `Mix ${id} ${type} Position Crop X1`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_cropx1` },
        { name: `Mix ${id} ${type} Position Crop X2`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_cropx2` },
        { name: `Mix ${id} ${type} Position Crop Y1`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_cropy1` },
        { name: `Mix ${id} ${type} Position Crop Y2`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_position_cropy2` },
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
        { name: `Mix ${id} ${type} CC Gain Y`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_cc_gainy` })

      for (let i = 1; i < 11; i++) {
        definitions.push(
          { name: `Mix ${id} ${type} Layer ${i} Number`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_layer_${i}_number` },
          { name: `Mix ${id} ${type} Layer ${i} Name`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_layer_${i}_name` },
          { name: `Mix ${id} ${type} Layer ${i} Key`, variableId: `mix_${id.toLowerCase()}_${type.toLowerCase()}_layer_${i}_key` }
        )
      }
    })

    definitions.push({ name: `Mix Selected`, variableId: `mix_selected` })
  })

  return definitions
}

export const mixValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: InstanceVariableValue = {}
  const mixTypes = ['preview', 'program']
  const mixes = instance.data.mix.filter((mix) => mix.active)

  const setVariables = async (mix: Mix, selected: boolean = false) => {
    const id = selected ? 'selected' : mix.number
    const mixProgramInput = await instance.data.getInput(mix.program)
    const mixPreviewInput = await instance.data.getInput(mix.preview)

    for (const type of mixTypes) {
      const input = type === 'Preview' ? mixPreviewInput : mixProgramInput
      if (!input) return

      const inputAudio = input.muted === undefined ? false : input.muted

      variables[`mix_${id}_${type}`] = mix.program
      variables[`mix_${id}_${type}_name`] = await instance.data.getInputTitle(mix.program)
      variables[`mix_${id}_${type}_guid`] = input.key
      variables[`mix_${id}_${type}_playing`] = (input.state === 'Running').toString()
      variables[`mix_${id}_${type}_loop`] = input.loop.toString()
      variables[`mix_${id}_${type}_mute`] = inputAudio.toString()
      variables[`mix_${id}_${type}_audio`] = (!inputAudio).toString()
      variables[`mix_${id}_${type}_meterf1`] = volumeTodB((input.meterF1 || 0) * 100).toFixed(1)
      variables[`mix_${id}_${type}_meterf2`] = volumeTodB((input.meterF2 || 0) * 100).toFixed(1)

      const audioLevel = instance.data.audioLevels.find((level) => level.key === input.key)
      if (audioLevel) {
        const audioLevelData = instance.data.getAudioLevelData(audioLevel)
        variables[`mix_${id}_${type}_meterf1_avg_1s`] = volumeTodB(audioLevelData.s1MeterF1Avg * 100).toFixed(1)
        variables[`mix_${id}_${type}_meterf2_avg_1s`] = volumeTodB(audioLevelData.s1MeterF2Avg * 100).toFixed(1)
        variables[`mix_${id}_${type}_meterf1_avg_3s`] = volumeTodB(audioLevelData.s3MeterF1Avg * 100).toFixed(1)
        variables[`mix_${id}_${type}_meterf2_avg_3s`] = volumeTodB(audioLevelData.s3MeterF2Avg * 100).toFixed(1)
        variables[`mix_${id}_${type}_meterf1_peak_1s`] = volumeTodB(audioLevelData.s1MeterF1Peak * 100).toFixed(1)
        variables[`mix_${id}_${type}_meterf2_peak_1s`] = volumeTodB(audioLevelData.s1MeterF2Peak * 100).toFixed(1)
        variables[`mix_${id}_${type}_meterf1_peak_3s`] = volumeTodB(audioLevelData.s3MeterF1Peak * 100).toFixed(1)
        variables[`mix_${id}_${type}_meterf2_peak_3s`] = volumeTodB(audioLevelData.s3MeterF2Peak * 100).toFixed(1)
      }

      const inputDuration = calcDuration(input)

      if (inputDuration !== null) {
        variables[`mix_${id}_${type}_duration`] = inputDuration.ms
      }

      const inputRemaining = calcRemaining(input)

      if (inputRemaining !== null) {
        variables[`mix_${id}_${type}_remaining`] = inputRemaining.ms
      }

      if (!(instance.config.strictInputVariableTypes && !instance.config.variablesShowInputPosition)) {
        variables[`mix_${id}_${type}_position_panx`] = input.inputPosition?.panX ?? ''
        variables[`mix_${id}_${type}_position_pany`] = input.inputPosition?.panY ?? ''
        variables[`mix_${id}_${type}_position_zoomx`] = input.inputPosition?.zoomX ?? ''
        variables[`mix_${id}_${type}_position_zoomy`] = input.inputPosition?.zoomY ?? ''
        variables[`mix_${id}_${type}_position_cropx1`] = input.inputPosition?.cropX1 ?? ''
        variables[`mix_${id}_${type}_position_cropx2`] = input.inputPosition?.cropX2 ?? ''
        variables[`mix_${id}_${type}_position_cropy1`] = input.inputPosition?.cropY1 ?? ''
        variables[`mix_${id}_${type}_position_cropy2`] = input.inputPosition?.cropY2 ?? ''
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

        if (!(instance.config.strictInputVariableTypes && !instance.config.variablesShowInputLayerPosition)) {
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

      variables[`mix_${id}_${type}_framedelay`] = input.frameDelay ?? 0
    }
  }

  for (const mix of mixes) {
    setVariables(mix)
    if (mix.number === instance.routingData.mix + 1) setVariables(mix, true)
  }

  variables['mix_selected'] = instance.routingData.mix + 1

  return variables
}
