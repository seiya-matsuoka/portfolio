export function LearningRepositoriesPage() {
  return (
    <>
      <section className="py-10 md:py-14">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Learning Repositories</h1>
        <p className="mt-3 max-w-2xl leading-7" style={{ color: 'var(--color-muted)' }}>
          学習のために作成したリポジトリの一覧。
        </p>
      </section>

      <section className="pb-16" aria-label="学習リポジトリ一覧">
        <div
          className="rounded-md border p-6"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-muted)',
          }}
        >
          学習リポジトリ一覧は準備中。
        </div>
      </section>
    </>
  );
}
