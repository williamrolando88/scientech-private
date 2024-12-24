import { Button } from '@mui/material';
import { FirestoreDoubleEntryAccounting } from '@src/services/firestore/doubleEntryAccounting';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { OpenDayBookTransaction } from './OpenDayBookTransaction';

interface DeleteDayBookTransactionProps {
  transaction: DoubleEntryAccounting | null;
  onClose: () => void;
}

export const DeleteDayBookTransaction: FC<DeleteDayBookTransactionProps> = ({
  transaction,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const transactionId = transaction?.id || '';

  const handleConfirm = () => {
    FirestoreDoubleEntryAccounting.remove(transactionId)
      .then(() => {
        enqueueSnackbar('Transacción eliminada exitosamente');
        onClose();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Ocurrió un error al eliminar la transacción', {
          variant: 'error',
        });
      });
  };

  if (!transaction) return null;

  return (
    <OpenDayBookTransaction
      transaction={transaction}
      onClose={onClose}
      title="Eliminar Transacción"
      actions={
        <>
          <Button onClick={onClose}>Cancelar</Button>

          <Button variant="contained" onClick={handleConfirm} color="error">
            Eliminar
          </Button>
        </>
      }
      alertText="La transacción que deseas eliminar contiene los siguientes detalles. ¿Está seguro que desea eliminar esta transacción?"
      alertSeverity="warning"
    />
  );
};
