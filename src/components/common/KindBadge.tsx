type Props = {
  children: string;
  className?: string;
};

export function KindBadge({ children, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${className}`.trim()}
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-surface)',
        color: 'var(--color-fg)',
      }}
    >
      {children}
    </span>
  );
}
