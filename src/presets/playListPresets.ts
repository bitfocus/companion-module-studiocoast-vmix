import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

export const getPlayListDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const playListDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    playlist_start: {
      name: 'PlayList Start',
      type: 'simple',
      style: {
        text: 'PlayList Start',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    playlist_stop: {
      name: 'PlayList Stop',
      type: 'simple',
      style: {
        text: 'PlayList Stop',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    playlist_next: {
      name: 'PlayList Next',
      type: 'simple',
      style: {
        text: 'PlayList Next',
        size: '18',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'NextPlayListEntry' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    playlist_prev: {
      name: 'PlayList Prev',
      type: 'simple',
      style: { text: 'PlayList Prev', size: '18', color: 0xffffff, bgcolor: 0x000000 },
      steps: [
        {
          down: [{ actionId: 'playListFunctions', options: { functionID: 'PreviousPlayListEntry' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
  }

  return playListDefinitions
}

export const getPlaylistStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'playlistStructure',
      name: 'PlayList',
      description: "Control of vMix's PlayList feature, not related to List type inputs",
      definitions: ['playlist_start', 'playlist_stop', 'playlist_next', 'playlist_prev'],
    },
  ]

  return structure
}
