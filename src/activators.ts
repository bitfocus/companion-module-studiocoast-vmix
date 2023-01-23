import VMixInstance from './'
import { CallAudioSource, CallVideoSource, Input } from './data'

type ActivatorEventHandlers =
  | 'handlerBusAudio'
  | 'handlerInputAudio'
  | 'handlerInputState'
  | 'handlerPreviewProgram'
  | 'handlerReplay'
  | 'handlerVideoCall'
  | 'handlerVMixState'
  | 'handlerVolumeChannelMixer'
type AudioBusMasterID = 'M' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
type StatusType = 'fadeToBlack' | 'recording' | 'external' | 'streaming' | 'playList' | 'multiCorder' | 'fullscreen'

// Event types and their handlers
const eventHandlers: { [key: string]: ActivatorEventHandlers | null } = {
  MasterVolume: 'handlerBusAudio',
  MasterAudio: 'handlerBusAudio',
  MasterHeadphones: 'handlerBusAudio',
  BusAVolume: 'handlerBusAudio',
  BusAAudio: 'handlerBusAudio',
  BusASolo: 'handlerBusAudio',
  BusBVolume: 'handlerBusAudio',
  BusBAudio: 'handlerBusAudio',
  BusBSolo: 'handlerBusAudio',
  BusCVolume: 'handlerBusAudio',
  BusCAudio: 'handlerBusAudio',
  BusCSolo: 'handlerBusAudio',
  BusDVolume: 'handlerBusAudio',
  BusDAudio: 'handlerBusAudio',
  BusDSolo: 'handlerBusAudio',
  BusEVolume: 'handlerBusAudio',
  BusEAudio: 'handlerBusAudio',
  BusESolo: 'handlerBusAudio',
  BusFVolume: 'handlerBusAudio',
  BusFAudio: 'handlerBusAudio',
  BusFSolo: 'handlerBusAudio',
  BusGVolume: 'handlerBusAudio',
  BusGAudio: 'handlerBusAudio',
  BusGSolo: 'handlerBusAudio',

  InputMasterAudio: 'handlerInputAudio',
  InputBusAAudio: 'handlerInputAudio',
  InputBusBAudio: 'handlerInputAudio',
  InputBusCAudio: 'handlerInputAudio',
  InputBusDAudio: 'handlerInputAudio',
  InputBusEAudio: 'handlerInputAudio',
  InputBusFAudio: 'handlerInputAudio',
  InputBusGAudio: 'handlerInputAudio',

  InputPlaying: 'handlerInputState',
  InputVolume: 'handlerInputState',
  InputAudio: 'handlerInputState',
  InputSolo: 'handlerInputState',

  Input: 'handlerPreviewProgram',
  InputMix2: 'handlerPreviewProgram',
  InputMix3: 'handlerPreviewProgram',
  InputMix4: 'handlerPreviewProgram',
  InputPreview: 'handlerPreviewProgram',
  InputPreviewMix2: 'handlerPreviewProgram',
  InputPreviewMix3: 'handlerPreviewProgram',
  InputPreviewMix4: 'handlerPreviewProgram',

  ReplayPlaying: 'handlerReplay',
  ReplayCamera1: 'handlerReplay',
  ReplayCamera2: 'handlerReplay',
  ReplayCamera3: 'handlerReplay',
  ReplayCamera4: 'handlerReplay',
  ReplayCamera5: 'handlerReplay',
  ReplayCamera6: 'handlerReplay',
  ReplayCamera7: 'handlerReplay',
  ReplayCamera8: 'handlerReplay',
  ReplayACamera1: 'handlerReplay',
  ReplayACamera2: 'handlerReplay',
  ReplayACamera3: 'handlerReplay',
  ReplayACamera4: 'handlerReplay',
  ReplayACamera5: 'handlerReplay',
  ReplayACamera6: 'handlerReplay',
  ReplayACamera7: 'handlerReplay',
  ReplayACamera8: 'handlerReplay',
  ReplayBCamera1: 'handlerReplay',
  ReplayBCamera2: 'handlerReplay',
  ReplayBCamera3: 'handlerReplay',
  ReplayBCamera4: 'handlerReplay',
  ReplayBCamera5: 'handlerReplay',
  ReplayBCamera6: 'handlerReplay',
  ReplayBCamera7: 'handlerReplay',
  ReplayBCamera8: 'handlerReplay',
  ReplayRecording: 'handlerReplay',
  ReplayPlayForward: 'handlerReplay',
  ReplayPlayBackward: 'handlerReplay',

  VideoCallAudioSourceMaster: 'handlerVideoCall',
  VideoCallAudioSourceHeadphones: 'handlerVideoCall',
  VideoCallAudioSourceBusA: 'handlerVideoCall',
  VideoCallAudioSourceBusB: 'handlerVideoCall',
  VideoCallAudioSourceBusC: 'handlerVideoCall',
  VideoCallAudioSourceBusD: 'handlerVideoCall',
  VideoCallAudioSourceBusE: 'handlerVideoCall',
  VideoCallAudioSourceBusF: 'handlerVideoCall',
  VideoCallAudioSourceBusG: 'handlerVideoCall',
  VideoCallSourceOutput1: 'handlerVideoCall',
  VideoCallSourceOutput2: 'handlerVideoCall',
  VideoCallSourceOutput3: 'handlerVideoCall',
  VideoCallSourceOutput4: 'handlerVideoCall',

  FadeToBlack: 'handlerVMixState',
  Recording: 'handlerVMixState',
  Streaming: 'handlerVMixState',
  External: 'handlerVMixState',
  MultiCorder: 'handlerVMixState',
  Fullscreen: 'handlerVMixState',

  // Unused - Activator only triggers if the value matches an input, and returns the input number. It does not trigger if set to a value that doens't match an input
  InputDynamic1: null,
  InputDynamic2: null,
  InputDynamic3: null,
  InputDynamic4: null,

  // Unused - API doesn't provide channel mixer data, so there's no way to get initial data to ensure accuracy
  InputVolumeChannelMixer1: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer2: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer3: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer4: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer5: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer6: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer7: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer9: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer0: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer10: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer11: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer12: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer13: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer14: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer15: 'handlerVolumeChannelMixer',
  InputVolumeChannelMixer16: 'handlerVolumeChannelMixer',

  // Unused - Activator doesn't differentiate between preview and program overlays
  Overlay1: null,
  Overlay2: null,
  Overlay3: null,
  Overlay4: null,
  Overlay1Any: null,
  Overlay2Any: null,
  Overlay3Any: null,
  Overlay4Any: null,

  // Unused
  InputHeadphones: null,
  ButtonPress: null,
}

