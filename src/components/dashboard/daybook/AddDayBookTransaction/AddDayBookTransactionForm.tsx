import { FormikConfig } from 'formik';
import { FC } from 'react';
import { DAYBOOK_TRANSACTION_INITIAL_VALUE } from 'src/lib/constants/dayBook';
import { DayBookTransactionParser } from 'src/lib/parsers/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DayBookTransactionForm } from '../DayBookTransactionForm';

interface AddDayBookTransactionFormProps {
  onClose: VoidFunction;
}

export const AddDayBookTransactionForm: FC<AddDayBookTransactionFormProps> = ({
  onClose,
}) => {
  const onSubmit: FormikConfig<DayBookTransaction>['onSubmit'] = (values) => {
    alert(values);
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
