import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { type EmptyOptions, type MixOptionEntry, options, TRANSITIONS, valueMinMax } from '../utils.js'
import type VMixInstance from '../index.js'

export type InputActionsSchema = {
  addInput: CompanionActionSchema<{
    value: string
  }>
  removeInput: CompanionActionSchema<{
    input: string
  }>
  setInputName: CompanionActionSchema<{
    input: string
    value: string
  }>
  previewInput: CompanionActionSchema<{
    input: string
    mix: MixOptionEntry
  }>
  previewInputNext: EmptyOptions
  previewInputPrevious: EmptyOptions
  go: CompanionActionSchema<{
    input: string
  }>
  resetInput: CompanionActionSchema<{
    input: string
  }>
  undo: EmptyOptions
  inputEffect: CompanionActionSchema<{
    input: string
    effect: '1' | '2' | '3' | '4'
    state: '' | 'On' | 'Off'
  }>
  inputEffectStrength: CompanionActionSchema<{
    input: string
    effect: '1' | '2' | '3' | '4'
    strength: string
  }>
  setAlpha: CompanionActionSchema<{
    input: string
    value: number
  }>
  setCC: CompanionActionSchema<{
    input: string
    setting:
      | 'ColourCorrectionAuto'
      | 'ColourCorrectionReset'
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
  }>
  inputPosition: CompanionActionSchema<{
    input: string
    setting: 'SetZoom' | 'SetCrop' | 'SetCropX1' | 'SetCropX2' | 'SetCropY1' | 'SetCropY2' | 'SetPanX' | 'SetPanY'
    adjustment: 'Set' | 'Increase' | 'Decrease'
    zoomValue: string
    cropValue: string
    cropValue2: string
    panValue: string
  }>
  inputSharpen: CompanionActionSchema<{
    input: string
    functionID: 'SharpenOn' | 'SharpenOff'
  }>
  inputFrameDelay: CompanionActionSchema<{
    input: string
    value: string
  }>
  inputAuto: CompanionActionSchema<{
    input: string
    functionID: 'AutoPlayOn' | 'AutoPlayOff' | 'AutoPauseOn' | 'AutoPauseOff' | 'AutoRestartOn' | 'AutoRestartOff'
  }>
  createVirtualInput: CompanionActionSchema<{
    input: string
  }>
  deinterlace: CompanionActionSchema<{
    input: string
    functionID: 'DeinterlaceOn' | 'DeinterlaceOff'
  }>
  inputPreview: CompanionActionSchema<{
    input: string
    functionID: 'InputPreviewShowHide' | 'InputPreviewShow' | 'InputPreviewHide'
  }>
  mirrorInput: CompanionActionSchema<{
    input: string
    functionID: 'MirrorOn' | 'MirrorOff'
  }>
  moveInput: CompanionActionSchema<{
    input: string
    value: number
  }>
  selectCategory: CompanionActionSchema<{
    value:
      | 'All'
      | 'Red'
      | 'Green'
      | 'Orange'
      | 'Purple'
      | 'Aqua'
      | 'Blue'
      | 'Custom1'
      | 'Custom2'
      | 'Custom3'
      | 'Custom4'
      | 'Custom5'
      | 'Custom6'
      | 'Custom7'
      | 'Custom8'
      | 'Custom9'
      | 'Custom10'
      | 'Custom11'
      | 'Custom12'
      | 'Custom13'
      | 'Custom14'
      | 'Custom15'
      | 'Custom16'
      | 'Search'
  }>
  saveVideoDelay: CompanionActionSchema<{
    input: string
    duration: number
  }>
  setPictureEffect: CompanionActionSchema<{
    input: string
    type: 'Effect' | 'Duration'
    transition: (typeof TRANSITIONS)[number]
    duration: number
  }>
  setPictureTransition: CompanionActionSchema<{
    input: string
    value: number
  }>
  setRate: CompanionActionSchema<{
    input: string
    value: number
  }>
  videoDelayRecording: CompanionActionSchema<{
    input: string
    functionID: 'VideoDelayStartStopRecording' | 'VideoDelayStartRecording' | 'VideoDelayStopRecording'
    duration: number
  }>
}

type ColourCorrectionType = 'hue' | 'saturation' | 'liftG' | 'liftB' | 'liftY' | 'gammaR' | 'gammaG' | 'gammaB' | 'gammaY' | 'gainR' | 'gainG' | 'gainB' | 'gainY'

