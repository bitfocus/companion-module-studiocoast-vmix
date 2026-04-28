import type { CompanionPresetDefinitions, CompanionPresetGroup, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

const channelsAB = ['A', 'B']
const channels: ('AB' | 'A' | 'B')[] = ['AB', 'A', 'B']

export const getReplayDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const replayDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {}

  channelsAB.forEach((channel) => {
    for (let i = 1; i < 9; i++) {
      replayDefinitions[`replay_channel${channel}Cam${i}`] = {
        name: `${channel} Cam ${i}`,
        type: 'simple',
        style: {
          text: `${channel} Cam ${i}`,
          size: '18',
          color: 0xffffff,
          bgcolor: 0x000000,
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
              color: 0x000000,
              bgcolor: 0x0ffff00,
            },
          },
        ],
      }
    }
  })

  channels.forEach((channel) => {
    replayDefinitions[`replay_channel${channel}`] = {
      name: `Channel${channel}`,
      type: 'simple',
      style: {
        text: `Channel${channel}`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'replaySelectChannel',
              options: { functionID: `replaySelectChannel${channel}` },
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
            color: 0x000000,
            bgcolor: 0x0ffff00,
          },
        },
      ],
    }
  })

  replayDefinitions[`replay_rec`] = {
    name: 'Rec',
    type: 'simple',
    style: {
      text: 'Rec',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
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
          color: 0x000000,
          bgcolor: 0xff0000,
        },
      },
    ],
  }

  replayDefinitions[`replay_live`] = {
    name: 'Live',
    type: 'simple',
    style: {
      text: 'Live',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
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
          color: 0x000000,
          bgcolor: 0xff0000,
        },
      },
    ],
  }

  replayDefinitions[`replay_jumpToNow`] = {
    name: 'Jump to Now',
    type: 'simple',
    style: {
      text: 'Jump to Now',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayJumpToNow', options: { channel: 'Current' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_playEvents`] = {
    name: 'Play Events',
    type: 'simple',
    style: {
      text: 'Play Events',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayPlay', options: { channel: 'Current' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_pauseEvents`] = {
    name: 'Pause Events',
    type: 'simple',
    style: {
      text: 'Pause Events',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayPause', options: { channel: 'Current' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_playSelEvent`] = {
    name: 'Play Selected Event',
    type: 'simple',
    style: {
      text: 'Play Selected Event',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayPlaySelectedEventToOutput', options: { channel: 'Current' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_playEventsByID`] = {
    name: 'Play Events by ID',
    type: 'simple',
    style: {
      text: 'Play Events by ID',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayPlayEventsByIDToOutput', options: { channel: 'Current', value: '0000' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_markIn`] = {
    name: 'Mark In',
    type: 'simple',
    style: {
      text: 'Mark In',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkIn', value: '0', value2: '10' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_markOut`] = {
    name: 'Mark Out',
    type: 'simple',
    style: {
      text: 'Mark Out',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkOut', value: '0', value2: '10' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_markLast10`] = {
    name: 'Mark Last 10s',
    type: 'simple',
    style: {
      text: 'Mark Last 10s',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkInOut', value: '10', value2: '10' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_markLast30`] = {
    name: 'Mark Last 30s',
    type: 'simple',
    style: {
      text: 'Mark Last 30s',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkInOut', value: '30', value2: '10' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_updateIn`] = {
    name: 'Update In',
    type: 'simple',
    style: {
      text: 'Update In',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayUpdateInOut', options: { functionID: 'ReplayUpdateSelectedInPoint' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  replayDefinitions[`replay_updateOut`] = {
    name: 'Update Out',
    type: 'simple',
    style: {
      text: 'Update Out',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'replayUpdateInOut', options: { functionID: 'ReplayUpdateSelectedOutPoint' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  return replayDefinitions
}

export const getReplayStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const replayGroups: CompanionPresetGroup<VMixInstanceTypes>[] = []

  channelsAB.forEach((channel) => {
    const group: CompanionPresetGroup<VMixInstanceTypes> = {
      id: `replay_channel${channel}`,
      type: 'simple',
      name: `Channel ${channel} camera selection`,
      description: ``,
      presets: [],
    }

    for (let i = 1; i < 9; i++) {
      group.presets.push(`replay_channel${channel}Cam${i}`)
    }

    replayGroups.push(group)
  })

  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'replayStructure',
      name: 'Replay',
      description: 'Replay camera control and playback',
      definitions: [
        {
          id: `replay_channels`,
          type: 'simple',
          name: `Channel selection`,
          description: ``,
          presets: [`replay_channelA`, `replay_channelB`, `replay_channelAB`],
        },
        {
          id: `replay_playback`,
          type: 'simple',
          name: `Playback and Timeline`,
          description: ``,
          presets: [
            `replay_rec`,
            `replay_live`,
            `replay_jumpToNow`,
            `replay_playEvents`,
            `replay_pauseEvents`,
            `replay_playSelEvent`,
            `replay_playEventsByID`,
            `replay_markIn`,
            `replay_markOut`,
            `replay_markLast10`,
            `replay_markLast30`,
            `replay_updateIn`,
            `replay_updateOut`,
          ],
        },
        ...replayGroups,
      ],
    },
  ]

  return structure
}
