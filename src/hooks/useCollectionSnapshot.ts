import { COLLECTIONS } from '@src/lib/enums/collections';
import { DB } from '@src/settings/firebase';
import {
  collection,
  endBefore,
  FirestoreDataConverter,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';
import { useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

interface useCollectionSnapshotParams<T> {
  collectionName: COLLECTIONS;
  orderByField: keyof T;
  converter?: FirestoreDataConverter<any>;
  pageSize?: 20 | 50 | 100;
}

export const useCollectionSnapshot = <T>({
  collectionName,
  orderByField,
  converter,
  pageSize = 20,
}: useCollectionSnapshotParams<T>) => {
  const [currentPageDocs, setCurrentPageDocs] = useState<T[]>([]);
  const [firstPageDoc, setFirstPageDoc] =
    useState<QueryDocumentSnapshot | null>(null);
  const [lastPageDoc, setLastPageDoc] = useState<QueryDocumentSnapshot | null>(
    null
  );

  const queryCreator = (
    startAfterDoc?: QueryDocumentSnapshot,
    endBeforeDoc?: QueryDocumentSnapshot
  ) => {
    let collectionRef = collection(DB, collectionName);
    if (converter) collectionRef = collectionRef.withConverter(converter);

    const queries: QueryConstraint[] = [
      orderBy(orderByField as string),
      limit(pageSize),
    ];

    if (startAfterDoc) {
      queries.push(startAfter(startAfterDoc));
    }
    if (endBeforeDoc) {
      queries.push(endBefore(endBeforeDoc));
    }

    queries.push(limit(pageSize));
    const q = query(collectionRef, ...queries);

    return q;
  };

  const queryCollection = (
    startAfterDoc?: QueryDocumentSnapshot,
    endBeforeDoc?: QueryDocumentSnapshot
  ) => {
    onSnapshot(queryCreator(startAfterDoc, endBeforeDoc), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as T);

      if (snapshot.docs.length > 0) {
        setLastPageDoc(snapshot.docs[snapshot.docs.length - 1]);
        setFirstPageDoc(snapshot.docs[0]);
      } else {
        setLastPageDoc(null);
        setFirstPageDoc(null);
      }

      setCurrentPageDocs(data);
    });
  };

  useEffectOnce(() => {
    queryCollection();
  });

  const first = async () => {
    queryCollection();
  };

  const next = () => {
    if (lastPageDoc) {
      queryCollection(lastPageDoc);
    }
  };

  const previous = () => {
    if (lastPageDoc) {
      queryCollection(undefined, lastPageDoc);
    }
  };

  return [currentPageDocs, { first, next, previous }];
};
