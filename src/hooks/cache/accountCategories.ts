import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategoryDict } from 'src/types/accountCategories';

export const useListAccountCategories = (): [
  AccountCategoryDict,
  Omit<UseQueryResult<AccountCategoryDict, unknown>, 'data'>
] => {
  const { data, ...rest } = useQuery<AccountCategoryDict>({
    queryKey: ['accountCategories'],
    queryFn: AccountCategories.list,
  });

  return [data || {}, rest];
};

export const useMutateAccountCategories = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountCategories.upsert,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['accountCategories'] });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['accountCategories'], () => data);
    },
  });

  return mutation;
};
