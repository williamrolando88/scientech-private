import { Client } from '@src/types/clients';
import { DoubleEntryAccounting } from '@src/types/doubleEntryAccounting';
import { Project } from '@src/types/projects';
import { Purchase } from '@src/types/purchases';
import { Sale } from '@src/types/sale';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

const clientConverter: FirestoreDataConverter<Client> = {
  toFirestore: (client: Client) => client,
  fromFirestore: (snapshot: any) => snapshot.data(),
};

const doubleEntryAccountingConverter: FirestoreDataConverter<DoubleEntryAccounting> =
  {
    toFirestore: (data: DoubleEntryAccounting) => data,
    fromFirestore: (snapshot: any) => ({
      ...snapshot.data(),
      issueDate: snapshot.data().issueDate.toDate(),
      createdAt: snapshot.data().createdAt.toDate(),
      updatedAt: snapshot.data().updatedAt.toDate(),
    }),
  };

const projectConverter: FirestoreDataConverter<Project> = {
  toFirestore: (project: Project) => project,
  fromFirestore: (snapshot: QueryDocumentSnapshot<Project, DocumentData>) => ({
    ...snapshot.data(),
    startedAt: snapshot.get('startedAt')
      ? snapshot.get('startedAt').toDate()
      : new Date(),
    estimateFinishDate: snapshot.get('estimateFinishDate')
      ? snapshot.get('estimateFinishDate').toDate()
      : new Date(),
    finishedAt: snapshot.get('finishedAt')
      ? snapshot.get('finishedAt').toDate()
      : undefined,
  }),
};

const purchaseConverter: FirestoreDataConverter<Purchase> = {
  toFirestore: (purchase: Purchase) => purchase,
  fromFirestore: (snapshot: QueryDocumentSnapshot<Purchase, DocumentData>) =>
    ({
      ...snapshot.data(),
      purchaseData: {
        ...snapshot.data().purchaseData,
        issueDate: snapshot.get('purchaseData.issueDate').toDate(),
      },
      payment: snapshot.data().payment
        ? {
            ...snapshot.data().payment,
            paymentDate: snapshot.get('payment.paymentDate').toDate(),
          }
        : null,
    }) as Purchase,
};

const saleConverter: FirestoreDataConverter<Sale> = {
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

export const CONVERTERS = {
  CLIENT: clientConverter,
  SALE: saleConverter,
  PURCHASE: purchaseConverter,
  PROJECT: projectConverter,
  DOUBLE_ENTRY_ACCOUNTING: doubleEntryAccountingConverter,
};
