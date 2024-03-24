import { FormikTextField } from '@src/components/shared/formik-components';
import { IVA_RATE } from '@src/lib/constants/settings';
import { Invoice } from '@src/types/expenses';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { useEffect } from 'react';

export const IVAField = () => {
  const { values, setFieldValue } = useFormikContext<Invoice>();

  useEffect(() => {
    const taxedSubtotal = get(values, 'taxed_subtotal', 0);
    const IVAValue = (taxedSubtotal * IVA_RATE) / 100;

    setFieldValue('IVA', IVAValue);
  }, [values, setFieldValue]);

  return (
    <FormikTextField size="small" fullWidth name="IVA" label="IVA" readOnly />
  );
};
