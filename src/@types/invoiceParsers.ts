import { z } from 'zod';
import { FacturaParser, TotalImpuestoParser } from '../lib/parsers/invoiceParsers';

export type Factura = z.infer<typeof FacturaParser>;

export type TotalImpuesto = z.infer<typeof TotalImpuestoParser>;
