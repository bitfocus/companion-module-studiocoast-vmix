import type { CompanionActionEvent, CompanionActionDefinitions } from '@companion-module/base'
import type { FunctionIDs } from '@distdev/vmix-utils'
import type VMixInstance from '../index.js'
import { parseMix } from '../utils.js'
import { type AudioActionsSchema, getAudioActions, vMixAudioFunctions } from './audioActions.js'
import { type AudioPresetActionsSchema, getAudioPresetActions } from './audioPresetActions.js'
import { type BrowserActionsSchema, getBrowserActions, vMixBrowserFunctions } from './browserActions.js'
import { type DataSourceActionsSchema, getDataSourceActions, vMixDataSourceFunctions } from './dataSourceActions.js'
import { type GeneralActionsSchema, getGeneralActions, vMixGeneralFunctions } from './generalActions.js'
import { type InputActionsSchema, getInputActions, vMixInputFunctions } from './inputActions.js'
import { type LayerActionsSchema, getLayerActions, vMixLayerFunctions } from './layerActions.js'
import { type ListActionsSchema, getListActions, vMixListFunctions } from './listActions.js'
import { type NDIActionsSchema, getNDIActions, vMixNDIFunctions } from './ndiActions.js'
import { type OMTActionsSchema, getOMTActions, vMixOMTFunctions } from './omtActions.js'
import { type PlaybackActionsSchema, getPlaybackActions, vMixPlaybackFunctions } from './playbackActions.js'
import { type OutputActionsSchema, getOutputActions, vMixOutputFunctions } from './outputActions.js'
import { type OverlayActionsSchema, getOverlayActions, vMixOverlayFunctions } from './overlayActions.js'
import { type PlayListActionsSchema, getPlayListActions, vMixPlaylistFunctions } from './playlistActions.js'
import { type PresetActionsSchema, getPresetActions, vMixPresetFunctions } from './presetActions.js'
import { type PTZActionsSchema, getPTZActions, vMixPTZFunctions } from './ptzActions.js'
import { type ReplayActionsSchema, getReplayActions, vMixReplayFunctions } from './replayActions.js'
import { type ScriptingActionsSchema, getScriptingActions, vMixScriptingFunctions } from './scriptingActions.js'
import { type TitleActionsSchema, getTitleActions, vMixTitleFunctions } from './titleActions.js'
import { type TransitionActionsSchema, getTransitionActions, vMixTransitionFunctions } from './transitionActions.js'
import { type UtilActionsSchema, getUtilActions } from './utilActions.js'
import { type VideoCallActionsSchema, getVideoCallActions, vMixVideoCallFunctions } from './videoCallActions.js'
import { type VirtualSetActionsSchema, getVirtualSetActions, vMixVirtualSetFunctions } from './virtualSetActions.js'
import { type ZoomActionsSchema, getZoomActions, vMixZoomFunctions } from './zoomActions.js'

export type ActionsSchema = AudioActionsSchema &
  AudioPresetActionsSchema &
  BrowserActionsSchema &
  DataSourceActionsSchema &
  GeneralActionsSchema &
  InputActionsSchema &
  LayerActionsSchema &
  ListActionsSchema &
  NDIActionsSchema &
  OMTActionsSchema &
  PlaybackActionsSchema &
  OutputActionsSchema &
  OverlayActionsSchema &
  PlayListActionsSchema &
  PresetActionsSchema &
  PTZActionsSchema &
  ReplayActionsSchema &
  ScriptingActionsSchema &
  TitleActionsSchema &
  TransitionActionsSchema &
  UtilActionsSchema &
  VideoCallActionsSchema &
  VirtualSetActionsSchema &
  ZoomActionsSchema

export type ActionFunctionsList<T> = Record<Partial<keyof T>, FunctionIDs[]>

export type SendBasicCommand = (action: Readonly<CompanionActionEvent>) => Promise<void>

export function getActions(instance: VMixInstance): CompanionActionDefinitions<ActionsSchema> {
  /**
   * @param action Action callback object
   * @description Sends vMix functions/params from actions that don't require complex logic
   */
  const sendBasicCommand: SendBasicCommand = async (action) => {
    if (!instance.tcp) return
    let functionName = action.actionId

    if (action.options.functionID) {
      functionName = action.options.functionID as string
    }

    const parsedParams = Object.entries(action.options)
      .filter((param) => param[0] !== 'functionID')
      .map((param) => [param[0], typeof param[1] !== 'string' ? JSON.stringify(param[1]) : param[1]])
      .map((param) => {
        if (param[0] === 'mix') {
        	let mix = action.options.mix === 'Selected' ? instance.routingData.mix - 1 : parseMix(param[1])
					if (mix === null) mix = 0
          return ['mix', mix]
        } else {
					return param
				}
      })

    const encodedParams = parsedParams.map((param) => `${param[0]}=${encodeURIComponent(param[1])}`).join('&')

    return instance.tcp.sendCommand(`FUNCTION ${functionName} ${encodedParams}`)
  }

  return {
    ...getAudioActions(instance, sendBasicCommand),
    ...getAudioPresetActions(instance, sendBasicCommand),
    ...getBrowserActions(instance, sendBasicCommand),
    ...getDataSourceActions(instance, sendBasicCommand),
    ...getGeneralActions(instance, sendBasicCommand),
    ...getInputActions(instance, sendBasicCommand),
    ...getLayerActions(instance, sendBasicCommand),
    ...getListActions(instance, sendBasicCommand),
    ...getNDIActions(instance, sendBasicCommand),
    ...getOMTActions(instance, sendBasicCommand),
    ...getPlaybackActions(instance, sendBasicCommand),
    ...getOutputActions(instance, sendBasicCommand),
    ...getOverlayActions(instance, sendBasicCommand),
    ...getPlayListActions(instance, sendBasicCommand),
    ...getPresetActions(instance, sendBasicCommand),
    ...getPTZActions(instance, sendBasicCommand),
    ...getReplayActions(instance, sendBasicCommand),
    ...getScriptingActions(instance, sendBasicCommand),
    ...getTitleActions(instance, sendBasicCommand),
    ...getTransitionActions(instance, sendBasicCommand),
    ...getUtilActions(instance, sendBasicCommand),
    ...getVideoCallActions(instance, sendBasicCommand),
    ...getVirtualSetActions(instance, sendBasicCommand),
    ...getZoomActions(instance, sendBasicCommand),
  }
}

export const vMixFunctions = {
  ...vMixAudioFunctions,
  ...vMixBrowserFunctions,
  ...vMixDataSourceFunctions,
  ...vMixGeneralFunctions,
  ...vMixInputFunctions,
  ...vMixLayerFunctions,
  ...vMixListFunctions,
  ...vMixNDIFunctions,
  ...vMixOMTFunctions,
  ...vMixPlaybackFunctions,
  ...vMixOutputFunctions,
  ...vMixOverlayFunctions,
  ...vMixPlaylistFunctions,
  ...vMixPresetFunctions,
  ...vMixPTZFunctions,
  ...vMixReplayFunctions,
  ...vMixScriptingFunctions,
  ...vMixTitleFunctions,
  ...vMixTransitionFunctions,
  ...vMixVideoCallFunctions,
  ...vMixVirtualSetFunctions,
  ...vMixZoomFunctions,
}
