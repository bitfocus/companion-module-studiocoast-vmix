import 'ts-jest'
import { volumeTodB, volumeToLinear, formatTime, parseTime, valueMinMax } from '../src/utils'


describe('Utils', () => {
  it(`Should return volume in dB`, () => {
    expect(volumeTodB(0)).toEqual(-Infinity)
    expect(volumeTodB(42)).toEqual(-7.5350141920419915)
    expect(volumeTodB(100)).toEqual(0)
  })

  it('Should return linear volume value', () => {
    expect(volumeToLinear(0)).toEqual(0)
    expect(volumeToLinear(42)).toEqual(80.50304775850327)
    expect(volumeToLinear(100)).toEqual(100)
  })

  it('Should format time', () => {
    expect(formatTime(123456, 's', 'hh:mm:ss')).toBe('34:17:36')
    expect(formatTime(123456, 'ms', 'mm:ss.sss')).toBe('02:03.456')
    expect(formatTime(123456, 'ms', 'hh:mm:ss.ms')).toBe('00:02:03.4')
  })

  it('Should parse time', () => {
    expect(parseTime('34:17:36')).toBe(123456000)
    expect(parseTime('02:03.456')).toBe(null)
    expect(parseTime('00:02:03')).toBe(123000)
  })

  it('Should ensure a value is wthin a min/max range', () => {
    expect(valueMinMax(42, 0, 100)).toBe(42)
    expect(valueMinMax(19, 50, 75)).toBe(50)
    expect(valueMinMax(88, 0, 20)).toBe(20)
  })
})
