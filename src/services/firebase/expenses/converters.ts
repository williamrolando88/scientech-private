import {
  CustomsPaymentOld,
  ExpenseOld,
  ExpenseTypeValuesOld,
  GeneralExpenseOld,
  InvoiceOld,
} from '@src/types/expenses';
import { FirestoreDataConverter } from 'firebase/firestore';

export const GeneralExpenseConverter: FirestoreDataConverter<GeneralExpenseOld> =
  {
    toFirestore: (expense: GeneralExpenseOld) => expense,
    fromFirestore: (snapshot: any) => ({
      ...snapshot.data(),
      issue_date: snapshot.data().issue_date.toDate(),
    }),
  };
const InvoiceConverter: FirestoreDataConverter<InvoiceOld> = {
  toFirestore: (expense: InvoiceOld) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issue_date.toDate(),
  }),
};
const CustomsPaymentConverter: FirestoreDataConverter<CustomsPaymentOld> = {
  toFirestore: (expense: CustomsPaymentOld) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issue_date.toDate(),
  }),
};
const ExpenseConverter: FirestoreDataConverter<ExpenseOld> = {
  toFirestore: (expense: ExpenseOld) => expense,
  fromFirestore: (snapshot: any) => ({
    ...snapshot.data(),
    issue_date: snapshot.data().issue_date.toDate(),
  }),
};
export const converterByType: Record<
  ExpenseTypeValuesOld,
  FirestoreDataConverter<GeneralExpenseOld>
> = {
  invoice: InvoiceConverter,
  customs_payment: CustomsPaymentConverter,
  sale_note: ExpenseConverter,
  non_deductible: ExpenseConverter,
};
