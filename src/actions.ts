import { CompanionActionEvent, SomeCompanionActionInputField } from '@companion-module/base'
import { options, TRANSITIONS, valueMinMax, volumeToLinear } from './utils'
import { Timer } from './timers'
import VMixInstance from './index'

type ActionOptionEntry = [string, string | number | boolean]
type MixOptionEntry = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | -1
type ColourCorrectionType =
  | 'hue'
  | 'saturation'
  | 'liftG'
  | 'liftB'
  | 'liftY'
  | 'gammaR'
  | 'gammaG'
  | 'gammaB'
  | 'gammaY'
  | 'gainR'
  | 'gainG'
  | 'gainB'
  | 'gainY'

export interface VMixActions {
  // Input
  previewInput: VMixAction<PreviewInputCallback>
  previewInputNext: VMixAction<PreviewInputNextCallback>
  previewInputPrevious: VMixAction<PreviewInputPreviousCallback>
  resetInput: VMixAction<ResetInputCallback>
  undo: VMixAction<UndoCallback>
  inputEffect: VMixAction<InputEffectCallback>
  inputEffectStrength: VMixAction<InputEffectStrengthCallback>
  setCC: VMixAction<SetCCCallback>
  inputPosition: VMixAction<InputPositionCallback>
  inputFrameDelay: VMixAction<InputFrameDelayCallback>

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
  setLayerPosition: VMixAction<SetLayerPositionCallback>

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
  audioAuto: VMixAction<AudioAutoCallback>
  busXSolo: VMixAction<BusXSoloCallback>
  solo: VMixAction<SoloCallback>
  setInputVolume: VMixAction<setInputVolumeCallback>
  setVolumeFade: VMixAction<SetVolumeFadeCallback>
  setBusVolume: VMixAction<SetBusVolumeCallback>
  audioPlugin: VMixAction<AudioPluginCallback>
  audioChannelMatrixApplyPreset: VMixAction<AudioChannelMatrixApplyPresetCallback>
  setVolumeChannelMixer: VMixAction<SetVolumeChannelMixerCallback>
  soloAllOff: VMixAction<SoloAllOffCallback>
  audioMixerShowHide: VMixAction<AudioMixerShowHideCallback>

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
  replaySetSpeed: VMixAction<ReplaySetSpeedCallback>
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
  replayPlayLastEventToOutput: VMixAction<ReplayPlayLastEventToOutputCallback>
  replayPlayAllEventsToOutput: VMixAction<ReplayPlayAllEventsToOutputCallback>
  replayStopEvents: VMixAction<ReplayStopEventsCallback>
  replayToggleCamera: VMixAction<ReplayToggleCameraCallback>
  replayShowHide: VMixAction<ReplayShowHideCallback>

  // Browser
  browser: VMixAction<BrowserCallback>
  browserNavigate: VMixAction<BrowserNavigateCallback>

  // General
  keyPress: VMixAction<KeyPressCallback>
  tbar: VMixAction<TbarCallback>
  dynamic: VMixAction<DynamicCallback>

  // PTZ
  ptzMove: VMixAction<PTZMoveCallback>
  ptzFocusZoom: VMixAction<PTZFocusZoomCallback>
  ptzVirtualInput: VMixAction<PTZVirtualInputCallback>

  // Scripting
  scriptStart: VMixAction<ScriptStartCallback>
  scriptStop: VMixAction<ScriptStopCallback>
  scriptStopAll: VMixAction<ScriptStopAllCallback>
  command: VMixAction<CommandCallback>

