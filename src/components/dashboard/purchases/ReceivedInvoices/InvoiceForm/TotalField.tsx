import { FormikTextField } from '@src/components/shared/formik-components';
import { ReceivedInvoice } from '@src/types/purchases';
import { useFormikContext } from 'formik';
import { round } from 'mathjs';
import { FC, useEffect } from 'react';

export const TotalField: FC = () => {
  const { values, setFieldValue } = useFormikContext<ReceivedInvoice>();

  useEffect(() => {
    const taxedSubtotal = values.taxedSubtotal || 0;
    const taxExemptedSubtotal = values.noTaxSubtotal || 0;
    const IVAValue = values.IVA || 0;

    const total = round(taxedSubtotal + taxExemptedSubtotal + IVAValue, 2);

    setFieldValue('total', total, false);
  }, [setFieldValue, values.noTaxSubtotal, values.IVA, values.taxedSubtotal]);

  return (
    <FormikTextField
      size="small"
      fullWidth
      name="total"
      label="Total"
      required
      disabled
    />
  );
};
