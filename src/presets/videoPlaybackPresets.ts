import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

export const getVideoPlaybackDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const videoPlaybackDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    videoPlayback_play: {
      name: 'play',
      type: 'simple',
      style: {
        text: 'play',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Play' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_pause: {
      name: 'Pause',
      type: 'simple',
      style: {
        text: 'Pause',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Pause' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_playPause: {
      name: 'Play Pause',
      type: 'simple',
      style: {
        text: 'Play Pause',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'PlayPause' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_restart: {
      name: 'Restart',
      type: 'simple',
      style: {
        text: 'Restart',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Restart' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_loopOn: {
      name: 'Loop ON',
      type: 'simple',
      style: {
        text: 'Loop ON',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'LoopOn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_loopOff: {
      name: 'Loop OFF',
      type: 'simple',
      style: {
        text: 'Loop OFF',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'LoopOff' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_playheadSet10: {
      name: 'Playhead 10 sec',
      type: 'simple',
      style: {
        text: 'Playhead 10 sec',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoPlayhead', options: { input: '', inputType: true, adjustment: 'Set', value: 10000 } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_playheadPlus10: {
      name: 'Playhead +10 sec',
      type: 'simple',
      style: {
        text: 'Playhead +10 sec',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'videoPlayhead',
              options: { input: '', inputType: true, adjustment: 'Increase', value: 10000 },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_playheadMinus10: {
      name: 'Playhead -10 sec',
      type: 'simple',
      style: {
        text: 'Playhead -10 sec',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'videoPlayhead',
              options: { input: '', inputType: true, adjustment: 'Decrease', value: 10000 },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_markIn: {
      name: 'Mark In',
      type: 'simple',
      style: {
        text: 'Mark In',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkIn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_markOut: {
      name: 'Mark Out',
      type: 'simple',
      style: {
        text: 'Mark Out',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkOut' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_clearInOut: {
      name: 'Clear In/Out',
      type: 'simple',
      style: {
        text: 'Clear In/Out',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkReset' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_clearIn: {
      name: 'Clear In',
      type: 'simple',
      style: {
        text: 'Clear In',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkResetIn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_clearOut: {
      name: 'Clear Out',
      type: 'simple',
      style: {
        text: 'Clear Out',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkResetOut' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    videoPlayback_videoTimecode: {
      name: 'Video Timer',
      type: 'simple',
      style: {
        text: 'Video Timer',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [],
      feedbacks: [
        {
          feedbackId: 'videoTimer',
          options: {
            input: '',
            color: 0xffffff,
            color30: 0x0ffff00,
            color10: 0xff0000,
            loop: false,
          },
        },
      ],
    },
  }

  return videoPlaybackDefinitions
}

export const getVideoPlaybackStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'videoPlayback',
      name: 'Video Playback',
      description: 'Presets for controlling the Audio and Video sources. Configure the input on Action and Feedback when placed.',
      definitions: [
        {
          id: 'videoState',
          type: 'simple',
          name: 'Video State',
          description: 'Play / Pause / Restart / Loop',
          presets: ['videoPlayback_play', 'videoPlayback_pause', 'videoPlayback_playPause', 'videoPlayback_restart', 'videoPlayback_loopOn', 'videoPlayback_loopOff'],
        },
        {
          id: 'videoMark',
          type: 'simple',
          name: 'Mark In/Out points',
          description: 'Set or clear the In and Out points of a video Input',
          presets: ['videoPlayback_markIn', 'videoPlayback_markOut', 'videoPlayback_clearIn', 'videoPlayback_clearOut', 'videoPlayback_clearInOut'],
        },
        {
          id: 'videoMark',
          type: 'simple',
          name: 'Playhead',
          description: 'Set / Increase / Decrease the current playhead position',
          presets: ['videoPlayback_playheadSet10', 'videoPlayback_playheadPlus10', 'videoPlayback_playheadMinus10'],
        },
        {
          id: 'videoMark',
          type: 'simple',
          name: 'Time Remaining Feedback',
          description: 'Feedback to change text color when an input has 30s and 10s remaining',
          presets: ['videoPlayback_videoTimecode'],
        },
      ],
    },
  ]

  return structure
}
