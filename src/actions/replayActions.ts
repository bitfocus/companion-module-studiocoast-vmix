import { VMixAction, ActionCallback } from './actions'
import { EmptyOptions, options } from '../utils'
import VMixInstance from '../index'

type ReplayChannel = 'Current' | 'A' | 'B'

type ReplayACameraOptions = {
  functionID: 'ReplayACamera1' | 'ReplayACamera2' | 'ReplayACamera3' | 'ReplayACamera4' | 'ReplayACamera5' | 'ReplayACamera6' | 'ReplayACamera7' | 'ReplayACamera8'
}

type ReplayBCameraOptions = {
  functionID: 'ReplayBCamera1' | 'ReplayBCamera2' | 'ReplayBCamera3' | 'ReplayBCamera4' | 'ReplayBCamera5' | 'ReplayBCamera6' | 'ReplayBCamera7' | 'ReplayBCamera8'
}

type ReplayCameraOptions = {
  functionID: 'ReplayCamera1' | 'ReplayCamera2' | 'ReplayCamera3' | 'ReplayCamera4' | 'ReplayCamera5' | 'ReplayCamera6' | 'ReplayCamera7' | 'ReplayCamera8'
}

type ReplaySelectChannelOptions = {
  functionID: 'replaySelectChannelAB' | 'replaySelectChannelA' | 'replaySelectChannelB'
}

type ReplaySwapChannelsOptions = EmptyOptions

type ReplayMarkOptions = {
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
}

type ReplayMoveInOutOptions = {
  functionID: 'ReplayMoveSelectedInPoint' | 'ReplayMoveSelectedOutPoint'
  value: string
}

type ReplayUpdateInOutOptions = {
  functionID: 'ReplayUpdateSelectedInPoint' | 'ReplayUpdateSelectedOutPoint'
}

type ReplaySelectEventsOptions = {
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
}

type ReplayChangeDirectionOptions = {
  channel: ReplayChannel
}

type ReplayChangeSpeedOptions = {
  channel: ReplayChannel
  value: number
}

type ReplaySetSpeedOptions = {
  channel: ReplayChannel
  value: string
  max: string
}

type ReplayMoveEventOptions = {
  functionID: 'ReplayMoveLastEvent' | 'ReplayMoveSelectedEvent'
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
}

type ReplayMoveEventUpDownOptions = {
  functionID: 'ReplayMoveSelectedEventUp' | 'ReplayMoveSelectedEventDown'
}

type ReplayFastForwardBackwardOptions = {
  functionID: 'ReplayFastForward' | 'ReplayFastBackward'
  channel: ReplayChannel
  value: number
}

type ReplayJumpFramesOptions = {
  channel: ReplayChannel
  value: string
}

type ReplayRecordingOptions = {
  functionID: 'ReplayStartRecording' | 'ReplayStopRecording' | 'ReplayStartStopRecording'
}

type ReplayJumpToNowOptions = {
  channel: ReplayChannel
}

type ReplayLiveToggleOptions = EmptyOptions

type ReplayPlayOptions = {
  channel: ReplayChannel
}

type ReplayPauseOptions = {
  channel: ReplayChannel
}

type ReplayPlayEventOptions = {
  channel: ReplayChannel
  value: number
}

type ReplayPlaySelectedEventToOutputOptions = {
  channel: ReplayChannel
}

type ReplayPlayEventsByIDToOutputOptions = {
  channel: ReplayChannel
  value: number
}

type ReplayPlayLastEventToOutputOptions = {
  channel: ReplayChannel
}

type ReplayPlayAllEventsToOutputOptions = {
  channel: ReplayChannel
}

type ReplayStopEventsOptions = EmptyOptions

