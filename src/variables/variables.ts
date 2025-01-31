import VMixInstance from '..'
import { CompanionVariableDefinition, CompanionVariableValue } from '@companion-module/base'
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

export class Variables {
  private readonly instance: VMixInstance
  public currentDefinitions: Set<CompanionVariableDefinition> = new Set()
  public currentVariables: Map<string, CompanionVariableValue | undefined> = new Map()

  constructor(instance: VMixInstance) {
    this.instance = instance
  }

  /**
   * @param variables Object of variable names and their values
   * @description Updates or removes variable for current instance
   */
  public readonly set = (variables: Map<string, CompanionVariableValue>, subset: boolean = false): void => {
    const changes = new Map()

    variables.forEach((value: any, key: string) => {
      if (this.currentVariables.get(key) !== value) changes.set(key, value)
    })

    if (!subset) {
      this.currentVariables.forEach((_value: any, key: string) => {
        if (!variables.has(key)) changes.set(key, undefined)
      })
    }

    this.currentVariables = variables
    this.instance.setVariableValues(Object.fromEntries(changes))
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
    const variables: Set<CompanionVariableDefinition> = new Set([
      ...audioDefinitions(this.instance),
      ...(await dynamicDefinitions(this.instance)),
      ...generalDefinitions(this.instance),
      ...inputDefinitions(this.instance),
      ...layerDefinitions(this.instance),
      ...mixDefinitions(this.instance),
      ...outputDefinitions(this.instance),
      ...overlayDefinitions(this.instance),
      ...replayDefinitions(this.instance),
      ...transitionDefinitions(this.instance)
    ])

    this.currentDefinitions = variables
    this.instance.setVariableDefinitions([...variables])
  }

  /**
   * @description Update variables for Timers
   */
  public readonly updateTimerVariables = (): void => {
    const newVariables: Map<string, CompanionVariableValue> = new Map()

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
          newVariables.set(prefix + key, data[key])
        }
      })
    })

    this.set(newVariables)
  }

  /**
   * @description Update variables
   */
  public readonly updateVariables = async (): Promise<void> => {
    const [
      audioVariables,
      dynamicVariables,
      generalVariables,
      inputVariables,
      layerVariables,
      mixVariables,
      outputVariables,
      overlayVariables,
      replayVariables,
      transitionVariables
    ] = await Promise.all([
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

    const newVariables: Map<string, CompanionVariableValue> = new Map([
      ...audioVariables,
      ...dynamicVariables,
      ...generalVariables,
      ...inputVariables,
      ...layerVariables,
      ...mixVariables,
      ...outputVariables,
      ...overlayVariables,
      ...replayVariables,
      ...transitionVariables
    ])

    this.set(newVariables)
    this.updateDefinitions()
  }
}
