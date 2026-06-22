export type ProfileTechStackItemGroup = {
  title: string;
  items: string[];
};

export type ProfileTechStackGroup = {
  title: string;
  items?: string[];
  groups?: ProfileTechStackItemGroup[];
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
    'IT業界以外での社会人経験を経て、2024年1月よりエンジニアとしてのキャリアを開始。Java をメインに、バックエンド領域を主に扱うソフトウェアエンジニアとして企業に勤務。',
    '個人開発では、TypeScript / React を中心にWebアプリケーションを開発。フロントエンド開発 / Webアプリケーション全体の設計・実装のスキル向上に取り組む。',
  ],

  techStacks: [
    {
      title: 'Work',
      groups: [
        {
          title: 'Primary',
          items: ['Java', 'SQL', 'HTML', 'CSS', 'JavaScript'],
        },
        {
          title: 'Also Used',
          items: ['Python', 'Shell Script', 'Bootstrap', 'jQuery'],
        },
      ],
    },
    {
      title: 'Personal Development',
      items: ['Java', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'Express'],
    },
  ] satisfies ProfileTechStackGroup[],

  portfolioLinks: [
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
  ] satisfies ProfilePortfolioLink[],

  contact: {
    email: 'seiya.matsuoka.contact@gmail.com',
    githubLabel: 'seiya-matsuoka',
    githubUrl: 'https://github.com/seiya-matsuoka',
  },

  aboutEnglish: [
    'After gaining work experience outside the IT industry, I started my career as an engineer in January 2024.',
    'I work as a software engineer, mainly handling backend development with Java.',
    'In personal projects, I build web applications primarily with TypeScript and React.',
    'I am working to improve my frontend development skills and my ability to design and implement web applications as a whole.',
  ],
};
