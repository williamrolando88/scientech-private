import { Button, Grid } from '@mui/material';
import { FormikTextField } from '@src/components/shared/formik-components';
import { Client } from '@src/types/clients';
import { useFormikContext } from 'formik';
import { FC } from 'react';

interface ContactRowProps {
  index: number;
}
export const ContactRow: FC<ContactRowProps> = ({ index }) => {
  const { setFieldValue, values } = useFormikContext<Client>();

  const handleDeleteContact = () => {
    setFieldValue(
      'contact',
      values.contact.filter((_, i) => i !== index)
    );
  };

  return (
    <Grid container columns={8} rowSpacing={2} columnSpacing={2}>
      <Grid item xs={2}>
        <FormikTextField
          size="small"
          fullWidth
          label="Nombre"
          name={`contact[${index}].name`}
        />
      </Grid>

      <Grid item xs={1}>
        <FormikTextField
          size="small"
          fullWidth
          label="Teléfono"
          name={`contact[${index}].phone`}
        />
      </Grid>

      <Grid item xs={4}>
        <FormikTextField
          size="small"
          fullWidth
          label="Correo electrónico"
          name={`contact[${index}].email`}
        />
      </Grid>

      <Grid item xs={1}>
        <Button
          sx={{ width: '100%', height: '100%' }}
          color="error"
          variant="outlined"
          onClick={handleDeleteContact}
        >
          Borrar
        </Button>
      </Grid>
    </Grid>
  );
};
