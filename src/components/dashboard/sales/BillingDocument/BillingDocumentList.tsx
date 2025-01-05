import { Button, CardContent, IconButton } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
} from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog';
import Iconify from '@src/components/shared/iconify';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { DEFAULT_ACCOUNT } from '@src/lib/constants/settings';
import { COLLECTIONS_ENUM } from '@src/lib/enums/collections';
import { saleConverter, SalesFirestore } from '@src/services/firestore/sales';
import { Sale } from '@src/types/sale';
import { orderBy } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import PaymentCollectionButton from '../PaymentCollection/PaymentCollectionButton';
import AddWithholding from '../Withholding/AddWithholding';
import OpenWithholding from '../Withholding/OpenWithholding';
import UpdateBillingDocument from './UpdateBillingDocument';

const BillingDocumentList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [sale2Update, setSale2Update] = useState<Sale | null>(null);
  const [sale2Delete, setSale2Delete] = useState<Sale | null>(null);
  const [withholding2Open, setWithholding2Open] = useState<Sale | null>(null);
  const [withholding2Delete, setWithholding2Delete] = useState<Sale | null>(
    null
  );

  const sales = useCollectionSnapshot<Sale>({
    collectionName: COLLECTIONS_ENUM.SALES,
    converter: saleConverter,
    additionalQueries: [
      orderBy('billingDocument.issueDate', 'desc'),
      orderBy('billingDocument.sequentialNumber', 'desc'),
    ],
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
      headerName: 'Por cobrar',
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
      getActions: ({ row }) => [<PaymentCollectionButton sale={row} />],
    },
    {
      field: 'withholding',
      headerName: 'Ret.',
      type: 'actions',
      width: 10,
      sortable: false,
      getActions: ({ row }) => {
        if (row.withholding) {
          const hasErrors =
            Number.isNaN(row.withholding.IVAWithholding) ||
            Number.isNaN(row.withholding.IncomeWithholding);

          return [
            <IconButton onClick={() => setWithholding2Open(row)}>
              <Iconify
                icon={
                  hasErrors
                    ? 'pajamas:review-warning'
                    : 'pajamas:review-checkmark'
                }
                sx={{
                  color: (theme) =>
                    Number.isNaN(row.paymentDue)
                      ? theme.palette.error.main
                      : theme.palette.success.main,
                }}
              />
            </IconButton>,
          ];
        }

        if (row.paymentCollection && !row.withholding) {
          return [
            <Iconify
              icon="pajamas:review-list"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            />,
          ];
        }

        return [<AddWithholding sale={row} />];
      },
    },
    {
      field: 'salesAccount',
      headerName: 'Cta.',
      type: 'actions',
      width: 10,
      sortable: false,
      getActions: ({ row }) => {
        const isError =
          row.billingDocument.saleAccount === DEFAULT_ACCOUNT.INCOME_ROOT &&
          (row.paymentCollection || row.withholding);

        if (isError) {
          return [
            <Iconify
              icon="pajamas:issue-type-feature-flag"
              sx={{ color: (theme) => theme.palette.error.main }}
            />,
          ];
        }

        const isWarning =
          row.billingDocument.saleAccount === DEFAULT_ACCOUNT.INCOME_ROOT;

        if (isWarning) {
          return [
            <Iconify
              icon="pajamas:issue-type-feature-flag"
              sx={{ color: (theme) => theme.palette.warning.main }}
            />,
          ];
        }

        return [
          <Iconify
            icon="pajamas:check-xs"
            sx={{ color: (theme) => theme.palette.success.main }}
          />,
        ];
      },
    },
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: ({ row }) => {
        const defaultOptions = [
          <GridActionsCellItem
            label="Modificar factura"
            onClick={() => setSale2Update(row)}
            icon={<Iconify icon="pajamas:doc-changes" />}
            showInMenu
          />,
          <GridActionsCellItem
            label="Borrar factura"
            onClick={() => setSale2Delete(row)}
            icon={<Iconify icon="pajamas:remove" />}
            showInMenu
          />,
        ];

        if (row.withholding) {
          const withholdingOptions = [
            <GridActionsCellItem
              label={
                row.withholding.unlocked
                  ? 'Editar retención'
                  : 'Visualizar retención'
              }
              onClick={() => setWithholding2Open(row)}
              icon={<Iconify icon="pajamas:review-list" />}
              sx={{
                borderTop: '1px solid #ddd',
              }}
              showInMenu
            />,
            <GridActionsCellItem
              label="Borrar retención"
              onClick={() => setWithholding2Delete(row)}
              icon={<Iconify icon="pajamas:remove" />}
              showInMenu
            />,
          ];

          defaultOptions.push(...withholdingOptions);
        }

        return defaultOptions;
      },
    },
  ];

  const onRowClick: GridEventListener<'rowClick'> = ({ row }) => {
    setSale2Update(row);
  };

  const handleDeleteInvoice = async () => {
    if (!sale2Delete) return;

    SalesFirestore.remove(sale2Delete)
      .then(() => {
        enqueueSnackbar('Factura eliminada exitosamente');
      })
      .catch((error) => {
        enqueueSnackbar(`No se pudo eliminar el documento`, {
          variant: 'error',
        });
        console.error(error);
      })
      .finally(() => {
        setSale2Delete(null);
      });
  };

  const handleDeleteWithholding = async () => {
    if (!withholding2Delete) return;

    SalesFirestore.deleteWithhold(withholding2Delete)
      .then(() => {
        enqueueSnackbar('Retencion eliminada exitosamente');
      })
      .catch((error) => {
        enqueueSnackbar(`No se pudo eliminar el documento`, {
          variant: 'error',
        });
        console.error(error);
      })
      .finally(() => {
        setWithholding2Delete(null);
      });
  };

  return (
    <>
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={sales}
          disableColumnFilter
          onRowClick={onRowClick}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
          pageSizeOptions={[20, 50, 100]}
        />
      </CardContent>

      <UpdateBillingDocument
        open={Boolean(sale2Update)}
        sale={sale2Update}
        onClose={() => setSale2Update(null)}
      />

      <OpenWithholding
        open={Boolean(withholding2Open)}
        sale={withholding2Open}
        onClose={() => setWithholding2Open(null)}
      />

      <ConfirmDialog
        onClose={() => setSale2Delete(null)}
        open={!!sale2Delete}
        title="Borrar factura"
        content="Esta operación borrará la factura seleccionada y todos los documentos dependientes existentes (retenciones, cobros), así como sus asientos contables. Deseas continuar?"
        maxWidth="md"
        action={
          <Button onClick={handleDeleteInvoice} variant="contained">
            Borrar
          </Button>
        }
      />
      <ConfirmDialog
        onClose={() => setWithholding2Delete(null)}
        open={!!withholding2Delete}
        title="Borrar retención"
        action={
          <Button onClick={handleDeleteWithholding} variant="contained">
            Borrar
          </Button>
        }
      />
    </>
  );
};

export default BillingDocumentList;
