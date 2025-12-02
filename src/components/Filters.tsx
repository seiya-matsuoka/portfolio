import { useState } from 'react';
import type { ProjectKind, ProjectStatus } from '../data/projects';

type StatusOption = 'ALL' | ProjectStatus;

type Props = {
  status: StatusOption;
  onChangeStatus: (next: StatusOption) => void;

  kindOptions: ProjectKind[];
  selectedKinds: Set<ProjectKind>;
  onToggleKind: (k: ProjectKind) => void;
  onResetKinds: () => void;
};

export function Filters({
  status,
  onChangeStatus,
  kindOptions,
  selectedKinds,
  onToggleKind,
  onResetKinds,
}: Props) {
  const [open, setOpen] = useState(false);

  const statusOptions: StatusOption[] = ['ALL', 'DONE', 'WIP'];

  const hasKindFilter = selectedKinds.size > 0;
  const hasStatusFilter = status !== 'ALL';
  const hasAnyFilter = hasStatusFilter || hasKindFilter;

  const statusLabel = status === 'ALL' ? 'ALL' : status;
  const kindLabel = hasKindFilter ? Array.from(selectedKinds).join(', ') : 'All';
  const summaryText = `Status: ${statusLabel} / Kind: ${kindLabel}`;

  const statusClass = (active: boolean) =>
    `inline-flex items-center rounded-md border px-2.5 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-[color:var(--color-ring)] outline-offset-2 ${
      active ? 'border-transparent text-white' : ''
    }`;

  const chipClass = (_active: boolean) =>
    `inline-flex items-center rounded-full border px-2.5 py-1 text-sm transition focus-visible:outline focus-visible:outline-[color:var(--color-ring)] outline-offset-2`;

  return (
    <div>
      {/* サマリ + 開閉トグル */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
          {hasAnyFilter ? summaryText : 'すべてのプロジェクトを表示中'}
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="self-start rounded-md border px-2.5 py-1 text-xs outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
          aria-expanded={open}
          aria-controls="filters-panel"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-fg)',
          }}
        >
          {open ? '絞り込み条件を隠す' : '絞り込み条件を表示'}
        </button>
      </div>

      {/* パネル本体 */}
      {open && (
        <div id="filters-panel" className="mt-3 flex flex-col gap-4">
          {/* Status */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Status:
            </span>
            {statusOptions.map((s) => {
              const active = status === s;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChangeStatus(s)}
                  className={statusClass(active)}
                  style={{
                    backgroundColor: active ? 'var(--color-accent)' : 'var(--color-surface)',
                    borderColor: active ? 'transparent' : 'var(--color-border)',
                    color: active ? 'white' : 'var(--color-fg)',
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>

          {/* Kind */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Kind:
            </span>
            {kindOptions.map((k) => {
              const active = selectedKinds.has(k);
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggleKind(k)}
                  className={chipClass(active)}
                  style={{
                    background: active ? 'var(--color-fg)' : 'var(--color-surface)',
                    color: active ? 'var(--color-bg)' : 'var(--color-fg)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {k}
                </button>
              );
            })}
            <button
              type="button"
              onClick={onResetKinds}
              className="ml-1 inline-flex items-center rounded-md border px-2 py-1 text-xs outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
              title="Kind選択をクリア"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-muted)',
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
