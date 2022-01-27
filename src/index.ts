import instance_skel = require('../../../instance_skel')
import {
  CompanionActions,
  CompanionConfigField,
  CompanionFeedbacks,
  CompanionSystem,
  CompanionPreset,
  CompanionStaticUpgradeScript,
} from '../../../instance_skel_types'
import { Config } from './config'
import { getActions } from './actions'
import { Activators } from './activators'
import { getConfigFields } from './config'
import { VMixData } from './data'
import { getFeedbacks } from './feedback'
import { getPresets } from './presets'
import { Indicator } from './indicators'
import { TCP } from './tcp'
import { getUpgrades } from './upgrade'
import { Variables } from './variables'

interface RoutingData {
  audio: Record<string, unknown>
  layer: {
    destinationInput: null | string
    destinationLayer: null | string
  }
  mix: 0 | 1 | 2 | 3
}

interface ButtonShift {
  state: number
  blink: boolean
  blinkInterval: NodeJS.Timer | null
}

/**
 * Companion instance class for Studiocoast vMix
 */
class VMixInstance extends instance_skel<Config> {
  constructor(system: CompanionSystem, id: string, config: Config) {
    super(system, id, config)
    this.system = system
    this.config = config
    this.variables = new Variables(this)
    this.activators = new Activators(this)
    this.tcp = new TCP(this)
  }

  public readonly activators
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
  public readonly system
  public readonly tcp
  public readonly variables

  static GetUpgradeScripts(): CompanionStaticUpgradeScript[] {
    return getUpgrades()
  }

  /**
   * @description triggered on instance being enabled
   */
  public init(): void {
    this.status(1, 'Connecting')
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
    this.tcp.update()
    this.variables.updateDefinitions()
  }

  /**
   * @description close connections and stop timers/intervals
   */
  public readonly destroy = (): void => {
    this.tcp.destroy()
    this.activators.destroy()
    if (this.buttonShift.blinkInterval !== null) {
      clearInterval(this.buttonShift.blinkInterval)
    }

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
        return this.variables.get(value) || ''
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
}

export = VMixInstance
/*
"@typescript-eslint/eslint-plugin": "~2.31.0",
"@typescript-eslint/parser": "~2.31.0",

		"@types/jest": "^26.0.22",
		"@types/lodash": "^4.14.168",
		"@types/node": "^12.0.4",
		"@types/xml2js": "^0.4.7",
		"@typescript-eslint/eslint-plugin": "^5.10.1",
		"@typescript-eslint/parser": "^5.10.1",
		"eslint": "^6.8.0",
		"eslint-config-prettier": "^6.11.0",
		"eslint-plugin-prettier": "^3.1.3",
		"husky": "^3.0.5",
		"jest": "^26.6.3",
		"lint-staged": "^9.2.5",
		"prettier": "^1.17.1",
		"rimraf": "^3.0.2",
		"ts-jest": "^26.5.4",
		"typescript": "^4.2.3"

*/
