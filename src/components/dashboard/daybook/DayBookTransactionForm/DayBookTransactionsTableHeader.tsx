import { Button, Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import Iconify from 'src/components/shared/iconify';
import {
  DAYBOOK_FORM_GRID_LAYOUT,
  DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE,
} from 'src/lib/constants/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';
import { TableCell } from './TableCell';

export function DayBookTransactionsTableHeader() {
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

  const HeadersArray = [
    <TableCell>Cuenta</TableCell>,
    <TableCell>Debe</TableCell>,
    <TableCell>Haber</TableCell>,
    <TableCell>Descripción de la Transacción</TableCell>,
    <TableCell>Cotización</TableCell>,
    <TableCell>Factura Emitida</TableCell>,
    <Button
      sx={{ height: '100%', width: '100%' }}
      type="button"
      variant="soft"
      color="success"
      onClick={handleAddRow}
    >
      <Iconify icon="pajamas:plus" />
    </Button>,
  ];

  const totalColumns = useMemo(
    () => DAYBOOK_FORM_GRID_LAYOUT.reduce((acc, curr) => acc + curr.value, 0),
    []
  );

  return (
    <Grid container columns={totalColumns} columnSpacing={1}>
      {DAYBOOK_FORM_GRID_LAYOUT.map((item, idx) => (
        <Grid item xs={item.value} key={idx}>
          {HeadersArray[idx]}
        </Grid>
      ))}
    </Grid>
  );
}
