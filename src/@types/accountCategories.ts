import { AccountCategoryParser } from 'src/lib/parsers/accountCategories';
import { z } from 'zod';

export type AccountCategory = z.infer<typeof AccountCategoryParser>;
