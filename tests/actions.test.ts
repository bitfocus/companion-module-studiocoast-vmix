import 'ts-jest'
import { mockInstance } from './mock'
import { getActions, VMixAction, VMixActionKeys } from '../src/actions/actions'


describe('Actions', () => {
  const actions = getActions(mockInstance as any)

  for (const actionID in actions) {
    const action: VMixAction<any> = actions[actionID as VMixActionKeys]

    action.options
      .filter((option: any) => option.type === 'number')
      .forEach((option: any) => {
        it(`Action: ${actionID} - Option: ${option.label} - Default value should be in allowed range`, () => {
          expect(option.default).toBeGreaterThanOrEqual(option.min)
          expect(option.default).toBeLessThanOrEqual(option.max)
        })
      })
  }

  Object.keys(actions)
    .forEach(id => {
      it(`Action: ${id} Should start with lowercase character`, () => {
        expect(id.charAt(0)).toEqual(id.charAt(0).toLowerCase())
      })
    })
})
