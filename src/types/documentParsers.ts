import {
  InvoiceReaderSchema,
  TotalTaxSchema,
} from '@src/lib/schemas/documentParser/invoiceReader';
import { z } from 'zod';
import { HoldingReaderSchema } from '@src/lib/schemas/documentParser/holdingReader';

export type ParsedInvoice = z.infer<typeof InvoiceReaderSchema>;
export type ParsedHolding = z.infer<typeof HoldingReaderSchema>;

export type TotalTax = z.infer<typeof TotalTaxSchema>;
