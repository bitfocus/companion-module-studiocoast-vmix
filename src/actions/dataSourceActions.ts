import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import type VMixInstance from '../index'

type DataSourceAutoNextOptions = {
  functionID: 'DataSourceAutoNextOn' | 'DataSourceAutoNextOff' | 'DataSourceAutoNextOnOff'
  value: string
}

type DataSourceNextRowOptions = {
  value: string
}

type DataSourcePreviousRowOptions = {
  value: string
}

type DataSourceSelectRowOptions = {
  value: string
}

type DataSourceAutoNextCallback = ActionCallback<'dataSourceAutoNext', DataSourceAutoNextOptions>
type DataSourceNextRowCallback = ActionCallback<'dataSourceNextRow', DataSourceNextRowOptions>
type DataSourcePreviousRowCallback = ActionCallback<'dataSourcePreviousRow', DataSourcePreviousRowOptions>
type DataSourceSelectRowCallback = ActionCallback<'dataSourceSelectRow', DataSourceSelectRowOptions>

export interface DataSourceActions {
  dataSourceAutoNext: VMixAction<DataSourceAutoNextCallback>
  dataSourceNextRow: VMixAction<DataSourceNextRowCallback>
  dataSourcePreviousRow: VMixAction<DataSourcePreviousRowCallback>
  dataSourceSelectRow: VMixAction<DataSourceSelectRowCallback>

  [key: string]: VMixAction<any>
}

export type DataSourceCallbacks = DataSourceAutoNextCallback | DataSourceNextRowCallback | DataSourcePreviousRowCallback | DataSourceSelectRowCallback

export const vMixDataSourceActions = (_instance: VMixInstance, sendBasicCommand: SendBasicCommand): DataSourceActions => {
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
        },
        {
          type: 'textinput',
          label: 'Name,Table',
          id: 'value',
          default: '',
          useVariables: { local: true },
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
          useVariables: { local: true },
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
          useVariables: { local: true },
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
          useVariables: { local: true },
        },
      ],
      callback: sendBasicCommand,
    },
  }
}
