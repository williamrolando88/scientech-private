import { Button, Divider, Stack } from '@mui/material';
import { CLIENT_CONTACT_INITIAL_VALUE } from '@src/lib/constants/client';
import { Client } from '@src/types/clients';
import { useFormikContext } from 'formik';
import { ContactRow } from './ContactRow';

export const ContactForm = () => {
  const { values, setFieldValue } = useFormikContext<Client>();

  console.log(values);

  const handleAddContactRow = () => {
    setFieldValue('contact', [...values.contact, CLIENT_CONTACT_INITIAL_VALUE]);
  };

  return (
    <>
      <Divider />

      <Button
        onClick={handleAddContactRow}
        variant="contained"
        color="success"
        sx={{ alignSelf: 'flex-end' }}
      >
        Agregar contacto
      </Button>

      <Stack gap={2}>
        {values.contact.map((_, index) => (
          <ContactRow key={index} index={index} />
        ))}
      </Stack>
    </>
  );
};
