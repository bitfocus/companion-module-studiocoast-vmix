import type { CompanionFeedbackDefinitions, StringKeys } from '@companion-module/base'
import type VMixInstance from '../index.js'
import { type AudioFeedbacksSchema, getAudioFeedbacks } from './audioFeedbacks.js'
import { type AudioPresetFeedbacksSchema, getAudioPresetFeedbacks } from './audioPresetFeedbacks.js'
import { type GeneralFeedbacksSchema, getGeneralFeedbacks } from './generalFeedbacks.js'
import { type LayersFeedbacksSchema, getLayersFeedbacks } from './layersFeedbacks.js'
import { type ListFeedbacksSchema, getListFeedbacks } from './listFeedbacks.js'
import { type PlaybackFeedbacksSchema, getPlaybackFeedbacks } from './playbackFeedbacks.js'
import { type ReplayFeedbacksSchema, getReplayFeedbacks } from './replayFeedbacks.js'
import { type TallyFeedbacksSchema, getTallyFeedbacks } from './tallyFeedbacks.js'
import { type TransitionFeedbacksSchema, getTransitionFeedbacks } from './transitionFeedbacks.js'
import { type UtilFeedbacksSchema, getUtilFeedbacks } from './utilFeedbacks.js'
import { type VideoCallFeedbacksSchema, getVideoCallFeedbacks } from './videoCallFeedbacks.js'

export type FeedbacksSchema = AudioFeedbacksSchema &
  AudioPresetFeedbacksSchema &
  GeneralFeedbacksSchema &
  LayersFeedbacksSchema &
  ListFeedbacksSchema &
  PlaybackFeedbacksSchema &
  ReplayFeedbacksSchema &
  TallyFeedbacksSchema &
  TransitionFeedbacksSchema &
  UtilFeedbacksSchema &
  VideoCallFeedbacksSchema

export type FeedbackId = StringKeys<FeedbacksSchema>

export function getFeedbacks(instance: VMixInstance): CompanionFeedbackDefinitions<FeedbacksSchema> {
  return {
    ...getAudioFeedbacks(instance),
    ...getAudioPresetFeedbacks(instance),
    ...getGeneralFeedbacks(instance),
    ...getLayersFeedbacks(instance),
    ...getListFeedbacks(instance),
    ...getPlaybackFeedbacks(instance),
    ...getReplayFeedbacks(instance),
    ...getTallyFeedbacks(instance),
    ...getTransitionFeedbacks(instance),
    ...getUtilFeedbacks(instance),
    ...getVideoCallFeedbacks(instance),
  }
}
