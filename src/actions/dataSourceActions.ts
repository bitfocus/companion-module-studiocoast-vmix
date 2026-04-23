import type { CompanionActionDefinitions } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'

export type DataSourceActionsSchema = {
  dataSourceAutoNext: {
    options: {
      functionID: 'DataSourceAutoNextOn' | 'DataSourceAutoNextOff' | 'DataSourceAutoNextOnOff'
      value: string
    }
  }
  dataSourceNextRow: {
    options: {
      value: string
    }
  }
  dataSourcePreviousRow: {
    options: {
      value: string
    }
  }
  dataSourceSelectRow: {
    options: {
      value: string
    }
  }
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
  }
}
