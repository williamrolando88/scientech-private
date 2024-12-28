import { DialogTitle } from '@mui/material';
import AddPurchaseDocumentModal from '@src/components/shared/AddPurchaseDocumentModal';
import { SALE_NOTE_INITIAL_VALUE } from '@src/lib/constants/purchases';
import { PurchasesFirestore } from '@src/services/firestore/purchases';
import { Purchase, SaleNote } from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseSaleNoteForm from './SaleNoteForm/BaseSaleNoteForm';

interface Props {
  onClose?: VoidFunction;
}

const AddSaleNote: FC<Props> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<SaleNote>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    const purchase: Purchase = {
      purchaseData: values,
      type: 'saleNote',
    };

    PurchasesFirestore.create(purchase)
      .then(() => {
        resetForm();
        enqueueSnackbar('Nota de venta guardada exitosamente');
        onClose?.();
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

  return (
    <>
      <DialogTitle>Agregar nueva nota de venta</DialogTitle>

      <BaseSaleNoteForm
        infoText="Ingrese los datos de la nota de venta. Los campos marcados con * son obligatorios. Si la nota de venta esta asociada a un proyecto, selecciónelo en el campo correspondiente"
        onClose={onClose}
        initialValues={SALE_NOTE_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const AddSaleNoteModal = () => (
  <AddPurchaseDocumentModal>
    <AddSaleNote />
  </AddPurchaseDocumentModal>
);

export default AddSaleNoteModal;
