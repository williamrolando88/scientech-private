import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { Expenses } from '@src/services/firestore/expenses';
import { ExpenseTypeValuesOld } from '@src/types/expenses';
import { useQuery } from '@tanstack/react-query';

const queryKeyByType = (type: ExpenseTypeValuesOld) => [
  COLLECTIONS_ENUM.EXPENSES,
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
