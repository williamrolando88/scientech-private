import { Button, Dialog, DialogTitle } from '@mui/material';
import { FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import {
  useListAccountCategories,
  useMutateAccountCategories,
} from 'src/hooks/cache/accountCategories';
import { ACCOUNT_CATEGORY_INITIAL_VALUE } from 'src/lib/constants/accountCategories';
import { AccountCategory } from 'src/types/accountCategories';
import { AccountCategoryForm } from './AccountCategoryForm';

const AddAccountCategory: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useListAccountCategories();
  const { mutateAsync: setCategories } = useMutateAccountCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [multiple, setMultiple] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toogleMultiple = () => setMultiple(!multiple);

  const handleSubmitForm: FormikConfig<AccountCategory>['onSubmit'] = async (
    formData,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    if (formData.id in categories) {
      setFieldError('id', 'Ya existe una cuenta con ese número');
      return;
    }

    setSubmitting(true);
    const accountsCollection = { ...categories, [formData.id]: formData };

    setCategories(accountsCollection)
      .then(() => {
        resetForm();
        enqueueSnackbar('Cuenta agregada exitosamente');

        if (!multiple) {
          closeModal();
        }
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar('Ocurrió un error al guardar la cuenta', {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
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
