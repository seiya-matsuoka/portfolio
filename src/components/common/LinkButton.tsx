import type { MouseEventHandler, ReactNode } from 'react';

type Props = {
  href: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function LinkButton({ href, variant = 'secondary', children, onClick }: Props) {
  if (variant === 'primary') {
    return (
      <a
        onClick={onClick}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1.5 rounded-md border border-transparent px-3 py-1.5 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-accent-contrast)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      onClick={onClick}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="btn-secondary inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
    >
      {children}
    </a>
  );
}
