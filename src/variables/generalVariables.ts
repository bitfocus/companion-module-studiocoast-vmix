import type { CompanionVariableDefinition } from '@companion-module/base'
import type VMixInstance from '..'
import { formatTime } from '../utils'
import type { InstanceVariableValue } from './variables'

type VariablesGeneralIDs =
  | `connected_state`
  | `ftb_active`
  | 'playlist_active'
  | 'fullscreen_active'
  | 'external_active'
  | 'multicorder_active'
  | 'stream_1_active'
  | 'stream_2_active'
  | 'stream_3_active'
  | 'stream_4_active'
  | 'stream_5_active'
  | 'recording_active'
  | 'recording_duration'
  | 'recording_hms'
  | 'recording_filename1'
  | 'recording_filepath1'
  | 'recording_filename2'
  | 'recording_filepath2'
  | 'preset'

type VariablesGeneralValues = Record<VariablesGeneralIDs, string | number | undefined>

export const generalDefinitions = (_instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  definitions.push(
    { name: 'Connected to vMix', variableId: 'connected_state' },
    { name: 'Fade To Black Active', variableId: 'ftb_active' },
    { name: 'playList Active', variableId: 'playlist_active' },
    { name: 'Fullscreen Output Active', variableId: 'fullscreen_active' },
    { name: 'External Output Active', variableId: 'external_active' },
    { name: 'MultiCorder Active', variableId: 'multicorder_active' },
    { name: 'Stream 1 Active', variableId: 'stream_1_active' },
    { name: 'Stream 2 Active', variableId: 'stream_2_active' },
    { name: 'Stream 3 Active', variableId: 'stream_3_active' },
    { name: 'Stream 4 Active', variableId: 'stream_4_active' },
    { name: 'Stream 5 Active', variableId: 'stream_5_active' },
    { name: 'Recording Active', variableId: 'recording_active' },
    { name: 'Recording Duration', variableId: 'recording_duration' },
    { name: 'Recording HH:MM:SS', variableId: 'recording_hms' },
    { name: 'Recording File Name 1', variableId: 'recording_filename1' },
    { name: 'Recording File Path 1', variableId: 'recording_filepath1' },
    { name: 'Recording File Name 2', variableId: 'recording_filename2' },
    { name: 'Recording File Path 2', variableId: 'recording_filepath2' },
    { name: 'Preset', variableId: 'preset' },
  )

  return definitions
}

export const generalValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const recordingFile1 = instance.data.recording.filename1.split('\\')
  const recordingFile2 = instance.data.recording.filename2.split('\\')
  const recordingFilename1 = recordingFile1[recordingFile1.length - 1] || ''
  const recordingFilepath1 = recordingFile1
  recordingFilepath1.pop()
  const recordingFilename2 = recordingFile2[recordingFile2.length - 1] || ''
  const recordingFilepath2 = recordingFile2
  recordingFilepath2.pop()

  const variables: VariablesGeneralValues = {
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
