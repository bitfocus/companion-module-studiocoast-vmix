import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { FunctionIDs } from '@distdev/vmix-utils'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { type EmptyOptions, type MixOptionEntry, options, valueMinMax } from '../utils.js'
import type VMixInstance from '../index.js'

export type LayerActionsSchema = {
  multiViewOverlay: CompanionActionSchema<{
    functionID: 'MultiViewOverlay' | 'MultiViewOverlayOff' | 'MultiViewOverlayOn'
    input: string
    value: string
  }>
  setMultiViewOverlay: CompanionActionSchema<{
    input: string
    layer: number
    layerInput: string
  }>
  setMultiViewOverlayOnPreview: CompanionActionSchema<{
    layer: number
    layerInput: string
    mix: MixOptionEntry
  }>
  setMultiViewOverlayOnProgram: CompanionActionSchema<{
    layer: number
    layerInput: string
    mix: MixOptionEntry
  }>
  setMultiViewOverlayDestinationInput: CompanionActionSchema<{
    destinationInput: string
  }>
  setMultiViewOverlayDestinationLayer: CompanionActionSchema<{
    destinationLayer: string
  }>
  setMultiViewOverlaySourceInput: CompanionActionSchema<{
    sourceIndex: string
  }>
  clearMultiViewOverlaySelection: EmptyOptions
  setLayerPosition: CompanionActionSchema<{
    input: string
    layer: string
    setting: 'Crop' | 'CropX1' | 'CropX2' | 'CropY1' | 'CropY2' | 'PanX' | 'PanY' | 'X' | 'Y' | 'Height' | 'Width' | 'Rectangle' | 'Zoom'
    adjustment: 'Set' | 'Increase' | 'Decrease'
    crop: string
    crop2: string
    pan: string
    xy: string
    heightWidth: string
    rectangle: string
    zoom: string
  }>
  moveLayer: CompanionActionSchema<{
    input: string
    from: number
    to: number
  }>
  swapLayerAnimated: CompanionActionSchema<{
    input: string
    from: number
    to: number
    duration: number
  }>
  setLayerAnimated: CompanionActionSchema<{
    input: string
    layer: number
    layerInput: string
  }>
}

