export const extractSearchResults = (
  data: Record<string, any>[],
  searchKey: string
) => {
  if (!data || !data.length) return [];

  const searchResults = data.map((d) => hideSystemInfo(d[searchKey])) || [];
  return searchResults;
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
