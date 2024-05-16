import { ImportCalculator } from '@src/types/importCalculator';

export const _mockedEmptySingleItemImportation: ImportCalculator = {
  items: [
    {
      margin: 0,
      name: 'mocked-item',
      quantity: 1,
      tariffRate: 0,
      unitCost: 0,
      unitPrice: 0,
      unitWeight: 0,
    },
  ],
  metadata: {
    description: 'mocked single item importation',
  },
  settings: {
    bankExpenses: 0,
    fleetCostPerLibre: 0,
    importProcedure: 0,
    localFleet: 0,
    originFleet: 0,
    originTaxes: 0,
  },
};

export const _mockedEmptyMultiItemImportation: ImportCalculator = {
  items: [
    {
      margin: 0,
      name: 'mocked-item-1',
      quantity: 1,
      tariffRate: 0,
      unitCost: 0,
      unitPrice: 0,
      unitWeight: 0,
    },
    {
      margin: 0,
      name: 'mocked-item-2',
      quantity: 1,
      tariffRate: 0,
      unitCost: 0,
      unitPrice: 0,
      unitWeight: 0,
    },
    {
      margin: 0,
      name: 'mocked-item-3',
      quantity: 1,
      tariffRate: 0,
      unitCost: 0,
      unitPrice: 0,
      unitWeight: 0,
    },
    {
      margin: 0,
      name: 'mocked-item-4',
      quantity: 1,
      tariffRate: 0,
      unitCost: 0,
      unitPrice: 0,
      unitWeight: 0,
    },
  ],
  metadata: {
    description: 'mocked single item importation',
  },
  settings: {
    bankExpenses: 0,
    fleetCostPerLibre: 0,
    importProcedure: 0,
    localFleet: 0,
    originFleet: 0,
    originTaxes: 0,
  },
};
