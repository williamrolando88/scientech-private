import { AccountCategory } from 'src/types/accountCategories';
import { create } from 'zustand';

interface AccountCategoriesStore {
  categories: AccountCategory[];
  setCategories: (categories: AccountCategory[]) => void;
  updateCategory: (category: AccountCategory) => void;
  deleteCategory: (category: AccountCategory) => void;
}

export const useAccountCategoriesStore = create<AccountCategoriesStore>()(
  (set) => ({
    categories: [],
    setCategories: (categories) => set(() => ({ categories })),
    updateCategory: (category) =>
      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === category.id ? category : c
        ),
      })),
    deleteCategory: (category) =>
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== category.id),
      })),
  })
);
