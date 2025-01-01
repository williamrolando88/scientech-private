import { normalizeWithholding2Withholding } from '@src/lib/modules/documentParser/holdingParser';
import { DB } from '@src/settings/firebase';
import { NormalizedParsedWithholding } from '@src/types/documentParsers';
import { BillingDocument, Sale, Withholding } from '@src/types/sale';
import {
  deleteDoc,
  doc,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { COLLECTIONS } from './collections';
import { subId } from './helpers/subIdGenerator';

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

const update = async (sale: Sale) => {
  if (sale.withholding) {
    throw new Error(
      'El documento tiene una retención vinculada, no se puede modificar'
    );
  }
  if (sale.paymentCollection) {
    throw new Error('El documento ya fue cobrado, no se puede modificar');
  }

  const docRef = doc(COLLECTIONS.SALES, sale.id);
  await updateDoc(docRef, sale);
};

const remove = async (sale: Sale) => {
  const docRef = doc(COLLECTIONS.SALES, sale.id);

  await deleteDoc(docRef);
};

const bulkWithhold = async (
  normalizedWithholdings: NormalizedParsedWithholding[]
) => {
  const storedDocs = await Promise.all(
    normalizedWithholdings.map(async (withholding) => {
      const { linkedInvoice } = withholding.normalizedData;

      const q = query(
        COLLECTIONS.SALES.withConverter(saleConverter),
        where(
          'billingDocument.emissionPoint',
          '==',
          linkedInvoice.emissionPoint
        ),
        where(
          'billingDocument.establishment',
          '==',
          linkedInvoice.establishment
        ),
        where(
          'billingDocument.sequentialNumber',
          '==',
          linkedInvoice.sequentialNumber
        )
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return 'noStored';
      return querySnapshot.docs[0].data();
    })
  );

  const onlyStored = storedDocs
    .filter((d) => d !== 'noStored')
    .filter((d) => !!d);

  if (onlyStored.length) {
    const batch = writeBatch(DB);

    storedDocs.forEach((saleDoc, index) => {
      if (saleDoc === 'noStored' || !saleDoc) return;

      const docRef = doc(COLLECTIONS.SALES, saleDoc.id);

      const withholding: Withholding = {
        ...normalizeWithholding2Withholding(normalizedWithholdings[index]),
        id: subId(docRef.id, 'saleWithholding'),
        ref: { ...saleDoc.billingDocument.ref, sellId: docRef.id },
      };

      const sale: Partial<Sale> = {
        withholding,
        paymentDue: saleDoc.billingDocument.total - withholding.total,
      };

      batch.update(docRef, sale);
    });

    await batch.commit();
  }

  return {
    linked: onlyStored.length,
    ignored: normalizedWithholdings.length - onlyStored.length,
  };
};

const deleteWithhold = async (sale: Sale) => {
  if (!sale.withholding) {
    throw new Error('El documento no tiene una retención vinculada');
  }
  if (sale.paymentCollection) {
    throw new Error('El documento ya fue cobrado, no se puede modificar');
  }

  const docRef = doc(COLLECTIONS.SALES, sale.id);

  const newSale: Partial<Sale> = {
    withholding: null,
    paymentDue: sale.billingDocument.total,
  };

  await updateDoc(docRef, newSale);
};

export const SalesFirestore = {
  bulkCreate,
  update,
  remove,
  bulkWithhold,
  deleteWithhold,
};
