import { balanceCalculatorInput } from '@mocks/balanceCalculator/accountingEntries';
import { calculateProfit } from '@src/lib/modules/balanceCalculator';

describe('calculateProfit', () => {
  test('should return the profit value', () => {
    const inputValues = Object.values(balanceCalculatorInput);
    const response = calculateProfit(inputValues);

    expect(response).toBe(2758.94);
  });
});
