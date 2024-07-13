import { z } from 'zod';

const InvoiceInfoSchema = z.object({
  razonSocial: z.string(),
  ruc: z.string(),
  claveAcceso: z.string(),
  secuencial: z.string(),
  estab: z.string(),
  ptoEmi: z.string(),
});

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
  totalSinImpuestos: z.string().optional(),
});

export const InvoiceReaderSchema = z.object({
  infoTributaria: InvoiceInfoSchema,
  infoFactura: InfoFacturaSchema,
});
