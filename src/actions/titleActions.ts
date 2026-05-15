import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { TITLEANIMATIONPAGE, options } from '../utils.js'
import type VMixInstance from '../index.js'

export type TitleActionsSchema = {
  controlCountdown: CompanionActionSchema<{
    functionID: 'StartCountdown' | 'StopCountdown' | 'PauseCountdown' | 'SuspendCountdown'
    input: string
    selectedIndex: string
  }>
  setCountdown: CompanionActionSchema<{
    value: string
    input: string
    selectedIndex: string
  }>
  changeCountdown: CompanionActionSchema<{
    value: string
    input: string
    selectedIndex: string
  }>
  adjustCountdown: CompanionActionSchema<{
    value: string
    input: string
    selectedIndex: string
  }>
  setText: CompanionActionSchema<{
    input: string
    selectedIndex: string
    adjustment: 'Set' | 'Increase' | 'Decrease'
    value: string
    encode: boolean
  }>
  setTextColor: CompanionActionSchema<{
    input: string
    selectedIndex: string
    value: string
  }>
  setTextVisible: CompanionActionSchema<{
    input: string
    selectedIndex: string
    adjustment: 'Toggle' | 'On' | 'Off'
  }>
  setColor: CompanionActionSchema<{
    input: string
    selectedIndex: string
    value: string
  }>
  setImage: CompanionActionSchema<{
    input: string
    selectedIndex: string
    value: string
    encode: boolean
  }>
  setImageVisible: CompanionActionSchema<{
    input: string
    selectedIndex: string
    adjustment: 'Toggle' | 'On' | 'Off'
  }>
  selectTitlePreset: CompanionActionSchema<{
    input: string
    value: string
  }>
  titlePreset: CompanionActionSchema<{
    input: string
    functionID: 'NextTitlePreset' | 'PreviousTitlePreset'
  }>
  titleBeginAnimation: CompanionActionSchema<{
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
  }>
  titleRender: CompanionActionSchema<{
    input: string
    functionID: 'PauseRender' | 'ResumeRender'
  }>
  setTickerSpeed: CompanionActionSchema<{
    input: string
    selectedIndex: string
    value: number
  }>
}

