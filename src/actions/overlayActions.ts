import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'

export type OverlayActionsSchema = {
  overlayFunctions: CompanionActionSchema<{
    type: 'OverlayInput' | 'PreviewOverlayInput' | 'In' | 'Last' | 'Out' | 'Off' | 'Zoom' | 'OverlayInputAllOff'
    input: string
    overlay: string
    mix: (number | string)[]
  }>
}

export const getOverlayActions = (instance: VMixInstance, _sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<OverlayActionsSchema> => {
  return {
    overlayFunctions: {
      name: 'Overlay - Functions',
      description: 'Controls for Overlays',
      options: [
        {
          type: 'dropdown',
          label: 'Select Overlay Function',
          id: 'type',
          default: 'OverlayInput',
          choices: [
            { id: `OverlayInput`, label: `Overlay Toggle on Program` },
            { id: `PreviewOverlayInput`, label: `Overlay Toggle on Preview` },
            { id: `In`, label: ` Overlay Transition In` },
            { id: `Out`, label: ` Overlay Transition Out` },
            { id: `Last`, label: `Overlay Last Input On/Off` },
            { id: `Off`, label: `Overlay Off` },
            { id: `Zoom`, label: `Zoom PIP Overlay to/from fullscreen` },
            { id: 'OverlayInputAllOff', label: 'All Overlays Off' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Input',
          description: 'Number, Name, or GUID',
          id: 'input',
          default: '',
          isVisibleExpression: `$(options:type) === 'OverlayInput' || $(options:type) === 'PreviewOverlayInput' || $(options:type) === 'In'`,
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Overlay',
          description: '1 to 8',
          id: 'overlay',
          default: '1',
          isVisibleExpression: `$(options:type) !== 'OverlayInputAllOff'`,
          useVariables: true,
        },
        {
          type: 'multidropdown',
          label: 'Mix',
          id: 'mix',
          default: [1],
          choices: [
            { id: 1, label: '1' },
            { id: 2, label: '2' },
            { id: 3, label: '3' },
            { id: 4, label: '4' },
            { id: 5, label: '5' },
            { id: 6, label: '6' },
            { id: 7, label: '7' },
            { id: 8, label: '8' },
            { id: 9, label: '9' },
            { id: 10, label: '10' },
            { id: 11, label: '11' },
            { id: 12, label: '12' },
            { id: 13, label: '13' },
            { id: 14, label: '14' },
            { id: 15, label: '15' },
            { id: 16, label: '16' },
          ],
          isVisibleExpression: `$(options:type) !== 'OverlayInputAllOff' && $(options:type) !== 'Off' && $(options:type) !== 'Out' && $(options:type) !== 'Zoom' && $(options:type) !== 'PreviewOverlayInput'`,
          expressionDescription: `Valid Values: An array of numbers 1 to 16, eg [1, 3, 5]`,
        },
      ],
      callback: async (action) => {
        const input = action.options.input
        const overlayID: string | number = action.options.overlay

        const mix = action.options.mix.map((x) => {
          if (x === 'Selected') return instance.routingData.mix
          return (x as number) - 1
        })

        if (instance.tcp) {
          if (action.options.type === 'OverlayInput') {
            return instance.tcp.sendCommand(`FUNCTION OverlayInput${overlayID} Input=${input}&Mix=${mix.join(',')}`)
          } else if (action.options.type === 'PreviewOverlayInput') {
            return instance.tcp.sendCommand(`FUNCTION PreviewOverlayInput${overlayID} Input=${input}`)
          } else if (action.options.type === 'OverlayInputAllOff') {
            return instance.tcp.sendCommand(`FUNCTION OverlayInputAllOff`)
          } else if (action.options.type === 'In') {
            return instance.tcp.sendCommand(`FUNCTION OverlayInput${overlayID}${action.options.type} Input=${input}&Mix=${mix.join(',')}`)
          } else if (action.options.type === 'Last') {
            return instance.tcp.sendCommand(`FUNCTION OverlayInput${overlayID}${action.options.type} Mix=${mix.join(',')}`)
          } else {
            return instance.tcp.sendCommand(`FUNCTION OverlayInput${overlayID}${action.options.type}`)
          }
        }
      },
    },
  }
}
