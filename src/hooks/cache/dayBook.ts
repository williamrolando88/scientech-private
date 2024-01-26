import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useAddDayBookTransactions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: DayBookTransactions.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (_, inputs) => {
      queryClient.setQueryData(queryKey, (prevData: DayBookTransaction[]) => [
        ...prevData,
        inputs,
      ]);
    },
  });

  return mutation;
};
