import { CompanionActionEvent, SomeCompanionActionInputField } from '@companion-module/base'
import { options, TRANSITIONS } from './utils'
import { Timer } from './timers'
import VMixInstance from './index'

type ActionOptionEntry = [string, string | number | boolean]
type MixOptionEntry = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | -1

export interface VMixActions {
  // Input
  previewInput: VMixAction<PreviewInputCallback>
  previewInputNext: VMixAction<PreviewInputNextCallback>
  previewInputPrevious: VMixAction<PreviewInputPreviousCallback>

  // Transition
  programCut: VMixAction<ProgramCutCallback>
  transitionMix: VMixAction<TransitionMixCallback>
  transition: VMixAction<TransitionCallback>
  setTransitionEffect: VMixAction<SetTransitionEffectCallback>
  setTransitionDuration: VMixAction<SetTransitionDurationCallback>
  quickPlay: VMixAction<QuickPlayCallback>

  // Output
  outputSet: VMixAction<OutputSetCallback>
  toggleFunctions: VMixAction<ToggleFunctionsCallback>

  // Playlist
  playListFunctions: VMixAction<PlayListFunctionsCallback>
  selectPlayList: VMixAction<SelectPlayListCallback>

  // Overlay
  overlayFunctions: VMixAction<OverlayFunctionsCallback>

  // Position
  setInputPostion: VMixAction<SetInputPositionCallback>

  // Layer
  multiViewOverlay: VMixAction<MultiViewOverlayCallback>
  setMultiViewOverlay: VMixAction<SetMultiViewOverlayCallback>
  setMultiViewOverlayOnPreview: VMixAction<SetMultiViewOverlayOnPreviewCallback>
  setMultiViewOverlayOnProgram: VMixAction<SetMultiViewOverlayOnProgramCallback>
  setMultiViewOverlayDestinationInput: VMixAction<SetMultiViewOverlayDestinationInputCallback>
  setMultiViewOverlayDestinationLayer: VMixAction<SetMultiViewOverlayDestinationLayerCallback>
  setMultiViewOverlaySourceInput: VMixAction<SetMultiViewOverlaySourceInputCallback>
  clearMultiViewOverlaySelection: VMixAction<ClearMultiViewOverlaySelectionCallback>

  // Virtual Set
  virtualSet: VMixAction<VirtualSetCallback>

  // Video Call
  videoCallAudioSource: VMixAction<VideoCallAudioSourceCallback>
  videoCallVideoSource: VMixAction<VideoCallVideoSourceCallback>

  // Audio
  audioBus: VMixAction<AudioBusCallback>
  busXSendToMaster: VMixAction<BusXSendToMasterCallback>
  busXAudio: VMixAction<BusXAudioCallback>
  audio: VMixAction<AudioCallback>
  busXSolo: VMixAction<BusXSoloCallback>
  solo: VMixAction<SoloCallback>
  setVolumeFade: VMixAction<SetVolumeFadeCallback>
  audioPlugin: VMixAction<AudioPluginCallback>
  audioChannelMatrixApplyPreset: VMixAction<AudioChannelMatrixApplyPresetCallback>

  // Title
  controlCountdown: VMixAction<ControlCountdownCallback>
  setCountdown: VMixAction<SetCountdownCallback>
  changeCountdown: VMixAction<ChangeCountdownCallback>
  adjustCountdown: VMixAction<AdjustCountdownCallback>
  setText: VMixAction<SetTextCallback>
  setColor: VMixAction<SetColorCallback>
  selectTitlePreset: VMixAction<SelectTitlePresetCallback>
  titlePreset: VMixAction<TitlePresetCallback>
  titleBeginAnimation: VMixAction<TitleBeginAnimationCallback>

  // Data Source
  dataSourceAutoNext: VMixAction<DataSourceAutoNextCallback>
  dataSourceNextRow: VMixAction<DataSourceNextRowCallback>
  dataSourcePreviousRow: VMixAction<DataSourcePreviousRowCallback>
  dataSourceSelectRow: VMixAction<DataSourceSelectRowCallback>

  // Slide / List
  nextPicture: VMixAction<NextPictureCallback>
  previousPicture: VMixAction<PreviousPictureCallback>
  selectIndex: VMixAction<SelectIndexCallback>

  // Video
  videoActions: VMixAction<VideoActionsCallback>
  videoPlayhead: VMixAction<VideoPlayheadCallback>
  videoMark: VMixAction<VideoMarkCallback>

  // Replay
  replayACamera: VMixAction<ReplayACameraCallback>
  replayBCamera: VMixAction<ReplayBCameraCallback>
  replayCamera: VMixAction<ReplayCameraCallback>
  replaySelectChannel: VMixAction<ReplaySelectChannelCallback>
  replaySwapChannels: VMixAction<ReplaySwapChannelsCallback>
  replayMark: VMixAction<ReplayMarkCallback>
  replayMoveInOut: VMixAction<ReplayMoveInOutCallback>
  replayUpdateInOut: VMixAction<ReplayUpdateInOutCallback>
  replaySelectEvents: VMixAction<ReplaySelectEventsCallback>
  replayChangeDirection: VMixAction<ReplayChangeDirectionCallback>
  replayChangeSpeed: VMixAction<ReplayChangeSpeedCallback>
  replayMoveEvent: VMixAction<ReplayMoveEventCallback>
  replayMoveEventUpDown: VMixAction<ReplayMoveEventUpDownCallback>
  replayFastForwardBackward: VMixAction<ReplayFastForwardBackwardCallback>
  replayJumpFrames: VMixAction<ReplayJumpFramesCallback>
  replayRecording: VMixAction<ReplayRecordingCallback>
  replayJumpToNow: VMixAction<ReplayJumpToNowCallback>
  replayLiveToggle: VMixAction<ReplayLiveToggleCallback>
  replayPlay: VMixAction<ReplayPlayCallback>
  replayPause: VMixAction<ReplayPauseCallback>
  replayPlayEvent: VMixAction<ReplayPlayEventCallback>
  replayPlaySelectedEventToOutput: VMixAction<ReplayPlaySelectedEventToOutputCallback>
  replayPlayEventsByIDToOutput: VMixAction<ReplayPlayEventsByIDToOutputCallback>
  replayToggleCamera: VMixAction<ReplayToggleCameraCallback>

  // Browser
  browser: VMixAction<BrowserCallback>
  browserNavigate: VMixAction<BrowserNavigateCallback>

  // General
  keyPress: VMixAction<KeyPressCallback>
  tbar: VMixAction<TbarCallback>
  dynamic: VMixAction<DynamicCallback>

  // Scripting
  scriptStart: VMixAction<ScriptStartCallback>
  scriptStop: VMixAction<ScriptStopCallback>
  scriptStopAll: VMixAction<ScriptStopAllCallback>
  command: VMixAction<CommandCallback>

  // Util
  mixSelect: VMixAction<MixSelectCallback>
  buttonShift: VMixAction<ButtonShiftCallback>
  dataSourceTimer: VMixAction<DataSourceTimer>
  dataSourceTimerSet: VMixAction<DataSourceTimerSet>
  dataSourceTimerCreateTime: VMixAction<DataSourceTimerCreateTime>
  dataSourceTimerUpdateTime: VMixAction<DataSourceTimerUpdateTime>

  // Index signature
  [key: string]: VMixAction<any>
}

// Input
interface PreviewInputCallback {
  actionId: 'previewInput'
  options: Readonly<{
    input: string
    mix: MixOptionEntry
  }>
}

interface PreviewInputNextCallback {
  actionId: 'previewInputNext'
  options: Record<string, never>
}

interface PreviewInputPreviousCallback {
  actionId: 'previewInputPrevious'
  options: Record<string, never>
}

// Transition
interface ProgramCutCallback {
  actionId: 'programCut'
  options: Readonly<{
    input: string
    mix: MixOptionEntry
  }>
}

interface TransitionMixCallback {
  actionId: 'transitionMix'
  options: Readonly<{
    mix: MixOptionEntry
    functionID: (typeof TRANSITIONS)[number]
    duration: number
  }>
}

interface TransitionCallback {
  actionId: 'transition'
  options: Readonly<{
    functionID:
      | 'Transition1'
      | 'Transition2'
      | 'Transition3'
      | 'Transition4'
      | 'Stinger1'
      | 'Stinger2'
      | 'Stinger3'
      | 'Stinger4'
  }>
}

interface SetTransitionEffectCallback {
  actionId: 'setTransitionEffect'
  options: Readonly<{
    functionID: 'SetTransitionEffect1' | 'SetTransitionEffect2' | 'SetTransitionEffect3' | 'SetTransitionEffect4'
    value: (typeof TRANSITIONS)[number]
  }>
}

interface SetTransitionDurationCallback {
  actionId: 'setTransitionDuration'
  options: Readonly<{
    functionID:
      | 'SetTransitionDuration1'
      | 'SetTransitionDuration2'
      | 'SetTransitionDuration3'
      | 'SetTransitionDuration4'
    value: number
  }>
}

interface QuickPlayCallback {
  actionId: 'quickPlay'
  options: Readonly<{
    input: string
  }>
}

// Output
interface OutputSetCallback {
  actionId: 'outputSet'
  options: Readonly<{
    functionID:
      | 'SetOutput2'
      | 'SetOutput3'
      | 'SetOutput4'
      | 'SetOutputExternal2'
      | 'SetOutputFullscreen'
      | 'SetOutputFullscreen2'
    value: 'Output' | 'Preview' | 'MultiView' | 'Replay' | 'Input'
    input: string
  }>
}

interface ToggleFunctionsCallback {
  actionId: 'toggleFunctions'
  options: Readonly<{
    functionID:
      | 'StartStopMultiCorder'
      | 'StartStopRecording'
      | 'StartStopStreaming'
      | 'StartStopExternal'
      | 'Fullscreen'
      | 'FadeToBlack'
    value: '' | '0' | '1' | '2'
  }>
}

