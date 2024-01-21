import { useQuery } from '@tanstack/react-query';
import { AccountCategories } from 'src/services/firebase/applicationSettings';

export const useAccountCategories = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['accountCategories'],
    queryFn: AccountCategories.list,
  });

  return [data, rest];
};
