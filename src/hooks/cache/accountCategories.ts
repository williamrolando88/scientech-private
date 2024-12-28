import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { COLLECTIONS_ENUM, SETTINGS_ENUM } from 'src/lib/enums/collections';
import { AccountCategories } from 'src/services/firestore/applicationSettings';
import { AccountCategoryDict } from 'src/types/accountCategories';

const queryKey = [
  COLLECTIONS_ENUM.APPLICATION_SETTINGS,
  SETTINGS_ENUM.ACCOUNT_CATEGORIES,
];

export const useListAccountCategories = () => {
  const query = useQuery<AccountCategoryDict>({
    queryKey,
    queryFn: AccountCategories.list,
  });

  return { ...query, data: query.data ?? {} };
};

export const useMutateAccountCategories = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountCategories.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, () => data);
    },
  });

  return mutation;
};
