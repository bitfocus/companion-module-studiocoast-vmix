import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { type EmptyOptions, type MixOptionEntry, options, valueMinMax } from '../utils'
import type VMixInstance from '../index'

type ColourCorrectionType = 'hue' | 'saturation' | 'liftG' | 'liftB' | 'liftY' | 'gammaR' | 'gammaG' | 'gammaB' | 'gammaY' | 'gainR' | 'gainG' | 'gainB' | 'gainY'

interface PreviewInputOptions {
  input: string
  mix: MixOptionEntry
  mixVariable: string
}

interface GoOptions {
  input: string
}

interface ResetInputOptions {
  input: string
}

interface InputEffectOptions {
  input: string
  effect: '1' | '2' | '3' | '4'
  state: '' | 'On' | 'Off'
}

interface InputEffectStrengthOptions {
  input: string
  effect: '1' | '2' | '3' | '4'
  strength: string
}

interface SetCCOptions {
  input: string
  setting:
    | 'SetCCGainR'
    | 'SetCCGainG'
    | 'SetCCGainB'
    | 'SetCCGainRGB'
    | 'SetCCGainY'
    | 'SetCCGammaR'
    | 'SetCCGammaG'
    | 'SetCCGammaB'
    | 'SetCCGammaRGB'
    | 'SetCCGammaY'
    | 'SetCCHue'
    | 'SetCCLiftR'
    | 'SetCCLiftG'
    | 'SetCCLiftB'
    | 'SetCCLiftRGB'
    | 'SetCCLiftY'
    | 'SetCCSaturation'
  adjustment: 'Set' | 'Increase' | 'Decrease'
  gainValue: string
  otherValue: string
}

interface InputPositionOptions {
  input: string
  setting: 'SetZoom' | 'SetCrop' | 'SetCropX1' | 'SetCropX2' | 'SetCropY1' | 'SetCropY2' | 'SetPanX' | 'SetPanY'
  adjustment: 'Set' | 'Increase' | 'Decrease'
  zoomValue: string
  cropValue: string
  cropValue2: string
  panValue: string
}

interface InputFrameDelayOptions {
  input: string
  value: string
}

type PreviewInputCallback = ActionCallback<'previewInput', PreviewInputOptions>
type PreviewInputNextCallback = ActionCallback<'previewInputNext', EmptyOptions>
type PreviewInputPreviousCallback = ActionCallback<'previewInputPrevious', EmptyOptions>
type GoCallback = ActionCallback<'go', GoOptions>
type ResetInputCallback = ActionCallback<'resetInput', ResetInputOptions>
type UndoCallback = ActionCallback<'undo', EmptyOptions>
type InputEffectCallback = ActionCallback<'inputEffect', InputEffectOptions>
type InputEffectStrengthCallback = ActionCallback<'inputEffectStrength', InputEffectStrengthOptions>
type SetCCCallback = ActionCallback<'setCC', SetCCOptions>
type InputPositionCallback = ActionCallback<'inputPosition', InputPositionOptions>
type InputFrameDelayCallback = ActionCallback<'inputFrameDelay', InputFrameDelayOptions>

export interface InputActions {
  previewInput: VMixAction<PreviewInputCallback>
  previewInputNext: VMixAction<PreviewInputNextCallback>
  previewInputPrevious: VMixAction<PreviewInputPreviousCallback>
  go: VMixAction<GoCallback>
  resetInput: VMixAction<ResetInputCallback>
  undo: VMixAction<UndoCallback>
  inputEffect: VMixAction<InputEffectCallback>
  inputEffectStrength: VMixAction<InputEffectStrengthCallback>
  setCC: VMixAction<SetCCCallback>
  inputPosition: VMixAction<InputPositionCallback>
  inputFrameDelay: VMixAction<InputFrameDelayCallback>

  [key: string]: VMixAction<any>
}

export type InputCallbacks =
  | PreviewInputCallback
  | PreviewInputNextCallback
  | PreviewInputPreviousCallback
  | GoCallback
  | ResetInputCallback
  | UndoCallback
  | InputEffectCallback
  | InputEffectStrengthCallback
  | SetCCCallback
  | InputPositionCallback
  | InputFrameDelayCallback

