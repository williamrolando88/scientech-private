import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import { useListClients } from '@src/hooks/cache/clients';
import { ProjectSchema } from '@src/lib/schemas/projects';
import { Project } from '@src/types/projects';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

type FormikProps = Pick<FormikConfig<Project>, 'initialValues' | 'onSubmit'>;

interface ProjectFormProps extends FormikProps {
  onClose: VoidFunction;
  infoText?: string;
}

const ProjectForm: FC<ProjectFormProps> = ({
  initialValues,
  infoText,
  onClose,
  onSubmit,
}) => {
  const { data: clients } = useListClients();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(ProjectSchema)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Grid container columns={6} rowSpacing={2} columnSpacing={2}>
              <Grid item xs={2}>
                <FormikTextField
                  fullWidth
                  label="Nombre del proyecto"
                  name="name"
                  required
                />
              </Grid>

              <Grid item xs={4}>
                <FormikTextField
                  select
                  fullWidth
                  label="Cliente"
                  name="client_id"
                  required
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {`${client.name} - ${client.id}`}
                    </MenuItem>
                  ))}
                </FormikTextField>
              </Grid>

              <Grid item xs={3}>
                <FormikDatePicker
                  fullWidth
                  required
                  name="start_date"
                  label="Fecha de Inicio"
                />
              </Grid>

              <Grid item xs={3}>
                <FormikDatePicker
                  fullWidth
                  required
                  name="end_date"
                  label="Fecha de Fin"
                />
              </Grid>

              <Grid item xs={6}>
                <FormikTextField
                  multiline
                  rows={3}
                  fullWidth
                  label="Descripción"
                  name="description"
                />
              </Grid>
            </Grid>
          </Stack>

          <DialogActions>
            <Button disabled={isSubmitting} onClick={onClose}>
              Cancelar
            </Button>

            <LoadingButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
            >
              Guardar
            </LoadingButton>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
