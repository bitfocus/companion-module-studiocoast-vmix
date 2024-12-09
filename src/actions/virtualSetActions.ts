import { VMixAction, ActionCallback } from './actions'
import { options } from '../utils'
import VMixInstance from '../index'

type VirtualSetOptions = {
  input: string
  value: '1' | '2' | '3' | '4'
}

type VirtualSetCallback = ActionCallback<'virtualSet', VirtualSetOptions>

export interface VirtualSetActions {
  virtualSet: VMixAction<VirtualSetCallback>
}

export type VirtualSetCallbacks = VirtualSetCallback

export const vMixVirtualSetActions = (
  instance: VMixInstance,
  _sendBasicCommand: (action: Readonly<VirtualSetCallbacks>) => Promise<void>
): VirtualSetActions => {
  return {
    virtualSet: {
      name: 'VirtualSet - Zoom To Selected Preset',
      description: 'Zooms a Virtual Set to one of the presets',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Preset (1-4)',
          id: 'value',
          default: '1',
          choices: ['1', '2', '3', '4'].map((value) => ({ id: value, label: value }))
        }
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION SelectIndex Input=${encodeURIComponent(input)}&Value=${action.options.value}`
          )
      }
    }
  }
}
