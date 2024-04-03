import 'ts-jest'
import { mockInstance } from './mock'
import { Variables } from '../src/variables'


describe('Variables', () => {
  const variables = new Variables(mockInstance)

  it(`Should set and retrieve variables`, () => {
    expect(variables.currentVariables).toEqual({})
    variables.set({ testVariables: 'test', anotherVariable: '123' })
    expect(variables.currentVariables).toEqual({ testVariables: 'test', anotherVariable: '123' })
  })
});
