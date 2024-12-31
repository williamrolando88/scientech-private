import { Dialog, DialogTitle } from '@mui/material';
import { formatInvoiceNumber } from '@src/lib/utils/formatInvoiceNumber';
import { SalesFirestore } from '@src/services/firestore/sales';
import { BillingDocument, Sale } from '@src/types/sale';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BillingDocumentForm from './BillingDocumentForm';

interface Props {
  sale: Sale | null;
  open: boolean;
  onClose: VoidFunction;
}

const UpdateBillingDocument: FC<Props> = ({ sale, open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<BillingDocument>['onSubmit'] = async (
    values,
    { setSubmitting }
  ) => {
    const updatedSale: Sale = {
      ...(sale as Sale),
      billingDocument: values,
    };
    SalesFirestore.update(updatedSale)
      .then(() => {
        enqueueSnackbar('Factura actualizada exitosamente');
        onClose();
      })
      .catch((e) => {
        enqueueSnackbar('Factura actualizada exitosamente', {
          variant: 'error',
        });
        console.error(e);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!sale) return null;

  const {
    billingDocument: { emissionPoint, establishment, sequentialNumber },
  } = sale;

  const title = `Factura: ${formatInvoiceNumber({ emissionPoint, establishment, sequentialNumber })}`;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>

      <BillingDocumentForm
        initialValues={sale.billingDocument}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpdateBillingDocument;
