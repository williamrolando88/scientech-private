import { DayBookTransaction } from 'src/types/dayBook';

export const dayBookTransactionsValidator = (
  entry: DayBookTransaction
): string | null => {
  if (entry.transactions.length < 2) {
    return 'La transacción debe tener al menos dos movimientos';
  }

  const hasEmptyentry = entry.transactions.some(
    (transaction) => !transaction.debit && !transaction.credit
  );

  if (hasEmptyentry) {
    return 'Toda transacción debe tener al menos un movimiento en "DEBE" o "HABER"';
  }

  const hasBothValues = entry.transactions.some(
    (transaction) => transaction.debit && transaction.credit
  );

  if (hasBothValues) {
    return 'Toda transacción solo puede tener un movimiento en "DEBE" o "HABER"';
  }

  const hasEmptyDescriptions = entry.transactions.some(
    (transaction) =>
      !transaction.description &&
      !transaction.invoice_id &&
      !transaction.quotation_id
  );

  if (hasEmptyDescriptions) {
    return 'Toda transacción debe tener al menos una descripción, factura o cotización';
  }

  const totalDebit = entry.transactions.reduce(
    // @ts-expect-error - debit always exists
    (acc, curr) => acc + curr.debit ?? 0,
    0
  );

  const totalCredit = entry.transactions.reduce(
    // @ts-expect-error - credit always exists
    (acc, curr) => acc + curr.credit ?? 0,
    0
  );

  if (totalDebit !== totalCredit) {
    return 'La transacción no está balanceada';
  }

  return null;
};

export const getTransactionDataByDetailId = (
  detailId: string,
  transactions: DayBookTransaction[]
): DayBookTransaction | null => {
  const [transactionId] = detailId.split(':');
  const transaction = transactions?.find((entry) => entry.id === transactionId);

  return transaction || null;
};
