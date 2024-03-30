import { AccountCategorySchema } from '@src/lib/schemas/accountCategories';
import { z } from 'zod';

export type AccountCategory = z.infer<typeof AccountCategorySchema>;

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

export enum AccountType {
  ASSETS = '1',
  LIABILITIES = '2',
  EQUITY = '3',
  INCOME = '4',
  EXPENSES = '5',
}
