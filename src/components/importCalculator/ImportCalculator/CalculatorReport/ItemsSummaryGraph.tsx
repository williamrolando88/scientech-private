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
    <div className="w-full">
      <Chart
        height={values.items.length * 40 + 120}
        type="bar"
        series={reportValues}
        options={chartOptions}
      />
    </div>
  );
};

export default ItemsSummaryGraph;
