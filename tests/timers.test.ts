import 'ts-jest';
import { Timer } from '../src/timers';


describe('Timers', () => {
  const timer = new Timer('test')

  it(`Timers: Should be initialized with an ID of test, and stopped`, () => {
    expect(timer.id).toEqual('test')
    expect(timer['state']).toEqual('Stopped')
  })

  it(`Timers: Should change state when started`, () => {
    timer.setState('start')
    expect(timer['state']).toEqual('Running')
  })

  it(`Timers: Should create times when requested`, () => {
    expect(timer['time']).toHaveLength(0)
    const now = (new Date()).getTime()
    timer.setTime(0, now)
    expect(timer['time'][0]).toEqual(now)
  })

  it(`Timers: Should adjust time when requested`, () => {
    let previousTime = timer['start']
    timer.setStart('00:00:00.000')
    expect(timer['start']).toBeGreaterThan(previousTime)
    const now = (new Date()).getTime()
    timer.setTime(1, now)
    expect(timer['time'][0]).toEqual(now)
  })

  it(`Timers: Should have 0 times and change state when reset`, () => {
    timer.setState('reset')
    expect(timer['state']).toEqual('Stopped')
    expect(timer['time']).toHaveLength(0)
  })
});
