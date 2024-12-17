import { VMixAction, ActionCallback } from './actions'
import { options } from '../utils'
import VMixInstance from '../index'

type OverlayFunctionsOptions = {
  functionID:
    | 'OverlayInput1'
    | 'OverlayInput2'
    | 'OverlayInput3'
    | 'OverlayInput4'
    | 'PreviewOverlayInput1'
    | 'PreviewOverlayInput2'
    | 'PreviewOverlayInput3'
    | 'PreviewOverlayInput4'
    | 'OverlayInput1In'
    | 'OverlayInput2In'
    | 'OverlayInput3In'
    | 'OverlayInput4In'
    | 'OverlayInput1Out'
    | 'OverlayInput2Out'
    | 'OverlayInput3Out'
    | 'OverlayInput4Out'
    | 'OverlayInput1Off'
    | 'OverlayInput2Off'
    | 'OverlayInput3Off'
    | 'OverlayInput4Off'
    | 'OverlayInputAllOff'
    | 'OverlayInput1Zoom'
    | 'OverlayInput2Zoom'
    | 'OverlayInput3Zoom'
    | 'OverlayInput4Zoom'
  input: string
}

type OverlayFunctionsCallback = ActionCallback<'overlayFunctions', OverlayFunctionsOptions>

export interface OverlayActions {
  overlayFunctions: VMixAction<OverlayFunctionsCallback>

  [key: string]: VMixAction<any>
}

export type OverlayCallbacks = OverlayFunctionsCallback

export const vMixOverlayActions = (_instance: VMixInstance, sendBasicCommand: (action: Readonly<OverlayCallbacks>) => Promise<void>): OverlayActions => {
  return {
    overlayFunctions: {
      name: 'Overlay - Functions',
      description: 'Controls for Overlays',
      options: [
        {
          type: 'dropdown',
          label: 'Select Overlay Function',
          id: 'functionID',
          default: 'OverlayInput1',
          choices: [
            { id: 'OverlayInput1', label: 'Toggle Overlay 1 on program' },
            { id: 'OverlayInput2', label: 'Toggle Overlay 2 on program' },
            { id: 'OverlayInput3', label: 'Toggle Overlay 3 on program' },
            { id: 'OverlayInput4', label: 'Toggle Overlay 4 on program' },
            { id: 'PreviewOverlayInput1', label: 'Toggle Overlay 1 on preview' },
            { id: 'PreviewOverlayInput2', label: 'Toggle Overlay 2 on preview' },
            { id: 'PreviewOverlayInput3', label: 'Toggle Overlay 3 on preview' },
            { id: 'PreviewOverlayInput4', label: 'Toggle Overlay 4 on preview' },
            { id: 'OverlayInput1In', label: 'Transition Overlay 1 on' },
            { id: 'OverlayInput2In', label: 'Transition Overlay 2 on' },
            { id: 'OverlayInput3In', label: 'Transition Overlay 3 on' },
            { id: 'OverlayInput4In', label: 'Transition Overlay 4 on' },
            { id: 'OverlayInput1Out', label: 'Transition Overlay 1 off' },
            { id: 'OverlayInput2Out', label: 'Transition Overlay 2 off' },
            { id: 'OverlayInput3Out', label: 'Transition Overlay 3 off' },
            { id: 'OverlayInput4Out', label: 'Transition Overlay 4 off' },
            { id: 'OverlayInput1Off', label: 'Set Overlay 1 off' },
            { id: 'OverlayInput2Off', label: 'Set Overlay 2 off' },
            { id: 'OverlayInput3Off', label: 'Set Overlay 3 off' },
            { id: 'OverlayInput4Off', label: 'Set Overlay 4 off' },
            { id: 'OverlayInputAllOff', label: 'Set All Overlays off' },
            { id: 'OverlayInput1Zoom', label: 'Zoom PIP Overlay 1 to/from fulscreen' },
            { id: 'OverlayInput2Zoom', label: 'Zoom PIP Overlay 2 to/from fulscreen' },
            { id: 'OverlayInput3Zoom', label: 'Zoom PIP Overlay 3 to/from fulscreen' },
            { id: 'OverlayInput4Zoom', label: 'Zoom PIP Overlay 4 to/from fulscreen' }
          ]
        },
        options.input
      ],
      callback: sendBasicCommand
    }
  }
}
