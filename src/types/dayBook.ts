import { Timestamp } from 'firebase/firestore';
import {
  DayBookTransactionDetailsParser,
  DayBookTransactionParser,
} from 'src/lib/parsers/dayBook';
import { z } from 'zod';

export type DayBookTransaction = z.infer<typeof DayBookTransactionParser>;
export type DayBookTransactionDetail = z.infer<
  typeof DayBookTransactionDetailsParser
>;

export type DayBookCollection = Record<string, DayBookTransaction>;

export interface DayBookTransactionFirestore
  extends Omit<DayBookTransaction, 'createdAt' | 'updatedAt' | 'date'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  date: Timestamp;
}

export type DayBookTableEntry = DayBookTransactionDetail &
  Pick<DayBookTransaction, 'id' | 'date'>;
