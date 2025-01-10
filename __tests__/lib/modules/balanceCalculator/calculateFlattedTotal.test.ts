import {
  flattedTotals,
  flattedValues,
} from '@mocks/balanceCalculator/accountingEntries';
import { calculateFlattedTotal } from '@src/lib/modules/balanceCalculator';

describe('calculateFlattedTotal', () => {
  test('should return an Array of calculated values', () => {
    const response = calculateFlattedTotal(flattedValues);

    expect(response).toEqual(flattedTotals);
  });
});
