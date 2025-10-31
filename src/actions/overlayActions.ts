import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import type VMixInstance from '../index'

type OverlayFunctionsOptions = {
  type: 'OverlayInput' | 'PreviewOverlayInput' | 'In' | 'Last' | 'Out' | 'Off' | 'Zoom' | 'OverlayInputAllOff'
  input: string
  overlay: string
  mix: number | number[]
  mixVariable: string
}

type OverlayFunctionsCallback = ActionCallback<'overlayFunctions', OverlayFunctionsOptions>

export interface OverlayActions {
  overlayFunctions: VMixAction<OverlayFunctionsCallback>

  [key: string]: VMixAction<any>
}

export type OverlayCallbacks = OverlayFunctionsCallback

export const vMixOverlayActions = (instance: VMixInstance, _sendBasicCommand: SendBasicCommand): OverlayActions => {
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
        },
        {
          type: 'textinput',
          label: 'Input',
          id: 'input',
          default: '1',
          tooltip: 'Number, Name, or GUID',
          isVisibleExpression: `$(options:type) === 'OverlayInput' || $(options:type) === 'PreviewOverlayInput' || $(options:type) === 'In'`,
          useVariables: { local: true },
        },
        {
          type: 'textinput',
          label: 'Overlay',
          id: 'overlay',
          default: '1',
          tooltip: '',
          isVisibleExpression: `$(options:type) !== 'OverlayInputAllOff'`,
          useVariables: { local: true },
        },
        {
          type: 'multidropdown',
          label: 'Mix',
          id: 'mix',
          default: [0],
          choices: [
            { id: 0, label: '1' },
            { id: 1, label: '2' },
            { id: 2, label: '3' },
            { id: 3, label: '4' },
            { id: 4, label: '5' },
            { id: 5, label: '6' },
            { id: 6, label: '7' },
            { id: 7, label: '8' },
            { id: 8, label: '9' },
            { id: 9, label: '10' },
            { id: 10, label: '11' },
            { id: 11, label: '12' },
            { id: 12, label: '13' },
            { id: 13, label: '14' },
            { id: 14, label: '15' },
            { id: 15, label: '16' },
            { id: -1, label: 'Selected' },
            { id: -2, label: 'Variable' },
          ],
          isVisibleExpression: `$(options:type) !== 'OverlayInputAllOff' && $(options:type) !== 'Off' && $(options:type) !== 'Out' && $(options:type) !== 'Zoom' && $(options:type) !== 'PreviewOverlayInput'`,
        },
        {
          type: 'textinput',
          label: 'Mix Variable',
          id: 'mixVariable',
          default: '1',
          tooltip: '',
          isVisibleExpression: `($(options:type) == 'OverlayInput' || $(options:type) == 'In' ||  $(options:type) == 'Last') &&  arrayIncludes($(options:mix), -2)`,
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        let mixVariable: string | number = (await instance.parseOption(action.options.mixVariable, context))[instance.buttonShift.state]
        mixVariable = parseInt(mixVariable, 10) - 1

        let mixArray: number[] = []
        Array.isArray(action.options.mix) ? mixArray.push(...action.options.mix) : mixArray.push(action.options.mix)

        mixArray = mixArray.map((mix) => {
          if (mix === -1) return instance.routingData.mix
          if (mix === -2) return mixVariable
          return mix
        })

        const overlayID: string | number = (await instance.parseOption(action.options.overlay, context))[instance.buttonShift.state]

        if (instance.tcp) {
          if (action.options.type === 'OverlayInput') {
            return instance.tcp.sendCommand(`FUNCTION OverlayInput${overlayID} Input=${input}&Mix=${mixArray.join(',')}`)
          } else if (action.options.type === 'PreviewOverlayInput') {
            return instance.tcp.sendCommand(`FUNCTION PreviewOverlayInput${overlayID} Input=${input}`)
          } else if (action.options.type === 'OverlayInputAllOff') {
            return instance.tcp.sendCommand(`FUNCTION OverlayInputAllOff`)
          } else if (action.options.type === 'In') {
            return instance.tcp.sendCommand(`FUNCTION OverlayInput${overlayID}${action.options.type} Input=${input}&Mix=${mixArray.join(',')}`)
          } else if (action.options.type === 'Last') {
            return instance.tcp.sendCommand(`FUNCTION OverlayInput${overlayID}${action.options.type} Mix=${mixArray.join(',')}`)
          } else {
            return instance.tcp.sendCommand(`FUNCTION OverlayInput${overlayID}${action.options.type}`)
          }
        }
      },
    },
  }
}
