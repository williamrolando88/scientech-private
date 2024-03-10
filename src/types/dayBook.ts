import {
  DayBookTransactionDetailsSchema,
  DayBookTransactionSchema,
} from '@src/lib/schemas/dayBook';
import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export type DayBookTransaction = z.infer<typeof DayBookTransactionSchema>;
export type DayBookTransactionDetail = z.infer<
  typeof DayBookTransactionDetailsSchema
>;

export type DayBookCollection = Record<string, DayBookTransaction>;

export interface DayBookTransactionFirestore
  extends Omit<DayBookTransaction, 'createdAt' | 'updatedAt' | 'date'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  date: Timestamp;
}

export type DayBookTableEntry = DayBookTransactionDetail &
  Pick<DayBookTransaction, 'id' | 'date' | 'locked'>;

export type DayBookTabs = 'listado' | 'reporte-por-cuenta' | 'balance';
