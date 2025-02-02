import {
  CollectionReference,
  FirestoreDataConverter,
  limit,
  onSnapshot,
  orderBy,
  OrderByDirection,
  query,
  QueryConstraint,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface useCollectionSnapshotParams<T> {
  additionalQueries?: QueryConstraint[];
  collection: CollectionReference;
  converter?: FirestoreDataConverter<any>;
  order?: { field: keyof T; direction?: OrderByDirection };
}

export const useCollectionSnapshot = <T>({
  collection,
  converter,
  additionalQueries,
  order,
}: useCollectionSnapshotParams<T>) => {
  const [data, setData] = useState<T[]>([]);

  const queryGenerator = useCallback(() => {
    let collectionRef = collection;
    if (converter) collectionRef = collectionRef.withConverter(converter);

    const queries = [];

    if (additionalQueries) queries.push(...additionalQueries);

    if (order) queries.push(orderBy(order.field as string, order.direction));

    if (process.env.NODE_ENV === 'development') {
      queries.push(limit(20));
    }

    return query(collectionRef, ...queries);
  }, [additionalQueries, collection, converter, order]);

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
