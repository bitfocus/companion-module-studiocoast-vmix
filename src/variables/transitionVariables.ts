import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '..'
import { InstanceVariableValue } from './variables'

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

export const transitionValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: InstanceVariableValue = {}

  variables['connected_state'] = instance.connected.toString()

  instance.data.transitions.forEach((transition) => {
    variables[`transition_${transition.number}_effect`] = transition.effect
    variables[`transition_${transition.number}_duration`] = transition.duration.toString()
  })

  return variables
}
