import type VMixInstance from '../index.js'
import type { CompanionVariableDefinitions } from '@companion-module/base'
import { type AudioVariablesSchema, audioDefinitions, audioValues } from './audioVariables.js'
import { type DynamicVariablesSchema, dynamicDefinitions, dynamicValues } from './dynamicVariables.js'
import { type GeneralVariablesSchema, generalDefinitions, generalValues } from './generalVariables.js'
import { type InputVariablesSchema, inputDefinitions, inputValues } from './inputVariables.js'
import { type LayerVariablesSchema, layerDefinitions, layerValues } from './layerVariables.js'
import { type MixVariablesSchema, mixDefinitions, mixValues } from './mixVariables.js'
import { type OutputVariablesSchema, outputDefinitions, outputValues } from './outputVariables.js'
import { type OverlayVariablesSchema, overlayDefinitions, overlayValues } from './overlayVariables.js'
import { type ReplayVariablesSchema, replayDefinitions, replayValues } from './replayVariables.js'
import { type TransitionVariablesSchema, transitionDefinitions, transitionValues } from './transitionVariables.js'

export interface InstanceVariableValue {
  [key: string]: string | number | undefined
}

export type VariablesSchema = AudioVariablesSchema &
  DynamicVariablesSchema &
  GeneralVariablesSchema &
  InputVariablesSchema &
  LayerVariablesSchema &
  MixVariablesSchema &
  OutputVariablesSchema &
  OverlayVariablesSchema &
  ReplayVariablesSchema &
  TransitionVariablesSchema

export class Variables {
  private readonly instance: VMixInstance
  public currentDefinitions: CompanionVariableDefinitions = {}
  public currentVariables: InstanceVariableValue = {}
  public definitionsUpdateDebounce: ReturnType<typeof setTimeout> | null = null
  public definitionsUpdateNeeded = false

  constructor(instance: VMixInstance) {
    this.instance = instance
  }

  /**
   * @param variables Object of variable names and their values
   * @description Updates or removes variable for current instance
   */
  public readonly set = (variables: Partial<VariablesSchema>): void => {
    const newVariables: Partial<VariablesSchema> = {}
    //const changes: Partial<VariablesSchema> = {}

    /*    for (const name in variables) {
      if (this.currentVariables[name] !== variables[name]) changes[name] = variables[name]
      newVariables[name] = variables[name]
    }

    for (const name in this.currentVariables) {
      if (variables[name] === undefined) {
        changes[name] = undefined
      }
    }*/

    this.currentVariables = newVariables
    this.instance.setVariableValues(variables)

    if (this.instance.apiProcessing.hold) {
      this.instance.apiProcessing.variables = new Date().getTime()
      const duration = this.instance.apiProcessing.variables - this.instance.apiProcessing.request
      const freshStart = new Date().getTime() - this.instance.startTime.getTime() < 5000

      if (duration > this.instance.config.apiPollInterval && !freshStart) {
        if (duration > this.instance.config.apiPollInterval * 3) {
          this.instance.log('warn', `API Processing took ${duration}ms, but the API Polling Interval is set to ${this.instance.config.apiPollInterval}ms`)
        } else {
          this.instance.log('debug', `API Processing took ${duration}ms, but the API Polling Interval is set to ${this.instance.config.apiPollInterval}ms`)
        }
      }

      this.instance.apiProcessing = {
        hold: false,
        holdCount: 0,
        request: 0,
        response: 0,
        parsed: 0,
        feedbacks: 0,
        variables: 0,
      }
    }
  }

  /**
   * @description Sets variable definitions
   */
  public readonly updateDefinitions = async (): Promise<void> => {
    if (this.definitionsUpdateDebounce !== null) {
      this.definitionsUpdateNeeded = true
      return
    }

    this.definitionsUpdateDebounce = setTimeout(() => {
      this.definitionsUpdateDebounce = null
      if (this.definitionsUpdateNeeded) {
        this.definitionsUpdateNeeded = false
        this.updateDefinitions()
      }
    }, this.instance.config.debugVariableDefinitionDelay)

    const variableDefinitions: CompanionVariableDefinitions<VariablesSchema> = {
      ...audioDefinitions(this.instance),
      ...(await dynamicDefinitions(this.instance)),
      ...generalDefinitions(this.instance),
      ...inputDefinitions(this.instance),
      ...layerDefinitions(this.instance),
      ...(await mixDefinitions(this.instance)),
      ...outputDefinitions(this.instance),
      ...overlayDefinitions(this.instance),
      ...replayDefinitions(this.instance),
      ...transitionDefinitions(this.instance),
    }

    this.currentDefinitions = variableDefinitions
    this.instance.setVariableDefinitions(variableDefinitions)
  }

  /**
   * @description Update variables
   */
  public readonly updateVariables = async (): Promise<void> => {
    let newVariables: Partial<VariablesSchema> = {}

    const variablesPromise = await Promise.all([
      audioValues(this.instance),
      dynamicValues(this.instance),
      generalValues(this.instance),
      inputValues(this.instance),
      layerValues(this.instance),
      mixValues(this.instance),
      outputValues(this.instance),
      overlayValues(this.instance),
      replayValues(this.instance),
      transitionValues(this.instance),
    ])

    variablesPromise.forEach((variables: Partial<VariablesSchema>) => {
      newVariables = { ...newVariables, ...variables }
    })

    this.set(newVariables)
    this.updateDefinitions()
  }
}
