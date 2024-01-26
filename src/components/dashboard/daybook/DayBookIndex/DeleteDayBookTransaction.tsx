import { LoadingButton } from '@mui/lab';
import { FC } from 'react';
import ConfirmDialog from 'src/components/shared/confirm-dialog';
import { useDeleteDayBookTransaction } from 'src/hooks/cache/dayBook';

interface DeleteDayBookTransactionProps {
  id: string | null;
  setId: (id: string | null) => void;
}
export const DeleteDayBookTransaction: FC<DeleteDayBookTransactionProps> = ({
  id,
  setId,
}) => {
  const { mutate: handleDeleteAccount, isPending } =
    useDeleteDayBookTransaction();
  const handleClose = () => setId(null);

  if (!id) return null;

  const transactionId = id.split(':')[0];

  const handleConfirm = () => {
    handleDeleteAccount(transactionId);
    handleClose();
  };

  return (
    <ConfirmDialog
      open={Boolean(id)}
      title="Eliminar Transacción"
      content="¿Está seguro que desea eliminar esta transacción?"
      action={
        <LoadingButton
          variant="contained"
          onClick={handleConfirm}
          loading={isPending}
        >
          Eliminar
        </LoadingButton>
      }
      onClose={handleClose}
    />
  );
};
