import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Stack,
} from '@mui/material';
import { CustomsPayment } from '@src/types/expenses';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';

type FormikProps = Pick<
  FormikConfig<CustomsPayment>,
  'initialValues' | 'onSubmit'
>;

interface BaseCustomsPaymentFormProps extends FormikProps {
  onClose: VoidFunction;
  infoText?: string;
}

const BaseCustomsPaymentForm: FC<BaseCustomsPaymentFormProps> = ({
  onClose,
  infoText,
  ...formikProps
  // eslint-disable-next-line arrow-body-style
}) => {
  return (
    <Formik {...formikProps}>
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>
          </Stack>

          <DialogActions>
            <Button onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>

            <LoadingButton
              variant="contained"
              type="submit"
              loading={isSubmitting}
            >
              Guardar
            </LoadingButton>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default BaseCustomsPaymentForm;
