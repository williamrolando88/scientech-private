import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';
import {
  ImportCalculatorItemsValidationSchema,
  ImportCalculatorMetadataValidationSchema,
  ImportCalculatorSettingsValidationSchema,
  ImportCalculatorValidationSchema,
} from '../lib/schemas/importCalculator';

export type ImportCalculatorMetadata = z.infer<
  typeof ImportCalculatorMetadataValidationSchema
>;
export type ImportCalculatorSettings = z.infer<
  typeof ImportCalculatorSettingsValidationSchema
>;
export type ImportCalculatorItems = z.infer<
  typeof ImportCalculatorItemsValidationSchema
>;
export type ImportCalculator = z.infer<typeof ImportCalculatorValidationSchema>;

export interface ItemCalculationValues extends ImportCalculatorItems {
  rowWeight: number;
  EXW: number;
  weightFraction: number;
  FOB: number;
  ISD: number;
  CIF: number;
  FODINFA: number;
  tariff: number;
  unitOriginCosts: number;
  unitTaxesFee: number;
  unitImportCost: number;
  unitLocalFleetCost: number;
  unitItemProfit: number;
}

export type StoredImportCalculator = ImportCalculator & {
  metadata: {
    createdAt: Timestamp;
    updatedAt: Timestamp;
  };
};
