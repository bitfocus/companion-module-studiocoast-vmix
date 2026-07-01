import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type VMixInstance from '../index.js'

export type ConfigActionsSchema = {
	configSetHost: CompanionActionSchema<{
		value: string
		reconnect: boolean
	}>
	configSetPort: CompanionActionSchema<{
		value: number
		reconnect: boolean
	}>
}

export const getConfigActions = (instance: VMixInstance): CompanionActionDefinitions<ConfigActionsSchema> => {
	return {
		configSetHost: {
			name: 'Config - Set Host',
			description: 'Send a key press to vMix',
			options: [
				{
					type: 'textinput',
					label: 'Host',
					description: 'vMix IP or Hostname',
					id: 'value',
					default: '',
					useVariables: true,
				},
				{
					type: 'checkbox',
					label: 'Reconnect',
					description: 'Enable to force a reconnect',
					id: 'reconnect',
					default: false
				}
			],
			callback: (action) => {
				instance.config.host = action.options.value
				instance.saveConfig(instance.config)
				if (action.options.reconnect) {
					instance.tcp.update(true)
				}
			},
		},
		configSetPort: {
			name: 'Config - Set Port',
			description: 'Send a key press to vMix',
			options: [
				{
					type: 'number',
					label: 'Port',
					description: 'vMix TCP Port (Default: 8099)',
					id: 'value',
					default: 8099,
					min: 0,
					max: 65535,
					step: 1,
				},
				{
					type: 'checkbox',
					label: 'Reconnect',
					description: 'Enable to force a reconnect',
					id: 'reconnect',
					default: false
				}
			],
			callback: (action) => {
				instance.config.tcpPort = action.options.value
				instance.saveConfig(instance.config)
				if (action.options.reconnect) {
					instance.tcp.update(true)
				}
			},
		},
	}
}
