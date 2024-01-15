import { Button, Dialog, DialogTitle } from '@mui/material';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { ACCOUNT_CATEGORY_INITIAL_VALUE } from 'src/lib/constants/accountCategories';
import { useAccountCategoriesStore } from 'src/lib/stores/accountCategories';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategory } from 'src/types/accountCategories';
import { AccountCategoryForm } from './AccountCategoryForm';

const AddAccountCategory: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { categories, setCategories } = useAccountCategoriesStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [multiple, setMultiple] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toogleMultiple = () => setMultiple(!multiple);

  const handleSubmitForm: FormikConfig<AccountCategory>['onSubmit'] = async (
    formData,
    actions
  ) => {
    if (formData.id in categories) {
      actions.setFieldError('id', 'Ya existe una cuenta con ese número');
      return;
    }

    actions.setSubmitting(true);
    const accountsCollection = { ...categories, [formData.id]: formData };

    try {
      await AccountCategories.upsert(accountsCollection);

      setCategories(accountsCollection);
      actions.resetForm();

      if (!multiple) {
        closeModal();
      }
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
          multiple={multiple}
          handleMultiple={toogleMultiple}
        />
      </Dialog>
    </>
  );
};

export default AddAccountCategory;
