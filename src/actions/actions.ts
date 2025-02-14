import { CompanionActionEvent, SomeCompanionActionInputField } from '@companion-module/base'
import { AudioActions, AudioCallbacks, vMixAudioActions } from './audioActions'
import { BrowserActions, BrowserCallbacks, vMixBrowserActions } from './browserActions'
import { DataSourceActions, DataSourceCallbacks, vMixDataSourceActions } from './dataSourceActions'
import { GeneralActions, GeneralCallbacks, vMixGeneralActions } from './generalActions'
import { InputActions, InputCallbacks, vMixInputActions } from './inputActions'
import { LayerActions, LayerCallbacks, vMixLayerActions } from './layerActions'
import { ListActions, ListCallbacks, vMixListActions } from './listActions'
import { MediaActions, MediaCallbacks, vMixMediaActions } from './mediaActions'
import { OutputActions, OutputCallbacks, vMixOutputActions } from './outputActions'
import { OverlayActions, OverlayCallbacks, vMixOverlayActions } from './overlayActions'
import { PlayListActions, PlayListCallbacks, vMixPlayListActions } from './playlistActions'
import { PTZActions, PTZCallbacks, vMixPTZActions } from './ptzActions'
import { ReplayActions, ReplayCallbacks, vMixReplayActions } from './replayActions'
import { ScriptingActions, ScriptingCallbacks, vMixScriptingActions } from './scriptingActions'
import { TitleActions, TitleCallbacks, vMixTitleActions } from './titleActions'
import { TransitionActions, TransitionCallbacks, vMixTransitionActions } from './transitionActions'
import { UtilActions, UtilCallbacks, vMixUtilActions } from './utilActions'
import { VideoCallActions, VideoCallCallbacks, vMixVideoCallActions } from './videoCallActions'
import { VirtualSetActions, VirtualSetCallbacks, vMixVirtualSetActions } from './virtualSetActions'
import { ZoomActions, ZoomCallbacks, vMixZoomActions } from './zoomActions'
import VMixInstance from '../index'

type ActionOptionEntry = [string, string | number | boolean]

export type VMixActionKeys = keyof VMixActions

export type VMixActions =
  | AudioActions
  | BrowserActions
  | DataSourceActions
  | GeneralActions
  | InputActions
  | LayerActions
  | ListActions
  | MediaActions
  | OutputActions
  | OverlayActions
  | PlayListActions
  | PTZActions
  | ReplayActions
  | ScriptingActions
  | TitleActions
  | TransitionActions
  | UtilActions
  | VideoCallActions
  | VirtualSetActions
  | ZoomActions

export type ActionCallbacks =
  | AudioCallbacks
  | BrowserCallbacks
  | DataSourceCallbacks
  | GeneralCallbacks
  | InputCallbacks
  | LayerCallbacks
  | ListCallbacks
  | MediaCallbacks
  | OutputCallbacks
  | OverlayCallbacks
  | PlayListCallbacks
  | PTZCallbacks
  | ReplayCallbacks
  | ScriptingCallbacks
  | TitleCallbacks
  | TransitionCallbacks
  | UtilCallbacks
  | VideoCallCallbacks
  | VirtualSetCallbacks
  | ZoomCallbacks

// Force options to have a default to prevent sending undefined values
type InputFieldWithDefault = Exclude<SomeCompanionActionInputField, 'default'> & {
  default: string | number | boolean | null
}

export interface ActionCallback<A, O> {
  actionId: A
  options: Readonly<O>
}

// Actions specific to vMix
export interface VMixAction<T> {
  name: string
  description?: string
  options: InputFieldWithDefault[]
  callback: (action: Readonly<Omit<CompanionActionEvent, 'options' | 'id'> & T>) => void | Promise<void>
  subscribe?: (action: Readonly<Omit<CompanionActionEvent, 'options' | 'id'> & T>) => void
  unsubscribe?: (action: Readonly<Omit<CompanionActionEvent, 'options' | 'id'> & T>) => void
}

export function getActions(instance: VMixInstance): VMixActions {
  /**
   * @param action Action callback object
   * @description Sends vMix functions/params from actions that don't require complex logic
   */
  const sendBasicCommand = async (action: Readonly<ActionCallbacks>): Promise<void> => {
    let functionName: string = action.actionId

    if ('functionID' in action.options) {
      functionName = action.options.functionID
    }

    const parseSelectedOptions = (param: ActionOptionEntry | string): ActionOptionEntry | string => {
      if (param[0] === 'mix' && param[1] === -1) {
        return ['mix', instance.routingData.mix]
      } else {
        return param
      }
    }

    // Parse param value based on buttonModifier state
    const parseButtonShift = (param: ActionOptionEntry): ActionOptionEntry => {
      if (typeof param[1] === 'string' && param[1].includes(instance.config.shiftDelimiter)) {
        const paramSplit = param[1].split(instance.config.shiftDelimiter)
        return [param[0], paramSplit[instance.buttonShift.state]]
      } else {
        return param
      }
    }

    const parseMix = (value: string): number => {
      const mix = parseInt(value, 10)

      if (isNaN(mix) || mix < 1) {
        instance.log('warn', 'Mix must be an integer >= 1')
        return 0
      } else {
        return mix - 1
      }
    }

    let parsedParams: [string, any][] = []
    const params = Object.entries(action.options)
      .filter((param) => param[0] !== 'functionID')
      .map(parseButtonShift)

    for (const param of params) {
      if (typeof param[1] === 'string') {
        param[1] = await instance.parseVariablesInString(param[1])
        if (param[0] === 'mixVariable') param[1] = parseMix(param[1])
        parsedParams.push(param)
      } else {
        parsedParams.push(param)
      }
    }

    parsedParams = parsedParams
      .map((param) => {
        if (param[0] === 'mix' && param[1] === -2) {
          const mixVariable = parsedParams.find((x) => x[0] === 'mixVariable')
          param[1] = mixVariable?.[1] ?? param[1]
        }
        return param
      })
      .filter((param) => param[0] !== 'mixVariable')

    const encodedParams = parsedParams
      .map(parseSelectedOptions)
      .map((param) => `${param[0]}=${encodeURIComponent(param[1])}`)
      .join('&')

    if (instance.tcp) instance.tcp.sendCommand(`FUNCTION ${functionName} ${encodedParams}`)
  }

  return {
    ...vMixAudioActions(instance, sendBasicCommand),
    ...vMixBrowserActions(instance, sendBasicCommand),
    ...vMixDataSourceActions(instance, sendBasicCommand),
    ...vMixGeneralActions(instance, sendBasicCommand),
    ...vMixInputActions(instance, sendBasicCommand),
    ...vMixLayerActions(instance, sendBasicCommand),
    ...vMixListActions(instance, sendBasicCommand),
    ...vMixMediaActions(instance, sendBasicCommand),
    ...vMixOutputActions(instance, sendBasicCommand),
    ...vMixOverlayActions(instance, sendBasicCommand),
    ...vMixPlayListActions(instance, sendBasicCommand),
    ...vMixPTZActions(instance, sendBasicCommand),
    ...vMixReplayActions(instance, sendBasicCommand),
    ...vMixScriptingActions(instance, sendBasicCommand),
    ...vMixTitleActions(instance, sendBasicCommand),
    ...vMixTransitionActions(instance, sendBasicCommand),
    ...vMixUtilActions(instance, sendBasicCommand),
    ...vMixVideoCallActions(instance, sendBasicCommand),
    ...vMixVirtualSetActions(instance, sendBasicCommand),
    ...vMixZoomActions(instance, sendBasicCommand)
  }
}
