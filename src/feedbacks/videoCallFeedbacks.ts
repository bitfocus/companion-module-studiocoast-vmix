import { type CompanionFeedbackDefinitions } from '@companion-module/base'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type VideoCallFeedbacksSchema = {
  videoCallAudioSource: {
    type: 'boolean'
    options: {
      input: string
      source: 'Master' | 'Headphones' | 'BusA' | 'BusB' | 'BusC' | 'BusD' | 'BusE' | 'BusF' | 'BusG'
    }
  }
  videoCallVideoSource: {
    type: 'boolean'
    options: {
      input: string
      source: 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'
    }
  }
}

export const getVideoCallFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<VideoCallFeedbacksSchema> => {
  return {
    videoCallAudioSource: {
      type: 'boolean',
      name: 'Video Call - Audio Source',
      description: 'Indicates audio source for a video call',
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Source',
          id: 'source',
          default: 'Master',
          choices: ['Master', 'Headphones', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id, index) => ({
            id: index > 1 ? `Bus${id}` : id,
            label: id,
          })),
          expressionDescription: `Valid Values: 'Master', 'Headphones', 'A', 'B', 'C', 'D', 'E', 'F', 'G'`,
        },
      ],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        return input?.callAudioSource === feedback.options.source
      },
    },

    videoCallVideoSource: {
      type: 'boolean',
      name: 'Video Call - Video Source',
      description: 'Indicates video source for a video call',
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Source',
          id: 'source',
          default: 'Output1',
          choices: ['Output1', 'Output2', 'Output3', 'Output4', 'None'].map((id) => ({ id, label: id })),
          expressionDescription: `Valid Values: 'Output1', 'Output2', 'Output3', 'Output4', 'None'`,
        },
      ],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        return input?.callVideoSource === feedback.options.source
      },
    },
  }
}