// Playlist
interface PlayListFunctionsCallback {
  actionId: 'playListFunctions'
  options: Readonly<{
    functionID: 'StartPlayList' | 'StopPlayList' | 'NextPlayListEntry' | 'PreviousPlayListEntry'
  }>
}

interface SelectPlayListCallback {
  actionId: 'selectPlayList'
  options: Readonly<{
    value: string
  }>
}

// Overlay
interface OverlayFunctionsCallback {
  actionId: 'overlayFunctions'
  options: Readonly<{
    functionID:
      | 'OverlayInput1'
      | 'OverlayInput2'
      | 'OverlayInput3'
      | 'OverlayInput4'
      | 'PreviewOverlayInput1'
      | 'PreviewOverlayInput2'
      | 'PreviewOverlayInput3'
      | 'PreviewOverlayInput4'
      | 'OverlayInput1In'
      | 'OverlayInput2In'
      | 'OverlayInput3In'
      | 'OverlayInput4In'
      | 'OverlayInput1Out'
      | 'OverlayInput2Out'
      | 'OverlayInput3Out'
      | 'OverlayInput4Out'
      | 'OverlayInput1Off'
      | 'OverlayInput2Off'
      | 'OverlayInput3Off'
      | 'OverlayInput4Off'
      | 'OverlayInputAllOff'
      | 'OverlayInput1Zoom'
      | 'OverlayInput2Zoom'
      | 'OverlayInput3Zoom'
      | 'OverlayInput4Zoom'
    input: string
  }>
}

// Position
interface SetInputPositionCallback {
  actionId: 'SetPosition'
  options: Readonly<{
    functionID: 'SetPanX' | 'SetPanY' | 'SetZoom'
    input: string
    adjustment: 'Set' | 'Increase' | 'Decrease'
    value: number
  }>
}

// Layer
interface MultiViewOverlayCallback {
  actionId: 'multiViewOverlay'
  options: Readonly<{
    functionID: 'MultiViewOverlay' | 'MultiViewOverlayOff' | 'MultiViewOverlayOn'
    input: string
    layer: number
  }>
}

interface SetMultiViewOverlayCallback {
  actionId: 'setMultiViewOverlay'
  options: Readonly<{
    input: string
    layer: number
    layerInput: string
  }>
}

interface SetMultiViewOverlayOnPreviewCallback {
  actionId: 'setMultiViewOverlayOnPreview'
  options: Readonly<{
    layer: number
    layerInput: string
    mix: MixOptionEntry
  }>
}

interface SetMultiViewOverlayOnProgramCallback {
  actionId: 'setMultiViewOverlayOnProgram'
  options: Readonly<{
    layer: number
    layerInput: string
    mix: MixOptionEntry
  }>
}

interface SetMultiViewOverlayDestinationInputCallback {
  actionId: 'setMultiViewOverlayDestinationInput'
  options: Readonly<{
    destinationInput: string
  }>
}

interface SetMultiViewOverlayDestinationLayerCallback {
  actionId: 'setMultiViewOverlayDestinationLayer'
  options: Readonly<{
    destinationLayer: string
  }>
}

interface SetMultiViewOverlaySourceInputCallback {
  actionId: 'setMultiViewOverlaySourceInput'
  options: Readonly<{
    sourceIndex: string
  }>
}

interface ClearMultiViewOverlaySelectionCallback {
  actionId: 'clearMultiViewOverlaySelection'
  options: Record<string, never>
}

// Virtual Set
interface VirtualSetCallback {
  actionId: 'virtualSet'
  options: Readonly<{
    input: string
    value: '1' | '2' | '3' | '4'
  }>
}

// Video Call
interface VideoCallAudioSourceCallback {
  actionId: 'videoCallAudioSource'
  options: Readonly<{
    input: string
    value: 'Master' | 'Headphones' | 'BusA' | 'BusB' | 'BusC' | 'BusD' | 'BusE' | 'BusF' | 'BusG'
  }>
}

interface VideoCallVideoSourceCallback {
  actionId: 'videoCallVideoSource'
  options: Readonly<{
    input: string
    value: 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'
  }>
}

// Audio
interface AudioBusCallback {
  actionId: 'audioBus'
  options: Readonly<{
    input: string
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    functionID: 'AudioBus' | 'AudioBusOn' | 'AudioBusOff'
  }>
}

interface BusXSendToMasterCallback {
  actionId: 'busXSendToMaster'
  options: Readonly<{
    value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  }>
}

interface BusXAudioCallback {
  actionId: 'busXAudio'
  options: Readonly<{
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    functionID: 'BusXAudio' | 'BusXAudioOn' | 'BusXAudioOff'
  }>
}

interface AudioCallback {
  actionId: 'audio'
  options: Readonly<{
    input: string
    functionID: 'Audio' | 'AudioOn' | 'AudioOff'
  }>
}

interface BusXSoloCallback {
  actionId: 'busXSolo'
  options: Readonly<{
    value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    functionID: 'BusXSolo' | 'BusXSoloOn' | 'BusXSoloOff'
  }>
}

interface SoloCallback {
  actionId: 'solo'
  options: Readonly<{
    input: string
    functionID: 'Solo' | 'SoloOn' | 'SoloOff'
  }>
}

interface SetVolumeFadeCallback {
  actionId: 'setVolumeFade'
  options: Readonly<{
    fadeMin: number
    fadeTime: number
    input: string
  }>
}

interface AudioPluginCallback {
  actionId: 'audioPlugin'
  options: Readonly<{
    input: string
    value: number
    functionID: 'AudioPluginOnOff' | 'AudioPluginOn' | 'AudioPluginOff' | 'AudioPluginShow'
  }>
}

interface AudioChannelMatrixApplyPresetCallback {
  actionId: 'audioChannelMatrixApplyPreset'
  options: Readonly<{
    input: string
    value: string
  }>
}

// Title
interface ControlCountdownCallback {
  actionId: 'controlCountdown'
  options: Readonly<{
    functionID: 'StartCountdown' | 'StopCountdown' | 'PauseCountdown'
    input: string
    selectedIndex: string
  }>
}

interface SetCountdownCallback {
  actionId: 'setCountdown'
  options: Readonly<{
    value: string
    input: string
    selectedIndex: string
  }>
}

interface ChangeCountdownCallback {
  actionId: 'changeCountdown'
  options: Readonly<{
    value: string
    input: string
    selectedIndex: string
  }>
}

interface AdjustCountdownCallback {
  actionId: 'adjustCountdown'
  options: Readonly<{
    value: string
    input: string
    selectedIndex: string
  }>
}

interface SetTextCallback {
  actionId: 'setText'
  options: Readonly<{
    input: string
    selectedIndex: string
    adjustment: 'Set' | 'Increment' | 'Decrement'
    value: string
  }>
}

interface SetColorCallback {
  actionId: 'setColor'
  options: Readonly<{
    input: string
    selectedIndex: string
    value: string
  }>
}

interface SelectTitlePresetCallback {
  actionId: 'selectTitlePreset'
  options: Readonly<{
    input: string
    value: string
  }>
}

interface TitlePresetCallback {
  actionId: 'titlePreset'
  options: Readonly<{
    input: string
    functionID: 'NextTitlePreset' | 'PreviousTitlePreset'
  }>
}

interface TitleBeginAnimationCallback {
  actionId: 'titleBeginAnimation'
  options: Readonly<{
    input: string
    value:
      | 'TransitionIn'
      | 'TransitionOut'
      | 'Page1'
      | 'Page2'
      | 'Page3'
      | 'Page4'
      | 'Page5'
      | 'Page6'
      | 'Page7'
      | 'Page8'
      | 'Page9'
      | 'Page10'
      | 'Continuous'
      | 'DataChangeIn'
      | 'DataChangeOut'
  }>
}

// Data Source
interface DataSourceAutoNextCallback {
  actionId: 'dataSourceAutoNext'
  options: Readonly<{
    functionID: 'DataSourceAutoNextOn' | 'DataSourceAutoNextOff' | 'DataSourceAutoNextOnOff'
    value: string
  }>
}

interface DataSourceNextRowCallback {
  actionId: 'dataSourceNextRow'
  options: Readonly<{
    value: string
  }>
}

interface DataSourcePreviousRowCallback {
  actionId: 'dataSourcePreviousRow'
  options: Readonly<{
    value: string
  }>
}

interface DataSourceSelectRowCallback {
  actionId: 'dataSourceSelectRow'
  options: Readonly<{
    value: string
  }>
}

// Slide / List
interface NextPictureCallback {
  actionId: 'nextPicture'
  options: Readonly<{
    input: string
  }>
}

interface PreviousPictureCallback {
  actionId: 'previousPicture'
  options: Readonly<{
    input: string
  }>
}

interface SelectIndexCallback {
  actionId: 'selectIndex'
  options: Readonly<{
    input: string
    value: string
  }>
}

// Media
interface VideoActionsCallback {
  actionId: 'videoActions'
  options: Readonly<{
    input: string
    inputType: boolean
    functionID: 'Play' | 'Pause' | 'PlayPause' | 'Restart' | 'LoopOn' | 'LoopOff'
  }>
}

interface VideoPlayheadCallback {
  actionId: 'videoPlayhead'
  options: Readonly<{
    input: string
    inputType: boolean
    adjustment: 'Set' | 'Increment' | 'Decrement'
    value: number
  }>
}

interface VideoMarkCallback {
  actionId: 'videoMark'
  options: Readonly<{
    input: string
    inputType: boolean
    functionID: 'MarkIn' | 'MarkOut' | 'MarkReset' | 'MarkResetIn' | 'MarkResetOut'
  }>
}

// Replay
interface ReplayACameraCallback {
  actionId: 'replayACamera'
  options: Readonly<{
    functionID:
      | 'ReplayACamera1'
      | 'ReplayACamera2'
      | 'ReplayACamera3'
      | 'ReplayACamera4'
      | 'ReplayACamera5'
      | 'ReplayACamera6'
      | 'ReplayACamera7'
      | 'ReplayACamera8'
  }>
}

