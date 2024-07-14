import { z } from 'zod';

export const InvoiceInfoSchema = z.object({
  razonSocial: z.string(),
  ruc: z.string(),
  claveAcceso: z.string(),
  secuencial: z.string(),
  estab: z.string(),
  ptoEmi: z.string(),
});
