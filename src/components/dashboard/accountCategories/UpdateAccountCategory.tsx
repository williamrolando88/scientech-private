import { Dialog, DialogTitle } from '@mui/material';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { useAccountCategoriesStore } from 'src/lib/stores/accountCategories';
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
  const { categories, setCategories } = useAccountCategoriesStore();
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
      />
    </Dialog>
  );
};

export default UpdateAccountCategory;
