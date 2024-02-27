import { Client, ClientContact } from '@src/types/clients';

export const CLIENT_INITIAL_VALUE: Client = {
  name: '',
  address: '',
  contact: [],
  id: '',
  phone: '',
  email: '',
};

export const CLIENT_CONTACT_INITIAL_VALUE: ClientContact = {
  name: '',
  phone: '',
  email: '',
  role: '',
};
