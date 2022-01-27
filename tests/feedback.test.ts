import 'ts-jest/utils';
import { mocked } from 'jest-mock';
import VMixInstance from '../src';
import { getFeedbacks } from '../src/feedback';
import { rgb } from '../src/utils';



jest.mock('../src', () => {
  return {
    rgb: (r: number, g: number, b: number) => rgb(r, g, b),
    config: {
      shiftDelimiter: '/'
    }
  }
});

describe('Test feedback options', () => {
  const MockInstance = mocked(VMixInstance, true);
  const feedbacks = getFeedbacks(MockInstance as any);


  Object.keys(feedbacks)
    .filter(id => feedbacks[id].options.length > 0)
    .forEach(id => {
      feedbacks[id].options
        .filter((option: any) => option.type === 'number' || option.type === 'colorpicker')
        .forEach((option: any) => {
          const colorMin = 0;
          const colorMax = 16777215;

          it(`Feedback: ${id} - ${option.label} -  Default value should be in allowed range`, () => {
            expect(option.default).toBeGreaterThanOrEqual(option.type === 'number' ? option.min : colorMin);
            expect(option.default).toBeLessThanOrEqual(option.type === 'number' ? option.max : colorMax);
          });
        });
    });

});

describe('Test feedback id', () => {
  const MockInstance = mocked(VMixInstance, true);
  const feedbacks = getFeedbacks(MockInstance as any);

  Object.keys(feedbacks)
    .forEach(id => {
      it(`Feedback: ${id} Should start with lowercase character`, () => {
        expect(id.charAt(0)).toEqual(id.charAt(0).toLowerCase());
      });
    });
});
