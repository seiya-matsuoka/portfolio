export type ThemeMode = 'light' | 'dark' | 'system';
export type Accent = 'indigo' | 'emerald' | 'rose';

const THEME_KEY = 'theme-mode';
const ACCENT_KEY = 'theme-accent';

export function detectSystemTheme(): 'light' | 'dark' {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// 現在のモードを適用
export function applyTheme(mode: ThemeMode) {
  const body = document.body;
  body.classList.remove('theme-dark');
  const effective = mode === 'system' ? detectSystemTheme() : mode;
  if (effective === 'dark') body.classList.add('theme-dark');
  localStorage.setItem(THEME_KEY, mode);
}

// 初期化（保存値から適用 & system変化の監視）
export function initThemeFromStorage() {
  const stored = (localStorage.getItem(THEME_KEY) as ThemeMode) || 'light';
  applyTheme(stored);

  // system の場合のみ OS テーマ変化を追随
  if (stored === 'system' && window.matchMedia) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }
  return undefined;
}

export function getStoredTheme(): ThemeMode {
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || 'light';
}

// アクセント適用
export function applyAccent(accent: Accent) {
  const body = document.body;
  body.classList.remove('accent-emerald', 'accent-rose');
  if (accent === 'emerald') body.classList.add('accent-emerald');
  if (accent === 'rose') body.classList.add('accent-rose');
  localStorage.setItem(ACCENT_KEY, accent);
}

export function initAccentFromStorage() {
  const stored = (localStorage.getItem(ACCENT_KEY) as Accent) || 'indigo';
  applyAccent(stored);
}

export function getStoredAccent(): Accent {
  return (localStorage.getItem(ACCENT_KEY) as Accent) || 'indigo';
}
