import {
  CollectionReference,
  doc,
  FirestoreDataConverter,
  onSnapshot,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface FunctionParams {
  id: string;
  collection: CollectionReference;
  converter?: FirestoreDataConverter<any>;
}

export const useDocumentSnapshot = <T>({
  collection,
  id,
  converter,
}: FunctionParams) => {
  const [documentData, setDocumentData] = useState<T | null>(null);

  const queryDocument = useCallback(() => {
    let docRef = doc(collection, id);
    if (converter) docRef = docRef.withConverter(converter);

    return onSnapshot(docRef, (d) => {
      if (d.exists()) {
        setDocumentData(d.data() as T);
      }
    });
  }, [collection, id, converter]);

  useEffect(() => {
    const unsubscribe = queryDocument();

    return () => unsubscribe();
  }, [queryDocument]);

  return documentData;
};
