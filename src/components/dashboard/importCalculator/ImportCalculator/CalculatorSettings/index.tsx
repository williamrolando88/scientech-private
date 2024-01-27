import { Card, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { LotTables } from './LotTables';

const CalculatorSettings: FC = () => (
  <Stack component={Card} p={2} elevation={0} variant="outlined" gap={2}>
    <Typography variant="h6" fontWeight={600} sx={{ textTransform: 'uppercase' }}>
      Costos de Lote
    </Typography>

    <LotTables />
  </Stack>
);

export default CalculatorSettings;
