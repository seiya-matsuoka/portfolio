type Props = {
  items: string[];
  maxVisible?: number;
  className?: string;
};

export function TagList({ items, maxVisible, className = '' }: Props) {
  const visibleItems = typeof maxVisible === 'number' ? items.slice(0, maxVisible) : items;
  const hiddenCount = typeof maxVisible === 'number' ? Math.max(items.length - maxVisible, 0) : 0;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`.trim()}>
      {visibleItems.map((item) => (
        <span
          key={item}
          className="rounded border px-1.5 py-0.5 text-[11px]"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-fg)',
          }}
        >
          {item}
        </span>
      ))}
      {hiddenCount > 0 && <span className="text-[11px] text-slate-500">+{hiddenCount}</span>}
    </div>
  );
}
