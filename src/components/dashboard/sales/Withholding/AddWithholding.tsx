import { Dialog, DialogTitle, IconButton } from '@mui/material';
import Iconify from '@src/components/shared/iconify';
import { formatTaxDocIdNumber } from '@src/lib/utils/formatInvoiceNumber';
import { subId } from '@src/services/firestore/helpers/subIdGenerator';
import { SalesFirestore } from '@src/services/firestore/sales';
import { Sale, Withholding } from '@src/types/sale';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import WithholdingForm from './WithholdingForm';

interface Props {
  sale: Sale;
}

const AddWithholding: FC<Props> = ({ sale }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit: FormikConfig<Withholding>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    const newSale: Sale = { ...sale, withholding: values };

    SalesFirestore.upsertSingleWithholding(newSale)
      .then(() => {
        resetForm();
        enqueueSnackbar('Retención registrado exitosamente');
        closeModal();
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

  return (
    <>
      <IconButton onClick={openModal}>
        <Iconify
          icon="pajamas:review-warning"
          sx={{ color: (theme) => theme.palette.warning.main }}
        />
      </IconButton>

      <Dialog open={modalOpen} onClose={closeModal} maxWidth="md" fullWidth>
        <DialogTitle>Agregar nueva retención</DialogTitle>

        <WithholdingForm
          IVAValue={sale.billingDocument.IVA}
          incomeValue={sale.billingDocument.taxedSubtotal}
          initialValues={withholding}
          invoiceId={formatTaxDocIdNumber({
            establishment,
            emissionPoint,
            sequentialNumber,
          })}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      </Dialog>
    </>
  );
};

export default AddWithholding;
