import { round } from 'mathjs';
import {
  CalculateImportationResult,
  ImportCalculator,
  ItemCalculationValues,
} from 'src/types/importCalculator';
import {
  FODINFA_TAX_RATE,
  INSURANCE_RATE,
  ISD_TAX_RATE,
} from '../constants/settings';
import { parseSafeNumber } from '../utils/number';

export const calculateImportation = (
  inputs: ImportCalculator
): CalculateImportationResult => {
  const {
    items,
    settings: {
      bankExpenses,
      fleetCostPerLibre,
      importProcedure,
      localFleet,
      originFleet,
      originTaxes,
    },
  } = inputs;

  const articles: ItemCalculationValues[] = items.map((article) => ({
    quantity: parseSafeNumber(article.quantity),
    unitWeight: parseSafeNumber(article.unitWeight),
    unitCost: parseSafeNumber(article.unitCost),
    tariffRate: parseSafeNumber(article.tariffRate),
    margin: parseSafeNumber(article.margin),
    unitPrice: parseSafeNumber(article.unitPrice),
    CIF: 0,
    EXW: 0,
    FOB: 0,
    FODINFA: 0,
    tariff: 0,
    ISD: 0,
    name: article.name,
    rowWeight: 0,
    weightFraction: 0,
    unitOriginCosts: 0,
    unitTaxesFee: 0,
    unitImportCost: 0,
    unitLocalFleetCost: 0,
    unitItemProfit: 0,
  }));

  const bankExpensesSafe = parseSafeNumber(bankExpenses);
  const importFleetPerLibreSafe = parseSafeNumber(fleetCostPerLibre);
  const importProcedureSafe = parseSafeNumber(importProcedure);
  const localFleetSafe = parseSafeNumber(localFleet);
  const originFleetSafe = parseSafeNumber(originFleet);
  const originTaxesSafe = parseSafeNumber(originTaxes);

  // !---------------------------------------------------------
  articles.forEach((row) => {
    if (row.quantity <= 0 || row.unitWeight <= 0 || row.unitCost <= 0) return;

    row.rowWeight = row.quantity * row.unitWeight;

    const EXW = (row.quantity * row.unitCost * (100 + originTaxesSafe)) / 100;
    row.EXW = parseSafeNumber(EXW);
  });

  const totalWeight = articles.reduce((acc, row) => acc + row.rowWeight, 0);

  const internationalFleet = totalWeight * importFleetPerLibreSafe;

  // !---------------------------------------------------------
  articles.forEach((row) => {
    if (row.quantity <= 0 || row.unitWeight <= 0 || row.unitCost <= 0) return;

    row.weightFraction = round(row.rowWeight / totalWeight, 5);

    row.FOB = round(originFleetSafe * row.weightFraction + row.EXW, 2);
    row.ISD = round(row.FOB * (ISD_TAX_RATE / 100), 2);

    row.CIF = round(
      (row.FOB + internationalFleet * row.weightFraction) *
        (1 + INSURANCE_RATE / 100),
      2
    );

    row.FODINFA = round(row.CIF * (FODINFA_TAX_RATE / 100), 2);
    row.tariff = round(row.CIF * (row.tariffRate / 100), 2);
  });

  const totalFOB = articles.reduce((acc, row) => acc + row.FOB, 0);

  const baseCourier = importProcedureSafe + internationalFleet;

  // !---------------------------------------------------------
  articles.forEach((row) => {
    if (row.quantity <= 0 || row.unitWeight <= 0 || row.unitCost <= 0) return;

    const FOBFraction = row.FOB / totalFOB;

    const originCosts =
      totalFOB > 0 ? row.FOB + bankExpensesSafe * FOBFraction : 0;

    const itemTaxes = row.ISD + row.FODINFA + row.tariff;

    const importCost = baseCourier * row.weightFraction;

    const localFleetCost = localFleetSafe * row.weightFraction;

    const itemCost = originCosts + itemTaxes + importCost + localFleetCost;

    const profit =
      row.margin < 100
        ? itemCost / (1 - row.margin / 100) - itemCost
        : (itemCost * row.margin) / 100;

    row.unitPrice =
      row.quantity > 0 ? round((profit + itemCost) / row.quantity, 2) : 0;

    row.unitOriginCosts = round(originCosts / row.quantity, 2);
    row.unitTaxesFee = round(itemTaxes / row.quantity, 2);
    row.unitImportCost = round(importCost / row.quantity, 2);
    row.unitLocalFleetCost = round(localFleetCost / row.quantity, 2);
    row.unitItemProfit = round(profit / row.quantity, 2);
  });

  return {
    pricesArray: articles.map((article) => article.unitPrice) as number[],
    articlesReport: articles,
  };
};

export const getImportReport = (
  articlesReport: ItemCalculationValues[]
): ApexAxisChartSeries => {
  const originCosts = articlesReport.map((article) => article.unitOriginCosts);
  const unitImportCost = articlesReport.map(
    (article) => article.unitImportCost
  );
  const unitTaxesFee = articlesReport.map((article) => article.unitTaxesFee);
  const unitItemProfit = articlesReport.map(
    (article) => article.unitItemProfit
  );
  const unitLocalFleetCost = articlesReport.map(
    (article) => article.unitLocalFleetCost
  );

  return [
    {
      name: 'Costos de origen',
      data: originCosts,
    },
    {
      name: 'Costos de importación',
      data: unitImportCost,
    },
    {
      name: 'Impuestos',
      data: unitTaxesFee,
    },
    {
      name: 'Flete local',
      data: unitLocalFleetCost,
    },
    {
      name: 'Ganancia',
      data: unitItemProfit,
    },
  ];
};
