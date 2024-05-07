import {
  combineRgb,
  CompanionButtonPresetDefinition,
  CompanionTextPresetDefinition,
  CompanionPresetDefinitions,
} from '@companion-module/base'
import { graphics } from 'companion-module-utils'
import VMixInstance from './index'
import { ActionCallbacks, MixOptionEntry } from './actions'
import { FeedbackCallbacks } from './feedback'

export type PresetCategory =
  | 'Mix 1'
  | 'Mix 2'
  | 'Mix 3'
  | 'Mix 4'
  | 'Mix 5'
  | 'Mix 6'
  | 'Mix 7'
  | 'Mix 8'
  | 'Mix 9'
  | 'Mix 10'
  | 'Mix 11'
  | 'Mix 12'
  | 'Mix 13'
  | 'Mix 14'
  | 'Mix 15'
  | 'Mix 16'
  | 'Audio'
  | 'vMix Call'
  | 'Scripting & Commands'
  | 'MultiView Layers'
  | 'Layer Pan/Zoom'
  | 'Outputs'
  | 'Overlays'
  | 'PlayList'
  | 'Replay'
  | 'Slides & Lists'
  | 'Titles & Graphics'
  | 'Transitions'
  | 'Video Playback'
  | 'vMix Functions'
  | 'Button Shift'

type PresetFeedbackCallbacks = FeedbackCallbacks & { style?: any }

interface VMixButtonPresetAdditions {
  category: PresetCategory
  steps: {
    down: ActionCallbacks[]
    up: ActionCallbacks[]
  }[]
  feedbacks: PresetFeedbackCallbacks[]
}

interface VMixTextPresetAdditions {
  category: PresetCategory
}

export type VMixButtonPreset = CompanionButtonPresetDefinition & VMixButtonPresetAdditions
export type VMixTextPreset = CompanionTextPresetDefinition & VMixTextPresetAdditions
export type VMixPreset = VMixButtonPreset | VMixTextPreset
type VMixPresetArray = VMixPreset[]

