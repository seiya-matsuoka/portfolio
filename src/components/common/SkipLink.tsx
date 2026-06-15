export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only fixed top-3 left-3 z-[100] rounded border bg-[color:var(--color-surface)] px-3 py-2 text-sm focus:not-sr-only"
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-fg)' }}
    >
      本文へスキップ
    </a>
  );
}
