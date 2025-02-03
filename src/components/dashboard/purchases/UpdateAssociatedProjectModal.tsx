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
import { DocumentRefSchema } from '@src/lib/schemas/documentRef';
import { WrappedDocumentRef } from '@src/types/documentReference';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ProjectSelector } from './ProjectSelector';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  initialValues: WrappedDocumentRef;
  infoText: string;
  onSubmit: FormikConfig<WrappedDocumentRef>['onSubmit'];
}

const UpdateAssociatedProjectModal: FC<Props> = ({
  onClose,
  open,
  infoText,
  initialValues,
  onSubmit,
}) => {
  const validationSchema = z.object({ ref: DocumentRefSchema });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Actualizar proyecto asociado</DialogTitle>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(validationSchema)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack component={DialogContent} gap={2}>
              <Alert severity="info">{infoText}</Alert>

              <ProjectSelector />
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
                Actualizar
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UpdateAssociatedProjectModal;
