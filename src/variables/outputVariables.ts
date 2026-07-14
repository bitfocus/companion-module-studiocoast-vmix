import type { CompanionVariableDefinitions, JsonValue } from '@companion-module/base'
import type VMixInstance from '../index.js'

export type OutputVariablesSchema = Partial<{
  [key: `fullscreen_${number}_source`]: string
  [key: `output_${number}_source`]: string
  [key: `output_${number}_ndi`]: string
  [key: `output_${number}_omt`]: string
  [key: `output_${number}_srt`]: string
  [key: `output_${number}_type`]: string
  [key: `output_${number}_input_name`]: string
  [key: `output_${number}_json`]: JsonValue
}>

export const outputDefinitions = (instance: VMixInstance): CompanionVariableDefinitions<OutputVariablesSchema> => {
  const definitions: CompanionVariableDefinitions<OutputVariablesSchema> = {}

  if (!instance.config.variablesShowOutputs) return definitions

  definitions['fullscreen_1_source'] = { name: 'Fullscreen 1 Source' }
  definitions['fullscreen_2_source'] = { name: 'Fullscreen 2 Source' }

  for (let i = 1; i < 5; i++) {
    definitions[`output_${i}_source`] = { name: `Output ${i} Source` }
    definitions[`output_${i}_ndi`] = { name: `Output ${i} NDI` }
    definitions[`output_${i}_omt`] = { name: `Output ${i} OMT` }
    definitions[`output_${i}_srt`] = { name: `Output ${i} SRT` }
    definitions[`output_${i}_type`] = { name: `Output ${i} Type` }
    definitions[`output_${i}_input_name`] = { name: `Output ${i} Input Name` }
    definitions[`output_${i}_json`] = { name: `Output ${i} JSON data` }
  }

  return definitions
}

export const outputValues = async (instance: VMixInstance): Promise<OutputVariablesSchema> => {
  const variables: OutputVariablesSchema = {}

  if (!instance.config.variablesShowOutputs) return variables

  variables['fullscreen_1_source'] = ''
  variables['fullscreen_2_source'] = ''

  for (let i = 1; i < 5; i++) {
    variables[`output_${i}_source`] = ''
    variables[`output_${i}_ndi`] = ''
    variables[`output_${i}_omt`] = ''
    variables[`output_${i}_srt`] = ''
    variables[`output_${i}_type`] = ''
    variables[`output_${i}_input_name`] = ''
    variables[`output_${i}_json`] = {}
  }

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
      variables[`output_${output.number}_omt`] = output.omt.toString()
      variables[`output_${output.number}_srt`] = output.srt.toString()
      variables[`output_${output.number}_type`] = output.source
    }
    variables[`output_${output.number}_json`] = output as unknown as JsonValue
  }

  return variables
}
