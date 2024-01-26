import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC, useMemo } from 'react';
import { useDeleteDayBookTransaction } from 'src/hooks/cache/dayBook';
import {
  DayBookTableEntry,
  DayBookTransaction,
  DayBookTransactionDetail,
} from 'src/types/dayBook';

interface DeleteDayBookTransactionProps {
  transaction: DayBookTransaction | null;
  setTransaction: (transaction: DayBookTransaction | null) => void;
}

export const DeleteDayBookTransaction: FC<DeleteDayBookTransactionProps> = ({
  transaction,
  setTransaction,
}) => {
  const { mutate: handleDeleteAccount, isPending } =
    useDeleteDayBookTransaction();
  const handleClose = () => setTransaction(null);

  const transactionId = transaction?.id || '';

  const handleConfirm = () => {
    handleDeleteAccount(transactionId);
    handleClose();
  };

  const columns: GridColDef<DayBookTransactionDetail>[] = [
    {
      field: 'account_id',
      headerName: 'Cuenta contable',
      type: 'string',
      flex: 3,
    },
    {
      field: 'debit',
      headerName: 'Debe',
      headerAlign: 'center',
      type: 'number',
      flex: 2,
      align: 'center',
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
    },
    {
      field: 'credit',
      headerName: 'Haber',
      headerAlign: 'center',
      type: 'number',
      flex: 2,
      align: 'center',
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
    },
    {
      field: 'description',
      headerName: 'Descripción',
      type: 'string',
      flex: 6,
    },
    {
      field: 'quotation_id',
      headerName: 'Cotización No.',
      headerAlign: 'center',
      type: 'number',
      flex: 2,
      align: 'center',
      valueFormatter: ({ value }) => value || '-',
    },
    {
      field: 'invoice_id',
      headerName: 'Factura No.',
      headerAlign: 'center',
      type: 'number',
      flex: 2,
      align: 'center',
      valueFormatter: ({ value }) => value || '-',
    },
  ];

  const rows: DayBookTableEntry[] = useMemo(
    () =>
      transaction?.transactions.map((t) => ({
        ...t,
        id: t.account_id,
        date: transaction.date,
      })) || [],

    [transaction?.date, transaction?.transactions]
  );

  if (!transaction) return null;

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      onClose={handleClose}
      open={Boolean(transaction)}
    >
      <DialogTitle>Eliminar Transacción</DialogTitle>

      <Stack component={DialogContent} gap={2}>
        <Alert severity="warning">
          La transacción que deseas eliminar contiene los siguientes detalles.
          ¿Está seguro que desea eliminar esta transacción?
        </Alert>

        <Card variant="outlined">
          <DataGrid
            columns={columns}
            rows={rows}
            density="compact"
            initialState={{
              sorting: {
                sortModel: [{ field: 'date', sort: 'asc' }],
              },
            }}
            autoHeight
            disableRowSelectionOnClick
            hideFooter
          />
        </Card>
      </Stack>

      <DialogActions>
        <Button onClick={handleClose} disabled={isPending}>
          Cancelar
        </Button>

        <LoadingButton
          variant="contained"
          onClick={handleConfirm}
          loading={isPending}
        >
          Eliminar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