interface ReplayBCameraCallback {
  actionId: 'replayBCamera'
  options: Readonly<{
    functionID:
      | 'ReplayBCamera1'
      | 'ReplayBCamera2'
      | 'ReplayBCamera3'
      | 'ReplayBCamera4'
      | 'ReplayBCamera5'
      | 'ReplayBCamera6'
      | 'ReplayBCamera7'
      | 'ReplayBCamera8'
  }>
}

interface ReplayCameraCallback {
  actionId: 'replayCamera'
  options: Readonly<{
    functionID:
      | 'ReplayCamera1'
      | 'ReplayCamera2'
      | 'ReplayCamera3'
      | 'ReplayCamera4'
      | 'ReplayCamera5'
      | 'ReplayCamera6'
      | 'ReplayCamera7'
      | 'ReplayCamera8'
  }>
}

interface ReplaySelectChannelCallback {
  actionId: 'replaySelectChannel'
  options: Readonly<{
    functionID: 'replaySelectChannelAB' | 'replaySelectChannelA' | 'replaySelectChannelB'
  }>
}

interface ReplaySwapChannelsCallback {
  actionId: 'replaySwapChannels'
  options: Record<string, never>
}

interface ReplayMarkCallback {
  actionId: 'replayMark'
  options: Readonly<{
    functionID:
      | 'ReplayMarkCancel'
      | 'ReplayMarkIn'
      | 'ReplayMarkInLive'
      | 'ReplayMarkInOut'
      | 'ReplayMarkInOutLive'
      | 'ReplayMarkInOutRecorded'
      | 'ReplayMarkInRecorded'
      | 'ReplayMarkInRecordedNow'
      | 'ReplayMarkOut'
    value: number
  }>
}

interface ReplayMoveInOutCallback {
  actionId: 'replayMoveInOut'
  options: Readonly<{
    functionID: 'ReplayMoveSelectedInPoint' | 'ReplayMoveSelectedOutPoint'
    value: number
  }>
}

interface ReplayUpdateInOutCallback {
  actionId: 'replayUpdateInOut'
  options: Readonly<{
    functionID: 'ReplayUpdateSelectedInPoint' | 'ReplayUpdateSelectedOutPoint'
  }>
}

interface ReplaySelectEventsCallback {
  actionId: 'replaySelectEvents'
  options: Readonly<{
    functionID:
      | 'ReplaySelectEvents1'
      | 'ReplaySelectEvents2'
      | 'ReplaySelectEvents3'
      | 'ReplaySelectEvents4'
      | 'ReplaySelectEvents5'
      | 'ReplaySelectEvents6'
      | 'ReplaySelectEvents7'
      | 'ReplaySelectEvents8'
      | 'ReplaySelectEvents9'
      | 'ReplaySelectEvents10'
      | 'ReplaySelectEvents11'
      | 'ReplaySelectEvents12'
      | 'ReplaySelectEvents13'
      | 'ReplaySelectEvents14'
      | 'ReplaySelectEvents15'
      | 'ReplaySelectEvents16'
      | 'ReplaySelectEvents17'
      | 'ReplaySelectEvents18'
      | 'ReplaySelectEvents19'
      | 'ReplaySelectEvents20'
    channel: 'Current' | 'A' | 'B'
  }>
}

interface ReplayChangeDirectionCallback {
  actionId: 'replayChangeDirection'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
  }>
}

interface ReplayChangeSpeedCallback {
  actionId: 'replayChangeSpeed'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
    value: number
  }>
}

interface ReplayMoveEventCallback {
  actionId: 'replayMoveEvent'
  options: Readonly<{
    functionID: 'ReplayMoveLastEvent' | 'ReplayMoveSelectedEvent'
    value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  }>
}

interface ReplayMoveEventUpDownCallback {
  actionId: 'replayMoveEventUpDown'
  options: Readonly<{
    functionID: 'ReplayMoveSelectedEventUp' | 'ReplayMoveSelectedEventDown'
  }>
}

interface ReplayFastForwardBackwardCallback {
  actionId: 'replayFastForwardBackward'
  options: Readonly<{
    functionID: 'ReplayFastForward' | 'ReplayFastBackward'
    channel: 'Current' | 'A' | 'B'
    value: number
  }>
}

interface ReplayJumpFramesCallback {
  actionId: 'replayJumpFrames'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
    value: number
  }>
}

interface ReplayRecordingCallback {
  actionId: 'replayRecording'
  options: Readonly<{
    functionID: 'ReplayStartRecording' | 'ReplayStopRecording' | 'ReplayStartStopRecording'
  }>
}

interface ReplayJumpToNowCallback {
  actionId: 'replayJumpToNow'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
  }>
}

interface ReplayLiveToggleCallback {
  actionId: 'replayLiveToggle'
  options: Record<string, never>
}

interface ReplayPlayCallback {
  actionId: 'replayPlay'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
  }>
}

interface ReplayPauseCallback {
  actionId: 'replayPause'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
  }>
}

interface ReplayPlayEventCallback {
  actionId: 'replayPlayEvent'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
    value: number
  }>
}

interface ReplayPlaySelectedEventToOutputCallback {
  actionId: 'replayPlaySelectedEventToOutput'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
  }>
}

interface ReplayPlayEventsByIDToOutputCallback {
  actionId: 'replayPlayEventsByIDToOutput'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
    value: number
  }>
}

interface ReplayToggleCameraCallback {
  actionId: 'replayToggleCamera'
  options: Readonly<{
    camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  }>
}

// Browser
interface BrowserCallback {
  actionId: 'browser'
  options: Readonly<{
    input: string
    functionID:
      | 'BrowserReload'
      | 'BrowserBack'
      | 'BrowserForward'
      | 'BrowserKeyboardDisabled'
      | 'BrowserKeyboardEnabled'
      | 'BrowserMouseDisabled'
      | 'BrowserMouseEnabled'
  }>
}

interface BrowserNavigateCallback {
  actionId: 'browserNavigate'
  options: Readonly<{
    input: string
    value: string
    url?: string
  }>
}

// General
interface KeyPressCallback {
  actionId: 'keyPress'
  options: Readonly<{
    value: string
  }>
}

interface TbarCallback {
  actionId: 'setFader'
  options: Readonly<{
    value: number
  }>
}

interface DynamicCallback {
  actionId: 'dynamic'
  options: Readonly<{
    type: 'Input' | 'Value'
    number: '1' | '2' | '3' | '4'
    value: string
  }>
}

// Scripting
interface ScriptStartCallback {
  actionId: 'scriptStart'
  options: Readonly<{
    value: string
  }>
}

interface ScriptStopCallback {
  actionId: 'scriptStop'
  options: Readonly<{
    value: string
  }>
}

interface ScriptStopAllCallback {
  actionId: 'scriptStopAll'
  options: Record<string, never>
}

interface CommandCallback {
  actionId: 'command'
  options: Readonly<{
    command: string
    encode: boolean
  }>
}

// Util
interface MixSelectCallback {
  actionId: 'mixSelect'
  options: Readonly<{
    mix: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
  }>
}

interface ButtonShiftCallback {
  actionId: 'buttonShift'
  options: Record<string, never>
}

interface DataSourceTimer {
  actionId: 'dataSourceTimer'
  options: Readonly<{
    id: string
    state: 'start' | 'stop' | 'reset'
  }>
}

interface DataSourceTimerSet {
  actionId: 'dataSourceTimerSet'
  options: Readonly<{
    id: string
    time: string
  }>
}

interface DataSourceTimerCreateTime {
  actionId: 'dataSourceTimerCreateTime'
  options: Readonly<{
    id: string
    time: number
  }>
}

interface DataSourceTimerUpdateTime {
  actionId: 'dataSourceTimerCreateTime'
  options: Readonly<{
    id: string
    type: 'set' | 'reset'
    time: number
    value: string
  }>
}

export type ActionCallbacks =
  // Input
  | PreviewInputCallback
  | PreviewInputNextCallback
  | PreviewInputPreviousCallback

  // Transition
  | ProgramCutCallback
  | TransitionMixCallback
  | TransitionCallback
  | SetTransitionEffectCallback
  | SetTransitionDurationCallback
  | QuickPlayCallback

  // Output
  | OutputSetCallback
  | ToggleFunctionsCallback

  // Playlist
  | PlayListFunctionsCallback
  | SelectPlayListCallback

  // Overlay
  | OverlayFunctionsCallback

  // Position
  | SetInputPositionCallback

  // Layer
  | MultiViewOverlayCallback
  | SetMultiViewOverlayCallback
  | SetMultiViewOverlayOnPreviewCallback
  | SetMultiViewOverlayOnProgramCallback
  | SetMultiViewOverlayDestinationInputCallback
  | SetMultiViewOverlayDestinationLayerCallback
  | SetMultiViewOverlaySourceInputCallback
  | ClearMultiViewOverlaySelectionCallback

  // Virtual Set
  | VirtualSetCallback

  // Video Call
  | VideoCallAudioSourceCallback
  | VideoCallVideoSourceCallback

  // Audio
  | AudioBusCallback
  | BusXSendToMasterCallback
  | BusXAudioCallback
  | AudioCallback
  | BusXSoloCallback
  | SoloCallback
  | SetVolumeFadeCallback
  | AudioPluginCallback
  | AudioChannelMatrixApplyPresetCallback

  // Title
  | ControlCountdownCallback
  | SetCountdownCallback
  | ChangeCountdownCallback
  | AdjustCountdownCallback
  | SetTextCallback
  | SetColorCallback
  | SelectTitlePresetCallback
  | TitlePresetCallback
  | TitleBeginAnimationCallback

  // Data Source
  | DataSourceAutoNextCallback
  | DataSourceNextRowCallback
  | DataSourcePreviousRowCallback
  | DataSourceSelectRowCallback

  // Slide / List
  | NextPictureCallback
  | PreviousPictureCallback
  | SelectIndexCallback

  // Media
  | VideoActionsCallback
  | VideoPlayheadCallback
  | VideoMarkCallback

  // Replay
  | ReplayACameraCallback
  | ReplayBCameraCallback
  | ReplayCameraCallback
  | ReplaySelectChannelCallback
  | ReplaySwapChannelsCallback
  | ReplayMarkCallback
  | ReplayMoveInOutCallback
  | ReplayUpdateInOutCallback
  | ReplaySelectEventsCallback
  | ReplayChangeDirectionCallback
  | ReplayChangeSpeedCallback
  | ReplayMoveEventCallback
  | ReplayMoveEventUpDownCallback
  | ReplayFastForwardBackwardCallback
  | ReplayJumpFramesCallback
  | ReplayRecordingCallback
  | ReplayJumpToNowCallback
  | ReplayLiveToggleCallback
  | ReplayPlayCallback
  | ReplayPauseCallback
  | ReplayPlayEventCallback
  | ReplayPlaySelectedEventToOutputCallback
  | ReplayPlayEventsByIDToOutputCallback
  | ReplayToggleCameraCallback

  // Browser
  | BrowserCallback
  | BrowserNavigateCallback

  // General
  | KeyPressCallback
  | TbarCallback
  | DynamicCallback

  // Scripting
  | ScriptStartCallback
  | ScriptStopCallback
  | ScriptStopAllCallback
  | CommandCallback

  // Util
  | MixSelectCallback
  | ButtonShiftCallback
  | DataSourceTimer
  | DataSourceTimerCreateTime
  | DataSourceTimerUpdateTime

