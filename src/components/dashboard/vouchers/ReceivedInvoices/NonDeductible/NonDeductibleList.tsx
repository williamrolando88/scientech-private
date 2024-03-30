import { CardContent } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import Iconify from '@src/components/shared/iconify';
import { useListExpensesByType } from '@src/hooks/cache/expenses';
import { Expense } from '@src/types/expenses';
import { FC, useState } from 'react';
import UpdateNonDeductible from './UpdateNonDeductible';

const NonDeductibleList: FC = () => {
  const [expenseToUpdate, setExpenseToUpdate] = useState<Expense | null>(null);
  const { data: nonDeductible, isLoading } =
    useListExpensesByType<Expense>('non_deductible');

  const columns: GridColDef<Expense>[] = [
    {
      field: 'issue_date',
      headerName: 'Fecha de Emisión',
      type: 'date',
      width: 130,
      sortable: false,
    },
    {
      field: 'issuer_name',
      flex: 1,
      headerName: 'Emisor y/o motivo',
      sortable: false,
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      sortable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          label="Modificar"
          onClick={() => setExpenseToUpdate(params.row)}
          icon={<Iconify icon="pajamas:doc-changes" />}
          showInMenu
        />,
        // <GridActionsCellItem
        //   label="Borrar"
        //   onClick={() => getTransactionToDelete(params.id as string)}
        //   icon={<Iconify icon="pajamas:remove" />}
        //   showInMenu
        //   disabled={params.row.locked}
        // />,
      ],
    },
  ];

  return (
    <>
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={nonDeductible}
          disableColumnFilter
          initialState={{
            sorting: {
              sortModel: [{ field: 'issue_date', sort: 'desc' }],
            },
          }}
          loading={isLoading}
        />
      </CardContent>

      <UpdateNonDeductible
        open={!!expenseToUpdate}
        initialValues={expenseToUpdate}
        onClose={() => setExpenseToUpdate(null)}
        key={expenseToUpdate?.id}
      />
    </>
  );
};

export default NonDeductibleList;
