import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { type EmptyOptions, type MixOptionEntry, options, valueMinMax } from '../utils'
import type VMixInstance from '../index'

type MultiViewOverlayOptions = {
  functionID: 'MultiViewOverlay' | 'MultiViewOverlayOff' | 'MultiViewOverlayOn'
  input: string
  layer: number
}

type SetMultiViewOverlayOptions = {
  input: string
  layer: number
  layerInput: string
}

type SetMultiViewOverlayOnPreviewOptions = {
  layer: number
  layerInput: string
  mix: MixOptionEntry
  mixVariable: string
}

type SetMultiViewOverlayOnProgramOptions = {
  layer: number
  layerInput: string
  mix: MixOptionEntry
  mixVariable: string
}

type SetMultiViewOverlayDestinationInputOptions = {
  destinationInput: string
}

type SetMultiViewOverlayDestinationLayerOptions = {
  destinationLayer: string
}

type SetMultiViewOverlaySourceInputOptions = {
  sourceIndex: string
}

type ClearMultiViewOverlaySelectionOptions = EmptyOptions

type SetLayerPositionOptions = {
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
}

type MultiViewOverlayCallback = ActionCallback<'multiViewOverlay', MultiViewOverlayOptions>
type SetMultiViewOverlayCallback = ActionCallback<'setMultiViewOverlay', SetMultiViewOverlayOptions>
type SetMultiViewOverlayOnPreviewCallback = ActionCallback<'setMultiViewOverlayOnPreview', SetMultiViewOverlayOnPreviewOptions>
type SetMultiViewOverlayOnProgramCallback = ActionCallback<'setMultiViewOverlayOnProgram', SetMultiViewOverlayOnProgramOptions>
type SetMultiViewOverlayDestinationInputCallback = ActionCallback<'setMultiViewOverlayDestinationInput', SetMultiViewOverlayDestinationInputOptions>
type SetMultiViewOverlayDestinationLayerCallback = ActionCallback<'setMultiViewOverlayDestinationLayer', SetMultiViewOverlayDestinationLayerOptions>
type SetMultiViewOverlaySourceInputCallback = ActionCallback<'setMultiViewOverlaySourceInput', SetMultiViewOverlaySourceInputOptions>
type ClearMultiViewOverlaySelectionCallback = ActionCallback<'clearMultiViewOverlaySelection', ClearMultiViewOverlaySelectionOptions>
type SetLayerPositionCallback = ActionCallback<'setLayerPosition', SetLayerPositionOptions>

export interface LayerActions {
  multiViewOverlay: VMixAction<MultiViewOverlayCallback>
  setMultiViewOverlay: VMixAction<SetMultiViewOverlayCallback>
  setMultiViewOverlayOnPreview: VMixAction<SetMultiViewOverlayOnPreviewCallback>
  setMultiViewOverlayOnProgram: VMixAction<SetMultiViewOverlayOnProgramCallback>
  setMultiViewOverlayDestinationInput: VMixAction<SetMultiViewOverlayDestinationInputCallback>
  setMultiViewOverlayDestinationLayer: VMixAction<SetMultiViewOverlayDestinationLayerCallback>
  setMultiViewOverlaySourceInput: VMixAction<SetMultiViewOverlaySourceInputCallback>
  clearMultiViewOverlaySelection: VMixAction<ClearMultiViewOverlaySelectionCallback>
  setLayerPosition: VMixAction<SetLayerPositionCallback>

  [key: string]: VMixAction<any>
}

export type LayerCallbacks =
  | MultiViewOverlayCallback
  | SetMultiViewOverlayCallback
  | SetMultiViewOverlayOnPreviewCallback
  | SetMultiViewOverlayOnProgramCallback
  | SetMultiViewOverlayDestinationInputCallback
  | SetMultiViewOverlayDestinationLayerCallback
  | SetMultiViewOverlaySourceInputCallback
  | ClearMultiViewOverlaySelectionCallback
  | SetLayerPositionCallback

