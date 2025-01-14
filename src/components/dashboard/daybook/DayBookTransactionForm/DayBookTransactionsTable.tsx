import { Box, Paper, Stack } from '@mui/material';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { useFormikContext } from 'formik';
import { FC } from 'react';
import Scrollbar from 'src/components/shared/scrollbar';
import { DayBookTransactionsTableHeader } from './DayBookTransactionsTableHeader';
import { DayBookTransactionsTableRow } from './DayBookTransactionsTableRow';

export const DayBookTransactionsTable: FC = () => {
  const { values } = useFormikContext<DoubleEntryAccounting>();

  return (
    <Stack component={Paper} variant="outlined" p={2}>
      <DayBookTransactionsTableHeader />

      <Box height={200}>
        <Scrollbar sx={{ display: 'flex', flexDirection: 'column' }}>
          {values.transactions.map((_, index) => (
            <DayBookTransactionsTableRow key={index} index={index} />
          ))}
        </Scrollbar>
      </Box>
    </Stack>
  );
};
