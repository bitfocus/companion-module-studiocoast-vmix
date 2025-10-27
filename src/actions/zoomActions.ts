import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { options } from '../utils'
import type VMixInstance from '../index'

type ZoomMuteSelfOptions = {
  input: string
  type: 'Mute' | 'Unmute'
}

type ZoomSelectParticipantByNameOptions = {
  input: string
  value: string
}

type ZoomJoinMeetingOptions = {
  input: string
  meetingID: string
  password: string
}

type ZoomMuteSelfCallback = ActionCallback<'zoomMuteSelf', ZoomMuteSelfOptions>
type ZoomSelectParticipantByNameCallback = ActionCallback<'zoomSelectParticipantByName', ZoomSelectParticipantByNameOptions>
type ZoomJoinMeetingCallback = ActionCallback<'zoomJoinMeeting', ZoomJoinMeetingOptions>

export interface ZoomActions {
  zoomMuteSelf: VMixAction<ZoomMuteSelfCallback>
  zoomSelectParticipantByName: VMixAction<ZoomSelectParticipantByNameCallback>
  zoomJoinMeeting: VMixAction<ZoomJoinMeetingCallback>

  [key: string]: VMixAction<any>
}

export type ZoomCallbacks = ZoomMuteSelfCallback | ZoomSelectParticipantByNameCallback

export const vMixZoomActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): ZoomActions => {
  return {
    zoomMuteSelf: {
      name: 'Zoom - Mute Self',
      description: 'Mute or Unmute the audio being sent to the Zoom Meeting input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Mute / Unmute',
          id: 'functionID',
          default: 'zoomMuteSelf',
          choices: [
            { id: 'zoomMuteSelf', label: 'Mute' },
            { id: 'zoomUnMuteSelf', label: 'Unmute' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    zoomSelectParticipantByName: {
      name: 'Zoom - Select Participant by Name',
      description: 'Selects a user in a Zoom Meeting',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Name',
          id: 'value',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: sendBasicCommand,
    },

    zoomJoinMeeting: {
      name: 'Zoom - Join Meeting',
      description: 'Joins a Meeting ID with specified Password',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Meeting ID',
          id: 'meetingID',
          default: '',
          useVariables: { local: true },
        },
        {
          type: 'textinput',
          label: 'Password',
          id: 'password',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        const meetingID = (await instance.parseOption(action.options.meetingID, context))[instance.buttonShift.state]
        const password = (await instance.parseOption(action.options.password, context))[instance.buttonShift.state]

        if (selected && meetingID && instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ZoomJoinMeeting Input=${selected}&Value=${meetingID},${password}`)
        }
      },
    },
  }
}
