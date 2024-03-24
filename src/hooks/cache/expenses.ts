import { COLLECTIONS } from '@src/lib/enums/collections';
import { Expenses } from '@src/services/firebase/expenses';
import { ExpenseType, GeneralExpense } from '@src/types/expenses';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const queryKeyByType = (type: ExpenseType) => [COLLECTIONS.EXPENSES, type];

export function useListExpensesByType<T>(type: ExpenseType) {
  const query = useQuery<T[]>({
    queryKey: queryKeyByType(type),
    queryFn: Expenses.listByType<T>(type),
  });

  return { ...query, data: query.data as T[] };
}

export const useAddExpenseByType = (type: ExpenseType) => {
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
        (prevData: GeneralExpense[]) => {
          console.log('prevData', prevData);
          console.log('newExpense', newExpense);
          return [...prevData, newExpense];
        }
      );
    },
  });

  return mutation;
};

export const useUpdateExpenseByType = (type: ExpenseType) => {
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
  });

  return mutation;
};

export const useDeleteExpenseByType = (type: ExpenseType) => {
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
