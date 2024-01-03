import { round } from 'mathjs';
import { ImportCalculator, ItemCalculationValues } from 'src/@types/importCalculator';
import { parseSafeNumber } from '../helpers/number';

export const calculateImportation = (inputs: ImportCalculator) => {
  // todo: store these values on the server
  const ISDTax = 0.035;
  const fodinfaTax = 0.005;
  const insuranceRate = 0.01;

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

  articles.forEach((row) => {
    // Calculate row weight
    row.rowWeight = row.quantity * row.unitWeight;

    // Calculate EXW item values
    const EXW = (row.quantity * row.unitCost * (100 + originTaxesSafe)) / 100;
    row.EXW = parseSafeNumber(EXW);
  });

  // Calculate total weight
  const totalWeight = articles.reduce((acc, row) => (row.EXW ? acc + row.rowWeight : 0), 0);

  // Calculate international fleet
  const internationalFleet = totalWeight * importFleetPerLibreSafe;

  articles.forEach((row) => {
    // Calculate weight fraction
    row.weightFraction = row.EXW > 0 && totalWeight > 0 ? row.rowWeight / totalWeight : 0;

    // Calculate aux FOB item values
    row.FOB = originFleetSafe * row.weightFraction + row.EXW;
    row.ISD = row.FOB * ISDTax;

    // Calculate aux CIF item values
    row.CIF = (row.FOB + internationalFleet * row.weightFraction) * (1 + insuranceRate);

    // Calculate item taxes
    row.FODINFA = row.CIF * fodinfaTax;
    row.tariff = (row.CIF * row.tariffRate) / 100;
  });

  // Calculate total FOB
  const totalFOB = articles.reduce((acc, row) => acc + row.FOB, 0);

  // Calculate base courier cost
  const baseCourier = importProcedureSafe + internationalFleet;

  articles.forEach((row) => {
    const FOBFraction = row.FOB / totalFOB;

    // Group item cost related to payments and taxes in origin
    const originCosts = totalFOB > 0 ? row.FOB + bankExpensesSafe * FOBFraction : 0;

    // Group item taxes paid locally
    const itemTaxes = row.ISD + row.FODINFA + row.tariff;

    // Calculate item importation costs
    const importCost = baseCourier * row.weightFraction;

    // Calculate item local fleet costs
    const localFleetCost = localFleetSafe * row.weightFraction;

    const itemCost = originCosts + itemTaxes + importCost + localFleetCost;

    // Calculate item profit
    const profit =
      row.margin < 100
        ? itemCost / (1 - row.margin / 100) - itemCost
        : (itemCost * row.margin) / 100;

    // Calculate item unit price
    row.unitPrice = row.quantity > 0 ? round((profit + itemCost) / row.quantity, 2) : 0;

    // Calculate item unit details
    row.unitOriginCosts = round(originCosts / row.quantity, 2);
    row.unitTaxesFee = round(itemTaxes / row.quantity, 2);
    row.unitImportCost = round(importCost / row.quantity, 2);
    row.unitLocalFleetCost = round(localFleetCost / row.quantity, 2);
    row.unitItemProfit = round(profit / row.quantity, 2);
  });

  return {
    pricesArray: articles.map((article) => article.unitPrice),
    articlesReport: articles,
  };
};

export const getImportReport = (articlesReport: ItemCalculationValues[]): ApexAxisChartSeries => {
  const originCosts = articlesReport.map((article) => article.unitOriginCosts);
  const unitImportCost = articlesReport.map((article) => article.unitImportCost);
  const unitTaxesFee = articlesReport.map((article) => article.unitTaxesFee);
  const unitItemProfit = articlesReport.map((article) => article.unitItemProfit);
  const unitLocalFleetCost = articlesReport.map((article) => article.unitLocalFleetCost);

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
