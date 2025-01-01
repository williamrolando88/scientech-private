import { LoadingButton } from '@mui/lab';
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
  FormikAutoCalculateField,
  FormikDatePicker,
} from '@src/components/shared/formik-components';
import { ALLOWED_ACCOUNTS } from '@src/lib/constants/settings';
import { PaymentCollectionSchema } from '@src/lib/schemas/sale';
import { PaymentCollection } from '@src/types/sale';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../../purchases/AccountCategorySelector';
import { PaymentCollectionAmountField } from './PaymentCollectionAmountField';

interface Props
  extends Pick<FormikConfig<PaymentCollection>, 'initialValues' | 'onSubmit'> {
  initialAmount: number;
  open: boolean;
  onClose: VoidFunction;
}

const PaymentCollectionModal: FC<Props> = ({
  open,
  initialAmount,
  initialValues,
  onClose,
  onSubmit,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Registrar cobro</DialogTitle>

    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(PaymentCollectionSchema)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">
              Indique la fecha de cobro y el monto de los anticipos recibidos
            </Alert>

            <FormikDatePicker
              name="paymentDate"
              label="Fecha de pago"
              required
            />

            <AccountCategorySelector
              size="small"
              label="Cuenta destino"
              name="paymentAccount"
              selectableCategories={ALLOWED_ACCOUNTS.PAYMENT_COLLECTION}
              required
            />

            <FormikAutoCalculateField
              size="small"
              name="advancePaymentAmount"
              label="Anticipos recibidos"
              required
            />

            <PaymentCollectionAmountField initialAmount={initialAmount} />
          </Stack>

          <DialogActions>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Guardar
            </LoadingButton>
          </DialogActions>
        </Form>
      )}
    </Formik>
  </Dialog>
);

export default PaymentCollectionModal;