export const getLayerActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<LayerActionsSchema> => {
  return {
    multiViewOverlay: {
      name: 'Layer - Toggle/On/Off Multiview Layer on Input',
      description: 'Change the state of the specified Layer on an Input',
      options: [
        {
          type: 'dropdown',
          label: 'MultiViewOverlay Function',
          id: 'functionID',
          default: 'MultiViewOverlay',
          choices: [
            { id: 'MultiViewOverlay', label: 'Toggle Overlay Layer on Input' },
            { id: 'MultiViewOverlayOff', label: 'Set Overlay Layer Off' },
            { id: 'MultiViewOverlayOn', label: 'Set Overlay Layer On' },
          ],
          disableAutoExpression: true,
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    setMultiViewOverlay: {
      name: 'Layer - Set Input as Multiview Layer',
      description: 'Changes the Layer of an Input',
      options: [
        {
          type: 'textinput',
          label: 'MultiView Input',
          id: 'input',
          default: '',
          useVariables: true,
        },
        {
          type: 'number',
          label: 'Layer',
          id: 'layer',
          default: 1,
          min: 1,
          max: 10,
          expressionDescription: `Valid Values: 1 to 10`,
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const layer = action.options.layerInput

        return instance.tcp.sendCommand(`FUNCTION SetMultiViewOverlay Input=${encodeURIComponent(action.options.input)}&Value=${action.options.layer},${encodeURIComponent(layer)}`)
      },
    },

    setLayerAnimated: {
      name: 'Layer - Set Layer (Animated)',
      description: 'Change Layer Index to Input. Animate if input exists in another layer',
      options: [
        options.input,
        {
          type: 'number',
          label: 'Layer',
          description: `Valid Values: 1 to 10`,
          id: 'layer',
          default: 1,
          min: 1,
          max: 10,
          step: 1,
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)
        const layerInput = await instance.data.getInput(action.options.layerInput)

        if (input === null || layerInput === null) return

        return instance.tcp.sendCommand(`FUNCTION SetLayerAnimated Input=${input.key}&Value=${action.options.layer},${layerInput.key}`)
      },
    },

    setMultiViewOverlayOnPreview: {
      name: 'Layer - Set Input as Multiview Overlay Layer on active Preview input',
      description: 'Changes the Layer of the current Preview Input',
      options: [
        {
          type: 'number',
          label: 'Layer',
          id: 'layer',
          default: 1,
          min: 1,
          max: 10,
          expressionDescription: `Valid Values: 1 to 10`,
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '',
          useVariables: true,
        },
        options.mixSelect,
      ],
      callback: async (action) => {
        const input = action.options.layerInput
        let mix = action.options.mix
        if (mix === 'Selected') mix = instance.routingData.mix + 1

        return instance.tcp.sendCommand(`FUNCTION SetMultiViewOverlay Input=${instance.data.mix[mix - 1].preview}&Value=${action.options.layer},${encodeURIComponent(input)}`)
      },
    },

    setMultiViewOverlayOnProgram: {
      name: 'Layer - Set Input as Multiview Overlay Layer on active Program input',
      description: 'Changes the Layer of the current Program Input',
      options: [
        {
          type: 'number',
          label: 'Layer',
          id: 'layer',
          default: 1,
          min: 1,
          max: 10,
          expressionDescription: `Valid Values: 1 to 10`,
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '1',
          useVariables: true,
        },
        options.mixSelect,
      ],
      callback: async (action) => {
        const input = action.options.layerInput
        let mix = action.options.mix
        if (mix === 'Selected') mix = instance.routingData.mix + 1

        return instance.tcp.sendCommand(`FUNCTION SetMultiViewOverlay Input=${instance.data.mix[mix - 1].program}&Value=${action.options.layer},${encodeURIComponent(input)}`)
      },
    },

    setMultiViewOverlayDestinationInput: {
      name: 'Layer - Set Destination Input for Routable Multiview Layer',
      description: 'Sets an input as the destination for Layer Routing',
      options: [
        {
          type: 'textinput',
          label: 'Destination Input',
          id: 'destinationInput',
          default: '1',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        let destination = action.options.destinationInput

        if (destination === '0') destination = instance.data.mix[0].preview.toString()
        if (destination === '-1') destination = instance.data.mix[0].program.toString()

        instance.routingData.layer.destinationInput = destination
        instance.checkFeedbacks('selectedDestinationInput', 'routableMultiviewLayer')
        instance.variables?.updateVariables()
      },
    },

    setMultiViewOverlayDestinationLayer: {
      name: 'Layer - Set Destination Layer for Routable Multiview Layer',
      description: 'Sets a Layer as the destination for Layer Router',
      options: [
        {
          type: 'textinput',
          label: 'Destination Layer (1-10) of destination Input',
          id: 'destinationLayer',
          default: '',
          useVariables: true,
          expressionDescription: `Valid Values: 1 to 10`,
        },
      ],
      callback: async (action) => {
        const parseShiftState = action.options.destinationLayer + ''
        const layerOption = parseFloat(parseShiftState)
        const checkNaN = isNaN(layerOption)
        const checkValid = layerOption % 1 === 0 && layerOption > 0 && layerOption <= 10

        if (!checkNaN && checkValid) {
          instance.routingData.layer.destinationLayer = layerOption.toString()

          instance.checkFeedbacks('selectedDestinationLayer', 'routableMultiviewLayer')
          instance.variables?.updateVariables()
        } else {
          instance.log('warn', `Setting Multiview Destination layer must be a whole number, 1 to 10`)
        }
      },
    },

    setMultiViewOverlaySourceInput: {
      name: 'Layer - Set Source Input for Routable Multiview Layer',
      description: 'Sets the Source Input to be used on the Destination Layer and Input',
      options: [
        {
          type: 'textinput',
          label: 'Input to be routed to destination (0 to clear layer)',
          id: 'sourceIndex',
          default: '1',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const input = action.options.sourceIndex
        const destinationInput = instance.routingData.layer.destinationInput
        const destinationLayer = instance.routingData.layer.destinationLayer

        if (destinationInput !== null && destinationLayer !== null) {
          const inputValue = input === '0' || input === '' ? '' : input

          return instance.tcp.sendCommand(`FUNCTION SetMultiViewOverlay Input=${encodeURIComponent(destinationInput)}&Value=${destinationLayer},${encodeURIComponent(inputValue)}`)
        }
      },
    },

    clearMultiViewOverlaySelection: {
      name: 'Layer - Clear Routable Multiview Layer selections',
      description: 'Clears selected Destination Layer and Input',
      options: [],
      callback: () => {
        instance.routingData.layer.destinationInput = null
        instance.routingData.layer.destinationLayer = null

        instance.checkFeedbacks('selectedDestinationInput', 'selectedDestinationLayer', 'routableMultiviewLayer')
        instance.variables?.updateVariables()
      },
    },

    setLayerPosition: {
      name: 'Layer - Position',
      description: 'Control Input Layers Position and sizing',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer (1 to 10)',
          id: 'layer',
          default: '1',
          useVariables: true,
          expressionDescription: `Valid Values: 1 to 10`,
        },
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'setting',
          default: 'Crop',
          choices: [
            { id: 'Crop', label: 'Crop' },
            { id: 'CropX1', label: 'Crop X1' },
            { id: 'CropX2', label: 'Crop X2' },
            { id: 'CropY1', label: 'Crop Y1' },
            { id: 'CropY2', label: 'Crop Y2' },
            { id: 'PanX', label: 'Pan X (Percent)' },
            { id: 'PanY', label: 'Pan Y (Percent)' },
            { id: 'X', label: 'Pan X (Pixels)' },
            { id: 'Y', label: 'Pan Y (Pixels)' },
            { id: 'Height', label: 'Zoom X' },
            { id: 'Width', label: 'Zoom Y' },
            { id: 'Zoom', label: 'Zoom' },
            { id: 'Rectangle', label: 'Rectangle' },
          ],
          disableAutoExpression: true,
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop) X1,Y1,X2,Y2',
          id: 'crop',
          default: '0,0,1,1',
          useVariables: true,
          isVisibleExpression: `$(options:setting) === 'Crop'`,
        },
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop)',
          id: 'crop2',
          default: '0',
          useVariables: true,
          isVisibleExpression: `$(options:setting) !== 'Crop' && includes($(options:setting), 'Crop')`,
        },
        {
          type: 'textinput',
          label: 'Pan (0 = Centered, -2 = 100% to left/bottom, 2 = 100% to right/top)',
          id: 'pan',
          default: '1',
          useVariables: true,
          isVisibleExpression: `$(options:setting) === 'PanX' || $(options:setting) === 'PanY'`,
        },
        {
          type: 'textinput',
          label: 'Pan X / Pan Y position in pixels based on preset resolution',
          id: 'xy',
          default: '1',
          useVariables: true,
          isVisibleExpression: `$(options:setting) === 'X' || $(options:setting) === 'Y'`,
        },
        {
          type: 'textinput',
          label: 'Zoom X / Zoom Y position in pixels based on preset resolution',
          id: 'heightWidth',
          default: '1',
          useVariables: true,
          isVisibleExpression: `$(options:setting) === 'Height' || $(options:setting) === 'Width'`,
        },
        {
          type: 'textinput',
          label: 'Position and Size in pixels (X,Y,Width,Height)',
          id: 'rectangle',
          default: '1',
          useVariables: true,
          isVisibleExpression: `$(options:setting) === 'Rectangle'`,
        },
        {
          type: 'textinput',
          label: 'Zoom (1 = 100%, 0.5 = 50%, 2 = 200%) uses Zoom X for adjustment',
          id: 'zoom',
          default: '1',
          useVariables: true,
          isVisibleExpression: `$(options:setting) === 'Zoom'`,
        },
      ],
      callback: async (action) => {
        const selected = action.options.input
        const input = await instance.data.getInput(selected)
        const selectedLayer = action.options.layer
        const layer = parseInt(selectedLayer)
        const inputLayer = input?.overlay?.find((overlay) => overlay.index === layer - 1)

        if (!input || isNaN(layer)) {
          return instance.log('debug', `Input not found, or layer number invalid`)
        }

        if (inputLayer === undefined) {
          return instance.log('debug', `Unable to find layer ${layer} on input ${selected}`)
        }

        if (layer < 1 || layer > 10) {
          return instance.log('warn', 'Invalid layer, value must be 1 to 10')
        }

        if (action.options.adjustment !== 'Set' && instance.data.majorVersion < 27) {
          return instance.log('warn', 'Input Layer Position Adjustment Increase/Decrease is only available in vMix 27 or later')
        }

        let cmd = `FUNCTION SetLayer${layer}${action.options.setting} Input=${input.key}&Value=`

        if (action.options.setting === 'Crop') {
          cmd += action.options.crop
        } else if (action.options.setting.startsWith('Crop')) {
          let value: string | number = action.options.crop2
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value
          const crop = 'c' + action.options.setting.substring(1)

          if (action.options.adjustment === 'Increase') {
            const currentValue = (inputLayer[crop] !== undefined ? inputLayer[crop] : 0) as number
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = (inputLayer[crop] !== undefined ? inputLayer[crop] : 0) as number
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, 0, 1)
        } else if (action.options.setting.startsWith('Pan')) {
          let value: string | number = action.options.pan
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value
          const pan = 'p' + action.options.setting.substring(1)

          if (action.options.adjustment === 'Increase') {
            const currentValue = (inputLayer[pan] !== undefined ? inputLayer[pan] : 0) as number
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = (inputLayer[pan] !== undefined ? inputLayer[pan] : 0) as number
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, -2, 2)
        } else if (action.options.setting === 'X' || action.options.setting === 'Y') {
          let value: string | number = action.options.xy
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value

          if (action.options.adjustment === 'Increase') {
            const currentValue = (inputLayer[action.options.setting.toLowerCase()] !== undefined ? inputLayer[action.options.setting.toLowerCase()] : 0) as number
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = (inputLayer[action.options.setting.toLowerCase()] !== undefined ? inputLayer[action.options.setting.toLowerCase()] : 0) as number
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, -4096, 4096)
        } else if (action.options.setting === 'Height' || action.options.setting === 'Width') {
          let value: string | number = action.options.heightWidth
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value

          if (action.options.adjustment === 'Increase') {
            const currentValue = (inputLayer[action.options.setting.toLowerCase()] !== undefined ? inputLayer[action.options.setting.toLowerCase()] : 0) as number
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = (inputLayer[action.options.setting.toLowerCase()] !== undefined ? inputLayer[action.options.setting.toLowerCase()] : 0) as number
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, -4096, 4096)
        } else if (action.options.setting === 'Rectangle') {
          cmd += action.options.rectangle
        } else if (action.options.setting === 'Zoom') {
          let value: string | number = action.options.zoom
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value

          if (action.options.adjustment === 'Increase') {
            const currentValue = inputLayer.zoomX !== undefined ? inputLayer.zoomX : 1
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = inputLayer.zoomX !== undefined ? inputLayer.zoomX : 1
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, 0, 4)
        } else {
          return
        }

        return instance.tcp.sendCommand(cmd)
      },
    },

    moveLayer: {
      name: 'Layer - Move Layer',
      description: 'Moves a layer within an Input',
      options: [
        options.input,
        {
          type: 'number',
          label: 'From',
          description: `Valid Values: 1 to 10`,
          id: 'from',
          default: 1,
          min: 1,
          max: 10,
          step: 1,
        },
        {
          type: 'number',
          label: 'To',
          description: `Valid Values: 1 to 10`,
          id: 'to',
          default: 2,
          min: 1,
          max: 10,
          step: 1,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)

        if (input === null) return

        return instance.tcp.sendCommand(`FUNCTION MoveLayer Input=${input.key}&Value=${action.options.from},${action.options.to}`)
      },
    },

    swapLayerAnimated: {
      name: 'Layer - Move/Swap Layer (Animated)',
      description: 'Animate swapping the Layers in Input',
      options: [
        options.input,
        {
          type: 'number',
          label: 'From',
          description: `Valid Values: 1 to 10`,
          id: 'from',
          default: 1,
          min: 1,
          max: 10,
          step: 1,
        },
        {
          type: 'number',
          label: 'To',
          description: `Valid Values: 1 to 10`,
          id: 'to',
          default: 2,
          min: 1,
          max: 10,
          step: 1,
        },
        {
          type: 'number',
          label: 'Duration',
          description: `Milliseconds`,
          id: 'duration',
          default: 1000,
          min: 1,
          max: 60000,
          step: 1,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)

        if (input === null) return

        return instance.tcp.sendCommand(`FUNCTION SwapLayerAnimated Input=${input.key}&Value=${action.options.from},${action.options.to},${action.options.duration}`)
      },
    },
  }
}

