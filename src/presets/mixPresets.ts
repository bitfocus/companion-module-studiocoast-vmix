import type { CompanionPresetDefinitions, CompanionPresetGroup, CompanionPresetSection } from '@companion-module/base'
import type { VMixInstanceTypes, MixOptionEntry } from '../utils.js'

export const getMixDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const mixDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {}

  for (let mix = 1; mix < 17; mix++) {
    for (let input = 1; input < 9; input++) {
      mixDefinitions[`mix_${mix}pgm${input}`] = {
        name: `PGM ${input}`,
        type: 'simple',
        style: {
          text: `PGM ${input}`,
          size: '18',
          color: 0xffffff,
          bgcolor: 0x000000,
        },
        steps: [
          {
            down: [
              {
                actionId: 'programCut',
                options: { mix: mix as MixOptionEntry, input: input.toString() },
              },
            ],
            up: [],
          },
        ],

        feedbacks: [
          {
            feedbackId: 'inputLive',
            options: {
              mix: mix as MixOptionEntry,
              input: input.toString(),
              fg: 0xffffff,
              bg: 0xff0000,
              tally: '',
            },
          },
        ],
      }
    }

    for (let input = 1; input < 9; input++) {
      mixDefinitions[`mix_${mix}prv${input}`] = {
        name: `PRV ${input}`,
        type: 'simple',
        style: {
          text: `PRV ${input}`,
          size: '18',
          color: 0xffffff,
          bgcolor: 0x000000,
        },
        steps: [
          {
            down: [
              {
                actionId: 'previewInput',
                options: { mix: mix as MixOptionEntry, input: input.toString() },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputPreview',
            options: {
              mix: mix as MixOptionEntry,
              input: input.toString(),
              fg: 0xffffff,
              bg: 0x00ff00,
              tally: '',
            },
          },
        ],
      }
    }

    mixDefinitions[`mix_${mix}cut`] = {
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
          down: [
            {
              actionId: 'transitionMix',
              options: { mix: mix as MixOptionEntry, functionID: 'Cut', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    mixDefinitions[`mix_${mix}fade`] = {
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
          down: [
            {
              actionId: 'transitionMix',
              options: { mix: mix as MixOptionEntry, functionID: 'Fade', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    mixDefinitions[`mix_${mix}merge`] = {
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
              options: { mix: mix as MixOptionEntry, functionID: 'Merge', duration: '1000' },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    mixDefinitions[`mix_${mix}auto`] = {
      name: 'Auto',
      type: 'simple',
      style: {
        text: 'Auto',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'transition', options: { functionID: 'Transition1', mix: 1 } }],
          up: [],
        },
      ],
      feedbacks: [],
    }
  }

  return mixDefinitions
}

export const getMixStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const mixGroups: CompanionPresetGroup<VMixInstanceTypes>[] = []

  for (let mix = 1; mix < 17; mix++) {
    const transition: CompanionPresetGroup<VMixInstanceTypes> = {
      id: `mix${mix}transition`,
      type: 'simple',
      name: `Mix ${mix} Transition`,
      description: '',
      presets: [`mix_${mix}cut`, `mix_${mix}fade`, `mix_${mix}merge`, `mix_${mix}auto`],
    }

    const program: CompanionPresetGroup<VMixInstanceTypes> = {
      id: `mix${mix}pgm`,
      type: 'simple',
      name: `Mix ${mix} Program`,
      description: '',
      presets: [],
    }

    const preview: CompanionPresetGroup<VMixInstanceTypes> = {
      id: `mix${mix}prv`,
      type: 'simple',
      name: `Mix ${mix} Preview`,
      description: '',
      presets: [],
    }

    for (let input = 1; input < 9; input++) {
      program.presets.push(`mix_${mix}pgm${input}`)
      preview.presets.push(`mix_${mix}prv${input}`)
    }

    mixGroups.push(transition, program, preview)
  }

  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'mixStructure',
      name: 'Mix 1 to 16',
      description: 'Program, Preview, and Transition, presets for each Mix',
      definitions: [...mixGroups],
    },
  ]

  return structure
}
