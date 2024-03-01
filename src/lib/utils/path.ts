export function path(root?: string, ...sublink: string[]) {
  if (!root) return '/';

  const url = root.startsWith('/') ? root : `/${root}`;

  if (sublink.length === 0) return url;

  return `${url}${sublink.reduce((acc, item) => (item.startsWith('/') ? `${acc}${item}` : `${acc}/${item}`), '')}`;
}
