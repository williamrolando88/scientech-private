import { Button, Card, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import Iconify from 'src/components/shared/iconify';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';
import CalculatorItemsTable from './CalculatorItemsTable';

const CalculatorItems: FC = () => {
  const { calculate, values } = useImportCalculatorContext();

  return (
    <Stack component={Card} p={2} elevation={0} variant="outlined" gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600} sx={{ textTransform: 'uppercase' }}>
          Detalle
        </Typography>

        <Button
          startIcon={<Iconify icon="pajamas:api" />}
          color="success"
          variant="contained"
          sx={{ color: 'white' }}
          onClick={calculate}
          disabled={!values.items.length}
        >
          Calcular
        </Button>
      </Stack>

      <CalculatorItemsTable />
    </Stack>
  );
};

export default CalculatorItems;
