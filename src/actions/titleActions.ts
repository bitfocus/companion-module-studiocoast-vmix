import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { TITLEANIMATIONPAGE, options } from '../utils'
import type VMixInstance from '../index'

type ControlCountdownOptions = {
  functionID: 'StartCountdown' | 'StopCountdown' | 'PauseCountdown'
  input: string
  selectedIndex: string
}

type SetCountdownOptions = {
  value: string
  input: string
  selectedIndex: string
}

type ChangeCountdownOptions = {
  value: string
  input: string
  selectedIndex: string
}

type AdjustCountdownOptions = {
  value: string
  input: string
  selectedIndex: string
}

type SetTextOptions = {
  input: string
  selectedIndex: string
  adjustment: 'Set' | 'Increase' | 'Decrease'
  value: string
  encode: boolean
}

type SetTextColorOptions = {
  input: string
  selectedIndex: string
  value: string
}

type SetTextVisibleOptions = {
  input: string
  selectedIndex: string
  adjustment: 'Toggle' | 'On' | 'Off'
}

type SetColorOptions = {
  input: string
  selectedIndex: string
  value: string
}

type SetImageOptions = {
  input: string
  selectedIndex: string
  value: string
  encode: boolean
}

type SetImageVisibleOptions = {
  input: string
  selectedIndex: string
  adjustment: 'Toggle' | 'On' | 'Off'
}

type SelectTitlePresetOptions = {
  input: string
  value: string
}

type TitlePresetOptions = {
  input: string
  functionID: 'NextTitlePreset' | 'PreviousTitlePreset'
}

type TitleBeginAnimationOptions = {
  input: string
  value:
    | 'TransitionIn'
    | 'TransitionOut'
    | 'Page1'
    | 'Page2'
    | 'Page3'
    | 'Page4'
    | 'Page5'
    | 'Page6'
    | 'Page7'
    | 'Page8'
    | 'Page9'
    | 'Page10'
    | 'Continuous'
    | 'DataChangeIn'
    | 'DataChangeOut'
    | 'variable'
  variable: string
}

type ControlCountdownCallback = ActionCallback<'controlCountdown', ControlCountdownOptions>
type SetCountdownCallback = ActionCallback<'setCountdown', SetCountdownOptions>
type ChangeCountdownCallback = ActionCallback<'changeCountdown', ChangeCountdownOptions>
type AdjustCountdownCallback = ActionCallback<'adjustCountdown', AdjustCountdownOptions>
type SetTextCallback = ActionCallback<'setText', SetTextOptions>
type SetTextColorCallback = ActionCallback<'setTextColor', SetTextColorOptions>
type SetTextVisibleCallback = ActionCallback<'setTextVisible', SetTextVisibleOptions>
type SetColorCallback = ActionCallback<'setColor', SetColorOptions>
type SetImageCallback = ActionCallback<'setImage', SetImageOptions>
type SetImageVisibleCallback = ActionCallback<'setImage', SetImageVisibleOptions>
type SelectTitlePresetCallback = ActionCallback<'selectTitlePreset', SelectTitlePresetOptions>
type TitlePresetCallback = ActionCallback<'titlePreset', TitlePresetOptions>
type TitleBeginAnimationCallback = ActionCallback<'titleBeginAnimation', TitleBeginAnimationOptions>

export interface TitleActions {
  controlCountdown: VMixAction<ControlCountdownCallback>
  setCountdown: VMixAction<SetCountdownCallback>
  changeCountdown: VMixAction<ChangeCountdownCallback>
  adjustCountdown: VMixAction<AdjustCountdownCallback>
  setText: VMixAction<SetTextCallback>
  setTextColor: VMixAction<SetTextColorCallback>
  setTextVisible: VMixAction<SetTextVisibleCallback>
  setColor: VMixAction<SetColorCallback>
  setImage: VMixAction<SetImageCallback>
  setImageVisible: VMixAction<SetImageVisibleCallback>
  selectTitlePreset: VMixAction<SelectTitlePresetCallback>
  titlePreset: VMixAction<TitlePresetCallback>
  titleBeginAnimation: VMixAction<TitleBeginAnimationCallback>

  [key: string]: VMixAction<any>
}

export type TitleCallbacks =
  | ControlCountdownCallback
  | SetCountdownCallback
  | ChangeCountdownCallback
  | AdjustCountdownCallback
  | SetTextCallback
  | SetTextColorCallback
  | SetTextVisibleCallback
  | SetColorCallback
  | SelectTitlePresetCallback
  | TitlePresetCallback
  | TitleBeginAnimationCallback

