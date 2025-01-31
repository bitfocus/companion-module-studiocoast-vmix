import { CompanionVariableDefinition, CompanionVariableValue } from '@companion-module/base'
import VMixInstance from '../'

export const replayDefinitions = (_instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  definitions.push(
    { name: 'Replay Recording', variableId: 'replay_recording' },
    { name: 'Replay Live', variableId: 'replay_live' },
    { name: 'Replay Forward', variableId: 'replay_forward' },
    { name: 'Replay Channel Mode', variableId: 'replay_channel_mode' },
    { name: 'Replay Events', variableId: 'replay_events' },
    { name: 'Replay Events A', variableId: 'replay_eventsa' },
    { name: 'Replay Events B', variableId: 'replay_eventsb' },
    { name: 'Replay Camera A', variableId: 'replay_cameraa' },
    { name: 'Replay Camera B', variableId: 'replay_camerab' },
    { name: 'Replay Speed', variableId: 'replay_speed' },
    { name: 'Replay Speed A', variableId: 'replay_speeda' },
    { name: 'Replay Speed B', variableId: 'replay_speedb' },
    { name: 'Replay Timecode', variableId: 'replay_timecode' },
    { name: 'Replay Timecode A', variableId: 'replay_timecodea' },
    { name: 'Replay Timecode B', variableId: 'replay_timecodeb' }
  )

  return definitions
}

export const replayValues = async (instance: VMixInstance): Promise<Map<string, CompanionVariableValue>> => {
  const variables = new Map()

  variables.set('replay_recording', instance.data.replay.recording.toString())
  variables.set('replay_live', instance.data.replay.live.toString())
  variables.set('replay_forward', instance.data.replay.forward.toString())
  variables.set('replay_channel_mode', instance.data.replay.channelMode)
  variables.set('replay_events', instance.data.replay.events)
  variables.set('replay_eventsa', instance.data.replay.eventsA)
  variables.set('replay_eventsb', instance.data.replay.eventsB)
  variables.set('replay_cameraa', instance.data.replay.cameraA)
  variables.set('replay_camerab', instance.data.replay.cameraB)
  variables.set('replay_speed', instance.data.replay.speed)
  variables.set('replay_speeda', instance.data.replay.speedA)
  variables.set('replay_speedb', instance.data.replay.speedB)
  variables.set('replay_timecode', instance.data.replay.timecode)
  variables.set('replay_timecodea', instance.data.replay.timecodeA)
  variables.set('replay_timecodeb', instance.data.replay.timecodeB)

  return variables
}
