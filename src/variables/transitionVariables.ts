import type { CompanionVariableDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'

export type TransitionVariablesSchema = Partial<{
  [key: `transition_${number}_effect`]: string
  [key: `transition_${number}_duration`]: string
}>

export const transitionDefinitions = (instance: VMixInstance): CompanionVariableDefinitions<TransitionVariablesSchema> => {
  const definitions: CompanionVariableDefinitions<TransitionVariablesSchema> = {}

  if (!instance.config.variablesShowTransitions) return definitions

  instance.data.transitions.forEach((transition) => {
    definitions[`transition_${transition.number}_effect`] = { name: `Transition ${transition.number} Effect` }
    definitions[`transition_${transition.number}_duration`] = { name: `Transition ${transition.number} Duration` }
  })

  return definitions
}

export const transitionValues = async (instance: VMixInstance): Promise<TransitionVariablesSchema> => {
  const variables: TransitionVariablesSchema = {}

  if (!instance.config.variablesShowTransitions) return variables

  instance.data.transitions.forEach((transition) => {
    variables[`transition_${transition.number}_effect`] = transition.effect
    variables[`transition_${transition.number}_duration`] = transition.duration.toString()
  })

  return variables
}
