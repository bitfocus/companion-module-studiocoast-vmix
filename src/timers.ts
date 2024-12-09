import { TimeFormat, formatTime, parseTime } from './utils'

interface TimerResponse {
  id: string
  state: 'Running' | 'Paused' | 'Stopped'
  value: string
  default: string

  [time: string]: any
}

interface TimerGetOptions {
  defaultValue?: string
  format?: TimeFormat
  lap_progress?: 'all' | 'current' | 'none'
  times?: number
}

type TimerState = 'Running' | 'Stopped'

/**
 * @description Creates a Timer for use with the HTTP API, and providing helper functions for control through Actions
 */
export class Timer {
  constructor(id: string) {
    this.id = id
  }

  public readonly id: string = ''
  private start: number = new Date().getTime()
  private state: TimerState = 'Stopped'
  private stop: number = new Date().getTime()
  private time: (number | undefined)[] = []

  // Parse the current timer state into a format suitable for a vMix Data Source
  public readonly get = ({
    defaultValue = '',
    format = 'mm:ss.ms',
    lap_progress = 'current',
    times = 0
  }: TimerGetOptions): TimerResponse => {
    let lapTotal = 0
    let lastLap = 0
    const getValue = (): string => {
      const diff = this.state === 'Running' ? new Date().getTime() - this.start : this.stop - this.start
      return formatTime(diff, 'ms', format)
    }

    const getLapTime = (time: number | undefined): string => {
      if (time === undefined) {
        if (this.state === 'Stopped') {
          return formatTime(this.stop - this.start - lapTotal, 'ms', format)
        } else {
          return formatTime(new Date().getTime() - this.start - lapTotal, 'ms', format)
        }
      } else {
        return formatTime(time - this.start - lapTotal, 'ms', format)
      }
    }

    const response: TimerResponse = {
      id: this.id,
      state: this.state,
      value: getValue(),
      current_lap: getValue(),
      default: defaultValue
    }

    for (let i = 0; i < times || i < this.time.length + 1; i++) {
      response[`time_${i + 1}`] =
        this.time[i] === undefined ? defaultValue : formatTime((this.time[i] as number) - this.start, 'ms', format)
      response[`time_${i + 1}_lap`] =
        lap_progress === 'all' || (lap_progress === 'current' && (this.time[i - 1] !== undefined || i === 0))
          ? getLapTime(this.time[i])
          : defaultValue
      if (this.time[i] !== undefined) {
        lapTotal = (this.time[i] as number) - this.start
        lastLap = this.time[i] as number
      }
    }

    response.current_lap = lapTotal === 0 ? response.value : getLapTime(lastLap)

    return response
  }

  // Controls the state of the Timer and start/stop times
  public readonly setState = (state: 'start' | 'stop' | 'reset'): void => {
    if (state === 'start') {
      this.state = 'Running'
      const runtime = this.stop - this.start
      this.start = new Date().getTime() - runtime
    } else if (state === 'stop') {
      this.state = 'Stopped'
      this.stop = new Date().getTime()
    } else if (state === 'reset') {
      this.state = 'Stopped'
      this.start = new Date().getTime()
      this.stop = this.start
      this.time = []
    }
  }

  // Adjusts start point of the timer
  public readonly setStart = (value: string): void => {
    const ms = parseTime(value)

    if (ms !== null) this.start = new Date().getTime() - ms
  }

  // Creates a new time within a timer, or adjusts an existing one
  public readonly setTime = (time: number, value: string | number | undefined): void => {
    const index = time === 0 ? this.time.length : time - 1

    if (value === undefined) {
      this.time[index] = undefined
    } else {
      if (typeof value === 'string') {
        const ms = parseTime(value)
        if (ms !== null) this.time[index] = this.start + ms
      } else {
        this.time[index] = this.time[index] = value
      }
    }
  }
}
