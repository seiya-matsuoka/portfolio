import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FiMail, FiMenu, FiX } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { ThemeControls } from './ThemeControls';

const navigationItems = [
  { to: '/', label: 'Profile', end: true },
  { to: '/personal-projects', label: 'Personal Projects' },
  { to: '/learning-repositories', label: 'Learning Repositories' },
];

function getNavLinkClass(isActive: boolean) {
  return `rounded-md px-2.5 py-1 text-sm font-medium underline decoration-transparent outline-offset-2 transition hover:decoration-current focus-visible:outline focus-visible:outline-[color:var(--color-ring)] ${
    isActive ? '' : 'hover:opacity-80'
  }`;
}

function getNavLinkStyle(isActive: boolean) {
  return {
    color: isActive ? 'var(--color-accent)' : 'var(--color-fg)',
    background: isActive
      ? 'color-mix(in oklab, var(--color-accent), transparent 88%)'
      : 'transparent',
  };
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const closeMobileMenuOnDesktop = () => {
      if (mediaQuery.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    closeMobileMenuOnDesktop();
    mediaQuery.addEventListener('change', closeMobileMenuOnDesktop);

    return () => mediaQuery.removeEventListener('change', closeMobileMenuOnDesktop);
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-5">
          <Link
            to="/"
            className="shrink-0 text-base font-semibold tracking-tight md:text-lg"
            style={{ color: 'var(--color-fg)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Seiya Matsuoka
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => getNavLinkClass(isActive)}
                style={({ isActive }) => getNavLinkStyle(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <a
            href="mailto:seiya.matsuoka.contact@gmail.com"
            className="inline-flex h-9 w-9 items-center justify-center gap-1.5 rounded-md text-sm underline decoration-transparent outline-offset-2 transition hover:decoration-current focus-visible:outline focus-visible:outline-[color:var(--color-ring)] md:w-auto md:px-2"
            style={{ color: 'var(--color-fg)' }}
            aria-label="Email"
          >
            <FiMail className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">Email</span>
          </a>
          <a
            href="https://github.com/seiya-matsuoka"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-9 w-9 items-center justify-center gap-1.5 rounded-md text-sm underline decoration-transparent outline-offset-2 transition hover:decoration-current focus-visible:outline focus-visible:outline-[color:var(--color-ring)] md:w-auto md:px-2"
            style={{ color: 'var(--color-fg)' }}
            aria-label="GitHub"
          >
            <SiGithub className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">GitHub</span>
          </a>

          <ThemeControls />

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm outline-offset-2 transition hover:opacity-80 focus-visible:outline focus-visible:outline-[color:var(--color-ring)] md:hidden"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-fg)',
            }}
            aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <FiX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FiMenu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-[color:var(--color-border)] md:hidden"
          aria-label="Mobile main"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `${getNavLinkClass(isActive)} px-3 py-2`}
                style={({ isActive }) => getNavLinkStyle(isActive)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
