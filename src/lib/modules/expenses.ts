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
  const [payment, expense, tax] = formData.transaction_details;

  payment.credit = formData.total;
  payment.debit = 0;
  payment.description = transactionDescription;

  expense.account_id = DEFAULT_ACCOUNT.CUSTOMS_PAYMENT.EXPENSE;
  expense.debit =
    formData.FODINFA + formData.ad_valorem_tariff + formData.specific_tariff;
  expense.credit = 0;
  expense.description = transactionDescription;

  tax.account_id = DEFAULT_ACCOUNT.IVA;
  tax.debit = formData.IVA;
  tax.credit = 0;
  tax.description = transactionDescription;

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
  const [payment, expense, tax] = formData.transaction_details;

  payment.credit = formData.total;
  payment.debit = 0;
  payment.description = transactionDescription;

  expense.debit = formData.taxed_subtotal + formData.tax_exempted_subtotal;
  expense.credit = 0;
  expense.description = transactionDescription;

  tax.account_id = DEFAULT_ACCOUNT.IVA;
  tax.debit = formData.IVA;
  tax.credit = 0;
  tax.description = transactionDescription;

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
  const [payment, expense] = formData.transaction_details;

  payment.credit = formData.total;
  payment.debit = 0;
  payment.description = transactionDescription;

  expense.debit = formData.tax_exempted_subtotal;
  expense.credit = 0;
  expense.description = transactionDescription;

  formData.transaction_details = [payment, expense];

  return formData;
};
