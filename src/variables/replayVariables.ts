import type { CompanionVariableDefinitions, JsonValue } from '@companion-module/base'
import type VMixInstance from '../index.js'

export type ReplayVariablesSchema = Partial<{
  replay_recording: string
  replay_live: string
  replay_forward: string
  replay_channel_mode: string
  replay_events: number
  replay_eventsa: number
  replay_eventsb: number
  replay_cameraa: number
  replay_camerab: number
  replay_quad_view: string
  replay_speed: number
  replay_speeda: number
  replay_speedb: number
  replay_timecode: string
  replay_timecodea: string
  replay_timecodeb: string
	replay_json: JsonValue
}>

export const replayDefinitions = (instance: VMixInstance): CompanionVariableDefinitions<ReplayVariablesSchema> => {
  const definitions: CompanionVariableDefinitions = {}

  if (!instance.config.variablesShowReplay) return definitions

  definitions.replay_recording = { name: 'Replay Recording' }
  definitions.replay_live = { name: 'Replay Live' }
  definitions.replay_forward = { name: 'Replay Forward' }
  definitions.replay_channel_mode = { name: 'Replay Channel Mode' }
  definitions.replay_events = { name: 'Replay Events' }
  definitions.replay_eventsa = { name: 'Replay Events A' }
  definitions.replay_eventsb = { name: 'Replay Events B' }
  definitions.replay_cameraa = { name: 'Replay Camera A' }
  definitions.replay_camerab = { name: 'Replay Camera B' }
  definitions.replay_quad_view = { name: 'Replay Quad View' }
  definitions.replay_speed = { name: 'Replay Speed' }
  definitions.replay_speeda = { name: 'Replay Speed A' }
  definitions.replay_speedb = { name: 'Replay Speed B' }
  definitions.replay_timecode = { name: 'Replay Timecode' }
  definitions.replay_timecodea = { name: 'Replay Timecode A' }
  definitions.replay_timecodeb = { name: 'Replay Timecode B' }
  definitions.replay_json = { name: 'Replay JSON data' }

  return definitions
}

export const replayValues = async (instance: VMixInstance): Promise<ReplayVariablesSchema> => {
  const variables: ReplayVariablesSchema = {}

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
  variables.replay_quad_view = instance.data.replay.quadMode.toString()
  variables.replay_speed = instance.data.replay.speed
  variables.replay_speeda = instance.data.replay.speedA
  variables.replay_speedb = instance.data.replay.speedB
  variables.replay_timecode = instance.data.replay.timecode
  variables.replay_timecodea = instance.data.replay.timecodeA
  variables.replay_timecodeb = instance.data.replay.timecodeB
  variables.replay_json = instance.data.replay as unknown as JsonValue

  return variables
}
