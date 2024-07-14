import {
  InvoiceReaderSchema,
  TotalTaxSchema,
} from '@src/lib/schemas/documentParser/invoiceReader';
import { z } from 'zod';

export type ParsedInvoice = z.infer<typeof InvoiceReaderSchema>;

export type TotalTax = z.infer<typeof TotalTaxSchema>;
