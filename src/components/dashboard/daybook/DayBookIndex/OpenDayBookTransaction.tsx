import {
  Alert,
  AlertColor,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useListAccountCategories } from '@src/hooks/cache/accountCategories';
import { FC, useMemo } from 'react';
import {
  DayBookTableEntryOld,
  DayBookTransactionDetailOld,
  DayBookTransactionOld,
} from 'src/types/dayBook';

interface OpenDayBookTransactionProps {
  transaction: DayBookTransactionOld | null;
  onClose: () => void;
  actions?: React.ReactNode;
  alertText?: string;
  alertSeverity?: AlertColor;
  title?: string;
}
export const OpenDayBookTransaction: FC<OpenDayBookTransactionProps> = ({
  onClose,
  transaction,
  actions,
  title = 'Detalles de transacción',
  alertText = 'La transacción seleccionada contiene los siguientes detalles asociados.',
  alertSeverity = 'info',
}) => {
  const { data: accountCategories } = useListAccountCategories();

  const columns: GridColDef<DayBookTransactionDetailOld>[] = [
    {
      field: 'account_id',
      headerName: 'Cuenta contable',
      type: 'string',
      flex: 5,
      valueGetter: (params) =>
        `
      ${params.row.account_id} -
      ${accountCategories[params.row.account_id]?.name || ''},
      `,
    },
    {
      field: 'debit',
      headerName: 'Debe',
      headerAlign: 'center',
      type: 'number',
      flex: 1,
      align: 'center',
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
    },
    {
      field: 'credit',
      headerName: 'Haber',
      headerAlign: 'center',
      type: 'number',
      flex: 1,
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
      flex: 1,
      align: 'center',
      valueFormatter: ({ value }) => value || '-',
    },
    {
      field: 'invoice_id',
      headerName: 'Factura No.',
      headerAlign: 'center',
      type: 'number',
      flex: 1,
      align: 'center',
      valueFormatter: ({ value }) => value || '-',
    },
  ];

  const rows: DayBookTableEntryOld[] = useMemo(
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
      onClose={onClose}
      open={Boolean(transaction)}
    >
      <DialogTitle>{title}</DialogTitle>

      <Stack component={DialogContent} gap={2}>
        {alertText && <Alert severity={alertSeverity}>{alertText}</Alert>}

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
            sx={{
              '& .MuiDataGrid-columnHeader': {
                bgcolor: (theme) => theme.palette.action.selected,
              },
            }}
            autoHeight
            disableRowSelectionOnClick
            hideFooter
          />
        </Card>
      </Stack>

      <DialogActions>
        {actions || <Button onClick={onClose}>Cancelar</Button>}
      </DialogActions>
    </Dialog>
  );
};
