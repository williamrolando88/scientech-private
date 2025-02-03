import { PurchasesFirestore } from '@src/services/firestore/purchases';
import { DocumentRef, WrappedDocumentRef } from '@src/types/documentReference';
import {
  CustomsPayment,
  NonDeductible,
  Payment,
  Purchase,
  ReceivedInvoice,
  SaleNote,
} from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import UpdateAssociatedProjectModal from './UpdateAssociatedProjectModal';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  purchase: ReceivedInvoice | CustomsPayment | NonDeductible | SaleNote | null;
}

const UpdatePurchasesProject: FC<Props> = ({ purchase, onClose, open }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<WrappedDocumentRef>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    const updatedRefs = {
      id: purchase?.id,
      purchaseData: { ref: { ...purchase?.ref, ...values.ref } },
    } as Purchase;

    if (purchase?.paid) {
      const paymentRef = {
        ...updatedRefs.purchaseData.ref,
        purchaseId: purchase.id,
      } as DocumentRef;
      updatedRefs.payment = { ref: paymentRef } as Payment;
    }

    PurchasesFirestore.update(updatedRefs)
      .then(() => {
        resetForm();
        enqueueSnackbar('Proyecto vinculado exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(
          `No se pudo vincular el proyecto seleccionado. ${error}`,
          {
            variant: 'error',
          }
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!purchase) return null;

  return (
    <UpdateAssociatedProjectModal
      initialValues={{ ref: purchase.ref }}
      onClose={onClose}
      open={open}
      onSubmit={handleSubmit}
      infoText="Por favor selecciona el proyecto asociado a esta compra"
    />
  );
};

export default UpdatePurchasesProject;
