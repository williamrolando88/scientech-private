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
    description: 'mocked empty item importation',
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

export const _mockedSingleItemImportation: ImportCalculator = {
  items: [
    {
      margin: 10,
      name: 'mocked-item',
      quantity: 1,
      tariffRate: 20,
      unitCost: 530,
      unitPrice: 0,
      unitWeight: 10,
    },
  ],
  metadata: {
    description: 'mocked single item importation',
  },
  settings: {
    bankExpenses: 160,
    fleetCostPerLibre: 6,
    importProcedure: 80,
    localFleet: 10,
    originFleet: 45,
    originTaxes: 7,
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
    description: 'mocked empty items importation',
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
