import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';

const getAccumulatedData = (data: number[]) =>
  data.reduce((acc, value, index) => {
    if (index === 0) {
      acc.push(value);
    } else {
      acc.push(acc[index - 1] + value);
    }
    return acc;
  }, [] as number[]);

type getOngoingProjectGraphSeriesParams = {
  expenses: number[];
  budget: number;
  contingency: number;
};

export const getOngoingProjectGraphSeries = ({
  budget,
  contingency,
  expenses,
}: getOngoingProjectGraphSeriesParams) => {
  const accExpensesArray = getAccumulatedData(expenses);

  const budgetArray = accExpensesArray.map((e) =>
    e < budget ? budget : budget * (1 + contingency / 100)
  );

  const expensesEntries = expenses.length;
  const isOverBudget = accExpensesArray[expensesEntries - 1] > budget;
  return { budgetArray, accExpensesArray, isOverBudget };
};

export const getExpensesValuesAndLabels = (data: DoubleEntryAccounting[]) => {
  const labels: string[] = [];
  const expenseValues: number[] = [];

  if (!data) {
    return { labels, expenseValues };
  }

  data.forEach((d) => {
    d.transactions.forEach((dt) => {
      if (dt.accountId.split('.')[0] === '5') {
        expenseValues.push(dt.debit);
        labels.push(d.issueDate.toISOString());
      }
    });
  });

  return { labels, expenseValues };
};
