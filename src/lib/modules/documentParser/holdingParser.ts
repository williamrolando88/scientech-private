import { documentParser } from '@src/lib/modules/documentParser/xmlParser';
import { DOCUMENT_TYPE } from '@src/lib/enums/documentParser';
import { HoldingReaderSchema } from '@src/lib/schemas/documentParser/holdingReader';
import { ParsedHolding } from '@src/types/documentParsers';

export const parseRetencion = (xmlText: string): ParsedHolding | null => {
  const documentData = documentParser(xmlText, DOCUMENT_TYPE.HOLDING);

  const parsedRetencion = HoldingReaderSchema.safeParse(documentData);

  if (parsedRetencion.success) {
    return parsedRetencion.data;
  }

  return null;
};
