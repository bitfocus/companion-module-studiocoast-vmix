import { combineRgb } from '@companion-module/base'
import type { VMixPresetArray } from './presets'

export const getReplayPresets = (): VMixPresetArray => {
  const replayPresets: VMixPresetArray = []

  ;['A', 'B'].map((channel) => {
    replayPresets.push({
      category: 'Replay',
      name: `A Camera`,
      type: 'text',
      text: '',
    })

    for (let i = 1; i < 9; i++) {
      replayPresets.push({
        category: 'Replay',
        name: `${channel} Cam ${i}`,
        type: 'button',
        style: {
          text: `${channel} Cam ${i}`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'replayACamera',
                options: { functionID: `Replay${channel}Camera${i}` as 'ReplayACamera1' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'replayCamera',
            options: { channel: 'A', camera: 1 },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      })
    }
  })

  replayPresets.push({
    category: 'Replay',
    name: `Channel Select`,
    type: 'text',
    text: '',
  })

  const channels: ('AB' | 'A' | 'B')[] = ['AB', 'A', 'B']

  channels.forEach((channel) => {
    replayPresets.push({
      category: 'Replay',
      name: `Channel${channel}`,
      type: 'button',
      style: {
        text: `Channel${channel}`,
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'replaySelectChannel',
              options: { functionID: `replaySelectChannel${channel}` as 'replaySelectChannelAB' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replaySelectedChannel',
          options: { channel },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0),
          },
        },
      ],
    })
  })

  replayPresets.push(
    {
      category: 'Replay',
      name: `Playback`,
      type: 'text',
      text: '',
    },
    {
      category: 'Replay',
      name: 'Rec',
      type: 'button',
      style: {
        text: 'Rec',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayRecording', options: { functionID: `ReplayStartStopRecording` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayStatus',
          options: { status: 'recording' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'Live',
      type: 'button',
      style: {
        text: 'Live',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayLiveToggle', options: {} }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayStatus',
          options: { status: 'live' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'Jump to Now',
      type: 'button',
      style: {
        text: 'Jump to Now',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayJumpToNow', options: { channel: 'Current' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Play Events',
      type: 'button',
      style: {
        text: 'Play Events',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayPlay', options: { channel: 'Current' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Pause Events',
      type: 'button',
      style: {
        text: 'Pause Events',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayPause', options: { channel: 'Current' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Play Selected Event',
      type: 'button',
      style: {
        text: 'Play Selected Event',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayPlaySelectedEventToOutput', options: { channel: 'Current' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Play Events by ID',
      type: 'button',
      style: {
        text: 'Play Events by ID',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayPlayEventsByIDToOutput', options: { channel: 'Current', value: 0 } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: `Mark Event`,
      type: 'text',
      text: '',
    },
    {
      category: 'Replay',
      name: 'Mark In',
      type: 'button',
      style: {
        text: 'Mark In',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkIn', value: '0', value2: '10' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Mark Out',
      type: 'button',
      style: {
        text: 'Mark Out',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkOut', value: '0', value2: '10' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Mark Last 10s',
      type: 'button',
      style: {
        text: 'Mark Last 10s',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkInOut', value: '10', value2: '10' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Mark Last 30s',
      type: 'button',
      style: {
        text: 'Mark Last 30s',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkInOut', value: '30', value2: '10' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Update In',
      type: 'button',
      style: {
        text: 'Update In',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayUpdateInOut', options: { functionID: 'ReplayUpdateSelectedInPoint' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Update Out',
      type: 'button',
      style: {
        text: 'Update Out',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayUpdateInOut', options: { functionID: 'ReplayUpdateSelectedOutPoint' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
  )

  return replayPresets
}
