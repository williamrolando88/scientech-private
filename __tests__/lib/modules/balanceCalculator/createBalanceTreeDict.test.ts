import {
  balanceDictResult,
  flattedTotals,
} from '@mocks/balanceCalculator/accountingEntries';
import { createBalanceTreeDict } from '@src/lib/modules/balanceCalculator';

describe('createBalanceTreeDict', () => {
  test('should return balance tree', () => {
    const response = createBalanceTreeDict(flattedTotals);

    expect(response).toEqual(balanceDictResult);
  });
});
