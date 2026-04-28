import type { CompanionFeedbackSchema } from '@companion-module/base'
import { type CompanionFeedbackDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'
import { TRANSITIONS } from '../utils.js'

export type TransitionFeedbacksSchema = {
  transition: CompanionFeedbackSchema<{
    number: string
    effect: string
    duration: string
  }>
}

export const getTransitionFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<TransitionFeedbacksSchema> => {
  return {
    transition: {
      type: 'boolean',
      name: 'Transition - Transition Effect / Duration',
      description: 'Check if Transition is set to a specific effect, and optionally duration',
      options: [
        {
          type: 'textinput',
          label: 'Transition Number',
          description: '1 to 4',
          id: 'number',
          default: '1',
          useVariables: true,
        },
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'effect',
          default: 'Cut',
          choices: TRANSITIONS.map((transition) => ({ id: transition, label: transition })),
          expressionDescription: `Valid Values: ${TRANSITIONS.join(', ')}`,
        },
        {
          type: 'textinput',
          label: 'Transition Duration',
          description: 'Leave empty for any',
          id: 'duration',
          default: '',
          useVariables: true,
        },
      ],
      defaultStyle: { bgcolor: 0xff0000 },
      callback: async (feedback) => {
        const number = feedback.options.number
        const effect = feedback.options.effect
        const duration = feedback.options.duration
        const transition = instance.data.transitions.find((transition) => transition.number.toString() === number)

        if (!transition) return false
        if (transition.effect !== effect) return false
        if (duration !== '') return transition.duration.toString() === duration
        return true
      },
    },
  }
}
