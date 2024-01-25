import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { APPLICATION_SETTINGS, COLLECTIONS } from 'src/lib/enums/collections';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategoryDict } from 'src/types/accountCategories';

const queryKey = [
  COLLECTIONS.APPLICATION_SETTINGS,
  APPLICATION_SETTINGS.ACCOUNT_CATEGORIES,
];

export const useListAccountCategories = (): [
  AccountCategoryDict,
  Omit<UseQueryResult<AccountCategoryDict, unknown>, 'data'>
] => {
  const { data, ...rest } = useQuery<AccountCategoryDict>({
    queryKey,
    queryFn: AccountCategories.list,
  });

  return [data || {}, rest];
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
