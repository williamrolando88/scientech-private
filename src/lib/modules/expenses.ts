import { DayBookTransactionDetail } from '@src/types/dayBook';
import {
  ExtendedCustomsPayment,
  ExtendedExpense,
  ExtendedInvoice,
} from '@src/types/expenses';
import { cloneDeep, round } from 'lodash';
import { DEFAULT_ACCOUNT } from '../constants/settings';

export const extendedCustomPaymentBuilder = (
  source: ExtendedCustomsPayment
): ExtendedCustomsPayment => {
  const formData = cloneDeep(source);

  formData.IVA = round(formData.IVA ?? 0, 2);
  formData.FODINFA = round(formData.FODINFA ?? 0, 2);
  formData.specific_tariff = round(formData.specific_tariff ?? 0, 2);
  formData.ad_valorem_tariff = round(formData.ad_valorem_tariff ?? 0, 2);
  formData.total = round(formData.total ?? 0, 2);

  const transactionDescription = `Liquidación aduanera: ${formData.description}`;

  const payment: DayBookTransactionDetail = {
    account_id: formData.transaction_details[0].account_id,
    debit: 0,
    credit: formData.total,
    description: transactionDescription,
  };

  const expense: DayBookTransactionDetail = {
    account_id: DEFAULT_ACCOUNT.CUSTOMS_PAYMENT.EXPENSE,
    debit:
      formData.FODINFA + formData.ad_valorem_tariff + formData.specific_tariff,
    credit: 0,
    description: transactionDescription,
  };

  const tax: DayBookTransactionDetail = {
    account_id: DEFAULT_ACCOUNT.IVA,
    debit: formData.IVA,
    credit: 0,
    description: transactionDescription,
  };

  formData.transaction_details = [payment, expense, tax];

  return formData;
};

export const extendedInvoiceBuilder = (
  source: ExtendedInvoice
): ExtendedInvoice => {
  const formData = cloneDeep(source);

  formData.tax_exempted_subtotal = round(
    formData.tax_exempted_subtotal ?? 0,
    2
  );
  formData.taxed_subtotal = round(formData.taxed_subtotal ?? 0, 2);

  const transactionDescription = `Factura recibida: ${formData.issuer_id}-${formData.description}`;

  const payment: DayBookTransactionDetail = {
    account_id: formData.transaction_details[0].account_id,
    debit: 0,
    credit: formData.total,
    description: transactionDescription,
  };

  const expense: DayBookTransactionDetail = {
    account_id: formData.transaction_details[1].account_id,
    debit: formData.taxed_subtotal + formData.tax_exempted_subtotal,
    credit: 0,
    description: transactionDescription,
  };

  const tax: DayBookTransactionDetail = {
    account_id: DEFAULT_ACCOUNT.IVA,
    debit: formData.IVA,
    credit: 0,
    description: transactionDescription,
  };

  formData.transaction_details = [payment, expense, tax];

  return formData;
};

export const extendedNonDeductibleBuilder = (
  source: ExtendedExpense
): ExtendedExpense => {
  const formData = cloneDeep(source);

  formData.tax_exempted_subtotal = round(
    formData.tax_exempted_subtotal ?? 0,
    2
  );

  formData.total = round(formData.tax_exempted_subtotal ?? 0, 2);

  const transactionDescription = `Gasto no deducible: ${formData.issuer_name} ${formData.description}`;

  const payment: DayBookTransactionDetail = {
    account_id: formData.transaction_details[0].account_id,
    debit: 0,
    credit: formData.total,
    description: transactionDescription,
  };

  const expense: DayBookTransactionDetail = {
    account_id: formData.transaction_details[1].account_id,
    debit: formData.tax_exempted_subtotal,
    credit: 0,
    description: transactionDescription,
  };

  formData.transaction_details = [payment, expense];

  return formData;
};

export const extendedSaleNoteBuilder = (
  source: ExtendedExpense
): ExtendedExpense => {
  const formData = cloneDeep(source);

  formData.tax_exempted_subtotal = round(
    formData.tax_exempted_subtotal ?? 0,
    2
  );

  formData.total = round(formData.tax_exempted_subtotal ?? 0, 2);

  const transactionDescription = `Nota de venta: ${formData.issuer_name} ${formData.description}`;

  const payment: DayBookTransactionDetail = {
    account_id: formData.transaction_details[0].account_id,
    debit: 0,
    credit: formData.total,
    description: transactionDescription,
  };

  const expense: DayBookTransactionDetail = {
    account_id: formData.transaction_details[1].account_id,
    debit: formData.tax_exempted_subtotal,
    credit: 0,
    description: transactionDescription,
  };

  formData.transaction_details = [payment, expense];

  return formData;
};
