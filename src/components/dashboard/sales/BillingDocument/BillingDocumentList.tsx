import { CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Iconify from '@src/components/shared/iconify';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { DEFAULT_ACCOUNT } from '@src/lib/constants/settings';
import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { saleConverter } from '@src/services/firestore/sales';
import { Sale } from '@src/types/sale';
import { orderBy } from 'firebase/firestore';
import { FC } from 'react';

const BillingDocumentList: FC = () => {
  const sales = useCollectionSnapshot<Sale>({
    collectionName: COLLECTIONS_ENUM.SALES,
    converter: saleConverter,
    additionalQueries: [orderBy('billingDocument.issueDate', 'desc')],
  });

  const columns: GridColDef<Sale>[] = [
    {
      field: 'issueDate',
      headerName: 'Fecha de Emisión',
      type: 'date',
      width: 130,
      sortable: false,
      valueGetter: ({ row }) => row.billingDocument.issueDate,
    },
    {
      field: 'sequentialNumber',
      headerName: 'Nro.',
      width: 50,
      sortable: false,
      valueGetter: ({ row }) => row.billingDocument.sequentialNumber,
    },
    {
      field: 'recipientName',
      flex: 1,
      headerName: 'Razón Social',
      sortable: false,
      valueGetter: ({ row }) => row.billingDocument.recipientName,
    },
    {
      field: 'description',
      flex: 3,
      headerName: 'Descripcion',
      sortable: false,
      valueGetter: ({ row }) => row.billingDocument.description,
    },
    {
      field: 'paymentDue',
      headerName: 'Total',
      type: 'number',
      sortable: false,
      valueFormatter: ({ value }) =>
        value ? `$${Number(value).toFixed(2)}` : '-',
    },
    {
      field: 'paid',
      headerName: 'Pagar',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        // <PaymentButton
        //   purchase={purchases.find((p) => p.id === params.row.id)}
        // />,
      ],
    },
    {
      field: 'ready',
      headerName: '',
      type: 'boolean',
      width: 10,
      sortable: false,
      valueGetter: ({ row }) =>
        row.billingDocument.saleAccount !== DEFAULT_ACCOUNT.INCOME_ROOT,
      renderCell: (params) =>
        params.value ? (
          <Iconify
            icon="pajamas:check-xs"
            sx={{ color: (theme) => theme.palette.success.main }}
          />
        ) : (
          <Iconify
            icon="pajamas:issue-type-feature-flag"
            sx={{ color: (theme) => theme.palette.warning.main }}
          />
        ),
    },
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        // <GridActionsCellItem
        //   label="Modificar"
        //   onClick={() => setInvoiceToUpdate(params.row)}
        //   icon={<Iconify icon="pajamas:doc-changes" />}
        //   showInMenu
        // />,
        // <GridActionsCellItem
        //   label="Borrar"
        //   onClick={() => setInvoiceToDelete(params.row)}
        //   icon={<Iconify icon="pajamas:remove" />}
        //   showInMenu
        // />,
      ],
    },
  ];

  return (
    <CardContent>
      <DataGrid
        autoHeight
        columns={columns}
        rows={sales}
        disableColumnFilter
        disableRowSelectionOnClick
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        pageSizeOptions={[20, 50, 100]}
      />
    </CardContent>
  );
};

export default BillingDocumentList;