  // Util
  mixSelect: VMixAction<MixSelectCallback>
  busSelect: VMixAction<BusSelectCallback>
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

interface ResetInputCallback {
  actionId: 'resetInput'
  options: Readonly<{
    input: string
  }>
}

interface UndoCallback {
  actionId: 'undo'
  options: Record<string, never>
}

interface InputEffectCallback {
  actionId: 'inputEffect'
  options: Readonly<{
    input: string
    effect: '1' | '2' | '3' | '4'
    state: '' | 'On' | 'Off'
  }>
}

interface InputEffectStrengthCallback {
  actionId: 'inputEffectStrength'
  options: Readonly<{
    input: string
    effect: '1' | '2' | '3' | '4'
    strength: string
  }>
}

interface SetCCCallback {
  actionId: 'setCC'
  options: Readonly<{
    input: string
    setting:
      | 'SetCCGainR'
      | 'SetCCGainG'
      | 'SetCCGainB'
      | 'SetCCGainRGB'
      | 'SetCCGainY'
      | 'SetCCGammaR'
      | 'SetCCGammaG'
      | 'SetCCGammaB'
      | 'SetCCGammaRGB'
      | 'SetCCGammaY'
      | 'SetCCHue'
      | 'SetCCLiftR'
      | 'SetCCLiftG'
      | 'SetCCLiftB'
      | 'SetCCLiftRGB'
      | 'SetCCLiftY'
      | 'SetCCSaturation'
    adjustment: 'Set' | 'Increase' | 'Decrease'
    gainValue: string
    otherValue: string
  }>
}

interface InputPositionCallback {
  actionId: 'inputPosition'
  options: Readonly<{
    input: string
    setting: 'SetZoom' | 'SetCrop' | 'SetCropX1' | 'SetCropX2' | 'SetCropY1' | 'SetCropY2' | 'SetPanX' | 'SetPanY'
    adjustment: 'Set' | 'Increase' | 'Decrease'
    zoomValue: string
    cropValue: string
    cropValue2: string
    panValue: string
  }>
}

interface InputFrameDelayCallback {
  actionId: 'inputFrameDelay'
  options: Readonly<{
    input: string
    value: string
  }>
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
    input?: string
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
      | 'StartMultiCorder'
      | 'StopMultiCorder'
      | 'StartStopRecording'
      | 'StartRecording'
      | 'StopRecording'
      | 'StartStopStreaming'
      | 'StartStreaming'
      | 'StopStreaming'
      | 'StartStopExternal'
      | 'StartExternal'
      | 'StopExternal'
      | 'Fullscreen'
      | 'FullscreenOff'
      | 'FullscreenOn'
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
    value: string
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

interface SetLayerPositionCallback {
  actionId: 'setLayerPosition'
  options: Readonly<{
    input: string
    layer: string
    setting:
      | 'Crop'
      | 'CropX1'
      | 'CropX2'
      | 'CropY1'
      | 'CropY2'
      | 'PanX'
      | 'PanY'
      | 'X'
      | 'Y'
      | 'Height'
      | 'Width'
      | 'Rectangle'
      | 'Zoom'
    adjustment: 'Set' | 'Increase' | 'Decrease'
    crop: string
    crop2: string
    pan: string
    xy: string
    heightWidth: string
    rectangle: string
    zoom: string
  }>
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
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
    functionID: 'AudioBus' | 'AudioBusOn' | 'AudioBusOff'
  }>
}

interface BusXSendToMasterCallback {
  actionId: 'busXSendToMaster'
  options: Readonly<{
    value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
  }>
}

interface BusXAudioCallback {
  actionId: 'busXAudio'
  options: Readonly<{
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
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

interface AudioAutoCallback {
  actionId: 'audioAuto'
  options: Readonly<{
    input: string
    functionID: 'AudioAuto' | 'AudioAutoOn' | 'AudioAutoOff'
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

interface setInputVolumeCallback {
  actionId: 'setInputVolume'
  options: Readonly<{
    input: string
    adjustment: 'Set' | 'Increase' | 'Decrease'
    amount: string
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

interface SetBusVolumeCallback {
  actionId: 'SetBusVolume'
  options: Readonly<{
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
    adjustment: 'Set' | 'Increase' | 'Decrease'
    amount: string
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

interface SetVolumeChannelMixerCallback {
  actionId: 'setVolumeChannelMixer'
  options: Readonly<{
    input: string
    channel: string
    adjustment: 'Set' | 'Increase' | 'Decrease'
    amount: string
  }>
}

interface SoloAllOffCallback {
  actionId: 'soloAllOff'
  options: Record<string, never>
}

interface AudioMixerShowHideCallback {
  actionId: 'audioMixerShowHide'
  options: Record<string, never>
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
    adjustment: 'Set' | 'Increase' | 'Decrease'
    value: string
    encode: boolean
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
    functionID: 'Play' | 'Pause' | 'PlayPause' | 'Restart' | 'LoopOn' | 'LoopOff' | 'Loop'
  }>
}

interface VideoPlayheadCallback {
  actionId: 'videoPlayhead'
  options: Readonly<{
    input: string
    inputType: boolean
    adjustment: 'Set' | 'Increase' | 'Decrease'
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

interface ReplaySetSpeedCallback {
  actionId: 'replaySetSpeed'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
    value: string
    max: string
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

interface ReplayPlayLastEventToOutputCallback {
  actionId: 'replayPlayLastEventToOutput'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
  }>
}

interface ReplayPlayAllEventsToOutputCallback {
  actionId: 'replayPlayAllEventsToOutput'
  options: Readonly<{
    channel: 'Current' | 'A' | 'B'
  }>
}

interface ReplayStopEventsCallback {
  actionId: 'replayStopEvents'
  options: Record<string, never>
}

interface ReplayToggleCameraCallback {
  actionId: 'replayToggleCamera'
  options: Readonly<{
    camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  }>
}

interface ReplayShowHideCallback {
  actionId: 'replayShowHide'
  options: Record<string, never>
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
  actionId: 'tbar'
  options: Readonly<{
    value: string
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

// PTZ
interface PTZMoveCallback {
  actionId: 'ptzMove'
  options: Readonly<{
    input: string
    functionID:
      | 'PTZHome'
      | 'PTZStop'
      | 'PTZMoveUp'
      | 'PTZMoveUpLeft'
      | 'PTZMoveUpRight'
      | 'PTZMoveLeft'
      | 'PTZMoveRight'
      | 'PTZMoveDown'
      | 'PTZMoveDownLeft'
      | 'PTZMoveDownRight'
      | 'PTZMoveToVirtualInputPosition'
      | 'PTZMoveToVirtualInputPositionByIndex'
    value?: string
  }>
}

interface PTZFocusZoomCallback {
  actionId: 'ptzFocusZoom'
  options: Readonly<{
    input: string
    value: string
  }>
}

interface PTZVirtualInputCallback {
  actionId: 'ptzVirtualInput'
  options: Readonly<{
    input: string
    functionID: 'PTZCreateVirtualInput' | 'PTZUpdateVirtualInput'
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

interface BusSelectCallback {
  actionId: 'busSelect'
  options: Readonly<{
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
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
  | ResetInputCallback
  | UndoCallback
  | InputEffectCallback
  | InputEffectStrengthCallback
  | SetCCCallback
  | InputPositionCallback
  | InputFrameDelayCallback

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
  | SetLayerPositionCallback

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
  | AudioAutoCallback
  | BusXSoloCallback
  | SoloCallback
  | SetVolumeFadeCallback
  | SetBusVolumeCallback
  | AudioPluginCallback
  | AudioChannelMatrixApplyPresetCallback
  | SetVolumeChannelMixerCallback
  | SoloAllOffCallback
  | AudioMixerShowHideCallback

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
  | ReplaySetSpeedCallback
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
  | ReplayPlayLastEventToOutputCallback
  | ReplayPlayAllEventsToOutputCallback
  | ReplayStopEventsCallback
  | ReplayToggleCameraCallback
  | ReplayShowHideCallback

  // Browser
  | BrowserCallback
  | BrowserNavigateCallback

  // General
  | KeyPressCallback
  | TbarCallback
  | DynamicCallback

  // PTZ
  | PTZMoveCallback
  | PTZFocusZoomCallback
  | PTZVirtualInputCallback

  // Scripting
  | ScriptStartCallback
  | ScriptStopCallback
  | ScriptStopAllCallback
  | CommandCallback

  // Util
  | MixSelectCallback
  | BusSelectCallback
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

    const parsedParams = []
    const params = Object.entries(action.options)
      .filter((param) => param[0] !== 'functionID')
      .map(parseButtonShift)

    for (const param of params) {
      if (typeof param[1] === 'string') {
        param[1] = await instance.parseVariablesInString(param[1])
        parsedParams.push(param)
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
      description: 'Send to Preview the selected Input',
      options: [options.input, options.mixSelect],
      callback: sendBasicCommand,
    },

    previewInputNext: {
      name: 'Input - Send Next input to Preview',
      description: 'Send to Preview the next Input',
      options: [],
      callback: sendBasicCommand,
    },

    previewInputPrevious: {
      name: 'Input - Send Previous input to Preview',
      description: 'Send to Preview the previous Input',
      options: [],
      callback: sendBasicCommand,
    },

    resetInput: {
      name: 'Input - Reset',
      description: 'Reset an Input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    undo: {
      name: 'Input - Undo',
      description: 'Undo closing an input',
      options: [],
      callback: sendBasicCommand,
    },

    inputEffect: {
      name: 'Input - Effect Toggle/On/Off',
      description: 'Control effects on input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Effect',
          id: 'effect',
          default: '1',
          choices: [
            { id: '1', label: 'Effect 1' },
            { id: '2', label: 'Effect 2' },
            { id: '3', label: 'Effect 3' },
            { id: '4', label: 'Effect 4' },
          ],
        },
        {
          type: 'dropdown',
          label: 'State',
          id: 'state',
          default: '',
          choices: [
            { id: '', label: 'Toggle' },
            { id: 'On', label: 'On' },
            { id: 'Off', label: 'Off' },
          ],
        },
      ],
      callback: async (action) => {
        const selected = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)

        if (!input) return

        const command = `Effect${action.options.effect}${action.options.state}`

        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION ${command} Input=${input.key}`)
        }
      },
    },

    inputEffectStrength: {
      name: 'Input - Effect Strength',
      description: 'Control effect strength on input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Effect',
          id: 'effect',
          default: '1',
          choices: [
            { id: '1', label: 'Effect 1' },
            { id: '2', label: 'Effect 2' },
            { id: '3', label: 'Effect 3' },
            { id: '4', label: 'Effect 4' },
          ],
        },
        {
          type: 'textinput',
          label: 'Strength 0 to 1',
          id: 'strength',
          default: '1',
        },
      ],
      callback: async (action) => {
        const selected = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        const value = (await instance.parseOption(action.options.strength))[instance.buttonShift.state]
        const parsedValue = parseFloat(value)

        if (!input || isNaN(parsedValue)) return

        const command = `SetEffect${action.options.effect}Strength`

        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION ${command} Input=${input.key}&Value=${parsedValue}`)
        }
      },
    },

    setCC: {
      name: 'Input - Colour Correction',
      description: 'Control CC Gain, Gamma, Hue, Lift, or Saturation',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'setting',
          default: 'SetCCGainR',
          choices: [
            { id: 'SetCCGainR', label: 'Gain R' },
            { id: 'SetCCGainG', label: 'Gain G' },
            { id: 'SetCCGainB', label: 'Gain B' },
            { id: 'SetCCGainY', label: 'Gain Y' },
            { id: 'SetCCGammaR', label: 'Gamma R' },
            { id: 'SetCCGammaG', label: 'Gamma G' },
            { id: 'SetCCGammaB', label: 'Gamma B' },
            { id: 'SetCCGammaY', label: 'Gamma Y' },
            { id: 'SetCCHue', label: 'Hue' },
            { id: 'SetCCLiftR', label: 'Lift R' },
            { id: 'SetCCLiftG', label: 'Lift G' },
            { id: 'SetCCLiftB', label: 'Lift B' },
            { id: 'SetCCLiftY', label: 'Lift Y' },
            { id: 'SetCCSaturation', label: 'Saturation' },
          ],
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Gain Value 0 to 2',
          id: 'gainValue',
          default: '1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting.startsWith('SetCCGain')
          },
        },
        {
          type: 'textinput',
          label: 'Gain Value -1 to 1',
          id: 'otherValue',
          default: '0',
          isVisible: (options) => {
            const setting = options.setting as string
            return !setting.startsWith('SetCCGain')
          },
        },
      ],
      callback: async (action) => {
        const selected = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        const valueOption = action.options.setting.startsWith('SetCCGain')
          ? action.options.gainValue
          : action.options.otherValue
        const value = (await instance.parseOption(valueOption))[instance.buttonShift.state]
        let parsedValue = parseFloat(value)

        if (!input || isNaN(parsedValue)) return

        if (action.options.adjustment !== 'Set' || !input.cc) {
          if (instance.data.majorVersion < 27) {
            instance.log('warn', 'Input CC Increase/Decrease is only available in vMix 27 or later')
            return
          }

          let type = action.options.setting.substring(5)
          type = type.charAt(0).toLowerCase() + type.slice(1)

          const currentValue = input.cc?.[type as ColourCorrectionType]

          if (currentValue !== undefined) {
            if (action.options.adjustment === 'Increase') {
              parsedValue = currentValue + parsedValue
            } else {
              parsedValue = currentValue - parsedValue
            }
          }

          if (action.options.setting.startsWith('SetCCGain')) {
            parsedValue = valueMinMax(parsedValue, 0, 2)
          } else {
            parsedValue = valueMinMax(parsedValue, -1, 1)
          }
        }

        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION ${action.options.setting} Input=${input.key}&Value=${parsedValue}`)
        }
      },
    },

    inputPosition: {
      name: 'Input - Position',
      description: 'Control input Zoom, Crop, and Pan',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'setting',
          default: 'SetZoom',
          choices: [
            { id: 'SetZoom', label: 'Zoom' },
            { id: 'SetCrop', label: 'Crop' },
            { id: 'SetCropX1', label: 'Crop X1' },
            { id: 'SetCropX2', label: 'Crop X2' },
            { id: 'SetCropY1', label: 'Crop Y1' },
            { id: 'SetCropY2', label: 'Crop Y2' },
            { id: 'SetPanX', label: 'Pan X' },
            { id: 'SetPanY', label: 'Pan Y' },
          ],
        },
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
          isVisible: (options) => {
            const setting = options.setting as string
            return setting !== 'setCrop'
          },
        },
        {
          type: 'textinput',
          label: 'Zoom Value 0 to 5 (1 = 100%, 0.5 = 50%, 2 = 200%)',
          id: 'zoomValue',
          default: '1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'SetZoom'
          },
        },
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop) X1,Y1,X2,Y2',
          id: 'cropValue',
          default: '0,0,1,1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'SetCrop'
          },
        },
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop)',
          id: 'cropValue2',
          default: '1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting.startsWith('SetCropX') || setting.startsWith('SetCropY')
          },
        },
        {
          type: 'textinput',
          label: 'Pan (0 = Centered, -2 = 100% to left, 2 = 100% to right)',
          id: 'panValue',
          default: '1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting.startsWith('SetPan')
          },
        },
      ],
      callback: async (action) => {
        const selected = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        let cmd = ''

        if (!input) return

        if (action.options.adjustment !== 'Set' && instance.data.majorVersion < 27) {
          instance.log('warn', 'Input Position Adjustment Increase/Decrease is only available in vMix 27 or later')
          return
        }

        if (action.options.setting === 'SetZoom') {
          let value: string | number = (await instance.parseOption(action.options.zoomValue))[
            instance.buttonShift.state
          ]
          value = parseFloat(value)

          const currentValue = input.inputPosition?.zoomX ?? 1

          if (action.options.adjustment === 'Increase') {
            value = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            value = currentValue - value
          }

          cmd = `FUNCTION SetZoom Input=${input.key}&Value=${valueMinMax(Math.round(value * 1000) / 1000, 0, 5)}`
        } else if (action.options.setting === 'SetCrop') {
          const value: string = (await instance.parseOption(action.options.cropValue))[instance.buttonShift.state]

          cmd = `FUNCTION SetCrop Input=${input.key}&Value=${value}`
        } else if (action.options.setting.startsWith('SetCrop')) {
          let value: string | number = (await instance.parseOption(action.options.cropValue2))[
            instance.buttonShift.state
          ]
          value = parseFloat(value)
          if (isNaN(value)) return

          const cropSetting = `crop${action.options.setting.substring(7)}`

          const currentValue = input.inputPosition?.[cropSetting] ?? 0

          if (action.options.adjustment === 'Increase') {
            value = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            value = currentValue - value
          }

          cmd = `FUNCTION ${action.options.setting} Input=${input.key}&Value=${valueMinMax(
            Math.round(value * 1000) / 1000,
            0,
            1
          )}`
        } else {
          let value: string | number = (await instance.parseOption(action.options.panValue))[instance.buttonShift.state]
          value = parseFloat(value)
          if (isNaN(value)) return

          const panSetting = `pan${action.options.setting.substring(6)}`
          const currentValue = input.inputPosition?.[panSetting] ?? 0

          if (action.options.adjustment === 'Increase') {
            value = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = input.inputPosition?.[panSetting] ?? 0
            value = currentValue - value
          }

          cmd = `FUNCTION ${action.options.setting} Input=${input.key}&Value=${valueMinMax(
            Math.round(value * 1000) / 1000,
            -2,
            2
          )}`
        }

        if (instance.tcp) {
          instance.tcp.sendCommand(cmd)
        }
      },
    },

    inputFrameDelay: {
      name: 'Inpt - Frame Delay',
      description: 'Set the delay in frames on supported inputs (eg, Cameras)',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Frames',
          id: 'value',
          default: '0',
        },
      ],
      callback: async (action) => {
        const selected = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        let value: number | string = (await instance.parseOption(action.options.value))[instance.buttonShift.state]
        value = parseInt(value)

        if (!input || isNaN(value)) {
          return
        }

        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION SetFrameDelay Input=${input.key}&Value=${value}`)
        }
      },
    },

    // Transition
    programCut: {
      name: 'Transition - Send Input to Program',
      description: 'Cuts the input directly to Output without changing Preview',
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
      description: 'Transition Preview to Program using the selected Transition',
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
        {
          type: 'textinput',
          label: 'Input - Leave blank to transition Preview',
          id: 'input',
          default: '',
          tooltip: 'Number, Name, or GUID',
        },
      ],
      callback: async (action) => {
        if (action.options.input !== '' && action.options.input !== undefined) {
          const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
          const useInput: any = {
            actionId: 'transitionMix',
            options: {
              mix: action.options.mix,
              functionID: action.options.functionID,
              duration: action.options.duration,
              input,
            },
          }
          sendBasicCommand(useInput)
        } else {
          const usePreview: any = {
            actionId: 'transitionMix',
            options: {
              mix: action.options.mix,
              functionID: action.options.functionID,
              duration: action.options.duration,
            },
          }
          sendBasicCommand(usePreview)
        }
      },
    },

    transition: {
      name: 'Transition - Auto Transition',
      description: 'Transition Preview to Program using a pre-defined Transition',
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
      description: 'Set an Auto transition',
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
      description: 'Set an Auto transition duration',
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
      description: 'Sends selected input to Preview, cut to Program, and then plays input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    // Output
    outputSet: {
      name: 'Output - Set Output Source',
      description: 'Change what is displayed on the specified Output',
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
      name: 'Output - Output Functions',
      description: 'Start / Stop / Toggle vMix Output functions',
      options: [
        {
          type: 'dropdown',
          label: 'Output Function',
          id: 'functionID',
          default: 'StartStopMultiCorder',
          choices: [
            { id: 'StartStopMultiCorder', label: 'Start / Stop MultCorder' },
            { id: 'StartMultiCorder', label: 'Start MultCorder' },
            { id: 'StopMultiCorder', label: 'Stop MultCorder' },
            { id: 'StartStopRecording', label: 'Start / Stop Recording' },
            { id: 'StartRecording', label: 'Start Recording' },
            { id: 'StopRecording', label: 'Stop Recording' },
            { id: 'StartStopStreaming', label: 'Start / Stop Stream' },
            { id: 'StartStreaming', label: 'Start Stream' },
            { id: 'StopStreaming', label: 'Stop Stream' },
            { id: 'StartStopExternal', label: 'Start / Stop External' },
            { id: 'StartExternal', label: 'Start External' },
            { id: 'StopExternal', label: 'Stop External' },
            { id: 'Fullscreen', label: 'Fullscreen On / Off' },
            { id: 'FullscreenOn', label: 'Fullscreen On' },
            { id: 'FullscreenOff', label: 'Fullscreen Off' },
            { id: 'FadeToBlack', label: 'Fade To Black' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Stream Value',
          id: 'value',
          default: '',
          choices: [
            { id: '', label: 'All' },
            { id: '0', label: '1' },
            { id: '1', label: '2' },
            { id: '2', label: '3' },
          ],
          isVisible: (options) => {
            const functionID = options.functionID + ''
            return functionID.includes('Streaming')
          },
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
      description: 'Controls for Overlays',
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
      description: 'Change the current Pan or Zoom value of an Input',
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
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value (-2 to 2)',
          id: 'value',
          default: '0',
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const value = (await instance.parseOption(action.options.value + ''))[instance.buttonShift.state]

        const valueTest = parseFloat(value)

        if (isNaN(valueTest)) {
          instance.log(
            'warn',
            `"Position - Adjust an inputs pan/zoom" Value field must be a number, or a variable which value is a number`
          )
          return
        }

        if (valueTest < -2 || valueTest > 2) {
          instance.log('warn', `"Position - Adjust an inputs pan/zoom" Value field must be in the range -2 to 2`)
          return
        }

        let prefix = ''

        if (action.options.adjustment === 'Increase') {
          prefix = '%2B%3D'
        } else if (action.options.adjustment === 'Decrease') {
          prefix = '-%3D'
        }

        if (instance.tcp)
          instance.tcp.sendCommand(
            `FUNCTION ${action.options.functionID} Input=${encodeURIComponent(input)}&value=${prefix}${value}`
          )
      },
    },

    // Layer
    multiViewOverlay: {
      name: 'Layer - Toggle/On/Off Multiview Layer on Input',
      description: 'Change the state of the specified Layer on an Input',
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
      description: 'Changes the Layer of an Input',
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
      description: 'Changes the Layer of the current Preview Input',
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
      description: 'Changes the Layer of the current Program Input',
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
      description: 'Sets an input as the destination for Layer Routing',
      options: [
        {
          type: 'textinput',
          label: 'Destination Input',
          id: 'destinationInput',
          default: '1',
        },
      ],
      callback: async (action) => {
        let destination = (await instance.parseOption(action.options.destinationInput))[instance.buttonShift.state]

        if (destination === '0') destination = instance.data.mix[0].preview.toString()
        if (destination === '-1') destination = instance.data.mix[0].program.toString()

        instance.routingData.layer.destinationInput = destination
        instance.checkFeedbacks('selectedDestinationInput', 'routableMultiviewLayer')
        instance.variables?.updateVariables()
      },
    },

    setMultiViewOverlayDestinationLayer: {
      name: 'Layer - Set Destination Layer for Routable Multiview Layer',
      description: 'Sets a Layer as the destination for Layer Router',
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
      description: 'Sets the Source Input to be used on the Destination Layer and Input',
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
      description: 'Clears selected Destination Layer and Input',
      options: [],
      callback: () => {
        instance.routingData.layer.destinationInput = null
        instance.routingData.layer.destinationLayer = null

        instance.checkFeedbacks('selectedDestinationInput', 'selectedDestinationLayer', 'routableMultiviewLayer')
        instance.variables?.updateVariables()
      },
    },

    setLayerPosition: {
      name: 'Layer - Position',
      description: 'Control Input Layers Position and sizing',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer (1 to 10)',
          id: 'layer',
          default: '1',
        },
        {
          type: 'dropdown',
          label: 'Setting',
          id: 'setting',
          default: 'Crop',
          choices: [
            { id: 'Crop', label: 'Crop' },
            { id: 'CropX1', label: 'Crop X1' },
            { id: 'CropX2', label: 'Crop X2' },
            { id: 'CropY1', label: 'Crop Y1' },
            { id: 'CropY2', label: 'Crop Y2' },
            { id: 'PanX', label: 'Pan X (Percent)' },
            { id: 'PanY', label: 'Pan Y (Percent)' },
            { id: 'X', label: 'Pan X (Pixels)' },
            { id: 'Y', label: 'Pan Y (Pixels)' },
            { id: 'Height', label: 'Zoom X' },
            { id: 'Width', label: 'Zoom Y' },
            { id: 'Zoom', label: 'Zoom' },
            { id: 'Rectangle', label: 'Rectangle' },
          ],
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop) X1,Y1,X2,Y2',
          id: 'crop',
          default: '0,0,1,1',
          isVisible: (options) => {
            return options.setting === 'Crop'
          },
        },
        {
          type: 'textinput',
          label: 'Crop (0 = No Crop, 1 = Full Crop)',
          id: 'crop2',
          default: '0',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting !== 'Crop' && setting.startsWith('Crop')
          },
        },
        {
          type: 'textinput',
          label: 'Pan (0 = Centered, -2 = 100% to left/bottom, 2 = 100% to right/top)',
          id: 'pan',
          default: '1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'PanX' || setting === 'PanY'
          },
        },
        {
          type: 'textinput',
          label: 'Pan X / Pan Y position in pixels based on preset resolution',
          id: 'xy',
          default: '1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'X' || setting === 'Y'
          },
        },
        {
          type: 'textinput',
          label: 'Zoom X / Zoom Y position in pixels based on preset resolution',
          id: 'heightWidth',
          default: '1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'Height' || setting === 'Width'
          },
        },
        {
          type: 'textinput',
          label: 'Position and Size in pixels (X,Y,Width,Height)',
          id: 'rectangle',
          default: '1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'Rectangle'
          },
        },
        {
          type: 'textinput',
          label: 'Zoom (1 = 100%, 0.5 = 50%, 2 = 200%) uses Zoom X for adjustment',
          id: 'zoom',
          default: '1',
          isVisible: (options) => {
            const setting = options.setting as string
            return setting === 'Zoom'
          },
        },
      ],
      callback: async (action) => {
        const selected = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const input = await instance.data.getInput(selected)
        const selectedLayer = (await instance.parseOption(action.options.layer))[instance.buttonShift.state]
        const layer = parseInt(selectedLayer)
        const inputLayer = input?.overlay?.[layer - 1]

        if (!input || isNaN(layer) || inputLayer === undefined) return

        if (layer < 1 || layer > 10) {
          instance.log('warn', 'Invalid layer, value must be 1 to 10')
          return
        }

        if (action.options.adjustment !== 'Set' && instance.data.majorVersion < 27) {
          instance.log(
            'warn',
            'Input Layer Position Adjustment Increase/Decrease is only available in vMix 27 or later'
          )
          return
        }

        let cmd = `FUNCTION SetLayer${layer}${action.options.setting} Input=${input.key}&Value=`

        if (action.options.setting === 'Crop') {
          cmd += action.options.crop
        } else if (action.options.setting.startsWith('Crop')) {
          let value: string | number = (await instance.parseOption(action.options.crop2))[instance.buttonShift.state]
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value
          const crop = 'c' + action.options.setting.substring(1)

          if (action.options.adjustment === 'Increase') {
            const currentValue = (inputLayer[crop] !== undefined ? inputLayer[crop] : 0) as number
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = (inputLayer[crop] !== undefined ? inputLayer[crop] : 0) as number
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, 0, 1)
        } else if (action.options.setting.startsWith('Pan')) {
          let value: string | number = (await instance.parseOption(action.options.pan))[instance.buttonShift.state]
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value
          const pan = 'p' + action.options.setting.substring(1)

          if (action.options.adjustment === 'Increase') {
            const currentValue = (inputLayer[pan] !== undefined ? inputLayer[pan] : 0) as number
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = (inputLayer[pan] !== undefined ? inputLayer[pan] : 0) as number
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, -2, 2)
        } else if (action.options.setting === 'X' || action.options.setting === 'Y') {
          let value: string | number = (await instance.parseOption(action.options.xy))[instance.buttonShift.state]
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value

          if (action.options.adjustment === 'Increase') {
            const currentValue = (
              inputLayer[action.options.setting.toLowerCase()] !== undefined
                ? inputLayer[action.options.setting.toLowerCase()]
                : 0
            ) as number
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = (
              inputLayer[action.options.setting.toLowerCase()] !== undefined
                ? inputLayer[action.options.setting.toLowerCase()]
                : 0
            ) as number
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, -4096, 4096)
        } else if (action.options.setting === 'Height' || action.options.setting === 'Width') {
          let value: string | number = (await instance.parseOption(action.options.heightWidth))[
            instance.buttonShift.state
          ]
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value

          if (action.options.adjustment === 'Increase') {
            const currentValue = (
              inputLayer[action.options.setting.toLowerCase()] !== undefined
                ? inputLayer[action.options.setting.toLowerCase()]
                : 0
            ) as number
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = (
              inputLayer[action.options.setting.toLowerCase()] !== undefined
                ? inputLayer[action.options.setting.toLowerCase()]
                : 0
            ) as number
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, -4096, 4096)
        } else if (action.options.setting === 'Rectangle') {
          cmd += action.options.rectangle
        } else if (action.options.setting === 'Zoom') {
          let value: string | number = (await instance.parseOption(action.options.zoom))[instance.buttonShift.state]
          value = parseFloat(value)
          if (isNaN(value)) return

          let newValue = value

          if (action.options.adjustment === 'Increase') {
            const currentValue = (inputLayer.zoomX !== undefined ? inputLayer.zoomX : 1) as number
            newValue = currentValue + value
          } else if (action.options.adjustment === 'Decrease') {
            const currentValue = (inputLayer.zoomX !== undefined ? inputLayer.zoomX : 1) as number
            newValue = currentValue - value
          }

          cmd += valueMinMax(newValue, 0, 2)
        } else {
          return
        }

        if (instance.tcp) {
          instance.tcp.sendCommand(cmd)
        }
      },
    },

