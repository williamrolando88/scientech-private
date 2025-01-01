import { TaxableInfoSchema } from '@src/lib/schemas/documentParser/commonReader';
import { z } from 'zod';

const ImpuestoSchema = z.object({
  codigoPorcentaje: z.coerce.number(),
  baseImponible: z.coerce.number(),
  valor: z.coerce.number(),
});

export const TotalTaxSchema = z.union([ImpuestoSchema, ImpuestoSchema.array()]);

const InfoFacturaSchema = z.object({
  identificacionComprador: z.string(),
  razonSocialComprador: z.string(),
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
  infoTributaria: TaxableInfoSchema,
  infoFactura: InfoFacturaSchema,
  detalles: z.object({
    detalle: DetalleSchema.array().or(DetalleSchema),
  }),
});
