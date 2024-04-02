import { FormikTextField } from '@src/components/shared/formik-components';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { FC, useEffect } from 'react';

interface VoucherTotalFieldProps {
  fields?: string[];
}

export const VoucherTotalField: FC<VoucherTotalFieldProps> = ({
  fields = ['taxed_subtotal', 'tax_exempted_subtotal', 'IVA'],
}) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    let total = 0;

    fields.forEach((field) => {
      total += get(values, field, 0);
    });

    setFieldValue('total', total, false);
  }, [values, setFieldValue, fields]);

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