    // Virtual Set
    virtualSet: {
      name: 'VirtualSet - Zoom To Selected Preset',
      description: 'Zooms a Virtual Set to one of the presets',
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
      description: 'Routes an Audio Source to the Video Call Input',
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
      description: 'Routes a Video Source to the Video Call Input',
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
      description: 'Routes the audio from an Input to the specified Bus',
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
      callback: (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        const commandOptions = { ...action.options, value: selected }

        sendBasicCommand({ ...action, options: commandOptions })
      },
    },

    busXSendToMaster: {
      name: 'Audio - Route Bus to Master',
      description: 'Routes the audio from a Bus to Master',
      options: [options.audioBus],
      callback: (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        if (selected === 'Master') return
        const commandOptions = { ...action.options, value: selected }

        sendBasicCommand({ ...action, options: commandOptions })
      },
    },

    busXAudio: {
      name: 'Audio - Bus Mute',
      description: 'Mutes a Bus',
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
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        let command = 'FUNCTION '

        if (selected === 'Master') {
          if (action.options.functionID == 'BusXAudio') command += 'MasterAudio'
          if (action.options.functionID == 'BusXAudioOn') command += 'MasterAudioON'
          if (action.options.functionID == 'BusXAudioOff') command += 'MasterAudioOFF'
        } else {
          command += `${action.options.functionID} Value=${selected}`
        }

        if (instance.tcp) instance.tcp.sendCommand(command)
      },
    },

