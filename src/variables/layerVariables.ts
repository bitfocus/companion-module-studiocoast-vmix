import { CompanionVariableDefinition, CompanionVariableValue } from '@companion-module/base'
import VMixInstance from '../'

export const layerDefinitions = (_instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  definitions.push({ name: 'Layer Routing Input', variableId: 'layer_routing_input' }, { name: 'Layer Routing Layer', variableId: 'layer_routing_layer' })

  return definitions
}

export const layerValues = async (instance: VMixInstance): Promise<Map<string, CompanionVariableValue>> => {
  const variables = new Map()

  const layerRoutingInput = await instance.data.getInput(instance.routingData.layer.destinationInput || '')

  if (layerRoutingInput) {
    const inputName = layerRoutingInput.shortTitle ? layerRoutingInput.shortTitle.replace(/[^a-z0-9-_.]+/gi, '') : layerRoutingInput.title.replace(/[^a-z0-9-_.]+/gi, '')
    variables.set('layer_routing_input', inputName)
  } else {
    variables.set('layer_routing_input', '')
  }

  variables.set('layer_routing_layer', instance.routingData.layer.destinationLayer || '')

  return variables
}
