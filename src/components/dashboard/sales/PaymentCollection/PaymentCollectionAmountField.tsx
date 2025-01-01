import { FormikTextField } from '@src/components/shared/formik-components';
import { PaymentCollection } from '@src/types/sale';
import { useFormikContext } from 'formik';
import { round } from 'mathjs';
import { FC, useEffect } from 'react';

interface Props {
  initialAmount: number;
}

export const PaymentCollectionAmountField: FC<Props> = ({ initialAmount }) => {
  const { values, setFieldValue } = useFormikContext<PaymentCollection>();

  useEffect(() => {
    const remainingAmount = round(
      initialAmount - values.advancePaymentAmount,
      2
    );

    setFieldValue('amount', remainingAmount);
  }, [setFieldValue, initialAmount, values.advancePaymentAmount]);

  return (
    <FormikTextField
      size="small"
      fullWidth
      name="amount"
      label="Monto a cobrar"
      required
      disabled
    />
  );
};
