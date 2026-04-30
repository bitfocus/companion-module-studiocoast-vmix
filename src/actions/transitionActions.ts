import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import { type MixOptionEntry, options, TRANSITIONS, parseMix } from '../utils.js'
import type VMixInstance from '../index.js'

export type TransitionActionsSchema = {
  programCut: CompanionActionSchema<{
    input: string
    mix: MixOptionEntry
  }>
  transitionMix: CompanionActionSchema<{
    mix: MixOptionEntry
    functionID: (typeof TRANSITIONS)[number]
    duration: string
    input?: string
  }>
  transition: CompanionActionSchema<{
    functionID: `Transition${number}` | `Stinger${number}`
    mix: MixOptionEntry
  }>
  setTransitionEffect: CompanionActionSchema<{
    functionID: 'SetTransitionEffect1' | 'SetTransitionEffect2' | 'SetTransitionEffect3' | 'SetTransitionEffect4'
    value: (typeof TRANSITIONS)[number]
  }>
  setTransitionDuration: CompanionActionSchema<{
    functionID: 'SetTransitionDuration1' | 'SetTransitionDuration2' | 'SetTransitionDuration3' | 'SetTransitionDuration4'
    value: number
  }>
  quickPlay: CompanionActionSchema<{
    input: string
  }>
}

