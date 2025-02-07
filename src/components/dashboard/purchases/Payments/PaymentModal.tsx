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
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import Iconify from '@src/components/shared/iconify';
import { ALLOWED_ACCOUNTS, DEFAULT_ACCOUNT } from '@src/lib/constants/settings';
import { PaymentSchema } from '@src/lib/schemas/purchases';
import { Payment } from '@src/types/purchases';
import { Form, Formik, FormikConfig } from 'formik';
import { FC, useEffect, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AccountCategorySelector } from '../AccountCategorySelector';

interface Props {
  open: boolean;
  initialValue: Payment;
  paid: boolean;
  isLegacy: boolean;
  onClose: VoidFunction;
  onSubmit: FormikConfig<Payment>['onSubmit'];
  onDelete: VoidFunction;
}

const PaymentModal: FC<Props> = ({
  open,
  initialValue,
  paid,
  isLegacy,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const [lockEdit, setLockEdit] = useState(paid);

  useEffect(() => {
    setLockEdit(paid);
  }, [open, paid]);

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogTitle>Registrar pago</DialogTitle>

      {isLegacy ? (
        <DialogContent sx={{ pb: 3 }}>
          <Alert severity="error">
            Este documento de compra fue migrado de una version anterior, por lo
            que no cuenta con un documento de pago vinculado
          </Alert>
        </DialogContent>
      ) : (
        <Formik
          initialValues={initialValue}
          onSubmit={onSubmit}
          validationSchema={toFormikValidationSchema(PaymentSchema)}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack component={DialogContent} gap={2}>
                <Alert severity="info">
                  Indique la fecha y la cuenta contable para registrar el pago
                </Alert>

                <FormikDatePicker
                  name="paymentDate"
                  label="Fecha de pago"
                  disabled={lockEdit}
                  required
                />

                <AccountCategorySelector
                  size="small"
                  label="Cuenta de pago"
                  name="paymentAccount"
                  selectableCategories={ALLOWED_ACCOUNTS.PAYMENTS}
                  initialValue={DEFAULT_ACCOUNT.INVOICE.PAYMENT}
                  disabled={lockEdit}
                  excludeCategories
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
                {paid && lockEdit ? (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Button
                      type="button"
                      color="error"
                      variant="outlined"
                      onClick={onDelete}
                    >
                      <Iconify icon="pajamas:remove" />
                    </Button>

                    <Stack direction="row" gap={2}>
                      <Button type="button" onClick={() => setLockEdit(false)}>
                        Editar
                      </Button>

                      <Button
                        type="button"
                        variant="contained"
                        onClick={onClose}
                      >
                        Cerrar
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <>
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
                  </>
                )}
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default PaymentModal;
