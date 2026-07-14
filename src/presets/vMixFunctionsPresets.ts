import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

export const getFunctionDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const functionDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    functions_toggleMulticorder: {
      name: 'Toggle Multicorder',
      type: 'simple',
      style: {
        text: 'Toggle Multicorder',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'multicorderFunctions', options: { functionID: 'StartStopMultiCorder' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'multiCorder', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleRecording: {
      name: 'Toggle Recording',
      type: 'simple',
      style: {
        text: 'Toggle Recording',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'recordingFunctions', options: { functionID: 'StartStopRecording' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'recording', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleExternal: {
      name: 'Toggle External',
      type: 'simple',
      style: {
        text: 'Toggle External',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'externalFunctions', options: { functionID: 'StartStopExternal' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'external', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleFullscreen: {
      name: 'Toggle Fullscreen',
      type: 'simple',
      style: {
        text: 'Toggle Fullscreen',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'fullscreenFunctions', options: { functionID: 'Fullscreen' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'fullscreen', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleFTB: {
      name: 'Toggle FTB',
      type: 'simple',
      style: {
        text: 'Toggle FTB',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'fadeToBlack', options: {} }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'fadeToBlack', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleStream: {
      name: 'Toggle Stream',
      type: 'simple',
      style: {
        text: 'Toggle All Streams',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'streamingFunctions', options: { functionID: 'StartStopStreaming', value: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'streaming', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleStream1: {
      name: 'Toggle Stream 1',
      type: 'simple',
      style: {
        text: 'Toggle Stream 1',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'streamingFunctions', options: { functionID: 'StartStopStreaming', value: '1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'streaming', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleStream2: {
      name: 'Toggle Stream 2',
      type: 'simple',
      style: {
        text: 'Toggle Stream 2',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'streamingFunctions', options: { functionID: 'StartStopStreaming', value: '2' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'streaming', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleStream3: {
      name: 'Toggle Stream 3',
      type: 'simple',
      style: {
        text: 'Toggle Stream 3',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'streamingFunctions', options: { functionID: 'StartStopStreaming', value: '3' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'streaming', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleStream4: {
      name: 'Toggle Stream 4',
      type: 'simple',
      style: {
        text: 'Toggle Stream 4',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'streamingFunctions', options: { functionID: 'StartStopStreaming', value: '4' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'streaming', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    functions_toggleStream5: {
      name: 'Toggle Stream 5',
      type: 'simple',
      style: {
        text: 'Toggle Stream 5',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'streamingFunctions', options: { functionID: 'StartStopStreaming', value: '5' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'streaming', value: '' },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },
  }

  return functionDefinitions
}

export const getVMixFunctionsStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'vMixFunctions',
      name: 'General Functions',
      description: 'Recording / Streaming / External / Fullscreen / MultiCorder / FTB',
      definitions: [
        {
          id: 'videoState',
          type: 'simple',
          name: 'Recording / External / Fullscreen / MultiCorder / FTB',
          description: '',
          presets: ['functions_toggleRecording', 'functions_toggleExternal', 'functions_toggleFullscreen', 'functions_toggleMulticorder', 'functions_toggleFTB'],
        },
        {
          id: 'videoState',
          type: 'simple',
          name: 'Streams',
          description: '',
          presets: [
            'functions_toggleStream',
            'functions_toggleStream1',
            'functions_toggleStream2',
            'functions_toggleStream3',
            'functions_toggleStream4',
            'functions_toggleStream5',
          ],
        },
      ],
    },
  ]

  return structure
}
