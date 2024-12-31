import { DOCUMENT_TYPE } from '@src/lib/enums/documentParser';
import { documentParser } from '@src/lib/modules/documentParser/xmlParser';
import { WithholdingReaderSchema } from '@src/lib/schemas/documentParser/holdingReader';
import { ParsedWithholding } from '@src/types/documentParsers';

export const parseWithholdingXML = (
  xmlText: string
): ParsedWithholding | null => {
  const documentData = documentParser(xmlText, DOCUMENT_TYPE.HOLDING);

  console.log(documentData);

  const parsedRetencion = WithholdingReaderSchema.safeParse(documentData);

  console.log(parsedRetencion.data);

  if (parsedRetencion.success) {
    return parsedRetencion.data;
  }

  return null;
};
