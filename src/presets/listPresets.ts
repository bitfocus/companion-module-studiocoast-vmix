import { combineRgb } from '@companion-module/base'
import { VMixPresetArray } from './presets'

export const getListPresets = (): VMixPresetArray => {
  const slideListPresets: VMixPresetArray = [
    {
      category: 'Slides & Lists',
      name: 'Next Photo',
      type: 'button',
      style: {
        text: 'Next Photo',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'nextPicture', options: { input: '1' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Slides & Lists',
      name: 'Prev Photo',
      type: 'button',
      style: {
        text: 'Prev Photo',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'previousPicture', options: { input: '1' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Slides & Lists',
      name: 'Select Index',
      type: 'button',
      style: {
        text: 'Select Index',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'selectIndex', options: { input: '1', value: '1' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputSelectedIndexBoolean',
          options: {
            input: '1',
            selectedIndex: '1'
          },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    }
  ]

  return slideListPresets
}
