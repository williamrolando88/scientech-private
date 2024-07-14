import {documentParser} from '@src/lib/modules/documentParser/xmlParser';
import {DOCUMENT_TYPE} from '@src/lib/enums/documentParser';

export const parseRetencion = (xmlText: string): null => {
  const documentData = documentParser(xmlText, DOCUMENT_TYPE.HOLDING);

  console.log('documentData', documentData)


  // const parsedFactura = InvoiceReaderSchema.safeParse(documentData);
  //
  // if (parsedFactura.success) {
  //   return parsedFactura.data;
  // }

  return null;
};
