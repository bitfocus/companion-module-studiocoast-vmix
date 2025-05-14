import { combineRgb } from '@companion-module/base'
import type { VMixPresetArray } from './presets'

export const getPlayListPresets = (): VMixPresetArray => {
  const playListPresets: VMixPresetArray = [
    {
      category: 'PlayList',
      name: 'PlayList Start',
      type: 'button',
      style: {
        text: 'PlayList Start',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'StartPlayList' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: {
            status: 'playList',
            value: '',
          },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'PlayList',
      name: 'PlayList Stop',
      type: 'button',
      style: {
        text: 'PlayList Stop',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'StopPlayList' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: {
            status: 'playList',
            value: '',
          },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    },
    {
      category: 'PlayList',
      name: 'PlayList Next',
      type: 'button',
      style: {
        text: 'PlayList Next',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'NextPlayListEntry' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
    {
      category: 'PlayList',
      name: 'PlayList Prev',
      type: 'button',
      style: { text: 'PlayList Prev', size: '18', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'PreviousPlayListEntry' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
  ]

  return playListPresets
}
