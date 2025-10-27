import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { options } from '../utils'
import type VMixInstance from '../index'

type NextPictureOptions = {
  input: string
}

type PreviousPictureOptions = {
  input: string
}

type SelectIndexOptions = {
  input: string
  value: string
}

type AutoPlayFirstOptions = {
  input: string
  functionID: 'AutoPlayFirst' | 'AutoPlayFirstOn' | 'AutoPlayFirstOff'
}

type AutoPlayNextOptions = {
  input: string
  functionID: 'AutoPlayNext' | 'AutoPlayNextOn' | 'AutoPlayNextOff'
}

type ListShuffleOptions = {
  input: string
}

type NextPictureCallback = ActionCallback<'nextPicture', NextPictureOptions>
type PreviousPictureCallback = ActionCallback<'previousPicture', PreviousPictureOptions>
type SelectIndexCallback = ActionCallback<'selectIndex', SelectIndexOptions>
type AutoPlayFirstCallback = ActionCallback<'autoPlayFirst', AutoPlayFirstOptions>
type AutoPlayNextCallback = ActionCallback<'autoPlayNext', AutoPlayNextOptions>
type ListShuffleCallback = ActionCallback<'listShuffle', ListShuffleOptions>

export interface ListActions {
  nextPicture: VMixAction<NextPictureCallback>
  previousPicture: VMixAction<PreviousPictureCallback>
  selectIndex: VMixAction<SelectIndexCallback>
  autoPlayFirst: VMixAction<AutoPlayFirstCallback>
  autoPlayNext: VMixAction<AutoPlayNextCallback>
  listShuffle: VMixAction<ListShuffleCallback>

  [key: string]: VMixAction<any>
}

export type ListCallbacks = NextPictureCallback | PreviousPictureCallback | SelectIndexCallback | AutoPlayFirstCallback | AutoPlayNextCallback | ListShuffleCallback

export const vMixListActions = (_instance: VMixInstance, sendBasicCommand: SendBasicCommand): ListActions => {
  return {
    nextPicture: {
      name: 'Lists - Next Picture/Slide/Index',
      description: 'Selects next item in a List type input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    previousPicture: {
      name: 'Lists - Previous Picture/Slide/Index',
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
          useVariables: { local: true },
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
