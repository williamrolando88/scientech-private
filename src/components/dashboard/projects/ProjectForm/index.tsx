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
import { useListProjects } from '@src/hooks/cache/projects';
import { Project } from '@src/types/projects';
import { Form, Formik, FormikConfig } from 'formik';
import { max } from 'lodash';
import { FC } from 'react';

type FormikProps = Pick<
  FormikConfig<Project>,
  'initialValues' | 'validationSchema'
>;

interface ProjectFormProps extends FormikProps {
  onSubmit: FormikConfig<Project>['onSubmit'];
  onClose: VoidFunction;
  infoText?: string;
}

const ProjectForm: FC<ProjectFormProps> = ({
  onClose,
  onSubmit,
  infoText,
  ...formikProps
}) => {
  const { data: clients } = useListClients();
  const { data: projects } = useListProjects();

  const handleSubmit: FormikConfig<Project>['onSubmit'] = (values, actions) => {
    const lastProject = Number(max(projects.map((project) => project.id)) ?? 0);

    onSubmit({ ...values, id: lastProject + 1 }, actions);
  };

  return (
    <Formik {...formikProps} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Stack component={DialogContent} gap={2}>
            <Alert severity="info">{infoText}</Alert>

            <Grid container columns={6} rowSpacing={2} columnSpacing={2}>
              <Grid item xs={2}>
                <FormikTextField
                  fullWidth
                  label="Nombre del Proyecto"
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
                  required
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
