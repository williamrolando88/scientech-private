import { Project } from '@src/types/projects';

export const getProjectName = (project: Project) => {
  const description = project.description
    ?.split('\\n')
    .map((s) => s.trim())
    .join(' ');

  let text = '';
  if (project.number) text += project.number;
  if (project?.client?.name) text += ` (${project.client.name}): `;
  if (description) text += description;

  return text;
};

export const getAccumulatedData = (data: number[]) =>
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