// Force options to have a default to prevent sending undefined values
type InputFieldWithDefault = Exclude<SomeCompanionActionInputField, 'default'> & {
  default: string | number | boolean | null
}

// Actions specific to vMix
export interface VMixAction<T> {
  name: string
  description?: string
  options: InputFieldWithDefault[]
  callback: (action: Readonly<Omit<CompanionActionEvent, 'options' | 'id'> & T>) => void
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

    const parsedParams = []
    const params = Object.entries(action.options)
      .filter((param) => param[0] !== 'functionID')
      .map(parseButtonShift)

    for (const param of params) {
      if (typeof param === 'string') {
        const parsed = await instance.parseVariablesInString(param)
        parsedParams.push(parsed)
      } else {
        parsedParams.push(param)
      }
    }

    const encodedParams = parsedParams
      .map(parseSelectedOptions)
      .map((param) => `${param[0]}=${encodeURIComponent(param[1])}`)
      .join('&')

    if (instance.tcp) instance.tcp.sendCommand(`FUNCTION ${functionName} ${encodedParams}`)
  }

  return {
    // Input
    previewInput: {
      name: 'Input - Send Input to Preview',
      options: [options.input, options.mixSelect],
      callback: sendBasicCommand,
    },

    previewInputNext: {
      name: 'Input - Send Next input to Preview',
      options: [],
      callback: sendBasicCommand,
    },

    previewInputPrevious: {
      name: 'Input - Send Previous input to Preview',
      options: [],
      callback: sendBasicCommand,
    },

    // Transition
    programCut: {
      name: 'Transition - Send Input to Program',
      options: [options.input, options.mixSelect],
      callback: (action) => {
        const programCut: any = {
          id: 'programCut',
          options: {
            functionID: 'CutDirect',
            input: action.options.input,
            mix: action.options.mix === -1 ? instance.routingData.mix : action.options.mix,
          },
        }

        if (programCut.options.mix !== 0) programCut.options.functionID = 'ActiveInput'
        sendBasicCommand(programCut)
      },
    },

    transitionMix: {
      name: 'Transition - Transition mix',
      options: [
        options.mixSelect,
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'functionID',
          default: 'Cut',
          choices: TRANSITIONS.map((transition) => ({ id: transition, label: transition })),
        },
        {
          type: 'number',
          label: 'Duration',
          id: 'duration',
          min: 0,
          max: 9999,
          default: 1000,
        },
      ],
      callback: sendBasicCommand,
    },

    transition: {
      name: 'Transition - Auto Transition',
      options: [
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'functionID',
          default: 'Transition1',
          choices: [
            { id: 'Transition1', label: 'Transition 1' },
            { id: 'Transition2', label: 'Transition 2' },
            { id: 'Transition3', label: 'Transition 3' },
            { id: 'Transition4', label: 'Transition 4' },
            { id: 'Stinger1', label: 'Stinger 1' },
            { id: 'Stinger2', label: 'Stinger 2' },
            { id: 'Stinger3', label: 'Stinger 3' },
            { id: 'Stinger4', label: 'Stinger 4' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    setTransitionEffect: {
      name: 'Transition - Set Auto Transition Effect',
      options: [
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'functionID',
          default: 'SetTransitionEffect1',
          choices: [
            { id: 'SetTransitionEffect1', label: 'Transition 1' },
            { id: 'SetTransitionEffect2', label: 'Transition 2' },
            { id: 'SetTransitionEffect3', label: 'Transition 3' },
            { id: 'SetTransitionEffect4', label: 'Transition 4' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Select transition type',
          id: 'value',
          default: 'Cut',
          choices: TRANSITIONS.map((transition) => ({ id: transition, label: transition })),
        },
      ],
      callback: sendBasicCommand,
    },

    setTransitionDuration: {
      name: 'Transition - Set Auto Transition Duration',
      options: [
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'functionID',
          default: 'SetTransitionDuration1',
          choices: [
            { id: 'SetTransitionDuration1', label: 'Transition 1' },
            { id: 'SetTransitionDuration2', label: 'Transition 2' },
            { id: 'SetTransitionDuration3', label: 'Transition 3' },
            { id: 'SetTransitionDuration4', label: 'Transition 4' },
          ],
        },
        {
          type: 'number',
          label: 'Duration',
          id: 'value',
          min: 0,
          max: 9999,
          default: 1000,
        },
      ],
      callback: sendBasicCommand,
    },

    quickPlay: {
      name: 'Transition - Quick Play input to Program',
      options: [options.input],
      callback: sendBasicCommand,
    },

    // Output
    outputSet: {
      name: 'Output - Set Output Source',
      options: [
        {
          type: 'dropdown',
          label: 'Select Output',
          id: 'functionID',
          default: 'SetOutput2',
          choices: [
            { id: 'SetOutput2', label: 'Output 2' },
            { id: 'SetOutput3', label: 'Output 3' },
            { id: 'SetOutput4', label: 'Output 4' },
            { id: 'SetOutputExternal2', label: 'Output External 2' },
            { id: 'SetOutputFullscreen', label: 'Output Fullscreen 1' },
            { id: 'SetOutputFullscreen2', label: 'Output Fullscreen 2' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Select Input Type',
          id: 'value',
          default: 'Output',
          choices: [
            { id: 'Output', label: 'Output (Program)' },
            { id: 'Preview', label: 'Preview' },
            { id: 'MultiView', label: 'Multiview' },
            { id: 'Replay', label: 'Replay' },
            { id: 'Input', label: 'Input' },
          ],
        },
        options.input,
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        let command = `FUNCTION ${action.options.functionID} Value=${action.options.value}`

        if (action.options.value === 'Input') {
          command += `&Input=${encodeURIComponent(input)}`
        }

        if (instance.tcp) instance.tcp.sendCommand(command)
      },
    },

    toggleFunctions: {
      name: 'Output - Toggle Functions',
      options: [
        {
          type: 'dropdown',
          label: 'Toggle Function',
          id: 'functionID',
          default: 'StartStopMultiCorder',
          choices: [
            { id: 'StartStopMultiCorder', label: 'Start / Stop MultCorder' },
            { id: 'StartStopRecording', label: 'Start / Stop Recording' },
            { id: 'StartStopStreaming', label: 'Start / Stop Stream' },
            { id: 'StartStopExternal', label: 'Start / Stop External' },
            { id: 'Fullscreen', label: 'Start / Stop Fullscreen' },
            { id: 'FadeToBlack', label: 'Fade To Black' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Stream Start/Stop value',
          id: 'value',
          default: '',
          choices: [
            { id: '', label: 'All' },
            { id: '0', label: '1' },
            { id: '1', label: '2' },
            { id: '2', label: '3' },
          ],
        },
      ],
      callback: (action) => {
        let command = `FUNCTION ${action.options.functionID}`

        if (action.options.functionID === 'StartStopStreaming' && action.options.value != '') {
          command += ` value=${action.options.value}`
        }

        if (instance.tcp) instance.tcp.sendCommand(command)
      },
    },

    // Playlist
    playListFunctions: {
      name: 'Playlist - Functions',
      description: "For vMix's Playlist function, not List inputs",
      options: [
        {
          type: 'dropdown',
          label: 'Playlist Function',
          id: 'functionID',
          default: 'StartPlayList',
          choices: [
            { id: 'StartPlayList', label: 'Start Play List' },
            { id: 'StopPlayList', label: 'Stop Play List' },
            { id: 'NextPlayListEntry', label: 'Next Item in Play List' },
            { id: 'PreviousPlayListEntry', label: 'Previous Item in Play List' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    selectPlayList: {
      name: 'Playlist - Open Playlist',
      description: "For vMix's Playlist function, not List inputs",
      options: [
        {
          type: 'textinput',
          label: 'Playlist name',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    // Overlay
    overlayFunctions: {
      name: 'Overlay - Functions',
      options: [
        {
          type: 'dropdown',
          label: 'Select Overlay Function',
          id: 'functionID',
          default: 'OverlayInput1',
          choices: [
            { id: 'OverlayInput1', label: 'Toggle Overlay 1 on program' },
            { id: 'OverlayInput2', label: 'Toggle Overlay 2 on program' },
            { id: 'OverlayInput3', label: 'Toggle Overlay 3 on program' },
            { id: 'OverlayInput4', label: 'Toggle Overlay 4 on program' },
            { id: 'PreviewOverlayInput1', label: 'Toggle Overlay 1 on preview' },
            { id: 'PreviewOverlayInput2', label: 'Toggle Overlay 2 on preview' },
            { id: 'PreviewOverlayInput3', label: 'Toggle Overlay 3 on preview' },
            { id: 'PreviewOverlayInput4', label: 'Toggle Overlay 4 on preview' },
            { id: 'OverlayInput1In', label: 'Transition Overlay 1 on' },
            { id: 'OverlayInput2In', label: 'Transition Overlay 2 on' },
            { id: 'OverlayInput3In', label: 'Transition Overlay 3 on' },
            { id: 'OverlayInput4In', label: 'Transition Overlay 4 on' },
            { id: 'OverlayInput1Out', label: 'Transition Overlay 1 off' },
            { id: 'OverlayInput2Out', label: 'Transition Overlay 2 off' },
            { id: 'OverlayInput3Out', label: 'Transition Overlay 3 off' },
            { id: 'OverlayInput4Out', label: 'Transition Overlay 4 off' },
            { id: 'OverlayInput1Off', label: 'Set Overlay 1 off' },
            { id: 'OverlayInput2Off', label: 'Set Overlay 2 off' },
            { id: 'OverlayInput3Off', label: 'Set Overlay 3 off' },
            { id: 'OverlayInput4Off', label: 'Set Overlay 4 off' },
            { id: 'OverlayInputAllOff', label: 'Set All Overlays off' },
            { id: 'OverlayInput1Zoom', label: 'Zoom PIP Overlay 1 to/from fulscreen' },
            { id: 'OverlayInput2Zoom', label: 'Zoom PIP Overlay 2 to/from fulscreen' },
            { id: 'OverlayInput3Zoom', label: 'Zoom PIP Overlay 3 to/from fulscreen' },
            { id: 'OverlayInput4Zoom', label: 'Zoom PIP Overlay 4 to/from fulscreen' },
          ],
        },
        options.input,
      ],
      callback: sendBasicCommand,
    },

    // Position
    setInputPostion: {
      name: 'Position - Adjust an inputs pan/zoom',
      options: [
        {
          type: 'dropdown',
          label: 'Function',
          id: 'functionID',
          default: 'SetPanX',
          choices: [
            { id: 'SetPanX', label: 'Pan X' },
            { id: 'SetPanY', label: 'Pan Y' },
            { id: 'SetZoom', label: 'Zoom' },
          ],
        },
        options.input,
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: [
            { id: 'Set', label: 'Set' },
            { id: 'Increase', label: 'Increase' },
            { id: 'Decrease', label: 'Decrease' },
          ],
        },
        {
          type: 'number',
          label: 'Value',
          id: 'value',
          default: 0,
          min: -2,
          max: 2,
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        let prefix = ''

        if (action.options.adjustment === 'Increase') {
          prefix = '%2B%3D'
        } else if (action.options.adjustment === 'Decrease') {
          prefix = '-%3D'
        }

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION ${action.options.functionID} Input=${encodeURIComponent(input)}&value=${prefix}${
              action.options.value
            }`
          )
      },
    },

    // Layer
    multiViewOverlay: {
      name: 'Layer - Toggle/On/Off Multiview Layer on Input',
      options: [
        {
          type: 'dropdown',
          label: 'MultiViewOverlay Function',
          id: 'functionID',
          default: 'MultiViewOverlay',
          choices: [
            { id: 'MultiViewOverlay', label: 'Toggle Overlay Layer on Input' },
            { id: 'MultiViewOverlayOff', label: 'Set Overlay Layer Off' },
            { id: 'MultiViewOverlayOn', label: 'Set Overlay Layer On' },
          ],
        },
        {
          type: 'textinput',
          label: 'Input',
          id: 'input',
          default: '',
        },
        {
          type: 'textinput',
          label: 'Layer',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    setMultiViewOverlay: {
      name: 'Layer - Set Input as Multiview Layer',
      options: [
        {
          type: 'textinput',
          label: 'MultiView Input',
          id: 'input',
          default: '',
        },
        {
          type: 'number',
          label: 'Layer',
          id: 'layer',
          default: 1,
          min: 1,
          max: 10,
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '',
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const layer = (await instance.parseOption(action.options.layerInput))[instance.buttonShift.state]

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION SetMultiViewOverlay Input=${encodeURIComponent(input)}&Value=${
              action.options.layer
            },${encodeURIComponent(layer)}`
          )
      },
    },

    setMultiViewOverlayOnPreview: {
      name: 'Layer - Set Input as Multiview Overlay Layer on active Preview input',
      options: [
        {
          type: 'number',
          label: 'Layer',
          id: 'layer',
          default: 1,
          min: 1,
          max: 10,
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '',
        },
        options.mixSelect,
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.layerInput))[instance.buttonShift.state]
        const mix = action.options.mix === -1 ? instance.routingData.mix : action.options.mix

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION SetMultiViewOverlay Input=${instance.data.mix[mix].preview}&Value=${
              action.options.layer
            },${encodeURIComponent(input)}`
          )
      },
    },

    setMultiViewOverlayOnProgram: {
      name: 'Layer - Set Input as Multiview Overlay Layer on active Program input',
      options: [
        {
          type: 'number',
          label: 'Layer',
          id: 'layer',
          default: 1,
          min: 1,
          max: 10,
        },
        {
          type: 'textinput',
          label: 'Input to use on Layer',
          id: 'layerInput',
          default: '1',
        },
        options.mixSelect,
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.layerInput))[instance.buttonShift.state]
        const mix = action.options.mix === -1 ? instance.routingData.mix : action.options.mix

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION SetMultiViewOverlay Input=${instance.data.mix[mix].program}&Value=${
              action.options.layer
            },${encodeURIComponent(input)}`
          )
      },
    },

    setMultiViewOverlayDestinationInput: {
      name: 'Layer - Set Destination Input for Routable Multiview Layer',
      options: [
        {
          type: 'textinput',
          label: 'Destination Input',
          id: 'destinationInput',
          default: '1',
        },
      ],
      callback: async (action) => {
        const desination = (await instance.parseOption(action.options.destinationInput))[instance.buttonShift.state]

        instance.routingData.layer.destinationInput = desination
        instance.checkFeedbacks('selectedDestinationInput', 'routableMultiviewLayer')
        instance.variables?.updateVariables()
      },
    },

    setMultiViewOverlayDestinationLayer: {
      name: 'Layer - Set Destination Layer for Routable Multiview Layer',
      options: [
        {
          type: 'textinput',
          label: 'Destination Layer (1-10) of destination Input',
          id: 'destinationLayer',
          default: '',
        },
      ],
      callback: async (action) => {
        const parseOption = (await instance.parseOption(action.options.destinationLayer + ''))[
          instance.buttonShift.state
        ]
        const layerOption = parseFloat(parseOption)
        const checkNaN = isNaN(layerOption)
        const checkValid = layerOption % 1 === 0 && layerOption > 0 && layerOption <= 10

        if (!checkNaN && checkValid) {
          instance.routingData.layer.destinationLayer = layerOption.toString()

          instance.checkFeedbacks('selectedDestinationLayer', 'routableMultiviewLayer')
          instance.variables?.updateVariables()
        } else {
          instance.log('warn', `Setting Multview Destination layer must be a whole number, 1 to 10`)
        }
      },
    },

    setMultiViewOverlaySourceInput: {
      name: 'Layer - Set Source Input for Routable Multiview Layer',
      options: [
        {
          type: 'textinput',
          label: 'Input to be routed to destination (0 to clear layer)',
          id: 'sourceIndex',
          default: '1',
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.sourceIndex))[instance.buttonShift.state]

        if (
          instance.routingData.layer.destinationInput !== null &&
          instance.routingData.layer.destinationLayer !== null
        ) {
          const inputValue = input === '0' || input === '' ? '' : input
          if (instance.tcp)
            instance.tcp.sendCommand(
              `FUNCTION SetMultiViewOverlay Input=${encodeURIComponent(
                instance.routingData.layer.destinationInput
              )}&Value=${instance.routingData.layer.destinationLayer},${encodeURIComponent(inputValue)}`
            )
        }
      },
    },

    clearMultiViewOverlaySelection: {
      name: 'Layer - Clear Routable Multiview Layer selections',
      options: [],
      callback: () => {
        instance.routingData.layer.destinationInput = null
        instance.routingData.layer.destinationLayer = null

        instance.checkFeedbacks('selectedDestinationInput', 'selectedDestinationLayer', 'routableMultiviewLayer')
        instance.variables?.updateVariables()
      },
    },

    // Virtual Set
    virtualSet: {
      name: 'VirtualSet - Zoom To Selected Preset',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Preset (1-4)',
          id: 'value',
          default: '1',
          choices: ['1', '2', '3', '4'].map((value) => ({ id: value, label: value })),
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION SelectIndex Input=${encodeURIComponent(input)}&Value=${action.options.value}`
          )
      },
    },

    // Video Call
    videoCallAudioSource: {
      name: 'VideoCall - Select Audio Source',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'value',
          default: 'BusA',
          choices: [
            { id: 'Master', label: 'Master' },
            { id: 'Headphones', label: 'Headphones' },
            { id: 'BusA', label: 'A' },
            { id: 'BusB', label: 'B' },
            { id: 'BusC', label: 'C' },
            { id: 'BusD', label: 'D' },
            { id: 'BusE', label: 'E' },
            { id: 'BusF', label: 'F' },
            { id: 'BusG', label: 'G' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    videoCallVideoSource: {
      name: 'VideoCall - Select Video Source',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Select Output',
          id: 'value',
          default: 'Output1',
          choices: [
            { id: 'Output1', label: 'Output 1' },
            { id: 'Output2', label: 'Output 2' },
            { id: 'Output3', label: 'Output 3' },
            { id: 'Output4', label: 'Output 4' },
            { id: 'None', label: 'None' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    // Audio
    audioBus: {
      name: 'Audio - Route Input to Bus',
      options: [
        options.input,
        options.audioBusMaster,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'AudioBus',
          choices: [
            { id: 'AudioBus', label: 'Toggle' },
            { id: 'AudioBusOn', label: 'On' },
            { id: 'AudioBusOff', label: 'Off' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    busXSendToMaster: {
      name: 'Audio - Route Bus to Master',
      options: [options.audioBus],
      callback: sendBasicCommand,
    },

    busXAudio: {
      name: 'Audio - Bus Mute',
      options: [
        options.audioBusMaster,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'BusXAudio',
          choices: [
            { id: 'BusXAudio', label: 'Toggle Bus Mute' },
            { id: 'BusXAudioOn', label: 'Set Bus Audio ON' },
            { id: 'BusXAudioOff', label: 'Set Bus Audio OFF' },
          ],
        },
      ],
      callback: (action) => {
        let command = 'FUNCTION '

        if (action.options.value == 'Master') {
          if (action.options.functionID == 'BusXAudio') command += 'MasterAudio'
          if (action.options.functionID == 'BusXAudioOn') command += 'MasterAudioON'
          if (action.options.functionID == 'BusXAudioOff') command += 'MasterAudioOFF'
        } else {
          command += `${action.options.functionID} Value=${action.options.value}`
        }

        if (instance.tcp) instance.tcp.sendCommand(command)
      },
    },

    audio: {
      name: 'Audio - Input Mute',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'Audio',
          choices: [
            { id: 'Audio', label: 'Toggle input Audio' },
            { id: 'AudioOn', label: 'Set input Audio ON' },
            { id: 'AudioOff', label: 'Set input Audio OFF' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    busXSolo: {
      name: 'Audio - Bus Solo',
      options: [
        options.audioBus,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'BusXSolo',
          choices: [
            { id: 'BusXSolo', label: 'Toggle' },
            { id: 'BusXSoloOn', label: 'On' },
            { id: 'BusXSoloOff', label: 'Off' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    solo: {
      name: 'Audio - Input Solo',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'Solo',
          choices: [
            { id: 'Solo', label: 'Toggle' },
            { id: 'SoloOn', label: 'On' },
            { id: 'SoloOff', label: 'Off' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    setVolumeFade: {
      name: 'Audio - Set Volume Fade',
      options: [
        {
          type: 'number',
          label: 'Fade to volume',
          id: 'fadeMin',
          default: 0,
          min: 0,
          max: 100,
        },
        {
          type: 'number',
          label: 'Fade time in ms',
          id: 'fadeTime',
          default: 2000,
          min: 0,
          max: 60000,
        },
        options.input,
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION SetVolumeFade Value=${action.options.fadeMin},${
              action.options.fadeTime
            }&input=${encodeURIComponent(input)}`
          )
      },
    },

    audioPlugin: {
      name: 'Audio - Audio Plugin On/Off/Toggle/Show On Input',
      options: [
        options.input,
        {
          type: 'number',
          label: 'Plugin Number',
          id: 'value',
          default: 1,
          min: 1,
          max: 1000,
        },
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'AudioPluginOnOff',
          choices: [
            { id: 'AudioPluginOnOff', label: 'Toggle' },
            { id: 'AudioPluginOn', label: 'On' },
            { id: 'AudioPluginOff', label: 'Off' },
            { id: 'AudioPluginShow', label: 'Show' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    audioChannelMatrixApplyPreset: {
      name: 'Audio - Channel Matrix Apply Preset',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Preset Name',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    // Title
    controlCountdown: {
      name: 'Title - Start / Stop / Pause Countdown',
      options: [
        {
          type: 'dropdown',
          label: 'Action',
          id: 'functionID',
          default: 'StartCountdown',
          choices: [
            { id: 'StartCountdown', label: 'Start' },
            { id: 'StopCountdown', label: 'Stop' },
            { id: 'PauseCountdown', label: 'Pause' },
          ],
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION ${action.options.functionID} Input=${encodeURIComponent(input)}&${
              indexNaNCheck ? 'SelectedName' : 'SelectedIndex'
            }=${encodeURIComponent(index)}`
          )
      },
    },

    setCountdown: {
      name: 'Title - Set Countdown Duration',
      options: [
        {
          type: 'textinput',
          label: 'Time (00:00:00)',
          id: 'value',
          default: '00:10:00',
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex))[instance.buttonShift.state]
        const value = (await instance.parseOption(action.options.value))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION SetCountdown Input=${encodeURIComponent(input)}&${
              indexNaNCheck ? 'SelectedName' : 'SelectedIndex'
            }=${encodeURIComponent(index)}&value=${value}`
          )
      },
    },

    changeCountdown: {
      name: 'Title - Change Countdown Time',
      options: [
        {
          type: 'textinput',
          label: 'Time (00:00:00)',
          id: 'value',
          default: '00:10:00'
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex))[instance.buttonShift.state]
        const value = (await instance.parseOption(action.options.value))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION ChangeCountdown Input=${encodeURIComponent(input)}&${
              indexNaNCheck ? 'SelectedName' : 'SelectedIndex'
            }=${encodeURIComponent(index)}&value=${value}`
          )
      },
    },

    adjustCountdown: {
      name: 'Title - Add / Subtract seconds on Countdown',
      options: [
        {
          type: 'textinput',
          label: 'Seconds',
          id: 'value',
          default: '10',
        },
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex))[instance.buttonShift.state]
        const value = (await instance.parseOption(action.options.value))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        // Check if value is valid
        if (isNaN(parseFloat(value)) || parseFloat(value) % 1 != 0) {
          instance.log('warn', "'Seconds' for adjusting a countdown must be a whole number")
        } else {
          if (instance.tcp)
            instance.tcp.sendCommand(
              `FUNCTION AdjustCountdown Input=${encodeURIComponent(input)}&${
                indexNaNCheck ? 'SelectedName' : 'SelectedIndex'
              }=${encodeURIComponent(index)}&Value=${value}`
            )
        }
      },
    },

    setText: {
      name: 'Title - Adjust title text',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: ['Set', 'Increment', 'Decrement'].map((item) => ({ id: item, label: item })),
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex))[instance.buttonShift.state]
        let text = (await instance.parseOption(action.options.value))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (action.options.adjustment === 'Set') {
          if (instance.tcp)
            instance.tcp.sendCommand(
              `FUNCTION SetText Input=${encodeURIComponent(input)}&${
                indexNaNCheck ? 'SelectedName' : 'SelectedIndex'
              }=${index}&Value=${text}`
            )
        } else {
          if (isNaN(parseFloat(text))) {
            instance.log('warn', 'Increasing/Decreasing a title requires Value to be a number')
          } else {
            // URL Encode plus and equals symbols to perform addition/subtraction on value instead of setting to a value.
            if (action.options.adjustment === 'Increment') {
              text = '%2b%3d' + text
            } else if (action.options.adjustment === 'Decrement') {
              text = '-%3d' + text
            }

            if (instance.tcp)
              instance.tcp.sendCommand(
                `FUNCTION SetText Input=${encodeURIComponent(input)}&${
                  indexNaNCheck ? 'SelectedName' : 'SelectedIndex'
                }=${index}&Value=${text}`
              )
          }
        }
      },
    },

    setColor: {
      name: 'Title - Adjust title shape color',
      description: 'Requires vMix v25. only works on solid colors',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
        },
        {
          type: 'textinput',
          label: 'Value (#RRGGBB or #AARRGGBB)',
          id: 'value',
          default: '',
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex))[instance.buttonShift.state]
        let value = (await instance.parseOption(action.options.value))[instance.buttonShift.state]

        if (!value.includes('#')) value = '#' + value

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION SetColor Input=${encodeURIComponent(input)}&${
              indexNaNCheck ? 'SelectedName' : 'SelectedIndex'
            }=${index}&Value=${encodeURIComponent(value)}`
          )
      },
    },

    selectTitlePreset: {
      name: 'Title - Select Title Preset',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Preset Index',
          id: 'value',
          default: '0',
        },
      ],
      callback: sendBasicCommand,
    },

    titlePreset: {
      name: 'Title - Next / Prev Title Preset',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'NextTitlePreset',
          choices: [
            { id: 'NextTitlePreset', label: 'Select Next Title Preset' },
            { id: 'PreviousTitlePreset', label: 'Select Previous Title Preset' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    titleBeginAnimation: {
      name: 'Title - Begin Animation Page',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'value',
          default: 'Page1',
          choices: [
            { id: 'TransitionIn', label: 'Transition In' },
            { id: 'TransitionOut', label: 'Transition Out' },
            { id: 'Page1', label: 'Page 1' },
            { id: 'Page2', label: 'Page 2' },
            { id: 'Page3', label: 'Page 3' },
            { id: 'Page4', label: 'Page 4' },
            { id: 'Page5', label: 'Page 5' },
            { id: 'Page6', label: 'Page 6' },
            { id: 'Page7', label: 'Page 7' },
            { id: 'Page8', label: 'Page 8' },
            { id: 'Page9', label: 'Page 9' },
            { id: 'Page10', label: 'Page 10' },
            { id: 'Continuous', label: 'Continuous' },
            { id: 'DataChangeIn', label: 'Data Change In' },
            { id: 'DataChangeOut', label: 'Data Change Out' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    // Data Source
    dataSourceAutoNext: {
      name: 'DataSource - AutoNext',
      options: [
        {
          type: 'dropdown',
          label: 'AutoNext State',
          id: 'functionID',
          default: 'DataSourceAutoNextOn',
          choices: [
            { id: 'DataSourceAutoNextOn', label: 'On' },
            { id: 'DataSourceAutoNextOff', label: 'Off' },
            { id: 'DataSourceAutoNextOnOff', label: 'On/Off' },
          ],
        },
        {
          type: 'textinput',
          label: 'Name,Table',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    dataSourceNextRow: {
      name: 'DataSource - Next Row',
      options: [
        {
          type: 'textinput',
          label: 'Name,Table',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    dataSourcePreviousRow: {
      name: 'DataSource - Previous Row',
      options: [
        {
          type: 'textinput',
          label: 'Name,Table',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    dataSourceSelectRow: {
      name: 'DataSource - Select Row',
      options: [
        {
          type: 'textinput',
          label: 'Name,Table,Index',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    // Slide / List Set
    nextPicture: {
      name: 'Lists - Next Picture/Slide/Index',
      options: [options.input],
      callback: sendBasicCommand,
    },

    previousPicture: {
      name: 'Lists - Previous Picture/Slide/Index',
      options: [options.input],
      callback: sendBasicCommand,
    },

    selectIndex: {
      name: 'Lists - Select Specific Picture/Slide/Index',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Select Index',
          id: 'value',
          default: '1',
        },
      ],
      callback: sendBasicCommand,
    },

    // Media
    videoActions: {
      name: 'Media - Playback Actions',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Affect Preview instead of inputs',
          id: 'inputType',
          default: false,
        },
        {
          type: 'dropdown',
          label: 'Options',
          id: 'functionID',
          default: 'Play',
          choices: [
            { id: 'Play', label: 'Play Video' },
            { id: 'Pause', label: 'Pause Video' },
            { id: 'PlayPause', label: 'Toggle Play and Pause' },
            { id: 'Restart', label: 'Restart Video' },
            { id: 'LoopOn', label: 'Loop Video On' },
            { id: 'LoopOff', label: 'Loop Video Off' },
          ],
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION ${action.options.functionID} Input=${action.options.inputType ? '0' : encodeURIComponent(input)}`
          )
      },
    },

    videoPlayhead: {
      name: 'Media - Adjust or Set Playhead',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Affect Preview instead of inputs',
          id: 'inputType',
          default: false,
        },
        {
          type: 'dropdown',
          label: 'Adjustment',
          id: 'adjustment',
          default: 'Set',
          choices: ['Set', 'Increment', 'Decrement'].map((item) => ({ id: item, label: item })),
        },
        {
          type: 'number',
          label: 'value (ms) - vMix will round to the nearest frame',
          id: 'value',
          default: 0,
          min: 0,
          max: Number.MAX_SAFE_INTEGER,
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        let text = action.options.value.toString()

        // URL Encode plus and equals symbols to perform addition/subtraction on value instead of setting to a value.
        if (action.options.adjustment === 'Increment') {
          text = '%2b%3d' + text
        } else if (action.options.adjustment === 'Decrement') {
          text = '-%3d' + text
        }

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION SetPosition Input=${action.options.inputType ? '0' : encodeURIComponent(input)}&Value=${text}`
          )
      },
    },

    videoMark: {
      name: 'Media - Mark Functions',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Affect Preview instead of inputs',
          id: 'inputType',
          default: false,
        },
        {
          type: 'dropdown',
          label: 'Function',
          id: 'functionID',
          default: 'MarkIn',
          choices: [
            { id: 'MarkIn', label: 'Mark In' },
            { id: 'MarkOut', label: 'Mark Out' },
            { id: 'MarkReset', label: 'Mark Reset' },
            { id: 'MarkResetIn', label: 'Mark Reset In' },
            { id: 'MarkResetOut', label: 'Mark Reset Out' },
          ],
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION ${action.options.functionID} Input=${action.options.inputType ? '0' : encodeURIComponent(input)}`
          )
      },
    },

    // Replay
    replayACamera: {
      name: 'Replay - A Camera',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayACamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayACamera${item}`, label: `Camera ${item}` })),
        },
      ],
      callback: sendBasicCommand,
    },

    replayBCamera: {
      name: 'Replay - B Camera',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayBCamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayBCamera${item}`, label: `Camera ${item}` })),
        },
      ],
      callback: sendBasicCommand,
    },

    replayCamera: {
      name: 'Replay - Selected Channel Camera',
      options: [
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'functionID',
          default: 'ReplayCamera1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: `ReplayCamera${item}`, label: `Camera ${item}` })),
        },
      ],
      callback: sendBasicCommand,
    },

    replaySelectChannel: {
      name: 'Replay - Select Channel',
      options: [
        {
          type: 'dropdown',
          label: 'Channel',
          id: 'functionID',
          default: 'replaySelectChannelAB',
          choices: ['replaySelectChannelAB', 'replaySelectChannelA', 'replaySelectChannelB'].map((item) => ({
            id: item,
            label: item.substr(19),
          })),
        },
      ],
      callback: sendBasicCommand,
    },

    replaySwapChannels: {
      name: 'Replay - Swap A and B channels',
      options: [],
      callback: sendBasicCommand,
    },

    replayMark: {
      name: 'Replay - Mark Functions',
      options: [
        {
          type: 'dropdown',
          label: 'Function',
          id: 'functionID',
          default: 'ReplayMarkIn',
          choices: [
            { id: 'ReplayMarkCancel', label: 'Cancel Mark' },
            { id: 'ReplayMarkIn', label: 'Mark In' },
            { id: 'ReplayMarkOut', label: 'Mark Out' },
            { id: 'ReplayMarkInLive', label: 'Mark In Live' },
            { id: 'ReplayMarkInOut', label: 'Mark In-Out' },
            { id: 'ReplayMarkInOutLive', label: 'Mark In-Out Live' },
            { id: 'ReplayMarkInOutRecorded', label: 'Mark In-Out Recorded' },
            { id: 'ReplayMarkInRecorded', label: 'Mark In Recorded' },
            { id: 'ReplayMarkInRecordedNow', label: 'Mark In Recorded Now' },
          ],
        },
        {
          type: 'number',
          label: 'Seconds (when used)',
          id: 'value',
          default: 0,
          min: 0,
          max: Number.MAX_SAFE_INTEGER,
        },
      ],
      callback: sendBasicCommand,
    },

    replayMoveInOut: {
      name: 'Replay - Move Selected Event In/Out',
      options: [
        {
          type: 'dropdown',
          label: 'In / Out',
          id: 'functionID',
          default: 'ReplayMoveSelectedInPoint',
          choices: [
            { id: 'ReplayMoveSelectedInPoint', label: 'Move In Point' },
            { id: 'ReplayMoveSelectedOutPoint', label: 'Move Out Point' },
          ],
        },
        {
          type: 'number',
          label: 'Frames',
          id: 'value',
          default: 30,
          min: 0,
          max: Number.MAX_SAFE_INTEGER,
        },
      ],
      callback: sendBasicCommand,
    },

    replayUpdateInOut: {
      name: 'Replay - Move Selected Event In/Out to Now',
      options: [
        {
          type: 'dropdown',
          label: 'In / Out',
          id: 'functionID',
          default: 'ReplayUpdateSelectedInPoint',
          choices: [
            { id: 'ReplayUpdateSelectedInPoint', label: 'Move In Point' },
            { id: 'ReplayUpdateSelectedOutPoint', label: 'Move Out Point' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    replaySelectEvents: {
      name: 'Replay - Replay Select Events',
      options: [
        {
          type: 'dropdown',
          label: 'Events',
          id: 'functionID',
          default: 'ReplaySelectEvents1',
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => ({
            id: `ReplaySelectEvents${item}`,
            label: `Events ${item}`,
          })),
        },
        options.replayChannel,
      ],
      callback: sendBasicCommand,
    },

    replayChangeDirection: {
      name: 'Replay - Change Direction',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayChangeSpeed: {
      name: 'Replay - Change Speed',
      options: [
        options.replayChannel,
        {
          type: 'number',
          label: 'Change -1 to 1',
          id: 'value',
          default: 0.1,
          step: 0.01,
          min: -1,
          max: 1,
        },
      ],
      callback: sendBasicCommand,
    },

    replayMoveEvent: {
      name: 'Replay - Move event',
      options: [
        {
          type: 'dropdown',
          label: 'Last/Slected',
          id: 'functionID',
          default: 'ReplayMoveLastEvent',
          choices: [
            { id: 'ReplayMoveLastEvent', label: 'Move Last' },
            { id: 'ReplayMoveSelectedEvent', label: 'Move Selected' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Destination',
          id: 'value',
          default: 0,
          choices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => ({
            id: item,
            label: `Events ${index + 1}`,
          })),
        },
      ],
      callback: sendBasicCommand,
    },

    replayMoveEventUpDown: {
      name: 'Replay - Move Selected Event Up/Down',
      options: [
        {
          type: 'dropdown',
          label: 'Direction',
          id: 'functionID',
          default: 'ReplayMoveSelectedEventUp',
          choices: [
            { id: 'ReplayMoveSelectedEventUp', label: 'Move Up' },
            { id: 'ReplayMoveSelectedEventDown', label: 'Move Down' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    replayFastForwardBackward: {
      name: 'Replay - Fast Forward/Backward',
      options: [
        {
          type: 'dropdown',
          label: 'Direction',
          id: 'functionID',
          default: 'ReplayFastForward',
          choices: [
            { id: 'ReplayFastForward', label: 'Forward' },
            { id: 'ReplayFastBackward', label: 'Backward' },
          ],
        },
        options.replayChannel,
        {
          type: 'number',
          label: 'Seconds',
          id: 'value',
          default: 10,
          min: 0,
          max: Number.MAX_SAFE_INTEGER,
        },
      ],
      callback: sendBasicCommand,
    },

    replayJumpFrames: {
      name: 'Replay - Jump Frames',
      options: [
        options.replayChannel,
        {
          type: 'number',
          label: 'Frames',
          id: 'value',
          default: 60,
          min: Number.MIN_SAFE_INTEGER,
          max: Number.MAX_SAFE_INTEGER,
        },
      ],
      callback: sendBasicCommand,
    },

    replayRecording: {
      name: 'Replay - Recording Start/Stop/Toggle',
      options: [
        {
          type: 'dropdown',
          label: 'Recording',
          id: 'functionID',
          default: 'ReplayToggleRecording',
          choices: [
            { id: 'ReplayStartRecording', label: 'Start' },
            { id: 'ReplayStopRecording', label: 'Stop' },
            { id: 'ReplayStartStopRecording', label: 'Toggle' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    replayJumpToNow: {
      name: 'Replay - Jump To Now',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayLiveToggle: {
      name: 'Replay - Toggle Live',
      options: [],
      callback: sendBasicCommand,
    },

    replayPlay: {
      name: 'Replay - Play',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPause: {
      name: 'Replay - Pause',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayEvent: {
      name: 'Replay - Play Event',
      options: [
        options.replayChannel,
        {
          type: 'number',
          label: 'Event ID',
          id: 'value',
          default: 0,
          min: 0,
          max: 1000,
        },
      ],
      callback: sendBasicCommand,
    },

    replayPlaySelectedEventToOutput: {
      name: 'Replay - Play Selected Event To Output',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayEventsByIDToOutput: {
      name: 'Replay - Play Events By ID To Output',
      options: [
        options.replayChannel,
        {
          type: 'number',
          label: 'Event ID',
          id: 'value',
          default: 0,
          min: 0,
          max: 1000,
        },
      ],
      callback: sendBasicCommand,
    },

    replayToggleCamera: {
      name: 'Replay - Toggle Selected Event Camera',
      options: [
        {
          type: 'dropdown',
          label: 'Destination',
          id: 'camera',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({ id: item, label: `Camera ${item}` })),
        },
      ],
      callback: (action) => {
        if (instance.tcp) instance.tcp.sendCommand(`FUNCTION ReplayToggleSelectedEventCamera${action.options.camera}`)
      },
    },

    // Browser
    browser: {
      name: 'Browser - Functions',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Function',
          id: 'functionID',
          default: 'BrowserReload',
          choices: [
            { id: 'BrowserReload', label: 'Reload' },
            { id: 'BrowserBack', label: 'Back' },
            { id: 'BrowserForward', label: 'Forward' },
            { id: 'BrowserKeyboardDisabled', label: 'Keyboard Disabled' },
            { id: 'BrowserKeyboardEnabled', label: 'Keyboard Enabled' },
            { id: 'BrowserMouseDisabled', label: 'Mouse Disabled' },
            { id: 'BrowserMouseEnabled', label: 'Mousen Enabled' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    browserNavigate: {
      name: 'Browser - Navigate',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'URL',
          id: 'value',
          default: '',
        },
      ],
      callback: (action) => {
        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION BrowserNavigate Input=${action.options.input}&Value=${action.options.url || action.options.value}`
          )
      },
    },

    // General
    keyPress: {
      name: 'General - KeyPress',
      options: [
        {
          type: 'textinput',
          label: 'Key',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    tbar: {
      name: 'General - Set t-bar position',
      options: [
        {
          type: 'number',
          label: 'postion 0-255',
          id: 'value',
          min: 0,
          max: 255,
          default: 0,
        },
      ],
      callback: sendBasicCommand,
    },

    dynamic: {
      name: 'General - Set Dynamic Inputs and Values',
      options: [
        {
          type: 'dropdown',
          label: 'Select Type',
          id: 'type',
          default: 'Input',
          choices: [
            { id: 'Input', label: 'Dynamic Input' },
            { id: 'Value', label: 'Dynamic Value' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Select Number',
          id: 'number',
          default: '1',
          choices: [
            { id: '1', label: '1' },
            { id: '2', label: '2' },
            { id: '3', label: '3' },
            { id: '4', label: '4' },
          ],
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
        },
      ],
      callback: async (action) => {
        const value = (await instance.parseOption(action.options.value))[instance.buttonShift.state]
        if (instance.tcp)
          instance.tcp.sendCommand(`FUNCTION SetDynamic${action.options.type}${action.options.number} Value=${value}`)
      },
    },

    // Scripting
    scriptStart: {
      name: 'Scripting - Script start',
      options: [
        {
          type: 'textinput',
          label: 'Script name',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    scriptStop: {
      name: 'Scripting - Script stop',
      options: [
        {
          type: 'textinput',
          label: 'Script name',
          id: 'value',
          default: '',
        },
      ],
      callback: sendBasicCommand,
    },

    scriptStopAll: {
      name: 'Scripting - Script stop all',
      options: [],
      callback: sendBasicCommand,
    },

    command: {
      name: 'Scripting - Run custom command',
      options: [
        {
          type: 'textinput',
          label: 'Command',
          id: 'command',
          default: '',
        },
        {
          type: 'checkbox',
          label: 'URI encode function',
          id: 'encode',
          default: false,
        },
      ],
      callback: async (action) => {
        const commandString = (await instance.parseOption(action.options.command))[instance.buttonShift.state]
        const command = commandString.split(' ')[0]
        const params = commandString.split(' ').slice(1, commandString.split(' ').length).join(' ')
        if (instance.tcp)
          instance.tcp.sendCommand(`FUNCTION ${command} ${action.options.encode ? encodeURIComponent(params) : params}`)
      },
    },

    // Util
    mixSelect: {
      name: 'Util - Select Mix',
      description: '',
      options: [
        {
          type: 'dropdown',
          label: 'Mix',
          id: 'mix',
          default: 0,
          choices: [
            { id: 0, label: '1' },
            { id: 1, label: '2' },
            { id: 2, label: '3' },
            { id: 3, label: '4' },
            { id: 4, label: '5' },
            { id: 5, label: '6' },
            { id: 6, label: '7' },
            { id: 7, label: '8' },
            { id: 8, label: '9' },
            { id: 9, label: '10' },
            { id: 10, label: '1' },
            { id: 11, label: '12' },
            { id: 12, label: '13' },
            { id: 13, label: '14' },
            { id: 14, label: '15' },
          ],
        },
      ],
      callback: (action) => {
        instance.routingData.mix = action.options.mix
        instance.variables?.set({ mix_selected: action.options.mix + 1 })
        instance.checkFeedbacks('mixSelect', 'inputPreview', 'inputLive')
      },
    },

    buttonShift: {
      name: 'Util - Toggle Shift',
      description: '',
      options: [],
      callback: () => {
        instance.buttonShift.state = instance.buttonShift.state === 0 ? 1 : 0

        const feedbacks = [
          'buttonText',
          'buttonShift',
          'inputPreview',
          'inputLive',
          'videoTimer',
          'inputMute',
          'inputSolo',
          'inputBusRouting',
          'liveInputVolume',
          'selectedDestinationInput',
          'selectedDestinationLayer',
          'routableMultiviewLayer',
        ]

        instance.checkFeedbacks(...feedbacks)
      },
    },

    dataSourceTimer: {
      name: 'Util - DataSource Timer State',
      description: '',
      options: [
        {
          type: 'dropdown',
          label: 'State',
          id: 'state',
          default: 'start',
          choices: [
            { id: 'start', label: 'Start' },
            { id: 'stop', label: 'Stop' },
            { id: 'reset', label: 'Reset' },
          ],
        },
        {
          type: 'textinput',
          label: 'Timer ID',
          id: 'id',
          default: '',
        },
      ],
      callback: (action) => {
        if (action.options.id === '') return

        let timer = instance.timers.find((timer) => timer.id === action.options.id)
        if (!timer) {
          timer = new Timer(action.options.id)
          timer.setState(action.options.state)

          instance.timers.push(timer)
        } else {
          timer.setState(action.options.state)
        }
      },
    },

    dataSourceTimerSet: {
      name: 'Util - DataSource Timer Set Time',
      description: '',
      options: [
        {
          type: 'textinput',
          label: 'Timer ID',
          id: 'id',
          default: '',
        },
        {
          type: 'textinput',
          label: 'Time',
          id: 'time',
          default: '00:00:00.000',
        },
      ],
      callback: (action) => {
        const timer = instance.timers.find((timer) => timer.id === action.options.id)
        if (!timer) return

        timer.setStart(action.options.time)
      },
    },

    dataSourceTimerCreateTime: {
      name: 'Util - DataSource Timer Create Laptime',
      description: '',
      options: [
        {
          type: 'textinput',
          label: 'Timer ID',
          id: 'id',
          default: '',
        },
        {
          type: 'number',
          label: 'Lap ID (0 for next lap)',
          id: 'time',
          default: 0,
          min: 0,
          max: 1000,
        },
      ],
      callback: (action) => {
        const timer = instance.timers.find((timer) => timer.id === action.options.id)
        if (!timer) return

        timer.setTime(action.options.time, new Date().getTime())
      },
    },

    dataSourceTimerUpdateTime: {
      name: 'Util - DataSource Timer Update Time',
      description: '',
      options: [
        {
          type: 'textinput',
          label: 'Timer ID',
          id: 'id',
          default: '',
        },
        {
          type: 'dropdown',
          label: 'State',
          id: 'type',
          default: 'set',
          choices: [
            { id: 'set', label: 'Set' },
            { id: 'reset', label: 'Reset' },
          ],
        },
        {
          type: 'number',
          label: 'Lap ID',
          id: 'time',
          default: 1,
          min: 1,
          max: 1000,
        },
        {
          type: 'textinput',
          label: 'Time',
          id: 'value',
          default: '00:00:00.000',
        },
      ],
      callback: (action) => {
        const timer = instance.timers.find((timer) => timer.id === action.options.id)
        if (!timer) return

        timer.setTime(action.options.time, action.options.type === 'set' ? action.options.value : undefined)
      },
    },
  }
}