export const vMixInputActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): InputActions => {
  return {
    previewInput: {
      name: 'Input - Send Input to Preview',
      description: 'Send to Preview the selected Input',
      options: [options.input, options.mixSelect, options.mixVariable],
      callback: sendBasicCommand,
    },

    previewInputNext: {
      name: 'Input - Send Next input to Preview',
      description: 'Send to Preview the next Input',
      options: [],
      callback: sendBasicCommand,
    },

    previewInputPrevious: {
      name: 'Input - Send Previous input to Preview',
      description: 'Send to Preview the previous Input',
      options: [],
      callback: sendBasicCommand,
    },

    go: {
      name: 'Input - GO Action',
      description: 'Run the GO Action of a specified Input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    resetInput: {
      name: 'Input - Reset',
      description: 'Reset an Input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    undo: {
      name: 'Input - Undo',
      description: 'Undo closing an input',
      options: [],
      callback: sendBasicCommand,
    },

    inputEffect: {
      name: 'Input - Effect Toggle/On/Off',
      description: 'Control effects on input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Effect',
          id: 'effect',
          default: '1',
          choices: [
            { id: '1', label: 'Effect 1' },
            { id: '2', label: 'Effect 2' },
            { id: '3', label: 'Effect 3' },
            { id: '4', label: 'Effect 4' },
          ],
        },
        {
          type: 'dropdown',
          label: 'State',
          id: 'state',
          default: '',
          choices: [
            { id: '', label: 'Toggle' },
            { id: 'On', label: 'On' },
            { id: 'Off', label: 'Off' },
          ],
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)

        if (!input) return

        const command = `Effect${action.options.effect}${action.options.state}`

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${command} Input=${input.key}`)
        }
      },
    },

    inputEffectStrength: {
      name: 'Input - Effect Strength',
      description: 'Control effect strength on input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Effect',
          id: 'effect',
          default: '1',
          choices: [
            { id: '1', label: 'Effect 1' },
            { id: '2', label: 'Effect 2' },
            { id: '3', label: 'Effect 3' },
            { id: '4', label: 'Effect 4' },
          ],
        },
        {
          type: 'textinput',
          label: 'Strength 0 to 1',
          id: 'strength',
          default: '1',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        const value = (await instance.parseOption(action.options.strength, context))[instance.buttonShift.state]
        const parsedValue = parseFloat(value)

        if (!input || isNaN(parsedValue)) return

        const command = `SetEffect${action.options.effect}Strength`

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${command} Input=${input.key}&Value=${parsedValue}`)
        }
      },
    },

    setCC: {
      name: 'Input - Colour Correction',
      description: 'Control CC Gain, Gamma, Hue, Lift, or Saturation',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'setting',
          default: 'SetCCGainR',
          choices: [
            { id: 'SetCCGainR', label: 'Gain R' },
            { id: 'SetCCGainG', label: 'Gain G' },
            { id: 'SetCCGainB', label: 'Gain B' },
            { id: 'SetCCGainY', label: 'Gain Y' },
            { id: 'SetCCGammaR', label: 'Gamma R' },
            { id: 'SetCCGammaG', label: 'Gamma G' },
            { id: 'SetCCGammaB', label: 'Gamma B' },
            { id: 'SetCCGammaY', label: 'Gamma Y' },
            { id: 'SetCCHue', label: 'Hue' },
            { id: 'SetCCLiftR', label: 'Lift R' },
            { id: 'SetCCLiftG', label: 'Lift G' },
            { id: 'SetCCLiftB', label: 'Lift B' },
            { id: 'SetCCLiftY', label: 'Lift Y' },
            { id: 'SetCCSaturation', label: 'Saturation' },
          ],
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Gain Value 0 to 2',
          id: 'gainValue',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting.startsWith('SetCCGain')
          },
        },
        {
          type: 'textinput',
          label: 'Gain Value -1 to 1',
          id: 'otherValue',
          default: '0',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return !setting.startsWith('SetCCGain')
          },
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        const valueOption = action.options.setting.startsWith('SetCCGain') ? action.options.gainValue : action.options.otherValue
        const value = (await instance.parseOption(valueOption, context))[instance.buttonShift.state]
        let parsedValue = parseFloat(value)

        if (!input || isNaN(parsedValue)) return

        if (action.options.adjustment !== 'Set' || !input.cc) {
          if (instance.data.majorVersion < 27) {
            instance.log('warn', 'Input CC Increase/Decrease is only available in vMix 27 or later')
            return
          }

          let type = action.options.setting.substring(5)
          type = type.charAt(0).toLowerCase() + type.slice(1)

          const currentValue = input.cc?.[type as ColourCorrectionType]

          if (currentValue !== undefined) {
            if (action.options.adjustment === 'Increase') {
              parsedValue = currentValue + parsedValue
            } else {
              parsedValue = currentValue - parsedValue
            }
          }

          if (action.options.setting.startsWith('SetCCGain')) {
            parsedValue = valueMinMax(parsedValue, 0, 2)
          } else {
            parsedValue = valueMinMax(parsedValue, -1, 1)
          }
        }

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${action.options.setting} Input=${input.key}&Value=${parsedValue}`)
        }
      },
    },

    inputPosition: {
      name: 'Input - Position',
      description: 'Control input Zoom, Crop, and Pan',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'setting',
          default: 'SetZoom',
          choices: [
            { id: 'SetZoom', label: 'Zoom' },
            { id: 'SetCrop', label: 'Crop' },
            { id: 'SetCropX1', label: 'Crop X1' },
            { id: 'SetCropX2', label: 'Crop X2' },
            { id: 'SetCropY1', label: 'Crop Y1' },
            { id: 'SetCropY2', label: 'Crop Y2' },
            { id: 'SetPanX', label: 'Pan X' },
            { id: 'SetPanY', label: 'Pan Y' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Increase', label: 'Increase' },
            { id: 'Decrease', label: 'Decrease' },
          ],
          isVisible: (options) => {
            const setting = options.setting as string
            return setting !== 'setCrop'
          },
        },
        {
          type: 'textinput',
          label: 'Zoom Value 0 to 5 (1 = 100%, 0.5 = 50%, 2 = 200%)',
          id: 'zoomValue',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'SetZoom'
          },
        },
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop) X1,Y1,X2,Y2',
          id: 'cropValue',
          default: '0,0,1,1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'SetCrop'
          },
        },
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop)',
          id: 'cropValue2',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting.startsWith('SetCropX') || setting.startsWith('SetCropY')
          },
        },
        {
          type: 'textinput',
          label: 'Pan (0 = Centered, -2 = 100% to left, 2 = 100% to right)',
          id: 'panValue',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            const setting = options.setting as string
            return setting.startsWith('SetPan')
          },
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        let cmd = ''

        if (!input) return

        if (action.options.adjustment !== 'Set' && instance.data.majorVersion < 27) {
          instance.log('warn', 'Input Position Adjustment Increase/Decrease is only available in vMix 27 or later')
          return
        }

        if (action.options.setting === 'SetZoom') {
          let value: string | number = (await instance.parseOption(action.options.zoomValue, context))[instance.buttonShift.state]
          value = parseFloat(value)

          const currentValue = input.inputPosition?.zoomX ?? 1

          if (action.options.adjustment === 'Increase') {
            value = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            value = currentValue - value
          }

          cmd = `FUNCTION SetZoom Input=${input.key}&Value=${valueMinMax(Math.round(value * 1000) / 1000, 0, 5)}`
        } else if (action.options.setting === 'SetCrop') {
          const value: string = (await instance.parseOption(action.options.cropValue, context))[instance.buttonShift.state]

          cmd = `FUNCTION SetCrop Input=${input.key}&Value=${value}`
        } else if (action.options.setting.startsWith('SetCrop')) {
          let value: string | number = (await instance.parseOption(action.options.cropValue2, context))[instance.buttonShift.state]
          value = parseFloat(value)
          if (isNaN(value)) return

          const cropSetting = `crop${action.options.setting.substring(7)}`

          const currentValue = input.inputPosition?.[cropSetting] ?? 0

          if (action.options.adjustment === 'Increase') {
            value = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            value = currentValue - value
          }

          cmd = `FUNCTION ${action.options.setting} Input=${input.key}&Value=${valueMinMax(Math.round(value * 1000) / 1000, 0, 1)}`
        } else {
          let value: string | number = (await instance.parseOption(action.options.panValue, context))[instance.buttonShift.state]
          value = parseFloat(value)
          if (isNaN(value)) return

          const panSetting = `pan${action.options.setting.substring(6)}`
          const currentValue = input.inputPosition?.[panSetting] ?? 0

          if (action.options.adjustment === 'Increase') {
            value = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = input.inputPosition?.[panSetting] ?? 0
            value = currentValue - value
          }

          cmd = `FUNCTION ${action.options.setting} Input=${input.key}&Value=${valueMinMax(Math.round(value * 1000) / 1000, -2, 2)}`
        }

        if (instance.tcp) {
          return instance.tcp.sendCommand(cmd)
        }
      },
    },

    inputFrameDelay: {
      name: 'Input - Frame Delay',
      description: 'Set the delay in frames on supported inputs (eg, Cameras)',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Frames',
          id: 'value',
          default: '0',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        let value: number | string = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]
        value = parseInt(value)

        if (!input || isNaN(value)) {
          return
        }

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION SetFrameDelay Input=${input.key}&Value=${value}`)
        }
      },
    },
  }
}
