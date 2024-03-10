import { COLLECTIONS } from '@src/lib/enums/collections';
import { Expenses } from '@src/services/firebase/expenses';
import { ExpenseType } from '@src/types/expenses';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const queryKeyByType = (type: ExpenseType) => [COLLECTIONS.EXPENSES];

export async function useListExpensesByType<T>(type: ExpenseType) {
  const query = useQuery<T[]>({
    queryKey: queryKeyByType(type),
    // @ts-ignore
    queryFn: Expenses.listByType(type),
  });

  return { ...query, data: query.data ?? [] };
}

export async function useAddExpenseByType<T>(type: ExpenseType) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Expenses.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeyByType(type) });
    },
    onSuccess: (id, inputs) => {
      queryClient.setQueryData(queryKeyByType(type), (prevData: T[]) => [
        ...prevData,
        { ...inputs, id },
      ]);
    },
  });

  return mutation;
}

export async function useUpdateExpenseByType<T>(type: ExpenseType) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Expenses.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeyByType(type) });
    },
    onSuccess: (id, inputs) => {
      queryClient.setQueryData(queryKeyByType(type), (prevData: T[]) =>
        prevData.map((expense) =>
          // @ts-ignore
          expense.id === id ? { ...inputs, id } : expense
        )
      );
    },
  });

  return mutation;
}

export async function useDeleteExpenseByType<T>(type: ExpenseType) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: Expenses.remove,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeyByType(type) });
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(queryKeyByType(type), (prevData: T[]) =>
        // @ts-ignore
        prevData.filter((expense) => expense.id !== id)
      );
    },
  });

  return mutation;
}
