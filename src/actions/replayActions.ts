import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { type EmptyOptions, options } from '../utils.js'
import type VMixInstance from '../index.js'

export type ReplayActionsSchema = {
  replayACamera: CompanionActionSchema<{
    functionID: 'ReplayACamera1' | 'ReplayACamera2' | 'ReplayACamera3' | 'ReplayACamera4' | 'ReplayACamera5' | 'ReplayACamera6' | 'ReplayACamera7' | 'ReplayACamera8'
  }>
  replayBCamera: CompanionActionSchema<{
    functionID: 'ReplayBCamera1' | 'ReplayBCamera2' | 'ReplayBCamera3' | 'ReplayBCamera4' | 'ReplayBCamera5' | 'ReplayBCamera6' | 'ReplayBCamera7' | 'ReplayBCamera8'
  }>
  replayCCamera: CompanionActionSchema<{
    functionID: 'ReplayCCamera1' | 'ReplayCCamera2' | 'ReplayCCamera3' | 'ReplayCCamera4' | 'ReplayCCamera5' | 'ReplayCCamera6' | 'ReplayCCamera7' | 'ReplayCCamera8'
  }>
  replayDCamera: CompanionActionSchema<{
    functionID: 'ReplayDCamera1' | 'ReplayDCamera2' | 'ReplayDCamera3' | 'ReplayDCamera4' | 'ReplayDCamera5' | 'ReplayDCamera6' | 'ReplayDCamera7' | 'ReplayDCamera8'
  }>
  replayCamera: CompanionActionSchema<{
    functionID: 'ReplayCamera1' | 'ReplayCamera2' | 'ReplayCamera3' | 'ReplayCamera4' | 'ReplayCamera5' | 'ReplayCamera6' | 'ReplayCamera7' | 'ReplayCamera8'
  }>
  replayEventCamera: CompanionActionSchema<{
    functionID:
      | 'ReplaySelectedEventCameraOn'
      | 'ReplaySelectedEventCameraOff'
      | 'ReplaySelectedEventSingleCameraOn'
      | 'ReplayLastEventCameraOn'
      | 'ReplayLastEventCameraOff'
      | 'ReplayLastEventSingleCameraOn'
    value: number
  }>
  replaySelectChannel: CompanionActionSchema<{
    functionID: 'replaySelectChannelAB' | 'replaySelectChannelA' | 'replaySelectChannelB'
  }>
  replaySwapChannels: EmptyOptions
  replayMark: CompanionActionSchema<{
    functionID:
      | 'ReplayMarkCancel'
      | 'ReplayMarkIn'
      | 'ReplayMarkInLive'
      | 'ReplayMarkInOut'
      | 'ReplayMarkInOutLive'
      | 'ReplayMarkInOutLiveFuture'
      | 'ReplayMarkInOutRecorded'
      | 'ReplayMarkInRecorded'
      | 'ReplayMarkInRecordedNow'
      | 'ReplayMarkOut'
    value: string
    value2: string
  }>
  replayMoveInOut: CompanionActionSchema<{
    functionID: 'ReplayMoveSelectedInPoint' | 'ReplayMoveSelectedOutPoint'
    value: string
  }>
  replayUpdateInOut: CompanionActionSchema<{
    functionID: 'ReplayUpdateSelectedInPoint' | 'ReplayUpdateSelectedOutPoint'
  }>
  replaySelectEvents: CompanionActionSchema<{
    functionID:
      | 'ReplaySelectEvents1'
      | 'ReplaySelectEvents2'
      | 'ReplaySelectEvents3'
      | 'ReplaySelectEvents4'
      | 'ReplaySelectEvents5'
      | 'ReplaySelectEvents6'
      | 'ReplaySelectEvents7'
      | 'ReplaySelectEvents8'
      | 'ReplaySelectEvents9'
      | 'ReplaySelectEvents10'
      | 'ReplaySelectEvents11'
      | 'ReplaySelectEvents12'
      | 'ReplaySelectEvents13'
      | 'ReplaySelectEvents14'
      | 'ReplaySelectEvents15'
      | 'ReplaySelectEvents16'
      | 'ReplaySelectEvents17'
      | 'ReplaySelectEvents18'
      | 'ReplaySelectEvents19'
      | 'ReplaySelectEvents20'

    channel: ReplayChannel
  }>
  replayChangeDirection: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayChangeSpeed: CompanionActionSchema<{
    channel: ReplayChannel
    value: number
  }>
  replaySetAudioSource: CompanionActionSchema<{
    value: string
  }>
  replaySetSpeed: CompanionActionSchema<{
    channel: ReplayChannel
    value: string
    max: string
  }>
  replayUpdateSelectedSpeed: CompanionActionSchema<{
    functionID: 'ReplayUpdateSelectedSpeed' | 'ReplayUpdateSelectedSpeedDefault' | 'ReplayUpdateSelectedSpeedFromValue'
    channel: ReplayChannel
    value: number
  }>
  replayMoveEvent: CompanionActionSchema<{
    functionID: 'ReplayMoveLastEvent' | 'ReplayMoveSelectedEvent'
    value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  }>
  replayMoveEventUpDown: CompanionActionSchema<{
    functionID: 'ReplayMoveSelectedEventUp' | 'ReplayMoveSelectedEventDown'
  }>
  replaySelectEvent: CompanionActionSchema<{
    functionID: 'ReplaySelectFirstEvent' | 'ReplaySelectLastEvent' | 'ReplaySelectNextEvent' | 'ReplaySelectPreviousEvent'
    channel: ReplayChannel
  }>
  replayScrollSelectedEvent: CompanionActionSchema<{
    value: number
  }>
  replayCopyEvent: CompanionActionSchema<{
    functionID: 'ReplayCopyLastEvent' | 'ReplayCopySelectedEvent'
    value: number
  }>
  replayDeleteEvent: CompanionActionSchema<{
    functionID: 'ReplayDeleteLastEvent' | 'ReplayDeleteSelectedEvent'
    value: number
  }>
  replayDuplicateEvent: CompanionActionSchema<{
    functionID: 'ReplayDuplicateLastEvent' | 'ReplayDuplicateSelectedEvent'
    value: number
  }>
  replayExportLastEvent: EmptyOptions
  replayFastForwardBackward: CompanionActionSchema<{
    functionID: 'ReplayFastForward' | 'ReplayFastBackward'
    channel: ReplayChannel
    value: number
  }>
  replayJumpFrames: CompanionActionSchema<{
    channel: ReplayChannel
    value: string
  }>
  replayJumpFramesFast: CompanionActionSchema<{
    functionID: 'ReplayJumpFramesFastOn' | 'ReplayJumpFramesFastOff'
  }>
  replayJumpToNow: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayJumpToInOut: CompanionActionSchema<{
    functionID: 'ReplayJumpToSelectedInPoint' | 'ReplayJumpToSelectedOutPoint'
  }>
  replayRecording: CompanionActionSchema<{
    functionID: 'ReplayStartRecording' | 'ReplayStopRecording' | 'ReplayStartStopRecording'
  }>
  replayLive: CompanionActionSchema<{
    functionID: 'ReplayLive' | 'ReplayRecorded'
  }>
  replayLiveToggle: EmptyOptions
  replayPlay: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayPlayNextPrevious: CompanionActionSchema<{
    functionID: 'ReplayPlayNext' | 'ReplayPlayPrevious'
    channel: ReplayChannel
  }>
  replayPause: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayPlayPause: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayPlayForwardBackward: CompanionActionSchema<{
    functionID: 'Toggle' | 'ReplayPlayForward' | 'ReplayPlayBackward'
    channel: ReplayChannel
  }>
  replaySetDirection: CompanionActionSchema<{
    functionID: ''
    channel: ReplayChannel
  }>
  replayPlayEvent: CompanionActionSchema<{
    channel: ReplayChannel
    value: string
  }>
  replayPlayEventToOutput: CompanionActionSchema<{
    channel: ReplayChannel
    value: string
  }>
  replayPlaySelectedEvent: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayPlaySelectedEventToOutput: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayPlayEventsByID: CompanionActionSchema<{
    channel: ReplayChannel
    value: string
  }>
  replayPlayEventsByIDToOutput: CompanionActionSchema<{
    channel: ReplayChannel
    value: string
  }>
  replayPlayLastEvent: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayPlayLastEventToOutput: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayPlayAllEvents: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayPlayAllEventsToOutput: CompanionActionSchema<{
    channel: ReplayChannel
  }>
  replayStopEvents: EmptyOptions
  replayToggleLastEventCamera: CompanionActionSchema<{
    camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  }>
  replayToggleCamera: CompanionActionSchema<{
    camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  }>
  replayShowHide: EmptyOptions
  replayQuadMode: CompanionActionSchema<{
    functionID: 'ReplayToggleQuadMode' | 'ReplayQuadModeOn' | 'ReplayQuadModeOff'
  }>
  replayEventText: CompanionActionSchema<{
    type: 'Set' | 'Append'
    target: 'Last' | 'Selected'
    camera: string
    text: string
  }>
  replayEventTextClear: CompanionActionSchema<{
    target: 'Last' | 'Selected'
  }>
  replaySetTimecode: CompanionActionSchema<{
    functionID:
      | 'ReplaySetTimecode'
      | 'ReplaySetChannelAToBTimecode'
      | 'ReplaySetChannelAToBTimecodeAndCamera'
      | 'ReplaySetChannelBToATimecode'
      | 'ReplaySetChannelBToATimecodeAndCamera'
    channel: ReplayChannel
    value: string
  }>
}

