import type { CompanionPresetDefinitions, CompanionPresetGroup, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

const countdowns = [
  { label: '0', time: '00:00:00' },
  { label: '10', time: '00:00:10' },
  { label: '30', time: '00:00:30' },
  { label: '60', time: '00:01:00' },
  { label: '120', time: '00:02:00' },
]

export const getTitleGraphicsDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const titleGraphicsDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    title_setText: {
      name: 'Set Title',
      type: 'simple',
      style: {
        text: 'Set Title',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
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

    title_setPlus1: {
      name: 'Set Title +1',
      type: 'simple',
      style: {
        text: 'Set Title +1',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
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

    title_setMinus1: {
      name: 'Set Title -1',
      type: 'simple',
      style: {
        text: 'Set Title -1',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
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

    title_nextTitle: {
      name: 'Next Title',
      type: 'simple',
      style: {
        text: 'Next Title',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'titlePreset', options: { input: '', functionID: 'NextTitlePreset' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    title_prevTitle: {
      name: 'Prev Title',
      type: 'simple',
      style: {
        text: 'Prev Title',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'titlePreset', options: { input: '', functionID: 'PreviousTitlePreset' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
  }

  for (let i = 0; i < 5; i++) {
    titleGraphicsDefinitions[`title_preset${i}`] = {
      name: `Title Preset ${i}`,
      type: 'simple',
      style: {
        text: `Title Preset ${i}`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'selectTitlePreset', options: { input: '', value: i.toString() } }],
          up: [],
        },
      ],
      feedbacks: [],
    }
  }

  titleGraphicsDefinitions.title_transitionIn = {
    name: 'Title Transition In',
    type: 'simple',
    style: {
      text: 'Title Transition In',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'TransitionIn' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  titleGraphicsDefinitions.title_transitionOut = {
    name: 'Title Transition Out',
    type: 'simple',
    style: {
      text: 'Title Transition Out',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'TransitionOut' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  titleGraphicsDefinitions.title_continuous = {
    name: 'Title Continuous',
    type: 'simple',
    style: {
      text: 'Title Continuous',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Continuous' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  titleGraphicsDefinitions.title_dataChangeIn = {
    name: 'Title Data Change In',
    type: 'simple',
    style: {
      text: 'Title Data Change In',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'DataChangeIn' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  titleGraphicsDefinitions.title_dataChangeOut = {
    name: 'Title Data Change Out',
    type: 'simple',
    style: {
      text: 'Title Data Change Out',
      size: '18',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'DataChangeOut' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  for (let i = 1; i < 11; i++) {
    titleGraphicsDefinitions[`title_page${i}`] = {
      name: `Title Page ${i}`,
      type: 'simple',
      style: {
        text: `Title Page ${i}`,
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: `Page${i}` as 'Page1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    }
  }

  titleGraphicsDefinitions.title_countdownStart = {
    name: 'Countdown Start',
    type: 'simple',
    style: {
      text: 'Countdown Start',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
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
  }

  titleGraphicsDefinitions.title_countdownStop = {
    name: 'Countdown Stop',
    type: 'simple',
    style: {
      text: 'Countdown Stop',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'controlCountdown', options: { functionID: 'StopCountdown', input: '', selectedIndex: '0' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  titleGraphicsDefinitions.title_countdownPause = {
    name: 'Countdown Pause',
    type: 'simple',
    style: {
      text: 'Countdown Pause',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
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
  }

  titleGraphicsDefinitions.title_countdownChange = {
    name: 'Countdown Change',
    type: 'simple',
    style: {
      text: 'Countdown Change',
      size: '14',
      color: 0xffffff,
      bgcolor: 0x000000,
    },
    steps: [
      {
        down: [{ actionId: 'changeCountdown', options: { value: '00:10:00', input: '', selectedIndex: '0' } }],
        up: [],
      },
    ],
    feedbacks: [],
  }

  countdowns.forEach((countdown) => {
    titleGraphicsDefinitions[`title_countdownSet${countdown.label}`] = {
      name: `Countdown ${countdown.label} sec`,
      type: 'simple',
      style: {
        text: `Countdown ${countdown.label} sec`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setCountdown', options: { value: countdown.time, input: '', selectedIndex: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    }
  })

  return titleGraphicsDefinitions
}

export const getTitleStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const titleGroups: CompanionPresetGroup<VMixInstanceTypes>[] = []

  const countdownGroup: CompanionPresetGroup<VMixInstanceTypes> = {
    id: `title_setCountdown`,
    type: 'simple',
    name: `Countdown Duration`,
    description: `Set a Countdowns duration`,
    presets: [],
  }

  countdowns.forEach((countdown) => {
    countdownGroup.presets.push(`title_countdownSet${countdown.label}`)
  })

  titleGroups.push(countdownGroup)

  const titlePageGroup: CompanionPresetGroup<VMixInstanceTypes> = {
    id: `title_page`,
    type: 'simple',
    name: `Title Page`,
    description: `Animations a Title to a Page`,
    presets: [],
  }

  for (let i = 1; i < 11; i++) {
    titlePageGroup.presets.push(`title_page${i}`)
  }

  titleGroups.push(titlePageGroup)

  const titlePresetGroup: CompanionPresetGroup<VMixInstanceTypes> = {
    id: `title_presets`,
    type: 'simple',
    name: `Title Preset`,
    description: `Sets a title to preset values based on preset index`,
    presets: [],
  }

  for (let i = 0; i < 5; i++) {
    titlePresetGroup.presets.push(`title_preset${i}`)
  }

  titleGroups.push(titlePresetGroup)

  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'titleStructure',
      name: 'Titles',
      description: 'Adjust Title values, Countdowns, and Title Animations',
      definitions: [
        {
          id: `title_valueControl`,
          type: 'simple',
          name: `Title Value Control`,
          description: 'Set / Increase / Decrease / Next / Prev title value',
          presets: ['title_setText', 'title_setPlus1', 'title_setMinus1', 'title_nextTitle', 'title_prevTitle'],
        },
        {
          id: `title_countdownControl`,
          type: 'simple',
          name: `Countdown Control`,
          description: `Start / Stop / Pause / Change a Countdowns current state`,
          presets: ['title_countdownStart', 'title_countdownStop', 'title_countdownPause', 'title_countdownChange'],
        },
        {
          id: `title_animationControl`,
          type: 'simple',
          name: `Animation`,
          description: `Title Animations`,
          presets: ['title_transitionIn', 'title_transitionOut', 'title_continuous', 'title_dataChangeIn', 'title_dataChangeOut'],
        },
        ...titleGroups,
      ],
    },
  ]

  return structure
}
