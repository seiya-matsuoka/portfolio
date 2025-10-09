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
  thumb?: string; // /サムネイル画像（16:9） / 形式：images/projects/<slug>/thumb.webp
  updatedAt?: string;
};

// 暫定データ
export const projects: Project[] = [
  {
    slug: 'kanban-task-manager',
    title: 'Kanban Task Manager',
    summary: 'TODO：追記', // TODO：追記
    status: 'WIP',
    kind: 'Web App',
    tech: ['TypeScript', 'Next.js', 'Tailwind', 'DnD Kit', 'Prisma', 'Postgres'],
    repoUrl: 'https://github.com/seiya-matsuoka/kanban-task-manager',
    // liveUrl: 'https://...', // TODO：追記
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
  },
  {
    slug: 'json-diff-viewer',
    title: 'JSON Diff Viewer',
    summary: 'TODO：追記', // TODO：追記
    status: 'WIP',
    kind: 'Tool',
    tech: ['TypeScript', 'Next.js', 'Tailwind'],
    repoUrl: 'https://github.com/seiya-matsuoka/json-diff-viewer',
    // liveUrl: 'https://...', // TODO：追記
  },
  {
    slug: 'shape-trace-game',
    title: 'Shape Trace Game',
    summary: 'TODO：追記', // TODO：追記
    status: 'WIP',
    kind: 'Game',
    tech: ['TypeScript', 'Canvas', 'Vite', 'Tailwind'],
    repoUrl: 'https://github.com/seiya-matsuoka/shape-trace-game',
    liveUrl: 'https://seiya-matsuoka.github.io/shape-trace-game/',
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
  },

  {
    slug: 'color-picker-palette',
    title: 'Color Picker Palette',
    summary: 'HSL/HSV の調整・コントラスト表示つきのカラーパレット。',
    status: 'DONE',
    kind: 'Web App',
    tech: ['JavaScript', 'React', 'Vite'],
    repoUrl: 'https://github.com/seiya-matsuoka/color-picker-palette',
    liveUrl: 'https://seiya-matsuoka.github.io/color-picker-palette/',
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
  },
];
