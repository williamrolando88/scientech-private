import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { FormikTextField } from 'src/components/shared/formik-components';
import Iconify from 'src/components/shared/iconify';

const AddDayBookTransaction: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal}>
        Nuevo
      </Button>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Nuevo asiento contable</DialogTitle>

        <AddDayBookTransactionForm />
      </Dialog>
    </>
  );
};

export default AddDayBookTransaction;

const AddDayBookTransactionForm = () => {
  console.log('first');

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">
              Aqui va el formulario de asiento contable
            </Alert>

            <Stack>
              <TextField label="Fecha" />
            </Stack>

            <Stack component={Card} variant="outlined" p={2}>
              <Stack direction="row">
                <Box>Cuenta</Box>
                <Box>Descripción cuenta</Box>
                <Box>Debe</Box>
                <Box>Haber</Box>
                <Box>Descripción de la Transacción</Box>
                <Box>Cotización</Box>
                <Box>Factura</Box>
              </Stack>

              <Stack direction="row">
                <FormikTextField name="account" />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <Button variant="outlined" color="error">
                  <Iconify icon="pajamas:remove" />
                </Button>
              </Stack>

              <Button variant="soft">Agregar</Button>
            </Stack>
          </Stack>

          <DialogActions>
            <Button>Cancelar</Button>
            <Button>Guardar</Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};
