import { z } from 'zod';

export const TaxableInfoSchema = z.object({
  razonSocial: z.string(),
  ruc: z.string(),
  claveAcceso: z.string(),
  secuencial: z.string(),
  estab: z.string(),
  ptoEmi: z.string(),
});
