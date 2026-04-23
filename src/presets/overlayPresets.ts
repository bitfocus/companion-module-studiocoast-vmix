import type { CompanionPresetDefinitions, CompanionPresetGroup, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

export const getOverlayDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const overlayDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    overlay_allOff: {
      name: 'OVL All Off',
      type: 'simple',
      style: {
        text: 'OVL All Off',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { type: 'OverlayInputAllOff', input: '', overlay: '1', mix: [1] } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
  }

  for (let i = 1; i < 9; i++) {
    overlayDefinitions[`overlay_${i}Pgm`] = {
      name: `Overlay ${1} Prgm`,
      type: 'simple',
      style: {
        text: `Overlay ${1} Prgm`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'overlayFunctions',
              options: { type: 'OverlayInput', input: '', overlay: `${i}`, mix: [1] },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: i.toString(),
            fg: 0xffffff,
            bgPreview: 0x00ff00,
            bgProgram: 0xff0000,
          },
        },
      ],
    }

    overlayDefinitions[`overlay_${i}Prv`] = {
      name: `Overlay ${i} Prv`,
      type: 'simple',
      style: {
        text: `Overlay ${i} Prv`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'overlayFunctions',
              options: { type: 'PreviewOverlayInput', input: '', overlay: '1', mix: [1] },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: i.toString(),
            fg: 0xffffff,
            bgPreview: 0x00ff00,
            bgProgram: 0xff0000,
          },
        },
      ],
    }

    overlayDefinitions[`overlay_${i}In`] = {
      name: `Overlay ${i} In`,
      type: 'simple',
      style: {
        text: `Overlay ${i} In`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'overlayFunctions',
              options: { type: 'In', input: '', overlay: '1', mix: [1] },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: i.toString(),
            fg: 0xffffff,
            bgPreview: 0x00ff00,
            bgProgram: 0xff0000,
          },
        },
      ],
    }

    overlayDefinitions[`overlay_${i}Last`] = {
      name: `Overlay ${i} Last`,
      type: 'simple',
      style: {
        text: `Overlay ${i} Last`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'overlayFunctions',
              options: { type: 'Last', input: '', overlay: '1', mix: [1] },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: i.toString(),
            fg: 0xffffff,
            bgPreview: 0x00ff00,
            bgProgram: 0xff0000,
          },
        },
      ],
    }

    overlayDefinitions[`overlay_${i}Out`] = {
      name: `Overlay ${i} Out`,
      type: 'simple',
      style: {
        text: `Overlay ${i} Out`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'overlayFunctions',
              options: { type: 'Out', input: '', overlay: '1', mix: [1] },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: i.toString(),
            fg: 0xffffff,
            bgPreview: 0x00ff00,
            bgProgram: 0xff0000,
          },
        },
      ],
    }

    overlayDefinitions[`overlay_${i}Off`] = {
      name: `Overlay ${i} Off`,
      type: 'simple',
      style: {
        text: `Overlay ${i} Off`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'overlayFunctions',
              options: { type: 'Off', input: '', overlay: '1', mix: [1] },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'overlayStatus',
          options: {
            input: '',
            overlay: i.toString(),
            fg: 0xffffff,
            bgPreview: 0x00ff00,
            bgProgram: 0xff0000,
          },
        },
      ],
    }

    overlayDefinitions[`overlay_${i}Zoom`] = {
      name: `Overlay ${i} Zoom`,
      type: 'simple',
      style: {
        text: `Overlay ${i} Zoom`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'overlayFunctions',
              options: { type: 'Zoom', input: '', overlay: '1', mix: [1] },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }
  }

  return overlayDefinitions
}

export const getOverlayStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const overlayGroups: CompanionPresetGroup<VMixInstanceTypes>[] = []

  for (let i = 1; i < 9; i++) {
    overlayGroups.push({
      id: `overlay_${i}`,
      type: 'simple',
      name: `Overlay ${i}`,
      description: `Overlay channel ${i}`,
      presets: [`overlay_${i}Pgm`, `overlay_${i}Prv`, `overlay_${i}In`, `overlay_${i}Last`, `overlay_${i}Out`, `overlay_${i}Off`, `overlay_${i}Zoom`],
    })
  }

  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'overlayStructure',
      name: 'Overlay 1-8',
      description: 'Overlay transitions and feedback',
      definitions: [
        {
          id: `overlay_all`,
          type: 'simple',
          name: `Overlay All`,
          description: '',
          presets: ['overlay_allOff'],
        },
        ...overlayGroups,
      ],
    },
  ]

  return structure
}
