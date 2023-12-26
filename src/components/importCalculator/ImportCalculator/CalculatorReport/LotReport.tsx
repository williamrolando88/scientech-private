import { Stack, Typography } from '@mui/material';
import { round } from 'mathjs';
import { FC } from 'react';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';

const LotReport: FC = () => {
  const { values, totalCost } = useImportCalculatorContext();

  const totalWeight = values.items.reduce((acc, item) => acc + item.unitWeight * item.quantity, 0);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography>
        Peso total:
        <span>
          <strong> {round(totalWeight, 2)} </strong>
        </span>
        libras
      </Typography>

      <Typography>
        Costo total: $
        <span>
          <strong> {round(totalCost, 2)} </strong>
        </span>
        USD
      </Typography>
    </Stack>
  );
};

export default LotReport;
