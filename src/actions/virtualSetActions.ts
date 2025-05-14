import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { options } from '../utils'
import type VMixInstance from '../index'

type VirtualSetOptions = {
  input: string
  value: '1' | '2' | '3' | '4'
}

type VirtualSetCallback = ActionCallback<'virtualSet', VirtualSetOptions>

export interface VirtualSetActions {
  virtualSet: VMixAction<VirtualSetCallback>

  [key: string]: VMixAction<any>
}

export type VirtualSetCallbacks = VirtualSetCallback

export const vMixVirtualSetActions = (instance: VMixInstance, _sendBasicCommand: SendBasicCommand): VirtualSetActions => {
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
          choices: ['1', '2', '3', '4'].map((value) => ({ id: value, label: value })),
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SelectIndex Input=${encodeURIComponent(input)}&Value=${action.options.value}`)
      },
    },
  }
}
