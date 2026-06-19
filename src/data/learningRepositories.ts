export type LearningRepositoryStatus = 'DONE' | 'WIP';
export type LearningRepositoryKind = 'Reading' | 'Hands-on';

export type LearningRepositoryIcon = {
  name: string;
  src: string;
};

export type LearningRepository = {
  slug: string;
  title: string;
  summary: string; // 短い説明
  status: LearningRepositoryStatus;
  kind: LearningRepositoryKind;
  tech: string[];
  repoUrl: string; // GitHub
  icons: LearningRepositoryIcon[]; // 技術アイコン / 形式：icons/learning-repositories/<icon>.svg
  description?: string; // モーダル用の詳しい説明
  learningItems?: string[]; // 主な学習内容・要点
  featured?: boolean; // 強調したいリポジトリ
  updatedAt?: string;
};

// 学習リポジトリページの最終更新日
export const learningRepositoriesUpdatedAt = '2026-06-18';

// 学習リポジトリデータ
export const learningRepositories: LearningRepository[] = [
  {
    slug: 'git-github-basic-study',
    title: 'git-github-basic-study',
    summary: 'Git / GitHub を基礎から体系的に学習した記録と成果物をまとめたリポジトリ。',
    status: 'DONE',
    kind: 'Hands-on',
    tech: ['Git', 'GitHub', 'Git Bash'],
    repoUrl: 'https://github.com/seiya-matsuoka/git-github-basic-study',
    icons: [
      {
        name: 'Git',
        src: 'icons/learning-repositories/git-original.svg',
      },
      {
        name: 'GitHub',
        src: 'icons/learning-repositories/github-original.svg',
      },
    ],
    description:
      'Git / GitHub を基礎から体系的に学習した記録と成果物をまとめたリポジトリ。\n' +
      'CLI 中心で Git を操作し、init / status / add / commit の基本から、branch / merge / conflict / undo / remote / Pull Request / rebase までを一通り学習した。',
    learningItems: [
      '学習用リポジトリとして、基礎から順番に手を動かして学び、「後から見返して流れを再現できること」 を重視している。',
      'Git の基本操作を CLI で扱えるようにする',
      'branch / merge / conflict / undo / PR を説明できるようにする',
      'status / log / reflog を見ながら自力で状態を読めるようにする',
    ],
    featured: false,
    updatedAt: '2026-04-18',
  },
];
