import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import type VMixInstance from '../index.js'
import { type VMixInstanceTypes } from '../utils.js'
import { getAudioDefinitions, getAudioStructure } from './audioPresets.js'
import { getAudioPresetDefinitions, getAudioPresetStructure } from './audioPresetPresets.js'
import { getCallDefinitions, getCallStructure } from './callPresets.js'
import { getGeneralDefinitions, getGeneralStructure } from './generalPresets.js'
import { getLayerPanZoomDefinitions, getLayerPanZoomStructure } from './layerPanZoomPresets.js'
import { getListDefinitions, getListStructure } from './listPresets.js'
import { getMixDefinitions, getMixStructure } from './mixPresets.js'
import { getMultiviewLayersDefinitions, getMultviewLayerStructure } from './multiviewLayerPresets.js'
import { getOutputDefinitions, getOutputStructure } from './outputPresets.js'
import { getOverlayDefinitions, getOverlayStructure } from './overlayPresets.js'
import { getPlayListDefinitions, getPlaylistStructure } from './playListPresets.js'
import { getReplayDefinitions, getReplayStructure } from './replayPresets.js'
import { getTitleGraphicsDefinitions, getTitleStructure } from './titleGraphicsPresets.js'
import { getTransitionDefinitions, getTransitionStructure } from './transitionPresets.js'
import { getVideoPlaybackDefinitions, getVideoPlaybackStructure } from './videoPlaybackPresets.js'
import { getFunctionDefinitions, getVMixFunctionsStructure } from './vMixFunctionsPresets.js'

export function getPresetDefinitions(_instance: VMixInstance): CompanionPresetDefinitions<VMixInstanceTypes> {
  const presets: CompanionPresetDefinitions<VMixInstanceTypes> = {
    ...getAudioDefinitions(),
    ...getAudioPresetDefinitions(),
    ...getCallDefinitions(),
    ...getGeneralDefinitions(),
    ...getLayerPanZoomDefinitions(),
    ...getListDefinitions(),
    ...getMixDefinitions(),
    ...getMultiviewLayersDefinitions(),
    ...getOutputDefinitions(),
    ...getOverlayDefinitions(),
    ...getPlayListDefinitions(),
    ...getReplayDefinitions(),
    ...getTitleGraphicsDefinitions(),
    ...getTransitionDefinitions(),
    ...getVideoPlaybackDefinitions(),
    ...getFunctionDefinitions(),
  }

  return presets
}

export const getPresetStructure: CompanionPresetSection<VMixInstanceTypes>[] = [
  ...getAudioStructure(),
  ...getAudioPresetStructure(),
  ...getCallStructure(),
  ...getGeneralStructure(),
  ...getLayerPanZoomStructure(),
  ...getListStructure(),
  ...getMixStructure(),
  ...getMultviewLayerStructure(),
  ...getOutputStructure(),
  ...getOverlayStructure(),
  ...getPlaylistStructure(),
  ...getReplayStructure(),
  ...getTitleStructure(),
  ...getTransitionStructure(),
  ...getVideoPlaybackStructure(),
  ...getVMixFunctionsStructure(),
]
