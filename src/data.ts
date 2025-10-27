import * as xml2js from 'xml2js'
import { get, isEqual } from 'lodash'
import type VMixInstance from './'

export interface AudioBus {
  bus: 'master' | 'busA' | 'busB' | 'busC' | 'busD' | 'busE' | 'busF' | 'busG'
  volume: number
  muted: boolean
  meterF1: number
  meterF2: number
  headphonesVolume?: number
  solo: boolean
  sendToMaster: boolean
}

export interface AudioLevel {
  key: string
  type: 'input' | 'bus'
  meterF1: { time: Date; value: number }[]
  meterF2: { time: Date; value: number }[]
}

interface AudioLevelData {
  s1MeterF1Avg: number
  s1MeterF2Avg: number
  s3MeterF1Avg: number
  s3MeterF2Avg: number
  s1MeterF1Peak: number
  s1MeterF2Peak: number
  s3MeterF1Peak: number
  s3MeterF2Peak: number
}

export interface AudioBusses {
  M: boolean
  A: boolean
  B: boolean
  C: boolean
  D: boolean
  E: boolean
  F: boolean
  G: boolean
}

export type CallAudioSource = 'Master' | 'Headphones' | 'BusA' | 'BusB' | 'BusC' | 'BusD' | 'BusE' | 'BusF' | 'BusG'

export type CallVideoSource = 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'

export interface ChannelMixer {
  [key: string]: InputAudioChannels[]
}

export interface ColourCorrection {
  hue: number
  saturation: number
  liftR: number
  liftG: number
  liftB: number
  liftY: number
  gammaR: number
  gammaG: number
  gammaB: number
  gammaY: number
  gainR: number
  gainG: number
  gainB: number
  gainY: number
}

export interface DynamicInput {
  name: string
  value: string
}

export interface DynamicValue {
  name: string
  value: string
}

export interface Input {
  key: string
  number: number
  type: string
  title: string
  shortTitle: string | null
  state: string
  position: number
  duration: number
  loop: boolean
  markIn?: number
  markOut?: number
  muted?: boolean
  solo?: boolean
  volume?: number
  audioBusses?: AudioBusses
  audioAuto?: boolean
  balance?: number
  volumeF1?: number
  volumeF2?: number
  meterF1?: number
  meterF2?: number
  list?: List[]
  overlay?: Layer[]
  text?: TitleText[]
  image?: TitleImage[]
  color?: TitleImage[]
  selectedIndex?: number
  callPassword?: string
  callConnected?: boolean
  callVideoSource?: CallVideoSource
  callAudioSource?: CallAudioSource
  channelMixer?: number[]
  cc?: ColourCorrection
  inputPosition?: InputPosition
  frameDelay?: number
}

export interface InputAudioChannels {
  channel: number
  volume: number
}

export interface InputPosition {
  panX: number
  panY: number
  zoomX: number
  zoomY: number
  cropX1: number
  cropX2: number
  cropY1: number
  cropY2: number
  [key: string]: number
}

export interface Layer {
  index: number
  key: string
  panX: number
  panY: number
  zoomX: number
  zoomY: number
  x: number
  y: number
  width: number
  height: number
  cropX1: number
  cropX2: number
  cropY1: number
  cropY2: number
  [key: string]: number | string
}

export interface List {
  index: number
  location: string
  filename: string
  selected: boolean
}

export interface Mix {
  number: number
  active: boolean
  preview: number
  program: number
  previewTally: string[]
  programTally: string[]
}

export interface Output {
  type: 'fullscreen' | 'output'
  number: number
  source: string
  input: number
  mix: number
  ndi: boolean
  omt: boolean
  srt: boolean
}

export interface Overlay {
  number: number
  preview: boolean
  input: number | null
}

export interface Recording {
  duration: number
  filename1: string
  filename2: string
}

export interface Replay {
  recording: boolean
  live: boolean
  forward: boolean
  channelMode: 'AB' | 'A' | 'B'
  quadMode: boolean
  events: number
  eventsA: number
  eventsB: number
  cameraA: number
  cameraB: number
  speed: number
  speedA: number
  speedB: number
  timecode: string
  timecodeA: string
  timecodeB: string
}

export interface Status {
  fadeToBlack: boolean
  recording: boolean
  external: boolean
  streaming: boolean
  stream: [boolean, boolean, boolean, boolean, boolean]
  playList: boolean
  multiCorder: boolean
  fullscreen: boolean
}

export interface TitleText {
  index: number
  name: string
  value: string
}

export interface TitleImage {
  index: number
  name: string
  value: string
}

