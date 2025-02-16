import {
  CollectionReference,
  getDocs,
  query,
  QueryConstraint,
} from 'firebase/firestore';
import { useCallback, useState } from 'react';

interface useQueryCollectionParams {
  additionalQueries?: QueryConstraint[];
  collection: CollectionReference;
}

export const useQueryCollection = <T>() => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const queryGenerator = useCallback(
    ({ additionalQueries, collection }: useQueryCollectionParams) => {
      const queries = [];

      if (additionalQueries) {
        queries.push(...additionalQueries);
      }

      return query(collection, ...queries);
    },
    []
  );

  const queryCollection = useCallback(
    async (params: useQueryCollectionParams) => {
      setLoading(true);
      const q = queryGenerator(params);

      return getDocs(q)
        .then((snapshot) => {
          const documents = snapshot.docs.map(
            (document) => document.data() as T
          );
          setData(documents);
          return documents;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [queryGenerator]
  );

  return { data, loading, queryCollection };
};
