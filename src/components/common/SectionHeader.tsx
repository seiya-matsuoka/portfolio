type Props = {
  title: string;
  description: string;
  lastUpdated: string;
};

export function SectionHeader({ title, description, lastUpdated }: Props) {
  return (
    <section className="py-10 md:py-14">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-3 max-w-2xl leading-7" style={{ color: 'var(--color-muted)' }}>
            {description}
          </p>
        </div>
        <p
          className="shrink-0 pt-1 text-right text-xs leading-5 md:text-sm"
          style={{ color: 'var(--color-muted)' }}
        >
          Last updated: {lastUpdated}
        </p>
      </div>
    </section>
  );
}
