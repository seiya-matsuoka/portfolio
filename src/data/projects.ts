export type ProjectStatus = 'DONE' | 'WIP' | 'ARCHIVED';
export type ProjectKind = 'Game' | 'Web App' | 'Tool';

export type Project = {
  slug: string;
  title: string;
  summary: string; // 短い説明
  status: ProjectStatus;
  kind: ProjectKind;
  tech: string[];
  repoUrl: string; // GitHub
  liveUrl?: string; // デモURL
  thumb?: string; // /サムネイル画像（16:9（1200×675 or 1600×900）） / 形式：images/projects/<slug>/thumb.webp
  description?: string; //モーダル用の詳しい説明
  features?: string[]; //主な機能・要点
  images?: string[]; //追加スクショ（16:9（1200×675 or 1600×900）） / 形式：images/projects/<slug>/1.webp, 2.webp ...
  updatedAt?: string;
};

// 暫定データ
export const projects: Project[] = [
  {
    slug: 'tetromino-fall-game',
    title: 'Tetromino Fall Game',
    summary: 'TODO',
    status: 'WIP',
    kind: 'Game',
    tech: ['TypeScript', 'Vite', 'Tailwind'],
    repoUrl: 'https://github.com/seiya-matsuoka/tetromino-fall-game',
    liveUrl: 'https://seiya-matsuoka.github.io/tetromino-fall-game/',
    // thumb: 'images/projects/tetromino-fall-game/thumb.webp',
    description: 'TODO\n' + 'TODO',
    features: ['TODO', 'TODO'],
    // images: [
    // 'images/projects/tetromino-fall-game/01.webp',
    // 'images/projects/tetromino-fall-game/02.webp',
    // 'images/projects/tetromino-fall-game/03.webp',
    // ],
    updatedAt: '2025-10-28',
  },
  {
    slug: 'kanban-task-manager',
    title: 'Kanban Task Manager',
    summary: 'ボード / リスト / カード で構成されたシンプルなカンバンボード。',
    status: 'DONE',
    kind: 'Web App',
    tech: ['TypeScript', 'Next.js', 'Tailwind', 'Prisma', 'Postgres'],
    repoUrl: 'https://github.com/seiya-matsuoka/kanban-task-manager',
    liveUrl: 'https://kanban-task-manager-seiya.vercel.app/',
    thumb: 'images/projects/kanban-task-manager/thumb.webp',
    description:
      'ボード / リスト / カード で構成されたシンプルなカンバンボード。\n' +
      '認証なしで自由編集（CRUD操作 と並び替えが誰でも可能）にしています。',
    features: [
      'ボード一覧はカード型グリッド、詳細は横並びリスト＋カード',
      'リストの横方向並び替え、カードの縦方向並び替え＋他リストへの移動',
    ],
    images: [
      'images/projects/kanban-task-manager/01.webp',
      'images/projects/kanban-task-manager/02.webp',
      'images/projects/kanban-task-manager/03.webp',
    ],
    updatedAt: '2025-09-28',
  },
  {
    slug: 'quick-reaction-game',
    title: 'Quick Reaction Game',
    summary: 'まばたき、口の開き、タップで反応速度を計測できるリアクションゲーム。',
    status: 'DONE',
    kind: 'Game',
    tech: ['TypeScript', 'React', 'Vite', 'Tailwind'],
    repoUrl: 'https://github.com/seiya-matsuoka/quick-reaction-game',
    liveUrl: 'https://seiya-matsuoka.github.io/quick-reaction-game/',
    thumb: 'images/projects/quick-reaction-game/thumb.webp',
    description:
      'まばたき / 口の開き / タップ で反応速度を計測できるリアクションゲーム。\n' +
      '「合図」に素早く反応してタイムを計測します。',
    features: ['カメラ検知は まばたき / 口の開き に対応'],
    images: [
      'images/projects/quick-reaction-game/01.webp',
      'images/projects/quick-reaction-game/02.webp',
      'images/projects/quick-reaction-game/03.webp',
      'images/projects/quick-reaction-game/04.webp',
      'images/projects/quick-reaction-game/05.webp',
      'images/projects/quick-reaction-game/06.webp',
    ],
    updatedAt: '2025-10-07',
  },
  {
    slug: 'json-diff-viewer',
    title: 'JSON Diff Viewer',
    summary: 'ファイル／外部APIのJSONを左右で読み込み、ツリー形式の差分を可視化するツール。',
    status: 'DONE',
    kind: 'Tool',
    tech: ['TypeScript', 'Next.js', 'Tailwind'],
    repoUrl: 'https://github.com/seiya-matsuoka/json-diff-viewer',
    liveUrl: 'https://json-diff-viewer.vercel.app/',
    thumb: 'images/projects/json-diff-viewer/thumb.webp',
    description:
      'ファイル／外部APIのJSONを左右で読み込み、ツリー形式の差分を可視化するツール。\n' +
      'コピーや差分一覧のダウンロードも可能です。',
    features: ['ファイルインポート（.json） と、外部APIのURL取得が可能（アプリ内プロキシ経由）'],
    images: [
      'images/projects/json-diff-viewer/01.webp',
      'images/projects/json-diff-viewer/02.webp',
    ],
    updatedAt: '2025-09-25',
  },
  {
    slug: 'shape-trace-game',
    title: 'Shape Trace Game',
    summary: '指定した図形にどれだけ似せて描けるかを競うゲーム。',
    status: 'DONE',
    kind: 'Game',
    tech: ['TypeScript', 'Canvas', 'Vite', 'Tailwind'],
    repoUrl: 'https://github.com/seiya-matsuoka/shape-trace-game',
    liveUrl: 'https://seiya-matsuoka.github.io/shape-trace-game/',
    thumb: 'images/projects/shape-trace-game/thumb.webp',
    description:
      '指定図形（丸/三角/四角/星/五角形/ハート）を一筆書きでトレースするゲーム。\n' +
      'マウス／タッチで一筆書きし、終点で自動採点（%）します。',
    features: ['サイズ（大/小）、表示ガイド（手本/グリッド/十字）のON/OFFを切替可'],
    images: [
      'images/projects/shape-trace-game/01.webp',
      'images/projects/shape-trace-game/02.webp',
      'images/projects/shape-trace-game/03.webp',
    ],
    updatedAt: '2025-09-29',
  },
  {
    slug: 'total-match-game',
    title: 'Total Match Game',
    summary: 'グリッドからN 個の数字を選び、合計をターゲットに一致させるゲーム',
    status: 'DONE',
    kind: 'Game',
    tech: ['TypeScript', 'React', 'Vite', 'Tailwind'],
    repoUrl: 'https://github.com/seiya-matsuoka/total-match-game',
    liveUrl: 'https://seiya-matsuoka.github.io/total-match-game/',
    thumb: 'images/projects/total-match-game/thumb.webp',
    description:
      'グリッドから ちょうど N 個 の数字を選び、合計をターゲットに一致させるゲーム。\n' +
      'マウス/タップ・キーボードの両方に対応し、設定ごとにハイスコアを保存します。',
    features: [
      '3×3 / 4×4 / 5×5 の盤面と、3 / 4 / 5 の選択枚数に対応',
      '不正解時の動作を「問題継続 / 問題切替」から選択可',
    ],
    images: [
      'images/projects/total-match-game/01.webp',
      'images/projects/total-match-game/02.webp',
      'images/projects/total-match-game/03.webp',
      'images/projects/total-match-game/04.webp',
    ],
    updatedAt: '2025-10-05',
  },

  {
    slug: 'color-picker-palette',
    title: 'Color Picker Palette',
    summary: 'HSL/HSV の調整・コントラスト表示つきのカラーパレット。',
    status: 'DONE',
    kind: 'Tool',
    tech: ['JavaScript', 'React', 'Vite'],
    repoUrl: 'https://github.com/seiya-matsuoka/color-picker-palette',
    liveUrl: 'https://seiya-matsuoka.github.io/color-picker-palette/',
    thumb: 'images/projects/color-picker-palette/thumb.webp',
    description: 'HSL/HSV の調整・コントラスト表示つきのカラーパレット。',
    features: [
      'HEX 入力/コピー に対応、HSL/HSV スライダーで微調整',
      'パレットは お気に入り登録＆ドラッグ＆ドロップで並べ替え、localStorage に永続化',
    ],
    images: [
      'images/projects/color-picker-palette/01.webp',
      'images/projects/color-picker-palette/02.webp',
      'images/projects/color-picker-palette/03.webp',
    ],
    updatedAt: '2025-09-15',
  },
  {
    slug: 'reflex-tester-app',
    title: 'Reflex Tester App',
    summary: '反射神経（反応時間）を測定するシンプルな Web アプリです。',
    status: 'DONE',
    kind: 'Tool',
    tech: ['JavaScript (Vanilla)'],
    repoUrl: 'https://github.com/seiya-matsuoka/reflex-tester-app',
    liveUrl: 'https://seiya-matsuoka.github.io/reflex-tester-app/',
    thumb: 'images/projects/reflex-tester-app/thumb.webp',
    description:
      '反射神経（反応時間）を測定するシンプルな Web アプリ。\n' +
      '赤 → 緑 に変わったらできるだけ早くクリック／タップ。',
    features: ['待機中（赤） の押下はフライング扱い（再試行）', '依存なしの Vanilla JS 構成'],
    images: [
      'images/projects/reflex-tester-app/01.webp',
      'images/projects/reflex-tester-app/02.webp',
      'images/projects/reflex-tester-app/03.webp',
      'images/projects/reflex-tester-app/04.webp',
    ],
    updatedAt: '2025-09-14',
  },
];
