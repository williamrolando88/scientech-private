import { FormikTextField } from '@src/components/shared/formik-components';
import { IVA_RATE_12, IVA_RATE_15 } from '@src/lib/constants/settings';
import { Invoice } from '@src/types/expenses';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { round } from 'mathjs';
import { useEffect, useMemo } from 'react';

export const VoucherIVAField = () => {
  const { values, setFieldValue } = useFormikContext<Invoice>();

  const IVA_RATE = useMemo(
    () =>
      values.issue_date < new Date('2024-04-01') ? IVA_RATE_12 : IVA_RATE_15,
    [values.issue_date]
  );

  useEffect(() => {
    const taxedSubtotal = get(values, 'taxed_subtotal', 0);
    const IVAValue = round((taxedSubtotal * IVA_RATE) / 100, 2);

    setFieldValue('IVA', IVAValue, false);
  }, [values, setFieldValue, IVA_RATE]);

  return (
    <FormikTextField
      size="small"
      fullWidth
      name="IVA"
      label={`IVA ${IVA_RATE}%`}
      readOnly
    />
  );
};
