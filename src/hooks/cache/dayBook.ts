import { useQuery } from '@tanstack/react-query';
import { COLLECTIONS } from 'src/lib/enums/collections';
import { DayBookTransactions } from 'src/services/firebase/dayBookTransactions';
import { DayBookTransaction } from 'src/types/dayBook';

const queryKey = [COLLECTIONS.DAY_BOOK_TRANSACTIONS];

export const useListDayBookTransactions = () => {
  const query = useQuery<DayBookTransaction[]>({
    queryKey,
    queryFn: DayBookTransactions.list,
  });

  return { ...query, data: query.data ?? [] };
};
