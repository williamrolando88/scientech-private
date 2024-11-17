import { Box, Stack } from '@mui/material';
import { DoubleEntryAccountingForm } from '@src/types/doubleEntryAccounting';
import { useFormikContext } from 'formik';
import { round } from 'mathjs';

export function DayBookTransactionSummary() {
  const { values } = useFormikContext<DoubleEntryAccountingForm>();

  const totalDebit = values.transactions.reduce(
    (acc, curr) => acc + curr.debit!,
    0,
  );
  const totalCredit = values.transactions.reduce(
    (acc, curr) => acc + curr.credit!,
    0,
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
