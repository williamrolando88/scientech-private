import { Box, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { DayBookTransaction } from 'src/types/dayBook';

export const DayBookTransactionSummary = () => {
  const { values } = useFormikContext<DayBookTransaction>();

  const totalDebit = values.transactions.reduce(
    (acc, curr) => acc + curr.debit!,
    0
  );
  const totalCredit = values.transactions.reduce(
    (acc, curr) => acc + curr.credit!,
    0
  );

  return (
    <Stack direction="row" gap={4} mr={2}>
      <Box>{`Total debe: $${totalDebit}`}</Box>

      <Box>{`Total haber: $${totalCredit}`}</Box>
    </Stack>
  );
};
