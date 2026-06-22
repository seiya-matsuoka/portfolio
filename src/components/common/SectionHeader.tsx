type Props = {
  title: string;
  description: string;
  lastUpdated: string;
};

export function SectionHeader({ title, description, lastUpdated }: Props) {
  return (
    <section className="py-10 md:py-14">
      <div className="grid gap-3 md:flex md:items-start md:justify-between md:gap-4">
        <p
          className="order-1 justify-self-end text-right text-xs leading-5 md:order-2 md:shrink-0 md:pt-1 md:text-sm"
          style={{ color: 'var(--color-muted)' }}
        >
          Last updated: {lastUpdated}
        </p>

        <div className="order-2 min-w-0 md:order-1">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-3 max-w-2xl leading-7" style={{ color: 'var(--color-muted)' }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
