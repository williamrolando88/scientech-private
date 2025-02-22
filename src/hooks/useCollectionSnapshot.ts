import {
  CollectionReference,
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
  order?: { field: keyof T; direction?: OrderByDirection };
}

export const useCollectionSnapshot = <T>({
  collection,
  additionalQueries,
  order,
}: useCollectionSnapshotParams<T>) => {
  const [data, setData] = useState<T[]>([]);

  const queryGenerator = useCallback(() => {
    const queries = [];

    if (additionalQueries) queries.push(...additionalQueries);

    if (order) queries.push(orderBy(order.field as string, order.direction));

    if (process.env.NODE_ENV === 'development') {
      queries.push(limit(20));
    }

    return query(collection, ...queries);
  }, [additionalQueries, collection, order]);

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
