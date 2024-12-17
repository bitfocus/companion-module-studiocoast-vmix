import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '..'
import { calcDuration, calcRemaining, volumeTodB, volumeToLinear } from '../utils'
import { InstanceVariableValue } from '../variables'

export const dynamicDefinitions = async (instance: VMixInstance): Promise<CompanionVariableDefinition[]> => {
  const definitions: CompanionVariableDefinition[] = []
  const dynamicIDs = [0, 1, 2, 3]

  for (const dynamic of dynamicIDs) {
    definitions.push(
      { name: `Dynamic Input ${dynamic + 1}`, variableId: `dynamic_input_${dynamic + 1}` },
      { name: `Dynamic Value ${dynamic + 1}`, variableId: `dynamic_value_${dynamic + 1}` }
    )

    const input = await instance.data.getInput(instance.data.dynamicInput[dynamic]?.value)

    if (input) {
      definitions.push(
        { name: `Dynamic Input ${dynamic + 1} Short Title`, variableId: `dynamic_input_${dynamic + 1}_name` },
        { name: `Dynamic Input ${dynamic + 1} GUID`, variableId: `dynamic_input_${dynamic + 1}_guid` },
        { name: `Dynamic Input ${dynamic + 1} Type`, variableId: `dynamic_input_${dynamic + 1}_type` }
      )

      instance.data.mix
        .filter((mix) => mix.active)
        .forEach((mix) => {
          definitions.push(
            { name: `Dynamic Input ${dynamic + 1} Mix ${mix.number} Tally Preview`, variableId: `dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_preview` },
            { name: `Dynamic Input ${dynamic + 1} Mix ${mix.number} Tally Program`, variableId: `dynamic_input_${dynamic + 1}_mix_${mix.number}_tally_program` }
          )
        })

      definitions.push(
        { name: `Dynamic Input ${dynamic + 1} Playing`, variableId: `dynamic_input_${dynamic + 1}_playing` },
        { name: `Dynamic Input ${dynamic + 1} Loop`, variableId: `dynamic_input_${dynamic + 1}_loop` },
        { name: `Dynamic Input ${dynamic + 1} Muted`, variableId: `dynamic_input_${dynamic + 1}_mute` },
        { name: `Dynamic Input ${dynamic + 1} Audio`, variableId: `dynamic_input_${dynamic + 1}_audio` },
        { name: `Dynamic Input ${dynamic + 1} Solo`, variableId: `dynamic_input_${dynamic + 1}_solo` }
      )

      if (input.duration > 1) {
        definitions.push({ name: `Dynamic Input ${dynamic + 1} Duration`, variableId: `dynamic_input_${dynamic + 1}_duration` })
      }

      if (input.position !== undefined) {
        definitions.push({ name: `Dynamic Input ${dynamic + 1} Remaining`, variableId: `dynamic_input_${dynamic + 1}_remaining` })
      }

      for (let i = 1; i < 11; i++) {
        definitions.push(
          { name: `Dynamic Input ${dynamic + 1} layer ${i} Name`, variableId: `dynamic_input_${dynamic + 1}_layer_${i}_name` },
          { name: `Dynamic Input ${dynamic + 1} layer ${i} Number`, variableId: `dynamic_input_${dynamic + 1}_layer_${i}_number` }
        )
      }

      if (input.text) {
        input.text.forEach((textLayer) => {
          definitions.push(
            { name: `Dynamic Input ${dynamic + 1} layer ${textLayer.index} Title Text`, variableId: `dynamic_input_${dynamic + 1}_layer_${textLayer.index}_titletext` },
            { name: `Dynamic Input ${dynamic + 1} layer ${textLayer.name} Title Text`, variableId: `dynamic_input_${dynamic + 1}_layer_${textLayer.name}_titletext` }
          )
        })
      }

      if (input.type === 'VideoList' || input.type === 'VirtualSet' || input.type === 'Photos') {
        definitions.push(
          { name: `Dynamic Input ${dynamic + 1} Selected Index`, variableId: `dynamic_input_${dynamic + 1}_selected` },
          { name: `Dynamic Input ${dynamic + 1} Selected Index Name`, variableId: `dynamic_input_${dynamic + 1}_selected_name` }
        )
      }

      if (input.list) {
        input.list.forEach((listItem) => {
          definitions.push(
            { name: `Dynamic Input ${dynamic + 1} List ${listItem.index + 1} Name`, variableId: `dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_name` },
            { name: `Dynamic Input ${dynamic + 1} List ${listItem.index + 1} Selected`, variableId: `dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_selected` }
          )
        })
      }

      if (input.type === 'VideoCall') {
        definitions.push(
          { name: `Dynamic Input ${dynamic + 1} Call Password`, variableId: `dynamic_input_${dynamic + 1}_call_password` },
          { name: `Dynamic Input ${dynamic + 1} Call Connected`, variableId: `dynamic_input_${dynamic + 1}_call_connected` },
          { name: `Dynamic Input ${dynamic + 1} Call Video Source`, variableId: `dynamic_input_${dynamic + 1}_call_video_source` },
          { name: `Dynamic Input ${dynamic + 1} Call Audio Source`, variableId: `dynamic_input_${dynamic + 1}_call_audio_source` }
        )
      }

      definitions.push(
        { name: `Dynamic Input ${dynamic + 1} Volume`, variableId: `dynamic_input_${dynamic + 1}_volume` },
        { name: `Dynamic Input ${dynamic + 1} Volume dB`, variableId: `dynamic_input_${dynamic + 1}_volume_db` },
        { name: `Dynamic Input ${dynamic + 1} Volume Linear`, variableId: `dynamic_input_${dynamic + 1}_volume_linear` }
      )

      if (input.volumeF1 !== undefined) {
        definitions.push(
          { name: `Dynamic Input ${dynamic + 1} Volume F1`, variableId: `dynamic_input_${dynamic + 1}_volume_f1` },
          { name: `Dynamic Input ${dynamic + 1} Volume F1 dB`, variableId: `dynamic_input_${dynamic + 1}_volume_f1_db` },
          { name: `Dynamic Input ${dynamic + 1} Volume F1 Linear`, variableId: `dynamic_input_${dynamic + 1}_volume_f1_linear` }
        )
      }

      if (input.volumeF2 !== undefined) {
        definitions.push(
          { name: `Dynamic Input ${dynamic + 1} Volume F2`, variableId: `dynamic_input_${dynamic + 1}_volume_f2` },
          { name: `Dynamic Input ${dynamic + 1} Volume F2 dB`, variableId: `dynamic_input_${dynamic + 1}_volume_f2_db` },
          { name: `Dynamic Input ${dynamic + 1} Volume F2 Linear`, variableId: `dynamic_input_${dynamic + 1}_volume_f2_linear` }
        )
      }

      if (input.meterF1 !== undefined) {
        definitions.push({ name: `Dynamic Input ${dynamic + 1} MeterF1`, variableId: `dynamic_input_${dynamic + 1}_meterf1` })
      }

      if (input.meterF2 !== undefined) {
        definitions.push({ name: `Dynamic Input ${dynamic + 1} MeterF2`, variableId: `dynamic_input_${dynamic + 1}_meterf2` })
      }

      definitions.push({ name: `Dynamic Input ${dynamic + 1} Frame Delay`, variableId: `dynamic_input_${dynamic + 1}_framedelay` })
    }
  }

  return definitions
}

