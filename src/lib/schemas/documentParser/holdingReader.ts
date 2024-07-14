import { InvoiceInfoSchema } from '@src/lib/schemas/documentParser/commonReader';
import { z } from 'zod';

const HoldingSchema = z.object({
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
      retencion: HoldingSchema.array(),
    }),
  }),
});

const HoldingDocumentData = z.object({
  fechaEmision: z.string(),
});

export const HoldingReaderSchema = z.object({
  docsSustento: SustainDocumentsSchema,
  infoCompRetencion: HoldingDocumentData,
  infoTributaria: InvoiceInfoSchema,
});
