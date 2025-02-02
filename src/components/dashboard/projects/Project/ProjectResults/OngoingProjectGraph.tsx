import { Card, Typography, useTheme } from '@mui/material';
import Chart, { useChart } from '@src/components/shared/chart';
import { getOngoingProjectGraphSeries } from '@src/lib/modules/projects';
import { Project } from '@src/types/projects';
import { round } from 'mathjs';
import { FC } from 'react';

interface Props extends Pick<Project, 'budget' | 'contingency'> {
  labels: string[];
  expenseValues: number[];
}

const OngoingProjectGraph: FC<Props> = ({
  budget = 0,
  contingency,
  expenseValues = [],
  labels = [],
}) => {
  const theme = useTheme();

  const { accExpensesArray, budgetArray, isOverBudget } =
    getOngoingProjectGraphSeries({
      budget,
      contingency: contingency ?? 0,
      expenses: expenseValues,
    });

  const series = [
    {
      name: 'Presupuesto',
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
      curve: 'straight',
      width: [5, 2],
    },
    plotOptions: {
      bar: { columnWidth: '50%' },
    },
    fill: {
      type: ['gradient', 'gradient', 'solid'],
    },
    colors: [
      isOverBudget ? theme.palette.error.light : theme.palette.success.main,
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
        formatter: (value: number) => (value ? `$ ${round(value, 2)}` : ''),
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
