import 'ts-jest'
import { mockInstance } from './mock'
import { Activators } from '../src/activators'

describe('Activators', () => {
  const activators = new Activators(mockInstance as any)

  it(`Should log unknown activator message`, () => {
    const message = 'TEST Activator'
    activators.parse(message)

    expect(mockInstance.log).toHaveBeenCalledWith('debug', `Unknown vMix activator: ${message.split(' ')[0]}`)
  })
})
