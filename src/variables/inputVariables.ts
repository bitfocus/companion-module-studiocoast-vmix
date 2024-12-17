import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '..'
import { calcDuration, calcRemaining, volumeTodB, volumeToLinear } from '../utils'
import { InstanceVariableValue } from '../variables'

export const inputDefinitions = (instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  const inputNumberVariables = new Set<CompanionVariableDefinition>()
  const inputNameVariables = new Set<CompanionVariableDefinition>()
  const inputKeyVariables = new Set<CompanionVariableDefinition>()

  instance.data.inputs.forEach((input) => {
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
      inputSet.add({ name: `Input ${title} Number`, variableId: `input_${type}_number` })

      instance.data.mix
        .filter((mix) => mix.active)
        .forEach((mix) => {
          inputSet.add({
            name: `Input ${title} Mix ${mix.number} Tally Preview`,
            variableId: `input_${type}_mix_${mix.number}_tally_preview`
          })
          inputSet.add({
            name: `Input ${title} Mix ${mix.number} Tally Program`,
            variableId: `input_${type}_mix_${mix.number}_tally_program`
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

      if (input.text) {
        input.text.forEach((textLayer) => {
          inputSet.add({ name: `Input ${title} layer ${textLayer.index} Title Text`, variableId: `input_${type}_layer_${textLayer.index}_titletext` })
          inputSet.add({ name: `Input ${title} layer ${textLayer.name} Title Text`, variableId: `input_${type}_layer_${textLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titletext` })
        })
      }

      if (input.type === 'VideoList' || input.type === 'VirtualSet' || input.type === 'Photos') {
        inputSet.add({ name: `Input ${title} Selected Index`, variableId: `input_${type}_selected` })
        inputSet.add({ name: `Input ${title} Selected Index Name`, variableId: `input_${type}_selected_name` })
      }

      if (input.list) {
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
      if (instance.config.variablesShowInputPosition) {
        inputSet.add({ name: `Input ${title} Position Pan X`, variableId: `input_${type}_position_panx` })
        inputSet.add({ name: `Input ${title} Position Pan Y`, variableId: `input_${type}_position_pany` })
        inputSet.add({ name: `Input ${title} Position Zoom X`, variableId: `input_${type}_position_zoomx` })
        inputSet.add({ name: `Input ${title} Position Zoom X`, variableId: `input_${type}_position_zoomy` })
        inputSet.add({ name: `Input ${title} Position Crop X1`, variableId: `input_${type}_position_cropx1` })
        inputSet.add({ name: `Input ${title} Position Crop X2`, variableId: `input_${type}_position_cropx2` })
        inputSet.add({ name: `Input ${title} Position Crop Y1`, variableId: `input_${type}_position_cropy1` })
        inputSet.add({ name: `Input ${title} Position Crop Y2`, variableId: `input_${type}_position_cropy2` })
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

  instance.timers.forEach((timer) => {
    const formats = ['hh:mm:ss', 'mm:ss', 'mm:ss.ms', 'mm:ss.sss']
    const dataArr = [
      timer.get({ defaultValue: '00:00:00', format: 'hh:mm:ss' }),
      timer.get({ defaultValue: '00:00', format: 'mm:ss' }),
      timer.get({ defaultValue: '00:00.0', format: 'mm:ss.ms' }),
      timer.get({ defaultValue: '00:00.000', format: 'mm:ss.sss' })
    ]

    dataArr.forEach((data, index) => {
      const prefix = `timer_${timer.id}_${formats[index]}_`

      for (const key in data) {
        definitions.push({ name: `Timer ${timer.id} ${formats[index]} ${key}`, variableId: prefix + key })
      }
    })
  })

  // Filter variables displayed based on Config settings
  let filteredVariables = [...definitions]
  if (instance.config.variablesShowInputs) filteredVariables = [...filteredVariables, ...inputNameVariables]
  if (instance.config.variablesShowInputNumbers) filteredVariables = [...filteredVariables, ...inputNumberVariables]
  if (instance.config.variablesShowInputGUID) filteredVariables = [...filteredVariables, ...inputKeyVariables]

  return filteredVariables
}

export const inputValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: InstanceVariableValue = {}

  const inputNames: string[] = []

  for (const input of instance.data.inputs) {
    const inputName = input.shortTitle ? input.shortTitle.replace(/[^a-z0-9-_.]+/gi, '') : input.title.replace(/[^a-z0-9-_.]+/gi, '')
    let useNamedInput = false

    // Prevent inputs with duplicate names from overwriting eachother. First input takes priority as per vMix API
    if (!inputNames.includes(inputName.toLowerCase())) {
      inputNames.push(inputName.toLowerCase())
      useNamedInput = true
    }

    let inputTypes: (string | number | boolean)[] = []

    if (instance.config.strictInputVariableTypes) {
      if (instance.config.variablesShowInputs && useNamedInput) {
        inputTypes.push(input.shortTitle || input.title)
        inputTypes.push(inputName.toLowerCase())
      }
      if (instance.config.variablesShowInputNumbers) inputTypes.push(input.key)
      if (instance.config.variablesShowInputGUID) inputTypes.push(input.key)
    } else {
      inputTypes = [input.number, input.key, useNamedInput ? input.shortTitle || input.title : false, useNamedInput ? inputName.toLowerCase() : false].filter((x) => x !== false)
    }

    for (const type of inputTypes) {
      variables[`input_${type}_name`] = input.shortTitle || input.title
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

      const meterF1 = input.meterF1 !== undefined ? volumeTodB(input.meterF1 * 100).toFixed(1) : ''
      const meterF2 = input.meterF2 !== undefined ? volumeTodB(input.meterF2 * 100).toFixed(1) : ''

      variables[`input_${type}_meterf1`] = meterF1
      variables[`input_${type}_meterf2`] = meterF2

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
        variables[`input_${type}_remaining_mm:ss`] = inputRemaining.mmss
        variables[`input_${type}_remaining_mm:ss.ms`] = inputRemaining.mmssms
      }

      if (!(instance.config.strictInputVariableTypes && !instance.config.variablesShowInputPosition)) {
        variables[`input_${type}_position_panx`] = input.inputPosition?.panX ?? ''
        variables[`input_${type}_position_pany`] = input.inputPosition?.panY ?? ''
        variables[`input_${type}_position_zoomx`] = input.inputPosition?.zoomX ?? ''
        variables[`input_${type}_position_zoomy`] = input.inputPosition?.zoomY ?? ''
        variables[`input_${type}_position_cropx1`] = input.inputPosition?.cropX1 ?? ''
        variables[`input_${type}_position_cropx2`] = input.inputPosition?.cropX2 ?? ''
        variables[`input_${type}_position_cropy1`] = input.inputPosition?.cropY1 ?? ''
        variables[`input_${type}_position_cropy2`] = input.inputPosition?.cropY2 ?? ''
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

      for (let i = 0; i < 10; i++) {
        variables[`input_${type}_layer_${i + 1}_name`] = ''
        variables[`input_${type}_layer_${i + 1}_number`] = ''
      }

      for (const layer of input.overlay || []) {
        const overlayInput = await instance.data.getInput(layer.key)
        let overlayinputName = ''

        if (overlayInput) overlayinputName = overlayInput.shortTitle ? overlayInput.shortTitle.replace(/[^a-z0-9-_. ]+/gi, '') : overlayInput.title.replace(/[^a-z0-9-_. ]+/gi, '')

        variables[`input_${type}_layer_${layer.index + 1}_name`] = overlayinputName
        variables[`input_${type}_layer_${layer.index + 1}_number`] = overlayInput?.number || ''
        variables[`input_${type}_layer_${layer.index + 1}_key`] = overlayInput?.key || ''

        if (!(instance.config.strictInputVariableTypes && !instance.config.variablesShowInputLayerPosition)) {
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

      if (input.text) {
        input.text.forEach((textLayer) => {
          variables[`input_${type}_layer_${textLayer.index}_titletext`] = textLayer.value
          variables[`input_${type}_layer_${textLayer.name.replace(/[^a-z0-9-_.]+/gi, '')}_titletext`] = textLayer.value
        })
      }

      if (input.list) {
        input.list.forEach((listItem) => {
          variables[`input_${type}_list_${listItem.index + 1}_name`] = listItem.filename
          variables[`input_${type}_list_${listItem.index + 1}_selected`] = listItem.selected.toString()

          if (listItem.selected) {
            variables[`input_${type}_selected`] = listItem.index + 1
            variables[`input_${type}_selected_name`] = listItem.filename
          }
        })
      }

      if ((input.type === 'VirtualSet' || input.type === 'PowerPoint') && input.selectedIndex !== undefined) {
        variables[`input_${type}_selected`] = input.selectedIndex
      }

      if (input.type === 'Photos') {
        variables[`input_${type}_selected`] = input.position
        variables[`input_${type}_selected_name`] = input.title.split(`${input.shortTitle} - `)[1]
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
      variables[`input_${type}_framedelay`] = input.frameDelay ?? 0

      variables[`input_${type}_volume_f1`] = ''
      variables[`input_${type}_volume_f1_db`] = ''
      variables[`input_${type}_volume_f1_linear`] = ''

      if (input.volumeF1 !== undefined) {
        variables[`input_${type}_volume_f1`] = (input.volumeF1 * 100).toFixed(2)
        variables[`input_${type}_volume_f1_db`] = volumeTodB(input.volumeF1 * 100).toFixed(1)
        variables[`input_${type}_volume_f1_linear`] = Math.round(volumeToLinear(input.volumeF1 * 100))
      }

      variables[`input_${type}_volume_f2`] = ''
      variables[`input_${type}_volume_f2_db`] = ''
      variables[`input_${type}_volume_f2_linear`] = ''

      if (input.volumeF2 !== undefined) {
        variables[`input_${type}_volume_f2`] = (input.volumeF2 * 100).toFixed(2)
        variables[`input_${type}_volume_f2_db`] = volumeTodB(input.volumeF2 * 100).toFixed(1)
        variables[`input_${type}_volume_f2_linear`] = Math.round(volumeToLinear(input.volumeF2 * 100))
      }
    }
  }

  return variables
}
