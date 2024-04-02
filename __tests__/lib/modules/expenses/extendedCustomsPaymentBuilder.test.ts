import {
  _processedCustomsPayment,
  _sourceCustomsPayment,
} from '@mocks/expenses/customsPayment';
import { extendedCustomPaymentBuilder } from '@src/lib/modules/expenses';

describe('extendedCustomPaymentBuilder', () => {
  test('should be defined', () => {
    expect(extendedCustomPaymentBuilder).toBeDefined();
  });

  test('should return a processed customs payment object', () => {
    const result = extendedCustomPaymentBuilder(_sourceCustomsPayment);
    expect(result).toEqual(_processedCustomsPayment);
  });

  test('should return an object that is different from the source', () => {
    const result = extendedCustomPaymentBuilder(_sourceCustomsPayment);

    const areSimilar = Object.is(result, _sourceCustomsPayment);
    expect(areSimilar).toBeFalsy();
  });
});
