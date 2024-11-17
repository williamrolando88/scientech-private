import { COLLECTIONS } from '@src/lib/enums/collections';
import { Expenses } from '@src/services/firebase/expenses';
import { ExpenseTypeValuesOld, GeneralExpenseOld } from '@src/types/expenses';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const queryKeyByType = (type: ExpenseTypeValuesOld) => [
  COLLECTIONS.EXPENSES,
  type,
];

export function useListExpensesByType<T>(type: ExpenseTypeValuesOld) {
  const getterFunction = Expenses.listByType(type);

  const query = useQuery({
    queryKey: queryKeyByType(type),
    queryFn: getterFunction,
  });

  return { ...query, data: (query.data ?? []) as T[] };
}

export const useAddExpenseByType = (type: ExpenseTypeValuesOld) => {
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
        (prevData: GeneralExpenseOld[]) => [...(prevData ?? []), newExpense],
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

export const useUpdateExpenseByType = (type: ExpenseTypeValuesOld) => {
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
        (prevData: GeneralExpenseOld[]) =>
          prevData.map((expense) =>
            expense.id === newExpense.id ? newExpense : expense,
          ),
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

export const useDeleteExpenseByType = (type: ExpenseTypeValuesOld) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Expenses.remove,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeyByType(type) });
    },
    onSuccess: (id) => {
      queryClient.setQueryData(
        queryKeyByType(type),
        (prevData: GeneralExpenseOld[]) =>
          prevData.filter((expense) => expense.id !== id),
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