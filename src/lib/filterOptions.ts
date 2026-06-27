export type FilterOption = {
  label: string;
  value: string;
};

export function toFilterValue(label: string) {
  return label
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createFilterOptions(labels: string[]) {
  const optionMap = new Map<string, FilterOption>();

  labels.forEach((label) => {
    const value = toFilterValue(label);
    if (!value || optionMap.has(value)) return;
    optionMap.set(value, { label, value });
  });

  return Array.from(optionMap.values()).sort((a, b) => a.label.localeCompare(b.label));
}

export function equalSet(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false;
  for (const value of a) if (!b.has(value)) return false;
  return true;
}

export function readSelectedSearchParamValues(
  searchParams: URLSearchParams,
  paramName: string,
  options: FilterOption[]
) {
  const validValues = new Set(options.map((option) => option.value));
  const tokens = searchParams
    .getAll(paramName)
    .flatMap((rawValue) => rawValue.split(','))
    .map((rawValue) => rawValue.trim())
    .filter(Boolean);

  const selectedValues = tokens
    .map((token) => {
      if (validValues.has(token)) return token;

      const normalizedToken = toFilterValue(token);
      return validValues.has(normalizedToken) ? normalizedToken : null;
    })
    .filter((value): value is string => value !== null);

  return new Set(selectedValues);
}

export function writeSelectedSearchParamValues(
  searchParams: URLSearchParams,
  paramName: string,
  selectedValues: Set<string>,
  options: FilterOption[]
) {
  searchParams.delete(paramName);

  options
    .filter((option) => selectedValues.has(option.value))
    .forEach((option) => searchParams.append(paramName, option.value));
}

export function getSelectedLabels(options: FilterOption[], selectedValues: Set<string>) {
  return options.filter((option) => selectedValues.has(option.value)).map((option) => option.label);
}
