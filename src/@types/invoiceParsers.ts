import { z } from 'zod';
import { InvoiceParser, TotalTaxParser } from '../lib/parsers/invoiceParsers';

export type Invoice = z.infer<typeof InvoiceParser>;

export type TotalTax = z.infer<typeof TotalTaxParser>;
