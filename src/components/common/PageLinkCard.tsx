import { FiArrowRightCircle } from 'react-icons/fi';
import { Link } from 'react-router';

type Props = {
  title: string;
  description: string;
  href: string;
  actionLabel?: string;
};

export function PageLinkCard({ title, description, href, actionLabel = 'View page' }: Props) {
  const resetStyle = (element: HTMLAnchorElement) => {
    element.style.borderColor = 'var(--color-border)';
    element.style.background = 'var(--color-card)';
  };

  const applyHoverStyle = (element: HTMLAnchorElement) => {
    element.style.borderColor = 'color-mix(in oklab, var(--color-border), var(--color-fg) 18%)';
    element.style.background = 'color-mix(in oklab, var(--color-card), var(--color-fg) 2%)';
  };

  return (
    <Link
      to={href}
      className="group relative flex h-full rounded-xl border px-4 py-3.5 pr-14 outline-offset-2 transition-colors focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-card)',
        color: 'var(--color-fg)',
      }}
      aria-label={`${actionLabel}: ${title}`}
      onMouseEnter={(event) => applyHoverStyle(event.currentTarget)}
      onMouseLeave={(event) => resetStyle(event.currentTarget)}
      onFocus={(event) => applyHoverStyle(event.currentTarget)}
      onBlur={(event) => resetStyle(event.currentTarget)}
    >
      <span className="min-w-0">
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-2 block text-sm leading-6" style={{ color: 'var(--color-muted)' }}>
          {description}
        </span>
      </span>
      <FiArrowRightCircle
        className="pointer-events-none absolute top-1/2 right-4 h-7 w-7 -translate-y-1/2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1/2"
        style={{ color: 'var(--color-muted)' }}
        aria-hidden="true"
      />
    </Link>
  );
}
