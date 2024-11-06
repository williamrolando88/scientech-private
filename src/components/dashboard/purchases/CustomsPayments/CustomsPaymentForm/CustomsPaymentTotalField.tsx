import { FormikTextField } from '@src/components/shared/formik-components';
import { ExtendedCustomsPayment } from '@src/types/expenses';
import { useFormikContext } from 'formik';
import { round } from 'mathjs';
import { FC, useEffect } from 'react';

export const CustomsPaymentTotalField: FC = () => {
  const { values, setFieldValue } = useFormikContext<ExtendedCustomsPayment>();

  useEffect(() => {
    const fodinfa = values.FODINFA || 0;
    const adValoremTariff = values.ad_valorem_tariff || 0;
    const specificTariff = values.specific_tariff || 0;
    const iva = values.IVA || 0;

    const total = round(fodinfa + adValoremTariff + specificTariff + iva, 2);

    setFieldValue('total', total, false);
  }, [
    setFieldValue,
    values.FODINFA,
    values.IVA,
    values.ad_valorem_tariff,
    values.specific_tariff,
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
