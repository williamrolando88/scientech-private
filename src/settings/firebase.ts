import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { FIREBASE_API } from 'src/settings/global';

const firebaseApp = initializeApp(FIREBASE_API);
export const DB = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache(),
});
// export const DB = getFirestore(firebaseApp);
export const AUTH = getAuth(firebaseApp);
