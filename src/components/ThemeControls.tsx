import { useEffect, useState } from 'react';
import type { Accent, ThemeMode } from '../lib/theme';
import {
  applyTheme,
  initThemeFromStorage,
  getStoredTheme,
  applyAccent,
  initAccentFromStorage,
  getStoredAccent,
} from '../lib/theme';

export function ThemeControls() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [accent, setAccent] = useState<Accent>('indigo');

  // 初期読み込み
  useEffect(() => {
    const disposeTheme = initThemeFromStorage();
    initAccentFromStorage();
    setTheme(getStoredTheme());
    setAccent(getStoredAccent());
    return () => {
      disposeTheme?.();
    };
  }, []);

  const onThemeChange = (next: ThemeMode) => {
    setTheme(next);
    applyTheme(next);
  };

  const onAccentChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const val = e.target.value as Accent;
    setAccent(val);
    applyAccent(val);
  };

  const btnBase =
    'rounded-md border px-2.5 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-[color:var(--color-ring)] outline-offset-2';
  const btnActive = 'border-transparent text-white';
  const btnIdle = 'border-[color:var(--color-border)] bg-white hover:border-slate-300';

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => onThemeChange('light')}
          aria-pressed={theme === 'light'}
          className={`${btnBase} ${theme === 'light' ? btnActive : btnIdle}`}
          style={{ backgroundColor: theme === 'light' ? 'var(--color-accent)' : 'white' }}
          title="Light"
        >
          Light
        </button>
        <button
          type="button"
          onClick={() => onThemeChange('dark')}
          aria-pressed={theme === 'dark'}
          className={`${btnBase} ${theme === 'dark' ? btnActive : btnIdle}`}
          style={{ backgroundColor: theme === 'dark' ? 'var(--color-accent)' : 'white' }}
          title="Dark"
        >
          Dark
        </button>
        <button
          type="button"
          onClick={() => onThemeChange('system')}
          aria-pressed={theme === 'system'}
          className={`${btnBase} ${theme === 'system' ? btnActive : btnIdle}`}
          style={{ backgroundColor: theme === 'system' ? 'var(--color-accent)' : 'white' }}
          title="System"
        >
          System
        </button>
      </div>

      {/* Accent select */}
      <label className="sr-only" htmlFor="accent-select">
        Accent
      </label>
      <select
        id="accent-select"
        value={accent}
        onChange={onAccentChange}
        className="rounded-md border border-[color:var(--color-border)] bg-white px-2 py-1.5 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
        title="Accent color"
      >
        <option value="indigo">Indigo</option>
        <option value="emerald">Emerald</option>
        <option value="rose">Rose</option>
      </select>
    </div>
  );
}
