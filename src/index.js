const instance_skel = require('../../../instance_skel');
const { executeAction, getActions } = require('./actions');
const { initAPI } = require('./api');
const { getConfigFields } = require('./config');
const { executeFeedback, initFeedbacks } = require('./feedback');
const { initPresets } = require('./presets');
const { upgradeV1_2_0 } = require('./upgrade');
const tcp = require('./tcp');

/**
 * Companion instance class for Studiocoast vMix
 */
class VMixInstance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config);

		// Upgrade scripts
		this.addUpgradeScript(upgradeV1_2_0);

		// Default instance state
		this.data = {
			startup: true,
			connected: false,
			version: '',
			edition: '',
			preset: '',
			inputs: [],
			mix: [
				{ id: 1, active: false, preview: 0, program: 0 },
				{ id: 2, active: false, preview: 0, program: 0 },
				{ id: 3, active: false, preview: 0, program: 0 },
				{ id: 4, active: false, preview: 0, program: 0 }
			]
		};

		this.config.host = this.config.host || '127.0.0.1';
		this.config.httpPort = this.config.httpPort || 8088;
		this.config.tcpPort = this.config.tcpPort || 8099;
	}

	init() {
		this.status(1, 'Connecting');
		this.actions();
		this.init_tcp();
		this.init_feedbacks();
		initAPI.bind(this)();
		initPresets.bind(this)();
	}

	// New config saved
	updateConfig(config) {
		this.actions();
		this.config = config;
		this.init_tcp();
		this.init_feedbacks();
		initPresets.bind(this)();
	}

	// Set config page fields
	config_fields() {
		return getConfigFields.bind(this)();
	}

	// Instance removal clean up
	destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy();
		}

		if (this.pollAPI) {
			clearInterval(this.pollAPI);
		}

		this.debug('destroy', this.id);
	}

	// TCP connection for Tally
	init_tcp() {
		tcp.init.bind(this)();
	}

	// Set available actions
	actions() {
		this.system.emit('instance_actions', this.id, getActions.bind(this)());
	}

	// Execute action
	action(action) {
		executeAction.bind(this)(action);
	}

	// Set available feedback choices
	init_feedbacks() {
		const feedbacks = initFeedbacks.bind(this)();
		this.setFeedbackDefinitions(feedbacks);
	}

	// Execute feedback
	feedback(feedback, bank) {
		return executeFeedback.bind(this)(feedback, bank);
	}
}

module.exports = VMixInstance;
