import {
  _processedNonDeductible,
  _sourceNonDeductible,
} from '@mocks/expenses/nonDeductible';
import { extendedNonDeductibleBuilder } from '@src/lib/modules/expenses';

describe('extendedNonDeductibleBuilder', () => {
  test('should be defined', () => {
    expect(extendedNonDeductibleBuilder).toBeDefined();
  });

  test('should return a processed customs payment object', () => {
    const result = extendedNonDeductibleBuilder(_sourceNonDeductible);
    expect(result).toEqual(_processedNonDeductible);
  });

  test('should return an object that is different from the source', () => {
    const result = extendedNonDeductibleBuilder(_sourceNonDeductible);

    const areSimilar = Object.is(result, _processedNonDeductible);
    expect(areSimilar).toBeFalsy();
  });
});
