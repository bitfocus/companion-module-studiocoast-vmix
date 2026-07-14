import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'

export type PlayListActionsSchema = {
  playListFunctions: CompanionActionSchema<{
    functionID: 'StartPlayList' | 'StopPlayList' | 'NextPlayListEntry' | 'PreviousPlayListEntry'
  }>
  selectPlayList: CompanionActionSchema<{
    value: string
  }>
}

export const getPlayListActions = (_instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<PlayListActionsSchema> => {
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
          disableAutoExpression: true,
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
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },
  }
}

export const vMixPlaylistFunctions: ActionFunctionsList<PlayListActionsSchema> = {
  playListFunctions: ['StartPlayList', 'StopPlayList', 'NextPlayListEntry', 'PreviousPlayListEntry'],
  selectPlayList: ['SelectPlayList'],
}