export class Activators {
  private bufferDelay = 50
  private bufferFeedback: Set<string> = new Set()
  private bufferTimeout: NodeJS.Timeout | null = null
  private instance
  private unknownActivatorWarning: string[] = []

  constructor(instance: VMixInstance) {
    this.instance = instance
  }

  /**
   * @description Clear any existing timer on instance disable/removal
   */
  public readonly destroy = (): void => {
    if (this.bufferTimeout) {
      clearTimeout(this.bufferTimeout)
    }
  }

  /**
   * @description Triggers feedback checks and updates variables
   */
  private executeBuffer = (): void => {
    this.instance.checkFeedbacks(...this.bufferFeedback)
    this.bufferFeedback.clear()
    if (this.instance.variables) this.instance.variables.updateVariables()
    this.bufferTimeout = null
  }

  /**
   * @param params [event, volume or state]
   * @description Updates volume levels or audio state of audio busses
   */
  private readonly handlerBusAudio = (params: string[]): void => {
    let id = params[0].startsWith('Master') ? 'master' : params[0][3]

    if (!params[0].startsWith('Master')) {
      id = 'bus' + id
    }

    if (params[0] === 'MasterHeadphones') {
      const volume = parseFloat(params[1]) * 100
      const bus = this.instance.data.getAudioBus('master')

      if (bus) {
        bus.headphonesVolume = volume
        this.updateBuffer('busVolumeLevel')
      }
    } else if (params[0].endsWith('Volume')) {
      const volume = parseFloat(params[1]) * 100
      const bus = this.instance.data.getAudioBus(id)

      if (bus) {
        bus.volume = volume
        this.updateBuffer('busVolumeLevel')
        this.updateBuffer('liveBusVolume')
      }
    } else if (params[0].endsWith('Audio')) {
      const bus = this.instance.data.getAudioBus(id)

      if (bus) {
        bus.muted = params[1] === '0'
        this.updateBuffer('busMute')
      }
    } else if (params[0].endsWith('Solo')) {
      const bus = this.instance.data.getAudioBus(id)

      if (bus) {
        bus.solo = params[1] === '1'
        this.updateBuffer('busSolo')
      }
    }
  }

