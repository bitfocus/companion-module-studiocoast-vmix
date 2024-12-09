import { combineRgb } from '@companion-module/base'
import { VMixPresetArray } from './presets'

export const getGeneralPresets = (): VMixPresetArray => {
  const generalPresets: VMixPresetArray = [
    {
      category: 'Scripting & Commands',
      name: 'Send Key Press',
      type: 'button',
      style: {
        text: 'Send Key Press',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'keyPress', options: { value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Scripting & Commands',
      name: 'Script Start',
      type: 'button',
      style: {
        text: 'Script Start',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'scriptStart', options: { value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Scripting & Commands',
      name: 'Script Stop',
      type: 'button',
      style: {
        text: 'Script Stop',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'scriptStop', options: { value: '' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Scripting & Commands',
      name: 'Script Stop All',
      type: 'button',
      style: {
        text: 'Script Stop All',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'scriptStopAll', options: {} }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Scripting & Commands',
      name: 'Custom Command',
      type: 'button',
      style: {
        text: 'Custom Command',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'command', options: { command: '', encode: false } }],
          up: []
        }
      ],
      feedbacks: []
    }
  ]

  return generalPresets
}
