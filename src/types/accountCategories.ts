import { AccountCategoryParser } from 'src/lib/parsers/accountCategories';
import { z } from 'zod';

export type AccountCategory = z.infer<typeof AccountCategoryParser>;

export type AccountCategoryDict = Record<string, AccountCategory>;

export type AccountCategoryDoc = {
  lastUpdate: number;
  accounts: AccountCategoryDict;
};

export type AccountTree = {
  id: string;
  name: string;
  value?: number;
  children: AccountTree[];
};
