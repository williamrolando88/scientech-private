import { Stack } from '@mui/material';
import { FC } from 'react';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';
import CalculatorLotHeader from './CalculatorLotHeader';
import { LotItemRow } from './LotItemRow';

export const LotTables: FC = () => {
  const { values, errors, touched, setFieldValue } = useImportCalculatorContext();

  return (
    <Stack direction="row" gap={1} justifyContent="space-around" flexWrap="wrap">
      <CalculatorLotHeader title="Costos en Origen">
        <LotItemRow
          label="Impuestos en origen"
          endAdornment="%"
          onChange={setFieldValue}
          value={values.settings.originTaxes}
          name="settings.originTaxes"
          error={touched.settings?.originTaxes && !!errors.settings?.originTaxes}
        />
        <LotItemRow
          label="Flete en origen"
          startAdornment="$"
          onChange={setFieldValue}
          value={values.settings.originFleet}
          name="settings.originFleet"
          error={touched.settings?.originFleet && !!errors.settings?.originFleet}
        />
      </CalculatorLotHeader>

      <CalculatorLotHeader title="Costos de Importación">
        <LotItemRow
          label="Flete de importación [USD/lb]"
          startAdornment="$"
          onChange={setFieldValue}
          value={values.settings.fleetCostPerLibre}
          name="settings.fleetCostPerLibre"
          error={touched.settings?.fleetCostPerLibre && !!errors.settings?.fleetCostPerLibre}
        />
        <LotItemRow
          label="Trámite de importación"
          startAdornment="$"
          onChange={setFieldValue}
          value={values.settings.importProcedure}
          name="settings.importProcedure"
          error={touched.settings?.importProcedure && !!errors.settings?.importProcedure}
        />
      </CalculatorLotHeader>

      <CalculatorLotHeader title="Costos Locales">
        <LotItemRow
          label="Flete y movilización"
          startAdornment="$"
          onChange={setFieldValue}
          value={values.settings.localFleet}
          name="settings.localFleet"
          error={touched.settings?.localFleet && !!errors.settings?.localFleet}
        />
        <LotItemRow
          label="Tarifas bancarias"
          startAdornment="$"
          onChange={setFieldValue}
          value={values.settings.bankExpenses}
          name="settings.bankExpenses"
          error={touched.settings?.bankExpenses && !!errors.settings?.bankExpenses}
        />
      </CalculatorLotHeader>
    </Stack>
  );
};
