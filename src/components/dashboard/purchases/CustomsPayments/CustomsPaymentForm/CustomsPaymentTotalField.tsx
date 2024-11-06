import { FormikTextField } from '@src/components/shared/formik-components';
import { CustomsPayment } from '@src/types/purchases';
import { useFormikContext } from 'formik';
import { round } from 'mathjs';
import { FC, useEffect } from 'react';

export const CustomsPaymentTotalField: FC = () => {
  const { values, setFieldValue } = useFormikContext<CustomsPayment>();

  useEffect(() => {
    const fodinfa = values.FODINFA || 0;
    const adValoremTariff = values.adValoremTariff || 0;
    const specificTariff = values.specificTariff || 0;
    const iva = values.IVA || 0;

    const total = round(fodinfa + adValoremTariff + specificTariff + iva, 2);

    setFieldValue('total', total, false);
  }, [
    setFieldValue,
    values.FODINFA,
    values.IVA,
    values.adValoremTariff,
    values.specificTariff,
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
