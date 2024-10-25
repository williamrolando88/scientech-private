import { Box, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { round } from 'mathjs';
import { DayBookTransactionOld } from 'src/types/dayBook';

export function DayBookTransactionSummary() {
  const { values } = useFormikContext<DayBookTransactionOld>();

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
      <Box>
        Total debe: <strong>${round(totalDebit, 2)}</strong>
      </Box>

      <Box>
        Total haber: <strong>${round(totalCredit, 2)}</strong>
      </Box>
    </Stack>
  );
}
