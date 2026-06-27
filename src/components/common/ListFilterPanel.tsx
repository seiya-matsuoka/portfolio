import { useState } from 'react';
import type { FilterOption } from '../../lib/filterOptions';
import { getSelectedLabels } from '../../lib/filterOptions';
import { FilterChipGroup } from './FilterChipGroup';
import { MultiSelectCombobox } from './MultiSelectCombobox';

type Props = {
  panelId: string;
  itemLabel: string;
  totalCount: number;
  filteredCount: number;
  kindOptions: FilterOption[];
  selectedKindValues: Set<string>;
  techOptions: FilterOption[];
  selectedTechValues: Set<string>;
  onToggleKind: (value: string) => void;
  onToggleTech: (value: string) => void;
  onClear: () => void;
};

export function ListFilterPanel({
  panelId,
  itemLabel,
  totalCount,
  filteredCount,
  kindOptions,
  selectedKindValues,
  techOptions,
  selectedTechValues,
  onToggleKind,
  onToggleTech,
  onClear,
}: Props) {
  const [open, setOpen] = useState(false);

  const selectedKindLabels = getSelectedLabels(kindOptions, selectedKindValues);
  const selectedTechLabels = getSelectedLabels(techOptions, selectedTechValues);
  const hasKindFilter = selectedKindLabels.length > 0;
  const hasTechFilter = selectedTechLabels.length > 0;
  const hasAnyFilter = hasKindFilter || hasTechFilter;

  const countText = hasAnyFilter
    ? `Showing ${filteredCount} of ${totalCount} ${itemLabel}`
    : `Showing all ${totalCount} ${itemLabel}`;
  const filterSummary = [
    `Kind: ${hasKindFilter ? selectedKindLabels.join(', ') : 'All'}`,
    `Tech: ${hasTechFilter ? selectedTechLabels.join(', ') : 'All'}`,
  ].join(' / ');

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:gap-3">
          <p
            className="text-sm font-medium md:w-56 md:shrink-0"
            style={{ color: 'var(--color-fg)' }}
          >
            {countText}
          </p>
          <p className="min-w-0 text-xs leading-5" style={{ color: 'var(--color-muted)' }}>
            {filterSummary}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="w-24 rounded-md border px-2.5 py-1 text-xs outline-offset-2 transition focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close filters' : 'Open filters'}
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-fg)',
            }}
          >
            {open ? 'Close filters' : 'Open filters'}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={!hasAnyFilter}
            className="rounded-md border px-2.5 py-1 text-xs outline-offset-2 transition focus-visible:outline focus-visible:outline-[color:var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-45"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-surface)',
              color: hasAnyFilter ? 'var(--color-muted)' : 'var(--color-muted)',
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {open && (
        <div
          id={panelId}
          className="w-full rounded-xl border p-4"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface)',
          }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <FilterChipGroup
              label="Kind"
              options={kindOptions}
              selectedValues={selectedKindValues}
              onToggle={onToggleKind}
            />
            <MultiSelectCombobox
              label="Tech"
              options={techOptions}
              selectedValues={selectedTechValues}
              onToggle={onToggleTech}
            />
          </div>
        </div>
      )}
    </div>
  );
}
