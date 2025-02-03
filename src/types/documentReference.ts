import { DocumentRefSchema } from '@src/lib/schemas/documentRef';
import { z } from 'zod';

export type DocumentRef = z.infer<typeof DocumentRefSchema>;
export type WrappedDocumentRef = { ref: DocumentRef };
