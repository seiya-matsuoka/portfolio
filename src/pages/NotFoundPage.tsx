import { PageLinkCard } from '../components/common/PageLinkCard';

const pageLinks = [
  {
    title: 'Profile',
    description: 'プロフィールページ',
    href: '/',
  },
  {
    title: 'Personal Projects',
    description: '個人開発で作成したWebアプリケーション / ツールを掲載',
    href: '/personal-projects',
  },
  {
    title: 'Learning Repositories',
    description: '学習用に作成したリポジトリを掲載',
    href: '/learning-repositories',
  },
];

export function NotFoundPage() {
  return (
    <>
      <section className="py-10 md:py-14">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Page not found</h1>
        <p className="mt-3 max-w-2xl leading-7" style={{ color: 'var(--color-muted)' }}>
          指定されたページは見つかりませんでした。
          <br />
          以下のページから目的のコンテンツを確認できます。
        </p>
      </section>

      <section className="pb-16" aria-label="主要ページへの導線">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pageLinks.map((page) => (
            <PageLinkCard
              key={page.href}
              title={page.title}
              description={page.description}
              href={page.href}
            />
          ))}
        </div>
      </section>
    </>
  );
}