export const dynamicValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: InstanceVariableValue = {}
  const dynamicIDs = [0, 1, 2, 3]

  for (const dynamic of dynamicIDs) {
    variables[`dynamic_input_${dynamic + 1}`] = instance.data.dynamicInput[dynamic]?.value || ''
    variables[`dynamic_value_${dynamic + 1}`] = instance.data.dynamicValue[dynamic]?.value || ''

    if (instance.data.dynamicInput[dynamic]?.value) {
      const input = await instance.data.getInput(instance.data.dynamicInput[dynamic]?.value)

      if (input) {
        variables[`dynamic_input_${dynamic + 1}_name`] = input.shortTitle || input.title
        variables[`dynamic_input_${dynamic + 1}_number`] = input.number
        variables[`dynamic_input_${dynamic + 1}_guid`] = input.key
        variables[`dynamic_input_${dynamic + 1}_type`] = input.type

        instance.data.mix.forEach((mix) => {
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

        const meterF1 = input.meterF1 !== undefined ? volumeTodB(input.meterF1 * 100).toFixed(1) : ''
        const meterF2 = input.meterF2 !== undefined ? volumeTodB(input.meterF2 * 100).toFixed(1) : ''

        variables[`dynamic_input_${dynamic + 1}_meterf1`] = meterF1
        variables[`dynamic_input_${dynamic + 1}_meterf2`] = meterF2

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
          variables[`dynamic_input_${dynamic + 1}_remaining_mm:ss`] = inputRemaining.mmss
          variables[`dynamic_input_${dynamic + 1}_remaining_mm:ss.ms`] = inputRemaining.mmssms
        }

        if (!(instance.config.strictInputVariableTypes && !instance.config.variablesShowInputPosition)) {
          variables[`dynamic_input_${dynamic + 1}_position_panx`] = input.inputPosition?.panX ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_pany`] = input.inputPosition?.panY ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_zoomx`] = input.inputPosition?.zoomX ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_zoomy`] = input.inputPosition?.zoomY ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_cropx1`] = input.inputPosition?.cropX1 ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_cropx2`] = input.inputPosition?.cropX2 ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_cropy1`] = input.inputPosition?.cropY1 ?? ''
          variables[`dynamic_input_${dynamic + 1}_position_cropy2`] = input.inputPosition?.cropY2 ?? ''
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

        for (let i = 0; i < 10; i++) {
          variables[`dynamic_input_${dynamic + 1}_layer_${i + 1}_name`] = ''
          variables[`dynamic_input_${dynamic + 1}_layer_${i + 1}_number`] = ''
        }

        for (const layer of input.overlay || []) {
          const overlayInput = await instance.data.getInput(layer.key)
          let overlayinputName = ''

          if (overlayInput)
            overlayinputName = overlayInput.shortTitle ? overlayInput.shortTitle.replace(/[^a-z0-9-_. ]+/gi, '') : overlayInput.title.replace(/[^a-z0-9-_. ]+/gi, '')

          variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_name`] = overlayinputName
          variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_number`] = overlayInput?.number || ''
          variables[`dynamic_input_${dynamic + 1}_layer_${layer.index + 1}_key`] = overlayInput?.key || ''

          if (!(instance.config.strictInputVariableTypes && !instance.config.variablesShowInputLayerPosition)) {
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

        if (input.text) {
          input.text.forEach((textLayer) => {
            variables[`dynamic_input_${dynamic + 1}_layer_${textLayer.index}_titletext`] = textLayer.value
            variables[`dynamic_input_${dynamic + 1}_layer_${textLayer.name}_titletext`] = textLayer.value
          })
        }

        if (input.list) {
          input.list.forEach((listItem) => {
            variables[`dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_name`] = listItem.filename
            variables[`dynamic_input_${dynamic + 1}_list_${listItem.index + 1}_selected`] = listItem.selected.toString()

            if (listItem.selected) {
              variables[`dynamic_input_${dynamic + 1}_selected`] = listItem.index + 1
              variables[`dynamic_input_${dynamic + 1}_selected_name`] = listItem.filename
            }
          })
        }

        if (input.type === 'VirtualSet' && input.selectedIndex !== undefined) {
          variables[`dynamic_input_${dynamic + 1}_selected`] = input.selectedIndex
        }

        if (input.type === 'Photos') {
          variables[`dynamic_input_${dynamic + 1}_selected`] = input.position
          variables[`dynamic_input_${dynamic + 1}_selected_name`] = input.title.split(`${input.shortTitle} - `)[1]
        }

        if (input.type === 'VideoCall') {
          let audioSource = input.callAudioSource as string
          if (audioSource.startsWith('Bus')) {
            audioSource = audioSource.substr(3)
          }

          variables[`dynamic_input_${dynamic + 1}_call_password`] = input.callPassword
          variables[`dynamic_input_${dynamic + 1}_call_connected`] = input.callConnected ? 'Connected' : 'Disconnected'
          variables[`dynamic_input_${dynamic + 1}_call_video_source`] = input.callVideoSource
          variables[`dynamic_input_${dynamic + 1}_call_audio_source`] = input.callAudioSource
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

        variables[`dynamic_input_${dynamic + 1}_volume`] = volume
        variables[`dynamic_input_${dynamic + 1}_volume_db`] = volumedB
        variables[`dynamic_input_${dynamic + 1}_volume_linear`] = volumeLinear
        variables[`dynamic_input_${dynamic + 1}_framedelay`] = input.frameDelay ?? 0

        variables[`dynamic_input_${dynamic + 1}_volume_f1`] = ''
        variables[`dynamic_input_${dynamic + 1}_volume_f1_db`] = ''
        variables[`dynamic_input_${dynamic + 1}_volume_f1_linear`] = ''

        if (input.volumeF1 !== undefined) {
          variables[`dynamic_input_${dynamic + 1}_volume_f1`] = (input.volumeF1 * 100).toFixed(2)
          variables[`dynamic_input_${dynamic + 1}_volume_f1_db`] = volumeTodB(input.volumeF1 * 100).toFixed(1)
          variables[`dynamic_input_${dynamic + 1}_volume_f1_linear`] = Math.round(volumeToLinear(input.volumeF1 * 100))
        }

        variables[`dynamic_input_${dynamic + 1}_volume_f2`] = ''
        variables[`dynamic_input_${dynamic + 1}_volume_f2_db`] = ''
        variables[`dynamic_input_${dynamic + 1}_volume_f2_linear`] = ''

        if (input.volumeF2 !== undefined) {
          variables[`dynamic_input_${dynamic + 1}_volume_f2`] = (input.volumeF2 * 100).toFixed(2)
          variables[`dynamic_input_${dynamic + 1}_volume_f2_db`] = volumeTodB(input.volumeF2 * 100).toFixed(1)
          variables[`dynamic_input_${dynamic + 1}_volume_f2_linear`] = Math.round(volumeToLinear(input.volumeF2 * 100))
        }
      }
    }
  }

  return variables
}
