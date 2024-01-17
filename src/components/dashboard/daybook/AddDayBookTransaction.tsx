import {
  Alert,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { FC, useState } from 'react';
import Iconify from 'src/components/shared/iconify';
import { DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE } from 'src/lib/constants/dayBook';
import { DayBookTransactionDetail } from 'src/types/dayBook';

const AddDayBookTransaction: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [transactions, setTransactions] = useState<DayBookTransactionDetail[]>(
    new Array(2).fill(DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE)
  );

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleAddTransaction = () =>
    setTransactions([
      ...transactions,
      DAYBOOK_TRANSACTION_DETAIL_INITIAL_VALUE,
    ]);
  const handleDeleteTransaction = (index: number) =>
    setTransactions(transactions.filter((_, i) => i !== index));

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

        <Stack component={DialogContent} gap={2}>
          <Alert severity="info">
            Aqui va el formulario de asiento contable
          </Alert>

          <Stack>
            <TextField label="Fecha" />
          </Stack>

          <Stack component={Card} variant="outlined" p={2}>
            {transactions.map((transaction, index) => (
              <Stack key={index} direction="row">
                <TextField label="Cuenta" />
                <TextField label="Descripción cuenta" />
                <TextField label="Debe" />
                <TextField label="Haber" />
                <TextField label="Descripción de la Transacción" />
                <TextField label="Cotización" />
                <TextField label="Factura" />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteTransaction(index)}
                >
                  <Iconify icon="pajamas:remove" />
                </Button>
              </Stack>
            ))}

            <Button variant="soft" onClick={handleAddTransaction}>
              Agregar
            </Button>
          </Stack>
        </Stack>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDayBookTransaction;
