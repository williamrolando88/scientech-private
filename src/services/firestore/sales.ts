import { normalizeWithholding2Withholding } from '@src/lib/modules/documentParser/holdingParser';
import { DB } from '@src/settings/firebase';
import { NormalizedParsedWithholding } from '@src/types/documentParsers';
import { DocumentRef } from '@src/types/documentReference';
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
import { round } from 'mathjs';
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
  const projectId = sale.billingDocument.ref?.projectId;

  const newSale: Partial<Sale> = {
    ...sale,
    billingDocument: sale.billingDocument,
  };

  if (projectId) {
    if (sale.withholding && newSale.withholding) {
      newSale.withholding.ref = {
        ...sale.withholding.ref,
        projectId,
      };
    }

    if (sale.paymentCollection && newSale.paymentCollection) {
      newSale.paymentCollection.ref = {
        ...sale.paymentCollection.ref,
        projectId,
      };
    }
  }

  const docRef = doc(COLLECTIONS.SALES, sale.id);
  await updateDoc(docRef, newSale);
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

  let paid = 0;

  if (onlyStored.length) {
    const batch = writeBatch(DB);

    storedDocs.forEach((saleDoc, index) => {
      if (saleDoc === 'noStored' || !saleDoc) return;
      if (saleDoc.paymentCollection) {
        paid += 1;
        return;
      }

      const docRef = doc(COLLECTIONS.SALES, saleDoc.id);

      const withholding: Withholding = {
        ...normalizeWithholding2Withholding(normalizedWithholdings[index]),
        id: subId(docRef.id, 'saleWithholding'),
        ref: { ...saleDoc.billingDocument.ref, saleId: docRef.id },
      };

      const sale: Partial<Sale> = {
        withholding,
        paymentDue: round(saleDoc.billingDocument.total - withholding.total, 2),
      };

      batch.update(docRef, sale);
    });

    await batch.commit();
  }

  return {
    linked: onlyStored.length,
    ignored: normalizedWithholdings.length - onlyStored.length,
    paid,
  };
};

const upsertSingleWithholding = async (sale: Sale) => {
  if (sale.paymentCollection) {
    throw new Error('El documento ya fue cobrado, no se puede modificar');
  }

  const docRef = doc(COLLECTIONS.SALES, sale.id);
  const newSale: Sale = {
    ...sale,
    paymentDue: round(
      sale.billingDocument.total - (sale.withholding?.total ?? 0),
      2
    ),
  };

  await updateDoc(docRef, newSale);
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

const collectPayment = async (sale: Sale) => {
  const paymentCollectionRefs: DocumentRef = sale.billingDocument.ref ?? {};
  paymentCollectionRefs.saleId = sale.id;

  if (sale.withholding) {
    paymentCollectionRefs.withholdingId = sale.withholding.id;
  }

  const newSale: Sale = {
    ...sale,
    paymentCollection: {
      ...sale.paymentCollection!,
      id: subId(sale.id ?? '', 'salePaymentCollection'),
      ref: paymentCollectionRefs,
    },
  };

  const docRef = doc(COLLECTIONS.SALES, sale.id);
  await updateDoc(docRef, newSale);
};

const removePaymentCollection = async (sale: Sale) => {
  const docRef = doc(COLLECTIONS.SALES, sale.id);

  const newSale: Partial<Sale> = {
    paymentCollection: null,
  };

  await updateDoc(docRef, newSale);
};

export const SalesFirestore = {
  bulkCreate,
  update,
  remove,
  bulkWithhold,
  upsertSingleWithholding,
  deleteWithhold,
  collectPayment,
  removePaymentCollection,
};
