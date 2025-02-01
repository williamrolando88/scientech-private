import { CollectionReference, doc, onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface FunctionParams {
  id: string;
  collection: CollectionReference;
}

export const useDocumentSnapshot = <T>({ collection, id }: FunctionParams) => {
  const [documentData, setDocumentData] = useState<T | null>(null);

  const queryDocument = useCallback(
    () =>
      onSnapshot(doc(collection, id), (d) => {
        console.debug('Current data: ', d.data());

        if (d.exists()) {
          setDocumentData(d.data() as T);
        }
      }),
    [id, collection]
  );

  useEffect(() => {
    const unsubscribe = queryDocument();

    return () => unsubscribe();
  }, [queryDocument]);

  return documentData;
};
