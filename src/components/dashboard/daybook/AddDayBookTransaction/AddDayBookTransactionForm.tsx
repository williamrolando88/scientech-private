import { FormikConfig } from 'formik';
import { DAYBOOK_TRANSACTION_INITIAL_VALUE } from 'src/lib/constants/dayBook';
import { DayBookTransactionParser } from 'src/lib/parsers/dayBook';
import { DayBookTransaction } from 'src/types/dayBook';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { DayBookTransactionForm } from '../DayBookTransactionForm';

export const AddDayBookTransactionForm = () => {
  console.log('first');

  const onSubmit: FormikConfig<DayBookTransaction>['onSubmit'] = () => {
    console.log('second');
  };

  return (
    <DayBookTransactionForm
      initialValues={DAYBOOK_TRANSACTION_INITIAL_VALUE}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(DayBookTransactionParser)}
    />
  );
};
