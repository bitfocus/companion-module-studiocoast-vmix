import VMixInstance from '..'
import { CompanionVariableDefinition } from '@companion-module/base'
import { audioDefinitions, audioValues } from './audioVariables'
import { dynamicDefinitions, dynamicValues } from './dynamicVariables'
import { generalDefinitions, generalValues } from './generalVariables'
import { inputDefinitions, inputValues } from './inputVariables'
import { layerDefinitions, layerValues } from './layerVariables'
import { mixDefinitions, mixValues } from './mixVariables'
import { outputDefinitions, outputValues } from './outputVariables'
import { overlayDefinitions, overlayValues } from './overlayVariables'
import { replayDefinitions, replayValues } from './replayVariables'
import { transitionDefinitions, transitionValues } from './transitionVariables'

export interface InstanceVariableValue {
  [key: string]: string | number | undefined
}

export class Variables {
  private readonly instance: VMixInstance
  public currentDefinitions: CompanionVariableDefinition[] = []
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
  public readonly set = (variables: InstanceVariableValue): void => {
    const newVariables: { [variableId: string]: string | number | undefined } = {}
    const changes: { [variableId: string]: string | number | undefined } = {}

    for (const name in variables) {
      if (this.currentVariables[name] !== variables[name]) changes[name] = variables[name]
      newVariables[name] = variables[name]
    }

    for (const name in this.currentVariables) {
      if (variables[name] === undefined) {
        changes[name] = undefined
      }
    }

    this.currentVariables = newVariables
    this.instance.setVariableValues(changes)
    this.instance.checkFeedbacks('buttonText')

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
        variables: 0
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

    const variableDefinitions: CompanionVariableDefinition[] = [
      ...audioDefinitions(this.instance),
      ...(await dynamicDefinitions(this.instance)),
      ...generalDefinitions(this.instance),
      ...inputDefinitions(this.instance),
      ...layerDefinitions(this.instance),
      ...(await mixDefinitions(this.instance)),
      ...outputDefinitions(this.instance),
      ...overlayDefinitions(this.instance),
      ...replayDefinitions(this.instance),
      ...transitionDefinitions(this.instance)
    ]

    this.currentDefinitions = variableDefinitions
    this.instance.setVariableDefinitions(variableDefinitions)
  }

  /**
   * @description Update variables for Timers
   */
  public readonly updateTimerVariables = (): void => {
    const newVariables: InstanceVariableValue = {}

    this.instance.timers.forEach((timer) => {
      const formats = ['hh:mm:ss', 'mm:ss', 'mm:ss.ms', 'mm:ss.sss']
      const dataArr = [
        timer.get({ defaultValue: '00:00:00', format: 'hh:mm:ss' }),
        timer.get({ defaultValue: '00:00', format: 'mm:ss' }),
        timer.get({ defaultValue: '00:00.0', format: 'mm:ss.ms' }),
        timer.get({ defaultValue: '00:00.000', format: 'mm:ss.sss' })
      ]

      dataArr.forEach((data, index) => {
        const prefix = `timer_${timer.id}_${formats[index]}_`

        for (const key in data) {
          newVariables[prefix + key] = data[key]
        }
      })
    })

    this.set(newVariables)
  }

  /**
   * @description Update variables
   */
  public readonly updateVariables = async (): Promise<void> => {
    let newVariables: InstanceVariableValue = {}

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
      transitionValues(this.instance)
    ])

    variablesPromise.forEach((variables: InstanceVariableValue) => {
      newVariables = { ...newVariables, ...variables }
    })

    this.set(newVariables)
    this.updateDefinitions()
  }
}
