import { formatTime, volumeTodB, volumeToLinear } from '../utils.js'

describe('volume conversion', () => {
  test('volumeToLinear maps the vMix amplitude range to 0-100', () => {
    expect(volumeToLinear(0)).toBe(0)
    expect(volumeToLinear(100)).toBe(100)
    expect(volumeToLinear(50)).toBeCloseTo(84.09, 2)
  })

  test('volumeTodB returns 0 dB at full amplitude and -inf when silent', () => {
    expect(volumeTodB(100)).toBe(0)
    expect(volumeTodB(0)).toBe(-Infinity)
    expect(volumeTodB(50)).toBeCloseTo(-6.02, 2)
  })
})

describe('formatTime', () => {
  test('formats milliseconds and seconds consistently', () => {
    expect(formatTime(90000, 'ms', 'hh:mm:ss')).toBe('00:01:30')
    expect(formatTime(90, 's', 'mm:ss')).toBe('01:30')
  })
})
