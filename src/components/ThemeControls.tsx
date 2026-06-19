import { useEffect, useId, useRef, useState } from 'react';
import { FiCheck, FiMonitor, FiMoon, FiSun } from 'react-icons/fi';
import type { ThemeMode } from '../lib/theme';
import { applyTheme, getStoredTheme, initThemeFromStorage } from '../lib/theme';

const themeOptions = [
  { value: 'light', label: 'Light', Icon: FiSun },
  { value: 'dark', label: 'Dark', Icon: FiMoon },
  { value: 'system', label: 'System', Icon: FiMonitor },
] satisfies { value: ThemeMode; label: string; Icon: typeof FiSun }[];

export function ThemeControls() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // 初期読み込み
  useEffect(() => {
    const disposeTheme = initThemeFromStorage();
    setTheme(getStoredTheme());
    return () => disposeTheme?.();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const currentTheme = themeOptions.find((option) => option.value === theme) ?? themeOptions[0];
  const CurrentThemeIcon = currentTheme.Icon;

  const onThemeSelect = (next: ThemeMode) => {
    setTheme(next);
    applyTheme(next);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm outline-offset-2 transition hover:opacity-80 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
        style={{
          borderColor: 'var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-fg)',
        }}
        aria-label={`テーマを切り替える（現在: ${currentTheme.label}）`}
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title="Theme mode"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CurrentThemeIcon className="h-4 w-4" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-20 mt-2 min-w-36 rounded-lg border p-1 shadow-lg"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-fg)',
          }}
        >
          {themeOptions.map(({ value, label, Icon }) => {
            const isSelected = value === theme;

            return (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm outline-offset-2 transition hover:opacity-80 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
                style={{
                  color: isSelected ? 'var(--color-accent)' : 'var(--color-fg)',
                  background: isSelected
                    ? 'color-mix(in oklab, var(--color-accent), transparent 88%)'
                    : 'transparent',
                }}
                onClick={() => onThemeSelect(value)}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </span>
                {isSelected ? <FiCheck className="h-4 w-4" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
