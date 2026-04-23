import type { CompanionVariableDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'

export type LayerVariablesSchema = {
  layer_routing_input: string
  layer_routing_layer: string
}

export const layerDefinitions = (_instance: VMixInstance): CompanionVariableDefinitions<LayerVariablesSchema> => {
  const definitions = {
    layer_routing_input: { name: 'Layer Routing Input' },
    layer_routing_layer: { name: 'Layer Routing Layer' },
  }

  return definitions
}

export const layerValues = async (instance: VMixInstance): Promise<LayerVariablesSchema> => {
  const variables: LayerVariablesSchema = {
    layer_routing_input: '',
    layer_routing_layer: '',
  }

  const layerRoutingInput = await instance.data.getInput(instance.routingData.layer.destinationInput || '')

  if (layerRoutingInput) {
    const inputName = layerRoutingInput.shortTitle ? layerRoutingInput.shortTitle.replace(/[^a-z0-9-_.]+/gi, '') : layerRoutingInput.title.replace(/[^a-z0-9-_.]+/gi, '')
    variables['layer_routing_input'] = inputName
  }

  variables['layer_routing_layer'] = instance.routingData.layer.destinationLayer || ''

  return variables
}
