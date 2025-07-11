import type { CompanionVariableDefinition } from '@companion-module/base'
import type VMixInstance from '../'

type VariablesOutputIDs =
  | `fullscreen_${number}_source`
  | `output_${number}_source`
  | `output_${number}_ndi`
  | `output_${number}_srt`
  | `output_${number}_type`
  | `output_${number}_input_name`
type VariablesOutputValues = Record<VariablesOutputIDs, string | number | undefined>

export const outputDefinitions = (instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  if (!instance.config.variablesShowOutputs) return definitions

  for (let i = 1; i < 3; i++) {
    definitions.push({ name: 'Fullscreen 1 Source', variableId: 'fullscreen_1_source' }, { name: 'Fullscreen 2 Source', variableId: 'fullscreen_2_source' })
  }

  for (let i = 1; i < 5; i++) {
    definitions.push(
      { name: `Output ${i} Source`, variableId: `output_${i}_source` },
      { name: `Output ${i} NDI`, variableId: `output_${i}_ndi` },
      { name: `Output ${i} SRT`, variableId: `output_${i}_srt` },
      { name: `Output ${i} Type`, variableId: `output_${i}_type` },
      { name: `Output ${i} Input Name`, variableId: `output_${i}_input_name` },
    )
  }

  return definitions
}

export const outputValues = async (instance: VMixInstance): Promise<VariablesOutputValues> => {
  const variables: VariablesOutputValues = {}

  if (!instance.config.variablesShowOutputs) return variables

  variables['fullscreen_1_source'] = ''
  variables['fullscreen_2_source'] = ''
  variables['output_1_source'] = ''
  variables['output_1_ndi'] = ''
  variables['output_1_srt'] = ''
  variables['output_1_type'] = ''
  variables['output_1_input_name'] = ''
  variables['output_2_source'] = ''
  variables['output_2_ndi'] = ''
  variables['output_2_srt'] = ''
  variables['output_2_type'] = ''
  variables['output_2_input_name'] = ''
  variables['output_3_source'] = ''
  variables['output_3_ndi'] = ''
  variables['output_3_srt'] = ''
  variables['output_3_type'] = ''
  variables['output_3_input_name'] = ''
  variables['output_4_source'] = ''
  variables['output_4_ndi'] = ''
  variables['output_4_srt'] = ''
  variables['output_4_type'] = ''
  variables['output_4_input_name'] = ''

  for (const output of instance.data.outputs) {
    let source = ''

    if (output.source === 'Input') {
      source = `Input${output.input}`
      const input = await instance.data.getInput(output.input)
      if (input) variables[`output_${output.number}_input_name`] = input?.shortTitle || input?.title
    } else if (output.source === 'Mix') {
      source = `Mix${output.mix + 1}`
    } else {
      source = output.source
    }

    variables[`${output.type}_${output.number}_source`] = source

    if (output.type === 'output') {
      variables[`output_${output.number}_ndi`] = output.ndi.toString()
      variables[`output_${output.number}_srt`] = output.srt.toString()
      variables[`output_${output.number}_type`] = output.source
    }
  }

  return variables
}