export interface TitleColor {
  index: number
  name: string
  value: string
}

export interface Transition {
  number: number
  effect: any
  duration: number
}

interface APIData {
  version: string
  majorVersion: number
  edition: string
  preset: string
  inputs: Input[]
  outputs: Output[]
  overlays: Overlay[]
  transitions: Transition[]
  mix: [Mix, Mix, Mix, Mix, Mix, Mix, Mix, Mix, Mix, Mix, Mix, Mix, Mix, Mix, Mix, Mix]
  audio: AudioBus[]
  status: Status
  recording: Recording
  replay: Replay
  channelMixer: ChannelMixer
  dynamicInput: DynamicInput[]
  dynamicValue: DynamicValue[]
}

const parserOptions = {
  tagNameProcessors: [],
  attrNameProcessors: [],
  valueProcessors: [xml2js.processors.parseBooleans],
  attrValueProcessors: [xml2js.processors.parseBooleans],
}

const parser = new xml2js.Parser(parserOptions)

export class VMixData {
  instance: VMixInstance
  loaded: boolean
  version: string
  majorVersion: number
  edition: string
  preset: string
  inputs: Input[]
  outputs: Output[]
  overlays: Overlay[]
  transitions: Transition[]
  mix: Mix[]
  audio: AudioBus[]
  audioLevels: AudioLevel[]
  status: Status
  recording: Recording
  replay: Replay
  channelMixer: ChannelMixer
  dynamicInput: DynamicInput[]
  dynamicValue: DynamicValue[]

  constructor(instance: VMixInstance) {
    this.instance = instance
    this.loaded = false
    this.version = ''
    this.majorVersion = 0
    this.edition = ''
    this.preset = ''
    this.inputs = []
    this.outputs = []
    this.overlays = []
    this.transitions = []
    this.mix = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((mixNumber) => {
      return {
        number: mixNumber,
        active: mixNumber === 1,
        preview: 0,
        program: 0,
        previewTally: [],
        programTally: [],
      }
    })

    this.audio = []
    this.audioLevels = []
    this.status = {
      fadeToBlack: false,
      recording: false,
      external: false,
      streaming: false,
      stream: [false, false, false, false, false],
      playList: false,
      multiCorder: false,
      fullscreen: false,
    }
    this.recording = {
      duration: 0,
      filename1: '',
      filename2: '',
    }
    this.replay = {
      recording: false,
      live: false,
      forward: true,
      channelMode: 'AB',
      quadMode: false,
      events: 1,
      eventsA: 1,
      eventsB: 1,
      cameraA: 1,
      cameraB: 1,
      speed: 1,
      speedA: 1,
      speedB: 1,
      timecode: '',
      timecodeA: '',
      timecodeB: '',
    }
    this.channelMixer = {}
    this.dynamicInput = []
    this.dynamicValue = []
  }

  /**
   * @param bus Must be either Master, A to G, or busA to busG
   * @returns AudioBus or null
   * @description Will return the audio bus, or null if the bus is not found (or not supported on the connected vMix machine)
   */
  public getAudioBus(bus: string): AudioBus | null {
    let id = bus.toLowerCase()

    if (bus.length === 1) {
      id = 'bus' + id
    }

    const audioBus = this.audio.find((item) => item.bus.toLowerCase() === id)

    return audioBus || null
  }

  /**
   * @param level
   * @returns AudioLevelData
   * @description parses an AudioLevel into 1 second and 3 second data
   */
  public getAudioLevelData(level: AudioLevel): AudioLevelData {
    const now = Math.floor(new Date().getTime() / 1000)
    let s1 = 1000 / this.instance.config.apiPollInterval
    let s3 = s1 * 3

    if (s1 < 1) s1 = 1
    if (s3 < 1) s3 = 1

    const s1ArrF1 = level.meterF1.filter((level) => Math.floor(level.time.getTime() / 1000) === now - 1).map((level) => level.value)
    const s1ArrF2 = level.meterF2.filter((level) => Math.floor(level.time.getTime() / 1000) === now - 1).map((level) => level.value)
    const s3ArrF1 = level.meterF1.filter((level) => Math.floor(level.time.getTime() / 1000) < now && Math.floor(level.time.getTime() / 1000) > now - 4).map((level) => level.value)
    const s3ArrF2 = level.meterF2.filter((level) => Math.floor(level.time.getTime() / 1000) < now && Math.floor(level.time.getTime() / 1000) > now - 4).map((level) => level.value)

    let s1MeterF1Peak = 0
    let s1MeterF2Peak = 0
    let s3MeterF1Peak = 0
    let s3MeterF2Peak = 0

    s1ArrF1.forEach((level) => {
      if (level > s1MeterF1Peak) s1MeterF1Peak = level
    })

    s1ArrF2.forEach((level) => {
      if (level > s1MeterF2Peak) s1MeterF2Peak = level
    })

    s3ArrF1.forEach((level) => {
      if (level > s3MeterF1Peak) s3MeterF1Peak = level
    })

    s3ArrF2.forEach((level) => {
      if (level > s3MeterF2Peak) s3MeterF2Peak = level
    })

    return {
      s1MeterF1Avg: s1ArrF1.reduce((a, b) => a + b, 0) / s1ArrF1.length,
      s1MeterF2Avg: s1ArrF2.reduce((a, b) => a + b, 0) / s1ArrF2.length,
      s3MeterF1Avg: s3ArrF1.reduce((a, b) => a + b, 0) / s3ArrF1.length,
      s3MeterF2Avg: s3ArrF2.reduce((a, b) => a + b, 0) / s3ArrF2.length,
      s1MeterF1Peak,
      s1MeterF2Peak,
      s3MeterF1Peak,
      s3MeterF2Peak,
    }
  }

