import { VMixAction, ActionCallback } from './actions'
import { options } from '../utils'
import VMixInstance from '../index'

type SetInputPositionOptions = {
  functionID: 'SetPanX' | 'SetPanY' | 'SetZoom'
  input: string
  adjustment: 'Set' | 'Increase' | 'Decrease'
  value: string
}

type SetInputPositionCallback = ActionCallback<'setInputPostion', SetInputPositionOptions>

export interface PositionActions {
  setInputPostion: VMixAction<SetInputPositionCallback>

  [key: string]: VMixAction<any>
}

export type PositionCallbacks = SetInputPositionCallback

export const vMixPositionActions = (instance: VMixInstance, _sendBasicCommand: (action: Readonly<PositionCallbacks>) => Promise<void>): PositionActions => {
  return {
    setInputPostion: {
      name: 'Position - Adjust an inputs pan/zoom',
      description: 'Change the current Pan or Zoom value of an Input',
      options: [
        {
          type: 'dropdown',
          label: 'Function',
          id: 'functionID',
          default: 'SetPanX',
          choices: [
            { id: 'SetPanX', label: 'Pan X' },
            { id: 'SetPanY', label: 'Pan Y' },
            { id: 'SetZoom', label: 'Zoom' }
          ]
        },
        options.input,
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value (-2 to 2)',
          id: 'value',
          default: '0',
          useVariables: true
        }
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const value = (await instance.parseOption(action.options.value + ''))[instance.buttonShift.state]

        const valueTest = parseFloat(value)

        if (isNaN(valueTest)) {
          instance.log('warn', `Position - Adjust an inputs pan/zoom" Value field must be a number, or a variable which value is a number`)
          return
        }

        if (valueTest < -2 || valueTest > 2) {
          instance.log('warn', `Position - Adjust an inputs pan/zoom" Value field must be in the range -2 to 2`)
          return
        }

        let prefix = ''

        if (action.options.adjustment === 'Increase') {
          prefix = '%2B%3D'
        } else if (action.options.adjustment === 'Decrease') {
          prefix = '-%3D'
        }

        if (instance.tcp) instance.tcp.sendCommand(`FUNCTION ${action.options.functionID} Input=${encodeURIComponent(input)}&value=${prefix}${value}`)
      }
    }
  }
}
