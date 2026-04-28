import type { CompanionActionEvent, CompanionActionDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'
import { type AudioActionsSchema, getAudioActions } from './audioActions.js'
import { type AudioPresetActionsSchema, getAudioPresetActions } from './audioPresetActions.js'
import { type BrowserActionsSchema, getBrowserActions } from './browserActions.js'
import { type DataSourceActionsSchema, getDataSourceActions } from './dataSourceActions.js'
import { type GeneralActionsSchema, getGeneralActions } from './generalActions.js'
import { type InputActionsSchema, getInputActions } from './inputActions.js'
import { type LayerActionsSchema, getLayerActions } from './layerActions.js'
import { type ListActionsSchema, getListActions } from './listActions.js'
import { type PlaybackActionsSchema, getPlaybackActions } from './playbackActions.js'
import { type OutputActionsSchema, getOutputActions } from './outputActions.js'
import { type OverlayActionsSchema, getOverlayActions } from './overlayActions.js'
import { type PlayListActionsSchema, getPlayListActions } from './playlistActions.js'
import { type PTZActionsSchema, getPTZActions } from './ptzActions.js'
import { type ReplayActionsSchema, getReplayActions } from './replayActions.js'
import { type ScriptingActionsSchema, getScriptingActions } from './scriptingActions.js'
import { type TitleActionsSchema, getTitleActions } from './titleActions.js'
import { type TransitionActionsSchema, getTransitionActions } from './transitionActions.js'
import { type UtilActionsSchema, getUtilActions } from './utilActions.js'
import { type VideoCallActionsSchema, getVideoCallActions } from './videoCallActions.js'
import { type VirtualSetActionsSchema, getVirtualSetActions } from './virtualSetActions.js'
import { type ZoomActionsSchema, getZoomActions } from './zoomActions.js'

export type ActionsSchema = AudioActionsSchema &
  AudioPresetActionsSchema &
  BrowserActionsSchema &
  DataSourceActionsSchema &
  GeneralActionsSchema &
  InputActionsSchema &
  LayerActionsSchema &
  ListActionsSchema &
  PlaybackActionsSchema &
  OutputActionsSchema &
  OverlayActionsSchema &
  PlayListActionsSchema &
  PTZActionsSchema &
  ReplayActionsSchema &
  ScriptingActionsSchema &
  TitleActionsSchema &
  TransitionActionsSchema &
  UtilActionsSchema &
  VideoCallActionsSchema &
  VirtualSetActionsSchema &
  ZoomActionsSchema

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
        if (param[0] === 'mix' && param[1].toLowerCase() === 'selected') {
          return ['mix', instance.routingData.mix.toString()]
        } else {
          return param
        }
      })
      .filter((param) => param[0] !== 'mixVariable')

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
    ...getPlaybackActions(instance, sendBasicCommand),
    ...getOutputActions(instance, sendBasicCommand),
    ...getOverlayActions(instance, sendBasicCommand),
    ...getPlayListActions(instance, sendBasicCommand),
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
