import 'ts-jest/utils';
import { mocked } from 'jest-mock';
import VMixInstance from '../src';
import { getActions } from '../src/actions';
import { getFeedbacks } from '../src/feedback';
import { getPresets } from '../src/presets';
import { rgb } from '../src/utils';


jest.mock('../src', () => {
  return {
    rgb: (r: number, g: number, b: number) => rgb(r, g, b),
    config: {
      shiftDelimiter: '/'
    }
  }
});


describe('Test preset options', () => {
  const MockInstance = mocked(VMixInstance, true);
  const actions = getActions(MockInstance as any);
  const feedbacks = getFeedbacks(MockInstance as any);
  const presets = getPresets(MockInstance as any);

  presets
    .forEach(preset => {

      preset.actions.forEach((presetAction: any) => {
        const action: any = actions[presetAction.action];

        action.options
          .filter((option: any) => option.type === 'number')
          .forEach((option: any) => {

            it(`${preset.label} - ${presetAction.label} - Should be in range`, () => {
              expect(presetAction.options[option.id]).toBeGreaterThanOrEqual(option.min);
              expect(presetAction.options[option.id]).toBeLessThanOrEqual(option.max);
            });
          });
      });

      preset.feedbacks.forEach((presetFeedback: any) => {
        const feedback: any = feedbacks[presetFeedback.type];

        feedback.options
          .filter((option: any) => option.type === 'number' || option.type === 'colorpicker')
          .forEach((option: any) => {
            const colorMin = 0;
            const colorMax = 16777215;

            it(`${preset.label} - ${presetFeedback.type} - Should be in range`, () => {
              expect(presetFeedback.options[option.id]).toBeGreaterThanOrEqual(option.type === 'number' ? option.min : colorMin);
              expect(presetFeedback.options[option.id]).toBeLessThanOrEqual(option.type === 'number' ? option.max : colorMax);
            });

          });
      });

    });

});