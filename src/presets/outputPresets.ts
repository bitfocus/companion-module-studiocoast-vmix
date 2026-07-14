import type { CompanionPresetDefinitions, CompanionPresetGroup, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

const outputFunctions = [
  { label: 'Output 2', functionID: 'SetOutput2' },
  { label: 'Output 3', functionID: 'SetOutput3' },
  { label: 'Output 4', functionID: 'SetOutput4' },
  { label: 'External 2', functionID: 'SetOutputExternal2' },
  { label: 'Fullscreen', functionID: 'SetOutputFullscreen' },
  { label: 'Fullscreen 2', functionID: 'SetOutputFullscreen2' },
]

export const getOutputDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const outputDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {}

  outputFunctions.forEach((output) => {
    outputDefinitions[`output_${output.label.replace(' ', '')}Pgm`] = {
      name: `${output.label}\\nPGM`,
      type: 'simple',
      style: {
        text: `${output.label}\\nPGM`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'outputSet',
              options: { functionID: output.functionID as any, value: 'Output', input: '', mix: 1 },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    outputDefinitions[`output_${output.label.replace(' ', '')}Prv`] = {
      name: `${output.label}\nPRV`,
      type: 'simple',
      style: {
        text: `${output.label}\nPRV`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'outputSet',
              options: { functionID: output.functionID as any, value: 'Preview', input: '', mix: 1 },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    outputDefinitions[`output_${output.label.replace(' ', '')}Multiview`] = {
      name: `${output.label}\nMultiview`,
      type: 'simple',
      style: {
        text: `${output.label}\nMultiview`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'outputSet',
              options: { functionID: output.functionID as any, value: 'MultiView', input: '', mix: 1 },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    outputDefinitions[`output_${output.label.replace(' ', '')}Replay`] = {
      name: `${output.label}\nReplay`,
      type: 'simple',
      style: {
        text: `${output.label}\nReplay`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'outputSet',
              options: { functionID: output.functionID as any, value: 'Replay', input: '', mix: 1 },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    }

    outputDefinitions[`output_${output.label.replace(' ', '')}Input`] = {
      name: `${output.label}\nInput`,
      type: 'simple',
      style: {
        text: `${output.label}\nInput`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'outputSet', options: { functionID: output.functionID as any, value: 'Input', input: '', mix: 1 } }],
          up: [],
        },
      ],
      feedbacks: [],
    }
  })

  return outputDefinitions
}

export const getOutputStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const outputGroups: CompanionPresetGroup<VMixInstanceTypes>[] = []

  outputFunctions.forEach((output) => {
    outputGroups.push({
      id: `output_${output.label}`,
      type: 'simple',
      name: output.label,
      description: `Set the source for ${output.label}`,
      presets: [
        `output_${output.label.replace(' ', '')}Pgm`,
        `output_${output.label.replace(' ', '')}Prv`,
        `output_${output.label.replace(' ', '')}Multiview`,
        `output_${output.label.replace(' ', '')}Replay`,
        `output_${output.label.replace(' ', '')}Input`,
      ],
    })
  })

  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'outputStructure',
      name: 'Outputs 2-4 / External / Fullscreen',
      description: 'Starting and Stopping scripts in vMix',
      definitions: [...outputGroups],
    },
  ]

  return structure
}
