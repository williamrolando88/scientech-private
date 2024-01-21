import { DayBookCollection, DayBookTransaction } from 'src/types/dayBook';
import { create } from 'zustand';

interface DayBookStore {
  transactions: DayBookCollection;
  addTransaction: (dayBookEntry: DayBookTransaction) => void;
}

export const useDayBookStore = create<DayBookStore>()((set) => ({
  transactions: {},
  addTransaction: (transaction) => {
    set((state) => ({
      transactions: {
        ...state.transactions,
        [transaction.id || '']: transaction,
      },
    }));
  },
}));
