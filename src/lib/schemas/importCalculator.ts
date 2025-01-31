import { z } from 'zod';

export const ImportCalculatorMetadataValidationSchema = z.object({
  createdAt: z.coerce.number().optional(),
  updatedAt: z.coerce.number().optional(),
  description: z.string().trim(),
});

export const ImportCalculatorSettingsValidationSchema = z.object({
  bankExpenses: z.coerce.number().min(0),
  fleetCostPerLibre: z.coerce.number().min(0),
  importProcedure: z.coerce.number().min(0),
  localFleet: z.coerce.number().min(0),
  originFleet: z.coerce.number().min(0),
  originTaxes: z.coerce.number().min(0),
});

export const ImportCalculatorItemsValidationSchema = z.object({
  margin: z.coerce.number().gte(0),
  name: z.string().trim().optional(),
  quantity: z.coerce.number().gte(0),
  tariffRate: z.coerce.number().gte(0),
  unitCost: z.coerce.number().gte(0),
  unitPrice: z.coerce.number().optional(),
  unitWeight: z.coerce.number().gte(0),
});

export const ImportCalculatorValidationSchema = z.object({
  settings: ImportCalculatorSettingsValidationSchema,
  items: ImportCalculatorItemsValidationSchema.array(),
  notes: z.string().trim().array().optional(),
  metadata: ImportCalculatorMetadataValidationSchema,
  id: z.string().optional(),
});
