import { HoldingReaderSchema } from '@src/lib/schemas/documentParser/holdingReader';
import {
  InvoiceReaderSchema,
  TotalTaxSchema,
} from '@src/lib/schemas/documentParser/invoiceReader';
import { z } from 'zod';

export type ParsedInvoice = z.infer<typeof InvoiceReaderSchema>;
export type ParsedHolding = z.infer<typeof HoldingReaderSchema>;

export type TotalTax = z.infer<typeof TotalTaxSchema>;

export interface NormalizedInvoice extends ParsedInvoice {
  normalizedData: {
    description: string;
    issueDate: Date;
    taxedSubtotal: number;
    noTaxSubtotal: number;
  };
}