export const getInputActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<InputActionsSchema> => {
  return {
    addInput: {
      name: 'Input - Add Input',
      description: 'Add an input with the specified type and filename',
      options: [
        {
          type: 'textinput',
          label: 'Value',
          description: 'Must be in the format of: TYPE|FILENAME, eg Video|c:\\path\\to\\video.avi',
          id: 'value',
          default: 'TYPE|FILENAME',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },
    removeInput: {
      name: 'Input - Remove Input',
      description: 'Removes the specified Input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    setInputName: {
      name: 'Input - Set Input Name',
      description: 'Set the Display Name of the Input',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Name',
          description: 'Recommend to avoid special characters in Input Names',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    previewInput: {
      name: 'Input - Send Input to Preview',
      description: 'Send to Preview the selected Input',
      options: [options.input, options.mixSelect],
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
          expressionDescription: `Valid Values: 1 to 4`,
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
          expressionDescription: `Valid Values: '', 'On', 'Off'`,
        },
      ],
      callback: async (action) => {
        const command = `Effect${action.options.effect}${action.options.state}`

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${command} Input=${action.options.input}`)
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
          expressionDescription: `Valid Values: 1 to 4`,
        },
        {
          type: 'textinput',
          label: 'Strength',
          description: '0 to 1',
          id: 'strength',
          default: '1',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const value = action.options.strength
        const parsedValue = parseFloat(value)

        if (!action.options.input || isNaN(parsedValue)) return

        const command = `SetEffect${action.options.effect}Strength`

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${command} Input=${action.options.input}&Value=${parsedValue}`)
        }
      },
    },

    setAlpha: {
      name: 'Input - Set Alpha',
      description: 'Set Input transparency according to Value',
      options: [
        options.input,
        {
          type: 'number',
          label: 'Value',
          description: `Valid Values: 0 to 255`,
          id: 'value',
          default: 255,
          min: 0,
          max: 255,
          step: 1,
        },
      ],
      callback: sendBasicCommand,
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
            { id: 'ColourCorrectionAuto', label: 'Auto Colour Correction' },
            { id: 'ColourCorrectionReset', label: 'Reset Colour Correction' },
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
          disableAutoExpression: true,
        },
        { ...options.adjustment, isVisibleExpression: `!includes($(options:setting), 'ColourCorrection')` },
        {
          type: 'textinput',
          label: 'Gain Value',
          description: '0 to 2',
          id: 'gainValue',
          default: '1',
          useVariables: true,
          isVisibleExpression: `includes($(options:setting), 'SetCCGain')`,
        },
        {
          type: 'textinput',
          label: 'Gain Value',
          description: '-1 to 1',
          id: 'otherValue',
          default: '0',
          useVariables: true,
          isVisibleExpression: `!includes($(options:setting), 'SetCCGain') && !includes($(options:setting), 'ColourCorrection')`,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)
        const valueOption = action.options.setting.startsWith('SetCCGain') ? action.options.gainValue : action.options.otherValue
        const value = valueOption
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
          if (action.options.setting === 'ColourCorrectionAuto' || action.options.setting === 'ColourCorrectionReset') {
            return instance.tcp.sendCommand(`FUNCTION ${action.options.setting} Input=${input.key}`)
          } else {
            return instance.tcp.sendCommand(`FUNCTION ${action.options.setting} Input=${input.key}&Value=${parsedValue}`)
          }
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
          disableAutoExpression: true,
        },
        {
          ...options.adjustment,
          isVisibleExpression: `$(options:setting) !== 'SetCrop'`,
        },
        {
          type: 'textinput',
          label: 'Zoom Value',
          description: '0 to 5 (1 = 100%, 0.5 = 50%, 2 = 200%)',
          id: 'zoomValue',
          default: '1',
          useVariables: true,
          isVisibleExpression: `$(options:setting) === 'SetZoom'`,
        },
        {
          type: 'textinput',
          label: 'Crop',
          description: '(0 = No Crop, 1 = Full Crop) X1,Y1,X2,Y2',
          id: 'cropValue',
          default: '0,0,1,1',
          useVariables: true,
          isVisibleExpression: `$(options:setting) === 'SetCrop'`,
        },
        {
          type: 'textinput',
          label: 'Crop',
          description: '0 = No Crop, 1 = Full Crop',
          id: 'cropValue2',
          default: '1',
          useVariables: true,
          isVisibleExpression: `includes($(options:setting), 'SetCropX') || includes($(options:setting), 'SetCropY')`,
        },
        {
          type: 'textinput',
          label: 'Pan',
          description: '0 = Centered, -2 = 100% to left/top, 2 = 100% to right/bottom',
          id: 'panValue',
          default: '1',
          useVariables: true,
          isVisibleExpression: `includes($(options:setting), 'SetPan')`,
        },
      ],
      callback: async (action) => {
        const selected = action.options.input
        const input = await instance.data.getInput(selected)
        let cmd = ''

        if (!input) return

        if (action.options.adjustment !== 'Set' && instance.data.majorVersion < 27) {
          instance.log('warn', 'Input Position Adjustment Increase/Decrease is only available in vMix 27 or later')
          return
        }

        if (action.options.setting === 'SetZoom') {
          let value: string | number = action.options.zoomValue
          value = parseFloat(value)

          const currentValue = input.inputPosition?.zoomX ?? 1

          if (action.options.adjustment === 'Increase') {
            value = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            value = currentValue - value
          }

          cmd = `FUNCTION SetZoom Input=${input.key}&Value=${valueMinMax(Math.round(value * 1000) / 1000, 0, 5)}`
        } else if (action.options.setting === 'SetCrop') {
          const value: string = action.options.cropValue

          cmd = `FUNCTION SetCrop Input=${input.key}&Value=${value}`
        } else if (action.options.setting.startsWith('SetCrop')) {
          let value: string | number = action.options.cropValue2
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
          let value: string | number = action.options.panValue
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

    inputSharpen: {
      name: 'Input - Sharpen On/Off',
      description: `Set an Inputs Sharpen setting On or Off`,
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Category',
          id: 'functionID',
          default: 'SharpenOn',
          choices: [
            { id: 'SharpenOn', label: 'On' },
            { id: 'SharpenOff', label: 'Off' },
          ],
          expressionDescription: `Valid Values: 'SharpenOn', 'SharpenOff'`,
        },
      ],
      callback: sendBasicCommand,
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
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const selected = action.options.input
        const input = await instance.data.getInput(selected)
        let value: number | string = action.options.value
        value = parseInt(value)

        if (!input || isNaN(value)) return

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION SetFrameDelay Input=${input.key}&Value=${value}`)
        }
      },
    },

    inputAuto: {
      name: 'Input - Auto Play/Pause/Restart',
      description: 'Set an Inputs auto Play, Pause, or Restart, setting',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'functionID',
          default: 'AutoPlayOn',
          choices: [
            { id: 'AutoPlayOn', label: 'Auto Play ON' },
            { id: 'AutoPlayOff', label: 'Auto Play Off' },
            { id: 'AutoPauseOn', label: 'Auto Pause On' },
            { id: 'AutoPauseOff', label: 'Auto Pause Off' },
            { id: 'AutoRestartOn', label: 'Auto Restart On' },
            { id: 'AutoRestartOff', label: 'Auto Restart Off' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    createVirtualInput: {
      name: 'Input - Create Virtual Input',
      description: 'Create a new Virtual Input from the specified Input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    deinterlace: {
      name: 'Input - Deinterlace',
      description: '',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'functionID',
          default: 'DeinterlaceOn',
          choices: [
            { id: 'DeinterlaceOn', label: 'Deinterlace ON' },
            { id: 'DeinterlaceOff', label: 'Deinterlace Off' },
          ],
          expressionDescription: `Valid Values: 'DeinterlaceOn' or 'DeinterlaceOff'`,
        },
      ],
      callback: sendBasicCommand,
    },

    inputPreview: {
      name: 'Input - Input Preview',
      description: 'Shows or Hides an Inputs large preview in the vMix UI',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'functionID',
          default: 'InputPreviewShowHide',
          choices: [
            { id: 'InputPreviewShowHide', label: 'Toggle Preview' },
            { id: 'InputPreviewShow', label: 'Show Preview' },
            { id: 'InputPreviewHide', label: 'Hide Preview' },
          ],
          expressionDescription: `Valid Values: 'InputPreviewShowHide', 'InputPreviewShow', or 'InputPreviewHide'`,
        },
      ],
      callback: sendBasicCommand,
    },

    mirrorInput: {
      name: 'Input - Mirror Input',
      description: 'Sets the Mirror setting on an Input On or Off',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'functionID',
          default: 'MirrorOn',
          choices: [
            { id: 'MirrorOn', label: 'Mirror On' },
            { id: 'MirrorOff', label: 'Mirror Off' },
          ],
          expressionDescription: `Valid Values: 'MirrorOn' or 'MirrorOff'`,
        },
      ],
      callback: sendBasicCommand,
    },

    moveInput: {
      name: 'Input - Move Input',
      description: 'Moves an input to the specified number',
      options: [
        options.input,
        {
          type: 'number',
          label: 'Input Number',
          description: 'Number to move the Input to',
          id: 'value',
          default: 1,
          min: 1,
          max: 1000,
          step: 1,
        },
      ],
      callback: sendBasicCommand,
    },

    selectCategory: {
      name: 'Input - Select Category',
      description: 'Change to Category according to Value',
      options: [
        {
          type: 'dropdown',
          label: 'Category',
          id: 'value',
          default: 'All',
          choices: [
            { id: 'All', label: 'All' },
            { id: 'Red', label: 'Red' },
            { id: 'Green', label: 'Green' },
            { id: 'Orange', label: 'Orange' },
            { id: 'Purple', label: 'Purple' },
            { id: 'Aqua', label: 'Aqua' },
            { id: 'Blue', label: 'Blue' },
            { id: 'Custom1', label: 'Custom1' },
            { id: 'Custom2', label: 'Custom2' },
            { id: 'Custom3', label: 'Custom3' },
            { id: 'Custom4', label: 'Custom4' },
            { id: 'Custom5', label: 'Custom5' },
            { id: 'Custom6', label: 'Custom6' },
            { id: 'Custom7', label: 'Custom7' },
            { id: 'Custom8', label: 'Custom8' },
            { id: 'Custom9', label: 'Custom9' },
            { id: 'Custom10', label: 'Custom10' },
            { id: 'Custom11', label: 'Custom11' },
            { id: 'Custom12', label: 'Custom12' },
            { id: 'Custom13', label: 'Custom13' },
            { id: 'Custom14', label: 'Custom14' },
            { id: 'Custom15', label: 'Custom15' },
            { id: 'Custom16', label: 'Custom16' },
            { id: 'Search', label: 'Search' },
          ],
          expressionDescription: `Valid Values: All, Red, Green, Orange, Purple, Aqua, Blue, Custom1-16, Search`,
        },
      ],
      callback: sendBasicCommand,
    },

    saveVideoDelay: {
      name: 'Input - Save Video Delay',
      description: 'Save video clip from Video Delay according to Duration',
      options: [
        options.input,
        {
          type: 'number',
          label: 'Duration',
          description: 'Milliseconds',
          id: 'duration',
          default: 1,
          min: 1,
          max: Number.MAX_SAFE_INTEGER,
          step: 1,
        },
      ],
      callback: sendBasicCommand,
    },

    setPictureEffect: {
      name: 'Input - Set Picture Effect/Duration',
      description: '',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Effect',
          choices: [{ id: 'Effect', label: 'Effect' }],
          disableAutoExpression: true,
        },
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'transition',
          default: 'Cut',
          choices: TRANSITIONS.map((transition) => ({ id: transition, label: transition })),
          expressionDescription: `Valid Values: ${TRANSITIONS.join(', ')}`,
          isVisibleExpression: `$(options:type) === 'Effect'`,
        },
        {
          type: 'number',
          label: 'Duration',
          description: 'Milliseconds',
          id: 'duration',
          default: 1000,
          min: 0,
          max: 60000,
          step: 1,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)

        if (input === null) return

        const functionID = action.options.type === 'Effect' ? 'SetPictureEffect' : 'SetPictureEffectDuration'
        const value = action.options.type === 'Effect' ? action.options.transition : action.options.duration

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${functionID} Input=${input.key}&Value=${value}`)
        }
      },
    },

    setPictureTransition: {
      name: 'Input - Set Picture Transition',
      description: 'Set transition time between Photos and PowerPoint slides in Seconds',
      options: [
        options.input,
        {
          type: 'number',
          label: 'Duration',
          description: 'Seconds',
          id: 'value',
          default: 5,
          min: 0,
          max: 86400,
          step: 1,
        },
      ],
      callback: sendBasicCommand,
    },

    setRate: {
      name: 'Input - Set Rate',
      description: 'Set Playback speed/rate for Videos and Video Delays',
      options: [
        options.input,
        {
          type: 'number',
          label: 'Duration',
          description: '0.5=50%, 1=100%, 2=200% etc',
          id: 'value',
          default: 5,
          min: 0.1,
          max: 4,
          step: 0.01,
        },
      ],
      callback: sendBasicCommand,
    },

    videoDelayRecording: {
      name: 'Input - Video Delay Recording',
      description: 'Toggle / Start / Stop ',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'VideoDelayStartStopRecording',
          choices: [
            { id: 'VideoDelayStartStopRecording', label: 'Toggle' },
            { id: 'VideoDelayStartRecording', label: 'Start' },
            { id: 'VideoDelayStopRecording', label: 'Stop' },
          ],
          expressionDescription: `Valid Values: 'VideoDelayStartStopRecording', 'VideoDelayStartRecording', 'VideoDelayStopRecording'`,
        },
        {
          type: 'number',
          label: 'Duration',
          description: 'Milliseconds',
          id: 'duration',
          default: 1000,
          min: 0,
          max: 86400,
          step: 1,
        },
      ],
      callback: sendBasicCommand,
    },
  }
}

