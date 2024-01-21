import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { DAYBOOK_TRANSACTION_INITIAL_VALUE } from 'src/lib/constants/dayBook';
import { DayBookTransactionParser } from 'src/lib/parsers/dayBook';
import { useDayBookStore } from 'src/lib/stores/dayBook';
import { DayBookTransactions } from 'src/services/firebase/dayBookTransactions';
import { DayBookTransaction } from 'src/types/dayBook';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DayBookTransactionForm } from '../DayBookTransactionForm';

interface AddDayBookTransactionFormProps {
  onClose: VoidFunction;
}

export const AddDayBookTransactionForm: FC<AddDayBookTransactionFormProps> = ({
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { addTransaction } = useDayBookStore();

  const onSubmit: FormikConfig<DayBookTransaction>['onSubmit'] = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      const id = await DayBookTransactions.upsert(values);
      resetForm();
      onClose();
      enqueueSnackbar('Transacción guardada exitosamente');
      addTransaction({ ...values, id });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error al guardar la transacción', { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DayBookTransactionForm
      initialValues={DAYBOOK_TRANSACTION_INITIAL_VALUE}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(DayBookTransactionParser)}
      onClose={onClose}
    />
  );
};
