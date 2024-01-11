import { z } from 'zod';

export const AccountCategoryParser = z.object({
  id: z.string(),
  name: z.string(),
  editable: z.boolean(),
});
