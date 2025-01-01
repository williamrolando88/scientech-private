import { TaxableInfoSchema } from '@src/lib/schemas/documentParser/commonReader';
import { z } from 'zod';

const WithholdingSchema = z.object({
  baseImponible: z.coerce.number(),
  valorRetenido: z.coerce.number(),
  porcentajeRetener: z.coerce.number(),
});

const SustainDocumentsSchema = z.object({
  docSustento: z.object({
    impuestosDocSustento: z.object({
      impuestoDocSustento: z.object({
        baseImponible: z.coerce.number(),
        valorImpuesto: z.coerce.number(),
      }),
    }),
    retenciones: z.object({
      retencion: WithholdingSchema.array(),
    }),
    numAutDocSustento: z.string(),
  }),
});

const WithholdingDocumentData = z.object({
  fechaEmision: z.string(),
});

export const WithholdingReaderSchema = z.object({
  docsSustento: SustainDocumentsSchema,
  infoCompRetencion: WithholdingDocumentData,
  infoTributaria: TaxableInfoSchema,
});