  /**
   * @param params [event, input number, state]
   * @description Updates input routing to busses
   */
  private readonly handlerInputAudio = async (params: string[]): Promise<void> => {
    const input = await this.instance.data.getInput(params[1])

    if (!input || !input.audioBusses) {
      return
    }

    let bus: AudioBusMasterID

    if (params[0] === 'InputMasterAudio') {
      bus = 'M'
    } else {
      bus = params[0][8] as AudioBusMasterID
    }

    input.audioBusses[bus] = params[2] === '1'

    this.updateBuffer('inputMute')
    this.updateBuffer('inputBusRouting')
  }

  /**
   * @param params [event, input number, volume or state]
   * @description Updates input playing, volume, mute, and solo
   */
  private readonly handlerInputState = async (params: string[]): Promise<void> => {
    const input = await this.instance.data.getInput(params[1])

    if (!input) {
      return
    }

    if (params[0] === 'InputPlaying') {
      input.state = params[2] === '0' ? 'Paused' : 'Running'
    } else if (params[0] === 'InputVolume') {
      input.volume = parseFloat(params[2]) * 100

      this.updateBuffer('inputVolumeLevel')
    } else if (params[0] === 'InputAudio') {
      input.muted = params[2] !== '1'
      this.updateBuffer('inputMute')
      this.updateBuffer('inputAudio')
    } else if (params[0] === 'InputSolo') {
      input.solo = params[2] !== '0'
      this.updateBuffer('inputSolo')
    }
  }

  /**
   * @param params [event, input, state]
   * @description Updates preview and program state for each mix
   */
  private readonly handlerPreviewProgram = async (params: string[]): Promise<void> => {
    let mix = 0
    const type = params[0].includes('Preview') ? 'preview' : 'program'
    const inputNumber = params[1]
    const state = params[2]

    // Check the last character of event name to indicate if message is not for mix 1
    // Note - InputMix2 to InputMix4 activator messages are inconsistent, and may not always reflect what's live in vMix
    const checkMix = parseInt(params[0].charAt(params[0].length - 1), 10)

    if (!isNaN(checkMix)) {
      mix = checkMix - 1
    }

    if (state === '1') {
      this.instance.data.mix[mix][type] = parseInt(inputNumber, 10)

      // Update layer tally
      const tallyType = type === 'preview' ? 'previewTally' : 'programTally'
      this.instance.data.mix[mix][tallyType] = []
      const checkTally = (input: Input) => {
        if (!this.instance.data.mix[mix][tallyType].includes(input.key)) {
          this.instance.data.mix[mix][tallyType].push(input.key)

          input.overlay?.forEach(async (layer) => {
            const layerInput = await this.instance.data.getInput(layer.key)

            if (layerInput) {
              checkTally(layerInput)
            }
          })
        }
      }

      const input = await this.instance.data.getInput(inputNumber)

      if (input) {
        checkTally(input)
      }

      this.instance.data.overlays
        .filter((overlay) => overlay.input !== null)
        .forEach(async (overlay) => {
          const overlayInput = await this.instance.data.getInput(overlay.input as number)

          if (overlayInput) {
            checkTally(overlayInput)
          }
        })

      if (type === 'preview') {
        this.updateBuffer('inputPreview')
      } else {
        this.updateBuffer('inputLive')
      }
      this.updateBuffer('instanceVaraible')
    }
  }

