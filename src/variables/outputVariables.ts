import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '../'
import { InstanceVariableValue } from './variables'

export const outputDefinitions = (_instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  definitions.push(
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
    { name: 'Output 4 SRT', variableId: 'output_4_srt' }
  )

  return definitions
}

export const outputValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: InstanceVariableValue = {}

  variables['fullscreen_1_source'] = ''
  variables['fullscreen_2_source'] = ''
  variables['output_1_source'] = ''
  variables['output_1_ndi'] = ''
  variables['output_1_srt'] = ''
  variables['output_2_source'] = ''
  variables['output_2_ndi'] = ''
  variables['output_2_srt'] = ''
  variables['output_3_source'] = ''
  variables['output_3_ndi'] = ''
  variables['output_3_srt'] = ''
  variables['output_4_source'] = ''
  variables['output_4_ndi'] = ''
  variables['output_4_srt'] = ''

  instance.data.outputs.forEach((output) => {
    const variableID = `${output.type}_${output.number}`
    let source = ''

    if (output.source === 'Input') {
      source = `Input${output.input}`
    } else if (output.source === 'Mix') {
      source = `Mix${output.mix + 1}`
    } else {
      source = output.source
    }

    variables[`${variableID}_source`] = source

    if (output.type === 'output') {
      variables[`${variableID}_ndi`] = output.ndi.toString()
      variables[`${variableID}_srt`] = output.srt.toString()
    }
  })

  return variables
}
