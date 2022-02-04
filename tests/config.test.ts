import 'ts-jest/utils';
import { getConfigFields } from '../src/config';

describe('Test config options', () => {
  const config = getConfigFields();

  config.forEach(option => {
      it(`Config: ${option.id} - Width must be a whole number between 1 and 12`, () => {
        expect(option.width).toBeGreaterThanOrEqual(1);
        expect(option.width).toBeLessThanOrEqual(12);
        expect(option.width % 1).toEqual(0);
      });

    });
});
