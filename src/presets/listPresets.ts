import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

export const getListDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const slideListDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    list_nextPhoto: {
      name: 'Next Photo',
      type: 'simple',
      style: {
        text: 'Next Photo',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'nextPicture', options: { input: '1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    list_prevPhoto: {
      name: 'Prev Photo',
      type: 'simple',
      style: {
        text: 'Prev Photo',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'previousPicture', options: { input: '1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    list_nextList: {
      name: 'Next List Item',
      type: 'simple',
      style: {
        text: 'Next List Item',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'nextItem', options: { input: '1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    list_prevList: {
      name: 'Prev List Item',
      type: 'simple',
      style: {
        text: 'Prev List Item',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'previousItem', options: { input: '1' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    list_selectIndex: {
      name: 'Select Index',
      type: 'simple',
      style: {
        text: 'Select Index',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'selectIndex', options: { input: '1', value: '1' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'inputSelectedIndexBoolean',
          options: {
            input: '1',
            selectedIndex: '1',
          },
          style: {
            color: 0x000000,
            bgcolor: 0x0ffff00,
          },
        },
      ],
    },
  }

  return slideListDefinitions
}

export const getListStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'listStructure',
      name: 'List / Photo / PowerPoint item selection',
      description: 'Starting and Stopping scripts in vMix',
      definitions: [
        {
          id: 'listPhotos',
          type: 'simple',
          name: 'Photo & PowerPoint selection',
          presets: ['list_nextPhoto', 'list_prevPhoto', 'list_selectIndex'],
        },
        {
          id: 'listList',
          type: 'simple',
          name: 'List input item selection',
          presets: ['list_nextList', 'list_prevList', 'list_selectIndex'],
        },
      ],
    },
  ]

  return structure
}
