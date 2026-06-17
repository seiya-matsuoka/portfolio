export type ProfileTechStackGroup = {
  title: string;
  items: string[];
};

export type ProfilePortfolioLink = {
  title: string;
  description: string;
  href: string;
};

export const profile = {
  name: 'Seiya Matsuoka',

  about: [
    'Java をメインに、バックエンド領域を主に扱うソフトウェアエンジニア。',
    '個人開発では、TypeScript, React を中心に Web アプリケーションを開発。',
  ],

  techStacks: [
    {
      title: 'Primary Work Stack',
      items: ['Java', 'SQL', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Personal Development & Learning',
      items: ['Java', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js'],
    },
    {
      title: 'Development Tools',
      items: ['VS Code', 'Git', 'GitHub'],
    },
  ] satisfies ProfileTechStackGroup[],

  portfolioLinks: [
    {
      title: 'Personal Projects',
      description: '個人開発で作成した Web アプリケーション / ツールを掲載。',
      href: '/personal-projects',
    },
    {
      title: 'Learning Repositories',
      description: '学習用に作成したリポジトリを掲載。',
      href: '/learning-repositories',
    },
  ] satisfies ProfilePortfolioLink[],

  currentFocus: [
    '個人開発での Web アプリケーション設計・実装',
    'JavaScript / TypeScript / React によるフロントエンド開発',
  ],

  contact: {
    email: 'seiya.matsuoka.contact@gmail.com',
    github: 'https://github.com/seiya-matsuoka',
  },

  englishSummary: [
    'Software engineer mainly working on backend development with Java.',
    'In personal projects, I build web applications primarily with TypeScript and React.',
    'My portfolio site showcases personal projects and learning repositories.',
    'Current focus includes designing and implementing web applications, and frontend development with JavaScript, TypeScript, and React.',
  ],
};
