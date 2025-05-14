import {
  InstanceBase,
  runEntrypoint,
  type CompanionActionDefinitions,
  type CompanionFeedbackContext,
  type CompanionFeedbackDefinitions,
  type CompanionHTTPRequest,
  type CompanionHTTPResponse,
  type SomeCompanionConfigField
} from '@companion-module/base'
import { type Config, getConfigFields, defaultConfig } from './config'
import { getActions } from './actions/actions'
import { Activators } from './activators'
import { VMixData } from './data'
import { getFeedbacks } from './feedbacks/feedback'
import { httpHandler } from './http'
import { getPresets } from './presets/presets'
import { TCP } from './tcp'
import { getUpgrades } from './upgrade'
import { Variables } from './variables/variables'

interface APIProcessing {
  hold: boolean
  holdCount: number
  request: number
  response: number
  parsed: number
  feedbacks: number
  variables: number
}

interface ButtonShift {
  state: number
  blink: boolean
  blinkInterval: ReturnType<typeof setInterval> | null
}

interface RoutingData {
  audio: Record<string, unknown>
  bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  layer: {
    destinationInput: null | string
    destinationLayer: null | string
  }
  mix: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
}

/**
 * Companion instance class for Studiocoast vMix
 */
class VMixInstance extends InstanceBase<Config> {
  constructor(internal: unknown) {
    super(internal)
    this.instanceOptions.disableVariableValidation = true
  }
  public activators: Activators | null = null
  public apiProcessing: APIProcessing = {
    hold: false,
    holdCount: 0,
    request: 0,
    response: 0,
    parsed: 0,
    feedbacks: 0,
    variables: 0
  }
  public buttonShift: ButtonShift = {
    state: 0,
    blink: false,
    blinkInterval: null
  }
  public config: Config = defaultConfig()
  public connected = false
  public data = new VMixData(this)
  public pollAPI: ReturnType<typeof setInterval> | null = null
  public routingData: RoutingData = {
    audio: {},
    bus: 'Master',
    layer: {
      destinationInput: null,
      destinationLayer: null
    },
    mix: 0
  }
  public startTime: Date = new Date()
  public tcp: TCP | null = null
  public variables: Variables | null = null

  /**
   * @description triggered on instance being enabled
   */
  public async init(config: Config): Promise<void> {
    this.log('debug', `Process ID: ${process.pid}`)

    if (config.debugVersionUpdateNotifications) {
			this.log('info', 'v4.0.0 of this mode has now been released! Patch notes can be found at https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/docs/patch_notes.md')
      this.log(
        'warn',
        'The vMix Companion module v4 has undergone significant changes to its configuration to allow more granular control over what variables are generated as this has a significant performance impact during large productions'
      )
      this.log('warn', 'Please check the vMix module configuration within Companion and ensure only the variables you wish to use are enabled')
    }

    await this.configUpdated(config)

    this.variables = new Variables(this)
    this.activators = new Activators(this)
    this.tcp = new TCP(this)

    this.updateInstance()
    this.setPresetDefinitions(getPresets(this))
    this.variables.updateDefinitions()

    // Button modifier blinking
    this.buttonShift.blinkInterval = setInterval(() => {
      this.buttonShift.blink = !this.buttonShift.blink
      if (this.config.shiftBlinkPrvPrgm) {
        this.checkFeedbacks('inputPreview', 'inputLive')
      }
      if (this.config.shiftBlinkLayerRouting) {
        this.checkFeedbacks('selectedDestinationInput', 'selectedDestinationLayer', 'routableMultiviewLayer', 'inputOnMultiview')
      }
    }, 333)

    this.checkFeedbacks('mixSelect', 'buttonText')
  }

  /**
   * @param config new configuration data
   * @description triggered every time the config for this instance is saved
   */
  public async configUpdated(config: Config): Promise<void> {
    this.config = config
    this.updateInstance()
    this.setPresetDefinitions(getPresets(this))
    if (this.tcp) this.tcp.update()
    if (this.variables) this.variables.updateDefinitions()
    return
  }

  /**
   * @returns config options
   * @description generates the config options available for this instance
   */
  public getConfigFields(): SomeCompanionConfigField[] {
    return getConfigFields()
  }

  /**
   * @description close connections and stop timers/intervals
   */
  public async destroy(): Promise<void> {
    if (this.tcp) this.tcp.destroy()
    if (this.activators) this.activators.destroy()
    if (this.buttonShift.blinkInterval !== null) {
      clearInterval(this.buttonShift.blinkInterval)
    }

    if (this.variables?.definitionsUpdateDebounce) {
      clearTimeout(this.variables.definitionsUpdateDebounce)
    }

    this.log('debug', `Instance destroyed: ${this.id}`)
  }

  /**
   * @param option string from text inputs
   * @param context Optional context provided by feedback
   * @returns array of strings indexed by the button modifier delimiter
   * @description first splits the string by the position of the delimiter, then parses any instance variables in each part
   */
  public readonly parseOption = async (option: string, context?: CompanionFeedbackContext): Promise<string[]> => {
    const split = option.split(this.config.shiftDelimiter)
    const values = []

    for (const value of split) {
      let parsedValue

      if (context) {
        parsedValue = await context.parseVariablesInString(value)
      } else {
        parsedValue = await this.parseVariablesInString(value)
      }
      values.push(parsedValue)
    }

    return values
  }

  /**
   * @description sets actions and feedbacks available for this instance
   */
  private updateInstance(): void {
    // Cast actions and feedbacks from VMix types to Companion types
    const actions = getActions(this) as CompanionActionDefinitions
    const feedbacks = getFeedbacks(this) as unknown as CompanionFeedbackDefinitions

    this.setActionDefinitions(actions)
    this.setFeedbackDefinitions(feedbacks)
  }

  /**
   * @param request HTTP request from Companion
   * @returns HTTP response
   */
  public async handleHttpRequest(request: CompanionHTTPRequest): Promise<CompanionHTTPResponse> {
    return httpHandler(this, request)
  }
}

export = VMixInstance

runEntrypoint(VMixInstance, getUpgrades())
