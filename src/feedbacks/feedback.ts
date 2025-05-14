import type VMixInstance from '../index'
import type {
  CompanionAdvancedFeedbackResult,
  CompanionFeedbackButtonStyleResult,
  CompanionFeedbackAdvancedEvent,
  CompanionFeedbackBooleanEvent,
  CompanionFeedbackContext,
  SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import { type AudioFeedbacks, type AudioCallbacks, vMixAudioFeedbacks } from './audioFeedbacks'
import { type GeneralFeedbacks, type GeneralCallbacks, vMixGeneralFeedbacks } from './generalFeedbacks'
import { type LayersFeedbacks, type LayersCallbacks, vMixLayersFeedbacks } from './layersFeedbacks'
import { type ListFeedbacks, type ListCallbacks, vMixListFeedbacks } from './listFeedbacks'
import { type MediaFeedbacks, type MediaCallbacks, vMixMediaFeedbacks } from './mediaFeedbacks'
import { type ReplayFeedbacks, type ReplayCallbacks, vMixReplayFeedbacks } from './replayFeedbacks'
import { type TallyFeedbacks, type TallyCallbacks, vMixTallyFeedbacks } from './tallyFeedbacks'
import { type TransitionFeedbacks, type TransitionCallbacks, vMixTransitionFeedbacks } from './transitionFeedbacks'
import { type UtilFeedbacks, type UtilCallbacks, vMixUtilFeedbacks } from './utilFeedbacks'
import { type VideoCallFeedbacks, type VideoCallCallbacks, vMixVideoCallFeedbacks } from './videoCallFeedbacks'

export type VMixFeedbackKeys = keyof VMixFeedbacks

export type VMixFeedbacks =
  | AudioFeedbacks
  | GeneralFeedbacks
  | LayersFeedbacks
  | ListFeedbacks
  | MediaFeedbacks
  | ReplayFeedbacks
  | TallyFeedbacks
  | TransitionFeedbacks
  | UtilFeedbacks
  | VideoCallFeedbacks

export type FeedbackCallbacks =
  | AudioCallbacks
  | GeneralCallbacks
  | LayersCallbacks
  | ListCallbacks
  | MediaCallbacks
  | ReplayCallbacks
  | TallyCallbacks
  | TransitionCallbacks
  | UtilCallbacks
  | VideoCallCallbacks

// Force options to have a default to prevent sending undefined values
type InputFieldWithDefault = Exclude<SomeCompanionFeedbackInputField, 'default'> & {
  default: string | number | boolean | null
}

export interface FeedbackCallback<I, O> {
  feedbackId: I
  options: Readonly<O>
}

// vMix Boolean and Advanced feedback types
interface VMixFeedbackBoolean<T> {
  type: 'boolean'
  name: string
  description: string
  defaultStyle: Partial<CompanionFeedbackButtonStyleResult>
  options: InputFieldWithDefault[]
  callback: (feedback: Readonly<Omit<CompanionFeedbackBooleanEvent, 'options' | 'type'> & T>, context: CompanionFeedbackContext) => boolean | Promise<boolean>
  subscribe?: (feedback: Readonly<Omit<CompanionFeedbackBooleanEvent, 'options' | 'type'> & T>) => boolean
  unsubscribe?: (feedback: Readonly<Omit<CompanionFeedbackBooleanEvent, 'options' | 'type'> & T>) => boolean
}

interface VMixFeedbackAdvanced<T> {
  type: 'advanced'
  name: string
  description: string
  options: InputFieldWithDefault[]
  callback: (
    feedback: Readonly<Omit<CompanionFeedbackAdvancedEvent, 'options' | 'type'> & T>,
    context: CompanionFeedbackContext,
  ) => CompanionAdvancedFeedbackResult | Promise<CompanionAdvancedFeedbackResult>
  subscribe?: (feedback: Readonly<Omit<CompanionFeedbackAdvancedEvent, 'options' | 'type'> & T>) => CompanionAdvancedFeedbackResult
  unsubscribe?: (feedback: Readonly<Omit<CompanionFeedbackAdvancedEvent, 'options' | 'type'> & T>) => CompanionAdvancedFeedbackResult
}

export type VMixFeedback<T> = VMixFeedbackBoolean<T> | VMixFeedbackAdvanced<T>

export function getFeedbacks(instance: VMixInstance): VMixFeedbacks {
  return {
    ...vMixAudioFeedbacks(instance),
    ...vMixGeneralFeedbacks(instance),
    ...vMixLayersFeedbacks(instance),
    ...vMixListFeedbacks(instance),
    ...vMixMediaFeedbacks(instance),
    ...vMixReplayFeedbacks(instance),
    ...vMixTallyFeedbacks(instance),
    ...vMixTransitionFeedbacks(instance),
    ...vMixUtilFeedbacks(instance),
    ...vMixVideoCallFeedbacks(instance),
  }
}
