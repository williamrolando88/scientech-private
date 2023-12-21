import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_API } from 'src/config-global';

const firebaseApp = initializeApp(FIREBASE_API);
export const DB = getFirestore(firebaseApp);
export const AUTH = getAuth(firebaseApp);
