import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '../'
import { InstanceVariableValue } from '../variables'

export const layerDefinitions = (_instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  definitions.push({ name: 'Layer Routing Input', variableId: 'layer_routing_input' }, { name: 'Layer Routing Layer', variableId: 'layer_routing_layer' })

  return definitions
}

export const layerValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: InstanceVariableValue = {}

  const layerRoutingInput = await instance.data.getInput(instance.routingData.layer.destinationInput || '')

  if (layerRoutingInput) {
    const inputName = layerRoutingInput.shortTitle ? layerRoutingInput.shortTitle.replace(/[^a-z0-9-_.]+/gi, '') : layerRoutingInput.title.replace(/[^a-z0-9-_.]+/gi, '')
    variables['layer_routing_input'] = inputName
  } else {
    variables['layer_routing_input'] = ''
  }

  variables['layer_routing_layer'] = instance.routingData.layer.destinationLayer || ''

  return variables
}
