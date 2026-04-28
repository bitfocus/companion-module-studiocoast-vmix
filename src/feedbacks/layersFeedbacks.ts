import type { CompanionFeedbackSchema } from '@companion-module/base'
import { type CompanionFeedbackDefinitions } from '@companion-module/base'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type LayersFeedbacksSchema = {
  selectedDestinationInput: CompanionFeedbackSchema<{
    input: string
  }>
  selectedDestinationLayer: CompanionFeedbackSchema<{
    selectedIndex: string
  }>
  routableMultiviewLayer: CompanionFeedbackSchema<{
    input: string
  }>
  inputOnMultiview: CompanionFeedbackSchema<{
    inputX: string
    inputY: string
    layer: string
  }>
}

export const getLayersFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<LayersFeedbacksSchema> => {
  return {
    selectedDestinationInput: {
      type: 'boolean',
      name: 'Layers - Destination Input Indicator',
      description: 'Indicates if input is currently selected for Layer Routing',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [options.input],
      callback: async (feedback) => {
        if (instance.routingData.layer.destinationInput === null) return false

        const selectInput = (await instance.data.getInput(instance.routingData.layer.destinationInput))?.key || ''
        let inputID = feedback.options.input
        if (feedback.options.input === '0') inputID = instance.data.mix[0].preview.toString()
        if (feedback.options.input === '-1') inputID = instance.data.mix[0].program.toString()
        const input = await instance.data.getInput(inputID)

        return selectInput === input?.key
      },
    },

    selectedDestinationLayer: {
      type: 'boolean',
      name: 'Layers - Destination Layer Indicator',
      description: 'Indicates if layer is currently selected for Layer Routing',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [
        {
          type: 'textinput',
          label: 'Destination Layer of destination Input',
          id: 'selectedIndex',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (feedback) => {
        return feedback.options.selectedIndex === instance.routingData.layer.destinationLayer
      },
    },

    routableMultiviewLayer: {
      type: 'boolean',
      name: 'Layers - check if input is on destination Layer of destination input',
      description: 'Indicates if the input is destination layer and input',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [options.input],
      callback: async (feedback) => {
        const input = await instance.data.getInput(feedback.options.input)
        if (instance.routingData.layer.destinationInput === null || instance.routingData.layer.destinationLayer === null || input === null) return false
        const routingInput = await instance.data.getInput(instance.routingData.layer.destinationInput)
        const index = parseInt(instance.routingData.layer.destinationLayer) - 1

        if (routingInput !== null && routingInput.overlay) {
          const selectedLayer = routingInput.overlay.find((overlay) => overlay.index === index)

          return selectedLayer?.key === input.key
        }

        return false
      },
    },

    inputOnMultiview: {
      type: 'boolean',
      name: 'Layers - check if X input is on Layer on Y input',
      description: 'Indicates if the input is currently on a specified layer of an input',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [
        {
          type: 'textinput',
          label: 'Input X',
          id: 'inputX',
          default: '1',
          description: 'Number, Name, or GUID',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Input Y',
          id: 'inputY',
          default: '1',
          description: 'Number, Name, or GUID',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Layer',
          id: 'layer',
          default: '0',
          description: '1-10, 0 = Any layer',
          useVariables: true,
        },
      ],
      callback: async (feedback) => {
        if (feedback.options.inputX === '' || feedback.options.inputY === '' || feedback.options.layer === '') return false
        const inputX = await instance.data.getInput(feedback.options.inputX)
        const inputY = await instance.data.getInput(feedback.options.inputY)
        const layer = parseInt(feedback.options.layer, 10)

        if (!inputX || !inputY || isNaN(layer)) return false

        let hit = false
        if (layer === 0) {
          hit = inputY.overlay?.find((overlay) => overlay.key === inputX.key) !== undefined
        } else {
          const overlay = inputY?.overlay?.find((overlay: any) => overlay.index === layer - 1)
          hit = overlay?.key === inputX.key
        }

        return hit
      },
    },
  }
}
