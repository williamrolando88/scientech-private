import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategoryDict } from 'src/types/accountCategories';

export const useAccountCategories = (): [
  AccountCategoryDict,
  Omit<UseQueryResult<AccountCategoryDict, unknown>, 'data'>
] => {
  const { data, ...rest } = useQuery({
    queryKey: ['accountCategories'],
    queryFn: AccountCategories.list,
  });

  return [data || {}, rest];
};
