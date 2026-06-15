// import { Link } from 'react-router';

// const techStackGroups = [
//   {
//     title: 'Primary Work Stack',
//     items: ['Java', 'SQL', 'HTML', 'CSS', 'JavaScript'],
//   },
//   {
//     title: 'Personal Development & Learning',
//     items: ['Java', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js'],
//   },
// ];

// const currentFocusItems = [
//   '個人開発での Web アプリケーション設計・実装',
//   'JavaScript, TypeScript, React によるフロントエンド開発',
//   'フルスタック対応を目指した技術習得',
// ];

export function ProfilePage() {
  return (
    <>
      <section className="py-10 md:py-14">
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Seiya Matsuoka</h1>
        <p className="mt-3 max-w-2xl leading-7" style={{ color: 'var(--color-muted)' }}>
          Java をメインに、バックエンド領域を主に扱うソフトウェアエンジニア。
          <br />
          個人開発では、TypeScript, React を中心に Web アプリケーションを開発。
        </p>
      </section>
    </>
  );
}
