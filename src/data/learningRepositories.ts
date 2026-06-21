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
    title: 'Git / GitHub - Basic Study',
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
      '基礎から順に進めつつ、後半では GitHub を使ったリモート運用、PR フロー、履歴整理、トラブル対応までを扱っている。',
    ],
    featured: false,
    updatedAt: '2026-04-18',
  },
  {
    slug: 'linux-cli-vim-shell-job-study',
    title: 'Linux / CLI / Vim / Shell / Job - Study',
    summary: 'Linux の基礎を、手を動かして学習した記録と成果物をまとめたリポジトリ。',
    status: 'DONE',
    kind: 'Hands-on',
    tech: ['Linux', 'Shell Script', 'Bash', 'Vim'],
    repoUrl: 'https://github.com/seiya-matsuoka/linux-cli-vim-shell-job-study',
    icons: [
      {
        name: 'Linux',
        src: 'icons/learning-repositories/linux-original.svg',
      },
      {
        name: 'Bash',
        src: 'icons/learning-repositories/bash-original.svg',
      },
    ],
    description:
      'Linux の基礎を、手を動かして学習した記録と成果物をまとめたリポジトリ。\n' +
      'CLI操作、Vim、テキスト処理、Shell Script、SSH、権限、systemd、cron / systemd timer、性能観測までを段階的に学習し、各フェーズごとに成果物を残した。',
    learningItems: [
      'Phase 1: CLI + Vim 基礎 / Phase 2: テキスト処理・ファイル操作 / Phase 3: シェルスクリプト',
      'Phase 4: サーバ運用（最低限） / Phase 5: ジョブ（cron / systemd timer） / Phase 6: 性能・監視',
      '使用環境・ツール: WSL2 / VirtualBox / Ubuntu Server / VS Code / TeraTerm / WinSCP',
    ],
    featured: false,
    updatedAt: '2026-03-22',
  },
  {
    slug: 'sql-postgresql-study',
    title: 'SQL / PostgreSQL - Study',
    summary:
      'PostgreSQL を使って SQL / データベースを体系的に学習した記録と成果物をまとめたリポジトリ。',
    status: 'DONE',
    kind: 'Hands-on',
    tech: ['SQL', 'PostgreSQL', 'Docker'],
    repoUrl: 'https://github.com/seiya-matsuoka/sql-postgresql-study',
    icons: [
      {
        name: 'PostgreSQL',
        src: 'icons/learning-repositories/postgresql-original-wordmark.svg',
      },
    ],
    description:
      'PostgreSQL を使って SQL / データベースを体系的に学習した記録と成果物をまとめたリポジトリ。\n' +
      'Docker でローカルに DB 環境を構築し、基礎的な SELECT から、JOIN、集約、ウィンドウ関数、DDL/DML、トランザクション、VIEW、関数・プロシージャ、トリガ、性能、運用の最低限までを一通り学習した。',
    learningItems: [
      '前半: SELECT / JOIN / 集約 / サブクエリ / CTE / ウィンドウ関数などの SQL',
      '中盤: DDL / 制約 / DML / トランザクション / VIEW / ストアド / トリガなど、DB の機能',
      '後半: 実行計画 / インデックス / クエリ改善 / 権限 / バックアップ / VACUUM / ANALYZE など、性能と運用の入口',
      '使用技術・環境: PostgreSQL / Docker / psql / DBeaver / Git Bash',
    ],
    featured: false,
    updatedAt: '2026-03-6',
  },
];
