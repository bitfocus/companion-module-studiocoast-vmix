import { combineRgb, CompanionButtonPresetDefinition, CompanionPresetDefinitions } from '@companion-module/base'
import VMixInstance from './index'
import { ActionCallbacks } from './actions'
import { FeedbackCallbacks } from './feedback'

export type PresetCategory =
  | 'Mix 1'
  | 'Mix 2-4'
  | 'Button Shift'
  | 'Audio'
  | 'Call'
  | 'General'
  | 'MultiView Layers'
  | 'Outputs'
  | 'Overlays'
  | 'PlayList'
  | 'Replay'
  | 'Slides & Lists'
  | 'Titles & Graphics'
  | 'Transitions'
  | 'Video Playback'
  | 'vMix Functions'

interface VMixPresetAdditions {
  category: PresetCategory
  steps: {
    down: ActionCallbacks[]
    up: ActionCallbacks[]
  }[]
  feedbacks: FeedbackCallbacks[]
}

export type VMixPreset = Exclude<CompanionButtonPresetDefinition, 'category' | 'steps' | 'feedbacks'> &
  VMixPresetAdditions

export function getPresets(instance: VMixInstance): CompanionPresetDefinitions {
  const presets: VMixPreset[] = [
    // Mix 1
    {
      category: 'Mix 1',
      name: 'PRV 1',
      type: 'button',
      style: {
        text: 'PRV 1',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 0, mixVariable: '', input: '1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: '1',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PRV 2',
      type: 'button',
      style: {
        text: 'PRV 2',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 0, mixVariable: '', input: '2' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: '2',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PRV 3',
      type: 'button',
      style: {
        text: 'PRV 3',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 0, mixVariable: '', input: '3' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: '3',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PRV 4',
      type: 'button',
      style: {
        text: 'PRV 4',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 0, mixVariable: '', input: '4' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: '4',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PRV 5',
      type: 'button',
      style: {
        text: 'PRV 5',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 0, mixVariable: '', input: '5' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: '5',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PRV 6',
      type: 'button',
      style: {
        text: 'PRV 6',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 0, mixVariable: '', input: '6' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: '6',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PRV 7',
      type: 'button',
      style: {
        text: 'PRV 7',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 0, mixVariable: '', input: '7' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: '7',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PRV 8',
      type: 'button',
      style: {
        text: 'PRV 8',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 0, mixVariable: '', input: '8' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: '8',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PGM 1',
      type: 'button',
      style: {
        text: 'PGM 1',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 0, mixVariable: '', input: '1' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: '1',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PGM 2',
      type: 'button',
      style: {
        text: 'PGM 2',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 0, mixVariable: '', input: '2' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: '2',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PGM 3',
      type: 'button',
      style: {
        text: 'PGM 3',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 0, mixVariable: '', input: '3' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: '3',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PGM 4',
      type: 'button',
      style: {
        text: 'PGM 4',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 0, mixVariable: '', input: '4' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: '4',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PGM 5',
      type: 'button',
      style: {
        text: 'PGM 5',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 0, mixVariable: '', input: '5' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: '5',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PGM 6',
      type: 'button',
      style: {
        text: 'PGM 6',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 0, mixVariable: '', input: '6' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: '6',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PGM 7',
      type: 'button',
      style: {
        text: 'PGM 7',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 0, mixVariable: '', input: '7' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: '7',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'PGM 8',
      type: 'button',
      style: {
        text: 'PGM 8',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 0, mixVariable: '', input: '8' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: '8',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 1',
      name: 'Cut',
      type: 'button',
      style: {
        text: 'Cut',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { mix: 0, mixVariable: '', functionID: 'Cut', duration: '1000' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Mix 1',
      name: 'Fade',
      type: 'button',
      style: {
        text: 'Fade',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { mix: 0, mixVariable: '', functionID: 'Fade', duration: '1000' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Mix 1',
      name: 'Auto',
      type: 'button',
      style: {
        text: 'Fade',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: 'Transition1' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },

    // Mix 2-4
    {
      category: 'Mix 2-4',
      name: 'PRV Mix 2',
      type: 'button',
      style: {
        text: 'PRV Mix 2',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 1, mixVariable: '', input: '1' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 1,
            mixVariable: '',
            input: '1',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 2-4',
      name: 'PRV Mix 3',
      type: 'button',
      style: {
        text: 'PRV Mix 3',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 2, mixVariable: '', input: '1' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 2,
            mixVariable: '',
            input: '1',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 2-4',
      name: 'PRV Mix 4',
      type: 'button',
      style: {
        text: 'PRV Mix 4',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previewInput', options: { mix: 3, mixVariable: '', input: '1' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 3,
            mixVariable: '',
            input: '1',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 2-4',
      name: 'PGM Mix 2',
      type: 'button',
      style: {
        text: 'PGM Mix 2',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 1, mixVariable: '', input: '1' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 1,
            mixVariable: '',
            input: '1',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 2-4',
      name: 'PGM Mix 3',
      type: 'button',
      style: {
        text: 'PGM Mix 3',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 2, mixVariable: '', input: '1' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 2,
            mixVariable: '',
            input: '1',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 2-4',
      name: 'PGM Mix 4',
      type: 'button',
      style: {
        text: 'PGM Mix 4',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'programCut', options: { mix: 3, mixVariable: '', input: '1' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 3,
            mixVariable: '',
            input: '1',
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
      ],
    },
    {
      category: 'Mix 2-4',
      name: 'Cut Mix 2',
      type: 'button',
      style: {
        text: 'Cut Mix 2',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { mix: 1, mixVariable: '', functionID: 'Cut', duration: '1000' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Mix 2-4',
      name: 'Cut Mix 3',
      type: 'button',
      style: {
        text: 'Cut Mix 3',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { mix: 2, mixVariable: '', functionID: 'Cut', duration: '1000' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Mix 2-4',
      name: 'Cut Mix 4',
      type: 'button',
      style: {
        text: 'Cut Mix 4',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { mix: 3, mixVariable: '', functionID: 'Cut', duration: '1000' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Mix 2-4',
      name: 'Fade Mix 2',
      type: 'button',
      style: {
        text: 'Fade Mix 2',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { mix: 1, mixVariable: '', functionID: 'Fade', duration: '1000' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Mix 2-4',
      name: 'Fade Mix 3',
      type: 'button',
      style: {
        text: 'Fade Mix 3',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { mix: 2, mixVariable: '', functionID: 'Fade', duration: '1000' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Mix 2-4',
      name: 'Fade Mix 4',
      type: 'button',
      style: {
        text: 'Fade Mix 4',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { mix: 3, mixVariable: '', functionID: 'Fade', duration: '1000' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },

    // Button Shift
    {
      category: 'Button Shift',
      name: 'Shift',
      type: 'button',
      style: {
        text: 'Shift',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'buttonShift', options: <any>[] }],
          up: [{ actionId: 'buttonShift', options: <any>[] }],
        },
      ],
      feedbacks: [{ feedbackId: 'buttonShift', options: { fg: combineRgb(0, 0, 0), bg: combineRgb(255, 255, 0) } }],
    },
    {
      category: 'Button Shift',
      name: 'PRV 1 / 5',
      type: 'button',
      style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            {
              actionId: 'previewInput',
              options: { mix: 0, mixVariable: '', input: `1${instance.config.shiftDelimiter}5` },
            },
          ],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: `1${instance.config.shiftDelimiter}5`,
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
        { feedbackId: 'buttonText', options: { text: `PRV 1${instance.config.shiftDelimiter}PRV 5` } },
      ],
    },
    {
      category: 'Button Shift',
      name: 'PRV 2 / 6',
      type: 'button',
      style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            {
              actionId: 'previewInput',
              options: { mix: 0, mixVariable: '', input: `2${instance.config.shiftDelimiter}6` },
            },
          ],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: `2${instance.config.shiftDelimiter}6`,
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
        { feedbackId: 'buttonText', options: { text: `PRV 2${instance.config.shiftDelimiter}PRV 6` } },
      ],
    },
    {
      category: 'Button Shift',
      name: 'PRV 3 / 7',
      type: 'button',
      style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            {
              actionId: 'previewInput',
              options: { mix: 0, mixVariable: '', input: `3${instance.config.shiftDelimiter}7` },
            },
          ],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: `3${instance.config.shiftDelimiter}7`,
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
        { feedbackId: 'buttonText', options: { text: `PRV 3${instance.config.shiftDelimiter}PRV 7` } },
      ],
    },
    {
      category: 'Button Shift',
      name: 'PRV 4 / 8',
      type: 'button',
      style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            {
              actionId: 'previewInput',
              options: { mix: 0, mixVariable: '', input: `4${instance.config.shiftDelimiter}8` },
            },
          ],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputPreview',
          options: {
            mix: 0,
            mixVariable: '',
            input: `4${instance.config.shiftDelimiter}8`,
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(0, 255, 0),
            tally: '',
          },
        },
        { feedbackId: 'buttonText', options: { text: `PRV 4${instance.config.shiftDelimiter}PRV 8` } },
      ],
    },
    {
      category: 'Button Shift',
      name: 'PGM 1 / 5',
      type: 'button',
      style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            {
              actionId: 'programCut',
              options: { mix: 0, mixVariable: '', input: `1${instance.config.shiftDelimiter}5` },
            },
          ],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: `1${instance.config.shiftDelimiter}5`,
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
        { feedbackId: 'buttonText', options: { text: `PRV 1${instance.config.shiftDelimiter}PRV 5` } },
      ],
    },
    {
      category: 'Button Shift',
      name: 'PGM 2 / 6',
      type: 'button',
      style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            {
              actionId: 'programCut',
              options: { mix: 0, mixVariable: '', input: `2${instance.config.shiftDelimiter}6` },
            },
          ],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: `2${instance.config.shiftDelimiter}6`,
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
        { feedbackId: 'buttonText', options: { text: `PRV 2${instance.config.shiftDelimiter}PRV 6` } },
      ],
    },
    {
      category: 'Button Shift',
      name: 'PGM 3 / 7',
      type: 'button',
      style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            {
              actionId: 'programCut',
              options: { mix: 0, mixVariable: '', input: `3${instance.config.shiftDelimiter}7` },
            },
          ],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: `3${instance.config.shiftDelimiter}7`,
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
        { feedbackId: 'buttonText', options: { text: `PRV 3${instance.config.shiftDelimiter}PRV 7` } },
      ],
    },
    {
      category: 'Button Shift',
      name: 'PGM 4 / 8',
      type: 'button',
      style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            {
              actionId: 'programCut',
              options: { mix: 0, mixVariable: '', input: `4${instance.config.shiftDelimiter}8` },
            },
          ],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputLive',
          options: {
            mix: 0,
            mixVariable: '',
            input: `4${instance.config.shiftDelimiter}8`,
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            tally: '',
          },
        },
        { feedbackId: 'buttonText', options: { text: `PRV 4${instance.config.shiftDelimiter}PRV 8` } },
      ],
    },

    // Audio
    {
      category: 'Audio',
      name: 'Toggle Audio',
      type: 'button',
      style: {
        text: 'Toggle Audio',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'audio', options: { input: '1', functionID: 'Audio' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputAudio',
          options: {
            input: '1',
            fg: combineRgb(255, 255, 255),
            bgLive: combineRgb(0, 255, 0),
            bgMuted: combineRgb(255, 0, 0),
          },
        },
        {
          feedbackId: 'liveInputVolume',
          options: {
            input: '1',
            dBShow: false,
            colorTxt: false,
            colorBG: false,
            colorBase: combineRgb(255, 255, 255),
            color: combineRgb(255, 0, 0),
            color1: combineRgb(255, 255, 0),
            color6: combineRgb(0, 255, 0),
            color18: combineRgb(0, 192, 0),
            color36: combineRgb(0, 128, 0),
          },
        },
      ],
    },
    {
      category: 'Audio',
      name: 'Set Audio On',
      type: 'button',
      style: {
        text: 'Set Audio On',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'audio', options: { input: '1', functionID: 'AudioOn' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputAudio',
          options: {
            input: '1',
            fg: combineRgb(255, 255, 255),
            bgLive: combineRgb(0, 255, 0),
            bgMuted: combineRgb(255, 0, 0),
          },
        },
        {
          feedbackId: 'liveInputVolume',
          options: {
            input: '1',
            dBShow: false,
            colorTxt: false,
            colorBG: false,
            colorBase: combineRgb(255, 255, 255),
            color: combineRgb(255, 0, 0),
            color1: combineRgb(255, 255, 0),
            color6: combineRgb(0, 255, 0),
            color18: combineRgb(0, 192, 0),
            color36: combineRgb(0, 128, 0),
          },
        },
      ],
    },
    {
      category: 'Audio',
      name: 'Set Audio Off',
      type: 'button',
      style: {
        text: 'Set Audio Off',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'audio', options: { input: '1', functionID: 'AudioOff' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputAudio',
          options: {
            input: '1',
            fg: combineRgb(255, 255, 255),
            bgLive: combineRgb(0, 255, 0),
            bgMuted: combineRgb(255, 0, 0),
          },
        },
        {
          feedbackId: 'liveInputVolume',
          options: {
            input: '1',
            dBShow: false,
            colorTxt: false,
            colorBG: false,
            colorBase: combineRgb(255, 255, 255),
            color: combineRgb(255, 0, 0),
            color1: combineRgb(255, 255, 0),
            color6: combineRgb(0, 255, 0),
            color18: combineRgb(0, 192, 0),
            color36: combineRgb(0, 128, 0),
          },
        },
      ],
    },
    {
      category: 'Audio',
      name: 'Bus Mute',
      type: 'button',
      style: {
        text: 'Bus Mute',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'busXAudio', options: { value: 'A', functionID: 'BusXAudio' } }],
          up: [],
        },
      ],

      feedbacks: [
        { feedbackId: 'busMute', options: { value: 'A', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) } },
        {
          feedbackId: 'liveBusVolume',
          options: {
            value: 'A',
            dBShow: false,
            colorTxt: false,
            colorBG: false,
            colorBase: combineRgb(255, 255, 255),
            color: combineRgb(255, 0, 0),
            color1: combineRgb(255, 255, 0),
            color6: combineRgb(0, 255, 0),
            color18: combineRgb(0, 192, 0),
            color36: combineRgb(0, 128, 0),
          },
        },
      ],
    },
    {
      category: 'Audio',
      name: 'Input Solo',
      type: 'button',
      style: {
        text: 'Input Solo',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'solo', options: { input: '1', functionID: 'Solo' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputSolo',
          options: { input: '1', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 255, 0) },
        },
      ],
    },
    {
      category: 'Audio',
      name: 'Bus Solo',
      type: 'button',
      style: {
        text: 'Bus Solo',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'busXSolo', options: { value: 'A', functionID: 'BusXSolo' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Audio',
      name: 'Send Bus to Master',
      type: 'button',
      style: {
        text: 'Send Bus to Master',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'busXSendToMaster', options: { value: 'A' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Audio',
      name: 'Send Input to Bus',
      type: 'button',
      style: {
        text: 'Send Input to Bus',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'audioBus', options: { input: '1', value: 'A', functionID: 'AudioBus' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'inputBusRouting',
          options: { input: '1', value: 'A', fg: combineRgb(255, 255, 255), bg: combineRgb(0, 255, 0) },
        },
      ],
    },
    {
      category: 'Audio',
      name: 'In 1 Vol 0%',
      type: 'button',
      style: {
        text: 'In 1 Vol 0%',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '0', fadeTime: '2000' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Audio',
      name: 'In 1 Vol 25%',
      type: 'button',
      style: {
        text: 'In 1 Vol 25%',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '25', fadeTime: '2000' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Audio',
      name: 'In 1 Vol 50%',
      type: 'button',
      style: {
        text: 'In 1 Vol 50%',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '50', fadeTime: '2000' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Audio',
      name: 'In 1 Vol 75%',
      type: 'button',
      style: {
        text: 'In 1 Vol 75%',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '75', fadeTime: '2000' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Audio',
      name: 'In 1 Vol 100%',
      type: 'button',
      style: {
        text: 'In 1 Vol 100%',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '100', fadeTime: '2000' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    // Call
    {
      category: 'Call',
      name: 'Call 1 Master',
      type: 'button',
      style: {
        text: 'Call 1 Master',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'Master' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'Master', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Headphones',
      type: 'button',
      style: {
        text: 'Call 1 Headphones',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'Headphones' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'Headphones', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Bus A',
      type: 'button',
      style: {
        text: 'Call 1 Bus A',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'BusA' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'A', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Bus B',
      type: 'button',
      style: {
        text: 'Call 1 Bus B',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'BusB' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'B', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Bus C',
      type: 'button',
      style: {
        text: 'Call 1 Bus C',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'BusC' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'C', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Bus D',
      type: 'button',
      style: {
        text: 'Call 1 Bus D',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'BusD' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'D', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Bus E',
      type: 'button',
      style: {
        text: 'Call 1 Bus E',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'BusE' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'E', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Bus F',
      type: 'button',
      style: {
        text: 'Call 1 Bus F',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'BusF' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'F', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Bus G',
      type: 'button',
      style: {
        text: 'Call 1 Bus G',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'BusG' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'G', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Out 1',
      type: 'button',
      style: {
        text: 'Call 1 Out 1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output1', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Out 2',
      type: 'button',
      style: {
        text: 'Call 1 Out 2',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output2' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output2', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Out 3',
      type: 'button',
      style: {
        text: 'Call 1 Out 3',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output3' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output3', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 Out 4',
      type: 'button',
      style: {
        text: 'Call 1 Out 4',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output4' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output4', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Call',
      name: 'Call 1 No Video',
      type: 'button',
      style: {
        text: 'Call 1 No Video',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'None' } }],
          up: [],
        },
      ],

      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'None', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },

    // General
    {
      category: 'General',
      name: 'Send Key Press',
      type: 'button',
      style: {
        text: 'Send Key Press',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'keyPress', options: { value: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'General',
      name: 'Script Start',
      type: 'button',
      style: {
        text: 'Script Start',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'scriptStart', options: { value: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'General',
      name: 'Script Stop',
      type: 'button',
      style: {
        text: 'Script Stop',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'scriptStop', options: { value: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'General',
      name: 'Script Stop All',
      type: 'button',
      style: {
        text: 'Script Stop All',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'scriptStopAll', options: {} }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'General',
      name: 'Custom Command',
      type: 'button',
      style: {
        text: 'Custom Command',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'command', options: { command: '', encode: false } }],
          up: [],
        },
      ],

      feedbacks: [],
    },

    // MultiView Layers
    {
      category: 'MultiView Layers',
      name: 'Toggle L1',
      type: 'button',
      style: {
        text: 'Toggle L1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 1 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle L2',
      type: 'button',
      style: {
        text: 'Toggle L2',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 2 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle L3',
      type: 'button',
      style: {
        text: 'Toggle L3',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 3 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle L4',
      type: 'button',
      style: {
        text: 'Toggle L4',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 4 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle L5',
      type: 'button',
      style: {
        text: 'Toggle L5',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 5 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle L6',
      type: 'button',
      style: {
        text: 'Toggle L6',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 6 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle L7',
      type: 'button',
      style: {
        text: 'Toggle L7',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 7 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle L8',
      type: 'button',
      style: {
        text: 'Toggle L8',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 8 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle L9',
      type: 'button',
      style: {
        text: 'Toggle L9',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 9 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Toggle L10',
      type: 'button',
      style: {
        text: 'Toggle L10',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: 10 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L1 On',
      type: 'button',
      style: {
        text: 'Set L1 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 1 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L2 On',
      type: 'button',
      style: {
        text: 'Set L2 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 2 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L3 On',
      type: 'button',
      style: {
        text: 'Set L3 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 3 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L4 On',
      type: 'button',
      style: {
        text: 'Set L4 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 4 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L5 On',
      type: 'button',
      style: {
        text: 'Set L5 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 5 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L6 On',
      type: 'button',
      style: {
        text: 'Set L6 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 6 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L7 On',
      type: 'button',
      style: {
        text: 'Set L7 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 7 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L8 On',
      type: 'button',
      style: {
        text: 'Set L8 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 8 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L9 On',
      type: 'button',
      style: {
        text: 'Set L9 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 9 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L10 On',
      type: 'button',
      style: {
        text: 'Set L10 On',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: 10 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L1 Off',
      type: 'button',
      style: {
        text: 'Set L1 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 1 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L2 Off',
      type: 'button',
      style: {
        text: 'Set L2 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 2 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L3 Off',
      type: 'button',
      style: {
        text: 'Set L3 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 3 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L4 Off',
      type: 'button',
      style: {
        text: 'Set L4 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 4 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L5 Off',
      type: 'button',
      style: {
        text: 'Set L5 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 5 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L6 Off',
      type: 'button',
      style: {
        text: 'Set L6 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 6 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L7 Off',
      type: 'button',
      style: {
        text: 'Set L7 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 7 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L8 Off',
      type: 'button',
      style: {
        text: 'Set L8 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 8 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L9 Off',
      type: 'button',
      style: {
        text: 'Set L9 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 9 } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L10 Off',
      type: 'button',
      style: {
        text: 'Set L10 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: 10 } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L1 Input',
      type: 'button',
      style: {
        text: 'Set L1 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 1, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L2 Input',
      type: 'button',
      style: {
        text: 'Set L2 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 2, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L3 Input',
      type: 'button',
      style: {
        text: 'Set L3 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 3, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L4 Input',
      type: 'button',
      style: {
        text: 'Set L4 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 4, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L5 Input',
      type: 'button',
      style: {
        text: 'Set L5 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 5, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L6 Input',
      type: 'button',
      style: {
        text: 'Set L6 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 6, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L7 Input',
      type: 'button',
      style: {
        text: 'Set L7 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 7, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L8 Input',
      type: 'button',
      style: {
        text: 'Set L8 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 8, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L9 Input',
      type: 'button',
      style: {
        text: 'Set L9 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 9, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'MultiView Layers',
      name: 'Set L10 Input',
      type: 'button',
      style: {
        text: 'Set L10 to Input',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: 10, layerInput: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },

    // Outputs
    {
      category: 'Outputs',
      name: 'Output 2\nPGM',
      type: 'button',
      style: {
        text: 'Output 2\nPGM',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput2', value: 'Output', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 2\nPRV',
      type: 'button',
      style: {
        text: 'Output 2\nPRV',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput2', value: 'Preview', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 2\nMulti',
      type: 'button',
      style: {
        text: 'Output 2\nMulti',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput2', value: 'MultiView', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 2\nReplay',
      type: 'button',
      style: {
        text: 'Output 2\nReplay',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput2', value: 'Replay', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 2\nInput',
      type: 'button',
      style: {
        text: 'Output 2\nInput',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput2', value: 'Input', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 3\nPGM',
      type: 'button',
      style: {
        text: 'Output 3\nPGM',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput3', value: 'Output', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 3\nPRV',
      type: 'button',
      style: {
        text: 'Output 3\nPRV',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput3', value: 'Preview', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 3\nMulti',
      type: 'button',
      style: {
        text: 'Output 3\nMulti',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput3', value: 'MultiView', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 3\nReplay',
      type: 'button',
      style: {
        text: 'Output 3\nReplay',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput3', value: 'Replay', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 3\nInput',
      type: 'button',
      style: {
        text: 'Output 3\nInput',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput3', value: 'Input', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 4\nPGM',
      type: 'button',
      style: {
        text: 'Output 4\nPGM',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput4', value: 'Output', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 4\nPRV',
      type: 'button',
      style: {
        text: 'Output 4\nPRV',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput4', value: 'Preview', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 4\nMulti',
      type: 'button',
      style: {
        text: 'Output 4\nMulti',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput4', value: 'MultiView', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 4\nReplay',
      type: 'button',
      style: {
        text: 'Output 4\nReplay',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput4', value: 'Replay', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Output 4\nInput',
      type: 'button',
      style: {
        text: 'Output 4\nInput',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutput4', value: 'Input', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'External 2\nPGM',
      type: 'button',
      style: {
        text: 'External 2\nPGM',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutputExternal2', value: 'Output', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'External 2\nPRV',
      type: 'button',
      style: {
        text: 'External 2\nPRV',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutputExternal2', value: 'Preview', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'External 2\nMulti',
      type: 'button',
      style: {
        text: 'External 2\nMulti',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'outputSet', options: { functionID: 'SetOutputExternal2', value: 'MultiView', input: '' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'External 2\nReplay',
      type: 'button',
      style: {
        text: 'External 2\nReplay',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutputExternal2', value: 'Replay', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'External 2\nInput',
      type: 'button',
      style: {
        text: 'External 2\nInput',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutputExternal2', value: 'Input', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen\nPGM',
      type: 'button',
      style: {
        text: 'Fullscreen\nPGM',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen', value: 'Output', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen\nPRV',
      type: 'button',
      style: {
        text: 'Fullscreen\nPRV',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen', value: 'Preview', input: '' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen\nMulti',
      type: 'button',
      style: {
        text: 'Fullscreen\nMulti',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen', value: 'MultiView', input: '' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen\nReplay',
      type: 'button',
      style: {
        text: 'Fullscreen\nReplay',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen', value: 'Replay', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen\nInput',
      type: 'button',
      style: {
        text: 'Fullscreen\nInput',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen', value: 'Input', input: '' } }],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen 2\nPGM',
      type: 'button',
      style: {
        text: 'Fullscreen 2\nPGM',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen2', value: 'Output', input: '' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen 2\nPRV',
      type: 'button',
      style: {
        text: 'Fullscreen 2\nPRV',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen2', value: 'Preview', input: '' } },
          ],
          up: [],
        },
      ],

      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen 2\nMulti',
      type: 'button',
      style: {
        text: 'Fullscreen 2\nMulti',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen2', value: 'MultiView', input: '' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen 2\nReplay',
      type: 'button',
      style: {
        text: 'Fullscreen 2\nReplay',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen2', value: 'Replay', input: '' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Outputs',
      name: 'Fullscreen 2\nInput',
      type: 'button',
      style: {
        text: 'Fullscreen 2\nInput',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: 'SetOutputFullscreen2', value: 'Input', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    // Overlays
    {
      category: 'Overlays',
      name: 'PGM OVL 1',
      type: 'button',
      style: {
        text: 'PGM OVL 1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput1', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '1',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'PGM OVL 2',
      type: 'button',
      style: {
        text: 'PGM OVL 2',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput2', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '2',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'PGM OVL 3',
      type: 'button',
      style: {
        text: 'PGM OVL 3',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput3', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '3',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'PGM OVL 4',
      type: 'button',
      style: {
        text: 'PGM OVL 4',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput4', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '4',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'PRV OVL 1',
      type: 'button',
      style: {
        text: 'PRV OVL 1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'PreviewOverlayInput1', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '1',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'PRV OVL 2',
      type: 'button',
      style: {
        text: 'PRV OVL 2',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'PreviewOverlayInput2', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '2',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'PRV OVL 3',
      type: 'button',
      style: {
        text: 'PRV OVL 3',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'PreviewOverlayInput3', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '3',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'PRV OVL 4',
      type: 'button',
      style: {
        text: 'PRV OVL 4',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'PreviewOverlayInput4', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '4',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 1 In',
      type: 'button',
      style: {
        text: 'OVL 1 In',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput1In', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '1',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 2 In',
      type: 'button',
      style: {
        text: 'OVL 2 In',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput2In', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '2',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 3 In',
      type: 'button',
      style: {
        text: 'OVL 3 In',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput3In', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '3',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 4 In',
      type: 'button',
      style: {
        text: 'OVL 4 In',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput4In', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '4',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 1 Out',
      type: 'button',
      style: {
        text: 'OVL 1 Out',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput1Out', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '1',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 2 Out',
      type: 'button',
      style: {
        text: 'OVL 2 Out',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput2Out', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '2',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 3 Out',
      type: 'button',
      style: {
        text: 'OVL 3 Out',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput3Out', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '3',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 4 Out',
      type: 'button',
      style: {
        text: 'OVL 4 Out',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput4Out', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '4',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 1 Off',
      type: 'button',
      style: {
        text: 'OVL 1 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput1Off', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '1',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 2 Off',
      type: 'button',
      style: {
        text: 'OVL 2 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput2Off', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '2',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 3 Off',
      type: 'button',
      style: {
        text: 'OVL 3 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput3Off', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '3',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 4 Off',
      type: 'button',
      style: {
        text: 'OVL 4 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput4Off', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '4',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL 4 Off',
      type: 'button',
      style: {
        text: 'OVL 4 Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput4Off', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: '4',
            fg: combineRgb(255, 255, 255),
            bgPreview: combineRgb(0, 255, 0),
            bgProgram: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'Overlays',
      name: 'OVL All Off',
      type: 'button',
      style: {
        text: 'OVL All Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInputAllOff', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Overlays',
      name: 'OVL 1 Zoom',
      type: 'button',
      style: {
        text: 'OVL 1 Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput1Zoom', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Overlays',
      name: 'OVL2Zoom',
      type: 'button',
      style: {
        text: 'OVL2Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput2Zoom', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Overlays',
      name: 'OVL3Zoom',
      type: 'button',
      style: {
        text: 'OVL3Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput3Zoom', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Overlays',
      name: 'OVL4Zoom',
      type: 'button',
      style: {
        text: 'OVL4Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInput4Zoom', input: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    // PlayList
    {
      category: 'PlayList',
      name: 'PlayList Start',
      type: 'button',
      style: {
        text: 'PlayList Start',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'StartPlayList' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'PlayList',
      name: 'PlayList Stop',
      type: 'button',
      style: {
        text: 'PlayList Stop',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'StopPlayList' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'PlayList',
      name: 'PlayList Next',
      type: 'button',
      style: {
        text: 'PlayList Next',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'NextPlayListEntry' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'PlayList',
      name: 'PlayList Prev',
      type: 'button',
      style: { text: '', size: '18', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'PreviousPlayListEntry' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    // Replay
    {
      category: 'Replay',
      name: 'A Cam 1',
      type: 'button',
      style: {
        text: 'A Cam 1',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayACamera', options: { functionID: `ReplayACamera1` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'A', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'A Cam 2',
      type: 'button',
      style: {
        text: 'A Cam 2',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayACamera', options: { functionID: `ReplayACamera2` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'A', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'A Cam 3',
      type: 'button',
      style: {
        text: 'A Cam 3',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayACamera', options: { functionID: `ReplayACamera3` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'A', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'A Cam 4',
      type: 'button',
      style: {
        text: 'A Cam 4',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayACamera', options: { functionID: `ReplayACamera4` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'A', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'A Cam 5',
      type: 'button',
      style: {
        text: 'A Cam 5',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayACamera', options: { functionID: `ReplayACamera5` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'A', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'A Cam 6',
      type: 'button',
      style: {
        text: 'A Cam 6',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayACamera', options: { functionID: `ReplayACamera6` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'A', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'A Cam 7',
      type: 'button',
      style: {
        text: 'A Cam 7',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayACamera', options: { functionID: `ReplayACamera7` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'A', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'A Cam 8',
      type: 'button',
      style: {
        text: 'A Cam 8',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayACamera', options: { functionID: `ReplayACamera8` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'A', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'B Cam 1',
      type: 'button',
      style: {
        text: 'B Cam 1',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayBCamera', options: { functionID: `ReplayBCamera1` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'B', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'B Cam 2',
      type: 'button',
      style: {
        text: 'B Cam 2',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayBCamera', options: { functionID: `ReplayBCamera2` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'B', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'B Cam 3',
      type: 'button',
      style: {
        text: 'B Cam 3',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayBCamera', options: { functionID: `ReplayBCamera3` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'B', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'B Cam 4',
      type: 'button',
      style: {
        text: 'B Cam 4',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayBCamera', options: { functionID: `ReplayBCamera4` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'B', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'B Cam 5',
      type: 'button',
      style: {
        text: 'B Cam 5',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayBCamera', options: { functionID: `ReplayBCamera5` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'B', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'B Cam 6',
      type: 'button',
      style: {
        text: 'B Cam 6',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayBCamera', options: { functionID: `ReplayBCamera6` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'B', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'B Cam 7',
      type: 'button',
      style: {
        text: 'B Cam 7',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayBCamera', options: { functionID: `ReplayBCamera7` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'B', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'B Cam 8',
      type: 'button',
      style: {
        text: 'B Cam 8',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayBCamera', options: { functionID: `ReplayBCamera8` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayCamera',
          options: { channel: 'B', camera: 1, fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'Channel\nA|B',
      type: 'button',
      style: {
        text: 'Channel\nA|B',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replaySelectChannel', options: { functionID: `replaySelectChannelAB` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replaySelectedChannel',
          options: { channel: 'AB', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'Channel\nA',
      type: 'button',
      style: {
        text: 'Channel\nA',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replaySelectChannel', options: { functionID: `replaySelectChannelA` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replaySelectedChannel',
          options: { channel: 'A', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'Channel\nB',
      type: 'button',
      style: {
        text: 'Channel\nB',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replaySelectChannel', options: { functionID: `replaySelectChannelB` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replaySelectedChannel',
          options: { channel: 'B', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'Rec',
      type: 'button',
      style: {
        text: 'Rec',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayRecording', options: { functionID: `ReplayStartStopRecording` } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayStatus',
          options: { status: 'recording', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'Live',
      type: 'button',
      style: {
        text: 'Live',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayLiveToggle', options: {} }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'replayStatus',
          options: { status: 'live', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0) },
        },
      ],
    },
    {
      category: 'Replay',
      name: 'Jump to Now',
      type: 'button',
      style: {
        text: 'Jump to Now',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayJumpToNow', options: { channel: 'Current' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Play Events',
      type: 'button',
      style: {
        text: 'Play Events',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayPlay', options: { channel: 'Current' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Pause Events',
      type: 'button',
      style: {
        text: 'Pause Events',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayPause', options: { channel: 'Current' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Play Selected Event',
      type: 'button',
      style: {
        text: 'Play Selected Event',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayPlaySelectedEventToOutput', options: { channel: 'Current' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Play Events by ID',
      type: 'button',
      style: {
        text: 'Play Events by ID',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayPlayEventsByIDToOutput', options: { channel: 'Current', value: 0 } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Mark In',
      type: 'button',
      style: {
        text: 'Mark In',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkIn', value: '0', value2: '10' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Mark Out',
      type: 'button',
      style: {
        text: 'Mark Out',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkOut', value: '0', value2: '10' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Mark Last 10s',
      type: 'button',
      style: {
        text: 'Mark Last 10s',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkInOut', value: '10', value2: '10' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Mark Last 30s',
      type: 'button',
      style: {
        text: 'Mark Last 30s',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkInOut', value: '30', value2: '10' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Update In',
      type: 'button',
      style: {
        text: 'Update In',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayUpdateInOut', options: { functionID: 'ReplayUpdateSelectedInPoint' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Replay',
      name: 'Update Out',
      type: 'button',
      style: {
        text: 'Update Out',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'replayUpdateInOut', options: { functionID: 'ReplayUpdateSelectedOutPoint' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    // Slides & Lists
    {
      category: 'Slides & Lists',
      name: 'Next Photo',
      type: 'button',
      style: {
        text: 'Next Photo',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'nextPicture', options: { input: '1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Slides & Lists',
      name: 'Prev Photo',
      type: 'button',
      style: {
        text: 'Prev Photo',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previousPicture', options: { input: '1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Slides & Lists',
      name: 'Select Index 1',
      type: 'button',
      style: {
        text: 'Select Index 1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'previousPicture', options: { input: '1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'inputSelectedIndex',
          options: {
            input: '1',
            selectedIndex: 1,
            fg: combineRgb(255, 255, 255),
            bg: combineRgb(255, 0, 0),
            et: combineRgb(0, 0, 0),
            eb: combineRgb(255, 255, 0),
          },
        },
      ],
    },

    // Titles & Graphics
    {
      category: 'Titles & Graphics',
      name: 'Set Title',
      type: 'button',
      style: {
        text: 'Set Title',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'setText',
              options: { input: '1', selectedIndex: '0', adjustment: 'Set', value: '0', encode: false },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Set Title +1',
      type: 'button',
      style: {
        text: 'Set Title +1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'setText',
              options: { input: '1', selectedIndex: '0', adjustment: 'Increase', value: '1', encode: false },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Set Title -1',
      type: 'button',
      style: {
        text: 'Set Title -1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'setText',
              options: { input: '1', selectedIndex: '0', adjustment: 'Decrease', value: '1', encode: false },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Preset 0',
      type: 'button',
      style: {
        text: 'Title Preset 0',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'selectTitlePreset', options: { input: '', value: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Preset 1',
      type: 'button',
      style: {
        text: 'Title Preset 1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'selectTitlePreset', options: { input: '', value: '1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Preset 2',
      type: 'button',
      style: {
        text: 'Title Preset 2',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'selectTitlePreset', options: { input: '', value: '2' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Preset 3',
      type: 'button',
      style: {
        text: 'Title Preset 3',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'selectTitlePreset', options: { input: '', value: '3' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Next Title',
      type: 'button',
      style: {
        text: 'Next Title',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titlePreset', options: { input: '', functionID: 'NextTitlePreset' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Prev Title',
      type: 'button',
      style: {
        text: 'Prev Title',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titlePreset', options: { input: '', functionID: 'PreviousTitlePreset' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Transition In',
      type: 'button',
      style: {
        text: 'Title Transition In',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'TransitionIn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Transition In',
      type: 'button',
      style: {
        text: 'Title Transition In',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'TransitionIn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Transition Out',
      type: 'button',
      style: {
        text: 'Title Transition Out',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'TransitionOut' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 1',
      type: 'button',
      style: {
        text: 'Title Page 1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 2',
      type: 'button',
      style: {
        text: 'Title Page 2',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page2' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 3',
      type: 'button',
      style: {
        text: 'Title Page 3',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page3' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 4',
      type: 'button',
      style: {
        text: 'Title Page 4',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page4' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 5',
      type: 'button',
      style: {
        text: 'Title Page 5',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page5' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 6',
      type: 'button',
      style: {
        text: 'Title Page 6',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page6' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 7',
      type: 'button',
      style: {
        text: 'Title Page 7',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page7' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 8',
      type: 'button',
      style: {
        text: 'Title Page 8',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page8' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 9',
      type: 'button',
      style: {
        text: 'Title Page 9',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page9' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Page 10',
      type: 'button',
      style: {
        text: 'Title Page 10',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Page10' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Continuous',
      type: 'button',
      style: {
        text: 'Title Continuous',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Continuous' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Data Change In',
      type: 'button',
      style: {
        text: 'Title Data Change In',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'DataChangeIn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Title Data Change Out',
      type: 'button',
      style: {
        text: 'Title Data Change Out',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'DataChangeOut' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'CND Start',
      type: 'button',
      style: {
        text: 'CND Start',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'controlCountdown', options: { functionID: 'StartCountdown', input: '', selectedIndex: '0' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'CND Stop',
      type: 'button',
      style: {
        text: 'CND Stop',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'controlCountdown', options: { functionID: 'StopCountdown', input: '', selectedIndex: '0' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'CND Pause',
      type: 'button',
      style: {
        text: 'CND Pause',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'controlCountdown', options: { functionID: 'PauseCountdown', input: '', selectedIndex: '0' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'CND Change',
      type: 'button',
      style: {
        text: 'CND Change',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'changeCountdown', options: { value: '00:10:00', input: '', selectedIndex: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'CND 0 sec',
      type: 'button',
      style: {
        text: 'CND 0 sec',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setCountdown', options: { value: '00:00:00', input: '', selectedIndex: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'CND 10 sec',
      type: 'button',
      style: {
        text: 'CND 1 sec',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setCountdown', options: { value: '00:00:10', input: '', selectedIndex: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'CND 30 sec',
      type: 'button',
      style: {
        text: 'CND 30 sec',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setCountdown', options: { value: '00:00:30', input: '', selectedIndex: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'CND 60 sec',
      type: 'button',
      style: {
        text: 'CND 60 sec',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setCountdown', options: { value: '00:01:00', input: '', selectedIndex: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'CND 120 sec',
      type: 'button',
      style: {
        text: 'CND 120 sec',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setCountdown', options: { value: '00:02:00', input: '', selectedIndex: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    // Transitions
    {
      category: 'Transitions',
      name: 'Transition 1',
      type: 'button',
      style: {
        text: 'Transition 1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: 'Transition1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Transition 2',
      type: 'button',
      style: {
        text: 'Transition 2',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: 'Transition2' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Transition 3',
      type: 'button',
      style: {
        text: 'Transition 3',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: 'Transition3' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Transition 4',
      type: 'button',
      style: {
        text: 'Transition 4',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: 'Transition4' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Stinger 1',
      type: 'button',
      style: {
        text: 'Stinger1',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: 'Stinger1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Stinger 2',
      type: 'button',
      style: {
        text: 'Stinger 2',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: 'Stinger2' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'T1 Set Cut',
      type: 'button',
      style: {
        text: 'T1 Set Cut',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionEffect', options: { functionID: 'SetTransitionEffect1', value: 'Cut' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'T2 Set Fade',
      type: 'button',
      style: {
        text: 'T2 Set Fade',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionEffect', options: { functionID: 'SetTransitionEffect2', value: 'Fade' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'T3 Set Zoom',
      type: 'button',
      style: {
        text: 'T3 Set Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionEffect', options: { functionID: 'SetTransitionEffect3', value: 'Zoom' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'T4 Set Merge',
      type: 'button',
      style: {
        text: 'T4 Set Merge',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionEffect', options: { functionID: 'SetTransitionEffect4', value: 'Merge' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'T1 Set 250ms',
      type: 'button',
      style: {
        text: 'T1 Set 250ms',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 250 } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'T1 Set 500ms',
      type: 'button',
      style: {
        text: 'T1 Set 500ms',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 500 } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'T1 Set 1000ms',
      type: 'button',
      style: {
        text: 'T1 Set 1000ms',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 1000 } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'T1 Set 1500ms',
      type: 'button',
      style: {
        text: 'T1 Set 1500ms',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 1500 } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Cut',
      type: 'button',
      style: {
        text: 'Cut',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { functionID: 'Cut', mix: 0, mixVariable: '', duration: '1000' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Fade',
      type: 'button',
      style: {
        text: 'Fade',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { functionID: 'Fade', mix: 0, mixVariable: '', duration: '1000' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Zoom',
      type: 'button',
      style: {
        text: 'Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { functionID: 'Zoom', mix: 0, mixVariable: '', duration: '1000' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Wipe',
      type: 'button',
      style: {
        text: 'Wipe',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { functionID: 'Wipe', mix: 0, mixVariable: '', duration: '1000' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Slide',
      type: 'button',
      style: {
        text: 'Slide',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { functionID: 'Slide', mix: 0, mixVariable: '', duration: '1000' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Fly',
      type: 'button',
      style: {
        text: 'Fly',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { functionID: 'Fly', mix: 0, mixVariable: '', duration: '1000' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Cross Zoom',
      type: 'button',
      style: {
        text: 'Cross Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'CrossZoom', mix: 0, mixVariable: '', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Fly Rotate',
      type: 'button',
      style: {
        text: 'Fly Rotate',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'FlyRotate', mix: 0, mixVariable: '', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Cube',
      type: 'button',
      style: {
        text: 'Cube',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { functionID: 'Cube', mix: 0, mixVariable: '', duration: '1000' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Cube Zoom',
      type: 'button',
      style: {
        text: 'Cube Zoom',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'CubeZoom', mix: 0, mixVariable: '', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Vertical Wipe',
      type: 'button',
      style: {
        text: 'Vertical Wipe',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'VerticalWipe', mix: 0, mixVariable: '', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Vertical Slide',
      type: 'button',
      style: {
        text: 'Vertical Slide',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'VerticalSlide', mix: 0, mixVariable: '', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Merge',
      type: 'button',
      style: {
        text: 'Merge',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'transitionMix', options: { functionID: 'Merge', mix: 0, mixVariable: '', duration: '1000' } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Wipe Reverse',
      type: 'button',
      style: {
        text: 'Wipe Reverse',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'WipeReverse', mix: 0, mixVariable: '', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Slide Reverse',
      type: 'button',
      style: {
        text: 'Slide Reverse',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'SlideReverse', mix: 0, mixVariable: '', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Vertical Wipe Reverse',
      type: 'button',
      style: {
        text: 'Vertical Wipe Reverse',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'VerticalWipeReverse', mix: 0, mixVariable: '', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Transitions',
      name: 'Vertical Slide Reverse',
      type: 'button',
      style: {
        text: 'Vertical Slide Reverse',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'transitionMix',
              options: { functionID: 'VerticalSlideReverse', mix: 0, mixVariable: '', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },

    // Video Playback
    {
      category: 'Video Playback',
      name: 'play',
      type: 'button',
      style: {
        text: 'play',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Play' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Pause',
      type: 'button',
      style: {
        text: 'Pause',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Pause' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Play Pause',
      type: 'button',
      style: {
        text: 'Play Pause',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'PlayPause' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Restart',
      type: 'button',
      style: {
        text: 'Restart',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Restart' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Loop ON',
      type: 'button',
      style: {
        text: 'Loop ON',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'LoopOn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Loop OFF',
      type: 'button',
      style: {
        text: 'Loop OFF',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'LoopOff' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Playhead 10 sec',
      type: 'button',
      style: {
        text: 'Playhead 10 sec',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            { actionId: 'videoPlayhead', options: { input: '', inputType: true, adjustment: 'Set', value: 10000 } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Playhead +10 sec',
      type: 'button',
      style: {
        text: 'Playhead +10 sec',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'videoPlayhead',
              options: { input: '', inputType: true, adjustment: 'Increase', value: 10000 },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Playhead -10 sec',
      type: 'button',
      style: {
        text: 'Playhead -10 sec',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'videoPlayhead',
              options: { input: '', inputType: true, adjustment: 'Decrease', value: 10000 },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Mark In',
      type: 'button',
      style: {
        text: 'Mark In',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkIn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Mark Out',
      type: 'button',
      style: {
        text: 'Mark Out',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkOut' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Clear In/Out',
      type: 'button',
      style: {
        text: 'Clear In/Out',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkReset' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Clear In',
      type: 'button',
      style: {
        text: 'Clear In',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkResetIn' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Clear Out',
      type: 'button',
      style: {
        text: 'Clear Out',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkResetOut' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Video Playback',
      name: 'Video Timecode',
      type: 'button',
      style: {
        text: 'Video Timecode',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [],
      feedbacks: [
        {
          feedbackId: 'videoTimer',
          options: {
            input: '',
            color: combineRgb(255, 255, 255),
            color30: combineRgb(255, 255, 0),
            color10: combineRgb(255, 0, 0),
            loop: false,
          },
        },
      ],
    },

    // vMix Functions
    {
      category: 'vMix Functions',
      name: 'Toggle Multicorder',
      type: 'button',
      style: {
        text: 'Toggle Multicorder',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopMultiCorder', value: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'multiCorder', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0), value: '' },
        },
      ],
    },
    {
      category: 'vMix Functions',
      name: 'Toggle Recording',
      type: 'button',
      style: {
        text: 'Toggle Recording',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopRecording', value: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'recording', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0), value: '' },
        },
      ],
    },
    {
      category: 'vMix Functions',
      name: 'Toggle Stream',
      type: 'button',
      style: {
        text: 'Toggle Stream',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopStreaming', value: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'streaming', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0), value: '' },
        },
      ],
    },
    {
      category: 'vMix Functions',
      name: 'Toggle Ext',
      type: 'button',
      style: {
        text: 'Toggle Ext',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopExternal', value: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'external', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0), value: '' },
        },
      ],
    },
    {
      category: 'vMix Functions',
      name: 'Toggle Fullscreen',
      type: 'button',
      style: {
        text: 'Toggle Fullscreen',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'Fullscreen', value: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'fullscreen', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0), value: '' },
        },
      ],
    },
    {
      category: 'vMix Functions',
      name: 'Toggle FTB',
      type: 'button',
      style: {
        text: 'Toggle FTB',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'FadeToBlack', value: '' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'fadeToBlack', fg: combineRgb(255, 255, 255), bg: combineRgb(255, 0, 0), value: '' },
        },
      ],
    },
  ]

  return presets as unknown as CompanionPresetDefinitions
}
