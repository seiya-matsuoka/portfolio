import { Link, NavLink } from 'react-router';
import { ThemeControls } from './ThemeControls';
import { SiGithub } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

const navigationItems = [
  { to: '/', label: 'Profile', end: true },
  { to: '/personal-projects', label: 'Personal Projects' },
  { to: '/learning-repositories', label: 'Learning Repositories' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link
          to="/"
          className="text-base font-semibold tracking-tight md:text-lg"
          style={{ color: 'var(--color-fg)' }}
        >
          Seiya Matsuoka
        </Link>

        <nav
          className="order-3 flex w-full flex-wrap gap-2 md:order-none md:w-auto"
          aria-label="Main"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-2.5 py-1 text-sm underline decoration-transparent outline-offset-2 transition hover:decoration-current focus-visible:outline focus-visible:outline-[color:var(--color-ring)] ${
                  isActive ? 'bg-[color:var(--color-fg)] text-[color:var(--color-bg)]' : ''
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-bg)' : 'var(--color-fg)',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:seiya.matsuoka.contact@gmail.com"
            className="text-sm underline decoration-transparent hover:decoration-current"
            style={{ color: 'var(--color-fg)' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <FiMail className="h-4 w-4" aria-hidden="true" />
              <span>Email</span>
            </span>
          </a>
          <a
            href="https://github.com/seiya-matsuoka"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm underline decoration-transparent hover:decoration-current"
            style={{ color: 'var(--color-fg)' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <SiGithub className="h-4 w-4" aria-hidden="true" />
              <span>GitHub</span>
            </span>
          </a>

          <ThemeControls />
        </div>
      </div>
    </header>
  );
}
