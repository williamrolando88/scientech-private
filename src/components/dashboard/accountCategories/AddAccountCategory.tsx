import { Button, Dialog, DialogTitle } from '@mui/material';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import {
  useListAccountCategories,
  useMutateAccountCategories,
} from 'src/hooks/cache/accountCategories';
import { ACCOUNT_CATEGORY_INITIAL_VALUE } from 'src/lib/constants/accountCategories';
import { AccountCategories } from 'src/services/firebase/applicationSettings';
import { AccountCategory } from 'src/types/accountCategories';
import { AccountCategoryForm } from './AccountCategoryForm';

const AddAccountCategory: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [categories] = useListAccountCategories();
  const { mutate: setCategories } = useMutateAccountCategories();
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
          infoText="Aquí podrás agregar una cuenta contable que estará disponible a
            través de toda la aplicación"
        />
      </Dialog>
    </>
  );
};

export default AddAccountCategory;
