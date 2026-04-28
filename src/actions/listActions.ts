import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
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
  }
}