    audio: {
      name: 'Audio - Input Mute',
      description: 'Mutes an Inputs audio',
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

    audioAuto: {
      name: 'Audio - Input Audio Auto',
      description: 'Sets an Inputs auto toggle audio when transitioned in/out',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Option',
          id: 'functionID',
          default: 'AudioAuto',
          choices: [
            { id: 'AudioAuto', label: 'Toggle input Audio Auto' },
            { id: 'AudioAutoOn', label: 'Set input Audio Auto ON' },
            { id: 'AudioAutoOff', label: 'Set input Audio Auto OFF' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    busXSolo: {
      name: 'Audio - Bus Solo',
      description: 'Solos a specified Bus',
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
      description: 'Solos a specified Input',
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

    setInputVolume: {
      name: 'Audio - Set Input Volume',
      description: 'Sets an Inputs Volume (Note: vMix Volume only supports whole numbers from 0 to 100)',
      options: [
        options.input,
        options.adjustment,
        {
          type: 'textinput',
          label: 'Volume',
          id: 'amount',
          default: '100',
        },
      ],
      callback: async (action) => {
        const selected = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const amount = parseFloat((await instance.parseOption(action.options.amount))[instance.buttonShift.state])
        const input = await instance.data.getInput(selected)

        if (input === null || input.volume === undefined) return

        let target = amount

        if (action.options.adjustment === 'Increase') {
          target = volumeToLinear(input.volume) + amount
          if (target > 100) target = 100
        } else if (action.options.adjustment === 'Decrease') {
          target = volumeToLinear(input.volume) - amount
          if (target < 0) target = 0
        }

        target = Math.round(target)

        if (isNaN(target)) return

        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION SetVolume input=${input.key}&Value=${target}`)
        }
      },
    },

    setVolumeFade: {
      name: 'Audio - Fade Input Volume',
      description: 'Fades an Inputs Volume (Note: vMix Volume only supports whole numbers from 0 to 100)',
      options: [
        options.input,
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
          min: 1,
          max: 60000,
        },
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

    setBusVolume: {
      name: 'Audio - Set Bus Volume',
      description: 'Sets Bus Volume (Note: vMix Volume only supports whole numbers from 0 to 100)',
      options: [
        options.audioBusMaster,
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          id: 'amount',
          default: '100',
        },
      ],
      callback: async (action) => {
        const selected = action.options.value === 'Selected' ? instance.routingData.bus : action.options.value
        const amount = parseFloat((await instance.parseOption(action.options.amount))[instance.buttonShift.state])
        const command = `Set${selected === 'Master' ? '' : 'Bus'}${selected}Volume`
        const bus = instance.data.getAudioBus(selected)
        if (bus === null) return

        let target = amount

        if (action.options.adjustment === 'Increase') {
          target = volumeToLinear(bus.volume) + amount
          if (target > 100) target = 100
        } else if (action.options.adjustment === 'Decrease') {
          target = volumeToLinear(bus.volume) - amount
          if (target < 0) target = 0
        }

        target = Math.round(target)

        if (isNaN(target)) return

        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION ${command} Value=${target}`)
        }
      },
    },

    audioPlugin: {
      name: 'Audio - Audio Plugin On/Off/Toggle/Show On Input',
      description: 'Changes the state of an Audio Plugin on an Input',
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
      description: 'Apply preset to channel matrix',
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

    setVolumeChannelMixer: {
      name: 'Audio - Set Input Channel Volume',
      description: "Set Volume of an Input's sub channel",
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Channel (1 to 16)',
          id: 'channel',
          default: '1',
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          id: 'amount',
          default: '100',
        },
      ],
      callback: async (action) => {
        const selected = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const amount = parseFloat((await instance.parseOption(action.options.amount))[instance.buttonShift.state])
        const channel = parseInt((await instance.parseOption(action.options.input))[instance.buttonShift.state])
        const input = await instance.data.getInput(selected)

        if (input === null || input.volume === undefined || isNaN(amount) || isNaN(channel)) return

        let currentValue = instance.data.channelMixer[input.key]?.find(
          (audioChannel) => audioChannel.channel === channel
        )?.volume
        if (currentValue === undefined) currentValue = 1
        currentValue = Math.round(volumeToLinear(currentValue * 100))
        let newValue = amount

        if (action.options.adjustment !== 'Set') {
          if (action.options.adjustment === 'Increase') {
            newValue = currentValue + amount
          } else {
            newValue = currentValue - amount
          }
        }

        if (newValue > 100) newValue = 100
        if (newValue < 0) newValue = 0

        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION SetVolumeChannelMixer Input=${input.key}&Value=${channel},${newValue}`)
        }
      },
    },

    soloAllOff: {
      name: 'Audio - Solo All Off',
      description: 'Disables Solo on all Busses and Inputs',
      options: [],
      callback: (action) => {
        sendBasicCommand(action)
      },
    },

    audioMixerShowHide: {
      name: 'Audio - Show / Hide Audio Mixer',
      description: 'Shows or Hides the Audio Mixer window',
      options: [],
      callback: sendBasicCommand,
    },

    // Title
    controlCountdown: {
      name: 'Title - Start / Stop / Pause Countdown',
      description: 'Control Countdown running state',
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
      description: 'Sets the Duration of a Countdown',
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
      description: 'Sets the current time within a countdowns Duration',
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
            `FUNCTION ChangeCountdown Input=${encodeURIComponent(input)}&${
              indexNaNCheck ? 'SelectedName' : 'SelectedIndex'
            }=${encodeURIComponent(index)}&value=${value}`
          )
      },
    },

    adjustCountdown: {
      name: 'Title - Add / Subtract seconds on Countdown',
      description: 'Modify the current time on a Countdown',
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
      description: 'Adjusts text on a title layer (Starting from 0)',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Layer',
          id: 'selectedIndex',
          default: '0',
        },
        options.adjustment,
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
        },
        {
          type: 'checkbox',
          label: 'Encode Value (needed if text contains special characters)',
          id: 'encode',
          default: false,
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        const index = (await instance.parseOption(action.options.selectedIndex))[instance.buttonShift.state]
        let text = (await instance.parseOption(action.options.value))[instance.buttonShift.state]

        // Check if layer is a name or an index to switch between SelectedName and SelectedIndex
        const indexNaNCheck = isNaN(parseInt(index, 10))

        if (action.options.adjustment === 'Set') {
          if (action.options.encode) text = encodeURIComponent(text)
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
            if (action.options.adjustment === 'Increase') {
              text = '%2b%3d' + text
            } else if (action.options.adjustment === 'Decrease') {
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
      description: 'Selects a Title Preset (Start from 0)',
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
      description: 'Selects the next/previous Title Preset',
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
      description: 'Starts one of the animations states on a Title',
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
      description: 'Enables/Disables/Toggles a Data Source automatically selecting the next row',
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
      description: 'Selects the next row of a Data Source',
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
      description: 'Selects the previous row of a Data Source',
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
      description: 'Selects a specific row (indexed from 0) of a Data Source',
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
      description: 'Selects next item in a List type input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    previousPicture: {
      name: 'Lists - Previous Picture/Slide/Index',
      description: 'Selects previous item in a List type input',
      options: [options.input],
      callback: sendBasicCommand,
    },

    selectIndex: {
      name: 'Lists - Select Specific Picture/Slide/Index',
      description: 'Selects specific item in a List type input',
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
      description: 'Change Playback state/options of an Input',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Act on Preview instead of inputs',
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
            { id: 'Loop', label: 'Loop Video Toggle' },
          ],
        },
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]

        if (instance.tcp) {
          instance.tcp.sendCommand(
            `FUNCTION ${action.options.functionID} Input=${action.options.inputType ? '0' : encodeURIComponent(input)}`
          )
        }
      },
    },

    videoPlayhead: {
      name: 'Media - Adjust or Set Playhead',
      description: 'Change the playhead on an Input',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Affect Preview instead of inputs',
          id: 'inputType',
          default: false,
        },
        options.adjustment,
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
        if (action.options.adjustment === 'Increase') {
          text = '%2b%3d' + text
        } else if (action.options.adjustment === 'Decrease') {
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
      description: 'Mark In and Out points of an input (Not Replay)',
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
      description: 'Select A camera',
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
      description: 'Select B camera',
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
      description: 'Select camera for current Channel',
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
      description: 'Select Replay camera channel',
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
      description: 'Swap cameras on A and B Channels',
      options: [],
      callback: sendBasicCommand,
    },

    replayMark: {
      name: 'Replay - Mark Functions',
      description: 'Mark functions for Replay',
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
      description: 'Move in or out points for the selected Event',
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
      description: 'Move in or out points for the selected Event to Now',
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
      description: 'Select a Replay Events tab',
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
      description: 'Change Replay playback Direction',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayChangeSpeed: {
      name: 'Replay - Change Speed',
      description: 'Change current Replay playback Speed by value',
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

    replaySetSpeed: {
      name: 'Replay - Set Speed',
      description: 'Set Replay playback Speed to a value',
      options: [
        options.replayChannel,
        {
          type: 'textinput',
          label: 'Speed',
          id: 'value',
          default: '1',
        },
        {
          type: 'textinput',
          label: 'Max Speed',
          id: 'max',
          default: '1',
          tooltip: 'If using a tbar, set this to the max value your tbar sends (eg, 255 for xkeys)',
        },
      ],
      callback: async (action) => {
        let value = parseFloat((await instance.parseOption(action.options.value))[instance.buttonShift.state])
        const maxValue = parseFloat((await instance.parseOption(action.options.max))[instance.buttonShift.state])

        if (isNaN(value) || isNaN(maxValue) || maxValue < 0) return

        if (value > maxValue) value = maxValue
        if (value < 0) value = 0

        const position = value / maxValue

        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION ReplaySetSpeed Channel=${action.options.channel}&Value=${position}`)
        }
      },
    },

