import { useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { Link, NavLink } from 'react-router';
import { FiLayers, FiMail, FiMenu, FiMonitor, FiUser, FiX } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { personalProjects } from '../data/personalProjects';
import { learningRepositories } from '../data/learningRepositories';
import { ThemeControls } from './ThemeControls';

type NavigationItem = {
  to: string;
  label: string;
  end?: boolean;
  iconCandidates: IconType[];
  count?: number;
};

const navigationItems: NavigationItem[] = [
  {
    to: '/',
    label: 'Profile',
    end: true,
    iconCandidates: [FiUser],
  },
  {
    to: '/personal-projects',
    label: 'Personal Projects',
    iconCandidates: [FiMonitor],
    // iconCandidates: [FiGrid, FiCode, FiMonitor],
    count: personalProjects.length,
  },
  {
    to: '/learning-repositories',
    label: 'Learning Repositories',
    iconCandidates: [FiLayers],
    // iconCandidates: [FiBookOpen, FiLayers, FiMonitor],
    count: learningRepositories.length,
  },
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

function NavigationIconCandidates({ icons }: { icons: IconType[] }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1" aria-hidden="true">
      {icons.map((Icon, index) => (
        <Icon key={index} className="h-4 w-4" />
      ))}
    </span>
  );
}

function NavigationCountBadge({ count }: { count: number }) {
  return (
    <span
      className="inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs leading-none font-semibold"
      style={{ background: 'color-mix(in oklab, currentColor, transparent 88%)' }}
    >
      {count}
    </span>
  );
}

function NavigationLinkContent({ item }: { item: NavigationItem }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <NavigationIconCandidates icons={item.iconCandidates} />
      <span>{item.label}</span>
      {typeof item.count === 'number' ? <NavigationCountBadge count={item.count} /> : null}
    </span>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
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
    <header
      ref={headerRef}
      className="sticky top-0 z-10 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 backdrop-blur"
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            to="/"
            className="shrink-0 text-base font-bold tracking-tight md:text-lg"
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
                <NavigationLinkContent item={item} />
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

        {isMobileMenuOpen ? (
          <nav
            id="mobile-navigation"
            className="absolute inset-x-0 top-full z-20 border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]/95 shadow-lg backdrop-blur md:hidden"
            aria-label="Mobile main"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `${getNavLinkClass(isActive)} px-3 py-2`}
                  style={({ isActive }) => getNavLinkStyle(isActive)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <NavigationLinkContent item={item} />
                </NavLink>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
