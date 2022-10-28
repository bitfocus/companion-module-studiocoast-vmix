import instance_skel = require('../../../instance_skel')
import {
  CompanionActions,
  CompanionConfigField,
  CompanionFeedbacks,
  CompanionSystem,
  CompanionPreset,
  CompanionStaticUpgradeScript,
  CompanionInstanceHTTPRequest,
  CompanionInstanceHTTPResponse,
} from '../../../instance_skel_types'
import { Config } from './config'
import { getActions } from './actions'
import { Activators } from './activators'
import { getConfigFields } from './config'
import { VMixData } from './data'
import { getFeedbacks } from './feedback'
import { httpHandler } from './http'
import { getPresets } from './presets'
import { Indicator } from './indicators'
import { TCP } from './tcp'
import { Timer } from './timers'
import { getUpgrades } from './upgrade'
import { Variables } from './variables'

interface ButtonShift {
  state: number
  blink: boolean
  blinkInterval: NodeJS.Timer | null
}

interface RoutingData {
  audio: Record<string, unknown>
  layer: {
    destinationInput: null | string
    destinationLayer: null | string
  }
  mix: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
}

/**
 * Companion instance class for Studiocoast vMix
 */
class VMixInstance extends instance_skel<Config> {
  constructor(system: CompanionSystem, id: string, config: Config) {
    super(system, id, config)
    this.system = system
    this.config = config
  }
  public activators: Activators | null = null
  public buttonShift: ButtonShift = {
    state: 0,
    blink: false,
    blinkInterval: null,
  }
  public connected = false
  public data = new VMixData(this)
  public indicator = new Indicator(this)
  public pollAPI: NodeJS.Timer | null = null
  public routingData: RoutingData = {
    audio: {},
    layer: {
      destinationInput: null,
      destinationLayer: null,
    },
    mix: 0,
  }
  public tcp: TCP | null = null
  public timers: Timer[] = []
  public timerInterval: NodeJS.Timer | null = null
  public variables: Variables | null = null

  static GetUpgradeScripts(): CompanionStaticUpgradeScript[] {
    return getUpgrades()
  }

  /**
   * @description triggered on instance being enabled
   */
  public init(): void {
    // New Module warning
    this.log(
      'info',
      `The vMix module has undergone a significant upgrade, please check all actions/feedbacks and if there are issues trying to delete the action/feedback and create it again`
    )

    this.log(
      'info',
      `The vMix module now supports a HTTP api, allowing for integrations with 3rd party applications and providing Data Sources such as input information and controllable timers.
    Find out more at https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/master/docs/HTTP_API.md`
    )

    this.variables = new Variables(this)
    this.activators = new Activators(this)
    this.tcp = new TCP(this)

    this.status(this.STATUS_WARNING, 'Connecting')
    this.updateInstance()
    this.setPresetDefinitions(getPresets(this) as CompanionPreset[])
    this.variables.updateDefinitions()

    // Button modifier blinking
    this.buttonShift.blinkInterval = setInterval(() => {
      this.buttonShift.blink = !this.buttonShift.blink
      if (this.config.shiftBlinkPrvPrgm) {
        this.checkFeedbacks('inputPreview', 'inputLive')
      }
      if (this.config.shiftBlinkLayerRouting) {
        this.checkFeedbacks(
          'selectedDestinationInput',
          'selectedDestinationLayer',
          'routableMultiviewLayer',
          'inputOnMultiview'
        )
      }
    }, 333)

    this.checkFeedbacks('mixSelect', 'buttonText')

    this.timerInterval = setInterval(() => {
      if (this.variables !== null && this.timers.length > 0) this.variables.updateTimerVariables()
    }, 100)
  }

  /**
   * @returns config options
   * @description generates the config options available for this instance
   */
  public readonly config_fields = (): CompanionConfigField[] => {
    return getConfigFields()
  }

  /**
   * @param config new configuration data
   * @description triggered every time the config for this instance is saved
   */
  public updateConfig(config: Config): void {
    this.config = config
    this.updateInstance()
    this.setPresetDefinitions(getPresets(this) as CompanionPreset[])
    if (this.tcp) this.tcp.update()
    if (this.variables) this.variables.updateDefinitions()
  }

  /**
   * @description close connections and stop timers/intervals
   */
  public readonly destroy = (): void => {
    if (this.tcp) this.tcp.destroy()
    if (this.activators) this.activators.destroy()
    if (this.buttonShift.blinkInterval !== null) {
      clearInterval(this.buttonShift.blinkInterval)
    }
    if (this.timerInterval) clearInterval(this.timerInterval)

    this.log('debug', `Instance destroyed: ${this.id}`)
  }

  /**
   * @param option string from text inputs
   * @returns array of strings indexed by the button modifier delimiter
   * @description first splits the string by the position of the delimiter, then parses any instance variables in each part
   */
  public readonly parseOption = (option: string): string[] => {
    const instanceVariable = RegExp(/\$\(([^:$)]+):([^)$]+)\)/)

    return option.split(this.config.shiftDelimiter).map((value) => {
      if (instanceVariable.test(value)) {
        return this.variables ? this.variables.get(value) || '' : ''
      } else {
        return value
      }
    })
  }

  /**
   * @description sets actions and feedbacks available for this instance
   */
  private updateInstance(): void {
    // Cast actions and feedbacks from VMix types to Companion types
    const actions = getActions(this) as CompanionActions
    const feedbacks = getFeedbacks(this) as CompanionFeedbacks

    this.setActions(actions)
    this.setFeedbackDefinitions(feedbacks)
  }

  /**
   * @param request HTTP request from Companion
   * @returns HTTP response
   */
  public handleHttpRequest(request: CompanionInstanceHTTPRequest): Promise<CompanionInstanceHTTPResponse> {
    return httpHandler(this, request)
  }
}

export = VMixInstance
