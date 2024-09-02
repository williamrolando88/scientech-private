import { ParsedInvoice } from '@src/types/documentParsers';
import { documentParser } from '@src/lib/modules/documentParser/xmlParser';
import { DOCUMENT_TYPE } from '@src/lib/enums/documentParser';
import { InvoiceReaderSchema } from '../../schemas/documentParser/invoiceReader';

export const parseFactura = (xmlText: string): ParsedInvoice | null => {
  const documentData = documentParser(xmlText, DOCUMENT_TYPE.INVOICE);

  if (!documentData) {
    return null;
  }

  console.log('raw document data:', documentData);

  const parsedFactura = InvoiceReaderSchema.safeParse(documentData);

  if (parsedFactura.success) {
    return parsedFactura.data;
  }

  if (parsedFactura.error) {
    console.error('Error parsing factura:', parsedFactura.error);
  }

  return null;
};
