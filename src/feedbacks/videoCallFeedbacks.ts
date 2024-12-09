import { combineRgb } from '@companion-module/base'
import { VMixFeedback, FeedbackCallback } from './feedback'
import { options } from '../utils'
import VMixInstance from '../index'

type VideoCallAudioSourceOptions = {
  input: string
  source: 'Master' | 'Headphones' | 'BusA' | 'BusB' | 'BusC' | 'BusD' | 'BusE' | 'BusF' | 'BusG'
}

type VideoCallVideoSourceOptions = {
  input: string
  source: 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'
}

type VideoCallAudioSourceCallback = FeedbackCallback<'videoCallAudioSource', VideoCallAudioSourceOptions>
type VideoCallVideoSourceCallback = FeedbackCallback<'videoCallVideoSource', VideoCallVideoSourceOptions>

export interface VideoCallFeedbacks {
  videoCallAudioSource: VMixFeedback<VideoCallAudioSourceCallback>
  videoCallVideoSource: VMixFeedback<VideoCallVideoSourceCallback>
}

export type VideoCallCallbacks = VideoCallAudioSourceCallback | VideoCallVideoSourceCallback

export const vMixVideoCallFeedbacks = (instance: VMixInstance): VideoCallFeedbacks => {
  return {
    videoCallAudioSource: {
      type: 'boolean',
      name: 'Video Call - Audio Source',
      description: 'Indicates audio source for a video call',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0)
      },
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Source',
          id: 'source',
          default: 'Master',
          choices: ['Master', 'Headphones', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id, index) => ({
            id: index > 1 ? `Bus${id}` : id,
            label: id
          }))
        }
      ],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        return input?.callAudioSource === feedback.options.source
      }
    },

    videoCallVideoSource: {
      type: 'boolean',
      name: 'Video Call - Video Source',
      description: 'Indicates video source for a video call',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0)
      },
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Source',
          id: 'source',
          default: 'Output1',
          choices: ['Output1', 'Output2', 'Output3', 'Output4', 'None'].map((id) => ({ id, label: id }))
        }
      ],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        return input?.callVideoSource === feedback.options.source
      }
    }
  }
}
