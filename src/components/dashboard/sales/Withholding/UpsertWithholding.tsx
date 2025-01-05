import { Dialog, DialogTitle } from '@mui/material';
import { formatTaxDocIdNumber } from '@src/lib/utils/formatInvoiceNumber';
import { subId } from '@src/services/firestore/helpers/subIdGenerator';
import { SalesFirestore } from '@src/services/firestore/sales';
import { Sale, Withholding } from '@src/types/sale';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import WithholdingForm from './WithholdingForm';

interface Props {
  sale: Sale | null;
  open: boolean;
  onClose: VoidFunction;
}

const UpsertWithholding: FC<Props> = ({ onClose, open, sale }) => {
  const { enqueueSnackbar } = useSnackbar();

  if (!sale) return null;

  const handleSubmit: FormikConfig<Withholding>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    const newSale: Sale = { ...sale, withholding: values };

    SalesFirestore.upsertSingleWithholding(newSale)
      .then(() => {
        resetForm();
        enqueueSnackbar(
          sale.withholding
            ? 'Retención actualizada exitosamente'
            : 'Retención creada exitosamente'
        );
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(`No se pudo guardar el documento. ${error}`, {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const withholding: Withholding = {
    id: subId(sale.id!, 'saleWithholding'),
    establishment: 1,
    emissionPoint: 1,
    sequentialNumber: 1,
    issueDate: new Date(),
    issuerId: sale.billingDocument.recipientId,
    issuerName: sale.billingDocument.recipientName,
    IVAWithholding: 0,
    IncomeWithholding: 0,
    total: 0,
    ref: {
      ...sale.billingDocument.ref,
      saleId: sale.id,
    },
    unlocked: true,
  };

  const { establishment, emissionPoint, sequentialNumber } =
    sale.billingDocument;

  const title = sale.withholding
    ? 'Actualizar retención'
    : 'Agregar nueva retención';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <WithholdingForm
        IVAValue={sale.billingDocument.IVA}
        incomeValue={sale.billingDocument.taxedSubtotal}
        initialValues={sale.withholding ?? withholding}
        invoiceId={formatTaxDocIdNumber({
          establishment,
          emissionPoint,
          sequentialNumber,
        })}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default UpsertWithholding;
