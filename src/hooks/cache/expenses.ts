import { COLLECTIONS } from '@src/lib/enums/collections';
import { Expenses } from '@src/services/firebase/expenses';
import { ExpenseTypeValues, GeneralExpense } from '@src/types/expenses';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const queryKeyByType = (type: ExpenseTypeValues) => [
  COLLECTIONS.EXPENSES,
  type,
];

export function useListExpensesByType<T>(type: ExpenseTypeValues) {
  const getterFunction = Expenses.listByType(type);

  const query = useQuery({
    queryKey: queryKeyByType(type),
    queryFn: getterFunction,
  });

  return { ...query, data: query.data as T[] };
}

export const useAddExpenseByType = (type: ExpenseTypeValues) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Expenses.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeyByType(type) });
      await queryClient.cancelQueries({ queryKey: [COLLECTIONS.PROJECTS] });
      await queryClient.cancelQueries({
        queryKey: [COLLECTIONS.DAY_BOOK_TRANSACTIONS],
      });
    },
    onSuccess: (newExpense) => {
      queryClient.setQueryData(
        queryKeyByType(type),
        (prevData: GeneralExpense[]) => [...prevData, newExpense]
      );
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyByType(type) });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [COLLECTIONS.PROJECTS] });
      queryClient.invalidateQueries({
        queryKey: [COLLECTIONS.DAY_BOOK_TRANSACTIONS],
      });
    },
  });

  return mutation;
};

export const useUpdateExpenseByType = (type: ExpenseTypeValues) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Expenses.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeyByType(type) });
      await queryClient.cancelQueries({ queryKey: [COLLECTIONS.PROJECTS] });
      await queryClient.cancelQueries({
        queryKey: [COLLECTIONS.DAY_BOOK_TRANSACTIONS],
      });
    },
    onSuccess: (newExpense) => {
      queryClient.setQueryData(
        queryKeyByType(type),
        (prevData: GeneralExpense[]) =>
          prevData.map((expense) =>
            expense.id === newExpense.id ? newExpense : expense
          )
      );
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyByType(type) });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [COLLECTIONS.PROJECTS] });
      queryClient.invalidateQueries({
        queryKey: [COLLECTIONS.DAY_BOOK_TRANSACTIONS],
      });
    },
  });

  return mutation;
};

export const useDeleteExpenseByType = (type: ExpenseTypeValues) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Expenses.remove,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeyByType(type) });
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        queryKeyByType(type),
        (prevData: GeneralExpense[]) =>
          prevData.filter((expense) => expense.id !== id)
      );
    },
  });

  return mutation;
};
