import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import type VMixInstance from '../index'

type PlayListFunctionsOptions = {
  functionID: 'StartPlayList' | 'StopPlayList' | 'NextPlayListEntry' | 'PreviousPlayListEntry'
}

type SelectPlayListOptions = {
  value: string
}

type PlayListFunctionsCallback = ActionCallback<'playListFunctions', PlayListFunctionsOptions>
type SelectPlayListCallback = ActionCallback<'selectPlayList', SelectPlayListOptions>

export interface PlayListActions {
  playListFunctions: VMixAction<PlayListFunctionsCallback>
  selectPlayList: VMixAction<SelectPlayListCallback>

  [key: string]: VMixAction<any>
}

export type PlayListCallbacks = PlayListFunctionsCallback | SelectPlayListCallback

export const vMixPlayListActions = (_instance: VMixInstance, sendBasicCommand: SendBasicCommand): PlayListActions => {
  return {
    playListFunctions: {
      name: 'Playlist - Functions',
      description: "For vMix's Playlist function, not List inputs",
      options: [
        {
          type: 'dropdown',
          label: 'Playlist Function',
          id: 'functionID',
          default: 'StartPlayList',
          choices: [
            { id: 'StartPlayList', label: 'Start Play List' },
            { id: 'StopPlayList', label: 'Stop Play List' },
            { id: 'NextPlayListEntry', label: 'Next Item in Play List' },
            { id: 'PreviousPlayListEntry', label: 'Previous Item in Play List' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    selectPlayList: {
      name: 'Playlist - Open Playlist',
      description: "For vMix's Playlist function, not List inputs",
      options: [
        {
          type: 'textinput',
          label: 'Playlist name',
          id: 'value',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: sendBasicCommand,
    },
  }
}
