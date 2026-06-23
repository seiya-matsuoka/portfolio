import { useEffect, useId, useRef, useState } from 'react';
import { FiCheck, FiMonitor, FiMoon, FiSun } from 'react-icons/fi';
import type { ThemeMode } from '../lib/theme';
import { applyTheme, DEFAULT_THEME_MODE, getStoredTheme, initThemeFromStorage } from '../lib/theme';

const themeOptions = [
  { value: 'light', label: 'Light', Icon: FiSun },
  { value: 'dark', label: 'Dark', Icon: FiMoon },
  { value: 'system', label: 'System', Icon: FiMonitor },
] satisfies { value: ThemeMode; label: string; Icon: typeof FiSun }[];

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ThemeControls({ isOpen, onOpenChange }: Props) {
  const [theme, setTheme] = useState<ThemeMode>(DEFAULT_THEME_MODE);
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

    const onDocumentClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onOpenChange]);

  const currentTheme =
    themeOptions.find((option) => option.value === theme) ??
    themeOptions.find((option) => option.value === DEFAULT_THEME_MODE) ??
    themeOptions[0];
  const CurrentThemeIcon = currentTheme.Icon;

  const onThemeSelect = (next: ThemeMode) => {
    setTheme(next);
    applyTheme(next);
    onOpenChange(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex h-9 w-9 touch-manipulation items-center justify-center rounded-md border text-sm outline-offset-2 transition hover:opacity-80 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
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
        onClick={() => onOpenChange(!isOpen)}
      >
        <CurrentThemeIcon className="pointer-events-none h-4 w-4" aria-hidden="true" />
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
                className="flex w-full touch-manipulation items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm outline-offset-2 transition hover:opacity-80 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
                style={{
                  color: isSelected ? 'var(--color-accent)' : 'var(--color-fg)',
                  background: isSelected
                    ? 'color-mix(in oklab, var(--color-accent), transparent 88%)'
                    : 'transparent',
                }}
                onClick={() => onThemeSelect(value)}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="pointer-events-none h-4 w-4" aria-hidden="true" />
                  {label}
                </span>
                {isSelected ? (
                  <FiCheck className="pointer-events-none h-4 w-4" aria-hidden="true" />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
