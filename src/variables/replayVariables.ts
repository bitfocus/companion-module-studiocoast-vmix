import { CompanionVariableDefinition } from '@companion-module/base'
import VMixInstance from '../'

type VariablesReplayIDs =
  | 'replay_recording'
  | 'replay_live'
  | 'replay_forward'
  | 'replay_channel_mode'
  | 'replay_events'
  | 'replay_eventsa'
  | 'replay_eventsb'
  | 'replay_cameraa'
  | 'replay_camerab'
  | 'replay_speed'
  | 'replay_speeda'
  | 'replay_speedb'
  | 'replay_timecode'
  | 'replay_timecodea'
  | 'replay_timecodeb'

type VariablesReplayValues = Partial<Record<VariablesReplayIDs, string | number | undefined>>

export const replayDefinitions = (instance: VMixInstance): CompanionVariableDefinition[] => {
  const definitions: CompanionVariableDefinition[] = []

  if (!instance.config.variablesShowReplay) return definitions

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

export const replayValues = async (instance: VMixInstance): Promise<VariablesReplayValues> => {
  const variables: VariablesReplayValues = {}

  if (!instance.config.variablesShowReplay) return variables

  variables.replay_recording = instance.data.replay.recording.toString()
  variables.replay_live = instance.data.replay.live.toString()
  variables.replay_forward = instance.data.replay.forward.toString()
  variables.replay_channel_mode = instance.data.replay.channelMode
  variables.replay_events = instance.data.replay.events
  variables.replay_eventsa = instance.data.replay.eventsA
  variables.replay_eventsb = instance.data.replay.eventsB
  variables.replay_cameraa = instance.data.replay.cameraA
  variables.replay_camerab = instance.data.replay.cameraB
  variables.replay_speed = instance.data.replay.speed
  variables.replay_speeda = instance.data.replay.speedA
  variables.replay_speedb = instance.data.replay.speedB
  variables.replay_timecode = instance.data.replay.timecode
  variables.replay_timecodea = instance.data.replay.timecodeA
  variables.replay_timecodeb = instance.data.replay.timecodeB

  return variables
}
