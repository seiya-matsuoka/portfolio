type Props = {
  title: string;
  description: string;
};

export function SectionHeader({ title, description }: Props) {
  return (
    <section className="py-10 md:py-14">
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
      <p className="mt-3 max-w-2xl leading-7" style={{ color: 'var(--color-muted)' }}>
        {description}
      </p>
    </section>
  );
}
