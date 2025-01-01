import {
  DEFAULT_ACCOUNT,
  IVA_RATE_12,
  IVA_RATE_15,
  TAX_PERCENTAGE_CODES,
} from '@src/lib/constants/settings';
import { DOCUMENT_TYPE } from '@src/lib/enums/documentParser';
import { documentParser } from '@src/lib/modules/documentParser/xmlParser';
import {
  NormalizedParsedInvoice,
  ParsedInvoice,
} from '@src/types/documentParsers';
import { BillingDocument } from '@src/types/sale';
import { round } from 'mathjs';
import { InvoiceReaderSchema } from '../../schemas/documentParser/invoiceReader';

export const parseInvoiceXML = (xmlText: string) => {
  const documentData = documentParser(xmlText, DOCUMENT_TYPE.INVOICE);

  if (!documentData) {
    return null;
  }

  const parsedFactura = InvoiceReaderSchema.safeParse(documentData);

  if (parsedFactura.success) {
    return normalizeInvoice(parsedFactura.data);
  }

  if (parsedFactura.error) {
    console.error('Error parsing factura:', parsedFactura.error);
  }

  return null;
};

export const normalizeInvoice = (
  invoice: ParsedInvoice
): NormalizedParsedInvoice => {
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

export const normalizedInvoice2BillingDocument = (
  invoice: NormalizedParsedInvoice
): BillingDocument => {
  const IVA_RATE =
    invoice.normalizedData.issueDate < new Date('2024-04-01')
      ? IVA_RATE_12
      : IVA_RATE_15;

  const IVA = round((invoice.normalizedData.taxedSubtotal * IVA_RATE) / 100, 2);

  return {
    issueDate: invoice.normalizedData.issueDate,
    recipientName: invoice.infoFactura.razonSocialComprador,
    recipientId: invoice.infoFactura.identificacionComprador,
    establishment: Number(invoice.infoTributaria.estab),
    emissionPoint: Number(invoice.infoTributaria.ptoEmi),
    sequentialNumber: Number(invoice.infoTributaria.secuencial),
    description: invoice.normalizedData.description,
    IVA,
    taxedSubtotal: invoice.normalizedData.taxedSubtotal,
    total: invoice.infoFactura.importeTotal,
    ref: {},
    paid: false,
    saleAccount: DEFAULT_ACCOUNT.INCOME_ROOT,
  };
};
