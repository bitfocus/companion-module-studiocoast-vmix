import { combineRgb } from '@companion-module/base'
import type { VMixPresetArray } from './presets'

export const getMultiviewLayersPresets = (): VMixPresetArray => {
  const multiviewLayersPresets: VMixPresetArray = [
    {
      category: 'MultiView Layers',
      name: 'MultiView Layer Presets',
      type: 'text',
      text: "Each preset will require you to enter the Input in the Action and Feedback. Some Presets such as enabling/disabling lack feedback as vMix's API lacks data on if a layer is enabled or not.",
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle / Enable / Disable Layer 1 to 10 on Input',
      type: 'text',
      text: '',
    },
  ]

  for (let i = 1; i < 11; i++) {
    multiviewLayersPresets.push(
      {
        category: 'MultiView Layers',
        name: `Toggle Layer ${i}`,
        type: 'button',
        style: {
          text: `Toggle Layer ${i}`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: i } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'MultiView Layers',
        name: `Set Layer ${i} On`,
        type: 'button',
        style: {
          text: `Set Layer ${i} On`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: i } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'MultiView Layers',
        name: `Set Layer ${i} Off`,
        type: 'button',
        style: {
          text: `Set Layer ${i} Off`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: i } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
    )
  }

  multiviewLayersPresets.push({
    category: 'MultiView Layers',
    name: 'Set which input is assigned to layers 1 to 10 on an Input',
    type: 'text',
    text: '',
  })

  for (let i = 1; i < 11; i++) {
    multiviewLayersPresets.push({
      category: 'MultiView Layers',
      name: `Set Layer ${i} Input`,
      type: 'button',
      style: {
        text: `Set Layer ${i} Input`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: i, layerInput: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'inputOnMultiview',
          options: { inputX: '', inputY: '', layer: `${i}` },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    })
  }

  multiviewLayersPresets.push(
    {
      category: 'MultiView Layers',
      name: 'Layer Routing',
      type: 'text',
      text: 'Set a target Input, a target Layer, and route an input to that layer',
    },
    {
      category: 'MultiView Layers',
      name: `Set Target Input`,
      type: 'button',
      style: {
        text: `Set Target Input`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlayDestinationInput', options: { destinationInput: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'selectedDestinationInput',
          options: { input: '' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0),
          },
        },
      ],
    },
    {
      category: 'MultiView Layers',
      name: `Set Input on Layer`,
      type: 'button',
      style: {
        text: `Set Input on Layer`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlayDestinationLayer', options: { destinationLayer: '1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'selectedDestinationLayer',
          options: { selectedIndex: '1' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0),
          },
        },
      ],
    },
    {
      category: 'MultiView Layers',
      name: `Set Input on Layer`,
      type: 'button',
      style: {
        text: `Set Input on Layer`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlaySourceInput', options: { sourceIndex: '1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'routableMultiviewLayer',
          options: { input: '1' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0),
          },
        },
      ],
    },
  )

  return multiviewLayersPresets
}
