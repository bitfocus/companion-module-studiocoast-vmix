import type { CompanionVariableDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'
import { formatTime } from '../utils.js'

export type GeneralVariablesSchema = {
  connected_state: string
  ftb_active: string
  playlist_active: string
  fullscreen_active: string
  external_active: string
  multicorder_active: string
  stream_1_active: string
  stream_2_active: string
  stream_3_active: string
  stream_4_active: string
  stream_5_active: string
  recording_active: string
  recording_duration: string
  recording_hms: string
  recording_filename1: string
  recording_filepath1: string
  recording_filename2: string
  recording_filepath2: string
  preset: string
}

export const generalDefinitions = (_instance: VMixInstance): CompanionVariableDefinitions<GeneralVariablesSchema> => {
  const definitions: CompanionVariableDefinitions<GeneralVariablesSchema> = {
    connected_state: { name: 'Connected to vMix' },
    ftb_active: { name: 'Fade To Black Active' },
    playlist_active: { name: 'playList Active' },
    fullscreen_active: { name: 'Fullscreen Output Active' },
    external_active: { name: 'External Output Active' },
    multicorder_active: { name: 'MultiCorder Active' },
    stream_1_active: { name: 'Stream 1 Active' },
    stream_2_active: { name: 'Stream 2 Active' },
    stream_3_active: { name: 'Stream 3 Active' },
    stream_4_active: { name: 'Stream 4 Active' },
    stream_5_active: { name: 'Stream 5 Active' },
    recording_active: { name: 'Recording Active' },
    recording_duration: { name: 'Recording Duration' },
    recording_hms: { name: 'Recording HH:MM:SS' },
    recording_filename1: { name: 'Recording File Name 1' },
    recording_filepath1: { name: 'Recording File Path 1' },
    recording_filename2: { name: 'Recording File Name 2' },
    recording_filepath2: { name: 'Recording File Path 2' },
    preset: { name: 'Preset' },
  }

  return definitions
}

export const generalValues = async (instance: VMixInstance): Promise<GeneralVariablesSchema> => {
  const recordingFile1 = instance.data.recording.filename1.split('\\')
  const recordingFile2 = instance.data.recording.filename2.split('\\')
  const recordingFilename1 = recordingFile1[recordingFile1.length - 1] || ''
  const recordingFilepath1 = recordingFile1
  recordingFilepath1.pop()
  const recordingFilename2 = recordingFile2[recordingFile2.length - 1] || ''
  const recordingFilepath2 = recordingFile2
  recordingFilepath2.pop()

  const variables: GeneralVariablesSchema = {
    connected_state: instance.connected.toString(),
    ftb_active: instance.data.status.fadeToBlack.toString(),
    playlist_active: instance.data.status.playList.toString(),
    fullscreen_active: instance.data.status.fullscreen.toString(),
    external_active: instance.data.status.external.toString(),
    multicorder_active: instance.data.status.multiCorder.toString(),
    stream_1_active: instance.data.status.stream[0].toString(),
    stream_2_active: instance.data.status.stream[1].toString(),
    stream_3_active: instance.data.status.stream[2].toString(),
    stream_4_active: instance.data.status.stream[3].toString(),
    stream_5_active: instance.data.status.stream[4].toString(),
    recording_active: instance.data.status.recording.toString(),
    recording_duration: formatTime(instance.data.recording.duration, 's', 'auto'),
    recording_hms: formatTime(instance.data.recording.duration, 's', 'hh:mm:ss'),
    recording_filename1: recordingFilename1,
    recording_filepath1: recordingFilepath1.join('\\') + '\\',
    recording_filename2: recordingFilename2,
    recording_filepath2: recordingFilepath2.join('\\') + '\\',
    preset: instance.data.preset,
  }

  return variables
}
