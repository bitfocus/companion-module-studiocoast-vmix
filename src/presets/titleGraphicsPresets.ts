import { combineRgb } from '@companion-module/base'
import type { VMixPresetArray } from './presets'

export const getTitleGraphicsPresets = (): VMixPresetArray => {
  const titleGraphicsPresets: VMixPresetArray = [
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
      name: 'Title Presets',
      type: 'text',
      text: '',
    },
  ]

  for (let i = 0; i < 5; i++) {
    titleGraphicsPresets.push({
      category: 'Titles & Graphics',
      name: `Title Preset ${i}`,
      type: 'button',
      style: {
        text: `Title Preset ${i}`,
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'selectTitlePreset', options: { input: '', value: i.toString() } }],
          up: [],
        },
      ],
      feedbacks: [],
    })
  }

  titleGraphicsPresets.push(
    {
      category: 'Titles & Graphics',
      name: 'Title Animations',
      type: 'text',
      text: '',
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
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'TransitionIn', variable: '' } }],
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
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'TransitionOut', variable: '' } }],
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
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Continuous', variable: '' } }],
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
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'DataChangeIn', variable: '' } }],
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
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'DataChangeOut', variable: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
  )

  for (let i = 1; i < 11; i++) {
    titleGraphicsPresets.push({
      category: 'Titles & Graphics',
      name: `Title Page ${i}`,
      type: 'button',
      style: {
        text: `Title Page ${i}`,
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: `Page${i}` as 'Page1', variable: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    })
  }

  titleGraphicsPresets.push(
    {
      category: 'Titles & Graphics',
      name: 'Countdowns',
      type: 'text',
      text: '',
    },
    {
      category: 'Titles & Graphics',
      name: 'Countdown Start',
      type: 'button',
      style: {
        text: 'Countdown Start',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'controlCountdown',
              options: { functionID: 'StartCountdown', input: '', selectedIndex: '0' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Countdown Stop',
      type: 'button',
      style: {
        text: 'Countdown Stop',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'controlCountdown', options: { functionID: 'StopCountdown', input: '', selectedIndex: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Countdown Pause',
      type: 'button',
      style: {
        text: 'Countdown Pause',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'controlCountdown',
              options: { functionID: 'PauseCountdown', input: '', selectedIndex: '0' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'Titles & Graphics',
      name: 'Countdown Change',
      type: 'button',
      style: {
        text: 'Countdown Change',
        size: '14',
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
  )

  const countdowns = [
    { label: '0', time: '00:00:00' },
    { label: '10', time: '00:00:10' },
    { label: '30', time: '00:00:30' },
    { label: '60', time: '00:01:00' },
    { label: '120', time: '00:02:00' },
  ]

  countdowns.forEach((x) => {
    titleGraphicsPresets.push({
      category: 'Titles & Graphics',
      name: `Countdown ${x.label} sec`,
      type: 'button',
      style: {
        text: `Countdown ${x.label} sec`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'setCountdown', options: { value: x.time, input: '', selectedIndex: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    })
  })

  return titleGraphicsPresets
}
