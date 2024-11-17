import {
  DayBookTransactionDetailsSchema,
  DayBookTransactionSchema,
} from '@src/lib/schemas/dayBook';
import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

/** @deprecated */
export type DayBookTransactionOld = z.infer<typeof DayBookTransactionSchema>;
/** @deprecated */
export type DayBookTransactionDetailOld = z.infer<
  typeof DayBookTransactionDetailsSchema
>;

/** @deprecated */
export type DayBookCollectionOld = Record<string, DayBookTransactionOld>;

/** @deprecated */
export interface DayBookTransactionFirestoreOld
  extends Omit<DayBookTransactionOld, 'createdAt' | 'updatedAt' | 'date'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  date: Timestamp;
}

/** @deprecated */
export type DayBookTableEntryOld = DayBookTransactionDetailOld &
  Pick<DayBookTransactionOld, 'id' | 'date' | 'locked'>;

export type DayBookTabsOld = 'listado' | 'reporte-por-cuenta';
