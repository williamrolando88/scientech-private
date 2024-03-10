import { z } from 'zod';
import {
  InvoiceReaderParser,
  TotalTaxParser,
} from '../lib/parsers/invoiceParsers';

export type ParsedInvoice = z.infer<typeof InvoiceReaderParser>;

export type TotalTax = z.infer<typeof TotalTaxParser>;
