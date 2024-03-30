import { DialogTitle } from '@mui/material';
import { useAddExpenseByType } from '@src/hooks/cache/expenses';
import { NON_DEDUCTIBLE_INITIAL_VALUE } from '@src/lib/constants/expenses';
import {
  AddReceivedVoucherModalProps,
  ExtendedExpense,
} from '@src/types/expenses';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import BaseNonDeductibleForm from './NonDeductibleForm/BaseNonDeductibleForm';

const AddNonDeductible: FC<AddReceivedVoucherModalProps> = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: addNonDeductible } =
    useAddExpenseByType('non_deductible');

  const handleSubmit: FormikConfig<ExtendedExpense>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    addNonDeductible(values)
      .then(() => {
        resetForm();
        enqueueSnackbar('Gasto guardado exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Error al guardar el gasto', { variant: 'error' });
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

export default AddNonDeductible;
