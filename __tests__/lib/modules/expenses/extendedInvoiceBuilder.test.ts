import { _processedInvoice, _sourceInvoice } from '@mocks/expenses/invoice';
import { extendedInvoiceBuilder } from '@src/lib/modules/expenses';

describe('extendedInvoiceBuilder', () => {
  test('should be defined', () => {
    expect(extendedInvoiceBuilder).toBeDefined();
  });

  test('should return a processed customs payment object', () => {
    const result = extendedInvoiceBuilder(_sourceInvoice);
    expect(result).toEqual(_processedInvoice);
  });

  test('should return an object that is different from the source', () => {
    const result = extendedInvoiceBuilder(_sourceInvoice);

    const areSimilar = Object.is(result, _processedInvoice);
    expect(areSimilar).toBeFalsy();
  });
});
