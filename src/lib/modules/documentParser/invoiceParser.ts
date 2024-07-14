import { ParsedInvoice } from '@src/types/invoiceParsers';
import { documentParser } from '@src/lib/modules/documentParser/xmlParser';
import { DOCUMENT_TYPE } from '@src/lib/enums/documentParser';
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

  return null;
};
