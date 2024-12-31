import { Dialog, DialogTitle } from '@mui/material';
import { formatInvoiceNumber } from '@src/lib/utils/formatInvoiceNumber';
import { BillingDocument, Sale } from '@src/types/sale';
import { FormikConfig } from 'formik';
import { FC } from 'react';
import BillingDocumentForm from './BillingDocumentForm';

interface Props {
  sale: Sale | null;
  open: boolean;
  onClose: VoidFunction;
}

const UpdateBillingDocument: FC<Props> = ({ sale, open, onClose }) => {
  const handleSubmit: FormikConfig<BillingDocument>['onSubmit'] = () => {};

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
