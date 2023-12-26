import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import Chart, { useChart } from 'src/components/shared/chart';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';

const ItemsSummaryGraph: FC = () => {
  const { values, reportValues } = useImportCalculatorContext();

  const chartOptions = useChart({
    chart: {
      type: 'bar',
      stacked: true,
      stackType: '100%',
      height: '20px',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: values.items.map((item) => item.name),
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val}`;
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
  });

  if (!reportValues.length) return null;

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ textTransform: 'uppercase', textAlign: 'center', mb: 2 }}
      >
        Resumen unitario
      </Typography>

      <Chart
        height={values.items.length * 40 + 120}
        type="bar"
        series={reportValues}
        options={chartOptions}
      />
    </Box>
  );
};

export default ItemsSummaryGraph;
