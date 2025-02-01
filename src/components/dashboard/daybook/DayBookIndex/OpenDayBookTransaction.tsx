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
  TextField,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import { useListAccountCategories } from '@src/hooks/cache/accountCategories';
import { useListProjects } from '@src/hooks/cache/projects';
import { getProjectName } from '@src/lib/modules/projects';
import {
  DoubleEntryAccounting,
  DoubleEntryAccountingTransaction,
} from '@src/types/doubleEntryAccounting';
import { FC, useMemo } from 'react';

interface OpenDayBookTransactionProps {
  transaction: DoubleEntryAccounting | null;
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
  const { data: projects, isLoading: isLoadingProjects } = useListProjects();
  const { data: accountCategories } = useListAccountCategories();

  const columns: GridColDef<DoubleEntryAccountingTransaction>[] = [
    {
      field: 'account_id',
      headerName: 'Cuenta contable',
      type: 'string',
      flex: 5,
      valueGetter: (params) =>
        `
      ${params.row.accountId} -
      ${accountCategories[params.row.accountId]?.name || ''}
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
  ];

  const rows: DoubleEntryAccountingTransaction[] = useMemo(
    () =>
      transaction
        ? Object.values(transaction.transactions).map((t) => ({
            ...t,
            id: t.accountId,
          }))
        : [],
    [transaction]
  );

  if (!transaction) return null;

  const renderProjectName = () => {
    if (isLoadingProjects) return '';

    const project = projects.find((p) => p.id === transaction.ref.projectId);
    if (!project) return '';

    return getProjectName(project);
  };

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

        <DatePicker
          format="dd/MMM/yyyy"
          value={transaction.issueDate}
          label="Fecha"
          disabled
          sx={{ width: 200 }}
        />

        <TextField
          size="small"
          multiline
          rows={3}
          fullWidth
          name="description"
          label="Descripción"
          value={transaction.description}
          disabled
        />

        <TextField
          size="small"
          fullWidth
          name="project"
          label="Proyecto"
          value={renderProjectName()}
          disabled
        />

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
        {actions || <Button onClick={onClose}>Cerrar</Button>}
      </DialogActions>
    </Dialog>
  );
};
