import 'ts-jest/utils';
import { mocked } from 'jest-mock';
import VMixInstance from '../src';
import { getActions } from '../src/actions';


jest.mock('../src');

describe('Test action options', () => {
  const MockInstance = mocked(VMixInstance);
  const actions = getActions(MockInstance as any);

  Object.keys(actions)
    .forEach(id => {
      actions[id].options
        .filter((option: any) => option.type === 'number')
        .forEach((option: any) => {
          it(`Action: ${id} - Option: ${option.label} - Default value should be in allowed range`, () => {
            expect(option.default).toBeGreaterThanOrEqual(option.min);
            expect(option.default).toBeLessThanOrEqual(option.max);
          });
        }) as any;
    });

});

describe('Test action id', () => {
  const MockInstance = mocked(VMixInstance);
  const actions = getActions(MockInstance as any);

  Object.keys(actions)
    .forEach(id => {
      it(`Action: ${id} Should start with lowercase character`, () => {
        expect(id.charAt(0)).toEqual(id.charAt(0).toLowerCase());
      });
    });
});