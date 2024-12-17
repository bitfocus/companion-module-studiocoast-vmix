import { VMixAction, ActionCallback } from './actions'
import { MixOptionEntry, options, TRANSITIONS } from '../utils'
import VMixInstance from '../index'

type ProgramCutOptions = {
  input: string
  mix: MixOptionEntry
  mixVariable: string
}

type TransitionMixOptions = {
  mix: MixOptionEntry
  mixVariable: string
  functionID: (typeof TRANSITIONS)[number]
  duration: string
  input?: string
}

type TransitionOptions = {
  functionID: 'Transition1' | 'Transition2' | 'Transition3' | 'Transition4' | 'Stinger1' | 'Stinger2' | 'Stinger3' | 'Stinger4'
}

type SetTransitionEffectOptions = {
  functionID: 'SetTransitionEffect1' | 'SetTransitionEffect2' | 'SetTransitionEffect3' | 'SetTransitionEffect4'
  value: (typeof TRANSITIONS)[number]
}

type SetTransitionDurationOptions = {
  functionID: 'SetTransitionDuration1' | 'SetTransitionDuration2' | 'SetTransitionDuration3' | 'SetTransitionDuration4'
  value: number
}

type QuickPlayOptions = {
  input: string
}

type ProgramCutCallback = ActionCallback<'programCut', ProgramCutOptions>
type TransitionMixCallback = ActionCallback<'transitionMix', TransitionMixOptions>
type TransitionCallback = ActionCallback<'transition', TransitionOptions>
type SetTransitionEffectCallback = ActionCallback<'setTransitionEffect', SetTransitionEffectOptions>
type SetTransitionDurationCallback = ActionCallback<'setTransitionDuration', SetTransitionDurationOptions>
type QuickPlayCallback = ActionCallback<'quickPlay', QuickPlayOptions>

export interface TransitionActions {
  programCut: VMixAction<ProgramCutCallback>
  transitionMix: VMixAction<TransitionMixCallback>
  transition: VMixAction<TransitionCallback>
  setTransitionEffect: VMixAction<SetTransitionEffectCallback>
  setTransitionDuration: VMixAction<SetTransitionDurationCallback>
  quickPlay: VMixAction<QuickPlayCallback>

  [key: string]: VMixAction<any>
}

export type TransitionCallbacks = ProgramCutCallback | TransitionMixCallback | TransitionCallback | SetTransitionEffectCallback | SetTransitionDurationCallback | QuickPlayCallback

export const vMixTransitionActions = (instance: VMixInstance, sendBasicCommand: (action: Readonly<TransitionCallbacks>) => Promise<void>): TransitionActions => {
  return {
    programCut: {
      name: 'Transition - Send Input to Program',
      description: 'Cuts the input directly to Output without changing Preview',
      options: [options.input, options.mixSelect, options.mixVariable],
      callback: async (action) => {
        let mixVariable: string | number = (await instance.parseOption(action.options.mixVariable))[instance.buttonShift.state]
        mixVariable = parseInt(mixVariable, 10) - 1

        let mix: number = action.options.mix
        if (mix === -1) mix = instance.routingData.mix
        if (mix === -2) mix = mixVariable

        const programCut: any = {
          id: 'programCut',
          options: {
            functionID: 'CutDirect',
            input: action.options.input,
            mix
          }
        }

        if (programCut.options.mix !== 0) programCut.options.functionID = 'ActiveInput'
        sendBasicCommand(programCut)
      }
    },

    transitionMix: {
      name: 'Transition - Transition Mix',
      description: 'Transition Preview to Program using the selected Transition',
      options: [
        options.mixSelect,
        options.mixVariable,
        {
          type: 'dropdown',
          label: 'Select transition',
          id: 'functionID',
          default: 'Cut',
          choices: TRANSITIONS.map((transition) => ({ id: transition, label: transition }))
        },
        {
          type: 'textinput',
          label: 'Duration',
          id: 'duration',
          default: '1000',
          useVariables: true
        },
        {
          type: 'textinput',
          label: 'Input - Leave blank to transition Preview',
          id: 'input',
          default: '',
          tooltip: 'Number, Name, or GUID',
          useVariables: true
        }
      ],
      callback: async (action) => {
        const command: any = {
          actionId: 'transitionMix',
          options: {
            mix: action.options.mix,
            mixVariable: action.options.mixVariable,
            functionID: action.options.functionID
          }
        }

        let duration: string | number = (await instance.parseOption(action.options.duration))[instance.buttonShift.state]
        duration = parseFloat(duration)

        if (isNaN(duration)) {
          instance.log('warn', `Transition mix Duration must be a number`)
          return
        }

        if (duration < 0) duration = 0
        if (duration > 9999) {
          instance.log('warn', `Max transition duration limited by vMix to 9999ms`)
          duration = 9999
        }

        command.options.duration = duration

        if (action.options.input !== '' && action.options.input !== undefined) command.options.input = action.options.input
        sendBasicCommand(command)
      }
    },

    transition: {
      name: 'Transition - Auto Transition',
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
            { id: 'Stinger4', label: 'Stinger 4' }
          ]
        }
      ],
      callback: sendBasicCommand
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
            { id: 'SetTransitionEffect4', label: 'Transition 4' }
          ]
        },
        {
          type: 'dropdown',
          label: 'Select transition type',
          id: 'value',
          default: 'Cut',
          choices: TRANSITIONS.map((transition) => ({ id: transition, label: transition }))
        }
      ],
      callback: sendBasicCommand
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
            { id: 'SetTransitionDuration4', label: 'Transition 4' }
          ]
        },
        {
          type: 'number',
          label: 'Duration',
          id: 'value',
          min: 0,
          max: 9999,
          default: 1000
        }
      ],
      callback: sendBasicCommand
    },

    quickPlay: {
      name: 'Transition - Quick Play input to Program',
      description: 'Sends selected input to Preview, cut to Program, and then plays input',
      options: [options.input],
      callback: sendBasicCommand
    }
  }
}
