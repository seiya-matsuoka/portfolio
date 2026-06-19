import { Link } from 'react-router';

type Props = {
  title: string;
  description: string;
  href: string;
  actionLabel?: string;
};

export function PageLinkCard({ title, description, href, actionLabel = 'View page →' }: Props) {
  return (
    <Link
      to={href}
      className="group rounded-lg border p-4 outline-offset-2 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-card)',
        color: 'var(--color-fg)',
      }}
    >
      <span className="text-sm font-semibold">{title}</span>
      <p className="mt-2 text-sm leading-6" style={{ color: 'var(--color-muted)' }}>
        {description}
      </p>
      <span className="mt-3 inline-flex text-sm font-medium group-hover:underline">
        {actionLabel}
      </span>
    </Link>
  );
}
