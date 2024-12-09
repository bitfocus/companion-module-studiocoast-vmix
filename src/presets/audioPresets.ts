import { combineRgb } from '@companion-module/base'
import { VMixPresetArray } from './presets'

export const getAudioPresets = (): VMixPresetArray => {
  const busses: ('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G')[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

  const audioPresets: VMixPresetArray = [
    {
      category: `Audio`,
      name: 'Input Audio',
      type: 'text',
      text: 'Example presets here use input 1, but the action/feedback support referencing an input by Name, Number, or GUID, and also supports parsing Variables'
    },
    {
      category: 'Audio',
      name: 'Toggle Audio',
      type: 'button',
      style: {
        text: 'Toggle Audio',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audio', options: { input: '1', functionID: 'Audio' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputAudio',
          options: {
            input: '1'
          },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
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
            color36: combineRgb(0, 128, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: 'Set Audio On',
      type: 'button',
      style: {
        text: 'Set Audio On',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audio', options: { input: '1', functionID: 'AudioOn' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputAudio',
          options: {
            input: '1'
          },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
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
            color36: combineRgb(0, 128, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: 'Set Audio Off',
      type: 'button',
      style: {
        text: 'Set Audio Off',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audio', options: { input: '1', functionID: 'AudioOff' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputAudio',
          options: {
            input: '1'
          },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
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
            color36: combineRgb(0, 128, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: 'Audio Auto Toggle',
      type: 'button',
      style: {
        text: 'Audio Auto Toggle',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audioAuto', options: { input: '1', functionID: 'AudioAuto' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputAudioAuto',
          options: {
            input: '1'
          },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: 'Input Solo',
      type: 'button',
      style: {
        text: 'Input Solo',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'solo', options: { input: '1', functionID: 'Solo' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputSolo',
          options: { input: '1' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: `Send Input to Master`,
      type: 'button',
      style: {
        text: 'Send Input to Master',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audioBus', options: { input: '1', value: 'Master', functionID: 'AudioBus' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputBusRouting',
          options: { input: '1', value: 'Master' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: `Send Input to Bus A`,
      type: 'button',
      style: {
        text: 'Send Input to Bus A',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audioBus', options: { input: '1', value: 'A', functionID: 'AudioBus' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputBusRouting',
          options: { input: '1', value: 'A' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: `Send Input to Bus B`,
      type: 'button',
      style: {
        text: 'Send Input to Bus B',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audioBus', options: { input: '1', value: 'B', functionID: 'AudioBus' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputBusRouting',
          options: { input: '1', value: 'Master' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: `Send Input to Bus C`,
      type: 'button',
      style: {
        text: 'Send Input to Bus C',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audioBus', options: { input: '1', value: 'C', functionID: 'AudioBus' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputBusRouting',
          options: { input: '1', value: 'C' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: `Send Input to Bus D`,
      type: 'button',
      style: {
        text: 'Send Input to Bus D',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audioBus', options: { input: '1', value: 'D', functionID: 'AudioBus' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputBusRouting',
          options: { input: '1', value: 'D' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: `Send Input to Bus E`,
      type: 'button',
      style: {
        text: 'Send Input to Bus E',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audioBus', options: { input: '1', value: 'E', functionID: 'AudioBus' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputBusRouting',
          options: { input: '1', value: 'E' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: `Send Input to Bus F`,
      type: 'button',
      style: {
        text: 'Send Input to Bus F',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audioBus', options: { input: '1', value: 'F', functionID: 'AudioBus' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputBusRouting',
          options: { input: '1', value: 'F' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: `Send Input to Bus G`,
      type: 'button',
      style: {
        text: 'Send Input to Bus G',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'audioBus', options: { input: '1', value: 'G', functionID: 'AudioBus' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'inputBusRouting',
          options: { input: '1', value: 'G' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 255, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: 'Input Volume Fade',
      type: 'text',
      text: 'Fade the Volume on an Input over a default of 2000ms to a target %'
    },
    {
      category: 'Audio',
      name: 'Input 1 Vol 0%',
      type: 'button',
      style: {
        text: 'Input 1 Vol 0%',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '0', fadeTime: '2000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Audio',
      name: 'Input 1 Vol 25%',
      type: 'button',
      style: {
        text: 'Input 1 Vol 25%',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '25', fadeTime: '2000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Audio',
      name: 'Input 1 Vol 50%',
      type: 'button',
      style: {
        text: 'Input 1 Vol 50%',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '50', fadeTime: '2000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Audio',
      name: 'Input 1 Vol 75%',
      type: 'button',
      style: {
        text: 'Input 1 Vol 75%',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '75', fadeTime: '2000' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Audio',
      name: 'Input 1 Vol 100%',
      type: 'button',
      style: {
        text: 'Input 1 Vol 100%',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '100', fadeTime: '2000' } }],
          up: []
        }
      ],
      feedbacks: []
    }
  ]

  audioPresets.push(
    {
      category: 'Audio',
      name: `Bus Master`,
      type: 'text',
      text: ''
    },
    {
      category: 'Audio',
      name: `Bus Master Mute`,
      type: 'button',
      style: {
        text: `Bus Master Mute`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'busXAudio', options: { value: 'Master', functionID: 'BusXAudio' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'busMute',
          options: { value: 'Master' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
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
            color36: combineRgb(0, 128, 0)
          }
        }
      ]
    },
    {
      category: 'Audio',
      name: `Bus Master 0%`,
      type: 'button',
      style: {
        text: `Bus Master 0%`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '0' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Audio',
      name: `Bus Master 25%`,
      type: 'button',
      style: {
        text: `Bus Master 25%`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '25' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Audio',
      name: `Bus Master 50%`,
      type: 'button',
      style: {
        text: `Bus Master 50%`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '50' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Audio',
      name: `Bus Master 75%`,
      type: 'button',
      style: {
        text: `Bus Master 75%`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '75' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Audio',
      name: `Bus Master 100%`,
      type: 'button',
      style: {
        text: `Bus Master 100%`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '100' } }],
          up: []
        }
      ],
      feedbacks: []
    },
    {
      category: 'Audio',
      name: `Bus Master\nMeters`,
      type: 'button',
      style: {
        text: `Bus Master\nMeters`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'busXAudio', options: { value: 'Master', functionID: 'BusXAudio' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'busVolumeMeter',
          options: { value: 'Master' }
        },
        {
          feedbackId: 'busMute',
          options: { value: 'Master' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    }
  )

  busses.forEach((bus) => {
    audioPresets.push(
      {
        category: 'Audio',
        name: `Bus ${bus}`,
        type: 'text',
        text: ''
      },
      {
        category: 'Audio',
        name: `Bus ${bus} Mute`,
        type: 'button',
        style: {
          text: `Bus ${bus} Mute`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'busXAudio', options: { value: bus, functionID: 'BusXAudio' } }],
            up: []
          }
        ],
        feedbacks: [
          {
            feedbackId: 'busMute',
            options: { value: bus },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0)
            }
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
              color36: combineRgb(0, 128, 0)
            }
          }
        ]
      },
      {
        category: 'Audio',
        name: `Bus ${bus} solo`,
        type: 'button',
        style: {
          text: `Bus ${bus} solo`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'busXSolo', options: { value: bus, functionID: 'BusXSolo' } }],
            up: []
          }
        ],

        feedbacks: [
          {
            feedbackId: 'busSolo',
            options: { value: bus },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 255, 0)
            }
          }
        ]
      },
      {
        category: 'Audio',
        name: `Bus ${bus} 0%`,
        type: 'button',
        style: {
          text: `Bus ${bus} 0%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '0' } }],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Audio',
        name: `Bus ${bus} 25%`,
        type: 'button',
        style: {
          text: `Bus ${bus} 25%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '25' } }],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Audio',
        name: `Bus ${bus} 50%`,
        type: 'button',
        style: {
          text: `Bus ${bus} 50%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '50' } }],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Audio',
        name: `Bus ${bus} 75%`,
        type: 'button',
        style: {
          text: `Bus ${bus} 75%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '75' } }],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Audio',
        name: `Bus ${bus} 100%`,
        type: 'button',
        style: {
          text: `Bus ${bus} 100%`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '100' } }],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: 'Audio',
        name: `Bus ${bus}\nMeters`,
        type: 'button',
        style: {
          text: `Bus ${bus}\nMeters`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'busXAudio', options: { value: bus, functionID: 'BusXAudio' } }],
            up: []
          }
        ],
        feedbacks: [
          {
            feedbackId: 'busVolumeMeter',
            options: { value: bus }
          },
          {
            feedbackId: 'busMute',
            options: { value: bus },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0)
            }
          }
        ]
      },
      {
        category: 'Audio',
        name: 'Send Bus to Master',
        type: 'button',
        style: {
          text: 'Send Bus to Master',
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'busXSendToMaster', options: { value: 'A' } }],
            up: []
          }
        ],
        feedbacks: [
          {
            feedbackId: 'busSendToMaster',
            options: { value: bus },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(0, 255, 0)
            }
          }
        ]
      }
    )
  })

  return audioPresets
}
