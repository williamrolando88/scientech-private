import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import {
  collection,
  FirestoreDataConverter,
  onSnapshot,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface useCollectionSnapshotParams {
  collectionName: COLLECTIONS;
  converter?: FirestoreDataConverter<any>;
}

export const useCollectionSnapshot = <T>({
  collectionName,
  converter,
}: useCollectionSnapshotParams) => {
  const [data, setData] = useState<T[]>([]);

  const queryCollection = useCallback(() => {
    let collectionRef = collection(DB, collectionName);
    if (converter) collectionRef = collectionRef.withConverter(converter);

    return onSnapshot(collectionRef, (snapshot) => {
      const snapshotData = snapshot.docs.map((doc) => doc.data() as T);

      setData(snapshotData);
    });
  }, [collectionName, converter]);

  useEffect(() => {
    const unsubscribe = queryCollection();
    return () => unsubscribe();
  }, [queryCollection]);

  return data;
};
