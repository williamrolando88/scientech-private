import { Button, Dialog, DialogTitle } from '@mui/material';
import { FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { ACCOUNT_CATEGORY_INITIAL_VALUE } from 'src/lib/constants/accountCategories';
import { useAccountCategoriesStore } from 'src/lib/stores/accountCategories';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategory } from 'src/types/accountCategories';
import { AccountCategoryForm } from './AccountCategoryForm';

const AddAccountCategory: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { categories, setCategories } = useAccountCategoriesStore();
  const { enqueueSnackbar } = useSnackbar();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmitForm = async (
    formData: AccountCategory,
    actions: FormikHelpers<AccountCategory>
  ) => {
    const isDuplicated = categories.some(
      (account) => account.id === formData.id
    );

    if (isDuplicated) {
      actions.setFieldError('id', 'Ya existe una cuenta con ese número');
      return;
    }

    actions.setSubmitting(true);
    const accountsCollection = [...categories, formData];

    try {
      await AccountCategories.add(accountsCollection);

      setCategories(accountsCollection);
      actions.resetForm();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Ocurrió un error al guardar la cuenta', {
        variant: 'error',
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={openModal} variant="contained">
        Nuevo
      </Button>

      <Dialog fullWidth maxWidth="md" open={modalOpen} onClose={closeModal}>
        <DialogTitle>Agregar Cuenta Contable</DialogTitle>

        <AccountCategoryForm
          initialValues={ACCOUNT_CATEGORY_INITIAL_VALUE}
          onSubmit={handleSubmitForm}
          onClose={closeModal}
        />
      </Dialog>
    </>
  );
};

export default AddAccountCategory;
