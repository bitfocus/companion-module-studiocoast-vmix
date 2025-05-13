import type { CompanionVariableDefinition } from '@companion-module/base'
import type VMixInstance from '..'

type VariablesTransitionIDs = `transition_${number}_effect` | `transition_${number}_duration`
type VariablesTransitionValues = Record<VariablesTransitionIDs, string | number | undefined>

export const transitionDefinitions = (instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  if (!instance.config.variablesShowTransitions) return definitions

  instance.data.transitions.forEach((transition) => {
    definitions.push(
      { name: `Transition ${transition.number} Effect`, variableId: `transition_${transition.number}_effect` },
      { name: `Transition ${transition.number} Duration`, variableId: `transition_${transition.number}_duration` }
    )
  })

  return definitions
}

export const transitionValues = async (instance: VMixInstance): Promise<VariablesTransitionValues> => {
  const variables: VariablesTransitionValues = {}

  if (!instance.config.variablesShowTransitions) return variables

  instance.data.transitions.forEach((transition) => {
    variables[`transition_${transition.number}_effect`] = transition.effect
    variables[`transition_${transition.number}_duration`] = transition.duration.toString()
  })

  return variables
}
