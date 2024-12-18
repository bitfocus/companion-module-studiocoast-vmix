import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '..'
import { formatTime } from '../utils'
import { InstanceVariableValue } from '../variables'

export const generalDefinitions = (instance: VMixInstance): CompanionVariableDefinition[] => {
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
    { name: 'Recording File Path 2', variableId: 'recording_filepath2' }
  )

  // Deprecated
  instance.timers.forEach((timer) => {
    const formats = ['hh:mm:ss', 'mm:ss', 'mm:ss.ms', 'mm:ss.sss']
    const dataArr = [
      timer.get({ defaultValue: '00:00:00', format: 'hh:mm:ss' }),
      timer.get({ defaultValue: '00:00', format: 'mm:ss' }),
      timer.get({ defaultValue: '00:00.0', format: 'mm:ss.ms' }),
      timer.get({ defaultValue: '00:00.000', format: 'mm:ss.sss' })
    ]

    dataArr.forEach((data, index) => {
      const prefix = `timer_${timer.id}_${formats[index]}_`

      for (const key in data) {
        definitions.push({ name: `Timer ${timer.id} ${formats[index]} ${key}`, variableId: prefix + key })
      }
    })
  })

  return definitions
}

export const generalValues = async (instance: VMixInstance): Promise<InstanceVariableValue> => {
  const variables: InstanceVariableValue = {}

  variables['connected_state'] = instance.connected.toString()
  variables['ftb_active'] = instance.data.status.fadeToBlack.toString()
  variables['playlist_active'] = instance.data.status.playList.toString()
  variables['fullscreen_active'] = instance.data.status.fullscreen.toString()
  variables['external_active'] = instance.data.status.external.toString()
  variables['multicorder_active'] = instance.data.status.multiCorder.toString()
  variables['stream_1_active'] = instance.data.status.stream[0].toString()
  variables['stream_2_active'] = instance.data.status.stream[1].toString()
  variables['stream_3_active'] = instance.data.status.stream[2].toString()
  variables['stream_4_active'] = instance.data.status.stream[3].toString()
  variables['stream_5_active'] = instance.data.status.stream[4].toString()
  variables['recording_active'] = instance.data.status.recording.toString()
  variables['recording_duration'] = formatTime(instance.data.recording.duration, 's', 'auto')
  variables['recording_hms'] = formatTime(instance.data.recording.duration, 's', 'hh:mm:ss')

  const recordingFile1 = instance.data.recording.filename1.split('\\')
  const recordingFile2 = instance.data.recording.filename2.split('\\')
  const recordingFilename1 = recordingFile1[recordingFile1.length - 1] || ''
  const recordingFilepath1 = recordingFile1
  recordingFilepath1.pop()
  const recordingFilename2 = recordingFile2[recordingFile2.length - 1] || ''
  const recordingFilepath2 = recordingFile2
  recordingFilepath2.pop()

  variables['recording_filename1'] = recordingFilename1
  variables['recording_filepath1'] = recordingFilepath1.join('\\') + '\\'
  variables['recording_filename2'] = recordingFilename2
  variables['recording_filepath2'] = recordingFilepath2.join('\\') + '\\'

  return variables
}
