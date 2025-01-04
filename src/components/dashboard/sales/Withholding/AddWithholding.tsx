import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  FormikAutoCalculateField,
  FormikDatePicker,
  FormikTextField,
} from '@src/components/shared/formik-components';
import Iconify from '@src/components/shared/iconify';
import { WithholdingSchema } from '@src/lib/schemas/sale';
import { formatTaxDocIdNumber } from '@src/lib/utils/formatInvoiceNumber';
import { subId } from '@src/services/firestore/helpers/subIdGenerator';
import { SalesFirestore } from '@src/services/firestore/sales';
import { Sale, Withholding } from '@src/types/sale';
import { Form, Formik, FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import { FC, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import WithholdingTotalField from './WithholdingTotalField';

interface Props {
  sale: Sale;
}

const AddWithholding: FC<Props> = ({ sale }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit: FormikConfig<Withholding>['onSubmit'] = (
    values,
    { setSubmitting, resetForm }
  ) => {
    const newSale: Sale = { ...sale, withholding: values };

    SalesFirestore.createSingleWithholding(newSale)
      .then(() => {
        resetForm();
        enqueueSnackbar('Retención registrado exitosamente');
        closeModal();
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(`No se pudo guardar el documento. ${error}`, {
          variant: 'error',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const withholding: Withholding = {
    id: subId(sale.id!, 'saleWithholding'),
    establishment: 1,
    emissionPoint: 1,
    sequentialNumber: 1,
    issueDate: new Date(),
    issuerId: sale.billingDocument.recipientId,
    issuerName: sale.billingDocument.recipientName,
    IVAWithholding: 0,
    IncomeWithholding: 0,
    total: 0,
    ref: {
      ...sale.billingDocument.ref,
      saleId: sale.id,
    },
  };

  const { establishment, emissionPoint, sequentialNumber } =
    sale.billingDocument;

  return (
    <>
      <IconButton onClick={openModal}>
        <Iconify
          icon="pajamas:review-warning"
          sx={{ color: (theme) => theme.palette.warning.main }}
        />
      </IconButton>

      <Dialog open={modalOpen} onClose={closeModal} maxWidth="md" fullWidth>
        <DialogTitle>Agregar nueva retención</DialogTitle>
        <Formik
          initialValues={withholding}
          onSubmit={handleSubmit}
          validationSchema={toFormikValidationSchema(WithholdingSchema)}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Stack component={DialogContent} gap={2}>
                <Alert severity="info">
                  {`Agrega manualmente los datos de la retención efectuada a la factura: ${formatTaxDocIdNumber({ establishment, emissionPoint, sequentialNumber })}`}
                </Alert>

                <Grid container columns={12} spacing={2}>
                  <Grid item xs={1}>
                    <FormikTextField
                      size="small"
                      fullWidth
                      name="establishment"
                      label="Suc."
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={1}>
                    <FormikTextField
                      size="small"
                      fullWidth
                      name="emissionPoint"
                      label="Pto."
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormikTextField
                      size="small"
                      fullWidth
                      name="sequentialNumber"
                      label="Nro."
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={5} />

                  <Grid item xs={3}>
                    <FormikDatePicker
                      size="small"
                      fullWidth
                      name="issueDate"
                      label="Fecha de Emisión"
                      required
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <FormikTextField
                      size="small"
                      fullWidth
                      name="issuerId"
                      label="CI/RUC Emisor"
                      required
                      disabled
                    />
                  </Grid>

                  <Grid item xs={9}>
                    <FormikTextField
                      size="small"
                      fullWidth
                      name="issuerName"
                      label="Razón Social Emisor"
                      required
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Impuesto a la renta
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Base imponible"
                      value={sale.billingDocument.taxedSubtotal}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={6} />

                  <Grid item xs={3}>
                    <FormikAutoCalculateField
                      fullWidth
                      size="small"
                      name="IncomeWithholding"
                      label="Retención"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle1">IVA</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Base imponible"
                      value={sale.billingDocument.IVA}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={6} />

                  <Grid item xs={3}>
                    <FormikAutoCalculateField
                      fullWidth
                      size="small"
                      name="IVAWithholding"
                      label="Retención"
                      required
                    />
                  </Grid>

                  <Grid item xs={9} />

                  <Grid item xs={3}>
                    <WithholdingTotalField />
                  </Grid>
                </Grid>
              </Stack>

              <DialogActions>
                <Button onClick={closeModal} type="button">
                  Cerrar
                </Button>
                <LoadingButton
                  variant="contained"
                  loading={isSubmitting}
                  type="submit"
                >
                  Guardar
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default AddWithholding;
