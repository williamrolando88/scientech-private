import { Dialog, DialogTitle } from '@mui/material';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import {
  useListAccountCategories,
  useMutateAccountCategories,
} from 'src/hooks/cache/accountCategories';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategory } from 'src/types/accountCategories';
import { AccountCategoryForm } from './AccountCategoryForm';

interface UpdateAccountCategoryProps {
  accountCategory: AccountCategory | null;
  onClose: VoidFunction;
}

const UpdateAccountCategory: FC<UpdateAccountCategoryProps> = ({
  accountCategory,
  onClose,
}) => {
  const { data: categories } = useListAccountCategories();
  const { mutate: setCategories } = useMutateAccountCategories();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitForm: FormikConfig<AccountCategory>['onSubmit'] = async (
    formData,
    actions
  ) => {
    actions.setSubmitting(true);

    const accountsCollection = { ...categories, [formData.id]: formData };

    try {
      await AccountCategories.upsert(accountsCollection);

      setCategories(accountsCollection);
      actions.resetForm();
      onClose();
    } catch (error) {
      console.error(error);

      enqueueSnackbar('Ocurrió un error al actualizar la cuenta', {
        variant: 'error',
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (!accountCategory) return null;

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={Boolean(accountCategory)}
      onClose={onClose}
    >
      <DialogTitle>Actualizar Cuenta Contable</DialogTitle>

      <AccountCategoryForm
        initialValues={accountCategory}
        onSubmit={handleSubmitForm}
        onClose={onClose}
        isUpdating
        infoText="Unicamente puedes editar el nombre y descripción de la cuenta contable."
      />
    </Dialog>
  );
};

export default UpdateAccountCategory;
