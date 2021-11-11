const instance_skel = require('../../../instance_skel')
const { executeAction, getActions } = require('./actions')
const { getConfigFields } = require('./config')
const { executeFeedback, initFeedbacks } = require('./feedback')
const Indicators = require('./indicators')
const { initPresets } = require('./presets')
const { upgradeV1_2_0 } = require('./upgrade')
const { updateVariableDefinitions } = require('./variables')
const tcp = require('./tcp')
const { updateVolumeVariables } = require('./utils')
let reversed = false // used for t-bar operation

/**
 * Companion instance class for Studiocoast vMix
 */
class VMixInstance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		// Default instance state
		this.data = {
			startup: true,
			connected: false,
			version: '',
			edition: '',
			preset: '',
			audio: [],
			inputs: [],
			overlays: [
				{ number: '1', preview: false },
				{ number: '2', preview: false },
				{ number: '3', preview: false },
				{ number: '4', preview: false },
				{ number: '5', preview: false },
				{ number: '6', preview: false },
			],
			transition: [
				{ number: '1', effect: 'fade', duration: '1000' },
				{ number: '2', effect: 'fade', duration: '1000' },
				{ number: '3', effect: 'fade', duration: '1000' },
				{ number: '4', effect: 'fade', duration: '1000' },
			],
			mix: [
				{ id: 1, active: false, preview: 0, program: 0, previewTally: [], programTally: [] },
				{ id: 2, active: false, preview: 0, program: 0, previewTally: [], programTally: [] },
				{ id: 3, active: false, preview: 0, program: 0, previewTally: [], programTally: [] },
				{ id: 4, active: false, preview: 0, program: 0, previewTally: [], programTally: [] },
			],
			audio: [{ volume: '100', muted: 'False', meterF1: '0', meterF2: '0', headphonesVolume: '100', bus: 'master' }],
			status: {
				fadeToBlack: false,
				recording: false,
				external: false,
				streaming: false,
				stream: [false, false, false],
				playList: false,
				multiCorder: false,
				fullscreen: false,
			},
			recTimecode: {
				hours: '0',
				minutes: '0',
				seconds: '0',
				durationSec: '0',
			},
			replay: {
				recording: false,
				live: false,
				events: '1',
				cameraA: '0',
				cameraB: '0',
			},
			dynamic: [],
		}
		this.activatorData = {
			channelMixer: {},
			replay: {
				playForward: {
					A: true,
					B: true,
				},
			},
			videoCall: {},
		}

		this.config.host = this.config.host || '127.0.0.1'
		this.config.tcpPort = this.config.tcpPort || 8099
		this.config.apiPollInterval = this.config.apiPollInterval !== undefined ? this.config.apiPollInterval : 250
		this.updateVariableDefinitions = updateVariableDefinitions
		this.updateVolumeVariables = updateVolumeVariables
		this.destinationInput = 1
		this.destinationLayer = 1
	}

	static GetUpgradeScripts() {
		return [
			upgradeV1_2_0,
		]
	}

	init() {
		this.indicators = new Indicators(this)
		this.status(1, 'Connecting')
		this.actions()
		this.init_tcp()
		this.init_feedbacks()
		initPresets.bind(this)()
		this.updateVariableDefinitions()
		this.setupEventListeners()
	}

	// New config saved
	updateConfig(config) {
		this.actions()
		this.config = config
		this.init_tcp()
		this.init_feedbacks()
		initPresets.bind(this)()
		this.updateVolumeVariables()
	}

	// Set config page fields
	config_fields() {
		return getConfigFields.bind(this)()
	}

	// Instance removal clean up
	destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}

		if (this.pollAPI) {
			clearInterval(this.pollAPI)
		}

		if (this.activeTBarListener) {
			this.system.removeListener('variable_changed', this.activeTBarListener)
			delete this.activeTBarListener
		}
		this.debug('destroy', this.id)
	}

	// TCP connection for Tally
	init_tcp() {
		tcp.init.bind(this)()
	}

	// Set available actions
	actions() {
		this.system.emit('instance_actions', this.id, getActions.bind(this)())
	}

	// Execute action
	action(action) {
		executeAction.bind(this)(action)
	}

	// Set available feedback choices
	init_feedbacks() {
		const feedbacks = initFeedbacks.bind(this)()
		this.setFeedbackDefinitions(feedbacks)
		this.checkFeedbacks("selectedDestinationInput")
		this.checkFeedbacks("selectedDestinationLayer")
	}

	// Execute feedback
	feedback(feedback, bank, info) {
		return executeFeedback.bind(this)(feedback, bank, info)
	}

	tbarListener(label, variable, value) {
		const { tbarEnabled, tbarMin, tbarMax } = this.config
		if (!tbarEnabled || `${label}:${variable}` !== 'internal:t-bar') {
			return
		}

		if (reversed) {
			value = 255 - value
		}
		if (value == tbarMax) {
			reversed = reversed ? false : true
			this.system.emit('action_run', {
				action: 'tbar',
				options: { fader: 255 },
				instance: this.id,
			})
		} else if (value == tbarMin) {
			this.system.emit('action_run', {
				action: 'tbar',
				options: { fader: 0 },
				instance: this.id,
			})
		} else if (value < tbarMax && value > tbarMin) {
			this.system.emit('action_run', {
				action: 'tbar',
				options: { fader: value },
				instance: this.id,
			})
		}
	}

	setupEventListeners() {
		if (this.config.tbarEnabled) {
			if (!this.activeTBarListener) {
				this.activeTBarListener = this.tbarListener.bind(this)
				this.system.on('variable_changed', this.activeTBarListener)
			}
		} else if (this.activeTBarListener) {
			this.system.removeListener('variable_changed', this.activeTBarListener)
			delete this.activeTBarListener
		}
	}
}

module.exports = VMixInstance
