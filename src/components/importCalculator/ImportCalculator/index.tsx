import { Stack } from '@mui/material';
import { FC } from 'react';
import CalculatorItems from './CalculatorItems';
import CalculatorNotes from './CalculatorNotes';
import { CalculatorReport } from './CalculatorReport';
import CalculatorSettings from './CalculatorSettings';

const ImportCalculator: FC = () => (
  <Stack gap={3} py={4}>
    <CalculatorItems />
    <CalculatorSettings />
    <CalculatorNotes />
    <CalculatorReport />
  </Stack>
);

export default ImportCalculator;