type ReplayChannel = 'Current' | 'A' | 'B'

export const getReplayActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<ReplayActionsSchema> => {
  return {
    replayACamera: {
      name: 'Replay - A Camera',
      sortName: `Replay - Camera 1`,
      description: 'Select A camera',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayACamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayACamera${item}`, label: `Camera ${item}` })),
          expressionDescription: `Valid Values: 'ReplayACamera1' to 'ReplayACamera8'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayBCamera: {
      name: 'Replay - B Camera',
      sortName: `Replay - Camera 2`,
      description: 'Select B camera',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayBCamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayBCamera${item}`, label: `Camera ${item}` })),
          expressionDescription: `Valid Values: 'ReplayBCamera1' to 'ReplayBCamera8'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayCCamera: {
      name: 'Replay - C Camera',
      sortName: `Replay - Camera 3`,
      description: 'Select C camera',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayCCamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayCCamera${item}`, label: `Camera ${item}` })),
          expressionDescription: `Valid Values: 'ReplayCCamera1' to 'ReplayCCamera8'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayDCamera: {
      name: 'Replay - D Camera',
      sortName: `Replay - Camera 4`,
      description: 'Select D camera',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayDCamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayDCamera${item}`, label: `Camera ${item}` })),
          expressionDescription: `Valid Values: 'ReplayDCamera1' to 'ReplayDCamera8'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayCamera: {
      name: 'Replay - Selected Channel Camera',
      description: 'Select camera for current Channel',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayCamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayCamera${item}`, label: `Camera ${item}` })),
          expressionDescription: `Valid Values: 'ReplayCamera1' to 'ReplayCamera8'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayEventCamera: {
      name: 'Replay - Set camera On/Off on Selected / Last Event',
      description: 'Sets the camera states on the Selected / Last Event',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplaySelectedEventCameraOn',
          choices: [
            { id: 'ReplaySelectedEventCameraOn', label: 'Selected Event Camera On' },
            { id: 'ReplaySelectedEventCameraOff', label: 'Selected Event Camera Off' },
            { id: 'ReplaySelectedEventSingleCameraOn', label: 'Selected Event Single Camera On' },
            { id: 'ReplayLastEventCameraOn', label: 'Last Event Camera On' },
            { id: 'ReplayLastEventCameraOff', label: 'Last Event Camera Off' },
            { id: 'ReplayLastEventSingleCameraOn', label: 'Last Event Single Camera On' },
          ],
          expressionDescription: `Valid Values: 'ReplaySelectedEventCameraOn', 'ReplaySelectedEventCameraOff', or 'ReplaySelectedEventSingleCameraOn', 
					'ReplayLastEventCameraOn', 'ReplayLastEventCameraOff', or 'ReplayLastEventSingleCameraOn'`,
        },
        {
          type: 'number',
          label: 'Camera',
          description: 'Valid Values: 1 to 8',
          id: 'value',
          default: 1,
          min: 1,
          max: 8,
          step: 1,
          clampValues: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replaySelectChannel: {
      name: 'Replay - Select Channel',
      description: 'Select Replay camera channel',
      options: [
        {
          type: 'dropdown',
          label: 'Channel',
          id: 'functionID',
          default: 'replaySelectChannelAB',
          choices: ['replaySelectChannelAB', 'replaySelectChannelA', 'replaySelectChannelB'].map((item) => ({
            id: item,
            label: item.substr(19),
          })),
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replaySwapChannels: {
      name: 'Replay - Swap A and B channels',
      description: 'Swap cameras on A and B Channels',
      options: [],
      callback: sendBasicCommand,
    },

    replayMark: {
      name: 'Replay - Mark Functions',
      description: 'Mark In/Out functions',
      options: [
        {
          type: 'dropdown',
          label: 'Function',
          id: 'functionID',
          default: 'ReplayMarkIn',
          choices: [
            { id: 'ReplayMarkCancel', label: 'Cancel Mark' },
            { id: 'ReplayMarkIn', label: 'Mark In' },
            { id: 'ReplayMarkOut', label: 'Mark Out' },
            { id: 'ReplayMarkInLive', label: 'Mark In Live' },
            { id: 'ReplayMarkInOut', label: 'Mark In-Out' },
            { id: 'ReplayMarkInOutLive', label: 'Mark In-Out Live' },
            { id: 'ReplayMarkInOutLiveFuture', label: 'Mark In-Out Future' },
            { id: 'ReplayMarkInOutRecorded', label: 'Mark In-Out Recorded' },
            { id: 'ReplayMarkInRecorded', label: 'Mark In Recorded' },
            { id: 'ReplayMarkInRecordedNow', label: 'Mark In Recorded Now' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Seconds',
          description: 'Number of previous seconds to use when creating a new event',
          id: 'value',
          default: '10',
          useVariables: true,
          isVisibleExpression: `includes($(options:functionID), 'ReplayMarkInOut') && $(options:functionID) !== 'ReplayMarkInOutLiveFuture'`,
        },
        {
          type: 'textinput',
          label: 'Seconds',
          description: 'Number of seconds into the future to use when creating a new event',
          id: 'value2',
          default: '10',
          useVariables: true,
          isVisibleExpression: `$(options:functionID) === 'ReplayMarkInOutLiveFuture'`,
        },
      ],
      callback: async (action) => {
        const command: any = {
          id: 'replayMark',
          options: { functionID: action.options.functionID },
        }

        if (['ReplayMarkInOut', 'ReplayMarkInOutLive', 'ReplayMarkInOutRecorded'].includes(action.options.functionID)) {
          command.options.value = action.options.value
        }

        if (action.options.functionID === 'ReplayMarkInOutLiveFuture') {
          command.options.value = action.options.value2
        }

        return sendBasicCommand(command)
      },
    },

    replayMoveInOut: {
      name: 'Replay - Move Selected Event In/Out',
      description: 'Move in or out points for the selected Event',
      options: [
        {
          type: 'dropdown',
          label: 'In / Out',
          id: 'functionID',
          default: 'ReplayMoveSelectedInPoint',
          choices: [
            { id: 'ReplayMoveSelectedInPoint', label: 'Move In Point' },
            { id: 'ReplayMoveSelectedOutPoint', label: 'Move Out Point' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Frames',
          id: 'value',
          default: '30',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replayUpdateInOut: {
      name: 'Replay - Move Selected Event In/Out to Now',
      description: 'Move in or out points for the selected Event to Now',
      options: [
        {
          type: 'dropdown',
          label: 'In / Out',
          id: 'functionID',
          default: 'ReplayUpdateSelectedInPoint',
          choices: [
            { id: 'ReplayUpdateSelectedInPoint', label: 'Move In Point' },
            { id: 'ReplayUpdateSelectedOutPoint', label: 'Move Out Point' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replaySelectEvents: {
      name: 'Replay - Replay Select Events',
      description: 'Select a Replay Events tab',
      options: [
        {
          type: 'dropdown',
          label: 'Events',
          id: 'functionID',
          default: 'ReplaySelectEvents1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => ({
            id: `ReplaySelectEvents${item}`,
            label: `Events ${item}`,
          })),
          disableAutoExpression: true,
        },
        options.replayChannel,
      ],
      callback: sendBasicCommand,
    },

    replayChangeSpeed: {
      name: 'Replay - Change Speed',
      description: 'Change current Replay playback Speed by value',
      options: [
        options.replayChannel,
        {
          type: 'number',
          label: 'Change -1 to 1',
          id: 'value',
          default: 0.1,
          step: 0.01,
          min: -1,
          max: 1,
          clampValues: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replaySetAudioSource: {
      name: 'Replay - Set Audio Source',
      description: 'Sets the sudio source used for Replay',
      options: [
        {
          type: 'dropdown',
          label: 'Speed',
          id: 'value',
          default: 'Camera1',
          choices: [
            { id: 'Camera1', label: 'Camera 1' },
            { id: 'Camera2', label: 'Camera 2' },
            { id: 'Camera3', label: 'Camera 3' },
            { id: 'Camera4', label: 'Camera 4' },
            { id: 'Camera5', label: 'Camera 5' },
            { id: 'Camera6', label: 'Camera 6' },
            { id: 'Camera7', label: 'Camera 7' },
            { id: 'Camera8', label: 'Camera 8' },
            { id: 'Master', label: 'Master' },
            { id: 'Follow', label: 'Follow' },
          ],
          expressionDescription: `Valid Values: 'Camera1' to 'Camera8', 'Master', or 'Follow'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replaySetSpeed: {
      name: 'Replay - Set Speed',
      description: 'Set Replay playback Speed to a value',
      options: [
        options.replayChannel,
        {
          type: 'textinput',
          label: 'Speed',
          description: '0 to 1',
          id: 'value',
          default: '1',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Max Speed',
          description: 'If using a tbar, set this to the max value your tbar sends (eg, 255 for xkeys), otherwise leave at 1',
          id: 'max',
          default: '1',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        let value = parseFloat(action.options.value)
        const maxValue = parseFloat(action.options.max)

        if (isNaN(value)) {
          return instance.log('warn', `Replay - Set Speed - Invalid Speed ${action.options.value}`)
        }

        if (isNaN(maxValue) || maxValue < 0) {
          return instance.log('warn', `Replay - Set Speed - Invalid Max Speed ${action.options.value}`)
        }

        if (value > maxValue) value = maxValue
        if (value < 0) value = 0

        const position = value / maxValue

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ReplaySetSpeed Channel=${action.options.channel}&Value=${position}`)
        }
      },
    },

    replayUpdateSelectedSpeed: {
      name: 'Replay - Update Selected Event Speed',
      description: 'Updates the speed on the selected event to the current/default speed or a value',
      options: [
        {
          type: 'dropdown',
          label: 'Speed',
          id: 'functionID',
          default: 'ReplayUpdateSelectedSpeed',
          choices: [
            { id: 'ReplayUpdateSelectedSpeed', label: 'Current Speed' },
            { id: 'ReplayUpdateSelectedSpeedDefault', label: 'Default Speed' },
            { id: 'ReplayUpdateSelectedSpeedFromValue', label: 'From Value' },
          ],
          disableAutoExpression: true,
        },
        { ...options.replayChannel, isVisibleExpression: `$(options:functionID) === 'ReplayUpdateSelectedSpeedFromValue'` },
        {
          type: 'number',
          label: 'Seconds',
          description: 'Valid Values: 0 to 1',
          id: 'value',
          default: 1,
          min: 0,
          max: 1,
          step: 0.01,
          isVisibleExpression: `$(options:functionID) === 'ReplayUpdateSelectedSpeedFromValue'`,
        },
      ],
      callback: async (action) => {
        let command = action.options.functionID

        if (command === 'ReplayUpdateSelectedSpeedFromValue') {
          command += ` Channel=${action.options.channel}&Value=${action.options.value}`
        }

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${command}`)
        }
      },
    },

    replayMoveEvent: {
      name: 'Replay - Move event',
      description: 'Move an Event to a different Events tab',
      options: [
        {
          type: 'dropdown',
          label: 'Last/Selected',
          id: 'functionID',
          default: 'ReplayMoveLastEvent',
          choices: [
            { id: 'ReplayMoveLastEvent', label: 'Move Last' },
            { id: 'ReplayMoveSelectedEvent', label: 'Move Selected' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'dropdown',
          label: 'Destination',
          id: 'value',
          default: 0,
          choices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => ({
            id: item,
            label: `Events ${index + 1}`,
          })),
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replayMoveEventUpDown: {
      name: 'Replay - Move Selected Event Up/Down',
      description: 'Moves the position of an Event within the current Events Tab',
      options: [
        {
          type: 'dropdown',
          label: 'Direction',
          id: 'functionID',
          default: 'ReplayMoveSelectedEventUp',
          choices: [
            { id: 'ReplayMoveSelectedEventUp', label: 'Move Up' },
            { id: 'ReplayMoveSelectedEventDown', label: 'Move Down' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replaySelectEvent: {
      name: 'Replay - Select Event',
      description: 'Select a Replay Event',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplaySelectFirstEvent',
          choices: [
            { id: 'ReplaySelectFirstEvent', label: 'First Event' },
            { id: 'ReplaySelectLastEvent', label: 'Last Event' },
            { id: 'ReplaySelectNextEvent', label: 'Next Event' },
            { id: 'ReplaySelectPreviousEvent', label: 'Previous Event' },
            { id: 'ReplaySelectAllEvents', label: 'All Events' },
          ],
          expressionDescription: `Valid Values: 'ReplaySelectFirstEvent', 'ReplaySelectLastEvent', 'ReplaySelectNextEvent', 'ReplaySelectPreviousEvent', or 'ReplaySelectAllEvents'`,
        },
        options.replayChannel,
      ],
      callback: sendBasicCommand,
    },

    replayScrollSelectedEvent: {
      name: 'Replay - Scroll Selected Event',
      description: 'Scroll up/down through events by a set value',
      options: [
        {
          type: 'number',
          label: 'Value',
          id: 'value',
          default: 1,
          min: -10,
          max: 10,
          step: 1,
        },
      ],
      callback: sendBasicCommand,
    },

    replayCopyEvent: {
      name: 'Replay - Copy Event',
      description: 'Copy the Last or Selected Event to the specified Event List',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayCopyLastEvent',
          choices: [
            { id: 'ReplayCopyLastEvent', label: 'Last Event' },
            { id: 'ReplayCopySelectedEvent', label: 'Selected Event' },
          ],
          expressionDescription: `Valid Values: 'ReplayCopyLastEvent' or 'ReplayCopySelectedEvent'`,
        },
        {
          type: 'number',
          label: 'Event List',
          description: 'Valid Values: 1 to 20',
          id: 'value',
          default: 1,
          step: 1,
          min: 1,
          max: 20,
          clampValues: true,
        },
      ],
      callback: async (action) => {
        const value = action.options.value - 1
        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION ${action.options.functionID} Value=${value}`)
        }
      },
    },

    replayDeleteEvent: {
      name: 'Replay - Delete Event',
      description: 'Delete the Last or Selected Event',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayDeleteLastEvent',
          choices: [
            { id: 'ReplayDeleteLastEvent', label: 'Last Event' },
            { id: 'ReplayDeleteSelectedEvent', label: 'Selected Event' },
          ],
          expressionDescription: `Valid Values: 'ReplayDeleteLastEvent' or 'ReplayDeleteSelectedEvent'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayDuplicateEvent: {
      name: 'Replay - Duplicate Event',
      description: 'Duplicate the Last or Selected Event to the same Event List',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayDuplicateLastEvent',
          choices: [
            { id: 'ReplayDuplicateLastEvent', label: 'Last Event' },
            { id: 'ReplayDuplicateSelectedEvent', label: 'Selected Event' },
          ],
          expressionDescription: `Valid Values: 'ReplayDuplicateLastEvent' or 'ReplayDuplicateSelectedEvent'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayExportLastEvent: {
      name: 'Replay - Export last Event',
      description: 'Export the last Event in the currently selected List',
      options: [],
      callback: sendBasicCommand,
    },

    replayFastForwardBackward: {
      name: 'Replay - Fast Forward/Backward',
      description: 'Replay Fast Forward/Backward (1-30x speed)',
      options: [
        {
          type: 'dropdown',
          label: 'Direction',
          id: 'functionID',
          default: 'ReplayFastForward',
          choices: [
            { id: 'ReplayFastForward', label: 'Forward' },
            { id: 'ReplayFastBackward', label: 'Backward' },
          ],
          disableAutoExpression: true,
        },
        options.replayChannel,
        {
          type: 'number',
          label: 'Speed',
          description: '1 to 30',
          id: 'value',
          default: 10,
          min: 0,
          max: 30,
        },
      ],
      callback: sendBasicCommand,
    },

    replayJumpFrames: {
      name: 'Replay - Jump Frames',
      description: 'Jump a set amount of frames forward or backward',
      options: [
        options.replayChannel,
        {
          type: 'textinput',
          label: 'Frames',
          id: 'value',
          default: '60',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replayJumpFramesFast: {
      name: 'Replay - Jump Frames Fast On/Off',
      description: 'When set On Jump Frames will jump by seconds, when Off it will jump by frames',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayJumpFramesFastOn',
          choices: [
            { id: 'ReplayJumpFramesFastOn', label: 'On' },
            { id: 'ReplayJumpFramesFastOff', label: 'Off' },
          ],
          expressionDescription: `Valid Values: 'ReplayJumpFramesFastOn' or 'ReplayJumpFramesFastOff'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayJumpToNow: {
      name: 'Replay - Jump To Now',
      description: 'Jump replay to Now',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayJumpToInOut: {
      name: 'Replay - Jump to selected In/Out point',
      description: 'Jumps to the In or Out point of the currently selected Event',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayJumpToSelectedInPoint',
          choices: [
            { id: 'ReplayJumpToSelectedInPoint', label: 'On' },
            { id: 'ReplayJumpToSelectedOutPoint', label: 'Off' },
          ],
          expressionDescription: `Valid Values: 'ReplayJumpToSelectedInPoint' or 'ReplayJumpToSelectedOutPoint'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayRecording: {
      name: 'Replay - Recording Start/Stop/Toggle',
      description: 'Replay Recording control',
      options: [
        {
          type: 'dropdown',
          label: 'Recording',
          id: 'functionID',
          default: 'ReplayStartStopRecording',
          choices: [
            { id: 'ReplayStartRecording', label: 'Start' },
            { id: 'ReplayStopRecording', label: 'Stop' },
            { id: 'ReplayStartStopRecording', label: 'Toggle' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replayLive: {
      name: 'Replay - Live / Recorded',
      description: 'Sets the Live status On or Off',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayLive',
          choices: [
            { id: 'ReplayLive', label: 'On' },
            { id: 'ReplayRecorded', label: 'Off' },
          ],
          expressionDescription: `Valid Values: 'ReplayLive' or 'ReplayRecorded'`,
        },
      ],
      callback: sendBasicCommand,
    },

    replayLiveToggle: {
      name: 'Replay - Toggle Live',
      description: 'Toggle Replay Live',
      options: [],
      callback: sendBasicCommand,
    },

    replayPlay: {
      name: 'Replay - Play',
      description: 'Play Replay',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayNextPrevious: {
      name: 'Replay - Play Next / Previous',
      description: 'Plays the next or previous Replay Event',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'functionID',
          default: 'ReplayPlayNext',
          choices: [
            { id: 'ReplayPlayNext', label: 'On' },
            { id: 'ReplayPlayPrevious', label: 'Off' },
          ],
          expressionDescription: `Valid Values: 'ReplayPlayNext' or 'ReplayPlayPrevious'`,
        },
        options.replayChannel,
      ],
      callback: sendBasicCommand,
    },

    replayPause: {
      name: 'Replay - Pause',
      description: 'Pause Replay',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayPause: {
      name: 'Replay - Toggle Play / Pause',
      description: 'Toggles Playing / Pausing Replay',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayChangeDirection: {
      name: 'Replay - Toggle Change Direction',
      description: 'Change Replay playback Direction',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayForwardBackward: {
      name: 'Replay - Play Forward / Backward',
      description: 'Set Replay to play either forward or backward',
      options: [
        {
          type: 'dropdown',
          label: 'Direction',
          id: 'functionID',
          default: 'Toggle',
          choices: [
            { id: 'Toggle', label: 'Toggle' },
            { id: 'ReplayPlayForward', label: 'Forward' },
            { id: 'ReplayPlayBackward', label: 'Backward' },
          ],
          expressionDescription: `Valid Values: 'Toggle', 'ReplayPlayForward' or 'ReplayPlayBackward'`,
        },
        options.replayChannel,
      ],
      callback: async (action) => {
        let functionID = action.options.functionID
        if (functionID === 'Toggle') functionID = instance.data.replay.forward ? 'ReplayPlayBackward' : 'ReplayPlayForward'

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${functionID} Channel=${action.options.channel}`)
        }
      },
    },

    replaySetDirection: {
      name: 'Replay - Set Forward / Backward',
      description: 'Set Replay to either forward or backward without playing',
      options: [
        {
          type: 'dropdown',
          label: 'Direction',
          id: 'functionID',
          default: 'ReplaySetDirectionForward',
          choices: [
            { id: 'ReplaySetDirectionForward', label: 'Forward' },
            { id: 'ReplaySetDirectionBackward', label: 'Backward' },
          ],
          expressionDescription: `Valid Values: 'ReplaySetDirectionForward' or 'ReplaySetDirectionBackward'`,
        },
        options.replayChannel,
      ],
      callback: sendBasicCommand,
    },

    replayPlayEvent: {
      name: 'Replay - Play Event',
      description: 'Play an Event by Event Number (NOT event ID)',
      options: [
        options.replayChannel,
        {
          type: 'textinput',
          label: 'Event Number',
          description: '0 is the most recent event, 1 is the next oldest, and so on',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replayPlayEventToOutput: {
      name: 'Replay - Play Event to Output',
      description: 'Play an Event by Event Number (NOT event ID) to Program Output',
      options: [
        options.replayChannel,
        {
          type: 'textinput',
          label: 'Event Number',
          description: '0 is the most recent event, 1 is the next oldest, and so on',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replayPlaySelectedEvent: {
      name: 'Replay - Play Selected Event',
      description: 'Play Event currently Selected to Output',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlaySelectedEventToOutput: {
      name: 'Replay - Play Selected Event To Output',
      description: 'Play Event currently Selected to Output',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayEventsByID: {
      name: 'Replay - Play Events by ID',
      description: 'Play Events to Replay Input',
      options: [
        options.replayChannel,
        {
          type: 'textinput',
          label: 'Event IDs',
          description: 'Comma separated list of Event IDs',
          id: 'value',
          default: '0000',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replayPlayEventsByIDToOutput: {
      name: 'Replay - Play Events By ID To Output',
      description: 'Play events by ID to Program Output',
      options: [
        options.replayChannel,
        {
          type: 'textinput',
          label: 'Event ID',
          description: 'Comma separated list of Event IDs',
          id: 'value',
          default: '0000',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replayPlayLastEvent: {
      name: 'Replay - Play Last Event',
      description: 'Play last Event',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayLastEventToOutput: {
      name: 'Replay - Play Last Event to Output',
      description: 'Play last Event',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayAllEvents: {
      name: 'Replay - Play all Events',
      description: 'Play all Events in active list',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayAllEventsToOutput: {
      name: 'Replay - Play all Events to Output',
      description: 'Play all Events in active list',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayStopEvents: {
      name: 'Replay - Stop Events',
      description: 'Stop any currently playing events',
      options: [],
      callback: sendBasicCommand,
    },

    replayToggleLastEventCamera: {
      name: 'Replay - Toggle Last Event Camera',
      description: 'Toggles a camera view for the last Event',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'camera',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: item, label: `Camera ${item}` })),
          expressionDescription: `Valid Values: 1 to 8`,
        },
      ],
      callback: async (action) => {
        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ReplayToggleLastEventCamera${action.options.camera}`)
        return
      },
    },

    replayToggleCamera: {
      name: 'Replay - Toggle Selected Event Camera',
      description: 'Toggles a camera view for the selected Event',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'camera',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: item, label: `Camera ${item}` })),
          expressionDescription: `Valid Values: 1 to 8`,
        },
      ],
      callback: async (action) => {
        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ReplayToggleSelectedEventCamera${action.options.camera}`)
        return
      },
    },

    replayShowHide: {
      name: 'Replay - Show / Hide Replay',
      description: 'Shows or Hides the Replay window',
      options: [],
      callback: sendBasicCommand,
    },

    replayQuadMode: {
      name: 'Replay - Quad View',
      description: 'Sets Quad View state',
      options: [
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'ReplayToggleQuadMode',
          choices: [
            { id: 'ReplayQuadModeOn', label: 'On' },
            { id: 'ReplayQuadModeOff', label: 'Off' },
            { id: 'ReplayToggleQuadMode', label: 'Toggle' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    replayEventText: {
      name: 'Replay - Set/Append Event Text',
      description: 'Sets, or Appends, text to an Event',
      options: [
        {
          type: 'dropdown',
          label: 'Set / Append',
          id: 'type',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Append', label: 'Append' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'dropdown',
          label: 'Last Event / Selected Event',
          id: 'target',
          default: 'Last',
          choices: [
            { id: 'Last', label: 'Last' },
            { id: 'Selected', label: 'Selected' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Camera',
          description: '1 to 8, or Leave empty for default',
          id: 'camera',
          default: '',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Text',
          id: 'text',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const camera = parseInt(action.options.camera)

        const command = `Replay${action.options.type}${action.options.target}EventText`

        if (action.options.camera !== '') {
          if (isNaN(camera) || camera < 1 || camera > 8) {
            return instance.log('warn', `${camera} is not a valid Replay Camera`)
          } else {
            if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${command}Camera Value=${camera},${action.options.text}`)
          }
        } else {
          if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${command} Value=${action.options.text}`)
        }
      },
    },

    replayEventTextClear: {
      name: 'Replay - Clear Event Text',
      description: 'Clears all Event Text for the last or selected Event',
      options: [
        {
          type: 'dropdown',
          label: 'Last Event / Selected Event',
          id: 'target',
          default: 'Last',
          choices: [
            { id: 'Last', label: 'Last' },
            { id: 'Selected', label: 'Selected' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: async (action) => {
        const command = `ReplaySet${action.options.target}EventTextCamera`

        if (instance.tcp) {
          for (let i = 1; i < 9; i++) instance.tcp.sendCommand(`FUNCTION ${command} Value=${i},-`)
        }
      },
    },

    replaySetTimecode: {
      name: 'Replay - Set Timecode',
      description: 'Set a Timecode on a channel, or copy timecode from one channel to another',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplaySetTimecode',
          choices: [
            { id: 'ReplaySetTimecode', label: 'Set Timecode' },
            { id: 'ReplaySetChannelAToBTimecode', label: 'Set A Timecode to B Timecode' },
            { id: 'ReplaySetChannelAToBTimecodeAndCamera', label: 'Set A Timecode and Camera to B' },
            { id: 'ReplaySetChannelBToATimecode', label: 'Set B Timecode to A Timecode' },
            { id: 'ReplaySetChannelBToATimecodeAndCamera', label: 'Set B Timecode and Camera to A' },
          ],
          disableAutoExpression: true,
        },
        { ...options.replayChannel, isVisibleExpression: `$(options:functionID) === 'ReplaySetTimecode'` },
        {
          type: 'textinput',
          label: 'Timecode',
          description: 'Set position to Timecode in format yyyy-MM-ddTHH:mm:ss.fff',
          id: 'value',
          default: 'yyyy-MM-ddTHH:mm:ss.fff',
          useVariables: true,
          isVisibleExpression: `$(options:functionID) === 'ReplaySetTimecode'`,
        },
      ],
      callback: async (action) => {
        let command = action.options.functionID
        if (action.options.functionID === 'ReplaySetTimecode') {
          command += ` Channel=${action.options.channel}&Value=${action.options.value}`
        }

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${command}`)
        }
      },
    },
  }
}

export const vMixReplayFunctions: ActionFunctionsList<ReplayActionsSchema> = {
  replayACamera: ['ReplayACamera1', 'ReplayACamera2', 'ReplayACamera3', 'ReplayACamera4', 'ReplayACamera5', 'ReplayACamera6', 'ReplayACamera7', 'ReplayACamera8'],
  replayBCamera: ['ReplayBCamera1', 'ReplayBCamera2', 'ReplayBCamera3', 'ReplayBCamera4', 'ReplayBCamera5', 'ReplayBCamera6', 'ReplayBCamera7', 'ReplayBCamera8'],
  replayCCamera: ['ReplayCCamera1', 'ReplayCCamera2', 'ReplayCCamera3', 'ReplayCCamera4', 'ReplayCCamera5', 'ReplayCCamera6', 'ReplayCCamera7', 'ReplayCCamera8'],
  replayDCamera: ['ReplayDCamera1', 'ReplayDCamera2', 'ReplayDCamera3', 'ReplayDCamera4', 'ReplayDCamera5', 'ReplayDCamera6', 'ReplayDCamera7', 'ReplayDCamera8'],
  replayCamera: ['ReplayCamera1', 'ReplayCamera2', 'ReplayCamera3', 'ReplayCamera4', 'ReplayCamera5', 'ReplayCamera6', 'ReplayCamera7', 'ReplayCamera8'],
  replayEventCamera: [
    'ReplaySelectedEventCameraOn',
    'ReplaySelectedEventCameraOff',
    'ReplaySelectedEventSingleCameraOn',
    'ReplayLastEventCameraOn',
    'ReplayLastEventCameraOff',
    'ReplayLastEventSingleCameraOn',
  ],
  replaySelectChannel: ['ReplaySelectChannelAB', 'ReplaySelectChannelA', 'ReplaySelectChannelB'],
  replaySwapChannels: ['ReplaySwapChannels'],
  replayMark: [
    'ReplayMarkCancel',
    'ReplayMarkIn',
    'ReplayMarkInLive',
    'ReplayMarkInOut',
    'ReplayMarkInOutLive',
    'ReplayMarkInOutLiveFuture',
    'ReplayMarkInOutRecorded',
    'ReplayMarkInRecorded',
    'ReplayMarkInRecordedNow',
    'ReplayMarkOut',
  ],
  replayMoveInOut: ['ReplayMoveSelectedInPoint', 'ReplayMoveSelectedOutPoint'],
  replayUpdateInOut: ['ReplayUpdateSelectedInPoint', 'ReplayUpdateSelectedOutPoint'],
  replaySelectEvents: [
    'ReplaySelectEvents1',
    'ReplaySelectEvents2',
    'ReplaySelectEvents3',
    'ReplaySelectEvents4',
    'ReplaySelectEvents5',
    'ReplaySelectEvents6',
    'ReplaySelectEvents7',
    'ReplaySelectEvents8',
    'ReplaySelectEvents9',
    'ReplaySelectEvents10',
    'ReplaySelectEvents11',
    'ReplaySelectEvents12',
    'ReplaySelectEvents13',
    'ReplaySelectEvents14',
    'ReplaySelectEvents15',
    'ReplaySelectEvents16',
    'ReplaySelectEvents17',
    'ReplaySelectEvents18',
    'ReplaySelectEvents19',
    'ReplaySelectEvents20',
  ],
  replayChangeDirection: ['ReplayChangeDirection'],
  replayChangeSpeed: ['ReplayChangeSpeed'],
  replaySetAudioSource: ['ReplaySetAudioSource'],
  replaySetSpeed: ['ReplaySetSpeed', 'SetRateSlowMotion'],
  replayUpdateSelectedSpeed: ['ReplayUpdateSelectedSpeed', 'ReplayUpdateSelectedSpeedDefault', 'ReplayUpdateSelectedSpeedFromValue'],
  replayMoveEvent: ['ReplayMoveLastEvent', 'ReplayMoveSelectedEvent'],
  replayMoveEventUpDown: ['ReplayMoveSelectedEventUp', 'ReplayMoveSelectedEventDown'],
  replaySelectEvent: ['ReplaySelectFirstEvent', 'ReplaySelectLastEvent', 'ReplaySelectNextEvent', 'ReplaySelectPreviousEvent', 'ReplaySelectAllEvents'],
  replayScrollSelectedEvent: ['ReplayScrollSelectedEvent'],
  replayCopyEvent: ['ReplayCopyLastEvent', 'ReplayCopySelectedEvent'],
  replayDeleteEvent: ['ReplayDeleteLastEvent', 'ReplayDeleteSelectedEvent'],
  replayDuplicateEvent: ['ReplayDuplicateLastEvent', 'ReplayDuplicateSelectedEvent'],
  replayExportLastEvent: ['ReplayExportLastEvent'],
  replayFastForwardBackward: ['ReplayFastForward', 'ReplayFastBackward'],
  replayJumpFrames: ['ReplayJumpFrames'],
  replayJumpFramesFast: ['ReplayJumpFramesFastOn', 'ReplayJumpFramesFastOff'],
  replayJumpToNow: ['ReplayJumpToNow'],
  replayJumpToInOut: ['ReplayJumpToSelectedInPoint', 'ReplayJumpToSelectedOutPoint'],
  replayRecording: ['ReplayStartRecording', 'ReplayStopRecording', 'ReplayStartStopRecording'],
  replayLive: ['ReplayLive', 'ReplayRecorded'],
  replayLiveToggle: ['ReplayLiveToggle'],
  replayPlay: ['ReplayPlay'],
  replayPlayNextPrevious: ['ReplayPlayNext', 'ReplayPlayPrevious'],
  replayPause: ['ReplayPause'],
  replayPlayPause: ['ReplayPlayPause'],
  replayPlayForwardBackward: ['ReplayPlayForward', 'ReplayPlayBackward'],
  replaySetDirection: ['ReplaySetDirectionForward', 'ReplaySetDirectionBackward'],
  replayPlayEvent: ['ReplayPlayEvent'],
  replayPlayEventToOutput: ['ReplayPlayEventToOutput'],
  replayPlaySelectedEvent: ['ReplayPlaySelectedEvent'],
  replayPlaySelectedEventToOutput: ['ReplayPlaySelectedEventToOutput'],
  replayPlayEventsByID: ['ReplayPlayEventsByID'],
  replayPlayEventsByIDToOutput: ['ReplayPlayEventsByIDToOutput'],
  replayPlayLastEvent: ['ReplayPlayLastEvent'],
  replayPlayLastEventToOutput: ['ReplayPlayLastEventToOutput'],
  replayPlayAllEvents: ['ReplayPlayAllEvents'],
  replayPlayAllEventsToOutput: ['ReplayPlayAllEventsToOutput'],
  replayStopEvents: ['ReplayStopEvents'],
  replayToggleLastEventCamera: [
    'ReplayToggleLastEventCamera1',
    'ReplayToggleLastEventCamera2',
    'ReplayToggleLastEventCamera3',
    'ReplayToggleLastEventCamera4',
    'ReplayToggleLastEventCamera5',
    'ReplayToggleLastEventCamera6',
    'ReplayToggleLastEventCamera7',
    'ReplayToggleLastEventCamera8',
  ],
  replayToggleCamera: [
    'ReplayToggleSelectedEventCamera1',
    'ReplayToggleSelectedEventCamera2',
    'ReplayToggleSelectedEventCamera3',
    'ReplayToggleSelectedEventCamera4',
    'ReplayToggleSelectedEventCamera5',
    'ReplayToggleSelectedEventCamera6',
    'ReplayToggleSelectedEventCamera7',
    'ReplayToggleSelectedEventCamera8',
  ],
  replayShowHide: ['ReplayShowHide'],
  replayQuadMode: ['ReplayToggleQuadMode', 'ReplayQuadModeOn', 'ReplayQuadModeOff'],
  replayEventText: [
    'ReplaySetLastEventText',
    'ReplaySetLastEventTextCamera',
    'ReplaySetSelectedEventText',
    'ReplaySetSelectedEventTextCamera',
    'ReplayAppendLastEventText',
    'ReplayAppendLastEventTextCamera',
    'ReplayAppendSelectedEventText',
    'ReplayAppendSelectedEventTextCamera',
  ],
  replayEventTextClear: [],
  replaySetTimecode: [
    'ReplaySetTimecode',
    'ReplaySetChannelAToBTimecode',
    'ReplaySetChannelAToBTimecodeAndCamera',
    'ReplaySetChannelBToATimecode',
    'ReplaySetChannelBToATimecodeAndCamera',
  ],
}
