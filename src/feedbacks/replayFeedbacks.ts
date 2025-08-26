import { combineRgb } from '@companion-module/base'
import type { VMixFeedback, FeedbackCallback } from './feedback'
import { type EmptyOptions } from '../utils'
import type VMixInstance from '../index'

type ReplayStatusOptions = {
  status: 'recording' | 'live'
}

type ReplayEventsOptions = {
  channel: 'A' | 'B' | 'selected'
  events: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
}

type ReplayCameraOptions = {
  channel: 'A' | 'B' | 'selected'
  camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

type ReplaySelectedChannelOptions = {
  channel: 'AB' | 'A' | 'B'
}

type ReplayQuadModeOptions = EmptyOptions

type ReplayStatusCallback = FeedbackCallback<'replayStatus', ReplayStatusOptions>
type ReplayEventsCallback = FeedbackCallback<'replayEvents', ReplayEventsOptions>
type ReplayCameraCallback = FeedbackCallback<'replayCamera', ReplayCameraOptions>
type ReplaySelectedChannelCallback = FeedbackCallback<'replaySelectedChannel', ReplaySelectedChannelOptions>
type ReplayQuadModeCallback = FeedbackCallback<'replayQuadMode', ReplayQuadModeOptions>

export interface ReplayFeedbacks {
  replayStatus: VMixFeedback<ReplayStatusCallback>
  replayEvents: VMixFeedback<ReplayEventsCallback>
  replayCamera: VMixFeedback<ReplayCameraCallback>
  replaySelectedChannel: VMixFeedback<ReplaySelectedChannelCallback>
  replayQuadMode: VMixFeedback<ReplayQuadModeCallback>
}

export type ReplayCallbacks = ReplayStatusCallback | ReplayEventsCallback | ReplayCameraCallback | ReplaySelectedChannelCallback | ReplayQuadModeCallback

export const vMixReplayFeedbacks = (instance: VMixInstance): ReplayFeedbacks => {
  return {
    replayStatus: {
      type: 'boolean',
      name: 'Replay - Recording/Live',
      description: 'Indicates current recording or live status of a replay input',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'status',
          default: 'recording',
          choices: [
            { id: 'recording', label: 'Recording' },
            { id: 'live', label: 'Live' },
          ],
        },
      ],
      callback: (feedback) => {
        return instance.data.replay[feedback.options.status]
      },
    },

    replayEvents: {
      type: 'boolean',
      name: 'Replay - Events Tab',
      description: 'Indicates currently selected Events tab',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [
        {
          type: 'dropdown',
          label: 'Replay Channel',
          id: 'channel',
          default: 'A',
          choices: [
            { id: 'A', label: 'Replay A' },
            { id: 'B', label: 'Replay B' },
            { id: 'selected', label: 'Replay Selected' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Events',
          id: 'events',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((id) => ({
            id: id,
            label: id.toString(),
          })),
        },
      ],
      callback: (feedback) => {
        const channel = feedback.options.channel

        if (channel === 'selected') {
          return instance.data.replay.events === feedback.options.events
        } else if (channel === 'A') {
          return instance.data.replay.eventsA === feedback.options.events
        } else {
          return instance.data.replay.eventsB === feedback.options.events
        }
      },
    },

    replayCamera: {
      type: 'boolean',
      name: 'Replay - Camera Live',
      description: 'Indicates current replay camera being live on a channel',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [
        {
          type: 'dropdown',
          label: 'Replay Channel',
          id: 'channel',
          default: 'A',
          choices: [
            { id: 'A', label: 'Replay A' },
            { id: 'B', label: 'Replay B' },
            { id: 'selected', label: 'Replay Selected' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'camera',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({ id, label: id.toString() })),
        },
      ],
      callback: (feedback) => {
        let channel = feedback.options.channel

        if (channel === 'selected') {
          // Backwards compatibility - Default to channel A if prior to v24
          channel = !instance.data.replay.channelMode || instance.data.replay.channelMode === 'AB' ? 'A' : instance.data.replay.channelMode
        }

        const cameraChannel = ('camera' + channel) as 'cameraA' | 'cameraB'

        return instance.data.replay[cameraChannel] == feedback.options.camera
      },
    },

    replaySelectedChannel: {
      type: 'boolean',
      name: 'Replay - Selected Channel',
      description: 'Indicates currently selected channel',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [
        {
          type: 'dropdown',
          label: 'Replay Channel',
          id: 'channel',
          default: 'AB',
          choices: [
            { id: 'AB', label: 'A|B' },
            { id: 'A', label: 'A' },
            { id: 'B', label: 'B' },
          ],
        },
      ],
      callback: (feedback) => {
        return instance.data.replay.channelMode && instance.data.replay.channelMode === feedback.options.channel
      },
    },

    replayQuadMode: {
      type: 'boolean',
      name: 'Replay - Quad View',
      description: 'Indicates if Quad View is enabled',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [],
      callback: (_feedback) => {
        return instance.data.replay.quadMode
      },
    },
  }
}
