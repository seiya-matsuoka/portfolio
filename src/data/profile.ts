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
  updatedAt: '2026-06-18',

  about: [
    'IT業界以外での社会人経験を経て、2024年1月よりエンジニアとしてのキャリアを開始。',
    'Java をメインに、バックエンド領域を主に扱うソフトウェアエンジニアとして企業に勤務。',
    '個人開発では、TypeScript / React を中心にWebアプリケーションを開発。',
    'フロントエンド開発 / Webアプリケーション全体の設計・実装のスキル向上に取り組む。',
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
      description: '個人開発で作成したWebアプリケーション / ツールを掲載。',
      href: '/personal-projects',
    },
    {
      title: 'Learning Repositories',
      description: '学習用に作成したリポジトリを掲載。',
      href: '/learning-repositories',
    },
  ] satisfies ProfilePortfolioLink[],

  contact: {
    email: 'seiya.matsuoka.contact@gmail.com',
    githubLabel: 'seiya-matsuoka',
    githubUrl: 'https://github.com/seiya-matsuoka',
  },

  englishSummary: [
    'After gaining work experience outside the IT field, I started my career as a software engineer in January 2025.',
    'I mainly work on backend development with Java.',
    'In personal projects, I build web applications primarily with TypeScript and React.',
    'I am working to improve my ability to design and implement web applications as a whole.',
  ],
};
