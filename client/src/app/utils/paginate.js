export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return items ? [...items].splice(startIndex, pageSize) : null;
}
