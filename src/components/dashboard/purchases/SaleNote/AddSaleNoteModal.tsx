import { DialogTitle } from '@mui/material';
import AddPurchaseDocumentModal from '@src/components/shared/AddPurchaseDocumentModal';
import { useAddExpenseByType } from '@src/hooks/cache/expenses';
import { SALE_NOTE_INITIAL_VALUE } from '@src/lib/constants/expenses';
import { ExtendedExpense } from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseSaleNoteForm from './SaleNoteForm/BaseSaleNoteForm';

interface Props {
  onClose?: VoidFunction;
}

const AddSaleNote: FC<Props> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: addExpense } = useAddExpenseByType('sale_note');

  const handleSubmit: FormikConfig<ExtendedExpense>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    addExpense(values)
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
