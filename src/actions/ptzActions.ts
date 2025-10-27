import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { options } from '../utils'
import type VMixInstance from '../index'

type PTZMoveOptions = {
  input: string
  functionID:
    | 'PTZHome'
    | 'PTZMoveStop'
    | 'PTZMoveUp'
    | 'PTZMoveUpLeft'
    | 'PTZMoveUpRight'
    | 'PTZMoveLeft'
    | 'PTZMoveRight'
    | 'PTZMoveDown'
    | 'PTZMoveDownLeft'
    | 'PTZMoveDownRight'
    | 'PTZMoveToVirtualInputPosition'
    | 'PTZMoveToVirtualInputPositionByIndex'
  value?: string
}

type PTZFocusZoomOptions = {
  input: string
  value: string
}

type PTZVirtualInputOptions = {
  input: string
  functionID: 'PTZCreateVirtualInput' | 'PTZUpdateVirtualInput'
}

type PTZMoveCallback = ActionCallback<'ptzMove', PTZMoveOptions>
type PTZFocusZoomCallback = ActionCallback<'ptzFocusZoom', PTZFocusZoomOptions>
type PTZVirtualInputCallback = ActionCallback<'ptzVirtualInput', PTZVirtualInputOptions>

export interface PTZActions {
  ptzMove: VMixAction<PTZMoveCallback>
  ptzFocusZoom: VMixAction<PTZFocusZoomCallback>
  ptzVirtualInput: VMixAction<PTZVirtualInputCallback>

  [key: string]: VMixAction<any>
}

export type PTZCallbacks = PTZMoveCallback | PTZFocusZoomCallback | PTZVirtualInputCallback

export const vMixPTZActions = (_instance: VMixInstance, sendBasicCommand: SendBasicCommand): PTZActions => {
  return {
    ptzMove: {
      name: 'PTZ - Move',
      description: 'Control PTZ Input movement',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Move',
          id: 'functionID',
          default: 'PTZHome',
          choices: [
            { id: 'PTZHome', label: 'Home' },
            { id: 'PTZMoveStop', label: 'Stop' },
            { id: 'PTZMoveUp', label: 'Up' },
            { id: 'PTZMoveUpLeft', label: 'Up Left' },
            { id: 'PTZMoveUpRight', label: 'Up RIght' },
            { id: 'PTZMoveLeft', label: 'Left' },
            { id: 'PTZMoveRight', label: 'Right' },
            { id: 'PTZMoveDown', label: 'Down' },
            { id: 'PTZMoveDownLeft', label: 'Down Left' },
            { id: 'PTZMoveDownRight', label: 'Down Right' },
            {
              id: 'PTZMoveToVirtualInputPosition',
              label: 'Move to PTZ Virtual Input without selecting it into Preview',
            },
            {
              id: 'PTZMoveToVirtualInputPositionByIndex',
              label: 'Move to PTZ Virtual Input associated with this Input',
            },
          ],
        },
        {
          type: 'textinput',
          label: 'Value 0 to 1 (or for move to Virtual Input by Index, 0 to 100)',
          id: 'Value',
          default: '0',
          useVariables: { local: true },
          isVisible: (options) => {
            return options.functionID !== 'PTZHome' && options.functionID !== 'PTZMoveStop' && options.functionID !== 'PTZMoveToVirtualInputPosition'
          },
        },
      ],
      callback: sendBasicCommand,
    },

    ptzFocusZoom: {
      name: 'PTZ - Focus & Zoom',
      description: 'Control PTZ Input Focus and Zoom',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Move',
          id: 'functionID',
          default: 'PTZFocusAuto',
          choices: [
            { id: 'PTZFocusAuto', label: 'Focus Auto' },
            { id: 'PTZFocusFar', label: 'Focus Far' },
            { id: 'PTZFocusManual', label: 'Focus Manual' },
            { id: 'PTZFocusNear', label: 'Focus near' },
            { id: 'PTZFocusStop', label: 'Focus Stop' },
            { id: 'PTZZoomIn', label: 'Zoom In' },
            { id: 'PTZZoomOut', label: 'Zoom Out' },
            { id: 'PTZZoomStop', label: 'Zoom Stop' },
          ],
        },
        {
          type: 'textinput',
          label: 'Speed 0 to 1',
          id: 'Value',
          default: '1',
          useVariables: { local: true },
          isVisible: (options) => {
            return options.functionID !== 'PTZFocusAuto' && options.functionID !== 'PTZFocusManual' && options.functionID !== 'PTZFocusStop' && options.functionID !== 'PTZZoomStop'
          },
        },
      ],
      callback: sendBasicCommand,
    },

    ptzVirtualInput: {
      name: 'PTZ - Virtual Input Create/Update',
      description: 'Creates or Updates a PTZ Virtual Input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Create / Update',
          id: 'functionID',
          default: 'PTZCreateVirtualInput',
          choices: [
            { id: 'PTZCreateVirtualInput', label: 'Create' },
            { id: 'PTZUpdateVirtualInput', label: 'Update' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },
  }
}
