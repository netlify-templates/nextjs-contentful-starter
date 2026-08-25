export function normalizeBuildingKey({ address, postalCode, city }) {
  const norm = (s) =>
    (s || '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFKD')
      .replace(/\s+/g, ' ');

  return `${norm(address)}|${norm(postalCode)}|${norm(city)}`;
}
