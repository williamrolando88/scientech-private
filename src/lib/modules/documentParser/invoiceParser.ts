import { TAX_PERCENTAGE_CODES } from '@src/lib/constants/settings';
import { DOCUMENT_TYPE } from '@src/lib/enums/documentParser';
import { documentParser } from '@src/lib/modules/documentParser/xmlParser';
import { NormalizedInvoice, ParsedInvoice } from '@src/types/documentParsers';
import { InvoiceReaderSchema } from '../../schemas/documentParser/invoiceReader';

export const parseFactura = (xmlText: string): ParsedInvoice | null => {
  const documentData = documentParser(xmlText, DOCUMENT_TYPE.INVOICE);

  if (!documentData) {
    return null;
  }

  const parsedFactura = InvoiceReaderSchema.safeParse(documentData);

  if (parsedFactura.success) {
    return parsedFactura.data;
  }

  if (parsedFactura.error) {
    console.error('Error parsing factura:', parsedFactura.error);
  }

  return null;
};

export const normalizeInvoice = (invoice: ParsedInvoice): NormalizedInvoice => {
  let description = '';
  if (Array.isArray(invoice.detalles.detalle)) {
    description = invoice.detalles.detalle
      .map((detalle) => `${detalle.cantidad} - ${detalle.descripcion}`)
      .join('\n');
  } else {
    description = `${invoice.detalles.detalle.cantidad} - ${invoice.detalles.detalle.descripcion}`;
  }

  const { totalImpuesto } = invoice.infoFactura.totalConImpuestos;

  let taxedSubtotal = 0;
  if (Array.isArray(totalImpuesto)) {
    taxedSubtotal =
      totalImpuesto.find((impuesto) =>
        TAX_PERCENTAGE_CODES.includes(impuesto.codigoPorcentaje)
      )?.baseImponible || 0;
  } else {
    taxedSubtotal = TAX_PERCENTAGE_CODES.includes(
      totalImpuesto.codigoPorcentaje
    )
      ? totalImpuesto.baseImponible
      : 0;
  }

  let noTaxSubtotal = 0;
  if (Array.isArray(totalImpuesto)) {
    noTaxSubtotal =
      totalImpuesto.find((impuesto) => impuesto.codigoPorcentaje === 0)
        ?.baseImponible || 0;
  } else {
    noTaxSubtotal =
      totalImpuesto.codigoPorcentaje === 0 ? totalImpuesto.baseImponible : 0;
  }

  const issueDate = new Date(
    `${invoice.infoFactura.fechaEmision
      .split('/')
      .reverse()
      .join('-')}T12:00:00-05:00`
  );

  return {
    ...invoice,
    normalizedData: {
      description,
      issueDate,
      noTaxSubtotal,
      taxedSubtotal,
    },
  };
};
