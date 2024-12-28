import { DayBookTransactions } from '@src/services/firestore/dayBookTransactions';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { COLLECTIONS_ENUM } from 'src/lib/enums/collections';
import { DayBookTransactionOld } from 'src/types/dayBook';

const queryKey = [COLLECTIONS_ENUM.DAY_BOOK_TRANSACTIONS];

export const useListDayBookTransactions = () => {
  const query = useQuery<DayBookTransactionOld[]>({
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
    onSuccess: (id, inputs) => {
      queryClient.setQueryData(
        queryKey,
        (prevData: DoubleEntryAccounting[]) => [...prevData, { ...inputs, id }]
      );
    },
  });

  return mutation;
};

export const useDeleteDayBookTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: DayBookTransactions.remove,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(queryKey, (prevData: DayBookTransactionOld[]) =>
        prevData.filter((transaction) => transaction.id !== id)
      );
    },
  });

  return mutation;
};

export const useUpdateDayBookTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: DayBookTransactions.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (id, input) => {
      queryClient.setQueryData(queryKey, (prevData: DayBookTransactionOld[]) =>
        prevData.map((transaction) =>
          transaction.id === id ? input : transaction
        )
      );
    },
  });

  return mutation;
};
