import { flattedTotals } from '@mocks/balanceCalculator/accountingEntries';
import { createBalanceTree } from '@src/lib/modules/balanceCalculator';

describe('createBalanceTree', () => {
  test('should return balance tree', () => {
    const response = createBalanceTree(flattedTotals);

    expect(response).toEqual({});
  });
});
