import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type PTZActionsSchema = {
  ptzMove: CompanionActionSchema<{
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
    value: string
  }>
  ptzFocusZoom: CompanionActionSchema<{
    input: string
    functionID: 'PTZFocusAuto' | 'PTZFocusFar' | 'PTZFocusManual' | 'PTZFocusNear' | 'PTZFocusStop' | 'PTZZoomIn' | 'PTZZoomOut' | 'PTZZoomStop'
    value: string
  }>
  ptzVirtualInput: CompanionActionSchema<{
    input: string
    functionID: 'PTZCreateVirtualInput' | 'PTZUpdateVirtualInput'
  }>
}

export const getPTZActions = (_instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<PTZActionsSchema> => {
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
            { id: 'PTZMoveToVirtualInputPosition', label: 'Move to PTZ Virtual Input without selecting it into Preview' },
            { id: 'PTZMoveToVirtualInputPositionByIndex', label: 'Move to PTZ Virtual Input associated with this Input' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Value 0 to 1 (or for move to Virtual Input by Index, 0 to 100)',
          id: 'value',
          default: '0',
          useVariables: true,
          isVisibleExpression: `!arrayIncludes(['PTZHome', 'PTZMoveStop', 'PTZMoveToVirtualInputPosition'], $(options:functionID))`,
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
          label: 'Focus / Zoom',
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
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Speed 0 to 1',
          id: 'value',
          default: '1',
          useVariables: true,
          isVisibleExpression: `!arrayIncludes(['PTZFocusAuto', 'PTZFocusManual', 'PTZFocusStop', 'PTZZoomStop'], $(options:functionID))`,
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
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },
  }
}

export const vMixPTZFunctions = {
  ptzMove: [
    'PTZHome',
    'PTZMoveStop',
    'PTZMoveUp',
    'PTZMoveUpLeft',
    'PTZMoveUpRight',
    'PTZMoveLeft',
    'PTZMoveRight',
    'PTZMoveDown',
    'PTZMoveDownLeft',
    'PTZMoveDownRight',
    'PTZMoveToVirtualInputPosition',
    'PTZMoveToVirtualInputPositionByIndex',
  ],
  ptzFocusZoom: ['PTZFocusAuto', 'PTZFocusFar', 'PTZFocusManual', 'PTZFocusNear', 'PTZFocusStop', 'PTZZoomIn', 'PTZZoomOut', 'PTZZoomStop'],
  ptzVirtualInput: ['PTZCreateVirtualInput', 'PTZUpdateVirtualInput'],
}
