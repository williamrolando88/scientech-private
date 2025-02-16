import { COLLECTIONS } from '@src/services/firestore/collections';
import { z } from 'zod';

export const reportCollectionMapping = {
  sale: {
    collection: COLLECTIONS.SALES,
    searchKeys: {
      billingDocument: {
        value: 'billingDocument',
        label: 'Facturas',
        queryKey: 'billingDocument.issueDate',
      },
      withholding: {
        value: 'withholding',
        label: 'Retenciones',
        queryKey: 'withholding.issueDate',
      },
    },
  },
} as const;

export const ReportFormValidationSchema = z
  .object({
    collection: z.enum(
      Object.keys(reportCollectionMapping) as [
        keyof typeof reportCollectionMapping,
      ]
    ),
    searchKey: z.string(),
    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
  })
  .refine(
    (data) =>
      new Date(data.startAt.toDateString()) <=
      new Date(data.endAt.toDateString()),
    {
      message: 'La fecha de inicio no puede ser mayor a la fecha de fin',
      path: ['startAt'],
    }
  );
