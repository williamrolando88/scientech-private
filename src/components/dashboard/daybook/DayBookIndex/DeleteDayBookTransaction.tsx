import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { useDeleteDayBookTransaction } from 'src/hooks/cache/dayBook';
import { DayBookTransactionOld } from 'src/types/dayBook';
import { OpenDayBookTransaction } from './OpenDayBookTransaction';

interface DeleteDayBookTransactionProps {
  transaction: DayBookTransactionOld | null;
  onClose: () => void;
}

export const DeleteDayBookTransaction: FC<DeleteDayBookTransactionProps> = ({
  transaction,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: handleDeleteAccount, isPending } =
    useDeleteDayBookTransaction();

  const transactionId = transaction?.id || '';

  const handleConfirm = () => {
    handleDeleteAccount(transactionId)
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
          <Button onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>

          <LoadingButton
            variant="contained"
            onClick={handleConfirm}
            loading={isPending}
            color="error"
          >
            Eliminar
          </LoadingButton>
        </>
      }
      alertText="La transacción que deseas eliminar contiene los siguientes detalles. ¿Está seguro que desea eliminar esta transacción?"
      alertSeverity="warning"
    />
  );
};
