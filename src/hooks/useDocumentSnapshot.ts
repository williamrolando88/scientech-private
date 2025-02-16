import { CollectionReference, doc, onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface FunctionParams {
  id: string;
  collection: CollectionReference;
}

export const useDocumentSnapshot = <T>({ collection, id }: FunctionParams) => {
  const [documentData, setDocumentData] = useState<T | null>(null);

  const queryDocument = useCallback(() => {
    const docRef = doc(collection, id);

    return onSnapshot(docRef, (d) => {
      if (d.exists()) {
        setDocumentData(d.data() as T);
      }
    });
  }, [collection, id]);

  useEffect(() => {
    const unsubscribe = queryDocument();

    return () => unsubscribe();
  }, [queryDocument]);

  return documentData;
};
