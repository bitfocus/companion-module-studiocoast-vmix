import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type ListActionsSchema = {
  nextPicture: CompanionActionSchema<{
    input: string
  }>
  previousPicture: CompanionActionSchema<{
    input: string
  }>
  nextItem: CompanionActionSchema<{
    input: string
  }>
  previousItem: CompanionActionSchema<{
    input: string
  }>
  selectIndex: CompanionActionSchema<{
    input: string
    value: string
  }>
  autoPlayFirst: CompanionActionSchema<{
    input: string
    functionID: 'AutoPlayFirst' | 'AutoPlayFirstOn' | 'AutoPlayFirstOff'
  }>
  autoPlayNext: CompanionActionSchema<{
    input: string
    functionID: 'AutoPlayNext' | 'AutoPlayNextOn' | 'AutoPlayNextOff'
  }>
  listShuffle: CompanionActionSchema<{
    input: string
  }>
  listAdd: CompanionActionSchema<{
    input: string
    value: string
  }>
  listRemove: CompanionActionSchema<{
    input: string
    value: string
  }>
  listRemoveAll: CompanionActionSchema<{
    input: string
  }>
  listExport: CompanionActionSchema<{
    input: string
    value: string
  }>
  listShowHide: CompanionActionSchema<{
    input: string
  }>
  listPlayOut: CompanionActionSchema<{
    input: string
  }>
}

export const getListActions = (_instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<ListActionsSchema> => {
  return {
    nextPicture: {
      name: 'Lists - Next Picture/Slide',
      description: 'Selects next item in a Photo or Powerpoint type input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    previousPicture: {
      name: 'Lists - Previous Picture/Slide',
      description: 'Selects previous item in a Photo or Powerpoint type input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    nextItem: {
      name: 'Lists - Next List item',
      description: 'Selects next item in a List type input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    previousItem: {
      name: 'Lists - Previous List item',
      description: 'Selects previous item in a List type input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    selectIndex: {
      name: 'Lists - Select Specific Picture/Slide/Index',
      description: 'Selects specific item in a List type input',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Select Index',
          id: 'value',
          default: '1',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    autoPlayFirst: {
      name: 'Lists - Auto Play First',
      description: 'Toggle/On/Off automatically playing first item in a List with Transition',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Options',
          id: 'functionID',
          default: 'AutoPlayFirst',
          choices: [
            { id: 'AutoPlayFirst', label: 'Toggle' },
            { id: 'AutoPlayFirstOn', label: 'On' },
            { id: 'AutoPlayFirstOff', label: 'Off' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    autoPlayNext: {
      name: 'Lists - Auto Play Next',
      description: 'Toggle/On/Off automatically playing next item in a List',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Options',
          id: 'functionID',
          default: 'AutoPlayNext',
          choices: [
            { id: 'AutoPlayNext', label: 'Toggle' },
            { id: 'AutoPlayNextOn', label: 'On' },
            { id: 'AutoPlayNextOff', label: 'Off' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    listShuffle: {
      name: 'Lists - Shuffle List',
      description: 'Shuffles the items in a List',
      options: [options.input],
      callback: sendBasicCommand,
    },

    listAdd: {
      name: 'List - Add item to List',
      description: 'Add Filename to List',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Filename',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    listRemove: {
      name: 'List - Remove item from List',
      description: 'Remove an item from a List',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Index',
          description: 'Index value starting from 1',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    listRemoveAll: {
      name: 'List - Remove all items from List',
      description: 'Removes all items from a List Input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    listExport: {
      name: 'List - Export List',
      description: 'Export List as M3U to Filename',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Filename',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    listShowHide: {
      name: 'List - Show/Hide List',
      description: 'Shows or Hides a List within the vMix UI',
      options: [options.input],
      callback: sendBasicCommand,
    },

    listPlayOut: {
      name: 'List - Play Out Highlighted item',
      description: 'Plays Out the Highlighted item (note, this may differ from the currently selected item in a List)',
      options: [options.input],
      callback: sendBasicCommand,
    },
  }
}

export const vMixListFunctions: ActionFunctionsList<ListActionsSchema> = {
  nextPicture: ['NextPicture'],
  previousPicture: ['PreviousPicture'],
  nextItem: ['NextItem'],
  previousItem: ['PreviousItem'],
  selectIndex: ['SelectIndex'],
  autoPlayFirst: ['AutoPlayFirst', 'AutoPlayFirstOn', 'AutoPlayFirstOff'],
  autoPlayNext: ['AutoPlayNext', 'AutoPlayNextOn', 'AutoPlayNextOff'],
  listShuffle: ['ListShuffle'],
  listAdd: ['ListAdd'],
  listRemove: ['ListRemove'],
  listRemoveAll: ['ListRemoveAll'],
  listExport: ['ListExport'],
  listShowHide: ['ListShowHide'],
  listPlayOut: ['ListPlayOut'],
}
