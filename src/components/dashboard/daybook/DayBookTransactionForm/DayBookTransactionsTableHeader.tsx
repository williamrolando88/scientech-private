import { Button, Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE } from 'src/lib/constants/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';
import { TableHeader } from './TableHeader';

export const DayBookTransactionsTableHeader = () => {
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
    <Grid container columns={7} columnSpacing={1}>
      <Grid item xs={1}>
        <TableHeader>Cuenta</TableHeader>
      </Grid>
      <Grid item xs={1}>
        <TableHeader>Debe</TableHeader>
      </Grid>
      <Grid item xs={1}>
        <TableHeader>Haber</TableHeader>
      </Grid>
      <Grid item xs={1}>
        <TableHeader>Descripción de la Transacción</TableHeader>
      </Grid>
      <Grid item xs={1}>
        <TableHeader>Cotización</TableHeader>
      </Grid>
      <Grid item xs={1}>
        <TableHeader>Factura</TableHeader>
      </Grid>

      <Grid item xs={1}>
        <Button
          sx={{ height: '100%', width: '100%' }}
          type="button"
          variant="soft"
          color="success"
          onClick={handleAddRow}
        >
          Agregar
        </Button>
      </Grid>
    </Grid>
  );
};