export const vMixLayerFunctions: ActionFunctionsList<LayerActionsSchema> = {
  multiViewOverlay: ['MultiViewOverlay', 'MultiViewOverlayOff', 'MultiViewOverlayOn', 'LayerOnOff', 'LayerOn', 'LayerOff'],
  setMultiViewOverlay: ['SetMultiViewOverlay', 'SetLayer'],
  setLayerAnimated: ['SetLayerAnimated'],
  setMultiViewOverlayOnPreview: [],
  setMultiViewOverlayOnProgram: [],
  setMultiViewOverlayDestinationInput: [],
  setMultiViewOverlayDestinationLayer: [],
  setMultiViewOverlaySourceInput: [],
  clearMultiViewOverlaySelection: [],
  setLayerPosition: [],
  moveLayer: ['MoveLayer', 'MoveMultiViewOverlay'],
  swapLayerAnimated: ['SwapLayerAnimated'],
}

const layerPositions = ['Crop', 'CropX1', 'CropX2', 'CropY1', 'CropY2', 'PanX', 'PanY', 'X', 'Y', 'Height', 'Width', 'Rectangle', 'Zoom']
for (let i = 1; i < 11; i++) {
  layerPositions.forEach((type) => {
    vMixLayerFunctions.setLayerPosition.push(`SetLayer${i}${type}` as FunctionIDs)
  })
}

layerPositions.forEach((type) => {
  vMixLayerFunctions.setLayerPosition.push(`SetLayerDynamic${type}` as FunctionIDs)
})
