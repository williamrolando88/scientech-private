import {
  balanceCalculatorInput,
  balanceDictResult,
} from '@mocks/balanceCalculator/accountingEntries';
import { balanceCalculator } from '@src/lib/modules/balanceCalculator';

describe('balanceCalculator', () => {
  test('should return balance tree from input data', () => {
    const inputData = Object.values(balanceCalculatorInput);
    const response = balanceCalculator(inputData);

    expect(response).toEqual(balanceDictResult);
  });

  test('should return empty object if input is empty', () => {
    const response = balanceCalculator([]);

    expect(response).toEqual({});
  });
});
