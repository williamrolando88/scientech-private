import {
  BillingDocumentSchema,
  PaymentCollectionSchema,
  SaleSchema,
  WithholdingSchema,
} from '@src/lib/schemas/sale';
import { z } from 'zod';

export type BillingDocument = z.infer<typeof BillingDocumentSchema>;
export type Withholding = z.infer<typeof WithholdingSchema>;
export type PaymentCollection = z.infer<typeof PaymentCollectionSchema>;
export type Sale = z.infer<typeof SaleSchema>;
