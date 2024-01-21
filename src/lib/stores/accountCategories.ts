import { AccountCategoryDict } from 'src/types/accountCategories';
import { create } from 'zustand';

interface AccountCategoriesStore {
  categories: AccountCategoryDict;
  setCategories: (categories: AccountCategoryDict) => void;
}

export const useAccountCategoriesStore = create<AccountCategoriesStore>()(
  (set) => ({
    categories: {},
    setCategories: (categories) => set(() => ({ categories })),
  })
);
