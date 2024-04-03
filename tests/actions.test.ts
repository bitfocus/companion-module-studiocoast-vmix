import 'ts-jest'
import { mockInstance } from './mock'
import { getActions } from '../src/actions'


describe('Actions', () => {
  const actions = getActions(mockInstance as any)

  Object.keys(actions)
    .forEach(id => {
      actions[id].options
        .filter((option: any) => option.type === 'number')
        .forEach((option: any) => {
          it(`Action: ${id} - Option: ${option.label} - Default value should be in allowed range`, () => {
            expect(option.default).toBeGreaterThanOrEqual(option.min)
            expect(option.default).toBeLessThanOrEqual(option.max)
          })
        }) as any
    })

  Object.keys(actions)
    .forEach(id => {
      it(`Action: ${id} Should start with lowercase character`, () => {
        expect(id.charAt(0)).toEqual(id.charAt(0).toLowerCase())
      })
    })
})
