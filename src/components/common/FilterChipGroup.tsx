import type { FilterOption } from '../../lib/filterOptions';

type Props = {
  label: string;
  options: FilterOption[];
  selectedValues: Set<string>;
  onToggle: (value: string) => void;
};

export function FilterChipGroup({ label, options, selectedValues, onToggle }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:min-h-10 md:shrink-0">
      <p className="shrink-0 text-sm font-medium" style={{ color: 'var(--color-fg)' }}>
        {label}
      </p>
      <div className="flex min-w-0 flex-wrap gap-2">
        {options.map((option) => {
          const active = selectedValues.has(option.value);

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option.value)}
              className="inline-flex items-center rounded-full border px-2.5 py-1 text-sm outline-offset-2 transition focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
              style={{
                background: active
                  ? 'color-mix(in oklab, var(--color-accent), transparent 88%)'
                  : 'var(--color-surface)',
                color: active ? 'var(--color-accent)' : 'var(--color-fg)',
                borderColor: active
                  ? 'color-mix(in oklab, var(--color-accent), var(--color-border) 35%)'
                  : 'var(--color-border)',
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
