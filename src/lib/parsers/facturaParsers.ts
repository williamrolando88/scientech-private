import { z } from "zod";

const InfoTributariaParser = z.object({
  razonSocial: z.string(),
  ruc: z.string(),
  claveAcceso: z.string(),
  codDoc: z.string(),
  estab: z.string(),
  ptoEmi: z.string(),
});

const ImpuestoParser = z.object({
  codigoPorcentaje: z.string(),
  baseImponible: z.string(),
  valor: z.string(),
});

export const TotalImpuestoParser = z.union([
  ImpuestoParser,
  ImpuestoParser.array(),
]);

const InfoFacturaParser = z.object({
  fechaEmision: z.string(),
  importeTotal: z.string(),
  totalConImpuestos: z.object({
    totalImpuesto: TotalImpuestoParser,
  }),
});

export const FacturaParser = z.object({
  infoTributaria: InfoTributariaParser,
  infoFactura: InfoFacturaParser,
});
