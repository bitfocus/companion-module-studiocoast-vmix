import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'

export type DataSourceActionsSchema = {
  dataSourceAutoNext: CompanionActionSchema<{
    functionID: 'DataSourceAutoNextOn' | 'DataSourceAutoNextOff' | 'DataSourceAutoNextOnOff'
    value: string
  }>
  dataSourceNextRow: CompanionActionSchema<{
    value: string
  }>
  dataSourcePreviousRow: CompanionActionSchema<{
    value: string
  }>
  dataSourceSelectRow: CompanionActionSchema<{
    value: string
  }>
  dataSourcePlayPause: CompanionActionSchema<{
    functionID: 'DataSourcePlayPause' | 'DataSourcePlay' | 'DataSourcePause'
    value: string
  }>
}

export const getDataSourceActions = (_instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<DataSourceActionsSchema> => {
  return {
    dataSourceAutoNext: {
      name: 'DataSource - AutoNext',
      description: 'Enables/Disables/Toggles a Data Source automatically selecting the next row',
      options: [
        {
          type: 'dropdown',
          label: 'AutoNext State',
          id: 'functionID',
          default: 'DataSourceAutoNextOn',
          choices: [
            { id: 'DataSourceAutoNextOn', label: 'On' },
            { id: 'DataSourceAutoNextOff', label: 'Off' },
            { id: 'DataSourceAutoNextOnOff', label: 'On/Off' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Name,Table',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    dataSourceNextRow: {
      name: 'DataSource - Next Row',
      description: 'Selects the next row of a Data Source',
      options: [
        {
          type: 'textinput',
          label: 'Name,Table',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    dataSourcePreviousRow: {
      name: 'DataSource - Previous Row',
      description: 'Selects the previous row of a Data Source',
      options: [
        {
          type: 'textinput',
          label: 'Name,Table',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    dataSourceSelectRow: {
      name: 'DataSource - Select Row',
      description: 'Selects a specific row (indexed from 0) of a Data Source',
      options: [
        {
          type: 'textinput',
          label: 'Name,Table,Index',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    dataSourcePlayPause: {
      name: 'DataSource - Play / Pause updates',
      description: 'Controls vMix polling the data source for updates',
      options: [
        {
          type: 'dropdown',
          label: 'AutoNext State',
          id: 'functionID',
          default: 'DataSourcePlayPause',
          choices: [
            { id: 'DataSourcePlayPause', label: 'Toggle' },
            { id: 'DataSourcePlay', label: 'Play' },
            { id: 'DataSourcePause', label: 'Pause' },
          ],
          expressionDescription: `Valid Values: 'DataSourcePlayPause', 'DataSourcePlay', 'DataSourcePause'`,
        },
        {
          type: 'textinput',
          label: 'Data Source Name',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },
  }
}

export const vMixDataSourceFunctions: ActionFunctionsList<DataSourceActionsSchema> = {
  dataSourceAutoNext: ['DataSourceAutoNextOn', 'DataSourceAutoNextOff', 'DataSourceAutoNextOnOff'],
  dataSourceNextRow: ['DataSourceNextRow'],
  dataSourcePreviousRow: ['DataSourcePreviousRow'],
  dataSourceSelectRow: ['DataSourceSelectRow'],
  dataSourcePlayPause: ['DataSourcePlayPause', 'DataSourcePlay', 'DataSourcePause'],
}
