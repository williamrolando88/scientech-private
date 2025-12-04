import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { FIREBASE_API } from 'src/settings/global';

const firebaseApp = initializeApp(FIREBASE_API);

// Initialize Firestore with error handling for hot reloading
let db: firestore.Firestore;
try {
  db = firestore.getFirestore(firebaseApp);
} catch {
  db = firestore.initializeFirestore(firebaseApp, {
    localCache: firestore.persistentLocalCache({
      tabManager: firestore.persistentMultipleTabManager(),
    }),
  });
}

export const DB = db;

export const AUTH = getAuth(firebaseApp);
