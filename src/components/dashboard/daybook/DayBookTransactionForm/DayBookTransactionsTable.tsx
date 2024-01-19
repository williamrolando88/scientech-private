import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC } from 'react';
import Scrollbar from 'src/components/shared/scrollbar';
import { DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE } from 'src/lib/constants/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';
import { DayBookTransactionsTableRow } from './DayBookTransactionsTableRow';

export const DayBookTransactionsTable: FC = () => {
  const { values } = useFormikContext<DayBookTransaction>();

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

const DayBookTransactionsTableHeader = () => {
  const { values, setValues } = useFormikContext<DayBookTransaction>();

  const handleAddRow = () => {
    setValues({
      ...values,
      transactions: [
        ...values.transactions,
        DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE,
      ],
    });
  };

  return (
    <Grid container columns={7}>
      <Grid item xs={1}>
        <Typography>Cuenta</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>Debe</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>Haber</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>Descripción de la Transacción</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>Cotización</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>Factura</Typography>
      </Grid>

      <Grid item xs={1}>
        <Button type="button" variant="soft" onClick={handleAddRow}>
          Agregar
        </Button>
      </Grid>
    </Grid>
  );
};
