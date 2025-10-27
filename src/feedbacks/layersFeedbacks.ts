import { combineRgb } from '@companion-module/base'
import type { Input } from '../data'
import type { VMixFeedback, FeedbackCallback } from './feedback'
import { options } from '../utils'
import type VMixInstance from '../index'

type SelectedDestinationInputOptions = {
  input: string
}

type SelectedDestinationLayerOptions = {
  selectedIndex: string
}

type RoutableMultiviewLayerOptions = {
  input: string
}

type InputOnMultiviewOptions = {
  inputX: string
  inputY: string
  layer: string
}

type SelectedDestinationInputCallback = FeedbackCallback<'selectedDestinationInput', SelectedDestinationInputOptions>
type SelectedDestinationLayerCallback = FeedbackCallback<'selectedDestinationLayer', SelectedDestinationLayerOptions>
type RoutableMultiviewLayerCallback = FeedbackCallback<'routableMultiviewLayer', RoutableMultiviewLayerOptions>
type InputOnMultiviewCallback = FeedbackCallback<'inputOnMultiview', InputOnMultiviewOptions>

export interface LayersFeedbacks {
  selectedDestinationInput: VMixFeedback<SelectedDestinationInputCallback>
  selectedDestinationLayer: VMixFeedback<SelectedDestinationLayerCallback>
  routableMultiviewLayer: VMixFeedback<RoutableMultiviewLayerCallback>
  inputOnMultiview: VMixFeedback<InputOnMultiviewCallback>
}

export type LayersCallbacks = SelectedDestinationInputCallback | SelectedDestinationLayerCallback | RoutableMultiviewLayerCallback | InputOnMultiviewCallback

export const vMixLayersFeedbacks = (instance: VMixInstance): LayersFeedbacks => {
  return {
    selectedDestinationInput: {
      type: 'boolean',
      name: 'Layers - Destination Input Indicator',
      description: 'Indicates if input is currently selected for Layer Routing',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [options.input],
      callback: async (feedback, context) => {
        if (instance.routingData.layer.destinationInput === null) return false

        const selectInput = (await instance.data.getInput(instance.routingData.layer.destinationInput))?.key || ''
        const parseInputValue = await instance.parseOption(feedback.options.input, context)

        const getInputValue: (string | null)[] = []
        for (const input of parseInputValue) {
          let target = input
          if (input === '0') target = instance.data.mix[0].preview.toString()
          if (input === '-1') target = instance.data.mix[0].program.toString()
          const getInput = await instance.data.getInput(target)
          getInputValue.push(getInput?.key || null)
        }

        const blink = instance.buttonShift.blink && instance.config.shiftBlinkLayerRouting && getInputValue.includes(selectInput)

        return getInputValue[instance.buttonShift.state] === selectInput || blink
      },
    },

    selectedDestinationLayer: {
      type: 'boolean',
      name: 'Layers - Destination Layer Indicator',
      description: 'Indicates if layer is currently selected for Layer Routing',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [
        {
          type: 'textinput',
          label: 'Destination Layer of destination Input',
          id: 'selectedIndex',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: async (feedback, context) => {
        const getIndexValue = await instance.parseOption(feedback.options.selectedIndex + '', context)
        const blink =
          instance.routingData.layer.destinationLayer !== null &&
          instance.buttonShift.blink &&
          instance.config.shiftBlinkLayerRouting &&
          getIndexValue.includes(instance.routingData.layer.destinationLayer)

        return getIndexValue[instance.buttonShift.state] === instance.routingData.layer.destinationLayer || blink
      },
    },

    routableMultiviewLayer: {
      type: 'boolean',
      name: 'Layers - check if input is on destination Layer of destination input',
      description: 'Indicates if the input is destination layer and input',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [options.input],
      callback: async (feedback, context) => {
        const parseInputValue = await instance.parseOption(feedback.options.input, context)
        const getInputValue: (string | null)[] = []

        for (const input of parseInputValue) {
          const value = (await instance.data.getInput(input))?.key || null
          getInputValue.push(value)
        }

        if (getInputValue[instance.buttonShift.state] === null || instance.routingData.layer.destinationInput === null || instance.routingData.layer.destinationLayer === null) {
          return false
        }

        const selectedInput = await instance.data.getInput(instance.routingData.layer.destinationInput)
        const index = parseInt(instance.routingData.layer.destinationLayer) - 1

        if (selectedInput !== null && selectedInput.overlay) {
          const selectedLayer = selectedInput.overlay.find((overlay) => overlay.index === index)

          let blink = false
          if (selectedLayer?.key && instance.buttonShift.blink && instance.config.shiftBlinkLayerRouting && getInputValue.includes(selectedLayer.key)) {
            blink = true
          }

          return selectedLayer?.key === getInputValue[instance.buttonShift.state] || blink
        }

        return false
      },
    },

    inputOnMultiview: {
      type: 'boolean',
      name: 'Layers - check if X input is on Layer on Y input',
      description: 'Indicates if the input is currently on a specified layer of an input',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [
        {
          type: 'textinput',
          label: 'Input X',
          id: 'inputX',
          default: '1',
          tooltip: 'Number, Name, or GUID',
          useVariables: { local: true },
        },
        {
          type: 'textinput',
          label: 'Input Y',
          id: 'inputY',
          default: '1',
          tooltip: 'Number, Name, or GUID',
          useVariables: { local: true },
        },
        {
          type: 'textinput',
          label: 'Layer',
          id: 'layer',
          default: '0',
          tooltip: '1-10, 0 = Any layer',
          useVariables: { local: true },
        },
      ],
      callback: async (feedback, context) => {
        const targetLayer = await instance.parseOption(feedback.options.layer, context)
        const parseInputXValue = await instance.parseOption(feedback.options.inputX, context)
        const inputXValue: any = []

        for (const input of parseInputXValue) {
          const value = (await instance.data.getInput(input))?.key || null
          inputXValue.push(value)
        }

        const parseInputYValue = await instance.parseOption(feedback.options.inputY, context)
        const inputYValue: any = []

        for (const input of parseInputYValue) {
          const value = await instance.data.getInput(input)
          inputYValue.push(value)
        }

        const check = (state: number): boolean => {
          const target = parseInt(targetLayer[state], 10)
          if (target === 0) {
            return inputYValue[state]?.overlay?.find((layer: any) => layer.key === inputXValue[state]) !== undefined
          } else {
            const layer = inputYValue[state]?.overlay?.find((layer: any) => layer.index === target - 1)
            return layer?.key === inputXValue[state]
          }
        }

        const primaryCheck = check(instance.buttonShift.state)
        const secondaryCheck = inputYValue.map((input: Input, index: number) => {
          if (input !== null && inputXValue[index] !== null) {
            return check(index)
          } else {
            return false
          }
        })

        return primaryCheck || (secondaryCheck.includes(true) && instance.config.shiftBlinkLayerRouting && instance.buttonShift.blink)
      },
    },
  }
}
