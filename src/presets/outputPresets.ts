import { combineRgb } from '@companion-module/base'
import type { VMixPresetArray } from './presets'

export const getOutputPresets = (): VMixPresetArray => {
  const outputPresets: VMixPresetArray = []

  ;[
    { label: 'Output 2', functionID: 'SetOutput2' },
    { label: 'Output 3', functionID: 'SetOutput3' },
    { label: 'Output 4', functionID: 'SetOutput4' },
    { label: 'External 2', functionID: 'SetOutputExternal2' },
    { label: 'Fullscreen', functionID: 'SetOutputFullscreen' },
    { label: 'Fullscreen 2', functionID: 'SetOutputFullscreen2' },
  ].forEach((output) => {
    outputPresets.push(
      {
        category: 'Outputs',
        name: output.label,
        type: 'text',
        text: '',
      },
      {
        category: 'Outputs',
        name: `${output.label}\\nPGM`,
        type: 'button',
        style: {
          text: `${output.label}\\nPGM`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'outputSet',
                options: { functionID: output.functionID as any, value: 'Output', input: '', mix: 0, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Outputs',
        name: `${output.label}\nPRV`,
        type: 'button',
        style: {
          text: `${output.label}\nPRV`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'outputSet',
                options: { functionID: output.functionID as any, value: 'Preview', input: '', mix: 0, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Outputs',
        name: `${output.label}\nMultiview`,
        type: 'button',
        style: {
          text: `${output.label}\nMultiview`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'outputSet',
                options: { functionID: output.functionID as any, value: 'MultiView', input: '', mix: 0, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Outputs',
        name: `${output.label}\nReplay`,
        type: 'button',
        style: {
          text: `${output.label}\nReplay`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'outputSet',
                options: { functionID: output.functionID as any, value: 'Replay', input: '', mix: 0, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Outputs',
        name: `${output.label}\nInput`,
        type: 'button',
        style: {
          text: `${output.label}\nInput`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'outputSet', options: { functionID: output.functionID as any, value: 'Input', input: '', mix: 0, mixVariable: '' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
    )
  })

  return outputPresets
}
