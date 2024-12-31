import { DB } from '@src/settings/firebase';
import { BillingDocument, Sale } from '@src/types/sale';
import {
  doc,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
  writeBatch,
} from 'firebase/firestore';
import { COLLECTIONS } from './collections';

export const saleConverter: FirestoreDataConverter<Sale> = {
  toFirestore: (sale: Sale) => sale,
  fromFirestore: (snapshot: QueryDocumentSnapshot<Sale, DocumentData>) =>
    ({
      ...snapshot.data(),
      billingDocument: {
        ...snapshot.data().billingDocument,
        issueDate: snapshot.get('billingDocument.issueDate').toDate(),
      },
      withholding: snapshot.data().withholding
        ? {
            ...snapshot.data().withholding,
            issueDate: snapshot.get('withholding.issueDate').toDate(),
          }
        : null,
      paymentCollection: snapshot.data().paymentCollection
        ? {
            ...snapshot.data().paymentCollection,
            paymentDate: snapshot.get('paymentCollection.paymentDate').toDate(),
          }
        : null,
    }) as Sale,
};

const bulkCreate = async (invoices: BillingDocument[]) => {
  const storedDocuments = await Promise.all(
    invoices.map(async (invoice) => {
      const q = query(
        COLLECTIONS.SALES,
        where('billingDocument.emissionPoint', '==', invoice.emissionPoint),
        where('billingDocument.establishment', '==', invoice.establishment),
        where(
          'billingDocument.sequentialNumber',
          '==',
          invoice.sequentialNumber
        )
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return 'noStored';
      return 'stored';
    })
  );

  const onlyNoStored = storedDocuments.filter((d) => d === 'noStored');

  if (onlyNoStored.length) {
    const batch = writeBatch(DB);

    storedDocuments.forEach((d, index) => {
      if (d === 'stored') return;
      const invoice = invoices[index];
      const docRef = doc(COLLECTIONS.SALES);

      const sale: Sale = {
        id: docRef.id,
        billingDocument: { ...invoice, id: docRef.id },
        paymentDue: invoice.total,
      };

      batch.set(docRef, sale);
    });

    await batch.commit();
  }

  return {
    created: onlyNoStored.length,
    existing: invoices.length - onlyNoStored.length,
  };
};

export const SalesFirestore = {
  bulkCreate,
};
