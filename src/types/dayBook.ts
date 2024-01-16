import {
  DayBookParser,
  DayBookTransactionParser,
} from 'src/lib/parsers/dayBook';
import { z } from 'zod';

export type DayBook = z.infer<typeof DayBookParser>;
export type DayBookTransaction = z.infer<typeof DayBookTransactionParser>;
