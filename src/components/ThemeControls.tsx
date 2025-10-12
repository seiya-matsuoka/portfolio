import { useEffect, useState } from 'react';
import type { ThemeMode } from '../lib/theme';
import { applyTheme, initThemeFromStorage, getStoredTheme } from '../lib/theme';

export function ThemeControls() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  // 初期読み込み
  useEffect(() => {
    const disposeTheme = initThemeFromStorage();
    setTheme(getStoredTheme());
    return () => disposeTheme?.();
  }, []);

  const onThemeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const next = e.target.value as ThemeMode;
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div className="flex items-center gap-2">
      {/* <label htmlFor="theme-mode" className="text-sm" style={{ color: 'var(--color-muted)' }}>
        Theme
      </label> */}
      <select
        id="theme-mode"
        value={theme}
        onChange={onThemeChange}
        className="rounded-md border border-[color:var(--color-border)] bg-white px-2 py-1.5 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
        title="Theme mode"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">Auto</option>
      </select>
    </div>
  );
}
