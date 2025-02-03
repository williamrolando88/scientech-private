import { Card, Typography, useTheme } from '@mui/material';
import Chart, { useChart } from '@src/components/shared/chart';
import { useProjectContext } from '@src/hooks/useProjectContext';
import {
  getExpensesValuesAndLabels,
  getOngoingProjectGraphSeries,
} from '@src/lib/modules/projects/projectGraph';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { round } from 'mathjs';
import { FC } from 'react';

interface Props {
  accountingData: DoubleEntryAccounting[];
}

const OngoingProjectGraph: FC<Props> = ({ accountingData }) => {
  const { project } = useProjectContext();
  const theme = useTheme();

  // TODO: Enable interactive form to update project details values
  // TODO: Always must be a point 0 at beginning
  // TODO: Draw between the starting date and the estimates/finished date always

  const { expenseValues, labels } = getExpensesValuesAndLabels(accountingData);

  const { accExpensesArray, budgetArray, isOverBudget } =
    getOngoingProjectGraphSeries({
      budget: project.budget,
      contingency: project.contingency ?? 0,
      expenses: expenseValues,
    });

  const series = [
    {
      name:
        isOverBudget && project.contingency
          ? 'Presupuesto + Contingencia'
          : 'Presupuesto',
      type: 'area',
      data: budgetArray,
    },
    {
      name: 'Gastos acumulados',
      type: 'area',
      data: accExpensesArray,
    },
    {
      name: 'Factura',
      type: 'column',
      data: expenseValues,
    },
  ];

  const chartOptions = useChart({
    chart: {
      height: 500,
      type: 'line',
    },
    stroke: {
      curve: ['stepline', 'stepline'],
      width: [5, 2],
    },
    plotOptions: {
      bar: { columnWidth: expenseValues.length < 5 ? '10%' : '50%' },
    },
    fill: {
      type: ['gradient', 'gradient', 'solid'],
    },
    colors: [
      isOverBudget ? theme.palette.error.main : theme.palette.success.main,
      theme.palette.secondary.main,
      theme.palette.secondary.light,
    ],
    labels,
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: { text: 'USD' },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => (value ? `$${round(value, 2)}` : '$0'),
      },
    },
  });

  return (
    <Card sx={{ width: '100%', p: 2 }}>
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ textTransform: 'uppercase', textAlign: 'center', mb: 2 }}
      >
        Control de Presupuesto
      </Typography>

      <Chart type="line" series={series} options={chartOptions} height={400} />
    </Card>
  );
};

export default OngoingProjectGraph;
