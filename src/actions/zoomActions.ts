import { VMixAction, ActionCallback } from './actions'
import { options } from '../utils'
import VMixInstance from '../index'

type ZoomMuteSelfOptions = {
  input: string
  type: 'Mute' | 'Unmute'
}

type ZoomSelectParticipantByNameOptions = {
  input: string
  value: string
}

type ZoomMuteSelfCallback = ActionCallback<'zoomMuteSelf', ZoomMuteSelfOptions>
type ZoomSelectParticipantByNameCallback = ActionCallback<
  'zoomSelectParticipantByName',
  ZoomSelectParticipantByNameOptions
>

export interface ZoomActions {
  zoomMuteSelf: VMixAction<ZoomMuteSelfCallback>
  zoomSelectParticipantByName: VMixAction<ZoomSelectParticipantByNameCallback>
}

export type ZoomCallbacks = ZoomMuteSelfCallback | ZoomSelectParticipantByNameCallback

export const vMixZoomActions = (
  _instance: VMixInstance,
  sendBasicCommand: (action: Readonly<ZoomCallbacks>) => Promise<void>
): ZoomActions => {
  return {
    zoomMuteSelf: {
      name: 'Zoom - Mute Self',
      description: '',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Mute / Unmute',
          id: 'functionID',
          default: 'zoomMuteSelf',
          choices: [
            { id: 'zoomMuteSelf', label: 'Mute' },
            { id: 'zoomUnMuteSelf', label: 'Unmute' }
          ]
        }
      ],
      callback: sendBasicCommand
    },

    zoomSelectParticipantByName: {
      name: 'Zoom - Select Participant by Name',
      description: '',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Name',
          id: 'value',
          default: '',
          useVariables: true
        }
      ],
      callback: sendBasicCommand
    }
  }
}
