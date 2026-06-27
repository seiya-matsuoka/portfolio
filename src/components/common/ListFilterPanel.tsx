import { useState } from 'react';
import type { FilterOption } from '../../lib/filterOptions';
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
  const [open, setOpen] = useState(true);

  const hasAnyFilter = selectedKindValues.size > 0 || selectedTechValues.size > 0;

  const countText = hasAnyFilter
    ? `Showing ${filteredCount} of ${totalCount} ${itemLabel}`
    : `Showing all ${totalCount} ${itemLabel}`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium" style={{ color: 'var(--color-fg)' }}>
          {countText}
        </p>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="w-24 rounded-md border px-3 py-1.5 text-xs font-medium outline-offset-2 transition hover:bg-[color:var(--color-card)] focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
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
            className="rounded-md border px-3 py-1.5 text-xs font-medium outline-offset-2 transition hover:bg-[color:var(--color-card)] focus-visible:outline focus-visible:outline-[color:var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-[color:var(--color-surface)]"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-muted)',
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {open && (
        <div
          id={panelId}
          className="w-full rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface)',
          }}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-5">
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
