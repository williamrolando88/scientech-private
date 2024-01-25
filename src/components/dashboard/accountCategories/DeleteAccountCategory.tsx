import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FC, useCallback } from 'react';
import ConfirmDialog from 'src/components/shared/confirm-dialog';
import {
  useListAccountCategories,
  useMutateAccountCategories,
} from 'src/hooks/cache/accountCategories';

interface DeleteAccountCategoryProps {
  accountIdToDelete: string | null;
  setAccountIdToDelete: (accountId: string | null) => void;
}
export const DeleteAccountCategory: FC<DeleteAccountCategoryProps> = ({
  accountIdToDelete,
  setAccountIdToDelete,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [categories] = useListAccountCategories();
  const { mutate: setCategories } = useMutateAccountCategories();

  const handleDeleteAccount = useCallback(async () => {
    if (!accountIdToDelete) return;

    delete categories[accountIdToDelete];

    try {
      setCategories(categories);

      setCategories(categories);
      setAccountIdToDelete(null);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Ocurrió un error al eliminar la cuenta', {
        variant: 'error',
      });
    }
  }, [
    accountIdToDelete,
    categories,
    enqueueSnackbar,
    setAccountIdToDelete,
    setCategories,
  ]);

  return (
    <ConfirmDialog
      open={Boolean(accountIdToDelete)}
      title="Eliminar Cuenta Contable"
      content="¿Está seguro que desea eliminar esta cuenta contable?"
      action={
        <Button variant="contained" onClick={handleDeleteAccount}>
          Eliminar
        </Button>
      }
      onClose={() => setAccountIdToDelete(null)}
    />
  );
};
