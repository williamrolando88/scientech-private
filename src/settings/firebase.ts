import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { FIREBASE_API } from 'src/settings/global';

const firebaseApp = initializeApp(FIREBASE_API);
export const DB = firestore.initializeFirestore(firebaseApp, {
  localCache: firestore.persistentLocalCache({
    tabManager: firestore.persistentMultipleTabManager(),
  }),
});

export const AUTH = getAuth(firebaseApp);
