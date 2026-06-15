import { Outlet } from 'react-router';
import { Header } from '../components/Header';

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-[color:var(--color-bg,theme(colors.slate.50))] text-[color:var(--color-fg,theme(colors.slate.800))]">
      <a
        href="#main"
        className="sr-only fixed top-3 left-3 z-[100] rounded border bg-[color:var(--color-surface)] px-3 py-2 text-sm focus:not-sr-only"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-fg)' }}
      >
        本文へスキップ
      </a>

      <Header />
      <main id="main" className="mx-auto max-w-6xl px-4" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="border-t border-[color:var(--color-border,theme(colors.slate.200))] py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Seiya Matsuoka
      </footer>
    </div>
  );
}
