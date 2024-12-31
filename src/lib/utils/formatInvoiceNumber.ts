type FormatInvoiceNumberParams = {
  establishment: number;
  emissionPoint: number;
  sequentialNumber: number;
};

export const formatInvoiceNumber = ({
  establishment,
  emissionPoint,
  sequentialNumber,
}: FormatInvoiceNumberParams) =>
  `${establishment.toString().padStart(3, '0')}-${emissionPoint.toString().padStart(3, '0')}-${sequentialNumber.toString().padStart(7, '0')}`;
