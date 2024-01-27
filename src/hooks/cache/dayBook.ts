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
    onSuccess: (id, inputs) => {
      queryClient.setQueryData(queryKey, (prevData: DayBookTransaction[]) => [
        ...prevData,
        { ...inputs, id },
      ]);
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
      queryClient.setQueryData(queryKey, (prevData: DayBookTransaction[]) =>
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
      queryClient.setQueryData(queryKey, (prevData: DayBookTransaction[]) =>
        prevData.map((transaction) =>
          transaction.id === id ? input : transaction
        )
      );
    },
  });

  return mutation;
};