export const getTitleActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<TitleActionsSchema> => {
  return {
    controlCountdown: {
      name: 'Title - Start / Stop / Pause / Suspend Countdown',
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
            { id: 'SuspendCountdown', label: 'Suspend' },
          ],
          disableAutoExpression: true,
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (instance.tcp)
          return instance.tcp.sendCommand(`FUNCTION ${action.options.functionID} Input=${encodeURIComponent(action.options.input)}&${indexNaNCheck}=${encodeURIComponent(index)}`)
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
          useVariables: true,
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex
        const value = action.options.value

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (instance.tcp)
          return instance.tcp.sendCommand(`FUNCTION SetCountdown Input=${encodeURIComponent(action.options.input)}&${indexNaNCheck}=${encodeURIComponent(index)}&value=${value}`)
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
          useVariables: true,
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex
        const value = action.options.value

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (instance.tcp)
          return instance.tcp.sendCommand(
            `FUNCTION ChangeCountdown Input=${encodeURIComponent(action.options.input)}&${indexNaNCheck ? 'SelectedName' : 'SelectedIndex'}=${encodeURIComponent(index)}&value=${value}`,
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
          useVariables: true,
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex
        const value = action.options.value

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        // Check if value is valid
        if (isNaN(parseFloat(value)) || parseFloat(value) % 1 != 0) {
          instance.log('warn', "'Seconds' for adjusting a countdown must be a whole number")
        } else {
          if (instance.tcp)
            return instance.tcp.sendCommand(
              `FUNCTION AdjustCountdown Input=${encodeURIComponent(action.options.input)}&${indexNaNCheck}=${encodeURIComponent(index)}&Value=${value}`,
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
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
          useVariables: true,
        },
        {
          type: 'checkbox',
          label: 'Encode Value (needed if text contains special characters)',
          id: 'encode',
          default: false,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex
        let text = action.options.value

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (action.options.adjustment === 'Set') {
          if (action.options.encode) text = encodeURIComponent(text)
          if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetText Input=${encodeURIComponent(action.options.input)}&${indexNaNCheck}=${index}&Value=${text}`)
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

            if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetText Input=${encodeURIComponent(action.options.input)}&${indexNaNCheck}=${index}&Value=${text}`)
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
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Color',
          description: '#RRGGBB',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex
        const value = action.options.value
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetTextColour Input=${action.options.input}&Value=${value}&${indexNaNCheck}=${index}`)
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
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
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
          disableAutoExpression: true,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex
        let type = 'SetTextVisible'
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (action.options.adjustment === 'On') type = 'SetTextVisibleOn'
        if (action.options.adjustment === 'Off') type = 'SetTextVisibleOff'

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${type} Input=${action.options.input}&${indexNaNCheck}=${index}`)
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
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Value (#RRGGBB or #AARRGGBB)',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex
        let value = action.options.value

        if (!value.includes('#')) value = '#' + value

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (instance.tcp)
          return instance.tcp.sendCommand(`FUNCTION SetColor Input=${encodeURIComponent(action.options.input)}&${indexNaNCheck}=${index}&Value=${encodeURIComponent(value)}`)
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
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          description: 'Filename or URL',
          default: '',
          useVariables: true,
        },
        {
          type: 'checkbox',
          label: 'Encode Value (needed if text contains special characters)',
          id: 'encode',
          default: false,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex
        let image = action.options.value

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (action.options.encode) image = encodeURIComponent(image)
        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetImage Input=${encodeURIComponent(action.options.input)}&${indexNaNCheck}=${index}&Value=${image}`)
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
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
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
          disableAutoExpression: true,
        },
      ],
      callback: async (action) => {
        const index = action.options.selectedIndex

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10)) ? 'SelectedName' : 'SelectedIndex'

        let visibility = 'SetImageVisible'

        if (action.options.adjustment === 'On') visibility = 'SetImageVisibleOn'
        if (action.options.adjustment === 'Off') visibility = 'SetImageVisibleOff'

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${visibility} Input=${encodeURIComponent(action.options.input)}&${indexNaNCheck}=${index}`)
      },
    },

    selectTitlePreset: {
      name: 'Title - Select Title Preset',
      description: 'Selects a Title Preset (Starting from 0)',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Preset Index',
          id: 'value',
          default: '0',
          useVariables: true,
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
          disableAutoExpression: true,
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
          ],
          expressionDescription: `Valid Values: ${TITLEANIMATIONPAGE.join(', ')}`,
        },
      ],
      callback: async (action) => {
        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION TitleBeginAnimation Input=${encodeURIComponent(action.options.input)}&Value=${action.options.value}`)
      },
    },

    titleRender: {
      name: 'Title - Pause / Resume render',
      description: 'Pause Title Input while making multiple updates then Resume to start rendering again',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Pause / Resume',
          id: 'functionID',
          default: 'PauseRender',
          choices: [
            { id: 'PauseRender', label: 'Pause' },
            { id: 'ResumeRender', label: 'Resume' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    setTickerSpeed: {
      name: 'Title - Set Ticker speed',
      description: 'Sets the speed of a Ticker element in a Title input',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          description: 'Layer Index or Name',
          id: 'selectedIndex',
          default: '0',
          useVariables: true,
        },
        {
          type: 'number',
          label: 'Speed',
          description: 'Valid Values: 0 to 1000',
          id: 'value',
          default: 10,
          min: 0,
          max: 1000,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)

        if (input === null) return

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(action.options.selectedIndex, 10)) ? 'SelectedName' : 'SelectedIndex'

        if (instance.tcp) {
          return instance.tcp.sendCommand(
            `FUNCTION SetTickerSpeed Input=${input.key}&${indexNaNCheck}=${encodeURIComponent(action.options.selectedIndex)}&Value=${action.options.value}`,
          )
        }
      },
    },
  }
}

export const vMixTitleFunctions: ActionFunctionsList<TitleActionsSchema> = {
  controlCountdown: ['StartCountdown', 'StopCountdown', 'PauseCountdown', 'SuspendCountdown'],
  setCountdown: ['SetCountdown'],
  changeCountdown: ['ChangeCountdown'],
  adjustCountdown: ['AdjustCountdown'],
  setText: ['SetText'],
  setTextColor: ['SetTextColour'],
  setTextVisible: ['SetTextVisible', 'SetTextVisibleOn', 'SetTextVisibleOff'],
  setColor: ['SetColor'],
  setImage: ['SetImage'],
  setImageVisible: ['SetImageVisible', 'SetImageVisibleOn', 'SetImageVisibleOff'],
  selectTitlePreset: ['SelectTitlePreset'],
  titlePreset: ['NextTitlePreset', 'PreviousTitlePreset'],
  titleBeginAnimation: ['TitleBeginAnimation'],
  titleRender: ['PauseRender', 'ResumeRender'],
  setTickerSpeed: ['SetTickerSpeed'],
}
