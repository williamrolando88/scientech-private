// todo: store these values on the server
export const IVA_RATE_12 = 12;
export const IVA_RATE_15 = 15;
export const ISD_TAX_RATE = 5;
export const FODINFA_TAX_RATE = 0.5;
export const INSURANCE_RATE = 1;
export const TAX_PERCENTAGE_CODES = [2, 4];

export const DEFAULT_ACCOUNT = {
  INVOICE: {
    PAYMENT: '1.01.01.03.01',
    EXPENSE: '5.01.01.02',
  },
  NON_DEDUCTIBLE: {
    PAYMENT: '1.01.01.03.01',
    EXPENSE: '5.02.01.17',
  },
  SALE_NOTE: {
    PAYMENT: '1.01.01.03.01',
    EXPENSE: '5.02.01.17',
  },
  CUSTOMS_PAYMENT: {
    PAYMENT: '2.01.04.01.01',
    EXPENSE: '5.02.02.20',
  },
  IVA_TAX_CREDIT: '1.01.05.01',
  INCOME_TAX_CREDIT: '1.01.05.02',
  ACCOUNTS_RECEIVABLE: '1.01.02.05.02.01',
  BILLS_TO_PAY: '2.01.03',
  TAXES_PAYABLE: '2.01.07.01',
  CUSTOMER_ADVANCE: '2.02.06',
};

export const ALLOWED_ACCOUNTS = {
  INVOICE: {
    PAYMENT: [
      '1.01.01.03.01',
      '1.01.02.05.02.01',
      '1.01.02.05.02.02',
      '2.01.04.01.01',
      '2.01.04.01.02',
    ],
    EXPENSE: ['5.01.01', '5.02.01', '5.02.02'],
  },
  NON_DEDUCTIBLE: {
    PAYMENT: [
      '1.01.01.03.01',
      '1.01.02.05.02.02',
      '2.01.04.01.01',
      '2.01.04.01.02',
    ],
    EXPENSE: ['5.01.01', '5.02.01', '5.02.02', '5.02.03'],
  },
  SALE_NOTE: {
    PAYMENT: [
      '1.01.01.03.01',
      '1.01.02.05.02.02',
      '2.01.04.01.01',
      '2.01.04.01.02',
    ],
    EXPENSE: ['5.01.01', '5.02.01', '5.02.02', '5.02.03'],
  },
  CUSTOMS_PAYMENT: {
    PAYMENT: ['1.01.01.03.01', '2.01.04.01.01', '2.01.04.01.02'],
  },
};
