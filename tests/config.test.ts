import 'ts-jest'
import { getConfigFields } from '../src/config'

const config = getConfigFields();

describe('Config', () => {
  config.forEach(option => {
    it(`Config: ${option.id} - Width must be a whole number between 1 and 12`, () => {
      expect(option.width).toBeGreaterThanOrEqual(1)
      expect(option.width).toBeLessThanOrEqual(12)
      expect(option.width % 1).toEqual(0)
    })
  })

  config
    .forEach(option => {
      if (option.type !== 'static-text') {
        it(`Config: ${option.id} - Option must have a valid default`, () => {
          expect(option.default).toBeDefined()
          if (option.type === 'number') {
            expect(option.default).toBeGreaterThanOrEqual(option.min)
            expect(option.default).toBeLessThanOrEqual(option.max)
          }
        })
      }
    })
})