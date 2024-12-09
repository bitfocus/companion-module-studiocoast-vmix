import { combineRgb } from '@companion-module/base'
import VMixInstance from '..'
import { VMixPresetArray } from './presets'

export const getButtonShiftPresets = (instance: VMixInstance): VMixPresetArray => {
  const buttonShiftPresets: VMixPresetArray = [
    {
      category: 'Button Shift',
      name: 'Button Shifting',
      type: 'text',
      text: `Button Shifting is a feature unique in this module that allows actions/feedbacks to support pointing to 2 different things based on if the 'Shift' button is pressed or not.`
    },
    {
      category: 'Button Shift',
      name: '',
      type: 'text',
      text: `The two options need to be split by the delimter set in the config, for example an Preview Input action set to "1|5" will preview input 1 by default, or 5 when Shift is pressed, essentially doubling the buttons on a page.`
    },
    {
      category: 'Button Shift',
      name: '',
      type: 'text',
      text: `Some feedbacks, such as for preview/program can 'blink' through, so a solid green would indicate an input in preview, blinking green means the input on the other Shift being in preview.`
    },
    {
      category: 'Button Shift',
      name: 'Shift',
      type: 'button',
      style: {
        text: 'Shift',
        size: '24',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'buttonShift', options: <any>[] }],
          up: [{ actionId: 'buttonShift', options: <any>[] }]
        }
      ],
      feedbacks: [
        {
          feedbackId: 'buttonShift',
          options: {},
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'Button Shift',
      name: `Preview 1 ${instance.config.shiftDelimiter} 5 to 4 ${instance.config.shiftDelimiter} 8`,
      type: 'text',
      text: ''
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
              options: { mix: 0, mixVariable: '', input: `1${instance.config.shiftDelimiter}5` }
            }
          ],
          up: []
        }
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
            tally: ''
          }
        },
        { feedbackId: 'buttonText', options: { text: `PRV 1${instance.config.shiftDelimiter}PRV 5` } }
      ]
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
              options: { mix: 0, mixVariable: '', input: `2${instance.config.shiftDelimiter}6` }
            }
          ],
          up: []
        }
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
            tally: ''
          }
        },
        { feedbackId: 'buttonText', options: { text: `PRV 2${instance.config.shiftDelimiter}PRV 6` } }
      ]
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
              options: { mix: 0, mixVariable: '', input: `3${instance.config.shiftDelimiter}7` }
            }
          ],
          up: []
        }
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
            tally: ''
          }
        },
        { feedbackId: 'buttonText', options: { text: `PRV 3${instance.config.shiftDelimiter}PRV 7` } }
      ]
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
              options: { mix: 0, mixVariable: '', input: `4${instance.config.shiftDelimiter}8` }
            }
          ],
          up: []
        }
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
            tally: ''
          }
        },
        { feedbackId: 'buttonText', options: { text: `PRV 4${instance.config.shiftDelimiter}PRV 8` } }
      ]
    },

    {
      category: 'Button Shift',
      name: `Program 1 ${instance.config.shiftDelimiter} 5 to 4 ${instance.config.shiftDelimiter} 8`,
      type: 'text',
      text: ''
    },
    {
      category: 'Button Shift',
      name: `PGM 1 / 5`,
      type: 'button',
      style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [
            {
              actionId: 'programCut',
              options: { mix: 0, mixVariable: '', input: `1${instance.config.shiftDelimiter}5` }
            }
          ],
          up: []
        }
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
            tally: ''
          }
        },
        { feedbackId: 'buttonText', options: { text: `PRV 1${instance.config.shiftDelimiter}PRV 5` } }
      ]
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
              options: { mix: 0, mixVariable: '', input: `2${instance.config.shiftDelimiter}6` }
            }
          ],
          up: []
        }
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
            tally: ''
          }
        },
        { feedbackId: 'buttonText', options: { text: `PRV 2${instance.config.shiftDelimiter}PRV 6` } }
      ]
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
              options: { mix: 0, mixVariable: '', input: `3${instance.config.shiftDelimiter}7` }
            }
          ],
          up: []
        }
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
            tally: ''
          }
        },
        { feedbackId: 'buttonText', options: { text: `PRV 3${instance.config.shiftDelimiter}PRV 7` } }
      ]
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
              options: { mix: 0, mixVariable: '', input: `4${instance.config.shiftDelimiter}8` }
            }
          ],
          up: []
        }
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
            tally: ''
          }
        },
        { feedbackId: 'buttonText', options: { text: `PRV 4${instance.config.shiftDelimiter}PRV 8` } }
      ]
    }
  ]

  return buttonShiftPresets
}
