import { WithholdingReaderSchema } from '@src/lib/schemas/documentParser/holdingReader';
import {
  InvoiceReaderSchema,
  TotalTaxSchema,
} from '@src/lib/schemas/documentParser/invoiceReader';
import { z } from 'zod';

export type ParsedInvoice = z.infer<typeof InvoiceReaderSchema>;
export type ParsedWithholding = z.infer<typeof WithholdingReaderSchema>;

export type TotalTax = z.infer<typeof TotalTaxSchema>;

export interface NormalizedParsedInvoice extends ParsedInvoice {
  normalizedData: {
    description: string;
    issueDate: Date;
    taxedSubtotal: number;
    noTaxSubtotal: number;
  };
}

export interface NormalizedParsedWithholding extends ParsedWithholding {
  normalizedData: {
    IVAWithholding: number;
    IncomeWithholding: number;
    IVAWithholdingPercentage: number;
    IncomeWithholdingPercentage: number;
    linkedInvoice: {
      emissionPoint: number;
      establishment: number;
      sequentialNumber: number;
    };
  };
}
