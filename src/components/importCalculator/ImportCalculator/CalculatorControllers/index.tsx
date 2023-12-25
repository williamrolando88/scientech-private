import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import Iconify from 'src/components/shared/iconify';
import { useImportCalculatorContext } from 'src/hooks/useImportCalculatorContext';

const CalculatorControllers: FC = () => {
  const { resetForm, values } = useImportCalculatorContext();

  return (
    <Stack
      component={Card}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      elevation={0}
      variant="outlined"
    >
      <Typography variant="h5" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
        Calculadora de Importaciones
      </Typography>

      <Box display="flex" gap={2}>
        <Button
          startIcon={<Iconify icon="pajamas:doc-new" />}
          variant="contained"
          color="secondary"
          sx={{ color: 'white' }}
          onClick={resetForm}
        >
          Nuevo
        </Button>

        <Button
          startIcon={<Iconify icon="pajamas:upload" />}
          variant="contained"
          color="secondary"
          sx={{ color: 'white' }}
          type="submit"
          disabled={!values.items.length}
        >
          Guardar
        </Button>
      </Box>
    </Stack>
  );
};

export default CalculatorControllers;