export function getPresets(instance: VMixInstance): CompanionPresetDefinitions {
  const getMixPresets = (): VMixPresetArray => {
    const mixPresets: VMixPresetArray = []

    for (let mix = 1; mix < 17; mix++) {
      mixPresets.push({
        category: `Mix ${mix}` as PresetCategory,
        name: 'Send Input to Preview',
        type: 'text',
        text: 'Inputs 1 to 8',
      })

      for (let input = 1; input < 9; input++) {
        mixPresets.push({
          category: `Mix ${mix}` as PresetCategory,
          name: `PRV ${input}`,
          type: 'button',
          style: {
            text: `PRV ${input}`,
            size: '24',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'previewInput',
                  options: { mix: (mix - 1) as MixOptionEntry, mixVariable: '', input: input.toString() },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'inputPreview',
              options: {
                mix: (mix - 1) as MixOptionEntry,
                mixVariable: '',
                input: input.toString(),
                fg: combineRgb(255, 255, 255),
                bg: combineRgb(0, 255, 0),
                tally: '',
              },
            },
          ],
        })
      }

      mixPresets.push({
        category: `Mix ${mix}` as PresetCategory,
        name: 'Send Input to Program',
        type: 'text',
        text: 'Inputs 1 to 8',
      })

      for (let input = 1; input < 9; input++) {
        mixPresets.push({
          category: `Mix ${mix}` as PresetCategory,
          name: `PGM ${input}`,
          type: 'button',
          style: {
            text: `PGM ${input}`,
            size: '24',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'programCut',
                  options: { mix: (mix - 1) as MixOptionEntry, mixVariable: '', input: input.toString() },
                },
              ],
              up: [],
            },
          ],

          feedbacks: [
            {
              feedbackId: 'inputLive',
              options: {
                mix: (mix - 1) as MixOptionEntry,
                mixVariable: '',
                input: input.toString(),
                fg: combineRgb(255, 255, 255),
                bg: combineRgb(255, 0, 0),
                tally: '',
              },
            },
          ],
        })
      }

      mixPresets.push(
        {
          category: `Mix ${mix}` as PresetCategory,
          name: 'Transition Preview to Program',
          type: 'text',
          text: '',
        },
        {
          category: `Mix ${mix}` as PresetCategory,
          name: 'Cut',
          type: 'button',
          style: {
            text: 'Cut',
            size: '24',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'transitionMix',
                  options: { mix: (mix - 1) as MixOptionEntry, mixVariable: '', functionID: 'Cut', duration: '1000' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: `Mix ${mix}` as PresetCategory,
          name: 'Fade',
          type: 'button',
          style: {
            text: 'Fade',
            size: '24',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'transitionMix',
                  options: { mix: (mix - 1) as MixOptionEntry, mixVariable: '', functionID: 'Fade', duration: '1000' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: `Mix ${mix}` as PresetCategory,
          name: 'Auto',
          type: 'button',
          style: {
            text: 'Fade',
            size: '24',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'transition', options: { functionID: 'Transition1' } }],
              up: [],
            },
          ],
          feedbacks: [],
        }
      )
    }

    return mixPresets
  }

  const getAudioPresets = (): VMixPresetArray => {
    const busses: ('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G')[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

    const audioPresets: VMixPresetArray = [
      {
        category: `Audio`,
        name: 'Input Audio',
        type: 'text',
        text: 'Example presets here use input 1, but the action/feedback support referencing an input by Name, Number, or GUID, and also supports parsing Variables',
      },
      {
        category: 'Audio',
        name: 'Toggle Audio',
        type: 'button',
        style: {
          text: 'Toggle Audio',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audio', options: { input: '1', functionID: 'Audio' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputAudio',
            options: {
              input: '1',
            },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
          {
            feedbackId: 'liveInputVolume',
            options: {
              input: '1',
              colorTxt: false,
              colorBG: false,
              colorBase: combineRgb(255, 255, 255),
              color: combineRgb(255, 0, 0),
              color1: combineRgb(255, 255, 0),
              color6: combineRgb(0, 255, 0),
              color18: combineRgb(0, 192, 0),
              color36: combineRgb(0, 128, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: 'Set Audio On',
        type: 'button',
        style: {
          text: 'Set Audio On',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audio', options: { input: '1', functionID: 'AudioOn' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputAudio',
            options: {
              input: '1',
            },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
          {
            feedbackId: 'liveInputVolume',
            options: {
              input: '1',
              colorTxt: false,
              colorBG: false,
              colorBase: combineRgb(255, 255, 255),
              color: combineRgb(255, 0, 0),
              color1: combineRgb(255, 255, 0),
              color6: combineRgb(0, 255, 0),
              color18: combineRgb(0, 192, 0),
              color36: combineRgb(0, 128, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: 'Set Audio Off',
        type: 'button',
        style: {
          text: 'Set Audio Off',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audio', options: { input: '1', functionID: 'AudioOff' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputAudio',
            options: {
              input: '1',
            },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
          {
            feedbackId: 'liveInputVolume',
            options: {
              input: '1',
              colorTxt: false,
              colorBG: false,
              colorBase: combineRgb(255, 255, 255),
              color: combineRgb(255, 0, 0),
              color1: combineRgb(255, 255, 0),
              color6: combineRgb(0, 255, 0),
              color18: combineRgb(0, 192, 0),
              color36: combineRgb(0, 128, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: 'Audio Auto Toggle',
        type: 'button',
        style: {
          text: 'Audio Auto Toggle',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audioAuto', options: { input: '1', functionID: 'AudioAuto' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputAudioAuto',
            options: {
              input: '1',
            },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: 'Input Solo',
        type: 'button',
        style: {
          text: 'Input Solo',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'solo', options: { input: '1', functionID: 'Solo' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputSolo',
            options: { input: '1' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: `Send Input to Master`,
        type: 'button',
        style: {
          text: 'Send Input to Master',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audioBus', options: { input: '1', value: 'Master', functionID: 'AudioBus' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputBusRouting',
            options: { input: '1', value: 'Master' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: `Send Input to Bus A`,
        type: 'button',
        style: {
          text: 'Send Input to Bus A',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audioBus', options: { input: '1', value: 'A', functionID: 'AudioBus' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputBusRouting',
            options: { input: '1', value: 'A' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: `Send Input to Bus B`,
        type: 'button',
        style: {
          text: 'Send Input to Bus B',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audioBus', options: { input: '1', value: 'B', functionID: 'AudioBus' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputBusRouting',
            options: { input: '1', value: 'Master' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: `Send Input to Bus C`,
        type: 'button',
        style: {
          text: 'Send Input to Bus C',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audioBus', options: { input: '1', value: 'C', functionID: 'AudioBus' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputBusRouting',
            options: { input: '1', value: 'C' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: `Send Input to Bus D`,
        type: 'button',
        style: {
          text: 'Send Input to Bus D',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audioBus', options: { input: '1', value: 'D', functionID: 'AudioBus' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputBusRouting',
            options: { input: '1', value: 'D' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: `Send Input to Bus E`,
        type: 'button',
        style: {
          text: 'Send Input to Bus E',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audioBus', options: { input: '1', value: 'E', functionID: 'AudioBus' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputBusRouting',
            options: { input: '1', value: 'E' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: `Send Input to Bus F`,
        type: 'button',
        style: {
          text: 'Send Input to Bus F',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audioBus', options: { input: '1', value: 'F', functionID: 'AudioBus' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputBusRouting',
            options: { input: '1', value: 'F' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: `Send Input to Bus G`,
        type: 'button',
        style: {
          text: 'Send Input to Bus G',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'audioBus', options: { input: '1', value: 'G', functionID: 'AudioBus' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputBusRouting',
            options: { input: '1', value: 'G' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: 'Input Volume Fade',
        type: 'text',
        text: 'Fade the Volume on an Input over a default of 2000ms to a target %',
      },
      {
        category: 'Audio',
        name: 'Input 1 Vol 0%',
        type: 'button',
        style: {
          text: 'Input 1 Vol 0%',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '0', fadeTime: '2000' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Audio',
        name: 'Input 1 Vol 25%',
        type: 'button',
        style: {
          text: 'Input 1 Vol 25%',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '25', fadeTime: '2000' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Audio',
        name: 'Input 1 Vol 50%',
        type: 'button',
        style: {
          text: 'Input 1 Vol 50%',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '50', fadeTime: '2000' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Audio',
        name: 'Input 1 Vol 75%',
        type: 'button',
        style: {
          text: 'Input 1 Vol 75%',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '75', fadeTime: '2000' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Audio',
        name: 'Input 1 Vol 100%',
        type: 'button',
        style: {
          text: 'Input 1 Vol 100%',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '100', fadeTime: '2000' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
    ]

    audioPresets.push(
      {
        category: 'Audio',
        name: `Bus Master`,
        type: 'text',
        text: '',
      },
      {
        category: 'Audio',
        name: `Bus Master Mute`,
        type: 'button',
        style: {
          text: `Bus Master Mute`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'busXAudio', options: { value: 'Master', functionID: 'BusXAudio' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'busMute',
            options: { value: 'Master' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
          {
            feedbackId: 'liveBusVolume',
            options: {
              value: 'Master',
              colorTxt: false,
              colorBG: false,
              colorBase: combineRgb(255, 255, 255),
              color: combineRgb(255, 0, 0),
              color1: combineRgb(255, 255, 0),
              color6: combineRgb(0, 255, 0),
              color18: combineRgb(0, 192, 0),
              color36: combineRgb(0, 128, 0),
            },
          },
        ],
      },
      {
        category: 'Audio',
        name: `Bus Master 0%`,
        type: 'button',
        style: {
          text: `Bus Master 0%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '0' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Audio',
        name: `Bus Master 25%`,
        type: 'button',
        style: {
          text: `Bus Master 25%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '25' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Audio',
        name: `Bus Master 50%`,
        type: 'button',
        style: {
          text: `Bus Master 50%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '50' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Audio',
        name: `Bus Master 75%`,
        type: 'button',
        style: {
          text: `Bus Master 75%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '75' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Audio',
        name: `Bus Master 100%`,
        type: 'button',
        style: {
          text: `Bus Master 100%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '100' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Audio',
        name: `Bus Master\nMeters`,
        type: 'button',
        style: {
          text: `Bus Master\nMeters`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'busXAudio', options: { value: 'Master', functionID: 'BusXAudio' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'busVolumeMeter',
            options: { value: 'Master' },
          },
          {
            feedbackId: 'busMute',
            options: { value: 'Master' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      }
    )

    busses.forEach((bus) => {
      audioPresets.push(
        {
          category: 'Audio',
          name: `Bus ${bus}`,
          type: 'text',
          text: '',
        },
        {
          category: 'Audio',
          name: `Bus ${bus} Mute`,
          type: 'button',
          style: {
            text: `Bus ${bus} Mute`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'busXAudio', options: { value: bus, functionID: 'BusXAudio' } }],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'busMute',
              options: { value: bus },
              style: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 0, 0),
              },
            },
            {
              feedbackId: 'liveBusVolume',
              options: {
                value: bus,
                colorTxt: false,
                colorBG: false,
                colorBase: combineRgb(255, 255, 255),
                color: combineRgb(255, 0, 0),
                color1: combineRgb(255, 255, 0),
                color6: combineRgb(0, 255, 0),
                color18: combineRgb(0, 192, 0),
                color36: combineRgb(0, 128, 0),
              },
            },
          ],
        },
        {
          category: 'Audio',
          name: `Bus ${bus} solo`,
          type: 'button',
          style: {
            text: `Bus ${bus} solo`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'busXSolo', options: { value: bus, functionID: 'BusXSolo' } }],
              up: [],
            },
          ],

          feedbacks: [
            {
              feedbackId: 'busSolo',
              options: { value: bus },
              style: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0),
              },
            },
          ],
        },
        {
          category: 'Audio',
          name: `Bus ${bus} 0%`,
          type: 'button',
          style: {
            text: `Bus ${bus} 0%`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '0' } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Audio',
          name: `Bus ${bus} 25%`,
          type: 'button',
          style: {
            text: `Bus ${bus} 25%`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '25' } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Audio',
          name: `Bus ${bus} 50%`,
          type: 'button',
          style: {
            text: `Bus ${bus} 50%`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '50' } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Audio',
          name: `Bus ${bus} 75%`,
          type: 'button',
          style: {
            text: `Bus ${bus} 75%`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '75' } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Audio',
          name: `Bus ${bus} 100%`,
          type: 'button',
          style: {
            text: `Bus ${bus} 100%`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '100' } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Audio',
          name: `Bus ${bus}\nMeters`,
          type: 'button',
          style: {
            text: `Bus ${bus}\nMeters`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'busXAudio', options: { value: bus, functionID: 'BusXAudio' } }],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'busVolumeMeter',
              options: { value: bus },
            },
            {
              feedbackId: 'busMute',
              options: { value: bus },
              style: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 0, 0),
              },
            },
          ],
        },
        {
          category: 'Audio',
          name: 'Send Bus to Master',
          type: 'button',
          style: {
            text: 'Send Bus to Master',
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'busXSendToMaster', options: { value: 'A' } }],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'busSendToMaster',
              options: { value: bus },
              style: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(0, 255, 0),
              },
            },
          ],
        }
      )
    })

    return audioPresets
  }

  const getCallPresets = (): VMixPresetArray => {
    const callPresets: VMixPresetArray = []

    callPresets.push(
      {
        category: `vMix Call`,
        name: `vMix Call Presets`,
        type: 'text',
        text: 'Each preset will require you to enter the calls input in the Action and Feedback',
      },
      {
        category: `vMix Call`,
        name: `Audio Source`,
        type: 'text',
        text: '',
      },
      {
        category: 'vMix Call',
        name: `Audio\nSource\nMaster`,
        type: 'button',
        style: {
          text: `Audio\nSource\nMaster`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'Master' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'videoCallAudioSource',
            options: { input: '', source: 'Master' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Call',
        name: `Audio\nSource\nHeadphones`,
        type: 'button',
        style: {
          text: `Audio\nSource\nHeadphones`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'Headphones' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'videoCallAudioSource',
            options: { input: '', source: 'Headphones' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      ...['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((bus) => {
        return {
          category: 'vMix Call',
          name: `Audio\nSource\nBus ${bus}`,
          type: 'button',
          style: {
            text: `Audio\nSource\nBus ${bus}`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: `Bus${bus}` as any } }],
              up: [],
            },
          ],

          feedbacks: [
            {
              feedbackId: 'videoCallAudioSource',
              options: { input: '', source: `Bus${bus}` as any },
              style: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 0, 0),
              },
            },
          ],
        } as VMixButtonPreset
      }),
      {
        category: `vMix Call`,
        name: `Video Source`,
        type: 'text',
        text: '',
      },
      {
        category: 'vMix Call',
        name: `Video\nSource\nOutput 1`,
        type: 'button',
        style: {
          text: `Video\nSource\nOutput 1`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output1' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'videoCallVideoSource',
            options: { input: '', source: 'Output1' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Call',
        name: `Video\nSource\nOutput 2`,
        type: 'button',
        style: {
          text: `Video\nSource\nOutput 2`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output2' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'videoCallVideoSource',
            options: { input: '', source: 'Output2' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Call',
        name: `Video\nSource\nOutput 3`,
        type: 'button',
        style: {
          text: `Video\nSource\nOutput 3`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output3' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'videoCallVideoSource',
            options: { input: '', source: 'Output3' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Call',
        name: `Video\nSource\nOutput 4`,
        type: 'button',
        style: {
          text: `Video\nSource\nOutput 4`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output4' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'videoCallVideoSource',
            options: { input: '', source: 'Output4' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Call',
        name: `Video\nSource\nNone`,
        type: 'button',
        style: {
          text: `Video\nSource\nNone`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'None' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'videoCallVideoSource',
            options: { input: '', source: 'None' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      }
    )

    return callPresets
  }

  const getGeneralPresets = (): VMixPresetArray => {
    const generalPresets: VMixPresetArray = [
      {
        category: 'Scripting & Commands',
        name: 'Send Key Press',
        type: 'button',
        style: {
          text: 'Send Key Press',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'keyPress', options: { value: '' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Scripting & Commands',
        name: 'Script Start',
        type: 'button',
        style: {
          text: 'Script Start',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'scriptStart', options: { value: '' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Scripting & Commands',
        name: 'Script Stop',
        type: 'button',
        style: {
          text: 'Script Stop',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'scriptStop', options: { value: '' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Scripting & Commands',
        name: 'Script Stop All',
        type: 'button',
        style: {
          text: 'Script Stop All',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'scriptStopAll', options: {} }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Scripting & Commands',
        name: 'Custom Command',
        type: 'button',
        style: {
          text: 'Custom Command',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'command', options: { command: '', encode: false } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
    ]

    return generalPresets
  }

  const getMultiviewLayersPresets = (): VMixPresetArray => {
    const multiviewLayersPresets: VMixPresetArray = [
      {
        category: 'MultiView Layers',
        name: 'MultiView Layer Presets',
        type: 'text',
        text: "Each preset will require you to enter the Input in the Action and Feedback. Some Presets such as enabling/disabling lack feedback as vMix's API lacks data on if a layer is enabled or not.",
      },
      {
        category: 'MultiView Layers',
        name: 'Toggle / Enable / Disable Layer 1 to 10 on Input',
        type: 'text',
        text: '',
      },
    ]

    for (let i = 1; i < 11; i++) {
      multiviewLayersPresets.push(
        {
          category: 'MultiView Layers',
          name: `Toggle Layer ${i}`,
          type: 'button',
          style: {
            text: `Toggle Layer ${i}`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                { actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlay', input: '', layer: i } },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'MultiView Layers',
          name: `Set Layer ${i} On`,
          type: 'button',
          style: {
            text: `Set Layer ${i} On`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                { actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOn', input: '', layer: i } },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'MultiView Layers',
          name: `Set Layer ${i} Off`,
          type: 'button',
          style: {
            text: `Set Layer ${i} Off`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                { actionId: 'multiViewOverlay', options: { functionID: 'MultiViewOverlayOff', input: '', layer: i } },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        }
      )
    }

    multiviewLayersPresets.push({
      category: 'MultiView Layers',
      name: 'Set which input is assigned to layers 1 to 10 on an Input',
      type: 'text',
      text: '',
    })

    for (let i = 1; i < 11; i++) {
      multiviewLayersPresets.push({
        category: 'MultiView Layers',
        name: `Set Layer ${i} Input`,
        type: 'button',
        style: {
          text: `Set Layer ${i} Input`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setMultiViewOverlay', options: { input: '', layer: i, layerInput: '' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputOnMultiview',
            options: { inputX: '', inputY: '', layer: `${i}` },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      })
    }

    multiviewLayersPresets.push(
      {
        category: 'MultiView Layers',
        name: 'Layer Routing',
        type: 'text',
        text: 'Set a target Input, a target Layer, and route an input to that layer',
      },
      {
        category: 'MultiView Layers',
        name: `Set Target Input`,
        type: 'button',
        style: {
          text: `Set Target Input`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setMultiViewOverlayDestinationInput', options: { destinationInput: '' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'selectedDestinationInput',
            options: { input: '' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'MultiView Layers',
        name: `Set Input on Layer`,
        type: 'button',
        style: {
          text: `Set Input on Layer`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setMultiViewOverlayDestinationLayer', options: { destinationLayer: '1' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'selectedDestinationLayer',
            options: { selectedIndex: '1' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
      {
        category: 'MultiView Layers',
        name: `Set Input on Layer`,
        type: 'button',
        style: {
          text: `Set Input on Layer`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setMultiViewOverlaySourceInput', options: { sourceIndex: '1' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'routableMultiviewLayer',
            options: { input: '1' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      }
    )

    return multiviewLayersPresets
  }

  const getLayerPanZoomPresets = (): VMixPresetArray => {
    const layerPanZoomPresets: VMixPresetArray = [
      {
        category: 'Layer Pan/Zoom',
        name: 'Example of Layer Pan / Zoom',
        type: 'text',
        text: 'vMix 27 added the ability for Pan / Zoom layer actions, this makes it ideal to use an input as a layer on another, zoom/pan to sections, and then merge between the original input and the one with the zoomed layer',
      },
      {
        category: 'Layer Pan/Zoom',
        name: '',
        type: 'text',
        text: 'More complex usage can be done by using a Custom Variables, allowing for controlling multiple inputs/layers/zoom levels with a limited number of buttons,',
      },
      {
        category: 'Layer Pan/Zoom',
        name: 'Zoom',
        type: 'text',
        text: 'Adjust the zoom of Layer 1 on Input 1',
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Zoom +`,
        type: 'button',
        style: {
          text: `Zoom +`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'Zoom',
                  input: '1',
                  layer: '1',
                  adjustment: 'Increase',
                  crop: '',
                  crop2: '',
                  pan: '',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '0.1',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Zoom -`,
        type: 'button',
        style: {
          text: `Zoom -`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'Zoom',
                  input: '1',
                  layer: '1',
                  adjustment: 'Decrease',
                  crop: '',
                  crop2: '',
                  pan: '',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '0.1',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
    ]

    ;[25, 50, 75, 100, 150, 200, 400].forEach((zoom) => {
      const value = zoom / 100

      layerPanZoomPresets.push({
        category: 'Layer Pan/Zoom',
        name: `Zoom ${zoom}%`,
        type: 'button',
        style: {
          text: `Zoom ${zoom}%`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'Zoom',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: value.toString(),
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      })
    })

    const arrowTopLeft = graphics.toPNG64({
      image: graphics.icon({ width: 50, height: 50, type: 'directionUpLeft' }),
      width: 50,
      height: 50,
    })
    const arrowTopCenter = graphics.toPNG64({
      image: graphics.icon({ width: 50, height: 50, type: 'directionUp' }),
      width: 50,
      height: 50,
    })
    const arrowTopRight = graphics.toPNG64({
      image: graphics.icon({ width: 50, height: 50, type: 'directionUpRight' }),
      width: 50,
      height: 50,
    })
    const arrowMidleLeft = graphics.toPNG64({
      image: graphics.icon({ width: 50, height: 50, type: 'directionLeft' }),
      width: 50,
      height: 50,
    })
    const arrowMidleCenter = graphics.toPNG64({
      image: graphics.icon({ width: 50, height: 50, type: 'record' }),
      width: 50,
      height: 50,
    })
    const arrowMidleRight = graphics.toPNG64({
      image: graphics.icon({ width: 50, height: 50, type: 'directionRight' }),
      width: 50,
      height: 50,
    })
    const arrowBottomLeft = graphics.toPNG64({
      image: graphics.icon({ width: 50, height: 50, type: 'directionDownLeft' }),
      width: 50,
      height: 50,
    })
    const arrowBottomCenter = graphics.toPNG64({
      image: graphics.icon({ width: 50, height: 50, type: 'directionDown' }),
      width: 50,
      height: 50,
    })
    const arrowBottomRight = graphics.toPNG64({
      image: graphics.icon({ width: 50, height: 50, type: 'directionDownRight' }),
      width: 50,
      height: 50,
    })

    layerPanZoomPresets.push(
      {
        category: 'Layer Pan/Zoom',
        name: 'Pan Adjust',
        type: 'text',
        text: 'Progressive panning on each button press',
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Up Left`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: arrowTopLeft,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Decrease',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Increase',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Up`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: arrowTopCenter,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Increase',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Top Right`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: arrowTopRight,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Increase',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Increase',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: '',
        type: 'text',
        text: '',
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Left`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: arrowMidleLeft,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Decrease',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Center`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: arrowMidleCenter,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '0',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '0',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Right`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: arrowMidleRight,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Increase',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: '',
        type: 'text',
        text: '',
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Down Left`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: arrowBottomLeft,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Decrease',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Decrease',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Down`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: arrowBottomCenter,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Decrease',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Bottom Right`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: arrowBottomRight,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Increase',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Decrease',
                  crop: '',
                  crop2: '',
                  pan: '0.1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      }
    )

    const rect = graphics.rect({
      width: 20,
      height: 20,
      color: combineRgb(0, 0, 255),
      rectWidth: 20,
      rectHeight: 20,
      strokeWidth: 2,
      opacity: 255,
      fillColor: combineRgb(255, 255, 255),
      fillOpacity: 255,
      offsetX: 0,
      offsetY: 0,
    })

    const box = graphics.toPNG64({
      image: graphics.icon({
        width: 20,
        height: 20,
        type: 'custom',
        custom: rect,
        offsetX: 0,
        offsetY: 0,
        customHeight: 20,
        customWidth: 20,
      }),
      width: 20,
      height: 20,
    })

    layerPanZoomPresets.push(
      {
        category: 'Layer Pan/Zoom',
        name: 'Pan Set',
        type: 'text',
        text: 'Set the Pan to specific positions',
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Set Up Left`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: box,
          pngalignment: 'left:top',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '-1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Set Up`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: box,
          pngalignment: 'center:top',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '0',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Set Up Right`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: box,
          pngalignment: 'right:top',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: '',
        type: 'text',
        text: '',
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Set Left`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: box,
          pngalignment: 'left:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '-1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '0',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Set Center`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: box,
          pngalignment: 'center:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '0',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '0',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Set Right`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: box,
          pngalignment: 'right:center',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '0',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: '',
        type: 'text',
        text: '',
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Set Left`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: box,
          pngalignment: 'left:bottom',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '-1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '-1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Set Bottom Center`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: box,
          pngalignment: 'center:bottom',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '0',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '-1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Layer Pan/Zoom',
        name: `Set Bottom Right`,
        type: 'button',
        style: {
          text: '',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
          png64: box,
          pngalignment: 'right:bottom',
        },
        steps: [
          {
            down: [
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanX',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
              {
                actionId: 'setLayerPosition',
                options: {
                  setting: 'PanY',
                  input: '1',
                  layer: '1',
                  adjustment: 'Set',
                  crop: '',
                  crop2: '',
                  pan: '-1',
                  xy: '',
                  heightWidth: '',
                  rectangle: '',
                  zoom: '',
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      }
    )

    return layerPanZoomPresets
  }

  const getOutputPresets = (): VMixPresetArray => {
    const outputPresets: VMixPresetArray = []

    ;[
      { label: 'Output 2', functionID: 'SetOutput2' },
      { label: 'Output 3', functionID: 'SetOutput3' },
      { label: 'Output 4', functionID: 'SetOutput4' },
      { label: 'External 2', functionID: 'SetOutputExternal2' },
      { label: 'Fullscreen', functionID: 'SetOutputFullscreen' },
      { label: 'Fullscreen 2', functionID: 'SetOutputFullscreen2' },
    ].forEach((output) => {
      outputPresets.push(
        {
          category: 'Outputs',
          name: output.label,
          type: 'text',
          text: '',
        },
        {
          category: 'Outputs',
          name: `${output.label}\\nPGM`,
          type: 'button',
          style: {
            text: `${output.label}\\nPGM`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'outputSet',
                  options: { functionID: output.functionID as any, value: 'Output', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Outputs',
          name: `${output.label}\nPRV`,
          type: 'button',
          style: {
            text: `${output.label}\nPRV`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'outputSet',
                  options: { functionID: output.functionID as any, value: 'Preview', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Outputs',
          name: `${output.label}\nMultiview`,
          type: 'button',
          style: {
            text: `${output.label}\nMultiview`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'outputSet',
                  options: { functionID: output.functionID as any, value: 'MultiView', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Outputs',
          name: `${output.label}\nReplay`,
          type: 'button',
          style: {
            text: `${output.label}\nReplay`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'outputSet',
                  options: { functionID: output.functionID as any, value: 'Replay', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Outputs',
          name: `${output.label}\nInput`,
          type: 'button',
          style: {
            text: `${output.label}\nInput`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                { actionId: 'outputSet', options: { functionID: output.functionID as any, value: 'Input', input: '' } },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        }
      )
    })

    return outputPresets
  }

  const getOverlayPresets = (): VMixPresetArray => {
    const overlayPresets: VMixPresetArray = [
      {
        category: 'Overlays',
        name: 'OVL All Off',
        type: 'button',
        style: {
          text: 'OVL All Off',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'overlayFunctions', options: { functionID: 'OverlayInputAllOff', input: '' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
    ]

    for (let i = 1; i < 5; i++) {
      overlayPresets.push(
        {
          category: 'Overlays',
          name: `Overlay ${i}`,
          type: 'text',
          text: '',
        },
        {
          category: 'Overlays',
          name: `Overlay ${1} Prgm`,
          type: 'button',
          style: {
            text: `Overlay ${1} Prgm`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'overlayFunctions',
                  options: { functionID: `OverlayInput${i}` as 'OverlayInput1', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'overlayStatus',
              options: {
                input: '',
                overlay: i.toString(),
                fg: combineRgb(255, 255, 255),
                bgPreview: combineRgb(0, 255, 0),
                bgProgram: combineRgb(255, 0, 0),
              },
            },
          ],
        },
        {
          category: 'Overlays',
          name: `Overlay ${i} Prv`,
          type: 'button',
          style: {
            text: `Overlay ${i} Prv`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'overlayFunctions',
                  options: { functionID: `PreviewOverlayInput${i}` as 'PreviewOverlayInput1', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'overlayStatus',
              options: {
                input: '',
                overlay: i.toString(),
                fg: combineRgb(255, 255, 255),
                bgPreview: combineRgb(0, 255, 0),
                bgProgram: combineRgb(255, 0, 0),
              },
            },
          ],
        },
        {
          category: 'Overlays',
          name: `Overlay ${i} In`,
          type: 'button',
          style: {
            text: `Overlay ${i} In`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'overlayFunctions',
                  options: { functionID: `OverlayInput${i}In` as 'OverlayInput1In', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'overlayStatus',
              options: {
                input: '',
                overlay: i.toString(),
                fg: combineRgb(255, 255, 255),
                bgPreview: combineRgb(0, 255, 0),
                bgProgram: combineRgb(255, 0, 0),
              },
            },
          ],
        },
        {
          category: 'Overlays',
          name: `Overlay ${i} Out`,
          type: 'button',
          style: {
            text: `Overlay ${i} Out`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'overlayFunctions',
                  options: { functionID: `OverlayInput${i}Out` as 'OverlayInput1Out', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'overlayStatus',
              options: {
                input: '',
                overlay: i.toString(),
                fg: combineRgb(255, 255, 255),
                bgPreview: combineRgb(0, 255, 0),
                bgProgram: combineRgb(255, 0, 0),
              },
            },
          ],
        },
        {
          category: 'Overlays',
          name: `Overlay ${i} Off`,
          type: 'button',
          style: {
            text: `Overlay ${i} Off`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'overlayFunctions',
                  options: { functionID: `OverlayInput${i}Off` as 'OverlayInput1Off', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'overlayStatus',
              options: {
                input: '',
                overlay: i.toString(),
                fg: combineRgb(255, 255, 255),
                bgPreview: combineRgb(0, 255, 0),
                bgProgram: combineRgb(255, 0, 0),
              },
            },
          ],
        },
        {
          category: 'Overlays',
          name: `Overlay ${i} Zoom`,
          type: 'button',
          style: {
            text: `Overlay ${i} Zoom`,
            size: '14',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'overlayFunctions',
                  options: { functionID: `OverlayInput${i}Zoom` as 'OverlayInput1Zoom', input: '' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        }
      )
    }

    return overlayPresets
  }

  const getPlayListPresets = (): VMixPresetArray => {
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

  const getReplayPresets = (): VMixPresetArray => {
    const replayPresets: VMixPresetArray = []

    ;['A', 'B'].map((channel) => {
      replayPresets.push({
        category: 'Replay',
        name: `A Camera`,
        type: 'text',
        text: '',
      })

      for (let i = 1; i < 9; i++) {
        replayPresets.push({
          category: 'Replay',
          name: `${channel} Cam ${i}`,
          type: 'button',
          style: {
            text: `${channel} Cam ${i}`,
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'replayACamera',
                  options: { functionID: `Replay${channel}Camera${i}` as 'ReplayACamera1' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [
            {
              feedbackId: 'replayCamera',
              options: { channel: 'A', camera: 1 },
              style: {
                color: combineRgb(0, 0, 0),
                bgcolor: combineRgb(255, 255, 0),
              },
            },
          ],
        })
      }
    })

    replayPresets.push({
      category: 'Replay',
      name: `Channel Select`,
      type: 'text',
      text: '',
    })

    const channels: ('AB' | 'A' | 'B')[] = ['AB', 'A', 'B']

    channels.forEach((channel) => {
      replayPresets.push({
        category: 'Replay',
        name: `Channel${channel}`,
        type: 'button',
        style: {
          text: `Channel${channel}`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'replaySelectChannel',
                options: { functionID: `replaySelectChannel${channel}` as 'replaySelectChannelAB' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'replaySelectedChannel',
            options: { channel },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      })
    })

    replayPresets.push(
      {
        category: 'Replay',
        name: `Playback`,
        type: 'text',
        text: '',
      },
      {
        category: 'Replay',
        name: 'Rec',
        type: 'button',
        style: {
          text: 'Rec',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayRecording', options: { functionID: `ReplayStartStopRecording` } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'replayStatus',
            options: { status: 'recording' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Replay',
        name: 'Live',
        type: 'button',
        style: {
          text: 'Live',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayLiveToggle', options: {} }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'replayStatus',
            options: { status: 'live' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Replay',
        name: 'Jump to Now',
        type: 'button',
        style: {
          text: 'Jump to Now',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayJumpToNow', options: { channel: 'Current' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: 'Play Events',
        type: 'button',
        style: {
          text: 'Play Events',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayPlay', options: { channel: 'Current' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: 'Pause Events',
        type: 'button',
        style: {
          text: 'Pause Events',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayPause', options: { channel: 'Current' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: 'Play Selected Event',
        type: 'button',
        style: {
          text: 'Play Selected Event',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayPlaySelectedEventToOutput', options: { channel: 'Current' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: 'Play Events by ID',
        type: 'button',
        style: {
          text: 'Play Events by ID',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayPlayEventsByIDToOutput', options: { channel: 'Current', value: 0 } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: `Mark Event`,
        type: 'text',
        text: '',
      },
      {
        category: 'Replay',
        name: 'Mark In',
        type: 'button',
        style: {
          text: 'Mark In',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkIn', value: '0', value2: '10' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: 'Mark Out',
        type: 'button',
        style: {
          text: 'Mark Out',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkOut', value: '0', value2: '10' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: 'Mark Last 10s',
        type: 'button',
        style: {
          text: 'Mark Last 10s',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkInOut', value: '10', value2: '10' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: 'Mark Last 30s',
        type: 'button',
        style: {
          text: 'Mark Last 30s',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayMark', options: { functionID: 'ReplayMarkInOut', value: '30', value2: '10' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: 'Update In',
        type: 'button',
        style: {
          text: 'Update In',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayUpdateInOut', options: { functionID: 'ReplayUpdateSelectedInPoint' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Replay',
        name: 'Update Out',
        type: 'button',
        style: {
          text: 'Update Out',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'replayUpdateInOut', options: { functionID: 'ReplayUpdateSelectedOutPoint' } }],
            up: [],
          },
        ],
        feedbacks: [],
      }
    )

    return replayPresets
  }

  const getSlideListPresets = (): VMixPresetArray => {
    const slideListPresets: VMixPresetArray = [
      {
        category: 'Slides & Lists',
        name: 'Next Photo',
        type: 'button',
        style: {
          text: 'Next Photo',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'nextPicture', options: { input: '1' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Slides & Lists',
        name: 'Prev Photo',
        type: 'button',
        style: {
          text: 'Prev Photo',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'previousPicture', options: { input: '1' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Slides & Lists',
        name: 'Select Index 1',
        type: 'button',
        style: {
          text: 'Select Index 1',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'previousPicture', options: { input: '1' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputSelectedIndexBoolean',
            options: {
              input: '1',
              selectedIndex: '1',
            },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0),
            },
          },
        ],
      },
    ]

    return slideListPresets
  }

  const getTitleGraphicsPresets = (): VMixPresetArray => {
    const titleGraphicsPresets: VMixPresetArray = [
      {
        category: 'Titles & Graphics',
        name: 'Set Title',
        type: 'button',
        style: {
          text: 'Set Title',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'setText',
                options: { input: '1', selectedIndex: '0', adjustment: 'Set', value: '0', encode: false },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Set Title +1',
        type: 'button',
        style: {
          text: 'Set Title +1',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'setText',
                options: { input: '1', selectedIndex: '0', adjustment: 'Increase', value: '1', encode: false },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Set Title -1',
        type: 'button',
        style: {
          text: 'Set Title -1',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'setText',
                options: { input: '1', selectedIndex: '0', adjustment: 'Decrease', value: '1', encode: false },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Next Title',
        type: 'button',
        style: {
          text: 'Next Title',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'titlePreset', options: { input: '', functionID: 'NextTitlePreset' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Prev Title',
        type: 'button',
        style: {
          text: 'Prev Title',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'titlePreset', options: { input: '', functionID: 'PreviousTitlePreset' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Title Presets',
        type: 'text',
        text: '',
      },
    ]

    for (let i = 0; i < 5; i++) {
      titleGraphicsPresets.push({
        category: 'Titles & Graphics',
        name: `Title Preset ${i}`,
        type: 'button',
        style: {
          text: `Title Preset ${i}`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'selectTitlePreset', options: { input: '', value: i.toString() } }],
            up: [],
          },
        ],
        feedbacks: [],
      })
    }

    titleGraphicsPresets.push(
      {
        category: 'Titles & Graphics',
        name: 'Title Animations',
        type: 'text',
        text: '',
      },
      {
        category: 'Titles & Graphics',
        name: 'Title Transition In',
        type: 'button',
        style: {
          text: 'Title Transition In',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'TransitionIn' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Title Transition Out',
        type: 'button',
        style: {
          text: 'Title Transition Out',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'TransitionOut' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Title Continuous',
        type: 'button',
        style: {
          text: 'Title Continuous',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'Continuous' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Title Data Change In',
        type: 'button',
        style: {
          text: 'Title Data Change In',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'DataChangeIn' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Title Data Change Out',
        type: 'button',
        style: {
          text: 'Title Data Change Out',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: 'DataChangeOut' } }],
            up: [],
          },
        ],
        feedbacks: [],
      }
    )

    for (let i = 1; i < 11; i++) {
      titleGraphicsPresets.push({
        category: 'Titles & Graphics',
        name: `Title Page ${i}`,
        type: 'button',
        style: {
          text: `Title Page ${i}`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'titleBeginAnimation', options: { input: '', value: `Page${i}` as 'Page1' } }],
            up: [],
          },
        ],
        feedbacks: [],
      })
    }

    titleGraphicsPresets.push(
      {
        category: 'Titles & Graphics',
        name: 'Countdowns',
        type: 'text',
        text: '',
      },
      {
        category: 'Titles & Graphics',
        name: 'Countdown Start',
        type: 'button',
        style: {
          text: 'Countdown Start',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'controlCountdown',
                options: { functionID: 'StartCountdown', input: '', selectedIndex: '0' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Countdown Stop',
        type: 'button',
        style: {
          text: 'Countdown Stop',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              { actionId: 'controlCountdown', options: { functionID: 'StopCountdown', input: '', selectedIndex: '0' } },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Countdown Pause',
        type: 'button',
        style: {
          text: 'Countdown Pause',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'controlCountdown',
                options: { functionID: 'PauseCountdown', input: '', selectedIndex: '0' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Titles & Graphics',
        name: 'Countdown Change',
        type: 'button',
        style: {
          text: 'Countdown Change',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'changeCountdown', options: { value: '00:10:00', input: '', selectedIndex: '0' } }],
            up: [],
          },
        ],
        feedbacks: [],
      }
    )

    const countdowns = [
      { label: '0', time: '00:00:00' },
      { label: '10', time: '00:00:10' },
      { label: '30', time: '00:00:30' },
      { label: '60', time: '00:01:00' },
      { label: '120', time: '00:02:00' },
    ]

    countdowns.forEach((x) => {
      titleGraphicsPresets.push({
        category: 'Titles & Graphics',
        name: `Countdown ${x.label} sec`,
        type: 'button',
        style: {
          text: `Countdown ${x.label} sec`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'setCountdown', options: { value: x.time, input: '', selectedIndex: '0' } }],
            up: [],
          },
        ],
        feedbacks: [],
      })
    })

    return titleGraphicsPresets
  }

  const getTransitionPresets = (): VMixPresetArray => {
    const transitionPresets: VMixPresetArray = [
      {
        category: 'Transitions',
        name: 'Transitions 1 to 4',
        type: 'text',
        text: 'Auto transition 1 to 4 with preset transition type and duration',
      },
    ]

    for (let i = 1; i < 5; i++) {
      transitionPresets.push({
        category: 'Transitions',
        name: `Transition ${i}`,
        type: 'button',
        style: {
          text: `Transition ${i}`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'transition', options: { functionID: `Transition${i}` as 'Transition1' } }],
            up: [],
          },
        ],
        feedbacks: [],
      })
    }

    for (let i = 1; i < 5; i++) {
      transitionPresets.push({
        category: 'Transitions',
        name: `Stinger ${i}`,
        type: 'button',
        style: {
          text: `Stinger ${i}`,
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'transition', options: { functionID: `Stinger${i}` as 'Stinger1' } }],
            up: [],
          },
        ],
        feedbacks: [],
      })
    }

    for (let i = 1; i < 5; i++) {
      transitionPresets.push(
        {
          category: 'Transitions',
          name: `Set Transition ${i}`,
          type: 'text',
          text: `Set the transition type and duration of Transition ${i}`,
        },
        {
          category: 'Transitions',
          name: `T${i} Set Cut`,
          type: 'button',
          style: {
            text: `T${i} Set Cut`,
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'setTransitionEffect',
                  options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Cut' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Transitions',
          name: `T${i} Set Fade`,
          type: 'button',
          style: {
            text: `T${i} Set Fade`,
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'setTransitionEffect',
                  options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Fade' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Transitions',
          name: `T${i} Set Zoom`,
          type: 'button',
          style: {
            text: `T${i} Set Zoom`,
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'setTransitionEffect',
                  options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Zoom' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Transitions',
          name: `T${i} Set Merge`,
          type: 'button',
          style: {
            text: `T${i} Set Merge`,
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                {
                  actionId: 'setTransitionEffect',
                  options: { functionID: `SetTransitionEffect${i}` as 'SetTransitionEffect1', value: 'Merge' },
                },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Transitions',
          name: `T${i} Set 250ms`,
          type: 'button',
          style: {
            text: `T${i} Set 250ms`,
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                { actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 250 } },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Transitions',
          name: `T${i} Set 500ms`,
          type: 'button',
          style: {
            text: `T${i} Set 500ms`,
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                { actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 500 } },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Transitions',
          name: `T${i} Set 1000ms`,
          type: 'button',
          style: {
            text: `T${i} Set 1000ms`,
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                { actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 1000 } },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          category: 'Transitions',
          name: `T${i} Set 2000ms`,
          type: 'button',
          style: {
            text: `T${i} Set 2000ms`,
            size: '18',
            color: combineRgb(255, 255, 255),
            bgcolor: combineRgb(0, 0, 0),
          },
          steps: [
            {
              down: [
                { actionId: 'setTransitionDuration', options: { functionID: 'SetTransitionDuration1', value: 2000 } },
              ],
              up: [],
            },
          ],
          feedbacks: [],
        }
      )
    }

    transitionPresets.push(
      {
        category: 'Transitions',
        name: 'Transition Mix',
        type: 'text',
        text: '',
      },
      {
        category: 'Transitions',
        name: 'Cut',
        type: 'button',
        style: {
          text: 'Cut',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              { actionId: 'transitionMix', options: { functionID: 'Cut', mix: 0, mixVariable: '', duration: '1000' } },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Fade',
        type: 'button',
        style: {
          text: 'Fade',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              { actionId: 'transitionMix', options: { functionID: 'Fade', mix: 0, mixVariable: '', duration: '1000' } },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Zoom',
        type: 'button',
        style: {
          text: 'Zoom',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              { actionId: 'transitionMix', options: { functionID: 'Zoom', mix: 0, mixVariable: '', duration: '1000' } },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Wipe',
        type: 'button',
        style: {
          text: 'Wipe',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              { actionId: 'transitionMix', options: { functionID: 'Wipe', mix: 0, mixVariable: '', duration: '1000' } },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Slide',
        type: 'button',
        style: {
          text: 'Slide',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'Slide', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Fly',
        type: 'button',
        style: {
          text: 'Fly',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              { actionId: 'transitionMix', options: { functionID: 'Fly', mix: 0, mixVariable: '', duration: '1000' } },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Cross Zoom',
        type: 'button',
        style: {
          text: 'Cross Zoom',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'CrossZoom', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Fly Rotate',
        type: 'button',
        style: {
          text: 'Fly Rotate',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'FlyRotate', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Cube',
        type: 'button',
        style: {
          text: 'Cube',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              { actionId: 'transitionMix', options: { functionID: 'Cube', mix: 0, mixVariable: '', duration: '1000' } },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Cube Zoom',
        type: 'button',
        style: {
          text: 'Cube Zoom',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'CubeZoom', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Vertical Wipe',
        type: 'button',
        style: {
          text: 'Vertical Wipe',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'VerticalWipe', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Vertical Slide',
        type: 'button',
        style: {
          text: 'Vertical Slide',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'VerticalSlide', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Merge',
        type: 'button',
        style: {
          text: 'Merge',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'Merge', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Wipe Reverse',
        type: 'button',
        style: {
          text: 'Wipe Reverse',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'WipeReverse', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Slide Reverse',
        type: 'button',
        style: {
          text: 'Slide Reverse',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'SlideReverse', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Vertical Wipe Reverse',
        type: 'button',
        style: {
          text: 'Vertical Wipe Reverse',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'VerticalWipeReverse', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Transitions',
        name: 'Vertical Slide Reverse',
        type: 'button',
        style: {
          text: 'Vertical Slide Reverse',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { functionID: 'VerticalSlideReverse', mix: 0, mixVariable: '', duration: '1000' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      }
    )

    return transitionPresets
  }

  const getVideoPlaybackPresets = (): VMixPresetArray => {
    const videoPlaybackPresets: VMixPresetArray = [
      {
        category: 'Video Playback',
        name: 'play',
        type: 'button',
        style: {
          text: 'play',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Play' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Pause',
        type: 'button',
        style: {
          text: 'Pause',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Pause' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Play Pause',
        type: 'button',
        style: {
          text: 'Play Pause',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'PlayPause' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Restart',
        type: 'button',
        style: {
          text: 'Restart',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'Restart' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Loop ON',
        type: 'button',
        style: {
          text: 'Loop ON',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'LoopOn' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Loop OFF',
        type: 'button',
        style: {
          text: 'Loop OFF',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoActions', options: { input: '', inputType: true, functionID: 'LoopOff' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Playhead 10 sec',
        type: 'button',
        style: {
          text: 'Playhead 10 sec',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              { actionId: 'videoPlayhead', options: { input: '', inputType: true, adjustment: 'Set', value: 10000 } },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Playhead +10 sec',
        type: 'button',
        style: {
          text: 'Playhead +10 sec',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'videoPlayhead',
                options: { input: '', inputType: true, adjustment: 'Increase', value: 10000 },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Playhead -10 sec',
        type: 'button',
        style: {
          text: 'Playhead -10 sec',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'videoPlayhead',
                options: { input: '', inputType: true, adjustment: 'Decrease', value: 10000 },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Mark In',
        type: 'button',
        style: {
          text: 'Mark In',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkIn' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Mark Out',
        type: 'button',
        style: {
          text: 'Mark Out',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkOut' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Clear In/Out',
        type: 'button',
        style: {
          text: 'Clear In/Out',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkReset' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Clear In',
        type: 'button',
        style: {
          text: 'Clear In',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkResetIn' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Clear Out',
        type: 'button',
        style: {
          text: 'Clear Out',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'videoMark', options: { input: '', inputType: true, functionID: 'MarkResetOut' } }],
            up: [],
          },
        ],
        feedbacks: [],
      },
      {
        category: 'Video Playback',
        name: 'Video Timecode',
        type: 'button',
        style: {
          text: 'Video Timecode',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [],
        feedbacks: [
          {
            feedbackId: 'videoTimer',
            options: {
              input: '',
              color: combineRgb(255, 255, 255),
              color30: combineRgb(255, 255, 0),
              color10: combineRgb(255, 0, 0),
              loop: false,
            },
          },
        ],
      },
    ]

    return videoPlaybackPresets
  }

  const getVMixFunctionsPresets = (): VMixPresetArray => {
    const vMixfunctionPresets: VMixPresetArray = [
      {
        category: 'vMix Functions',
        name: 'Toggle Multicorder',
        type: 'button',
        style: {
          text: 'Toggle Multicorder',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopMultiCorder', value: '' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'status',
            options: { status: 'multiCorder', value: '' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Functions',
        name: 'Toggle Recording',
        type: 'button',
        style: {
          text: 'Toggle Recording',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopRecording', value: '' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'status',
            options: { status: 'recording', value: '' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Functions',
        name: 'Toggle Stream',
        type: 'button',
        style: {
          text: 'Toggle Stream',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopStreaming', value: '' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'status',
            options: { status: 'streaming', value: '' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Functions',
        name: 'Toggle External',
        type: 'button',
        style: {
          text: 'Toggle External',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopExternal', value: '' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'status',
            options: { status: 'external', value: '' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Functions',
        name: 'Toggle Fullscreen',
        type: 'button',
        style: {
          text: 'Toggle Fullscreen',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'toggleFunctions', options: { functionID: 'Fullscreen', value: '' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'status',
            options: { status: 'fullscreen', value: '' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'vMix Functions',
        name: 'Toggle FTB',
        type: 'button',
        style: {
          text: 'Toggle FTB',
          size: '18',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'toggleFunctions', options: { functionID: 'FadeToBlack', value: '' } }],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'status',
            options: { status: 'fadeToBlack', value: '' },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
    ]

    return vMixfunctionPresets
  }

  const getButtonShiftPresets = (): VMixPresetArray => {
    const buttonShiftPresets: VMixPresetArray = [
      {
        category: 'Button Shift',
        name: 'Button Shifting',
        type: 'text',
        text: `Button Shifting is a feature unique in this module that allows actions/feedbacks to support pointing to 2 different things based on if the 'Shift' button is pressed or not.`,
      },
      {
        category: 'Button Shift',
        name: '',
        type: 'text',
        text: `The two options need to be split by the delimter set in the config, for example an Preview Input action set to "1|5" will preview input 1 by default, or 5 when Shift is pressed, essentially doubling the buttons on a page.`,
      },
      {
        category: 'Button Shift',
        name: '',
        type: 'text',
        text: `Some feedbacks, such as for preview/program can 'blink' through, so a solid green would indicate an input in preview, blinking green means the input on the other Shift being in preview.`,
      },
      {
        category: 'Button Shift',
        name: 'Shift',
        type: 'button',
        style: {
          text: 'Shift',
          size: '24',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [{ actionId: 'buttonShift', options: <any>[] }],
            up: [{ actionId: 'buttonShift', options: <any>[] }],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'buttonShift',
            options: {},
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Button Shift',
        name: `Preview 1 ${instance.config.shiftDelimiter} 5 to 4 ${instance.config.shiftDelimiter} 8`,
        type: 'text',
        text: '',
      },
      {
        category: 'Button Shift',
        name: 'PRV 1 / 5',
        type: 'button',
        style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [
          {
            down: [
              {
                actionId: 'previewInput',
                options: { mix: 0, mixVariable: '', input: `1${instance.config.shiftDelimiter}5` },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputPreview',
            options: {
              mix: 0,
              mixVariable: '',
              input: `1${instance.config.shiftDelimiter}5`,
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(0, 255, 0),
              tally: '',
            },
          },
          { feedbackId: 'buttonText', options: { text: `PRV 1${instance.config.shiftDelimiter}PRV 5` } },
        ],
      },
      {
        category: 'Button Shift',
        name: 'PRV 2 / 6',
        type: 'button',
        style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [
          {
            down: [
              {
                actionId: 'previewInput',
                options: { mix: 0, mixVariable: '', input: `2${instance.config.shiftDelimiter}6` },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputPreview',
            options: {
              mix: 0,
              mixVariable: '',
              input: `2${instance.config.shiftDelimiter}6`,
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(0, 255, 0),
              tally: '',
            },
          },
          { feedbackId: 'buttonText', options: { text: `PRV 2${instance.config.shiftDelimiter}PRV 6` } },
        ],
      },
      {
        category: 'Button Shift',
        name: 'PRV 3 / 7',
        type: 'button',
        style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [
          {
            down: [
              {
                actionId: 'previewInput',
                options: { mix: 0, mixVariable: '', input: `3${instance.config.shiftDelimiter}7` },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputPreview',
            options: {
              mix: 0,
              mixVariable: '',
              input: `3${instance.config.shiftDelimiter}7`,
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(0, 255, 0),
              tally: '',
            },
          },
          { feedbackId: 'buttonText', options: { text: `PRV 3${instance.config.shiftDelimiter}PRV 7` } },
        ],
      },
      {
        category: 'Button Shift',
        name: 'PRV 4 / 8',
        type: 'button',
        style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [
          {
            down: [
              {
                actionId: 'previewInput',
                options: { mix: 0, mixVariable: '', input: `4${instance.config.shiftDelimiter}8` },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputPreview',
            options: {
              mix: 0,
              mixVariable: '',
              input: `4${instance.config.shiftDelimiter}8`,
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(0, 255, 0),
              tally: '',
            },
          },
          { feedbackId: 'buttonText', options: { text: `PRV 4${instance.config.shiftDelimiter}PRV 8` } },
        ],
      },

      {
        category: 'Button Shift',
        name: `Program 1 ${instance.config.shiftDelimiter} 5 to 4 ${instance.config.shiftDelimiter} 8`,
        type: 'text',
        text: '',
      },
      {
        category: 'Button Shift',
        name: `PGM 1 / 5`,
        type: 'button',
        style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [
          {
            down: [
              {
                actionId: 'programCut',
                options: { mix: 0, mixVariable: '', input: `1${instance.config.shiftDelimiter}5` },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputLive',
            options: {
              mix: 0,
              mixVariable: '',
              input: `1${instance.config.shiftDelimiter}5`,
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(255, 0, 0),
              tally: '',
            },
          },
          { feedbackId: 'buttonText', options: { text: `PRV 1${instance.config.shiftDelimiter}PRV 5` } },
        ],
      },
      {
        category: 'Button Shift',
        name: 'PGM 2 / 6',
        type: 'button',
        style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [
          {
            down: [
              {
                actionId: 'programCut',
                options: { mix: 0, mixVariable: '', input: `2${instance.config.shiftDelimiter}6` },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputLive',
            options: {
              mix: 0,
              mixVariable: '',
              input: `2${instance.config.shiftDelimiter}6`,
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(255, 0, 0),
              tally: '',
            },
          },
          { feedbackId: 'buttonText', options: { text: `PRV 2${instance.config.shiftDelimiter}PRV 6` } },
        ],
      },
      {
        category: 'Button Shift',
        name: 'PGM 3 / 7',
        type: 'button',
        style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [
          {
            down: [
              {
                actionId: 'programCut',
                options: { mix: 0, mixVariable: '', input: `3${instance.config.shiftDelimiter}7` },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputLive',
            options: {
              mix: 0,
              mixVariable: '',
              input: `3${instance.config.shiftDelimiter}7`,
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(255, 0, 0),
              tally: '',
            },
          },
          { feedbackId: 'buttonText', options: { text: `PRV 3${instance.config.shiftDelimiter}PRV 7` } },
        ],
      },
      {
        category: 'Button Shift',
        name: 'PGM 4 / 8',
        type: 'button',
        style: { text: '', size: '24', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
        steps: [
          {
            down: [
              {
                actionId: 'programCut',
                options: { mix: 0, mixVariable: '', input: `4${instance.config.shiftDelimiter}8` },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'inputLive',
            options: {
              mix: 0,
              mixVariable: '',
              input: `4${instance.config.shiftDelimiter}8`,
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(255, 0, 0),
              tally: '',
            },
          },
          { feedbackId: 'buttonText', options: { text: `PRV 4${instance.config.shiftDelimiter}PRV 8` } },
        ],
      },
    ]

    return buttonShiftPresets
  }

  const presets: VMixPresetArray = [
    ...getMixPresets(),
    ...getAudioPresets(),
    ...getCallPresets(),
    ...getGeneralPresets(),
    ...getMultiviewLayersPresets(),
    ...getLayerPanZoomPresets(),
    ...getOutputPresets(),
    ...getOverlayPresets(),
    ...getPlayListPresets(),
    ...getReplayPresets(),
    ...getSlideListPresets(),
    ...getTitleGraphicsPresets(),
    ...getTransitionPresets(),
    ...getVideoPlaybackPresets(),
    ...getVMixFunctionsPresets(),
    ...getButtonShiftPresets(),

    // Button Shift
  ]

  return presets as unknown as CompanionPresetDefinitions
}
