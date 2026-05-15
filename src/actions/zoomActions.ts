import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type ZoomActionsSchema = {
  zoomMuteSelf: CompanionActionSchema<{
    input: string
    functionID: 'zoomMuteSelf' | 'zoomUnMuteSelf'
  }>
  zoomSelectParticipantByName: CompanionActionSchema<{
    input: string
    value: string
  }>
  zoomJoinMeeting: CompanionActionSchema<{
    input: string
    meetingID: string
    password: string
  }>
}

export const getZoomActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<ZoomActionsSchema> => {
  return {
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
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Password',
          id: 'password',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        if (!action.options.meetingID) {
          instance.log('warn', `Zoom - Join Meeting error - Missing Meeting ID`)
          return
        } else if (action.options.input && instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ZoomJoinMeeting Input=${action.options.input}&Value=${action.options.meetingID},${action.options.password}`)
        }
      },
    },

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
          disableAutoExpression: true,
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
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },
  }
}

export const vMixZoomFunctions: ActionFunctionsList<ZoomActionsSchema> = {
  zoomMuteSelf: ['ZoomMuteSelf', 'ZoomUnMuteSelf'],
  zoomSelectParticipantByName: ['ZoomSelectParticipantByName'],
  zoomJoinMeeting: ['ZoomJoinMeeting'],
}
