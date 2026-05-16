import { InstanceBase, type CompanionHTTPRequest, type CompanionHTTPResponse, type SomeCompanionConfigField } from '@companion-module/base'
import { type Config, getConfigFields, defaultConfig } from './config.js'
import { getActions } from './actions/actions.js'
import { Activators } from './activators.js'
import { VMixData } from './data.js'
import { getFeedbacks } from './feedbacks/feedback.js'
import { httpHandler } from './http.js'
import { getPresetDefinitions, getPresetStructure } from './presets/presets.js'
import { TCP } from './tcp.js'
import { getUpgrades } from './upgrades/upgrade.js'
import { Variables } from './variables/variables.js'
import { AudioPresets } from './audioPresets.js'
import type { VMixInstanceTypes } from './utils.js'

interface APIProcessing {
  hold: boolean
  holdCount: number
  request: number
  response: number
  parsed: number
  feedbacks: number
  variables: number
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
export default class VMixInstance extends InstanceBase<VMixInstanceTypes> {
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
    variables: 0,
  }
  public audioPresets = new AudioPresets(this)
  public config: Config = defaultConfig()
  public connected = false
  public data = new VMixData(this)
  public pollAPI: ReturnType<typeof setInterval> | null = null
  public routingData: RoutingData = {
    audio: {},
    bus: 'Master',
    layer: {
      destinationInput: null,
      destinationLayer: null,
    },
    mix: 1,
  }
  public startTime: Date = new Date()
  public tcp: TCP = new TCP(this)
  public variables: Variables | null = null

  /**
   * @description triggered on instance being enabled
   */
  public async init(config: Config): Promise<void> {
    if (config.debugVersionUpdateNotifications) {
      this.log(
        'info',
        'v5.0.0 of this mode has now been released! Patch notes can be found at https://github.com/bitfocus/companion-module-studiocoast-vmix/blob/main/docs/patch_notes.md',
      )
    }

    this.config = config
    this.tcp.init()
    this.variables = new Variables(this)
    this.activators = new Activators(this)
    this.audioPresets.presets = this.config.audioPresets
    this.updateInstance()
    this.setPresetDefinitions(getPresetStructure, getPresetDefinitions(this))
    this.variables.updateDefinitions()

    this.checkFeedbacks('mixSelect')
  }

  /**
   * @param config new configuration data
   * @description triggered every time the config for this instance is saved
   */
  public async configUpdated(config: Config): Promise<void> {
    this.config = config
    this.updateInstance()
    this.setPresetDefinitions(getPresetStructure, getPresetDefinitions(this))
    this.audioPresets.presets = this.config.audioPresets
    this.tcp.update()
    if (this.variables) this.variables.updateVariables()
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

    if (this.variables?.definitionsUpdateDebounce) {
      clearTimeout(this.variables.definitionsUpdateDebounce)
    }

    this.log('debug', `Instance destroyed: ${this.id}`)
  }

  /**
   * @description sets actions and feedbacks available for this instance
   */
  private updateInstance(): void {
    const actions = getActions(this)
    const feedbacks = getFeedbacks(this)

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

export const UpgradeScripts = getUpgrades
