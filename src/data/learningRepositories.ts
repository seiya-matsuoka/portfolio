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
export const learningRepositoriesUpdatedAt = '2026-06-21';

// 学習リポジトリデータ
export const learningRepositories: LearningRepository[] = [
  {
    slug: 'tree-heap-graph-java',
    title: 'Tree / Heap / Graph - Java',
    summary:
      '木・ヒープ・グラフの基礎のうち、木の基礎 / 二分木 / 二分探索木 / 木の走査 / ヒープ / PriorityQueue / グラフの基礎 / グラフの走査 を Java で学習するためのリポジトリ。',
    status: 'DONE',
    kind: 'Reading',
    tech: ['Java', 'Algorithm', 'Data Structure'],
    repoUrl: 'https://github.com/seiya-matsuoka/tree-heap-graph-java',
    icons: [
      {
        name: 'Java',
        src: 'icons/learning-repositories/java-original-wordmark.svg',
      },
    ],
    description:
      '木・ヒープ・グラフの基礎のうち、木の基礎 / 二分木 / 二分探索木 / 木の走査 / ヒープ / PriorityQueue / グラフの基礎 / グラフの走査 を Java で学習するためのリポジトリ。\n' +
      'コードを読み、実行し、出力を確認しながら、階層構造やネットワーク構造の持ち方とたどり方を段階的に理解することを目的とする。\n' +
      '各トピックごとにドキュメントを用意し、実装と対応づけながら見返せる形で整理している。',
    learningItems: [
      '木の基礎: ルート、親、子、葉、深さ、高さなど、木構造を読むための基本概念を確認する',
      '二分木 / 二分探索木: それぞれの違いを理解する',
      '木の走査: 前順 / 中順 / 後順走査と、木に対する DFS / BFS の違いを確認する',
      'ヒープ / PriorityQueue: それぞれの基本的な使い方を理解する',
      'グラフの基礎 / グラフの走査: グラフの基本構造と、DFS / BFS を使った到達可能性・連結性の確認方法を理解する',
    ],
    featured: false,
    updatedAt: '2026-5-3',
  },
  {
    slug: 'sorting-recursion-java',
    title: 'Sorting / Recursion - Java',
    summary:
      'ソートと再帰・分割統治の基礎のうち、バブルソート / 選択ソート / 挿入ソート / 再帰 / 分割統治 / マージソート / クイックソート / ヒープソート を Java で学習するためのリポジトリ。',
    status: 'DONE',
    kind: 'Reading',
    tech: ['Java', 'Algorithm', 'Data Structure'],
    repoUrl: 'https://github.com/seiya-matsuoka/sorting-recursion-java',
    icons: [
      {
        name: 'Java',
        src: 'icons/learning-repositories/java-original-wordmark.svg',
      },
    ],
    description:
      'ソートと再帰・分割統治の基礎のうち、バブルソート / 選択ソート / 挿入ソート / 再帰 / 分割統治 / マージソート / クイックソート / ヒープソート を Java で学習するためのリポジトリ。\n' +
      'コードを読み、実行し、出力を確認しながら、並び替えアルゴリズムの違いと、再帰的に問題を分けて解く考え方を段階的に理解することを目的とする。\n' +
      '各トピックごとにドキュメントを用意し、実装と対応づけながら見返せる形で整理している。',
    learningItems: [
      'バブルソート / 選択ソート / 挿入ソート: それぞれのソートの基本動作と違いを理解する',
      '再帰: ベースケースと再帰呼び出しを通して、自分自身を呼ぶ処理の流れを確認する',
      '分割統治: 問題を小さな部分問題へ分割し、それぞれを解いて最後に統合する考え方を確認する',
      'マージソート / クイックソート: それぞれのソートの流れと違いを確認する',
      'ヒープソート: 最大ヒープを作って最大値を末尾へ移しながら整列する流れを確認する',
    ],
    featured: false,
    updatedAt: '2026-5-1',
  },
  {
    slug: 'linear-search-hashing-java',
    title: 'Linear Search / Hashing - Java',
    summary:
      '線形データ構造と探索・ハッシュの基礎のうち、連結リスト / スタック / キュー / デック / 線形探索 / 二分探索 / ハッシュテーブル / Set / Map を Java で学習するためのリポジトリ。',
    status: 'DONE',
    kind: 'Reading',
    tech: ['Java', 'Algorithm', 'Data Structure'],
    repoUrl: 'https://github.com/seiya-matsuoka/linear-search-hashing-java',
    icons: [
      {
        name: 'Java',
        src: 'icons/learning-repositories/java-original-wordmark.svg',
      },
    ],
    description:
      '線形データ構造と探索・ハッシュの基礎のうち、連結リスト / スタック / キュー / デック / 線形探索 / 二分探索 / ハッシュテーブル / Set / Map を Java で学習するためのリポジトリ。\n' +
      'コードを読み、実行し、出力を確認しながら、データの持ち方と探索方法の違いを段階的に理解することを目的とする。\n' +
      '各トピックごとにドキュメントを用意し、実装と対応づけながら見返せる形で整理している。',
    learningItems: [
      '連結リスト: ノードを参照でつなぐ構造を通して、配列とは異なるデータの持ち方を確認する',
      'スタック / キュー / デック: それぞれの操作の違いを理解する',
      '線形探索 / 二分探索: 探索の流れと前提条件の違いを理解する',
      'ハッシュテーブル: ハッシュ値からバケット位置を求めて探索する考え方と、衝突時の処理を確認する',
      'Set / Map: 重複除去、存在判定、件数集計など、ハッシュベースの標準的な使い方を確認する',
    ],
    featured: false,
    updatedAt: '2026-4-26',
  },
  {
    slug: 'algorithm-foundations-java',
    title: 'Algorithm Foundations - Java',
    summary:
      'アルゴリズムとデータ構造の基礎のうち、走査・集計の基本 / 計算量 / 配列 / 文字列 を Java で学習するためのリポジトリ。',
    status: 'DONE',
    kind: 'Reading',
    tech: ['Java', 'Algorithm', 'Data Structure'],
    repoUrl: 'https://github.com/seiya-matsuoka/algorithm-foundations-java',
    icons: [
      {
        name: 'Java',
        src: 'icons/learning-repositories/java-original-wordmark.svg',
      },
    ],
    description:
      'アルゴリズムとデータ構造の基礎のうち、走査・集計の基本 / 計算量 / 配列 / 文字列 を Java で学習するためのリポジトリ。\n' +
      'コードを読み、実行し、出力を確認しながら、基礎概念を段階的に理解することを目的とする。\n' +
      '各トピックごとにドキュメントを用意し、実装と対応づけながら見返せる形で整理している。',
    learningItems: [
      '走査・集計の基本: 配列や文字列を先頭から順に見ていく考え方、合計・件数・最大値・最小値などの基本的な集計処理を扱う',
      '計算量: O(1)、O(n)、O(n²) の代表例を通して、処理量の増え方の違いを確認する',
      '配列: 要素の参照、更新、走査、集計など、配列を扱ううえでの基礎を確認する',
      '文字列: 文字列の走査、文字数の取得、対象文字の件数集計、部分文字列、不変性などを確認する',
    ],
    featured: false,
    updatedAt: '2026-4-19',
  },
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
