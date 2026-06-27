import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { FilterOption } from '../../lib/filterOptions';
import { asset } from '../../lib/asset';

type Props = {
  label: string;
  options: FilterOption[];
  selectedValues: Set<string>;
  onToggle: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
};

type OptionIconProps = {
  option: FilterOption;
  className: string;
};

function OptionIcon({ option, className }: OptionIconProps) {
  if (!option.iconSrc) return null;

  return (
    <img
      src={asset(option.iconSrc)}
      alt=""
      className={`${className} shrink-0 object-contain`}
      loading="lazy"
      decoding="async"
      aria-hidden="true"
      onError={(event) => {
        event.currentTarget.style.display = 'none';
      }}
    />
  );
}

export function MultiSelectCombobox({
  label,
  options,
  selectedValues,
  onToggle,
  placeholder = 'Select technologies...',
  emptyMessage = 'No matching technologies',
}: Props) {
  const inputId = useId();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selectedOptions = useMemo(
    () => options.filter((option) => selectedValues.has(option.value)),
    [options, selectedValues]
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;

    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 md:flex md:min-w-0 md:flex-1 md:items-start md:gap-3"
    >
      <label
        htmlFor={inputId}
        className="text-sm font-medium md:flex md:h-10 md:shrink-0 md:items-center"
        style={{ color: 'var(--color-fg)' }}
      >
        {label}
      </label>

      <div className="relative min-w-0 md:w-72 md:shrink-0">
        <input
          id={inputId}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false);
              setQuery('');
            }
          }}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          className="w-full rounded-lg border py-2 pr-9 pl-3 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-card)',
            color: 'var(--color-fg)',
          }}
        />
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="absolute top-1/2 right-2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-xs outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
          aria-label={open ? `Close ${label} options` : `Open ${label} options`}
          aria-expanded={open}
          aria-controls={listboxId}
          style={{ color: 'var(--color-muted)' }}
        >
          {open ? '×' : '⌄'}
        </button>

        {open && (
          <div
            id={listboxId}
            role="listbox"
            aria-label={`${label} options`}
            className="absolute top-full z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border p-1 shadow-lg"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-card)',
              color: 'var(--color-fg)',
            }}
          >
            {filteredOptions.length === 0 ? (
              <p className="px-3 py-2 text-sm" style={{ color: 'var(--color-muted)' }}>
                {emptyMessage}
              </p>
            ) : (
              filteredOptions.map((option) => {
                const active = selectedValues.has(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onToggle(option.value);
                      setQuery('');
                      setOpen(true);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm outline-offset-2 transition hover:bg-[color:var(--color-surface)] focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
                    style={{
                      background: active
                        ? 'color-mix(in oklab, var(--color-accent), transparent 92%)'
                        : 'transparent',
                      color: active ? 'var(--color-accent)' : 'var(--color-fg)',
                      boxShadow: active
                        ? 'inset 0 0 0 1px color-mix(in oklab, var(--color-accent), var(--color-border) 45%)'
                        : 'none',
                    }}
                  >
                    <span className="w-4 shrink-0 text-xs" aria-hidden="true">
                      {active ? '✓' : ''}
                    </span>
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      <OptionIcon option={option} className="h-4 w-4" />
                    </span>
                    <span>{option.label}</span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      <div className="col-span-2 min-w-0 md:flex-1" aria-label={`Selected ${label}`}>
        <div
          className="flex min-h-10 min-w-0 flex-wrap items-center gap-1.5 rounded-lg border px-3 py-2"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-card)',
          }}
        >
          {selectedOptions.length > 0 ? (
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {selectedOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onToggle(option.value)}
                  className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs outline-offset-2 transition focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
                  aria-label={`Remove ${option.label}`}
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-fg)',
                  }}
                >
                  <OptionIcon option={option} className="h-3 w-3" />
                  <span>{option.label}</span>
                  <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          ) : (
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
              No technologies selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
