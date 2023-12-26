import { ImportCalculator, ImportCalculatorItems } from 'src/@types/importCalculator';

export const IMPORT_CALCULATOR_NEW_ROW: ImportCalculatorItems = {
  margin: 0,
  name: '',
  quantity: 1,
  tariffRate: 0,
  unitCost: 0,
  unitPrice: 0,
  unitWeight: 1,
};

export const IMPORT_CALCULATOR_INITIAL_VALUE: ImportCalculator = {
  items: [],
  metadata: {
    description: '',
  },
  notes: [],
  settings: {
    bankExpenses: 0,
    fleetCostPerLibre: 0,
    importProcedure: 0,
    localFleet: 0,
    originFleet: 0,
    originTaxes: 0,
  },
};
