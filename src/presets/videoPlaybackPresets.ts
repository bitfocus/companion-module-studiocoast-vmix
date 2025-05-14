import { combineRgb } from '@companion-module/base'
import type { VMixPresetArray } from './presets'

export const getVideoPlaybackPresets = (): VMixPresetArray => {
  const videoPlaybackPresets: VMixPresetArray = [
    {
      category: 'Video Playback',
      name: 'play',
      type: 'button',
      style: {
        text: 'play',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Play' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Pause',
      type: 'button',
      style: {
        text: 'Pause',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Pause' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Play Pause',
      type: 'button',
      style: {
        text: 'Play Pause',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'PlayPause' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Restart',
      type: 'button',
      style: {
        text: 'Restart',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Restart' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Loop ON',
      type: 'button',
      style: {
        text: 'Loop ON',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'LoopOn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Loop OFF',
      type: 'button',
      style: {
        text: 'Loop OFF',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'LoopOff' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Playhead 10 sec',
      type: 'button',
      style: {
        text: 'Playhead 10 sec',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoPlayhead', options: { input: '', inputType: true, adjustment: 'Set', value: 10000 } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Playhead +10 sec',
      type: 'button',
      style: {
        text: 'Playhead +10 sec',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
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
    {
      category: 'Video Playback',
      name: 'Playhead -10 sec',
      type: 'button',
      style: {
        text: 'Playhead -10 sec',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
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
    {
      category: 'Video Playback',
      name: 'Mark In',
      type: 'button',
      style: {
        text: 'Mark In',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkIn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Mark Out',
      type: 'button',
      style: {
        text: 'Mark Out',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkOut' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Clear In/Out',
      type: 'button',
      style: {
        text: 'Clear In/Out',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkReset' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Clear In',
      type: 'button',
      style: {
        text: 'Clear In',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkResetIn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Clear Out',
      type: 'button',
      style: {
        text: 'Clear Out',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkResetOut' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Video Timecode',
      type: 'button',
      style: {
        text: 'Video Timecode',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [],
      feedbacks: [
        {
          feedbackId: 'videoTimer',
          options: {
            input: '',
            color: combineRgb(255, 255, 255),
            color30: combineRgb(255, 255, 0),
            color10: combineRgb(255, 0, 0),
            loop: false,
          },
        },
      ],
    },
  ]

  return videoPlaybackPresets
}
