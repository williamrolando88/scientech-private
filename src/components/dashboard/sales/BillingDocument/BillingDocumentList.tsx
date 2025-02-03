import { Button, CardContent } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import ConfirmDialog from '@src/components/shared/confirm-dialog';
import { useCollectionSnapshot } from '@src/hooks/useCollectionSnapshot';
import { fDate } from '@src/lib/utils/formatTime';
import { COLLECTIONS } from '@src/services/firestore/collections';
import { saleConverter, SalesFirestore } from '@src/services/firestore/sales';
import { Sale } from '@src/types/sale';
import { orderBy } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import ProjectTableAction from '../../purchases/ProjectTableAction';
import PaymentCollectionButton from '../PaymentCollection/PaymentCollectionButton';
import OpenWithholding from '../Withholding/OpenWithholding';
import { BillingDocumentActions } from './BillingDocumentActions';
import SalesAccountCheck from './SalesAccountCheck';
import UpdateBillingDocument from './UpdateBillingDocument';
import WithholdingAction from './WithholdingAction';

const BillingDocumentList: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [saleToUpdate, setSaleToUpdate] = useState<Sale | null>(null);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
  const [withholdingToOpen, setWithholdingToOpen] = useState<Sale | null>(null);
  const [withholdingToDelete, setWithholdingToDelete] = useState<Sale | null>(
    null
  );

  const sales = useCollectionSnapshot<Sale>({
    collection: COLLECTIONS.SALES,
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
      valueGetter: ({ row }) => row.billingDocument.issueDate,
      valueFormatter: (params) => fDate(params.value),
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
      getActions: ({ row }) => [
        <WithholdingAction
          row={row}
          onWithholdingClick={setWithholdingToOpen}
        />,
      ],
    },
    {
      field: 'salesAccount',
      headerName: 'Cta.',
      type: 'actions',
      width: 10,
      sortable: false,
      getActions: ({ row }) => [<SalesAccountCheck row={row} />],
    },
    {
      field: 'project',
      headerName: 'Proyecto',
      width: 90,
      sortable: false,
      type: 'actions',
      getActions: ({ row }) => [
        <ProjectTableAction row={row.billingDocument} />,
      ],
    },
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: ({ row }) =>
        BillingDocumentActions({
          row,
          onSaleDelete: setSaleToDelete,
          onSaleUpdate: setSaleToUpdate,
          onWithholdingDelete: setWithholdingToDelete,
          onWithholdingOpen: setWithholdingToOpen,
        }),
    },
  ];

  const onRowClick: GridEventListener<'rowClick'> = ({ row }) => {
    setSaleToUpdate(row);
  };

  const handleDeleteInvoice = async () => {
    if (!saleToDelete) return;

    SalesFirestore.remove(saleToDelete)
      .then(() => {
        enqueueSnackbar('Factura eliminada exitosamente');
      })
      .catch((error) => {
        enqueueSnackbar(`No se pudo eliminar el documento: ${error.message}`, {
          variant: 'error',
        });
        console.error(error);
      })
      .finally(() => {
        setSaleToDelete(null);
      });
  };

  const handleDeleteWithholding = async () => {
    if (!withholdingToDelete) return;

    SalesFirestore.deleteWithhold(withholdingToDelete)
      .then(() => {
        enqueueSnackbar('Retencion eliminada exitosamente');
      })
      .catch((error) => {
        enqueueSnackbar(`No se pudo eliminar el documento: ${error.message}`, {
          variant: 'error',
        });
        console.error(error);
      })
      .finally(() => {
        setWithholdingToDelete(null);
      });
  };

  return (
    <>
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          rows={sales}
          onRowClick={onRowClick}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
          pageSizeOptions={[20, 50, 100]}
        />
      </CardContent>

      <UpdateBillingDocument
        open={Boolean(saleToUpdate)}
        sale={saleToUpdate}
        onClose={() => setSaleToUpdate(null)}
      />

      <OpenWithholding
        open={Boolean(withholdingToOpen)}
        sale={withholdingToOpen}
        onClose={() => setWithholdingToOpen(null)}
      />

      <ConfirmDialog
        onClose={() => setSaleToDelete(null)}
        open={!!saleToDelete}
        title="Borrar factura"
        content="Esta operación borrará la factura seleccionada y todos los documentos dependientes existentes (retenciones, cobros), así como sus asientos contables. Deseas continuar?"
        maxWidth="md"
        action={
          <Button
            onClick={handleDeleteInvoice}
            variant="contained"
            color="error"
          >
            Borrar
          </Button>
        }
      />
      <ConfirmDialog
        onClose={() => setWithholdingToDelete(null)}
        open={!!withholdingToDelete}
        title="Borrar retención"
        action={
          <Button
            onClick={handleDeleteWithholding}
            variant="contained"
            color="error"
          >
            Borrar
          </Button>
        }
      />
    </>
  );
};

export default BillingDocumentList;
