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
  const statusOptions: StatusOption[] = ['ALL', 'DONE', 'WIP', 'ARCHIVED'];

  const statusClass = (active: boolean) =>
    `inline-flex items-center rounded-md border px-2.5 py-1.5 text-sm transition
     ${
       active
         ? 'border-indigo-600 bg-indigo-600 text-white'
         : 'border-slate-200 bg-white hover:border-slate-300'
     }`;

  const chipClass = (active: boolean) =>
    `inline-flex items-center rounded-full border px-2.5 py-1 text-sm transition
     ${
       active
         ? 'border-slate-800 bg-slate-900 text-white'
         : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
     }`;

  return (
    <div className="flex flex-col gap-4">
      {/* Status */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-500">Status:</span>
        {statusOptions.map((s) => {
          const active = status === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={active}
              onClick={() => onChangeStatus(s)}
              className={statusClass(active)}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Kind */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-500">Kind:</span>
        {kindOptions.map((k) => {
          const active = selectedKinds.has(k);
          return (
            <button
              key={k}
              type="button"
              aria-pressed={active}
              onClick={() => onToggleKind(k)}
              className={chipClass(active)}
            >
              {k}
            </button>
          );
        })}
        {/* reset */}
        <button
          type="button"
          onClick={onResetKinds}
          className="ml-1 inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:border-slate-300"
          title="Kind選択をクリア"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
