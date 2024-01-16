import { DayBookTransactionParser } from 'src/lib/parsers/dayBook';
import { z } from 'zod';

export type DayBookTransaction = z.infer<typeof DayBookTransactionParser>;
export type DayBookCollection = Record<string, DayBookTransaction>;
