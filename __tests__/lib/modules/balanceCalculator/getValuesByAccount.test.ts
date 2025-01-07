import {
  balanceCalculatorInput,
  flattedValues,
} from '@mocks/balanceCalculator/accountingEntries';
import { getValuesByAccount } from '@src/lib/modules/balanceCalculator';

describe('getValuesByAccount', () => {
  test('should return an array', () => {
    const inputData = Object.values(balanceCalculatorInput);
    const response = getValuesByAccount(inputData);

    expect(response).toBeInstanceOf(Array);
    expect(response).toEqual(flattedValues);
  });
});
