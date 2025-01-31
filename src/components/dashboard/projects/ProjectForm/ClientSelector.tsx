import { InputProps, MenuItem, TextField } from '@mui/material';
import { useListClients } from '@src/hooks/cache/clients';
import { Project } from '@src/types/projects';
import { useFormikContext } from 'formik';
import { FC, useState } from 'react';

const ClientSelector: FC = () => {
  const { setFieldValue } = useFormikContext<Project>();
  const { data: clients, isLoading } = useListClients();
  const [selectedClient, setSelectedClient] = useState<string>('');

  const handleClientChange: InputProps['onChange'] = (event) => {
    const { value } = event.target;

    setSelectedClient(value);

    const clientData = clients.find((c) => c.id === value);

    if (clientData) {
      setFieldValue('client.name', clientData.name);
      setFieldValue('ref.clientId', value);
    } else {
      setFieldValue('client.name', '');
      setFieldValue('ref.clientId', null);
    }
  };

  return (
    <TextField
      select
      fullWidth
      size="small"
      name="client.name"
      label="Cliente"
      onChange={handleClientChange}
      value={selectedClient}
      required
    >
      <MenuItem sx={{ fontStyle: 'italic' }} key="void" value="">
        Ninguno
      </MenuItem>
      {!isLoading &&
        clients.map((client) => (
          <MenuItem key={client.id} value={client.id}>
            {client.name}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default ClientSelector;
