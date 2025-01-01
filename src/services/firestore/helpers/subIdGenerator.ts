const typesSubfix = {
  purchasePayment: '-p',
  saleWithholding: '-swh',
  salePaymentCollection: '-spc',
};

type Subdocument = (id: string, type: keyof typeof typesSubfix) => string;

export const subId: Subdocument = (id, type) => id + typesSubfix[type];
