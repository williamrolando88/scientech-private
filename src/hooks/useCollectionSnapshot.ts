import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import {
  collection,
  FirestoreDataConverter,
  limit,
  onSnapshot,
  orderBy,
  OrderByDirection,
  query,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface useCollectionSnapshotParams<T> {
  collectionName: COLLECTIONS;
  converter?: FirestoreDataConverter<any>;
  order?: { field: keyof T; direction?: OrderByDirection };
}

export const useCollectionSnapshot = <T>({
  collectionName,
  converter,
  order,
}: useCollectionSnapshotParams<T>) => {
  const [data, setData] = useState<T[]>([]);

  const queryGenerator = useCallback(() => {
    let collectionRef = collection(DB, collectionName);
    if (converter) collectionRef = collectionRef.withConverter(converter);

    const queries = [];
    if (order) queries.push(orderBy(order.field as string, order.direction));

    // TODO: Used for debugging purposes, remove in production
    if (process.env.NODE_ENV === 'development') {
      queries.push(limit(20));
    }

    return query(collectionRef, ...queries);
  }, [collectionName, converter, order]);

  const queryCollection = useCallback(
    () =>
      onSnapshot(queryGenerator(), (snapshot) => {
        const snapshotData = snapshot.docs.map((doc) => doc.data() as T);

        setData(snapshotData);
      }),
    [queryGenerator]
  );

  useEffect(() => {
    const unsubscribe = queryCollection();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};