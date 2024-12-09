import { combineRgb } from '@companion-module/base'
import { VMixPresetArray } from './presets'

export const getOverlayPresets = (): VMixPresetArray => {
  const overlayPresets: VMixPresetArray = [
    {
      category: 'Overlays',
      name: 'OVL All Off',
      type: 'button',
      style: {
        text: 'OVL All Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInputAllOff', input: '' } }],
          up: []
        }
      ],
      feedbacks: []
    }
  ]

  for (let i = 1; i < 5; i++) {
    overlayPresets.push(
      {
        category: 'Overlays',
        name: `Overlay ${i}`,
        type: 'text',
        text: ''
      },
      {
        category: 'Overlays',
        name: `Overlay ${1} Prgm`,
        type: 'button',
        style: {
          text: `Overlay ${1} Prgm`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { functionID: `OverlayInput${i}` as 'OverlayInput1', input: '' }
              }
            ],
            up: []
          }
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0)
            }
          }
        ]
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} Prv`,
        type: 'button',
        style: {
          text: `Overlay ${i} Prv`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { functionID: `PreviewOverlayInput${i}` as 'PreviewOverlayInput1', input: '' }
              }
            ],
            up: []
          }
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0)
            }
          }
        ]
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} In`,
        type: 'button',
        style: {
          text: `Overlay ${i} In`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { functionID: `OverlayInput${i}In` as 'OverlayInput1In', input: '' }
              }
            ],
            up: []
          }
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0)
            }
          }
        ]
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} Out`,
        type: 'button',
        style: {
          text: `Overlay ${i} Out`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { functionID: `OverlayInput${i}Out` as 'OverlayInput1Out', input: '' }
              }
            ],
            up: []
          }
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0)
            }
          }
        ]
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} Off`,
        type: 'button',
        style: {
          text: `Overlay ${i} Off`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { functionID: `OverlayInput${i}Off` as 'OverlayInput1Off', input: '' }
              }
            ],
            up: []
          }
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0)
            }
          }
        ]
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} Zoom`,
        type: 'button',
        style: {
          text: `Overlay ${i} Zoom`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { functionID: `OverlayInput${i}Zoom` as 'OverlayInput1Zoom', input: '' }
              }
            ],
            up: []
          }
        ],
        feedbacks: []
      }
    )
  }

  return overlayPresets
}
