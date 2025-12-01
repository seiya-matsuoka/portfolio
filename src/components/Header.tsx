import { ThemeControls } from './ThemeControls';
import { SiGithub } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="/"
          className="text-base font-semibold tracking-tight md:text-lg"
          style={{ color: 'var(--color-fg)' }}
        >
          Seiya Matsuoka
        </a>
        <div className="flex items-center gap-3">
          <a
            href="mailto:seiya.matsuoka0413@gmail.com"
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
