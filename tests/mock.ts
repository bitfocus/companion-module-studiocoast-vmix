import 'ts-jest'

const sampleConfig = {
  label: 'vMix',
  host: '127.0.0.1',
  tcpPort: '8099',
  connectionErrorLog: true,
  apiPollInterval: 250,
  volumeLinear: false,
  shiftDelimiter: '/',
  shiftBlinkLayerRouting: true,
  variablesShowInputs: true,
  variablesShowInputNumbers: true,
  variablesShowInputGUID: false,
  variablesShowInputPosition: false,
  variablesShowInputLayerPosition: false,
  strictInputVariableTypes: false,
}

export const mockInstance: any = {
  apiProcessing: {
    hold: false,
    parsed: 0
  },
  checkFeedbacks: jest.fn(),
  config: sampleConfig,
  data: {
    dynamicInput: [
      {
        name: 'input1',
        value: '1'
      },
      {
        name: 'input2',
        value: ''
      },
      {
        name: 'input3',
        value: ''
      },
      {
        name: 'input4',
        value: ''
      }
    ],
    dynamicValue: [
      {
        name: 'value1',
        value: '1'
      },
      {
        name: 'value2',
        value: '2'
      },
      {
        name: 'value3',
        value: '3'
      },
      {
        name: 'value4',
        value: ''
      }
    ],
    inputs: [
      {
        key: '2ba7427a-71d6-4973-acfc-52935f3e0b0b',
        number: 1,
        type: 'Image',
        title: 'SampleInput1',
        shortTitle: 'SampleInput1',
        state: 'Paused',
        position: '0',
        duration: '0',
        loop: false,
        volume: 100,
        audioAuto: true,
        selectedIndex: null,
        frameDelay: 0,
        cc: {
          hue: 0,
          saturation: 0,
          liftR: 0,
          liftG: 0,
          liftB: 0,
          liftY: 0,
          gammaR: 0,
          gammaG: 0,
          gammaB: 0,
          gammaY: 0,
          gainR: 1,
          gainG: 1,
          gainB: 1,
          gainY: 1
        },
        inputPosition: {
          panX: 0,
          panY: 0,
          zoomX: 1,
          zoomY: 1,
          cropX1: 0,
          cropX2: 1,
          cropY1: 0,
          cropY2: 1
        }
      },
      {
        key: '9e69f116-85ac-4790-939f-3ff5fb567934',
        number: 2,
        type: 'Image',
        title: 'SampleInput2',
        shortTitle: 'SampleInput2',
        state: 'Paused',
        position: '0',
        duration: '0',
        loop: false,
        volume: 100,
        audioAuto: true,
        selectedIndex: null,
        frameDelay: 0,
        cc: {
          hue: 0,
          saturation: 0,
          liftR: 0,
          liftG: 0,
          liftB: 0,
          liftY: 0,
          gammaR: 0,
          gammaG: 0,
          gammaB: 0,
          gammaY: 0,
          gainR: 1,
          gainG: 1,
          gainB: 1,
          gainY: 1
        },
        inputPosition: {
          panX: 0,
          panY: 0,
          zoomX: 1,
          zoomY: 1,
          cropX1: 0,
          cropX2: 1,
          cropY1: 0,
          cropY2: 1
        }
      }
    ],
    transitions: [
      {
        number: 1,
        effect: 'Fade',
        duration: 500
      },
      {
        number: 2,
        effect: 'Merge',
        duration: 2000
      },
      {
        number: 3,
        effect: 'Wipe',
        duration: 1000
      },
      {
        number: 4,
        effect: 'CubeZoom',
        duration: 1000
      }
    ]
  },
  log: jest.fn(),
  setVariableValues: jest.fn(),
  tcp: {
    sendCommand: jest.fn(),
    updateActivatorData: jest.fn()
  },
  timers: [],
  variables: {
    currentVariables: {
      connected_state: 'true',
      ftb_active: 'false',
      playlist_active: 'false',
      fullscreen_active: 'false',
      external_active: 'false',
      multicorder_active: 'false',
    },
    updateVariables: jest.fn(),
  }
}
