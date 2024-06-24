import {FirestoreDataConverter} from 'firebase/firestore';
import {
    CustomsPayment,
    Expense,
    ExpenseTypeValues,
    GeneralExpense,
    Invoice,
} from '@src/types/expenses';

export const GeneralExpenseConverter: FirestoreDataConverter<GeneralExpense> = {
    toFirestore: (expense: GeneralExpense) => expense,
    fromFirestore: (snapshot: any) => ({
        ...snapshot.data(),
        issue_date: snapshot.data().issue_date.toDate(),
    }),
};
const InvoiceConverter: FirestoreDataConverter<Invoice> = {
    toFirestore: (expense: Invoice) => expense,
    fromFirestore: (snapshot: any) => ({
        ...snapshot.data(),
        issue_date: snapshot.data().issue_date.toDate(),
    }),
};
const CustomsPaymentConverter: FirestoreDataConverter<CustomsPayment> = {
    toFirestore: (expense: CustomsPayment) => expense,
    fromFirestore: (snapshot: any) => ({
        ...snapshot.data(),
        issue_date: snapshot.data().issue_date.toDate(),
    }),
};
const ExpenseConverter: FirestoreDataConverter<Expense> = {
    toFirestore: (expense: Expense) => expense,
    fromFirestore: (snapshot: any) => ({
        ...snapshot.data(),
        issue_date: snapshot.data().issue_date.toDate(),
    }),
};
export const converterByType: Record<
    ExpenseTypeValues,
    FirestoreDataConverter<GeneralExpense>
> = {
    invoice: InvoiceConverter,
    customs_payment: CustomsPaymentConverter,
    sale_note: ExpenseConverter,
    non_deductible: ExpenseConverter,
};