import type { CompanionButtonPresetDefinition, CompanionTextPresetDefinition, CompanionPresetDefinitions } from '@companion-module/base'
import type VMixInstance from '../index'
import type { ActionCallbacks } from '../actions/actions'
import type { FeedbackCallbacks } from '../feedbacks/feedback'
import { getAudioPresets } from './audioPresets'
import { getButtonShiftPresets } from './buttonShiftPresets'
import { getCallPresets } from './callPresets'
import { getGeneralPresets } from './generalPresets'
import { getLayerPanZoomPresets } from './layerPanZoomPresets'
import { getListPresets } from './listPresets'
import { getMixPresets } from './mixPresets'
import { getMultiviewLayersPresets } from './multiviewLayerPresets'
import { getOutputPresets } from './outputPresets'
import { getOverlayPresets } from './overlayPresets'
import { getPlayListPresets } from './playListPresets'
import { getReplayPresets } from './replayPresets'
import { getTitleGraphicsPresets } from './titleGraphicsPresets'
import { getTransitionPresets } from './transitionPresets'
import { getVideoPlaybackPresets } from './videoPlaybackPresets'
import { getVMixFunctionsPresets } from './vMixFunctionsPresets'

export type PresetCategory =
  | 'Mix 1'
  | 'Mix 2'
  | 'Mix 3'
  | 'Mix 4'
  | 'Mix 5'
  | 'Mix 6'
  | 'Mix 7'
  | 'Mix 8'
  | 'Mix 9'
  | 'Mix 10'
  | 'Mix 11'
  | 'Mix 12'
  | 'Mix 13'
  | 'Mix 14'
  | 'Mix 15'
  | 'Mix 16'
  | 'Audio'
  | 'vMix Call'
  | 'Scripting & Commands'
  | 'MultiView Layers'
  | 'Layer Pan/Zoom'
  | 'Outputs'
  | 'Overlays'
  | 'PlayList'
  | 'Replay'
  | 'Slides & Lists'
  | 'Titles & Graphics'
  | 'Transitions'
  | 'Video Playback'
  | 'vMix Functions'
  | 'Button Shift'

type PresetFeedbackCallbacks = FeedbackCallbacks & { style?: any }

interface VMixButtonPresetAdditions {
  category: PresetCategory
  steps: {
    down: ActionCallbacks[]
    up: ActionCallbacks[]
  }[]
  feedbacks: PresetFeedbackCallbacks[]
}

interface VMixTextPresetAdditions {
  category: PresetCategory
}

export type VMixButtonPreset = CompanionButtonPresetDefinition & VMixButtonPresetAdditions
export type VMixTextPreset = CompanionTextPresetDefinition & VMixTextPresetAdditions
export type VMixPreset = VMixButtonPreset | VMixTextPreset
export type VMixPresetArray = VMixPreset[]

export function getPresets(instance: VMixInstance): CompanionPresetDefinitions {
  const presets: VMixPresetArray = [
    ...getAudioPresets(),
    ...getButtonShiftPresets(instance),
    ...getCallPresets(),
    ...getGeneralPresets(),
    ...getLayerPanZoomPresets(),
    ...getListPresets(),
    ...getMixPresets(),
    ...getMultiviewLayersPresets(),
    ...getOutputPresets(),
    ...getOverlayPresets(),
    ...getPlayListPresets(),
    ...getReplayPresets(),
    ...getTitleGraphicsPresets(),
    ...getTransitionPresets(),
    ...getVideoPlaybackPresets(),
    ...getVMixFunctionsPresets()
  ]

  return presets as unknown as CompanionPresetDefinitions
}
