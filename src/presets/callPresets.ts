import type { CompanionPresetSection } from '@companion-module/base'
import { type CompanionPresetDefinitions } from '@companion-module/base'
import { type VMixInstanceTypes, AUDIOBUSSES } from '../utils.js'

export const getCallDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const callDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    call_audioSourceMaster: {
      name: `Audio\nSource\nMaster`,
      type: 'simple',
      style: {
        text: `Audio\nSource\nMaster`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'Master' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'Master' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    call_videoSourceOutput1: {
      name: `Video\nSource\nOutput 1`,
      type: 'simple',
      style: {
        text: `Video\nSource\nOutput 1`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output1' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    call_videoSourceOutput2: {
      name: `Video\nSource\nOutput 2`,
      type: 'simple',
      style: {
        text: `Video\nSource\nOutput 2`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output2' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output2' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    call_videoSourceOutput3: {
      name: `Video\nSource\nOutput 3`,
      type: 'simple',
      style: {
        text: `Video\nSource\nOutput 3`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output3' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output3' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    call_videoSourceOutput4: {
      name: `Video\nSource\nOutput 4`,
      type: 'simple',
      style: {
        text: `Video\nSource\nOutput 4`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output4' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output4' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    call_videoSourceOutputNone: {
      name: `Video\nSource\nNone`,
      type: 'simple',
      style: {
        text: `Video\nSource\nNone`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'None' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'None' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },
  }

  AUDIOBUSSES.forEach((bus) => {
    callDefinitions[`call_audioSourceBus${bus}`] = {
      name: `Audio\nSource\nBus ${bus}`,
      type: 'simple',
      style: {
        text: `Audio\nSource\nBus ${bus}`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: `Bus${bus}` as any } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: `Bus${bus}` as any },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    }
  })

  return callDefinitions
}

export const getCallStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'callStructure',
      name: 'vMix Call',
      description: 'Presets for controlling the Audio and Video sources. Configure the input on Action and Feedback when placed.',
      definitions: [
        {
          id: 'callAudioSource',
          type: 'simple',
          name: 'Audio Source',
          description: 'Set the audio source returned to a vMix Call Input',
          presets: ['call_audioSourceMaster', ...AUDIOBUSSES.map((bus) => `call_audioSourceBus${bus}`)],
        },
        {
          id: 'callVideoSource',
          type: 'simple',
          name: 'Video Source',
          description: 'Set the video source returned to a vMix Call Input',
          presets: ['call_videoSourceOutput1', 'call_videoSourceOutput2', 'call_videoSourceOutput3', 'call_videoSourceOutput4', 'call_videoSourceOutputNone'],
        },
      ],
    },
  ]

  return structure
}
