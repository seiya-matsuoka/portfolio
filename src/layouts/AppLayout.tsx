import { Outlet } from 'react-router';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { SkipLink } from '../components/common/SkipLink';

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-[color:var(--color-bg,theme(colors.slate.50))] text-[color:var(--color-fg,theme(colors.slate.800))]">
      <ScrollToTop />
      <SkipLink />
      <Header />

      <main id="main" className="mx-auto max-w-6xl px-4" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
