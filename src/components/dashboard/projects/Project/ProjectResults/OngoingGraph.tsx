import { Box, Card, Typography } from '@mui/material';
import Chart, { useChart } from '@src/components/shared/chart';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { round } from 'mathjs';
import { FC } from 'react';

interface Props {
  accountingData: DoubleEntryAccounting[];
}

const getAccumulatedData = (data: number[]) =>
  data.reduce((acc, value, index) => {
    if (index === 0) {
      acc.push(value);
    } else {
      acc.push(acc[index - 1] + value);
    }
    return acc;
  }, [] as number[]);

const OngoingGraph: FC<Props> = ({ accountingData }) => {
  const rawData = [300, 1500, 3100, 470, 3100, 430, 2600, 410, 310, 470, 330];

  const series = [
    {
      name: 'Presupuesto',
      type: 'line',
      data: new Array(11).fill(15000),
    },
    {
      name: 'Gastos acumulados',
      type: 'area',
      data: getAccumulatedData(rawData),
    },
    {
      name: 'Factura',
      type: 'column',
      data: rawData,
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
      type: ['solid', 'gradient', 'solid'],
    },
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003',
    ],
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
        formatter: (value: number) => `$ ${round(value, 2)}`,
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

export default OngoingGraph;

/* 
const [state, setState] = React.useState({
          
            series: [{
              name: 'TEAM A',
              type: 'area',
              data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
            }, {
              name: 'TEAM B',
              type: 'line',
              data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
            }],
            options: {
              chart: {
                height: 350,
                type: 'line',
              },
              stroke: {
                curve: 'smooth'
              },
              fill: {
                type:'solid',
                opacity: [0.35, 1],
              },
              labels: ['Dec 01', 'Dec 02','Dec 03','Dec 04','Dec 05','Dec 06','Dec 07','Dec 08','Dec 09 ','Dec 10','Dec 11'],
              markers: {
                size: 0
              },
              yaxis: [
                {
                  title: {
                    text: 'Series A',
                  },
                },
                {
                  opposite: true,
                  title: {
                    text: 'Series B',
                  },
                },
              ],
              tooltip: {
                shared: true,
                intersect: false,
                y: {
                  formatter: function (y) {
                    if(typeof y !== "undefined") {
                      return  y.toFixed(0) + " points";
                    }
                    return y;
                  }
                }
              }
            },
          
          
        });

*/
