import { Client } from '@src/types/clients';
import {
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { COLLECTIONS } from './collections';

const list = async (): Promise<Client[]> => {
  const q = query(COLLECTIONS.CLIENTS, orderBy('name', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((document) => document.data() as Client);
};

const upsert = async (client: Client): Promise<string> => {
  const docRef = doc(COLLECTIONS.CLIENTS, client.id);
  await setDoc(docRef, client);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(COLLECTIONS.CLIENTS, id);
  await deleteDoc(docRef);

  return id;
};

export const Clients = {
  list,
  upsert,
  remove,
};