export const vMixTitleActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): TitleActions => {
  return {
    controlCountdown: {
      name: 'Title - Start / Stop / Pause Countdown',
      description: 'Control Countdown running state',
      options: [
        {
          type: 'dropdown',
          label: 'Action',
          id: 'functionID',
          default: 'StartCountdown',
          choices: [
            { id: 'StartCountdown', label: 'Start' },
            { id: 'StopCountdown', label: 'Stop' },
            { id: 'PauseCountdown', label: 'Pause' },
          ],
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (instance.tcp)
          return instance.tcp.sendCommand(
            `FUNCTION ${action.options.functionID} Input=${encodeURIComponent(input)}&${indexNaNCheck ? 'SelectedName' : 'SelectedIndex'}=${encodeURIComponent(index)}`,
          )
      },
    },

    setCountdown: {
      name: 'Title - Set Countdown Duration',
      description: 'Sets the Duration of a Countdown',
      options: [
        {
          type: 'textinput',
          label: 'Time (00:00:00)',
          id: 'value',
          default: '00:10:00',
          useVariables: { local: true },
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]
        const value = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (instance.tcp)
          return instance.tcp.sendCommand(
            `FUNCTION SetCountdown Input=${encodeURIComponent(input)}&${indexNaNCheck ? 'SelectedName' : 'SelectedIndex'}=${encodeURIComponent(index)}&value=${value}`,
          )
      },
    },

    changeCountdown: {
      name: 'Title - Change Countdown Time',
      description: 'Sets the current time within a countdowns Duration',
      options: [
        {
          type: 'textinput',
          label: 'Time (00:00:00)',
          id: 'value',
          default: '00:10:00',
          useVariables: { local: true },
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]
        const value = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (instance.tcp)
          return instance.tcp.sendCommand(
            `FUNCTION ChangeCountdown Input=${encodeURIComponent(input)}&${indexNaNCheck ? 'SelectedName' : 'SelectedIndex'}=${encodeURIComponent(index)}&value=${value}`,
          )
      },
    },

    adjustCountdown: {
      name: 'Title - Add / Subtract seconds on Countdown',
      description: 'Modify the current time on a Countdown',
      options: [
        {
          type: 'textinput',
          label: 'Seconds',
          id: 'value',
          default: '10',
          useVariables: { local: true },
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]
        const value = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        // Check if value is valid
        if (isNaN(parseFloat(value)) || parseFloat(value) % 1 != 0) {
          instance.log('warn', "'Seconds' for adjusting a countdown must be a whole number")
        } else {
          if (instance.tcp)
            return instance.tcp.sendCommand(
              `FUNCTION AdjustCountdown Input=${encodeURIComponent(input)}&${indexNaNCheck ? 'SelectedName' : 'SelectedIndex'}=${encodeURIComponent(index)}&Value=${value}`,
            )
        }
      },
    },

    setText: {
      name: 'Title - Adjust title text',
      description: 'Adjusts text on a title layer (Starting from 0)',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
          useVariables: { local: true },
        },
        {
          type: 'checkbox',
          label: 'Encode Value (needed if text contains special characters)',
          id: 'encode',
          default: false,
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]
        let text = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (action.options.adjustment === 'Set') {
          if (action.options.encode) text = encodeURIComponent(text)
          if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetText Input=${encodeURIComponent(input)}&${indexNaNCheck}=${index}&Value=${text}`)
        } else {
          if (isNaN(parseFloat(text))) {
            instance.log('warn', 'Increasing/Decreasing a title requires Value to be a number')
          } else {
            // URL Encode plus and equals symbols to perform addition/subtraction on value instead of setting to a value.
            if (action.options.adjustment === 'Increase') {
              text = '%2b%3d' + text
            } else if (action.options.adjustment === 'Decrease') {
              text = '-%3d' + text
            }

            if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetText Input=${encodeURIComponent(input)}&${indexNaNCheck}=${index}&Value=${text}`)
          }
        }
      },
    },

    setTextColor: {
      name: 'Title - Adjust title text Color',
      description: 'Adjusts text on a title layer',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          tooltip: '(Indexed from 0 or by name)',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
        {
          type: 'textinput',
          label: 'Color (#RRGGBB)',
          id: 'value',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]
        const value = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]

        if (isNaN(parseInt(index, 10))) {
          if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetTextColour Input=${input}&Value=${value}&SelectedName=${index}`)
        } else {
          if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetTextColour Input=${input}&Value=${value}&SelectedIndex=${index}`)
        }
      },
    },

    setTextVisible: {
      name: 'Title - Adjust title text visibility',
      description: 'Sets the visibility of title text Toggle, On, or Off',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          tooltip: '(Indexed from 0 or by name)',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Toggle',
          choices: [
            { id: 'Toggle', label: 'Toggle' },
            { id: 'On', label: 'On' },
            { id: 'Off', label: 'Off' },
          ],
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]
        let type = 'SetTextVisible'

        if (action.options.adjustment === 'On') type = 'SetTextVisibleOn'
        if (action.options.adjustment === 'Off') type = 'SetTextVisibleOff'

        if (isNaN(parseInt(index, 10))) {
          if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${type} Input=${input}&SelectedName=${index}`)
        } else {
          if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${type} Input=${input}&SelectedIndex=${index}`)
        }
      },
    },

    setColor: {
      name: 'Title - Adjust title shape color',
      description: 'Requires vMix v25. only works on solid colors',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
        {
          type: 'textinput',
          label: 'Value (#RRGGBB or #AARRGGBB)',
          id: 'value',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]
        let value = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]

        if (!value.includes('#')) value = '#' + value

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetColor Input=${encodeURIComponent(input)}&${indexNaNCheck}=${index}&Value=${encodeURIComponent(value)}`)
      },
    },

    setImage: {
      name: 'Title - Set title Image',
      description: 'Sets Image on a title layer',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          tooltip: 'Index starting from 0, or layer name',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          tooltip: 'Filename or URL',
          default: '',
          useVariables: { local: true },
        },
        {
          type: 'checkbox',
          label: 'Encode Value (needed if text contains special characters)',
          id: 'encode',
          default: false,
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]
        let image = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (action.options.encode) image = encodeURIComponent(image)
        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetImage Input=${encodeURIComponent(input)}&${indexNaNCheck}=${index}&Value=${image}`)
      },
    },

    setImageVisible: {
      name: 'Title - Set title Image Visibility',
      description: 'Sets Image Visibility on a title layer',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          tooltip: 'Index starting from 0, or layer name',
          id: 'selectedIndex',
          default: '0',
          useVariables: { local: true },
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Toggle',
          choices: [
            { id: 'Toggle', label: 'Toggle' },
            { id: 'On', label: 'On' },
            { id: 'Off', label: 'Off' },
          ],
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex, context))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        let visibility = 'SetImageVisible'

        if (action.options.adjustment === 'On') visibility = 'SetImageVisibleOn'
        if (action.options.adjustment === 'Off') visibility = 'SetImageVisibleOff'

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${visibility} Input=${encodeURIComponent(input)}&${indexNaNCheck}=${index}`)
      },
    },

    selectTitlePreset: {
      name: 'Title - Select Title Preset',
      description: 'Selects a Title Preset (Start from 0)',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Preset Index',
          id: 'value',
          default: '0',
          useVariables: { local: true },
        },
      ],
      callback: sendBasicCommand,
    },

    titlePreset: {
      name: 'Title - Next / Prev Title Preset',
      description: 'Selects the next/previous Title Preset',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'NextTitlePreset',
          choices: [
            { id: 'NextTitlePreset', label: 'Select Next Title Preset' },
            { id: 'PreviousTitlePreset', label: 'Select Previous Title Preset' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    titleBeginAnimation: {
      name: 'Title - Begin Animation Page',
      description: 'Starts one of the animations states on a Title',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'value',
          default: 'Page1',
          choices: [
            { id: 'TransitionIn', label: 'Transition In' },
            { id: 'TransitionOut', label: 'Transition Out' },
            { id: 'Page1', label: 'Page 1' },
            { id: 'Page2', label: 'Page 2' },
            { id: 'Page3', label: 'Page 3' },
            { id: 'Page4', label: 'Page 4' },
            { id: 'Page5', label: 'Page 5' },
            { id: 'Page6', label: 'Page 6' },
            { id: 'Page7', label: 'Page 7' },
            { id: 'Page8', label: 'Page 8' },
            { id: 'Page9', label: 'Page 9' },
            { id: 'Page10', label: 'Page 10' },
            { id: 'Continuous', label: 'Continuous' },
            { id: 'DataChangeIn', label: 'Data Change In' },
            { id: 'DataChangeOut', label: 'Data Change Out' },
            { id: 'variable', label: 'Use Variable' },
          ],
        },
        {
          type: 'textinput',
          label: 'State Variable',
          id: 'variable',
          default: '',
          tooltip: 'Must match one of the valid Animation Page options',
          isVisibleExpression: `$(options:value) === 'variable'`,
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        let value: string = action.options.value

        if (value === 'variable') {
          value = (await instance.parseOption(action.options.variable, context))[instance.buttonShift.state]

          if (!TITLEANIMATIONPAGE.includes(value)) {
            instance.log('warn', `${value} is not a valid Title Animation`)
            return
          }
        }

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION TitleBeginAnimation Input=${encodeURIComponent(input)}&Value=${value}`)
      },
    },
  }
}
