import { DayBookCollection, DayBookTransaction } from 'src/types/dayBook';
import { create } from 'zustand';

interface DayBookStore {
  dayBook: DayBookCollection;
  addDayBookEntry: (dayBookEntry: DayBookTransaction) => void;
}

export const useDayBookStore = create<DayBookStore>()((set) => ({
  dayBook: {},
  addDayBookEntry: (dayBookEntry) => {
    set((state) => ({
      dayBook: {
        ...state.dayBook,
        [dayBookEntry.id]: dayBookEntry,
      },
    }));
  },
}));