export const vMixLayerActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): LayerActions => {
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
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'value',
          default: '',
          useVariables: { local: true },
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
          useVariables: { local: true },
        },
        {
          type: 'number',
          label: 'Layer',
          id: 'layer',
          default: 1,
          min: 1,
          max: 10,
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const layer = (await instance.parseOption(action.options.layerInput, context))[instance.buttonShift.state]

        if (instance.tcp)
          return instance.tcp.sendCommand(`FUNCTION SetMultiViewOverlay Input=${encodeURIComponent(input)}&Value=${action.options.layer},${encodeURIComponent(layer)}`)
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
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '',
          useVariables: { local: true },
        },
        options.mixSelect,
        options.mixVariable,
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.layerInput, context))[instance.buttonShift.state]
        let mixVariable: string | number = (await instance.parseOption(action.options.mixVariable, context))[instance.buttonShift.state]
        mixVariable = parseInt(mixVariable, 10) - 1

        let mix: number = action.options.mix
        if (mix === -1) mix = instance.routingData.mix
        if (mix === -2) mix = mixVariable

        if (instance.tcp)
          return instance.tcp.sendCommand(`FUNCTION SetMultiViewOverlay Input=${instance.data.mix[mix].preview}&Value=${action.options.layer},${encodeURIComponent(input)}`)
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
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '1',
          useVariables: { local: true },
        },
        options.mixSelect,
        options.mixVariable,
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.layerInput, context))[instance.buttonShift.state]
        let mixVariable: string | number = (await instance.parseOption(action.options.mixVariable, context))[instance.buttonShift.state]
        mixVariable = parseInt(mixVariable, 10) - 1

        let mix: number = action.options.mix
        if (mix === -1) mix = instance.routingData.mix
        if (mix === -2) mix = mixVariable

        if (instance.tcp)
          return instance.tcp.sendCommand(`FUNCTION SetMultiViewOverlay Input=${instance.data.mix[mix].program}&Value=${action.options.layer},${encodeURIComponent(input)}`)
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
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        let destination = (await instance.parseOption(action.options.destinationInput, context))[instance.buttonShift.state]

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
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const parseOption = (await instance.parseOption(action.options.destinationLayer + '', context))[instance.buttonShift.state]
        const layerOption = parseFloat(parseOption)
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
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.sourceIndex, context))[instance.buttonShift.state]

        if (instance.routingData.layer.destinationInput !== null && instance.routingData.layer.destinationLayer !== null) {
          const inputValue = input === '0' || input === '' ? '' : input
          if (instance.tcp)
            return instance.tcp.sendCommand(
              `FUNCTION SetMultiViewOverlay Input=${encodeURIComponent(
                instance.routingData.layer.destinationInput,
              )}&Value=${instance.routingData.layer.destinationLayer},${encodeURIComponent(inputValue)}`,
            )
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
          useVariables: { local: true },
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
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop) X1,Y1,X2,Y2',
          id: 'crop',
          default: '0,0,1,1',
          useVariables: { local: true },
          isVisible: (options) => {
            return options.setting === 'Crop'
          },
        },
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop)',
          id: 'crop2',
          default: '0',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting !== 'Crop' && setting.startsWith('Crop')
          },
        },
        {
          type: 'textinput',
          label: 'Pan (0 = Centered, -2 = 100% to left/bottom, 2 = 100% to right/top)',
          id: 'pan',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'PanX' || setting === 'PanY'
          },
        },
        {
          type: 'textinput',
          label: 'Pan X / Pan Y position in pixels based on preset resolution',
          id: 'xy',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'X' || setting === 'Y'
          },
        },
        {
          type: 'textinput',
          label: 'Zoom X / Zoom Y position in pixels based on preset resolution',
          id: 'heightWidth',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'Height' || setting === 'Width'
          },
        },
        {
          type: 'textinput',
          label: 'Position and Size in pixels (X,Y,Width,Height)',
          id: 'rectangle',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'Rectangle'
          },
        },
        {
          type: 'textinput',
          label: 'Zoom (1 = 100%, 0.5 = 50%, 2 = 200%) uses Zoom X for adjustment',
          id: 'zoom',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'Zoom'
          },
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        const selectedLayer = (await instance.parseOption(action.options.layer, context))[instance.buttonShift.state]
        const layer = parseInt(selectedLayer)
        const inputLayer = input?.overlay?.find((overlay) => overlay.index === layer - 1)

        if (!input || isNaN(layer)) {
          instance.log('debug', `Input not found, or layer number invalid`)
          return
        }

        if (inputLayer === undefined) {
          instance.log('debug', `Unable to find layer ${layer} on input ${selected}`)
          return
        }

        if (layer < 1 || layer > 10) {
          instance.log('warn', 'Invalid layer, value must be 1 to 10')
          return
        }

        if (action.options.adjustment !== 'Set' && instance.data.majorVersion < 27) {
          instance.log('warn', 'Input Layer Position Adjustment Increase/Decrease is only available in vMix 27 or later')
          return
        }

        let cmd = `FUNCTION SetLayer${layer}${action.options.setting} Input=${input.key}&Value=`

        if (action.options.setting === 'Crop') {
          cmd += (await instance.parseOption(action.options.crop, context))[instance.buttonShift.state]
        } else if (action.options.setting.startsWith('Crop')) {
          let value: string | number = (await instance.parseOption(action.options.crop2, context))[instance.buttonShift.state]
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
          let value: string | number = (await instance.parseOption(action.options.pan, context))[instance.buttonShift.state]
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
          let value: string | number = (await instance.parseOption(action.options.xy, context))[instance.buttonShift.state]
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
          let value: string | number = (await instance.parseOption(action.options.heightWidth, context))[instance.buttonShift.state]
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
          cmd += (await instance.parseOption(action.options.rectangle, context))[instance.buttonShift.state]
        } else if (action.options.setting === 'Zoom') {
          let value: string | number = (await instance.parseOption(action.options.zoom, context))[instance.buttonShift.state]
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

        if (instance.tcp) {
          return instance.tcp.sendCommand(cmd)
        }
      },
    },
  }
}
