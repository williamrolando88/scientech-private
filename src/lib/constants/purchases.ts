import {
  CustomsPayment,
  NonDeductible,
  ReceivedInvoice,
  SaleNote,
} from '@src/types/purchases';

export const RECEIVED_INVOICE_INITIAL_VALUE: ReceivedInvoice = {
  id: '',
  issueDate: new Date(),
  issuerName: '',
  issuerId: '',
  IVA: 0,
  taxedSubtotal: 0,
  description: '',
  establishment: 1,
  emissionPoint: 1,
  sequentialNumber: 1,
  total: 0,
  noTaxSubtotal: 0,
  paid: false,
  ref: {
    projectId: '',
  },
  expenseAccount: '5.01.01.02',
  locked: false,
};

export const CUSTOMS_PAYMENT_INITIAL_VALUE: CustomsPayment = {
  id: '',
  customsPaymentNumber: '',
  issueDate: new Date(),
  IVA: 0,
  description: '',
  adValoremTariff: 0,
  specificTariff: 0,
  FODINFA: 0,
  total: 0,
  paid: false,
  ref: {
    projectId: '',
  },
};

export const NON_DEDUCTIBLE_INITIAL_VALUE: NonDeductible = {
  id: '',
  issueDate: new Date(),
  issuerName: '',
  description: '',
  total: 0,
  paid: false,
  ref: {
    projectId: '',
  },
  expenseAccount: '5.01.01.02',
};

export const SALE_NOTE_INITIAL_VALUE: SaleNote = {
  id: '',
  issueDate: new Date(),
  issuerName: '',
  description: '',
  total: 0,
  issuerId: '',
  establishment: 1,
  emissionPoint: 1,
  sequentialNumber: 1,
  paid: false,
  ref: {
    projectId: '',
  },
  expenseAccount: '5.01.01.02',
};
