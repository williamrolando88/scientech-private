type TaxDocId = {
  establishment: number;
  emissionPoint: number;
  sequentialNumber: number;
};

export const formatTaxDocIdNumber = ({
  establishment,
  emissionPoint,
  sequentialNumber,
}: TaxDocId) =>
  `${establishment.toString().padStart(3, '0')}-${emissionPoint.toString().padStart(3, '0')}-${sequentialNumber.toString().padStart(7, '0')}`;

export const parseTaxDoxId = (id: string): TaxDocId => {
  const establishment = Number(id.slice(0, 3));
  const emissionPoint = Number(id.slice(3, 6));
  const sequentialNumber = Number(id.slice(6));

  if (
    Number.isNaN(establishment) ||
    Number.isNaN(emissionPoint) ||
    Number.isNaN(sequentialNumber)
  ) {
    throw new Error('El número de documento no puedo ser leido');
  }

  return {
    emissionPoint,
    establishment,
    sequentialNumber,
  };
};
