import { DialogTitle } from '@mui/material';
import AddPurchaseDocumentModal from '@src/components/shared/AddPurchaseDocumentModal';
import { NON_DEDUCTIBLE_INITIAL_VALUE } from '@src/lib/constants/purchases';
import { FirestoreNonDeductible } from '@src/services/firestore/purchases/nonDeductible';
import { NonDeductible } from '@src/types/purchases';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseNonDeductibleForm from './NonDeductibleForm/BaseNonDeductibleForm';

interface Props {
  onClose?: VoidFunction;
}

const AddNonDeductible: FC<Props> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormikConfig<NonDeductible>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    FirestoreNonDeductible.upsert(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Gasto guardado exitosamente');
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
      <DialogTitle>Agregar nuevo gasto no deducible</DialogTitle>

      <BaseNonDeductibleForm
        infoText="Ingrese los datos del gasto. Los campos marcados con * son obligatorios. Si el gasto esta asociado a un proyecto, selecciónelo en el campo correspondiente"
        onClose={onClose}
        initialValues={NON_DEDUCTIBLE_INITIAL_VALUE}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const AddNonDeductibleModal = () => (
  <AddPurchaseDocumentModal>
    <AddNonDeductible />
  </AddPurchaseDocumentModal>
);

export default AddNonDeductibleModal;
