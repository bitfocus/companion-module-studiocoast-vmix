import type { CompanionActionDefinitions } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import { type EmptyOptions, options } from '../utils.js'
import type VMixInstance from '../index.js'

export type ReplayActionsSchema = {
  replayACamera: {
    options: {
      functionID: 'ReplayACamera1' | 'ReplayACamera2' | 'ReplayACamera3' | 'ReplayACamera4' | 'ReplayACamera5' | 'ReplayACamera6' | 'ReplayACamera7' | 'ReplayACamera8'
    }
  }
  replayBCamera: {
    options: {
      functionID: 'ReplayBCamera1' | 'ReplayBCamera2' | 'ReplayBCamera3' | 'ReplayBCamera4' | 'ReplayBCamera5' | 'ReplayBCamera6' | 'ReplayBCamera7' | 'ReplayBCamera8'
    }
  }
  replayCamera: {
    options: {
      functionID: 'ReplayCamera1' | 'ReplayCamera2' | 'ReplayCamera3' | 'ReplayCamera4' | 'ReplayCamera5' | 'ReplayCamera6' | 'ReplayCamera7' | 'ReplayCamera8'
    }
  }
  replaySelectChannel: {
    options: {
      functionID: 'replaySelectChannelAB' | 'replaySelectChannelA' | 'replaySelectChannelB'
    }
  }
  replaySwapChannels: EmptyOptions
  replayMark: {
    options: {
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
  }
  replayMoveInOut: {
    options: {
      functionID: 'ReplayMoveSelectedInPoint' | 'ReplayMoveSelectedOutPoint'
      value: string
    }
  }
  replayUpdateInOut: {
    options: {
      functionID: 'ReplayUpdateSelectedInPoint' | 'ReplayUpdateSelectedOutPoint'
    }
  }
  replaySelectEvents: {
    options: {
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
  }
  replayChangeDirection: {
    options: {
      channel: ReplayChannel
    }
  }
  replayChangeSpeed: {
    options: {
      channel: ReplayChannel
      value: number
    }
  }
  replaySetSpeed: {
    options: {
      channel: ReplayChannel
      value: string
      max: string
    }
  }
  replayMoveEvent: {
    options: {
      functionID: 'ReplayMoveLastEvent' | 'ReplayMoveSelectedEvent'
      value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
    }
  }
  replayMoveEventUpDown: {
    options: {
      functionID: 'ReplayMoveSelectedEventUp' | 'ReplayMoveSelectedEventDown'
    }
  }
  replayFastForwardBackward: {
    options: {
      functionID: 'ReplayFastForward' | 'ReplayFastBackward'
      channel: ReplayChannel
      value: number
    }
  }
  replayJumpFrames: {
    options: {
      channel: ReplayChannel
      value: string
    }
  }
  replayRecording: {
    options: {
      functionID: 'ReplayStartRecording' | 'ReplayStopRecording' | 'ReplayStartStopRecording'
    }
  }
  replayJumpToNow: {
    options: {
      channel: ReplayChannel
    }
  }
  replayLiveToggle: EmptyOptions
  replayPlay: {
    options: {
      channel: ReplayChannel
    }
  }
  replayPause: {
    options: {
      channel: ReplayChannel
    }
  }
  replayPlayEvent: {
    options: {
      channel: ReplayChannel
      value: string
    }
  }
  replayPlaySelectedEventToOutput: {
    options: {
      channel: ReplayChannel
    }
  }
  replayPlayEventsByID: {
    options: {
      channel: ReplayChannel
      value: string
    }
  }
  replayPlayEventsByIDToOutput: {
    options: {
      channel: ReplayChannel
      value: string
    }
  }
  replayPlayLastEventToOutput: {
    options: {
      channel: ReplayChannel
    }
  }
  replayPlayAllEventsToOutput: {
    options: {
      channel: ReplayChannel
    }
  }
  replayStopEvents: EmptyOptions
  replayToggleCamera: {
    options: {
      camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    }
  }
  replayShowHide: EmptyOptions
  replayQuadMode: {
    options: {
      functionID: 'ReplayToggleQuadMode' | 'ReplayQuadModeOn' | 'ReplayQuadModeOff'
    }
  }
  replayEventText: {
    options: {
      type: 'Set' | 'Append'
      target: 'Last' | 'Selected'
      camera: string
      text: string
    }
  }
  replayEventTextClear: {
    options: {
      target: 'Last' | 'Selected'
    }
  }
}

type ReplayChannel = 'Current' | 'A' | 'B'

export const getReplayActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<ReplayActionsSchema> => {
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
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayACamera${item}`, label: `Camera ${item}` })),
          expressionDescription: `Valid Values: 'ReplayACamera1' to 'ReplayACamera8'`,
        },
      ],
      callback: sendBasicCommand,
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
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayBCamera${item}`, label: `Camera ${item}` })),
          expressionDescription: `Valid Values: 'ReplayBCamera1' to 'ReplayBCamera8'`,
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

    replayChangeDirection: {
      name: 'Replay - Change Direction',
      description: 'Change Replay playback Direction',
      options: [options.replayChannel],
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

    replayJumpToNow: {
      name: 'Replay - Jump To Now',
      description: 'Jump replay to Now',
      options: [options.replayChannel],
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

    replayPause: {
      name: 'Replay - Pause',
      description: 'Pause Replay',
      options: [options.replayChannel],
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

    replayPlayLastEventToOutput: {
      name: 'Replay - Play Last Event to Output',
      description: 'Play last Event',
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

    replayToggleCamera: {
      name: 'Replay - Toggle Selected Event Camera',
      description: 'Toggles a camera view for the selected Event',
      options: [
        {
          type: 'dropdown',
          label: 'Destination',
          id: 'camera',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: item, label: `Camera ${item}` })),
          expressionDescription: `1 to 8`,
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
  }
}