export const getTransitionActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<TransitionActionsSchema> => {
  return {
    programCut: {
      name: 'Transition - Send Input to Program',
      description: 'Cuts the input directly to Output without changing Preview',
      options: [options.input, options.mixSelect],
      callback: async (action) => {
        const mix = parseMix(action.options.mix)
        if (mix === null) return instance.log('warn', `Transition - Send Input to Program - Invalid Mix option: ${action.options.mix}`)

        const programCut: any = {
          id: 'programCut',
          options: {
            functionID: mix !== 1 ? 'ActiveInput' : 'CutDirect',
            input: action.options.input,
            mix: mix - 1,
          },
        }

        return sendBasicCommand(programCut)
      },
    },

    transitionMix: {
      name: 'Transition - Transition Mix',
      description: 'Transition Preview to Program using the selected Transition',
      options: [
        options.mixSelect,
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'functionID',
          default: 'Cut',
          choices: TRANSITIONS.map((transition) => ({ id: transition, label: transition })),
          expressionDescription: `Valid Values: ${TRANSITIONS.join(', ')}`,
        },
        {
          type: 'textinput',
          label: 'Duration in ms',
          description: '0 to 9999',
          id: 'duration',
          default: '1000',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Input - Leave blank to transition Preview',
          id: 'input',
          default: '',
          description: 'Number, Name, or GUID',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const mix = parseMix(action.options.mix)
        if (mix === null) return instance.log('warn', `Transition - Transition Mix - Invalid Mix option: ${action.options.mix}`)

        let duration: number = parseFloat(action.options.duration)

        if (isNaN(duration)) {
          instance.log('warn', `Transition - Transition Mix - Duration must be a number`)
          return
        }

        if (duration < 0) duration = 0
        if (duration > 9999) {
          instance.log('warn', `Transition - Transition Mix - Duration limited by vMix to 9999ms`)
          duration = 9999
        }

        const command: any = {
          actionId: 'transitionMix',
          options: {
            mix: mix,
            functionID: action.options.functionID,
            duration,
          },
        }

        if (action.options.input !== '' && action.options.input !== undefined) command.options.input = action.options.input
        return sendBasicCommand(command)
      },
    },

    transition: {
      name: 'Transition - Auto/Stinger Transition',
      description: 'Transition Preview to Program using a pre-defined Transition',
      options: [
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'functionID',
          default: 'Transition1',
          choices: [
            { id: 'Transition1', label: 'Transition 1' },
            { id: 'Transition2', label: 'Transition 2' },
            { id: 'Transition3', label: 'Transition 3' },
            { id: 'Transition4', label: 'Transition 4' },
            { id: 'Stinger1', label: 'Stinger 1' },
            { id: 'Stinger2', label: 'Stinger 2' },
            { id: 'Stinger3', label: 'Stinger 3' },
            { id: 'Stinger4', label: 'Stinger 4' },
            { id: 'Stinger5', label: 'Stinger 5' },
            { id: 'Stinger6', label: 'Stinger 6' },
            { id: 'Stinger7', label: 'Stinger 7' },
            { id: 'Stinger8', label: 'Stinger 8' },
          ],
          expressionDescription: `Valid Values: 'Transition1', 'Transition2', 'Transition3', 'Transition4', 'Stinger1', 'Stinger2', 'Stinger3', 'Stinger4', 'Stinger5', 'Stinger6', 'Stinger7', 'Stinger8'`,
        },
        {
          type: 'dropdown',
          label: 'Mix',
          id: 'mix',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((id) => ({ id, label: `${id}` })),
          isVisibleExpression: `includes($(options:feedbackID), 'Stinger')`,
          expressionDescription: `Valid Values: 1 to 16`,
        },
      ],
      callback: async (action) => {
        const mix = parseMix(action.options.mix)
        if (mix === null) return instance.log('warn', `Transition - Auto/Stinger Transition - Invalid Mix option: ${action.options.mix}`)

        const command: any = {
          actionId: 'transition',
          options: {
            functionID: action.options.functionID,
          },
        }

        if (action.options.functionID.startsWith('Stinger')) {
          command.options.mix = mix
        }

        return sendBasicCommand(command)
      },
    },

    setTransitionEffect: {
      name: 'Transition - Set Auto Transition Effect',
      description: 'Set an Auto transition',
      options: [
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'functionID',
          default: 'SetTransitionEffect1',
          choices: [
            { id: 'SetTransitionEffect1', label: 'Transition 1' },
            { id: 'SetTransitionEffect2', label: 'Transition 2' },
            { id: 'SetTransitionEffect3', label: 'Transition 3' },
            { id: 'SetTransitionEffect4', label: 'Transition 4' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'dropdown',
          label: 'Select transition type',
          id: 'value',
          default: 'Cut',
          choices: TRANSITIONS.map((transition) => ({ id: transition, label: transition })),
          expressionDescription: `Valid Values: ${TRANSITIONS.join(', ')}`,
        },
      ],
      callback: sendBasicCommand,
    },

    setTransitionDuration: {
      name: 'Transition - Set Auto Transition Duration',
      description: 'Set an Auto transition duration',
      options: [
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'functionID',
          default: 'SetTransitionDuration1',
          choices: [
            { id: 'SetTransitionDuration1', label: 'Transition 1' },
            { id: 'SetTransitionDuration2', label: 'Transition 2' },
            { id: 'SetTransitionDuration3', label: 'Transition 3' },
            { id: 'SetTransitionDuration4', label: 'Transition 4' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'number',
          label: 'Duration in ms',
          description: '0 to 9999',
          id: 'value',
          min: 0,
          max: 9999,
          default: 1000,
        },
      ],
      callback: sendBasicCommand,
    },

    quickPlay: {
      name: 'Transition - Quick Play input to Program',
      description: 'Sends selected input to Preview, cut to Program, and then plays input',
      options: [options.input],
      callback: sendBasicCommand,
    },
  }
}

export const vMixTransitionFunctions = {
  programCut: ['ActiveInput', 'CutDirect'],
  transitionMix: [
    'Cut',
    'Fade',
    'Zoom',
    'Wipe',
    'Slide',
    'Fly',
    'CrossZoom',
    'FlyRotate',
    'Cube',
    'CubeZoom',
    'VerticalWipe',
    'VerticalSlide',
    'Merge',
    'WipeReverse',
    'SlideReverse',
    'VerticalWipeReverse',
    'VerticalSlideReverse',
    'BarnDoor',
    'RollerDoor',
    'AlphaFade',
  ],
  transition: ['Transition1', 'Transition2', 'Transition3', 'Transition4', 'Stinger1', 'Stinger2', 'Stinger3', 'Stinger4', 'Stinger5', 'Stinger6', 'Stinger7', 'Stinger8'],
  setTransitionEffect: ['SetTransitionEffect1', 'SetTransitionEffect2', 'SetTransitionEffect3', 'SetTransitionEffect4'],
  setTransitionDuration: ['SetTransitionDuration1', 'SetTransitionDuration2', 'SetTransitionDuration3', 'SetTransitionDuration4'],
  quickPlay: ['QuickPlay'],
}
