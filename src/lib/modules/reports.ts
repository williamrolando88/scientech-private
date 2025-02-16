import Papa from 'papaparse';
import { CSV_PARSER_CONFIG } from '../constants/settings';

const hideSystemInfo = (data: Record<string, any>) => {
  const fieldsToDelete = [
    'createdAt',
    'updatedAt',
    'ref',
    'id',
    'locked',
    'unlocked',
  ];

  fieldsToDelete.forEach((field) => delete data[field]);
  return data;
};

const replaceNewlines = (obj: any): any => {
  if (typeof obj === 'string') {
    return obj.replace(/\n/g, '; ');
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => replaceNewlines(item));
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
      acc[key] = replaceNewlines(obj[key]);
      return acc;
    }, {});
  }

  return obj;
};

export const parseToCSV = (
  data: Record<string, any>[],
  mode: 'preview' | 'file' = 'preview'
) =>
  Papa.unparse(data, {
    delimiter:
      mode === 'preview'
        ? CSV_PARSER_CONFIG.DELIMITER.PREVIEW
        : CSV_PARSER_CONFIG.DELIMITER.FILE,
    newline:
      mode === 'preview'
        ? CSV_PARSER_CONFIG.NEW_LINE.PREVIEW
        : CSV_PARSER_CONFIG.NEW_LINE.FILE,
    quotes: true,
  });

export const extractSearchResults = (
  data: Record<string, any>[],
  searchKey: string
) => {
  if (!data || !data.length) return [];

  return data.map((d) => replaceNewlines(hideSystemInfo(d[searchKey]))) || [];
};
