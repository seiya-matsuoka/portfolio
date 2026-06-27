import { getTechnologyMeta } from '../data/technologyMeta';
import type { FilterOption } from './filterOptions';
import { toFilterValue } from './filterOptions';

export function createTechnologyFilterOptions(labels: string[]) {
  const optionMap = new Map<string, FilterOption>();

  labels.forEach((label) => {
    const value = toFilterValue(label);
    if (!value || optionMap.has(value)) return;

    const meta = getTechnologyMeta(label);
    optionMap.set(value, {
      label: meta.label,
      value,
      iconSrc: meta.iconSrc,
    });
  });

  return Array.from(optionMap.values()).sort((a, b) => a.label.localeCompare(b.label));
}
