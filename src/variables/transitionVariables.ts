import { CompanionVariableDefinition, CompanionVariableValue } from '@companion-module/base'
import VMixInstance from '..'

export const transitionDefinitions = (instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  instance.data.transitions.forEach((transition) => {
    definitions.push(
      { name: `Transition ${transition.number} Effect`, variableId: `transition_${transition.number}_effect` },
      { name: `Transition ${transition.number} Duration`, variableId: `transition_${transition.number}_duration` }
    )
  })

  return definitions
}

export const transitionValues = async (instance: VMixInstance): Promise<Map<string, CompanionVariableValue>> => {
  const variables = new Map()

  variables.set('connected_state', instance.connected.toString())

  instance.data.transitions.forEach((transition) => {
    variables.set(`transition_${transition.number}_effect`, transition.effect)
    variables.set(`transition_${transition.number}_duration`, transition.duration.toString())
  })

  return variables
}
