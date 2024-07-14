import { z } from 'zod';
import { InvoiceInfoSchema } from '@src/lib/schemas/documentParser/commonReader';

const ImpuestoSchema = z.object({
  codigoPorcentaje: z.string(),
  baseImponible: z.string(),
  valor: z.string(),
});

export const TotalTaxSchema = z.union([ImpuestoSchema, ImpuestoSchema.array()]);

const InfoFacturaSchema = z.object({
  fechaEmision: z.string(),
  importeTotal: z.string(),
  totalConImpuestos: z.object({
    totalImpuesto: TotalTaxSchema,
  }),
  totalSinImpuestos: z.string(),
});

export const InvoiceReaderSchema = z.object({
  infoTributaria: InvoiceInfoSchema,
  infoFactura: InfoFacturaSchema,
});
