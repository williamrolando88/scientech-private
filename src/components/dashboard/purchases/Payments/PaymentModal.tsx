import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import {
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import { ALLOWED_ACCOUNTS, DEFAULT_ACCOUNT } from '@src/lib/constants/settings';
import { PaymentSchema } from '@src/lib/schemas/payment';
import { Payment } from '@src/types/payment';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../AccountCategorySelector';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: FormikConfig<Payment>['onSubmit'];
  initialValue: Payment;
}

const PaymentModal: FC<Props> = ({ onClose, open, initialValue, onSubmit }) => {
  console.log('mounting');

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogTitle>This is a payment modal</DialogTitle>
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(PaymentSchema)}
      >
        {() => (
          <Form>
            <Stack component={DialogContent} gap={2}>
              <Alert severity="info">
                Indique la fecha y la cuenta contable para registrar el pago
              </Alert>

              <FormikDatePicker
                name="createdAt"
                label="Fecha de pago"
                required
              />

              <AccountCategorySelector
                label="Cuenta de pago"
                name="paymentAccount"
                selectableCategories={ALLOWED_ACCOUNTS.INVOICE.PAYMENT}
                initialValue={DEFAULT_ACCOUNT.INVOICE.PAYMENT}
                required
              />

              <FormikTextField
                name="amount"
                type="number"
                label="Monto"
                required
                disabled
              />
            </Stack>
            <DialogActions>
              <Button onClick={onClose}>Cancelar</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PaymentModal;
