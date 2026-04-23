import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

export const getGeneralDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const generalDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    general_sendKeyPress: {
      name: 'Send Key Press',
      type: 'simple',
      style: {
        text: 'Send Key Press',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'keyPress', options: { value: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    general_scriptStart: {
      name: 'Script Start',
      type: 'simple',
      style: {
        text: 'Script Start',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'scriptStart', options: { value: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    general_scriptStop: {
      name: 'Script Stop',
      type: 'simple',
      style: {
        text: 'Script Stop',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'scriptStop', options: { value: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    general_scriptStopAll: {
      name: 'Script Stop All',
      type: 'simple',
      style: {
        text: 'Script Stop All',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'scriptStopAll', options: {} }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    general_customCommand: {
      name: 'Custom Command',
      type: 'simple',
      style: {
        text: 'Custom Command',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'command', options: { command: '', encode: false } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
  }

  return generalDefinitions
}

export const getGeneralStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'generalStructure',
      name: 'Scripting, Custom Commands, and Key Press',
      description: 'Starting and Stopping scripts in vMix',
      definitions: [
        {
          id: 'generalScripting',
          type: 'simple',
          name: 'Scripting',
          description: 'Set the audio source returned to a vMix Call Input',
          presets: ['general_scriptStart', 'general_scriptStop', 'general_scriptStopAll'],
        },
        {
          id: 'generalCustomCommand',
          type: 'simple',
          name: 'Custom Command',
          description: 'Sends a vMix Function over the TCP connection. See the help page or https://util.dist.dev/vmixapi for syntax.',
          presets: ['general_customCommand'],
        },
        {
          id: 'generalKeyPress',
          type: 'simple',
          name: 'Key Press',
          description: 'Used for any shortcuts that are triggered on key press',
          presets: ['general_sendKeyPress'],
        },
      ],
    },
  ]

  return structure
}
