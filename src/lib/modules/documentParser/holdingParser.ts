import { DOCUMENT_TYPE } from '@src/lib/enums/documentParser';
import { documentParser } from '@src/lib/modules/documentParser/xmlParser';
import { WithholdingReaderSchema } from '@src/lib/schemas/documentParser/holdingReader';
import {
  NormalizedParsedWithholding,
  ParsedWithholding,
} from '@src/types/documentParsers';
import { get } from 'lodash';
import { round } from 'mathjs';

const withholdingValueGetter = (
  docData: ParsedWithholding,
  requestedValue: 'valorImpuesto' | 'baseImponible'
) => {
  const taxValue =
    get(
      docData,
      `docsSustento.docSustento.impuestosDocSustento.impuestoDocSustento.${requestedValue}`
    ) ?? 0;

  const holdingValues = docData.docsSustento.docSustento.retenciones.retencion;

  const holding = holdingValues.find(
    (value) => Math.abs(value.baseImponible - taxValue) < 1
  );

  return holding ? round(holding.valorRetenido, 2) : 0;
};

const holdingPercentageValueGetter = (
  docData: ParsedWithholding,
  requestedValue: 'valorImpuesto' | 'baseImponible'
) => {
  const taxValue =
    get(
      docData,
      `docsSustento.docSustento.impuestosDocSustento.impuestoDocSustento.${requestedValue}`
    ) ?? 0;

  const holdingValues = docData.docsSustento.docSustento.retenciones.retencion;

  const holding = holdingValues.find(
    (value) => Math.abs(value.baseImponible - taxValue) < 1
  );

  return holding ? round(holding.porcentajeRetener, 2) : 0;
};

export const normalizeWithholding = (
  data: ParsedWithholding
): NormalizedParsedWithholding => {
  const IVAWithholding = withholdingValueGetter(data, 'valorImpuesto');
  const IncomeWithholding = withholdingValueGetter(data, 'baseImponible');

  const IVAWithholdingPercentage = holdingPercentageValueGetter(
    data,
    'valorImpuesto'
  );
  const IncomeWithholdingPercentage = holdingPercentageValueGetter(
    data,
    'baseImponible'
  );

  return {
    ...data,
    normalizedData: {
      IVAWithholding,
      IncomeWithholding,
      IVAWithholdingPercentage,
      IncomeWithholdingPercentage,
    },
  };
};

export const parseWithholdingXML = (xmlText: string) => {
  const documentData = documentParser(xmlText, DOCUMENT_TYPE.HOLDING);

  const parsedRetencion = WithholdingReaderSchema.safeParse(documentData);

  if (parsedRetencion.success) {
    return normalizeWithholding(parsedRetencion.data);
  }

  return null;
};

// export const normalizeWithholding2Withholding = (
//   data: NormalizedParsedWithholding
// ): Withholding => {};
