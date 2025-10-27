import { combineRgb } from '@companion-module/base'
import type { VMixFeedback, FeedbackCallback } from './feedback'
import type VMixInstance from '../index'
import { TRANSITIONS } from '../utils'

type TransitionOptions = {
  number: string
  effect: string
  duration: string
}

type TransitionCallback = FeedbackCallback<'transition', TransitionOptions>

export interface TransitionFeedbacks {
  transition: VMixFeedback<TransitionCallback>
}

export type TransitionCallbacks = TransitionCallback

export const vMixTransitionFeedbacks = (instance: VMixInstance): TransitionFeedbacks => {
  return {
    transition: {
      type: 'boolean',
      name: 'Transition - Transition Effect / Duration',
      description: 'Check if Transition is set to a specific effect, and optionally duration',
      options: [
        {
          type: 'textinput',
          label: 'Transition Number (1 to 4)',
          id: 'number',
          default: '1',
          useVariables: { local: true },
        },
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'effect',
          default: 'Cut',
          choices: TRANSITIONS.map((transition) => ({ id: transition, label: transition })),
        },
        {
          type: 'textinput',
          label: 'Transition Duration',
          tooltip: 'Leave empty for any',
          id: 'duration',
          default: '',
          useVariables: { local: true },
        },
      ],
      defaultStyle: {
        bgcolor: combineRgb(255, 0, 0),
      },
      callback: async (feedback, context) => {
        const number = (await instance.parseOption(feedback.options.number, context))[instance.buttonShift.state]
        const effect = (await instance.parseOption(feedback.options.effect, context))[instance.buttonShift.state]
        const duration = (await instance.parseOption(feedback.options.duration, context))[instance.buttonShift.state]
        const transition = instance.data.transitions.find((transition) => transition.number.toString() === number)

        if (!transition) return false
        if (transition.effect !== effect) return false
        if (duration !== '') return transition.duration.toString() === duration
        return true
      },
    },
  }
}
