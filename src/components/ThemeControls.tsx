import { useEffect, useState } from 'react';
import type { ThemeMode } from '../lib/theme';
import { applyTheme, initThemeFromStorage, getStoredTheme } from '../lib/theme';

export function ThemeControls() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  // 初期読み込み
  useEffect(() => {
    const disposeTheme = initThemeFromStorage();
    setTheme(getStoredTheme());
    return () => {
      disposeTheme?.();
    };
  }, []);

  const onThemeChange = (next: ThemeMode) => {
    setTheme(next);
    applyTheme(next);
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
          title="Auto"
        >
          Auto
        </button>
      </div>
    </div>
  );
}
