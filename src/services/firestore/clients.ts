import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import { Client } from '@src/types/clients';
import {
  FirestoreDataConverter,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';

const ClientConverter: FirestoreDataConverter<Client> = {
  toFirestore: (client: Client) => client,
  fromFirestore: (snapshot: any) => snapshot.data(),
};

const list = async (): Promise<Client[]> => {
  const q = query(
    collection(DB, COLLECTIONS.CLIENTS).withConverter(ClientConverter),
    orderBy('name', 'desc')
  );
  const querySnapshot = await getDocs(q);

  const clients: Client[] = [];
  querySnapshot.forEach((document) => {
    clients.push(document.data());
  });

  return clients;
};

const upsert = async (client: Client): Promise<string> => {
  const docCollection = collection(DB, COLLECTIONS.CLIENTS);
  const docRef = doc(docCollection, client.id).withConverter(ClientConverter);
  await setDoc(docRef, client);
  return docRef.id;
};

const remove = async (id: string) => {
  const docRef = doc(DB, COLLECTIONS.CLIENTS, id);
  await deleteDoc(docRef);

  return id;
};

export const Clients = {
  list,
  upsert,
  remove,
};
