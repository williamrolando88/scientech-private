import { InvoiceInfoSchema } from '@src/lib/schemas/documentParser/commonReader';
import { z } from 'zod';

const HoldingSchema = z.object({
  baseImponible: z.string(),
  valorRetenido: z.string(),
});

const SustainDocumentsSchema = z.object({
  docSustento: z.object({
    impuestosDocSustento: z.object({
      impuestoDocSustento: z.object({
        baseImponible: z.string(),
        valorImpuesto: z.string(),
      }),
    }),
    retenciones: z.object({
      retencion: HoldingSchema.array(),
    }),
  }),
});

export const HoldingReaderSchema = z.object({
  docsSustento: SustainDocumentsSchema,
  infoTributaria: InvoiceInfoSchema,
});
