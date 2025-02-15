import {
  CollectionReference,
  getDocs,
  orderBy,
  OrderByDirection,
  query,
  QueryConstraint,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface useQueryCollectionParams<T> {
  additionalQueries?: QueryConstraint[];
  collection: CollectionReference;
  order?: { field: keyof T; direction?: OrderByDirection };
}

export const useQueryCollection = <T>({
  collection,
  additionalQueries,
  order,
}: useQueryCollectionParams<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const queryGenerator = useCallback(() => {
    const queries = [];
    if (additionalQueries) queries.push(...additionalQueries);
    if (order) queries.push(orderBy(order.field as string, order.direction));

    return query(collection, ...queries);
  }, [additionalQueries, collection, order]);

  const queryCollection = useCallback(() => {
    setLoading(true);
    const q = queryGenerator();

    getDocs(q)
      .then((snapshot) => {
        const documents = snapshot.docs.map((document) => document.data() as T);
        setData(documents);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [queryGenerator]);

  useEffect(() => {
    queryCollection();
  }, [queryCollection]);

  return [data, loading];
};
