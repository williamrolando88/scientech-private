import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useMemo, useState } from 'react';
import Iconify from 'src/components/shared/iconify';
import {
  useListDayBookTransactions,
  useUpdateDayBookTransaction,
} from 'src/hooks/cache/dayBook';
import { getTransactionDataByDetailId } from 'src/lib/modules/dayBook';
import { DayBookTransactionParser } from 'src/lib/parsers/dayBook';
import { DayBookTableEntry, DayBookTransaction } from 'src/types/dayBook';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DayBookTransactionForm } from './DayBookTransactionForm';
import { DeleteDayBookTransaction } from './DeleteDayBookTransaction';

const DayBookIndex: FC = () => {
  const [transactionToDelete, setTransactionToDelete] =
    useState<DayBookTransaction | null>(null);
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<DayBookTransaction | null>(null);
  const { data: dayBookTransactions, isLoading } = useListDayBookTransactions();

  const getTransactionToDelete = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        dayBookTransactions
      );
      setTransactionToDelete(transaction);
    },
    [dayBookTransactions]
  );

  const getTransactionToUpdate = useCallback(
    (detailId: string) => {
      const transaction = getTransactionDataByDetailId(
        detailId,
        dayBookTransactions
      );
      setTransactionToUpdate(transaction);
    },
    [dayBookTransactions]
  );

  const columns: GridColDef<DayBookTableEntry>[] = useMemo(
    () => [
      {
        field: 'date',
        headerName: 'Fecha',
        flex: 2,
        type: 'date',
        valueFormatter: ({ value }) =>
          new Date(value as string).toLocaleDateString(),
      },
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
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            label="Modificar"
            onClick={() => getTransactionToUpdate(params.id as string)}
            icon={<Iconify icon="pajamas:doc-changes" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Borrar"
            onClick={() => getTransactionToDelete(params.id as string)}
            icon={<Iconify icon="pajamas:remove" />}
            showInMenu
          />,
        ],
      },
    ],
    [getTransactionToDelete, getTransactionToUpdate]
  );

  const rows: DayBookTableEntry[] = useMemo(
    () =>
      (dayBookTransactions || [])
        .map((entry) =>
          (entry.transactions || []).map((detail, index) => ({
            ...detail,
            id: `${entry.id}:${index}`,
            date: entry.date,
          }))
        )
        .flat(),
    [dayBookTransactions]
  );

  return (
    <Card>
      <CardHeader title="Libro Diario" />
      <CardContent>
        <DataGrid
          columns={columns}
          rows={rows}
          loading={isLoading}
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
        />
      </CardContent>
      <UpdateDayBookTransactionForm
        setTransaction={setTransactionToUpdate}
        transaction={transactionToUpdate}
      />
      <DeleteDayBookTransaction
        transaction={transactionToDelete}
        setTransaction={setTransactionToDelete}
      />
    </Card>
  );
};

export default DayBookIndex;

interface UpdateDayBookTransactionFormProps {
  transaction: DayBookTransaction | null;
  setTransaction: (transaction: DayBookTransaction | null) => void;
}

const UpdateDayBookTransactionForm: FC<UpdateDayBookTransactionFormProps> = ({
  setTransaction,
  transaction,
}) => {
  const handleCloseModal = () => setTransaction(null);
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateTransaction } = useUpdateDayBookTransaction();

  const onSubmit: FormikConfig<DayBookTransaction>['onSubmit'] = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    setSubmitting(true);

    updateTransaction(values)
      .then(() => {
        resetForm();
        handleCloseModal();
        enqueueSnackbar('Transacción actualizada exitosamente');
      })
      .catch(() => {
        enqueueSnackbar('Error al guardar la transacción', {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!transaction) return null;

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={Boolean(transaction)}
      onClose={handleCloseModal}
    >
      <DialogTitle>Modificar transacción</DialogTitle>

      <DayBookTransactionForm
        infoText="Aquí puedes modificar los datos de la transacción"
        initialValues={transaction}
        onSubmit={onSubmit}
        onClose={handleCloseModal}
        validationSchema={toFormikValidationSchema(DayBookTransactionParser)}
      />
    </Dialog>
  );
};
