import { Link } from 'react-router';

// TODO: 仮画面。改修が必要。
export function NotFoundPage() {
  return (
    <section className="py-16 md:py-20">
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Page Not Found</h1>
      <p className="mt-3 max-w-2xl leading-7" style={{ color: 'var(--color-muted)' }}>
        指定されたページが見つかりませんでした。
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-accent-contrast)',
          }}
        >
          Profile に戻る
        </Link>
      </div>
    </section>
  );
}
