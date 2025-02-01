import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
} from '@mui/material';
import {
  FormikAutoCalculateField,
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import { ProjectSchema } from '@src/lib/schemas/projects';
import { Project } from '@src/types/projects';
import { Form, Formik, FormikConfig } from 'formik';
import { FC } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import ClientSelector from './ClientSelector';

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
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={toFormikValidationSchema(ProjectSchema)}
  >
    {({ isSubmitting }) => (
      <Form>
        <Stack component={DialogContent} gap={2}>
          <Alert severity="info">{infoText}</Alert>

          <Grid container columns={12} spacing={2}>
            <Grid item xs={2}>
              <FormikTextField
                fullWidth
                size="small"
                label="No."
                name="number"
                type="number"
                required
              />
            </Grid>

            <Grid item xs={7} />

            <Grid item xs={3}>
              <FormikDatePicker
                fullWidth
                required
                name="startedAt"
                label="Fecha de inicio"
                size="small"
              />
            </Grid>

            <Grid item xs={6}>
              <ClientSelector />
            </Grid>

            <Grid item xs={3} />

            <Grid item xs={3}>
              <FormikDatePicker
                fullWidth
                required
                name="estimateFinishDate"
                label="Fecha estimada de fin"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <FormikTextField
                multiline
                rows={3}
                fullWidth
                label="Descripción"
                name="description"
                required
              />
            </Grid>

            <Grid item xs={2}>
              <FormikAutoCalculateField
                fullWidth
                label="Presupuesto"
                name="budget"
                size="small"
                required
              />
            </Grid>

            <Grid item xs={3} />

            <Grid item xs={2}>
              <FormikAutoCalculateField
                fullWidth
                label="Margen [%]"
                name="profitMargin"
                size="small"
                required
              />
            </Grid>

            <Grid item xs={3} />

            <Grid item xs={2}>
              <FormikAutoCalculateField
                fullWidth
                label="Contingencia"
                name="contingency"
                size="small"
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

export default ProjectForm;
