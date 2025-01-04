import { FormikTextField } from '@src/components/shared/formik-components';
import { Withholding } from '@src/types/sale';
import { useFormikContext } from 'formik';
import { round } from 'mathjs';
import { FC, useEffect } from 'react';

const WithholdingTotalField: FC = () => {
  const { values, setFieldValue } = useFormikContext<Withholding>();

  useEffect(() => {
    const iva = Number(values.IVAWithholding ?? 0);
    const subtotal = Number(values.IncomeWithholding ?? 0);
    const total = round(iva + subtotal, 2);

    setFieldValue('total', total);
  }, [setFieldValue, values.IVAWithholding, values.IncomeWithholding]);

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

export default WithholdingTotalField;