    replayMoveEvent: {
      name: 'Replay - Move event',
      description: 'Move an Event to a differnt Events tab',
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
      description: 'Moves the position of an Event within the current Events Tab',
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
      description: 'Replay Fast Forward/Backwared (1-30x speed)',
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
          label: 'Speed',
          id: 'value',
          default: 10,
          min: 0,
          max: 30,
        },
      ],
      callback: sendBasicCommand,
    },

    replayJumpFrames: {
      name: 'Replay - Jump Frames',
      description: 'Jump a set amount of frames forward or backward',
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
      description: 'Replay Recording control',
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
      description: 'Jump replay to Now',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayLiveToggle: {
      name: 'Replay - Toggle Live',
      description: 'Toggle Replay Live',
      options: [],
      callback: sendBasicCommand,
    },

    replayPlay: {
      name: 'Replay - Play',
      description: 'Play Replay',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPause: {
      name: 'Replay - Pause',
      description: 'Pause Replay',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayEvent: {
      name: 'Replay - Play Event',
      description: 'Play an Event',
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
      description: 'Play Event currently Selected to Output',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayEventsByIDToOutput: {
      name: 'Replay - Play Events By ID To Output',
      description: 'Play events by ID',
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

    replayPlayLastEventToOutput: {
      name: 'Replay - Play Last Event to Output',
      description: 'Play last Event',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayPlayAllEventsToOutput: {
      name: 'Replay - Play all Events to Output',
      description: 'Play all Events in active list',
      options: [options.replayChannel],
      callback: sendBasicCommand,
    },

    replayStopEvents: {
      name: 'Replay - Stop Events',
      description: 'Stop any currently playing events',
      options: [],
      callback: sendBasicCommand,
    },

    replayToggleCamera: {
      name: 'Replay - Toggle Selected Event Camera',
      description: 'Toggles a camera view for the selected Event',
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

    replayShowHide: {
      name: 'Replay - Show / Hide Replay',
      description: 'Shows or Hides the Replay window',
      options: [],
      callback: sendBasicCommand,
    },

    // Browser
    browser: {
      name: 'Browser - Functions',
      description: 'Browser contol functions',
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
      description: 'Navigate to specified URL (Any special characters may have to be escaped)',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'URL',
          id: 'value',
          default: '',
        },
      ],
      callback: async (action) => {
        const value = await instance.parseVariablesInString(action.options.value)
        if (instance.tcp)
          instance.tcp.sendCommand(`FUNCTION BrowserNavigate Input=${action.options.input}&Value=${value}`)
      },
    },

    // General
    keyPress: {
      name: 'General - KeyPress',
      description: 'Send a key press to vMix',
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
      description: 'Sets the TBar to the specified position',
      options: [
        {
          type: 'textinput',
          label: 'postion 0-255',
          id: 'value',
          default: '0',
        },
      ],
      callback: (action) => {
        if (instance.tcp) {
          instance.tcp.sendCommand(`FUNCTION SetFader Value=${action.options.value}`)
        }
      },
    },

    dynamic: {
      name: 'General - Set Dynamic Inputs and Values',
      description: 'Sets an input or value to the specified Dynamic Input or Dynamic Value',
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

    // PTZ
    ptzMove: {
      name: 'PTZ - Move',
      description: 'Control PTZ Input movement',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Move',
          id: 'functionID',
          default: 'PTZHome',
          choices: [
            { id: 'PTZHome', label: 'Home' },
            { id: 'PTZStop', label: 'Stop' },
            { id: 'PTZMoveUp', label: 'Up' },
            { id: 'PTZMoveUpLeft', label: 'Up Left' },
            { id: 'PTZMoveUpRight', label: 'Up RIght' },
            { id: 'PTZMoveLeft', label: 'Left' },
            { id: 'PTZMoveRight', label: 'Right' },
            { id: 'PTZMoveDown', label: 'Down' },
            { id: 'PTZMoveDownLeft', label: 'Down Left' },
            { id: 'PTZMoveDownRight', label: 'Down Right' },
            {
              id: 'PTZMoveToVirtualInputPosition',
              label: 'Move to PTZ Virtual Input without selecting it into Preview',
            },
            {
              id: 'PTZMoveToVirtualInputPositionByIndex',
              label: 'Move to PTZ Virtual Input associated with this Input',
            },
          ],
        },
        {
          type: 'textinput',
          label: 'Value 0 to 1 (or for move to Virtual Input by Index, 0 to 100)',
          id: 'Value',
          default: '0',
          isVisible: (options) => {
            return (
              options.functionID !== 'PTZHome' &&
              options.functionID !== 'PTZStop' &&
              options.functionID !== 'PTZMoveToVirtualInputPosition'
            )
          },
        },
      ],
      callback: sendBasicCommand,
    },

    ptzFocusZoom: {
      name: 'PTZ - Focus & Zoom',
      description: 'Control PTZ Input Focus and Zoom',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Move',
          id: 'functionID',
          default: 'PTZFocusAuto',
          choices: [
            { id: 'PTZFocusAuto', label: 'Focus Auto' },
            { id: 'PTZFocusFar', label: 'Focus Far' },
            { id: 'PTZFocusManual', label: 'Focus Manual' },
            { id: 'PTZFocusNear', label: 'Focus near' },
            { id: 'PTZFocusStop', label: 'Focus Stop' },
            { id: 'PTZZoomIn', label: 'Zoom In' },
            { id: 'PTZZoomOut', label: 'Zoom Out' },
            { id: 'PTZZoomStop', label: 'Zoom Stop' },
          ],
        },
        {
          type: 'textinput',
          label: 'Speed 0 to 1',
          id: 'Value',
          default: '1',
          isVisible: (options) => {
            return (
              options.functionID !== 'PTZFocusAuto' &&
              options.functionID !== 'PTZFocusManual' &&
              options.functionID !== 'PTZFocusStop' &&
              options.functionID !== 'PTZZoomStop'
            )
          },
        },
      ],
      callback: sendBasicCommand,
    },

    ptzVirtualInput: {
      name: 'PTZ - Virtual Input Create/Update',
      description: 'Creates or Updates a PTZ Virtual Input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Create / Update',
          id: 'functionID',
          default: 'PTZCreateVirtualInput',
          choices: [
            { id: 'PTZCreateVirtualInput', label: 'Create' },
            { id: 'PTZUpdateVirtualInput', label: 'Update' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    // Scripting
    scriptStart: {
      name: 'Scripting - Script start',
      description: 'Start a Script within vMix',
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
      description: 'Stop a script within vMix',
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
      description: 'Stop all scripts running in vMix',
      options: [],
      callback: sendBasicCommand,
    },

    command: {
      name: 'Scripting - Run custom command',
      description: 'Sends a vMix TCP "FUNCTION " message with the specified commands and values appended',
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
      description: 'Select a Mix for use with other Companion actions',
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
            { id: 10, label: '11' },
            { id: 11, label: '12' },
            { id: 12, label: '13' },
            { id: 13, label: '14' },
            { id: 14, label: '15' },
            { id: 15, label: '16' },
          ],
        },
      ],
      callback: (action) => {
        instance.routingData.mix = action.options.mix
        instance.variables?.set({ mix_selected: action.options.mix + 1 })
        instance.variables?.updateVariables()
        instance.checkFeedbacks('mixSelect', 'inputPreview', 'inputLive')
      },
    },

    busSelect: {
      name: 'Util - Select Bus',
      description: 'Select a Bus for use with other Companion actions',
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'value',
          default: 'Master',
          choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id) => ({ id, label: id })),
        },
      ],
      callback: (action) => {
        instance.routingData.bus = action.options.value
        instance.variables?.updateVariables()
        instance.checkFeedbacks('busSelect', 'busVolumeMeter')
      },
    },

    buttonShift: {
      name: 'Util - Toggle Shift',
      description: 'Toggles the current Shift state within this Companion vMix instance',
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
      description: 'Controls the Companion vMix timers',
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
      description: 'Sets the Companion vMix timers',
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
      description: 'Creates a new Lap within Companion vMix timers',
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
      description: 'Updates a Companion vMix timer',
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
