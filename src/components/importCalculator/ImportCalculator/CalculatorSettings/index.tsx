import { Card, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';
import { LotTables } from './LotTables';

const CalculatorSettings: FC = () => {
  const { values, handleChange, errors, touched } = useImportCalculatorContext();
  return (
    <Stack component={Card} p={2} elevation={0} variant="outlined" gap={2}>
      <Typography variant="h6" fontWeight={600} sx={{ textTransform: 'uppercase' }}>
        Costos de Lote
      </Typography>

      <TextField
        fullWidth
        label="Descripción"
        value={values.metadata.description}
        name="metadata.description"
        onChange={handleChange}
        variant="outlined"
        error={Boolean(errors.metadata?.description && touched.metadata?.description)}
        helperText={touched.metadata?.description && errors.metadata?.description}
        required
      />

      <LotTables />
    </Stack>
  );
};

export default CalculatorSettings;
