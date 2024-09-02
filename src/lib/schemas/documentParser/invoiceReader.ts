import { z } from 'zod';
import { InvoiceInfoSchema } from '@src/lib/schemas/documentParser/commonReader';

const ImpuestoSchema = z.object({
  codigoPorcentaje: z.coerce.number(),
  baseImponible: z.coerce.number(),
  valor: z.coerce.number(),
});

export const TotalTaxSchema = z.union([ImpuestoSchema, ImpuestoSchema.array()]);

const InfoFacturaSchema = z.object({
  fechaEmision: z.string(),
  importeTotal: z.coerce.number(),
  totalConImpuestos: z.object({
    totalImpuesto: TotalTaxSchema,
  }),
  totalSinImpuestos: z.coerce.number(),
});

const DetalleSchema = z.object({
  cantidad: z.coerce.number(),
  descripcion: z.string().optional(),
});

export const InvoiceReaderSchema = z.object({
  infoTributaria: InvoiceInfoSchema,
  infoFactura: InfoFacturaSchema,
  detalles: z.object({
    detalle: DetalleSchema.array().or(DetalleSchema),
  }),
});
