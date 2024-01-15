import { AccountCategoryRecord } from 'src/types/accountCategories';
import { create } from 'zustand';

interface AccountCategoriesStore {
  categories: AccountCategoryRecord;
  setCategories: (categories: AccountCategoryRecord) => void;
}

export const useAccountCategoriesStore = create<AccountCategoriesStore>()(
  (set) => ({
    categories: {},
    setCategories: (categories) => set(() => ({ categories })),
  })
);
