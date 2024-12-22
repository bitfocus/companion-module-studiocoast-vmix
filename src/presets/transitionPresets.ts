import { combineRgb } from '@companion-module/base'
import { VMixPresetArray } from './presets'

export const getTransitionPresets = (): VMixPresetArray => {
  const transitionPresets: VMixPresetArray = [
    {
      category: 'Transitions',
      name: 'Transitions 1 to 4',
      type: 'text',
      text: 'Auto transition 1 to 4 with preset transition type and duration'
    }
  ]

  for (let i = 1; i < 5; i++) {
    transitionPresets.push({
      category: 'Transitions',
      name: `Transition ${i}`,
      type: 'button',
      style: {
        text: `Transition ${i}`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: `Transition${i}` as 'Transition1' } }],
          up: []
        }
      ],
      feedbacks: []
    })
  }

  for (let i = 1; i < 5; i++) {
    transitionPresets.push({
      category: 'Transitions',
      name: `Stinger ${i}`,
      type: 'button',
      style: {
        text: `Stinger ${i}`,
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: `Stinger${i}` as 'Stinger1' } }],
          up: []
        }
      ],
      feedbacks: []
    })
  }

  for (let i = 1; i < 5; i++) {
    transitionPresets.push(
      {
        category: 'Transitions',
        name: `Set Transition ${i}`,
        type: 'text',
        text: `Set the transition type and duration of Transition ${i}`
      },
      {
        category: 'Transitions',
        name: `T${i} Set Cut`,
        type: 'button',
        style: {
          text: `T${i} Set Cut`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'setTransitionEffect',
                options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Cut' }
              }
            ],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Transitions',
        name: `T${i} Set Fade`,
        type: 'button',
        style: {
          text: `T${i} Set Fade`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'setTransitionEffect',
                options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Fade' }
              }
            ],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Transitions',
        name: `T${i} Set Zoom`,
        type: 'button',
        style: {
          text: `T${i} Set Zoom`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'setTransitionEffect',
                options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Zoom' }
              }
            ],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Transitions',
        name: `T${i} Set Merge`,
        type: 'button',
        style: {
          text: `T${i} Set Merge`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'setTransitionEffect',
                options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Merge' }
              }
            ],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Transitions',
        name: `T${i} Set 250ms`,
        type: 'button',
        style: {
          text: `T${i} Set 250ms`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 250 } }],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Transitions',
        name: `T${i} Set 500ms`,
        type: 'button',
        style: {
          text: `T${i} Set 500ms`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 500 } }],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Transitions',
        name: `T${i} Set 1000ms`,
        type: 'button',
        style: {
          text: `T${i} Set 1000ms`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 1000 } }],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Transitions',
        name: `T${i} Set 2000ms`,
        type: 'button',
        style: {
          text: `T${i} Set 2000ms`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 2000 } }],
            up: []
          }
        ],
        feedbacks: []
      }
    )
  }

  transitionPresets.push(
    {
      category: 'Transitions',
      name: 'Transition Mix',
      type: 'text',
      text: ''
    },
    {
      category: 'Transitions',
      name: 'Cut',
      type: 'button',
      style: {
        text: 'Cut',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'transitionMix', options: { functionID: 'Cut', mix: 0, mixVariable: '', duration: '1000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Fade',
      type: 'button',
      style: {
        text: 'Fade',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'transitionMix', options: { functionID: 'Fade', mix: 0, mixVariable: '', duration: '1000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Zoom',
      type: 'button',
      style: {
        text: 'Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'transitionMix', options: { functionID: 'Zoom', mix: 0, mixVariable: '', duration: '1000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Wipe',
      type: 'button',
      style: {
        text: 'Wipe',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'transitionMix', options: { functionID: 'Wipe', mix: 0, mixVariable: '', duration: '1000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Slide',
      type: 'button',
      style: {
        text: 'Slide',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'Slide', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Fly',
      type: 'button',
      style: {
        text: 'Fly',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'transitionMix', options: { functionID: 'Fly', mix: 0, mixVariable: '', duration: '1000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Cross Zoom',
      type: 'button',
      style: {
        text: 'Cross Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'CrossZoom', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Fly Rotate',
      type: 'button',
      style: {
        text: 'Fly Rotate',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'FlyRotate', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Cube',
      type: 'button',
      style: {
        text: 'Cube',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'transitionMix', options: { functionID: 'Cube', mix: 0, mixVariable: '', duration: '1000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Cube Zoom',
      type: 'button',
      style: {
        text: 'Cube Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'CubeZoom', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Vertical Wipe',
      type: 'button',
      style: {
        text: 'Vertical Wipe',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'VerticalWipe', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Vertical Slide',
      type: 'button',
      style: {
        text: 'Vertical Slide',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'VerticalSlide', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Merge',
      type: 'button',
      style: {
        text: 'Merge',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'Merge', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Wipe Reverse',
      type: 'button',
      style: {
        text: 'Wipe Reverse',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'WipeReverse', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Slide Reverse',
      type: 'button',
      style: {
        text: 'Slide Reverse',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'SlideReverse', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Vertical Wipe Reverse',
      type: 'button',
      style: {
        text: 'Vertical Wipe Reverse',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'VerticalWipeReverse', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Transitions',
      name: 'Vertical Slide Reverse',
      type: 'button',
      style: {
        text: 'Vertical Slide Reverse',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'VerticalSlideReverse', mix: 0, mixVariable: '', duration: '1000' }
            }
          ],
          up: []
        }
      ],
      feedbacks: []
    }
  )

  return transitionPresets
}
