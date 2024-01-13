import { Dialog, DialogTitle } from '@mui/material';
import { FormikConfig } from 'formik';
import { FC } from 'react';
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
  const handleSubmitForm: FormikConfig<AccountCategory>['onSubmit'] = async (
    formData
  ) => {
    console.log(formData);
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
      />
    </Dialog>
  );
};

export default UpdateAccountCategory;
