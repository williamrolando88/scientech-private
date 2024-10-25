import { FormikTextField } from '@src/components/shared/formik-components';
import { ExtendedGeneralExpenseOld } from '@src/types/expenses';
import { useFormikContext } from 'formik';
import { round } from 'mathjs';
import { FC, useEffect } from 'react';

export const VoucherTotalField: FC = () => {
  const { values, setFieldValue } =
    useFormikContext<ExtendedGeneralExpenseOld>();

  useEffect(() => {
    const taxedSubtotal = values.taxed_subtotal || 0;
    const taxExemptedSubtotal = values.tax_exempted_subtotal || 0;
    const IVAValue = values.IVA || 0;

    const total = round(taxedSubtotal + taxExemptedSubtotal + IVAValue, 2);

    setFieldValue('total', total, false);
  }, [
    setFieldValue,
    values.tax_exempted_subtotal,
    values.IVA,
    values.taxed_subtotal,
  ]);

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