  /**
   * @param params [event, state]
   * @description Updates Replay Camera selection,
   */
  private readonly handlerReplay = (params: string[]): void => {
    if (params[0].startsWith('ReplayCamera')) {
      // Unused
    } else if (params[0].includes('Camera')) {
      const camera = `camera${params[0][6]}` as 'cameraA' | 'cameraB'

      if (params[1] === '1') {
        this.instance.data.replay[camera] = parseInt(params[0].substr(13), 10)
        this.updateBuffer('replayCamera')
      }
    } else if (params[0] === 'ReplayPlayForward') {
      // Only triggers if Replay is playing
      this.instance.data.replay.forward = params[1] === '1'
      this.updateBuffer('replayPlayDirection')
    } else if (params[0] === 'ReplayPlayBackward') {
      // Unused as ReplayPlayForward can determine playback direction
    } else if (params[0] === 'ReplayRecording') {
      this.instance.data.replay.recording = params[1] === '1'
      this.updateBuffer('replayStatus')
    } else if (params[0] === 'ReplayPlaying') {
      this.instance.data.replay.live = params[1] === '1'
    }
  }

  /**
   * @param params [StatusType, state]
   * @description State
   */
  private readonly handlerVMixState = (params: string[]): void => {
    // Adjust casing to match data structure and cast string to StatusType
    const statusType = (params[0][0].toLowerCase() + params[0].substr(1)) as StatusType

    // Streaming activator status doesn't indicate which stream is changing state
    if (statusType !== 'streaming') {
      this.instance.data.status[statusType] = params[1] === '1'
    }

    this.updateBuffer('status')
  }

  /**
   * @param params [audio source, input, state]
   * @description
   */
  private readonly handlerVideoCall = async (params: string[]): Promise<void> => {
    const input = await this.instance.data.getInput(params[1])

    if (!input) return

    if (params[0].includes('AudioSource')) {
      const source = params[0].substring(20) as CallAudioSource

      if (params[2] != '0') {
        input.callAudioSource = source
        this.updateBuffer('videoCallAudioSource')
      }
    } else {
      if (params[2] === '0') {
        input.callVideoSource = 'None'
      } else {
        input.callVideoSource = params[0].substring(15) as CallVideoSource
      }
      this.updateBuffer('videoCallVideoSource')
    }
  }

  /**
   * @param params [channel, input, value]
   * @description Currently unused until further tetsing on load from updating up to 16 variables/feedback per input
   */
  private readonly handlerVolumeChannelMixer = async (params: string[]): Promise<void> => {
    const channel = parseInt(params[0].substring(23), 10)
    const input = await this.instance.data.getInput(params[1])
    const value = parseFloat(params[2])

    if (input) {
      if (!input.channelMixer) input.channelMixer = []
      input.channelMixer[channel] = value
    }
  }

  /**
   * @param message Activator message from the TCP connection
   * @description Parses Activator mssage and passes to appropriate handler
   */
  readonly parse = (message: string): void => {
    const params = message.split(' ')
    const eventType = eventHandlers[params[0]]

    if (eventType === undefined) {
      // Limit warnings to once per unknown activator
      if (!this.unknownActivatorWarning.includes(params[0])) {
        this.unknownActivatorWarning.push(params[0])
        this.instance.log('debug', `Unknown vMix activator: ${params[0]}`)
      }
    } else if (eventType === null) {
      // Unused event
    } else {
      this[eventType](params)
    }
  }

  /**
   * @param name feedback name
   * @description Adds feedback or variable changes to a buffer to debounce updates
   */
  private updateBuffer = (name: string): void => {
    if (name !== '') this.bufferFeedback.add(name)

    // Start a new timeout if not already running
    if (this.bufferTimeout === null) {
      this.bufferTimeout = setTimeout(this.executeBuffer, this.bufferDelay)
    }
  }
}
