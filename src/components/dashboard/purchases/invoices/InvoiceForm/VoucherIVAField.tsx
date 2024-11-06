import { FormikTextField } from '@src/components/shared/formik-components';
import { IVA_RATE_12, IVA_RATE_15 } from '@src/lib/constants/settings';
import { ReceivedInvoice } from '@src/types/purchases';
import { useFormikContext } from 'formik';
import { round } from 'mathjs';
import { useEffect, useMemo } from 'react';

export const VoucherIVAField = () => {
  const { values, setFieldValue } = useFormikContext<ReceivedInvoice>();

  const IVA_RATE = useMemo(
    () =>
      values.issueDate < new Date('2024-04-01') ? IVA_RATE_12 : IVA_RATE_15,
    [values.issueDate]
  );

  useEffect(() => {
    const taxedSubtotal = values.taxedSubtotal || 0;
    const IVAValue = round((taxedSubtotal * IVA_RATE) / 100, 2);

    setFieldValue('IVA', IVAValue, false);
  }, [values.taxedSubtotal, setFieldValue, IVA_RATE]);

  return (
    <FormikTextField
      size="small"
      fullWidth
      name="IVA"
      label={`IVA ${IVA_RATE}%`}
      disabled
    />
  );
};