export const vMixInputFunctions: ActionFunctionsList<InputActionsSchema> = {
  addInput: ['AddInput'],
  removeInput: ['RemoveInput'],
  setInputName: ['SetInputName'],
  previewInput: ['PreviewInput'],
  previewInputNext: ['PreviewInputNext'],
  previewInputPrevious: ['PreviewInputPrevious'],
  go: ['GO'],
  resetInput: ['ResetInput'],
  undo: ['Undo'],
  inputEffect: ['Effect1', 'Effect1On', 'Effect1Off', 'Effect2', 'Effect2On', 'Effect2Off', 'Effect3', 'Effect3On', 'Effect3Off', 'Effect4', 'Effect4On', 'Effect4Off'],
  inputEffectStrength: ['SetEffect1Strength', 'SetEffect2Strength', 'SetEffect3Strength', 'SetEffect4Strength'],
  setAlpha: ['SetAlpha'],
  setCC: [
    'ColourCorrectionAuto',
    'ColourCorrectionReset',
    'SetCCGainR',
    'SetCCGainG',
    'SetCCGainB',
    'SetCCGainRGB',
    'SetCCGainY',
    'SetCCGammaR',
    'SetCCGammaG',
    'SetCCGammaB',
    'SetCCGammaRGB',
    'SetCCGammaY',
    'SetCCHue',
    'SetCCLiftR',
    'SetCCLiftG',
    'SetCCLiftB',
    'SetCCLiftRGB',
    'SetCCLiftY',
    'SetCCSaturation',
  ],
  inputPosition: ['SetZoom', 'SetCrop', 'SetCropX1', 'SetCropX2', 'SetCropY1', 'SetCropY2', 'SetPanX', 'SetPanY'],
  inputSharpen: ['SharpenOn', 'SharpenOff'],
  inputFrameDelay: ['SetFrameDelay'],
  inputAuto: ['AutoPlayOn', 'AutoPlayOff', 'AutoPauseOn', 'AutoPauseOff', 'AutoRestartOn', 'AutoRestartOff'],
  createVirtualInput: ['CreateVirtualInput'],
  deinterlace: ['DeinterlaceOn', 'DeinterlaceOff'],
  inputPreview: ['InputPreviewShowHide', 'InputPreviewShow', 'InputPreviewHide'],
  mirrorInput: ['MirrorOn', 'MirrorOff'],
  moveInput: ['MoveInput'],
  selectCategory: ['SelectCategory'],
  saveVideoDelay: ['SaveVideoDelay'],
  setPictureEffect: ['SetPictureEffect', 'SetPictureEffectDuration'],
  setPictureTransition: ['SetPictureTransition'],
  setRate: ['SetRate'],
  videoDelayRecording: ['VideoDelayStartStopRecording', 'VideoDelayStartRecording', 'VideoDelayStopRecording'],
}
