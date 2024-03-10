import { z } from 'zod';

const InvoiceInfoParser = z.object({
  razonSocial: z.string(),
  ruc: z.string(),
  claveAcceso: z.string(),
  secuencial: z.string(),
  estab: z.string(),
  ptoEmi: z.string(),
});

const ImpuestoParser = z.object({
  codigoPorcentaje: z.string(),
  baseImponible: z.string(),
  valor: z.string(),
});

export const TotalTaxParser = z.union([ImpuestoParser, ImpuestoParser.array()]);

const InfoFacturaParser = z.object({
  fechaEmision: z.string(),
  importeTotal: z.string(),
  totalConImpuestos: z.object({
    totalImpuesto: TotalTaxParser,
  }),
});

export const InvoiceReaderParser = z.object({
  infoTributaria: InvoiceInfoParser,
  infoFactura: InfoFacturaParser,
});