  /**
   * @param value accepts input number, shortTitle, title, GUID, or instance variable
   * @returns Input or null if not found
   * @description any instance variables are parsed, and then input numbers take priority over other types
   */
  public async getInput(value: string | number): Promise<Input | null> {
    const int = RegExp(/^\d+$/)
    const instanceVariable = RegExp(/\$\(([^:$)]+):([^)$]+)\)/)

    let parsedVariable = value
    let input

    if (typeof value !== 'number' && instanceVariable.test(value)) {
      const getVariable = await this.instance.parseOption(value)
      if (getVariable !== undefined) {
        if (Array.isArray(getVariable)) {
          parsedVariable = getVariable[0]
        }
      }
    }

    if (typeof parsedVariable === 'number' || int.test(parsedVariable)) {
      input = this.inputs.find((item) => item.number == parsedVariable)
    } else {
      input = this.inputs.find((item) => item.shortTitle === parsedVariable || item.title === parsedVariable || item.key === parsedVariable)
    }

    return input || null
  }

  /**
   * @param value accepts input number, shortTitle, title, GUID, or instance variable
   * @returns shortTitle, title, or an empty string
   */
  public async getInputTitle(value: string | number): Promise<string> {
    const input = await this.getInput(value)

    return input ? input.shortTitle || input.title : ''
  }

  /**
   * @param data XML API data from vMix
   * @returns Promise resolving to the new data
   */
  private async parse(data: string): Promise<APIData> {
    return parser.parseStringPromise(data).then((parsedData: any) => {
      parsedData = parsedData.vmix
      const version = parsedData.version[0] || ''
      const majorVersion = parseInt(version.split('.')[0])

      const getInputs = (): Input[] => {
        if (!parsedData.inputs || parsedData.inputs[0] === '') {
          return []
        }

        const inputs = parsedData.inputs[0].input.map((input: any) => {
          const inputData: Input = {
            key: input.$.key,
            number: parseInt(input.$.number, 10),
            type: input.$.type,
            title: input.$.title + '',
            shortTitle: input.$.shortTitle + '' || null,
            state: input.$.state,
            position: parseFloat(input.$.position),
            duration: parseFloat(input.$.duration),
            loop: input.$.loop,
            volume: parseFloat(input.$.volume || '100'),
            audioAuto: true,
            muted: input.$.muted,
            solo: input.$.solo,
            selectedIndex: parseInt(input.$.selectedIndex, 10),
            frameDelay: parseInt(input.$.frameDelay, 10) || 0,
          }

          if (input.list) {
            if (input.list[0] !== '') {
              inputData.list = input.list[0].item.map((listItem: any, index: number) => {
                const data: List = {
                  index,
                  location: '',
                  filename: '',
                  selected: false,
                }

                if (typeof listItem !== 'string') {
                  data.location = listItem._
                  data.selected = true
                } else {
                  data.location = listItem
                }

                data.filename = data.location.split('\\')[data.location.split('\\').length - 1]

                return data
              })
            } else {
              inputData.list = []
            }
          }

          if (input.$.markIn !== undefined) {
            inputData.markIn = parseInt(input.$.markIn, 10)
          }

          if (input.$.markOut !== undefined) {
            inputData.markOut = parseInt(input.$.markOut, 10)
          }

          if (input.$.volumeF1 !== undefined) {
            inputData.volumeF1 = parseFloat(input.$.volumeF1)
          }

          if (input.$.volumeF2 !== undefined) {
            inputData.volumeF2 = parseFloat(input.$.volumeF2)
          }

          if (input.$.meterF1 !== undefined) {
            inputData.meterF1 = parseFloat(input.$.meterF1)
          }

          if (input.$.meterF2 !== undefined) {
            inputData.meterF2 = parseFloat(input.$.meterF2)
          }

          if (inputData.meterF1 && inputData.meterF2) {
            const audioLevel = this.audioLevels.find((level) => level.key === inputData.key)
            const now = new Date()

            if (!audioLevel) {
              this.audioLevels.push({
                key: inputData.key,
                type: 'input',
                meterF1: [{ time: now, value: inputData.meterF1 }],
                meterF2: [{ time: now, value: inputData.meterF2 }],
              })
            } else {
              audioLevel.meterF1.push({ time: now, value: inputData.meterF1 })
              audioLevel.meterF2.push({ time: now, value: inputData.meterF2 })

              if (audioLevel.meterF1.length > 50) audioLevel.meterF1.shift()
              if (audioLevel.meterF2.length > 50) audioLevel.meterF2.shift()
            }
          }

          if (input.$.audiobusses !== undefined) {
            // API Data is a string of comma separated busses, eg 'M', or 'M,A,B,G'
            inputData.audioBusses = {
              M: input.$.audiobusses.includes('M'),
              A: input.$.audiobusses.includes('A'),
              B: input.$.audiobusses.includes('B'),
              C: input.$.audiobusses.includes('C'),
              D: input.$.audiobusses.includes('D'),
              E: input.$.audiobusses.includes('E'),
              F: input.$.audiobusses.includes('F'),
              G: input.$.audiobusses.includes('G'),
            }
          }

          if (input?.overlay?.[0]?.$) {
            inputData.overlay = input.overlay.map((overlay: any) => ({
              index: parseInt(overlay.$.index, 10),
              key: overlay.$.key,
              panX: parseFloat(get(overlay, 'position[0].$.panX', 0)),
              panY: parseFloat(get(overlay, 'position[0].$.panY', 0)),
              zoomX: parseFloat(get(overlay, 'position[0].$.zoomX', 1)),
              zoomY: parseFloat(get(overlay, 'position[0].$.zoomY', 1)),
              x: parseFloat(get(overlay, 'position[0].$.x', 0)),
              y: parseFloat(get(overlay, 'position[0].$.y', 0)),
              width: parseFloat(get(overlay, 'position[0].$.width', 0)),
              height: parseFloat(get(overlay, 'position[0].$.height', 0)),
              cropX1: parseFloat(get(overlay, 'crop[0].$.X1', 0)),
              cropX2: parseFloat(get(overlay, 'crop[0].$.X2', 1)),
              cropY1: parseFloat(get(overlay, 'crop[0].$.Y1', 0)),
              cropY2: parseFloat(get(overlay, 'crop[0].$.Y2', 1)),
            }))
          }

          if (input.$.text) {
            inputData.text = input.$.text.map((text: any) => ({
              index: parseInt(text.$.index, 10),
              name: text.$.name + '',
              value: text._ === undefined ? '' : text._ + '',
            }))
          }

          if (input.text && input.text.length > 0) {
            inputData.text = input.text.map((text: any) => ({
              index: parseInt(text.$.index, 10),
              name: text.$.name + '',
              value: text._ === undefined ? '' : text._ + '',
            }))
          }

          if (input.$.type === 'GT') {
            if (input.image) {
              inputData.image = input.image.map((image: any) => ({
                index: parseInt(image.$.index, 10),
                name: image.$.name + '',
                value: image._ === undefined ? '' : image._ + '',
              }))
            }

            if (input.color) {
              inputData.color = input.color.map((color: any) => ({
                index: parseInt(color.$.index, 10),
                name: color.$.name + '',
                value: color._ === undefined ? '' : color._ + '',
              }))
            }
          }

          if (input.$.type === 'VideoCall') {
            inputData.callPassword = input.$.callPassword
            inputData.callConnected = input.$.callConnected
            inputData.callVideoSource = input.$.callVideoSource
            inputData.callAudioSource = input.$.callAudioSource
          }

          if (!isNaN(majorVersion) && majorVersion >= 27) {
            inputData.cc = {
              hue: parseFloat(input.cc?.[0]?.$?.hue ?? 0),
              saturation: parseFloat(input.cc?.[0]?.$?.saturation ?? 0),
              liftR: parseFloat(input.cc?.[0]?.$?.liftR ?? 0),
              liftG: parseFloat(input.cc?.[0]?.$?.liftG ?? 0),
              liftB: parseFloat(input.cc?.[0]?.$?.liftB ?? 0),
              liftY: parseFloat(input.cc?.[0]?.$?.liftY ?? 0),
              gammaR: parseFloat(input.cc?.[0]?.$?.gammaR ?? 0),
              gammaG: parseFloat(input.cc?.[0]?.$?.gammaG ?? 0),
              gammaB: parseFloat(input.cc?.[0]?.$?.gammaB ?? 0),
              gammaY: parseFloat(input.cc?.[0]?.$?.gammaY ?? 0),
              gainR: parseFloat(input.cc?.[0]?.$?.gainR ?? 1),
              gainG: parseFloat(input.cc?.[0]?.$?.gainG ?? 1),
              gainB: parseFloat(input.cc?.[0]?.$?.gainB ?? 1),
              gainY: parseFloat(input.cc?.[0]?.$?.gainY ?? 1),
            }

            inputData.inputPosition = {
              panX: parseFloat(input.position?.[0]?.$?.panX ?? 0),
              panY: parseFloat(input.position?.[0]?.$?.panY ?? 0),
              zoomX: parseFloat(input.position?.[0]?.$?.zoomX ?? 1),
              zoomY: parseFloat(input.position?.[0]?.$?.zoomY ?? 1),
              cropX1: parseFloat(input.crop?.[0]?.$?.X1 ?? 0),
              cropX2: parseFloat(input.crop?.[0]?.$?.X2 ?? 1),
              cropY1: parseFloat(input.crop?.[0]?.$?.Y1 ?? 0),
              cropY2: parseFloat(input.crop?.[0]?.$?.Y2 ?? 1),
            }
          }

          return inputData
        })

        return inputs
      }

      const getOutputs = (): Output[] => {
        const outputs = get(parsedData, 'outputs[0].output')

        if (!outputs) return []

        return outputs.map((output: any) => ({
          type: output.$.type,
          number: parseInt(output.$.number, 10),
          source: output.$.source,
          input: parseInt(output.$.inputNumber || 0, 10),
          mix: parseInt(output.$.mix || 0, 10),
          ndi: output.$.ndi || false,
          omt: output.$.omt || false,
          srt: output.$.srt || false,
        }))
      }

      const getOverlays = (): Overlay[] => {
        const overlays = get(parsedData, 'overlays[0].overlay')

        if (!overlays) {
          return []
        }

        return overlays.map((overlay: any) => ({
          number: parseInt(overlay.$.number, 10),
          preview: overlay.$.preview || false,
          input: overlay._ !== undefined ? parseInt(overlay._, 10) : null,
        }))
      }

      const getTransitions = (): Transition[] => {
        const transitions = get(parsedData, 'transitions[0].transition')

        if (!transitions) {
          return []
        }

        return transitions.map((transition: any) => ({
          number: parseInt(transition.$.number, 10),
          effect: transition.$.effect,
          duration: parseInt(transition.$.duration, 10),
        }))
      }

      const getMix = (mixID: number): Mix => {
        const mix = {
          number: mixID,
          active: false,
          preview: 0,
          program: 0,
          previewTally: [],
          programTally: [],
        }

        if (mixID === 1) {
          mix.active = true
          mix.preview = parseInt(parsedData.preview[0], 10)
          mix.program = parseInt(parsedData.active[0], 10)
        } else {
          if (parsedData.mix) {
            parsedData.mix.forEach((item: any) => {
              if (item.$.number == mixID) {
                mix.active = true
                mix.preview = item.preview[0]
                mix.program = item.active[0]
              }
            })
          }
        }

        return mix
      }

      const getAudio = (): AudioBus[] => {
        const audio = parsedData.audio[0]
        const busData: AudioBus[] = []

        Object.keys(audio).forEach((key) => {
          const bus = { ...audio[key][0].$, bus: key }
          if (bus.solo === undefined) bus.solo = false
          if (bus.sendToMaster === undefined) bus.sendToMaster = false

          bus.volume = parseFloat(bus.volume)
          bus.meterF1 = parseFloat(bus.meterF1)
          bus.meterF2 = parseFloat(bus.meterF2)
          if (bus.headphonesVolume !== undefined) {
            bus.headphonesVolume = parseFloat(bus.headphonesVolume)
          }

          busData.push(bus)

          const audioLevel = this.audioLevels.find((level) => level.key === key)
          const now = new Date()

          if (!audioLevel) {
            this.audioLevels.push({
              key,
              type: 'bus',
              meterF1: [{ time: now, value: bus.meterF1 }],
              meterF2: [{ time: now, value: bus.meterF2 }],
            })
          } else {
            audioLevel.meterF1.push({ time: now, value: bus.meterF1 })
            audioLevel.meterF2.push({ time: now, value: bus.meterF2 })

            if (audioLevel.meterF1.length > 50) audioLevel.meterF1.shift()
            if (audioLevel.meterF2.length > 50) audioLevel.meterF2.shift()
          }
        })

        return busData
      }

      const getRecordingDuration = (): number => {
        if (parsedData.recording[0]?.$?.duration) {
          return parsedData.recording[0]?.$?.duration
        } else {
          return 0
        }
      }

      const getReplay = (): Replay => {
        const defaultReplay: Replay = {
          recording: false,
          live: false,
          forward: true,
          channelMode: 'AB',
          quadMode: false,
          events: 1,
          eventsA: 1,
          eventsB: 1,
          cameraA: 1,
          cameraB: 1,
          speed: 1,
          speedA: 1,
          speedB: 1,
          timecode: '',
          timecodeA: '',
          timecodeB: '',
        }

        const inputs = get(parsedData, 'inputs[0].input')

        if (!inputs) {
          return defaultReplay
        }

        let replay = inputs.find((input: any) => {
          return input.$ && input.$.type === 'Replay'
        })

        // Handle no replay input, or partially loaded replay input that has an incomplete object
        if (!replay || !replay.replay) {
          return defaultReplay
        } else {
          replay = replay.replay[0]

          const replayData = {
            recording: replay.$.recording,
            live: replay.$.live,
            forward: this.replay.forward,
            channelMode: replay.$.channelMode ? replay.$.channelMode : 'AB',
            quadMode: this.replay.quadMode,
            events: parseInt(replay.$.events, 10),
            eventsA: replay.$.eventsA ? parseInt(replay.$.eventsA, 10) : 0,
            eventsB: replay.$.eventsB ? parseInt(replay.$.eventsB, 10) : 0,
            cameraA: parseInt(replay.$.cameraA, 10),
            cameraB: parseInt(replay.$.cameraB, 10),
            speed: parseFloat(replay.$.speed),
            speedA: replay.$.speedA ? parseFloat(replay.$.speedA) : 0,
            speedB: replay.$.speedB ? parseFloat(replay.$.speedB) : 0,
            timecode: replay.timecode[0],
            timecodeA: replay.timecodeA ? replay.timecodeA[0] : '',
            timecodeB: replay.timecodeB ? replay.timecodeB[0] : '',
          }

          // Prevent XML data from mirroring camera A to camera B. Activator data will be the more accurate source
          if (replayData.channelMode === 'AB') {
            replayData.cameraB = this.replay.cameraB
          }

          return replayData
        }
      }

      const getDynamics = (dynamicType: 'input' | 'value'): DynamicInput[] | DynamicValue[] => {
        // Dynamic inputs and variables are not supported prior to v24
        if (!parsedData.dynamic) {
          return []
        }

        const values: DynamicInput[] | DynamicValue[] = []

        for (const k in parsedData.dynamic[0]) {
          if (k.startsWith(dynamicType)) {
            values.push({ name: k, value: parsedData.dynamic[0][k][0] })
          }
        }

        return values
      }

      // Data object that will be used to track changes, and then overwrite existing data
      const newData: APIData = {
        version,
        majorVersion,
        edition: parsedData.edition[0] || '',
        preset: parsedData.preset ? parsedData.preset[0] : '',
        inputs: getInputs(),
        outputs: getOutputs(),
        overlays: getOverlays(),
        transitions: getTransitions(),
        mix: [
          getMix(1),
          getMix(2),
          getMix(3),
          getMix(4),
          getMix(5),
          getMix(6),
          getMix(7),
          getMix(8),
          getMix(9),
          getMix(10),
          getMix(11),
          getMix(12),
          getMix(13),
          getMix(14),
          getMix(15),
          getMix(16),
        ],
        audio: getAudio(),
        status: {
          fadeToBlack: parsedData.fadeToBlack[0],
          recording: parsedData.recording[0] === true || parsedData.recording[0]._ === true,
          external: parsedData.external[0],
          streaming: parsedData.streaming[0] === true || parsedData.streaming[0]._ === true,
          stream: [
            parsedData.streaming[0].$?.channel1 ? parsedData.streaming[0].$.channel1 : false,
            parsedData.streaming[0].$?.channel2 ? parsedData.streaming[0].$.channel2 : false,
            parsedData.streaming[0].$?.channel3 ? parsedData.streaming[0].$.channel3 : false,
            parsedData.streaming[0].$?.channel4 ? parsedData.streaming[0].$.channel4 : false,
            parsedData.streaming[0].$?.channel5 ? parsedData.streaming[0].$.channel5 : false,
          ],
          playList: parsedData.playList[0],
          multiCorder: parsedData.multiCorder[0],
          fullscreen: parsedData.fullscreen[0],
        },
        recording: {
          duration: getRecordingDuration(),
          filename1: parsedData.recording[0]?.$?.filename1 || '',
          filename2: parsedData.recording[0]?.$?.filename2 || '',
        },
        replay: getReplay(),
        channelMixer: { ...this.instance.data.channelMixer }, // channelMixer Data is from activators, so previous values must persist through API updates
        dynamicInput: getDynamics('input'),
        dynamicValue: getDynamics('value'),
      }

      // Update layer tally
      newData.mix.forEach((mix) => {
        const checkTally = (type: 'previewTally' | 'programTally', input: Input) => {
          if (!mix[type].includes(input.key)) {
            mix[type].push(input.key)

            if (input.overlay) {
              input.overlay.forEach((layer) => {
                const layerInput = newData.inputs.find((input) => input.key === layer.key)

                if (layerInput) {
                  checkTally(type, layerInput)
                }
              })
            }
          }
        }

        if (mix.preview !== null) {
          const previewInput = newData.inputs.find((input) => input.number == mix.preview)

          if (previewInput) {
            checkTally('previewTally', previewInput)
          }
        }

        if (mix.program !== null) {
          const programInput = newData.inputs.find((input) => input.number == mix.program)

          if (programInput) {
            checkTally('programTally', programInput)
          }
        }

        newData.overlays
          .filter((overlay) => overlay.input !== null)
          .forEach((overlay) => {
            const overlayInput = newData.inputs.find((input) => input.number === overlay.input)

            if (overlayInput) {
              checkTally(overlay.preview ? 'previewTally' : 'programTally', overlayInput)
            }
          })
      })

      // Update channel mixer
      newData.inputs.forEach((input) => {
        if (!newData.channelMixer[input.key]) {
          newData.channelMixer[input.key] = []
          for (let i = 0; i < 16; i++) {
            newData.channelMixer[input.key].push({ channel: i + 1, volume: 1 })
          }
        }
      })

      // Clean up removed inputs from channel mixer
      Object.keys(newData.channelMixer).forEach((key) => {
        if (!newData.inputs.map((input) => input.key).includes(key)) {
          delete newData.channelMixer[key]
        }
      })

      // Clean up Audio levels for removed inputs
      this.audioLevels = this.audioLevels.filter((level) => {
        let inputFound = false
        newData.inputs.forEach((input) => {
          if (input.key === level.key) inputFound = true
        })

        return inputFound || level.type === 'bus'
      })

      return newData
    })
  }

  /**0
   * @param newData newly parsed API data
   * @description compare new and old data to check for changes and trigger feedback/variable updates
   */
  private async setData(newData: APIData): Promise<void> {
    const changes: Set<string> = new Set()

    // Check inputs for additions/deletions or change in index order
    const inputCheck = newData.inputs.map((input) => input.key).join('') !== this.inputs.map((input) => input.key).join('')

    // Copy any existing Channel Mixer data from activator updates
    const updateChannelMixer = async (input: Input) => {
      const oldInput = await this.getInput(input.key)

      if (oldInput && oldInput.channelMixer) input.channelMixer = oldInput.channelMixer
    }

    await Promise.all(newData.inputs.map(async (input) => updateChannelMixer(input)))

    // Add activator data
    newData.audio.forEach((bus) => {
      const oldBus = this.getAudioBus(bus.bus)

      if (oldBus && oldBus.solo) bus.solo = true
    })

    newData.inputs.forEach((newInput) => {
      const oldInput = this.inputs.find((input) => input.key === newInput.key)

      if (oldInput) {
        newInput.audioAuto = oldInput.audioAuto
      } else {
        this.instance.tcp?.updateActivatorData(`ACTS InputAudioAuto ${newInput.number}`)
      }
    })

    // Check mix 1 to 4
    if (!isEqual(newData.mix, this.mix) || inputCheck) {
      changes.add('inputPreview')
      changes.add('inputLive')
      changes.add('overlayStatus')
    }

    // Check Outputs
    if (!isEqual(newData.outputs, this.outputs) || inputCheck) {
      changes.add('outputStatus')
      changes.add('outputNDISRT')
    }

    // Check overlays
    if (!isEqual(newData.overlays, this.overlays) || inputCheck) {
      changes.add('overlayStatus')
    }

    // Update feedbacks for first load, changes handled by Activators
    if (!this.loaded && (!isEqual(newData.inputs, this.inputs) || inputCheck)) {
      changes.add('inputVolumeLevel')
    }

    // Update feedback if new data differs from previous data
    if (!isEqual(newData.inputs, this.inputs) || inputCheck) {
      changes.add('videoTimer')
      changes.add('titleLayer')
      changes.add('inputMute')
      changes.add('inputAudio')
      changes.add('inputSolo')
      changes.add('inputBusRouting')
      changes.add('liveBusVolume')
      changes.add('liveInputVolume')
      changes.add('inputSelectedIndex')
      changes.add('inputSelectedIndexBoolean')
      changes.add('routableMultiviewLayer')
      changes.add('inputVolumeMeter')
      changes.add('inputState')

      // DEPRECATED
      changes.add('titleLayer')
      changes.add('inputSelectedIndexName')
      changes.add('multiviewLayer')
    }

    // Check audio changes
    if (!isEqual(newData.audio, this.audio) || inputCheck) {
      changes.add('busVolumeMeter')
    }

    // Check Transition changes
    if (!isEqual(newData.transitions, this.transitions)) {
      changes.add('transition')
    }

    // Check Video Call changes
    newData.inputs
      .filter((input) => input.type === 'VideoCall')
      .forEach((input) => {
        const previousInput = this.inputs.find((item) => item.key === input.key)

        if (previousInput?.callAudioSource !== input.callAudioSource) {
          changes.add('videoCallAudioSource')
        }

        if (previousInput?.callVideoSource !== input.callVideoSource) {
          changes.add('videoCallVideoSource')
        }
      })

    // Check for status changes
    if (!isEqual(newData.status, this.status)) {
      changes.add('status')
    }

    // Check Audio status
    if (!isEqual(newData.audio, this.audio)) {
      changes.add('busMute')
      changes.add('busSendToMaster')
      changes.add('busVolumeLevel')
      changes.add('liveBusVolume')
    }

    // Check Replay
    if (!isEqual(newData.replay, this.replay)) {
      changes.add('replayStatus')
      changes.add('replayEvents')
      changes.add('replayCamera')
      changes.add('replaySelectedChannel')
    }

    // Dynamic Input / Value
    if (!isEqual(newData.dynamicInput, this.dynamicInput) || !isEqual(newData.dynamicValue, this.dynamicValue)) {
      changes.add('dynamic')
    }

    if (this.recording.duration !== newData.recording.duration) {
      changes.add('recording')
    }

    let variablesUpdate = false
    if (this.version !== newData.version || this.majorVersion !== newData.majorVersion || this.edition !== newData.edition || this.preset !== newData.preset) {
      variablesUpdate = true
    }

    // Overwrite old data with new data
    this.version = newData.version
    this.majorVersion = newData.majorVersion
    this.edition = newData.edition
    this.preset = newData.preset
    this.inputs = newData.inputs
    this.outputs = newData.outputs
    this.overlays = newData.overlays
    this.transitions = newData.transitions
    this.mix = newData.mix
    this.audio = newData.audio
    this.status = newData.status
    this.recording = newData.recording
    this.replay = newData.replay
    this.channelMixer = newData.channelMixer
    this.dynamicInput = newData.dynamicInput
    this.dynamicValue = newData.dynamicValue

    this.instance.apiProcessing.feedbacks = new Date().getTime()

    // Trigger updates for changes
    if (changes.size > 0) {
      this.instance.checkFeedbacks(...changes)
      if (this.instance.variables) this.instance.variables.updateVariables()
    } else if (variablesUpdate) {
      if (this.instance.variables) this.instance.variables.updateVariables()
    } else {
      this.instance.apiProcessing = {
        hold: false,
        holdCount: 0,
        request: 0,
        response: 0,
        parsed: 0,
        feedbacks: 0,
        variables: 0,
      }
    }
  }

  /**
   * @param data vMix XML API string
   * @description parses XML to JSON, updates instance data, triggers updates of feedback and instance variables
   */
  public async update(data: string): Promise<void> {
    return this.parse(data)
      .then(async (newData) => {
        this.instance.apiProcessing.parsed = new Date().getTime()
        await this.setData(newData)

        if (!this.loaded && this.instance.tcp) {
          this.loaded = true
          this.instance.tcp.initActivatorData()
        }
        return
      })
      .catch((err) => {
        this.instance.log('debug', JSON.stringify(err))
        this.instance.checkFeedbacks('status')
        return
      })
  }
}
