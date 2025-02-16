import Papa from 'papaparse';
import { CSV_PARSER_CONFIG } from '../constants/settings';

export const extractSearchResults = (
  data: Record<string, any>[],
  searchKey: string
) => {
  if (!data || !data.length) return [];

  const searchResults = data.map((d) => hideSystemInfo(d[searchKey])) || [];
  return Papa.unparse(searchResults, {
    delimiter: CSV_PARSER_CONFIG.DELIMITER.PREVIEW,
    newline: CSV_PARSER_CONFIG.NEW_LINE.PREVIEW,
  });
};

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