type ReplayToggleCameraOptions = {
  camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

type ReplayShowHideOptions = EmptyOptions

type ReplayACameraCallback = ActionCallback<'replayACamera', ReplayACameraOptions>
type ReplayBCameraCallback = ActionCallback<'replayBCamera', ReplayBCameraOptions>
type ReplayCameraCallback = ActionCallback<'replayCamera', ReplayCameraOptions>
type ReplaySelectChannelCallback = ActionCallback<'replaySelectChannel', ReplaySelectChannelOptions>
type ReplaySwapChannelsCallback = ActionCallback<'replaySwapChannels', ReplaySwapChannelsOptions>
type ReplayMarkCallback = ActionCallback<'replayMark', ReplayMarkOptions>
type ReplayMoveInOutCallback = ActionCallback<'replayMoveInOut', ReplayMoveInOutOptions>
type ReplayUpdateInOutCallback = ActionCallback<'replayUpdateInOut', ReplayUpdateInOutOptions>
type ReplaySelectEventsCallback = ActionCallback<'replaySelectEvents', ReplaySelectEventsOptions>
type ReplayChangeDirectionCallback = ActionCallback<'replayChangeDirection', ReplayChangeDirectionOptions>
type ReplayChangeSpeedCallback = ActionCallback<'replayChangeSpeed', ReplayChangeSpeedOptions>
type ReplaySetSpeedCallback = ActionCallback<'replaySetSpeed', ReplaySetSpeedOptions>
type ReplayMoveEventCallback = ActionCallback<'replayMoveEvent', ReplayMoveEventOptions>
type ReplayMoveEventUpDownCallback = ActionCallback<'replayMoveEventUpDown', ReplayMoveEventUpDownOptions>
type ReplayFastForwardBackwardCallback = ActionCallback<'replayFastForwardBackward', ReplayFastForwardBackwardOptions>
type ReplayJumpFramesCallback = ActionCallback<'replayJumpFrames', ReplayJumpFramesOptions>
type ReplayRecordingCallback = ActionCallback<'replayRecording', ReplayRecordingOptions>
type ReplayJumpToNowCallback = ActionCallback<'replayJumpToNow', ReplayJumpToNowOptions>
type ReplayLiveToggleCallback = ActionCallback<'replayLiveToggle', ReplayLiveToggleOptions>
type ReplayPlayCallback = ActionCallback<'replayPlay', ReplayPlayOptions>
type ReplayPauseCallback = ActionCallback<'replayPause', ReplayPauseOptions>
type ReplayPlayEventCallback = ActionCallback<'replayPlayEvent', ReplayPlayEventOptions>
type ReplayPlaySelectedEventToOutputCallback = ActionCallback<'replayPlaySelectedEventToOutput', ReplayPlaySelectedEventToOutputOptions>
type ReplayPlayEventsByIDToOutputCallback = ActionCallback<'replayPlayEventsByIDToOutput', ReplayPlayEventsByIDToOutputOptions>
type ReplayPlayLastEventToOutputCallback = ActionCallback<'replayPlayLastEventToOutput', ReplayPlayLastEventToOutputOptions>
type ReplayPlayAllEventsToOutputCallback = ActionCallback<'replayPlayAllEventsToOutput', ReplayPlayAllEventsToOutputOptions>
type ReplayStopEventsCallback = ActionCallback<'replayStopEvents', ReplayStopEventsOptions>
type ReplayToggleCameraCallback = ActionCallback<'replayToggleCamera', ReplayToggleCameraOptions>
type ReplayShowHideCallback = ActionCallback<'replayShowHide', ReplayShowHideOptions>

export interface ReplayActions {
  replayACamera: VMixAction<ReplayACameraCallback>
  replayBCamera: VMixAction<ReplayBCameraCallback>
  replayCamera: VMixAction<ReplayCameraCallback>
  replaySelectChannel: VMixAction<ReplaySelectChannelCallback>
  replaySwapChannels: VMixAction<ReplaySwapChannelsCallback>
  replayMark: VMixAction<ReplayMarkCallback>
  replayMoveInOut: VMixAction<ReplayMoveInOutCallback>
  replayUpdateInOut: VMixAction<ReplayUpdateInOutCallback>
  replaySelectEvents: VMixAction<ReplaySelectEventsCallback>
  replayChangeDirection: VMixAction<ReplayChangeDirectionCallback>
  replayChangeSpeed: VMixAction<ReplayChangeSpeedCallback>
  replaySetSpeed: VMixAction<ReplaySetSpeedCallback>
  replayMoveEvent: VMixAction<ReplayMoveEventCallback>
  replayMoveEventUpDown: VMixAction<ReplayMoveEventUpDownCallback>
  replayFastForwardBackward: VMixAction<ReplayFastForwardBackwardCallback>
  replayJumpFrames: VMixAction<ReplayJumpFramesCallback>
  replayRecording: VMixAction<ReplayRecordingCallback>
  replayJumpToNow: VMixAction<ReplayJumpToNowCallback>
  replayLiveToggle: VMixAction<ReplayLiveToggleCallback>
  replayPlay: VMixAction<ReplayPlayCallback>
  replayPause: VMixAction<ReplayPauseCallback>
  replayPlayEvent: VMixAction<ReplayPlayEventCallback>
  replayPlaySelectedEventToOutput: VMixAction<ReplayPlaySelectedEventToOutputCallback>
  replayPlayEventsByIDToOutput: VMixAction<ReplayPlayEventsByIDToOutputCallback>
  replayPlayLastEventToOutput: VMixAction<ReplayPlayLastEventToOutputCallback>
  replayPlayAllEventsToOutput: VMixAction<ReplayPlayAllEventsToOutputCallback>
  replayStopEvents: VMixAction<ReplayStopEventsCallback>
  replayToggleCamera: VMixAction<ReplayToggleCameraCallback>
  replayShowHide: VMixAction<ReplayShowHideCallback>

  [key: string]: VMixAction<any>
}

export type ReplayCallbacks =
  | ReplayACameraCallback
  | ReplayBCameraCallback
  | ReplayCameraCallback
  | ReplaySelectChannelCallback
  | ReplaySwapChannelsCallback
  | ReplayMarkCallback
  | ReplayMoveInOutCallback
  | ReplayUpdateInOutCallback
  | ReplaySelectEventsCallback
  | ReplayChangeDirectionCallback
  | ReplayChangeSpeedCallback
  | ReplaySetSpeedCallback
  | ReplayMoveEventCallback
  | ReplayMoveEventUpDownCallback
  | ReplayFastForwardBackwardCallback
  | ReplayJumpFramesCallback
  | ReplayRecordingCallback
  | ReplayJumpToNowCallback
  | ReplayLiveToggleCallback
  | ReplayPlayCallback
  | ReplayPauseCallback
  | ReplayPlayEventCallback
  | ReplayPlaySelectedEventToOutputCallback
  | ReplayPlayEventsByIDToOutputCallback
  | ReplayPlayLastEventToOutputCallback
  | ReplayPlayAllEventsToOutputCallback
  | ReplayStopEventsCallback
  | ReplayToggleCameraCallback
  | ReplayShowHideCallback

export const vMixReplayActions = (instance: VMixInstance, sendBasicCommand: (action: Readonly<ReplayCallbacks>) => Promise<void>): ReplayActions => {
  return {
    replayACamera: {
      name: 'Replay - A Camera',
      description: 'Select A camera',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayACamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayACamera${item}`, label: `Camera ${item}` }))
        }
      ],
      callback: sendBasicCommand
    },

    replayBCamera: {
      name: 'Replay - B Camera',
      description: 'Select B camera',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayBCamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayBCamera${item}`, label: `Camera ${item}` }))
        }
      ],
      callback: sendBasicCommand
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
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayCamera${item}`, label: `Camera ${item}` }))
        }
      ],
      callback: sendBasicCommand
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
            label: item.substr(19)
          }))
        }
      ],
      callback: sendBasicCommand
    },

    replaySwapChannels: {
      name: 'Replay - Swap A and B channels',
      description: 'Swap cameras on A and B Channels',
      options: [],
      callback: sendBasicCommand
    },

    replayMark: {
      name: 'Replay - Mark Functions',
      description: 'Mark functions for Replay',
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
            { id: 'ReplayMarkInRecordedNow', label: 'Mark In Recorded Now' }
          ]
        },
        {
          type: 'textinput',
          label: 'Seconds',
          tooltip: 'Number of previous seconds to use when creating a new event',
          id: 'value',
          default: '10',
          useVariables: true,
          isVisible: (options) => {
            return ['ReplayMarkInOut', 'ReplayMarkInOutLive', 'ReplayMarkInOutRecorded'].includes(options.functionID as string)
          }
        },
        {
          type: 'textinput',
          label: 'Seconds',
          tooltip: 'Number of seconds into the future to use when creating a new event',
          id: 'value2',
          default: '10',
          useVariables: true,
          isVisible: (options) => {
            return options.functionID === 'ReplayMarkInOutLiveFuture'
          }
        }
      ],
      callback: (action) => {
        const command: any = {
          id: 'replayMark',
          options: { functionID: action.options.functionID }
        }

        if (['ReplayMarkInOut', 'ReplayMarkInOutLive', 'ReplayMarkInOutRecorded'].includes(action.options.functionID as string)) {
          command.options.value = action.options.value
        }

        if (action.options.functionID === 'ReplayMarkInOutLiveFuture') {
          command.options.value = action.options.value2
        }

        sendBasicCommand(command)
      }
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
            { id: 'ReplayMoveSelectedOutPoint', label: 'Move Out Point' }
          ]
        },
        {
          type: 'textinput',
          label: 'Frames',
          id: 'value',
          default: '30',
          useVariables: true
        }
      ],
      callback: sendBasicCommand
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
            { id: 'ReplayUpdateSelectedOutPoint', label: 'Move Out Point' }
          ]
        }
      ],
      callback: sendBasicCommand
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
            label: `Events ${item}`
          }))
        },
        options.replayChannel
      ],
      callback: sendBasicCommand
    },

    replayChangeDirection: {
      name: 'Replay - Change Direction',
      description: 'Change Replay playback Direction',
      options: [options.replayChannel],
      callback: sendBasicCommand
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
          max: 1
        }
      ],
      callback: sendBasicCommand
    },

    replaySetSpeed: {
      name: 'Replay - Set Speed',
      description: 'Set Replay playback Speed to a value',
      options: [
        options.replayChannel,
        {
          type: 'textinput',
          label: 'Speed',
          id: 'value',
          default: '1',
          useVariables: true
        },
        {
          type: 'textinput',
          label: 'Max Speed',
          id: 'max',
          default: '1',
          tooltip: 'If using a tbar, set this to the max value your tbar sends (eg, 255 for xkeys)',
          useVariables: true
        }
      ],
      callback: async (action) => {
        let value = parseFloat((await instance.parseOption(action.options.value))[instance.buttonShift.state])
        const maxValue = parseFloat((await instance.parseOption(action.options.max))[instance.buttonShift.state])

        if (isNaN(value) || isNaN(maxValue) || maxValue < 0) return

        if (value > maxValue) value = maxValue
        if (value < 0) value = 0

        const position = value / maxValue

        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION ReplaySetSpeed Channel=${action.options.channel}&Value=${position}`)
        }
      }
    },

    replayMoveEvent: {
      name: 'Replay - Move event',
      description: 'Move an Event to a differnt Events tab',
      options: [
        {
          type: 'dropdown',
          label: 'Last/Slected',
          id: 'functionID',
          default: 'ReplayMoveLastEvent',
          choices: [
            { id: 'ReplayMoveLastEvent', label: 'Move Last' },
            { id: 'ReplayMoveSelectedEvent', label: 'Move Selected' }
          ]
        },
        {
          type: 'dropdown',
          label: 'Destination',
          id: 'value',
          default: 0,
          choices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => ({
            id: item,
            label: `Events ${index + 1}`
          }))
        }
      ],
      callback: sendBasicCommand
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
            { id: 'ReplayMoveSelectedEventDown', label: 'Move Down' }
          ]
        }
      ],
      callback: sendBasicCommand
    },

    replayFastForwardBackward: {
      name: 'Replay - Fast Forward/Backward',
      description: 'Replay Fast Forward/Backwared (1-30x speed)',
      options: [
        {
          type: 'dropdown',
          label: 'Direction',
          id: 'functionID',
          default: 'ReplayFastForward',
          choices: [
            { id: 'ReplayFastForward', label: 'Forward' },
            { id: 'ReplayFastBackward', label: 'Backward' }
          ]
        },
        options.replayChannel,
        {
          type: 'number',
          label: 'Speed',
          id: 'value',
          default: 10,
          min: 0,
          max: 30
        }
      ],
      callback: sendBasicCommand
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
          useVariables: true
        }
      ],
      callback: sendBasicCommand
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
            { id: 'ReplayStartStopRecording', label: 'Toggle' }
          ]
        }
      ],
      callback: sendBasicCommand
    },

    replayJumpToNow: {
      name: 'Replay - Jump To Now',
      description: 'Jump replay to Now',
      options: [options.replayChannel],
      callback: sendBasicCommand
    },

    replayLiveToggle: {
      name: 'Replay - Toggle Live',
      description: 'Toggle Replay Live',
      options: [],
      callback: sendBasicCommand
    },

    replayPlay: {
      name: 'Replay - Play',
      description: 'Play Replay',
      options: [options.replayChannel],
      callback: sendBasicCommand
    },

    replayPause: {
      name: 'Replay - Pause',
      description: 'Pause Replay',
      options: [options.replayChannel],
      callback: sendBasicCommand
    },

    replayPlayEvent: {
      name: 'Replay - Play Event',
      description: 'Play an Event',
      options: [
        options.replayChannel,
        {
          type: 'number',
          label: 'Event ID',
          id: 'value',
          default: 0,
          min: 0,
          max: 1000
        }
      ],
      callback: sendBasicCommand
    },

    replayPlaySelectedEventToOutput: {
      name: 'Replay - Play Selected Event To Output',
      description: 'Play Event currently Selected to Output',
      options: [options.replayChannel],
      callback: sendBasicCommand
    },

    replayPlayEventsByIDToOutput: {
      name: 'Replay - Play Events By ID To Output',
      description: 'Play events by ID',
      options: [
        options.replayChannel,
        {
          type: 'number',
          label: 'Event ID',
          id: 'value',
          default: 0,
          min: 0,
          max: 1000
        }
      ],
      callback: sendBasicCommand
    },

    replayPlayLastEventToOutput: {
      name: 'Replay - Play Last Event to Output',
      description: 'Play last Event',
      options: [options.replayChannel],
      callback: sendBasicCommand
    },

    replayPlayAllEventsToOutput: {
      name: 'Replay - Play all Events to Output',
      description: 'Play all Events in active list',
      options: [options.replayChannel],
      callback: sendBasicCommand
    },

    replayStopEvents: {
      name: 'Replay - Stop Events',
      description: 'Stop any currently playing events',
      options: [],
      callback: sendBasicCommand
    },

    replayToggleCamera: {
      name: 'Replay - Toggle Selected Event Camera',
      description: 'Toggles a camera view for the selected Event',
      options: [
        {
          type: 'dropdown',
          label: 'Destination',
          id: 'camera',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: item, label: `Camera ${item}` }))
        }
      ],
      callback: (action) => {
        if (instance.tcp) instance.tcp.sendCommand(`FUNCTION ReplayToggleSelectedEventCamera${action.options.camera}`)
      }
    },

    replayShowHide: {
      name: 'Replay - Show / Hide Replay',
      description: 'Shows or Hides the Replay window',
      options: [],
      callback: sendBasicCommand
    }
  }
}
