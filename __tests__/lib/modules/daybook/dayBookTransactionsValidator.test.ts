import { dayBookTransactionsValidator } from '@src/lib/modules/dayBook';
import { DayBookTransaction } from '@src/types/dayBook';

describe('dayBookTransactionsValidator', () => {
  test('should return error if transactions length is less than 2', () => {
    const entry = {
      transactions: [{ debit: 100, credit: null, description: 'Test' }],
    } as unknown as DayBookTransaction;
    expect(dayBookTransactionsValidator(entry)).toBe(
      'La transacción debe tener al menos dos movimientos'
    );
  });

  test('should return error if transaction has no debit or credit', () => {
    const entry = {
      transactions: [
        { debit: null, credit: null, description: 'Test' },
        { debit: 100, credit: null, description: 'Test' },
      ],
    } as unknown as DayBookTransaction;
    expect(dayBookTransactionsValidator(entry)).toBe(
      'Toda transacción debe tener al menos un movimiento en "DEBE" o "HABER"'
    );
  });

  test('should return error if transaction has both debit and credit', () => {
    const entry = {
      transactions: [
        { debit: 100, credit: 100, description: 'Test' },
        { debit: 100, credit: null, description: 'Test' },
      ],
    } as unknown as DayBookTransaction;
    expect(dayBookTransactionsValidator(entry)).toBe(
      'Toda transacción solo puede tener un movimiento en "DEBE" o "HABER"'
    );
  });

  test('should return error if transaction has no description, invoice_id, or quotation_id', () => {
    const entry = {
      transactions: [
        {
          debit: 100,
          credit: null,
          description: null,
          invoice_id: null,
          quotation_id: null,
        },
        { debit: 100, credit: null, description: 'Test' },
      ],
    } as unknown as DayBookTransaction;
    expect(dayBookTransactionsValidator(entry)).toBe(
      'Toda transacción debe tener al menos una descripción, factura o cotización'
    );
  });

  test('should return error if total debit is not equal to total credit', () => {
    const entry = {
      transactions: [
        { debit: 100, credit: null, description: 'Test' },
        { debit: null, credit: 200, description: 'Test' },
      ],
    } as unknown as DayBookTransaction;
    expect(dayBookTransactionsValidator(entry)).toBe(
      'La transacción no está balanceada'
    );
  });

  test('should return null if all validations pass', () => {
    const entry = {
      transactions: [
        { debit: 100, credit: null, description: 'Test' },
        { debit: null, credit: 100, description: 'Test' },
      ],
    } as unknown as DayBookTransaction;
    expect(dayBookTransactionsValidator(entry)).toBeNull();
  });
});
