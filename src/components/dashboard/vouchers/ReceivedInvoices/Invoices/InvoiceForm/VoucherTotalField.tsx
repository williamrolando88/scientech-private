import { FormikTextField } from '@src/components/shared/formik-components';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { round } from 'mathjs';
import { useEffect } from 'react';

export const VoucherTotalField = () => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    const taxedSubtotal = get(values, 'taxed_subtotal', 0);
    const taxExemptedSubtotal = get(values, 'tax_exempted_subtotal', 0);
    const IVAValue = get(values, 'IVA', 0);

    const total = round(taxedSubtotal + taxExemptedSubtotal + IVAValue, 2);

    setFieldValue('total', total, false);
  }, [values, setFieldValue]);

  return (
    <FormikTextField
      size="small"
      fullWidth
      name="total"
      label="Total"
      required
      readOnly
    />
  );
};
