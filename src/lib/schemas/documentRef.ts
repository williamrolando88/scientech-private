import { z } from 'zod';

export const DocumentRefSchema = z
  .object({
    projectId: z.string(),
    purchaseId: z.string(),
    paymentId: z.string(),
    sellId: z.string(),
    withholdingId: z.string(),
    paymentCollectionId: z.string(),
  })
  .partial();
