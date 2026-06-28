import type { MouseEventHandler, ReactNode } from 'react';

type Props = {
  href: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const baseClassName =
  'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium shadow-sm transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]';

const variantClassNames = {
  primary:
    'border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)] focus-visible:bg-[var(--color-accent-hover)]',
  secondary: 'btn-secondary',
};

export function LinkButton({ href, variant = 'secondary', children, onClick }: Props) {
  return (
    <a
      onClick={onClick}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`${baseClassName} ${variantClassNames[variant]}`}
    >
      {children}
    </a>
  );
}
