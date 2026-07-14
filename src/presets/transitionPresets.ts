import type { CompanionPresetDefinitions, CompanionPresetGroup, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

export const getTransitionDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const transitionDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {}

  for (let i = 1; i < 5; i++) {
    transitionDefinitions[`transition_transition${i}`] = {
      name: `Transition ${i}`,
      type: 'simple',
      style: {
        text: `Transition ${i}`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: `Transition${i}`, mix: 1 } }],
          up: [],
        },
      ],
      feedbacks: [],
    }
  }

  for (let i = 1; i < 5; i++) {
    transitionDefinitions[`transition_stringer${i}`] = {
      name: `Stinger ${i}`,
      type: 'simple',
      style: {
        text: `Stinger ${i}`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: `Stinger${i}`, mix: 1 } }],
          up: [],
        },
      ],
      feedbacks: [],
    }
  }

  for (let i = 1; i < 5; i++) {
    transitionDefinitions[`transition_transition${i}Cut`] = {
      name: `T${i} Set Cut`,
      type: 'simple',
      style: {
        text: `T${i} Set Cut`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'setTransitionEffect',
              options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Cut' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    transitionDefinitions[`transition_transition${i}Fade`] = {
      name: `T${i} Set Fade`,
      type: 'simple',
      style: {
        text: `T${i} Set Fade`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'setTransitionEffect',
              options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Fade' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    transitionDefinitions[`transition_transition${i}Zoom`] = {
      name: `T${i} Set Zoom`,
      type: 'simple',
      style: {
        text: `T${i} Set Zoom`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'setTransitionEffect',
              options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Zoom' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    transitionDefinitions[`transition_transition${i}Merge`] = {
      name: `T${i} Set Merge`,
      type: 'simple',
      style: {
        text: `T${i} Set Merge`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'setTransitionEffect',
              options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Merge' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    transitionDefinitions[`transition_transition${i}Duration250`] = {
      name: `T${i} Set 250ms`,
      type: 'simple',
      style: {
        text: `T${i} Set 250ms`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 250 } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    transitionDefinitions[`transition_transition${i}Duration500`] = {
      name: `T${i} Set 500ms`,
      type: 'simple',
      style: {
        text: `T${i} Set 500ms`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 500 } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    transitionDefinitions[`transition_transition${i}Duration1000`] = {
      name: `T${i} Set 1000ms`,
      type: 'simple',
      style: {
        text: `T${i} Set 1000ms`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 1000 } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    transitionDefinitions[`transition_transition${i}Duration2000`] = {
      name: `T${i} Set 2000ms`,
      type: 'simple',
      style: {
        text: `T${i} Set 2000ms`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 2000 } }],
          up: [],
        },
      ],
      feedbacks: [],
    }
  }

  transitionDefinitions.transition_cut = {
    name: 'Cut',
    type: 'simple',
    style: {
      text: 'Cut',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'transitionMix', options: { functionID: 'Cut', mix: 1, duration: '1000' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_fade = {
    name: 'Fade',
    type: 'simple',
    style: {
      text: 'Fade',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'transitionMix', options: { functionID: 'Fade', mix: 1, duration: '1000' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_zoom = {
    name: 'Zoom',
    type: 'simple',
    style: {
      text: 'Zoom',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'transitionMix', options: { functionID: 'Zoom', mix: 1, duration: '1000' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_wipe = {
    name: 'Wipe',
    type: 'simple',
    style: {
      text: 'Wipe',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'transitionMix', options: { functionID: 'Wipe', mix: 1, duration: '1000' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_slide = {
    name: 'Slide',
    type: 'simple',
    style: {
      text: 'Slide',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'Slide', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_fly = {
    name: 'Fly',
    type: 'simple',
    style: {
      text: 'Fly',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'transitionMix', options: { functionID: 'Fly', mix: 1, duration: '1000' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_crossZoom = {
    name: 'Cross Zoom',
    type: 'simple',
    style: {
      text: 'Cross Zoom',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'CrossZoom', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_flyRotate = {
    name: 'Fly Rotate',
    type: 'simple',
    style: {
      text: 'Fly Rotate',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'FlyRotate', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_cube = {
    name: 'Cube',
    type: 'simple',
    style: {
      text: 'Cube',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'transitionMix', options: { functionID: 'Cube', mix: 1, duration: '1000' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_cubeZoom = {
    name: 'Cube Zoom',
    type: 'simple',
    style: {
      text: 'Cube Zoom',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'CubeZoom', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_verticalWipe = {
    name: 'Vertical Wipe',
    type: 'simple',
    style: {
      text: 'Vertical Wipe',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'VerticalWipe', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_verticalSlide = {
    name: 'Vertical Slide',
    type: 'simple',
    style: {
      text: 'Vertical Slide',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'VerticalSlide', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_merge = {
    name: 'Merge',
    type: 'simple',
    style: {
      text: 'Merge',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'Merge', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_wipeReverse = {
    name: 'Wipe Reverse',
    type: 'simple',
    style: {
      text: 'Wipe Reverse',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'WipeReverse', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_slideReverse = {
    name: 'Slide Reverse',
    type: 'simple',
    style: {
      text: 'Slide Reverse',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'SlideReverse', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_verticalWipeReverse = {
    name: 'Vertical Wipe Reverse',
    type: 'simple',
    style: {
      text: 'Vertical Wipe Reverse',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'VerticalWipeReverse', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  transitionDefinitions.transition_verticalSlideReverse = {
    name: 'Vertical Slide Reverse',
    type: 'simple',
    style: {
      text: 'Vertical Slide Reverse',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [
          {
            actionId: 'transitionMix',
            options: { functionID: 'VerticalSlideReverse', mix: 1, duration: '1000' },
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  }

  return transitionDefinitions
}

export const getTransitionStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const transitionGroups: CompanionPresetGroup<VMixInstanceTypes>[] = []

  const transitionGroup: CompanionPresetGroup<VMixInstanceTypes> = {
    id: `transition`,
    type: 'simple',
    name: 'Transitions and Stingers 1 to 4',
    description: `Actions for running the set Transitions/Stingers`,
    presets: [],
  }

  for (let i = 1; i < 5; i++) {
    transitionGroup.presets.push(`transition_transition${i}`)
  }

  for (let i = 1; i < 5; i++) {
    transitionGroup.presets.push(`transition_stringer${i}`)
  }

  transitionGroups.push(transitionGroup)

  for (let i = 1; i < 5; i++) {
    transitionGroups.push({
      id: `transition_set`,
      type: 'simple',
      name: `Transition ${i} Effect and Duration`,
      description: `Several Transition Effects and Durations for Transition ${i}`,
      presets: [
        `transition_transition${i}Cut`,
        `transition_transition${i}Fade`,
        `transition_transition${i}Zoom`,
        `transition_transition${i}Merge`,
        `transition_transition${i}Duration250`,
        `transition_transition${i}Duration500`,
        `transition_transition${i}Duration1000`,
        `transition_transition${i}Duration2000`,
      ],
    })
  }

  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'transitionStructure',
      name: 'Transitions',
      description: 'Run Transition and set Transition/Stingers 1 to 4',
      definitions: [
        {
          id: `transition_set`,
          type: 'simple',
          name: `Transition Mix 1`,
          description: `Transition the main Mix using the selected effect`,
          presets: [
            'transition_cut',
            'transition_fade',
            'transition_zoom',
            'transition_wipe',
            'transition_slide',
            'transition_fly',
            'transition_crossZoom',
            'transition_flyRotate',
            'transition_cube',
            'transition_cubeZoom',
            'transition_verticalWipe',
            'transition_verticalSlide',
            'transition_merge',
            'transition_wipeReverse',
            'transition_slideReverse',
            'transition_verticalWipeReverse',
            'transition_verticalSlideReverse',
          ],
        },
        ...transitionGroups,
      ],
    },
  ]

  return structure
}
