import type { CompanionPresetDefinitions, CompanionPresetSection, CompanionPresetGroup } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

const busses: ('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G')[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

export const getAudioDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const audioPresets: CompanionPresetDefinitions<VMixInstanceTypes> = {
    audio_audioToggle: {
      name: 'Toggle Audio',
      type: 'simple',
      style: {
        text: 'Toggle Audio',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
        {
          feedbackId: 'liveInputVolume',
          options: {
            input: '1',
            colorTxt: false,
            colorBG: false,
            colorBase: 0xffffff,
            color: 0xff0000,
            color1: 0xffff00,
            color6: 0x00ff00,
            color18: 0x00c000,
            color36: 0x008000,
          },
        },
      ],
    },

    audio_audioOn: {
      name: 'Set Audio On',
      type: 'simple',
      style: {
        text: 'Set Audio On',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
        {
          feedbackId: 'liveInputVolume',
          options: {
            input: '1',
            colorTxt: false,
            colorBG: false,
            colorBase: 0xffffff,
            color: 0xff0000,
            color1: 0xffff00,
            color6: 0x00ff00,
            color18: 0x00c000,
            color36: 0x008000,
          },
        },
      ],
    },

    audio_audioOff: {
      name: 'Set Audio Off',
      type: 'simple',
      style: {
        text: 'Set Audio Off',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
        {
          feedbackId: 'liveInputVolume',
          options: {
            input: '1',
            colorTxt: false,
            colorBG: false,
            colorBase: 0xffffff,
            color: 0xff0000,
            color1: 0xffff00,
            color6: 0x00ff00,
            color18: 0x00c000,
            color36: 0x008000,
          },
        },
      ],
    },

    audio_AudioAutoToggle: {
      name: 'Audio Auto Toggle',
      type: 'simple',
      style: {
        text: 'Audio Auto Toggle',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    audio_inputSolo: {
      name: 'Input Solo',
      type: 'simple',
      style: {
        text: 'Input Solo',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    },

    audio_inputSendToMaster: {
      name: `Send Input to Master`,
      type: 'simple',
      style: {
        text: 'Send Input to Master',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    },

    audio_inputSendToBusA: {
      name: `Send Input to Bus A`,
      type: 'simple',
      style: {
        text: 'Send Input to Bus A',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    },

    audio_inputSendToBusB: {
      name: `Send Input to Bus B`,
      type: 'simple',
      style: {
        text: 'Send Input to Bus B',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    },

    audio_inputSendToBusC: {
      name: `Send Input to Bus C`,
      type: 'simple',
      style: {
        text: 'Send Input to Bus C',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    },

    audio_inputSendToBusD: {
      name: `Send Input to Bus D`,
      type: 'simple',
      style: {
        text: 'Send Input to Bus D',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    },

    audio_inputSendToBusE: {
      name: `Send Input to Bus E`,
      type: 'simple',
      style: {
        text: 'Send Input to Bus E',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    },

    audio_inputSendToBusF: {
      name: `Send Input to Bus F`,
      type: 'simple',
      style: {
        text: 'Send Input to Bus F',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    },

    audio_inputSendToBusG: {
      name: `Send Input to Bus G`,
      type: 'simple',
      style: {
        text: 'Send Input to Bus G',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    },

    audio_inputVolume0: {
      name: 'Input 1 Vol 0%',
      type: 'simple',
      style: {
        text: 'Input 1 Vol 0%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '0', fadeTime: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_inputVolume25: {
      name: 'Input 1 Vol 25%',
      type: 'simple',
      style: {
        text: 'Input 1 Vol 25%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '25', fadeTime: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_inputVolume50: {
      name: 'Input 1 Vol 50%',
      type: 'simple',
      style: {
        text: 'Input 1 Vol 50%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '50', fadeTime: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_inputVolume75: {
      name: 'Input 1 Vol 75%',
      type: 'simple',
      style: {
        text: 'Input 1 Vol 75%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '75', fadeTime: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_inputVolume100: {
      name: 'Input 1 Vol 100%',
      type: 'simple',
      style: {
        text: 'Input 1 Vol 100%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '100', fadeTime: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_inputVolumeFade0: {
      name: 'Fade Input 1 Vol 0%',
      type: 'simple',
      style: {
        text: 'Fade Input 1 Vol 0%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '0', fadeTime: '2000' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_inputVolumeFade25: {
      name: 'Fade Input 1 Vol 25%',
      type: 'simple',
      style: {
        text: 'Fade Input 1 Vol 25%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '25', fadeTime: '2000' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_inputVolumeFade50: {
      name: 'Fade Input 1 Vol 50%',
      type: 'simple',
      style: {
        text: 'Fade Input 1 Vol 50%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '50', fadeTime: '2000' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_inputVolumeFade75: {
      name: 'Fade Input 1 Vol 75%',
      type: 'simple',
      style: {
        text: 'Fade Input 1 Vol 75%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '75', fadeTime: '2000' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_inputVolumeFade100: {
      name: 'Fade Input 1 Vol 100%',
      type: 'simple',
      style: {
        text: 'Fade Input 1 Vol 100%',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setVolumeFade', options: { input: '1', fadeMin: '100', fadeTime: '2000' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_busMasterMute: {
      name: `Bus Master Mute`,
      type: 'simple',
      style: {
        text: `Bus Master\nMute`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
        {
          feedbackId: 'liveBusVolume',
          options: {
            value: 'Master',
            colorTxt: false,
            colorBG: false,
            colorBase: 0xffffff,
            color: 0xff0000,
            color1: 0xffff00,
            color6: 0x00ff00,
            color18: 0x00c000,
            color36: 0x008000,
          },
        },
      ],
    },

    audio_busMaster0: {
      name: `Bus Master\n0%`,
      type: 'simple',
      style: {
        text: `Bus Master\n0%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_busMaster25: {
      name: `Bus Master\n25%`,
      type: 'simple',
      style: {
        text: `Bus Master\n25%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '25' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_busMaster50: {
      name: `Bus Master\n50%`,
      type: 'simple',
      style: {
        text: `Bus Master\n50%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '50' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_busMaster75: {
      name: `Bus Master\n75%`,
      type: 'simple',
      style: {
        text: `Bus Master\n75%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '75' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_busMaster100: {
      name: `Bus Master\n100%`,
      type: 'simple',
      style: {
        text: `Bus Master\n100%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: 'Master', adjustment: 'Set', amount: '100' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audio_busMasterMeters: {
      name: `Bus Master\nMeters`,
      type: 'simple',
      style: {
        text: `Bus Master\nMeters`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },
  }

  busses.forEach((bus) => {
    audioPresets[`audio_bus${bus}Mute`] = {
      name: `Bus ${bus}\nMute`,
      type: 'simple',
      style: {
        text: `Bus ${bus}\nMute`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
        {
          feedbackId: 'liveBusVolume',
          options: {
            value: bus,
            colorTxt: false,
            colorBG: false,
            colorBase: 0xffffff,
            color: 0xff0000,
            color1: 0xffff00,
            color6: 0x00ff00,
            color18: 0x00c000,
            color36: 0x008000,
          },
        },
      ],
    }

    audioPresets[`audio_bus${bus}Solo`] = {
      name: `Bus ${bus}\nsolo`,
      type: 'simple',
      style: {
        text: `Bus ${bus}\nsolo`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xffff00,
          },
        },
      ],
    }

    audioPresets[`audio_bus${bus}0`] = {
      name: `Bus ${bus}\n0%`,
      type: 'simple',
      style: {
        text: `Bus ${bus}\n0%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '0' } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    audioPresets[`audio_bus${bus}25`] = {
      name: `Bus ${bus}\n25%`,
      type: 'simple',
      style: {
        text: `Bus ${bus}\n25%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '25' } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    audioPresets[`audio_bus${bus}50`] = {
      name: `Bus ${bus}\n50%`,
      type: 'simple',
      style: {
        text: `Bus ${bus}\n50%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '50' } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    audioPresets[`audio_bus${bus}75`] = {
      name: `Bus ${bus}\n75%`,
      type: 'simple',
      style: {
        text: `Bus ${bus}\n75%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '75' } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    audioPresets[`audio_bus${bus}100`] = {
      name: `Bus ${bus}\n100%`,
      type: 'simple',
      style: {
        text: `Bus ${bus}\n100%`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'setBusVolume', options: { value: bus, adjustment: 'Set', amount: '100' } }],
          up: [],
        },
      ],
      feedbacks: [],
    }

    audioPresets[`audio_bus${bus}Meters`] = {
      name: `Bus ${bus}\nMeters`,
      type: 'simple',
      style: {
        text: `Bus ${bus}\nMeters`,
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
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
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    }

    audioPresets[`audio_bus${bus}SendToMaster`] = {
      name: 'Send Bus to Master',
      type: 'simple',
      style: {
        text: 'Send Bus to Master',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'busXSendToMaster', options: { value: 'A', functionID: 'BusXSendToMaster' } }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'busSendToMaster',
          options: { value: bus },
          style: {
            color: 0x000000,
            bgcolor: 0x00ff00,
          },
        },
      ],
    }
  })

  return audioPresets
}

export const getAudioStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const busGroups: CompanionPresetGroup<VMixInstanceTypes>[] = busses.map((bus) => {
    return {
      id: `audioBus${bus}`,
      type: 'simple',
      name: `Bus ${bus}`,
      description: `Bus ${bus} volume level`,
      presets: [
        `audio_bus${bus}Mute`,
        `audio_bus${bus}Solo`,
        `audio_bus${bus}0`,
        `audio_bus${bus}25`,
        `audio_bus${bus}50`,
        `audio_bus${bus}75`,
        `audio_bus${bus}100`,
        `audio_bus${bus}Meters`,
        `audio_bus${bus}SendToMaster`,
      ],
    }
  })

  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'audioBusStructure',
      name: 'Audio Bus',
      description: 'Bus presets such as Mute, Solo, Routing, Volume, etc...',
      definitions: [
        {
          id: 'audioBusMaster',
          type: 'simple',
          name: 'Bus Master',
          description: 'Master volume level',
          presets: ['audio_busMasterMute', 'audio_busMaster0', 'audio_busMaster25', 'audio_busMaster50', 'audio_busMaster75', 'audio_busMaster100', 'audio_busMasterMeters'],
        },
        ...busGroups,
      ],
    },
    {
      id: 'audioInputStructure',
      name: 'Audio Input',
      description: '',
      definitions: [
        {
          id: 'audioInputStatePresets',
          type: 'simple',
          name: 'Input State',
          description: 'Mute / Audio Auto / Solo',
          presets: ['audio_audioToggle', 'audio_audioOn', 'audio_audioOff', 'audio_AudioAutoToggle', 'audio_inputSolo'],
        },
        {
          id: 'audioInputVolumePresets',
          type: 'simple',
          name: 'Input Volume',
          description: 'Set an inputs volume',
          presets: ['audio_inputVolume0', 'audio_inputVolume25', 'audio_inputVolume50', 'audio_inputVolume75', 'audio_inputVolume100'],
        },
        {
          id: 'audioInputVolumeFadePresets',
          type: 'simple',
          name: 'Input Volume Fade',
          description: 'Fade an inputs volume over time',
          presets: ['audio_inputVolumeFade0', 'audio_inputVolumeFade25', 'audio_inputVolumeFade50', 'audio_inputVolumeFade75', 'audio_inputVolumeFade100'],
        },
        {
          id: 'audioInputRoutingPresets',
          type: 'simple',
          name: 'Input Routing',
          description: 'Routing an Input to an Audio Bus',
          presets: [
            'audio_inputSendToMaster',
            'audio_inputSendToBusA',
            'audio_inputSendToBusB',
            'audio_inputSendToBusC',
            'audio_inputSendToBusD',
            'audio_inputSendToBusE',
            'audio_inputSendToBusF',
            'audio_inputSendToBusG',
          ],
        },
      ],
    },
    {
      id: 'audioPresetsStructure',
      name: 'Audio Presets',
      description: '',
      definitions: [
        {
          id: 'audioPresets',
          type: 'simple',
          name: 'Audio Presets',
          description: 'Save the current state of vMix Busses and Inputs to',
          presets: ['audioPreset_save', 'audioPreset_load', 'audioPreset_routing', 'audioPreset_delete'],
        },
      ],
    },
  ]

  return structure
}
