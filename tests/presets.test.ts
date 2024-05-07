import 'ts-jest'
import { mockInstance } from './mock'
import { getActions } from '../src/actions'
import { getFeedbacks } from '../src/feedback'
import { VMixPreset, getPresets } from '../src/presets'


describe('Presets', () => {
  const actions = getActions(mockInstance as any)
  const feedbacks = getFeedbacks(mockInstance as any)
  const presets = getPresets(mockInstance as any) as any as VMixPreset[]

  presets.filter(preset => preset.type === 'button').forEach((preset) => {
    if (preset.type === 'button') {
      preset.steps.forEach(step => {
        step.down.forEach((presetAction: any) => {
          const action: any = actions[presetAction.actionId]

          action.options
            .filter((option: any) => option.type === 'number')
            .forEach((option: any) => {

              it(`${preset.name} - ${presetAction.name} - Should be in range`, () => {
                expect(presetAction.options[option.id]).toBeGreaterThanOrEqual(option.min)
                expect(presetAction.options[option.id]).toBeLessThanOrEqual(option.max)
              })
            })
        })
      })

      preset.feedbacks.forEach((presetFeedback: any) => {
        const feedback: any = feedbacks[presetFeedback.feedbackId];

        if (feedback.type === 'boolean') {
          it(`${preset.name} - ${presetFeedback.feedbackId} - Should have feedback style`, () => {
            expect(presetFeedback.style).toBeDefined()
          })
        } else {
          it(`${preset.name} - ${presetFeedback.feedbackId} - Should not have feedback style`, () => {
            expect(presetFeedback.style).toBeUndefined()
          })
        }

        feedback.options
          .filter((option: any) => option.type === 'number' || option.type === 'colorpicker')
          .forEach((option: any) => {
            if (option.type === 'number') {
              it(`${preset.name} - ${presetFeedback.feedbackId} - Should be in range`, () => {
                expect(presetFeedback.options[option.id]).toBeGreaterThanOrEqual(option.min)
                expect(presetFeedback.options[option.id]).toBeLessThanOrEqual(option.max)
              })
            } else if (option.type === 'colorpicker') {
              it(`${preset.name} - ${presetFeedback.feedbackId} - Should be in range`, () => {
                expect(presetFeedback.options[option.id]).toBeGreaterThanOrEqual(0)
                expect(presetFeedback.options[option.id]).toBeLessThanOrEqual(16777215)
              })
            }
          })
      })
    }
  })
})