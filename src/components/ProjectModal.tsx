import React, { useEffect, useLayoutEffect, useRef } from 'react';
import type { Project } from '../data/projects';

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);

  // フォーカス復帰元を保持
  useLayoutEffect(() => {
    lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null;
  }, []);

  // スクロールロック + 初期フォーカス
  useEffect(() => {
    scrollYRef.current = window.scrollY;
    const body = document.body;
    body.style.top = `-${scrollYRef.current}px`;
    body.style.position = 'fixed';
    body.style.width = '100%';
    closeBtnRef.current?.focus();

    return () => {
      const y = scrollYRef.current;
      const b = document.body;
      b.style.position = '';
      b.style.top = '';
      b.style.width = '';
      window.scrollTo(0, y);
      lastFocusedRef.current?.focus?.();
    };
  }, []);

  // ESCで閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // オーバーレイの外側クリックで閉じる
  const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const titleId = `proj-modal-title-${project.slug}`;

  return (
    <div
      onClick={onOverlayClick}
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
      aria-labelledby={titleId}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        className="animate-in fade-in zoom-in-95 w-full max-w-3xl rounded-xl border border-[color:var(--color-border,theme(colors.slate.200))] bg-white shadow-lg duration-150"
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b border-[color:var(--color-border,theme(colors.slate.200))] p-4">
          <h2 id={titleId} className="text-lg font-semibold md:text-xl">
            {project.title}
          </h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm hover:border-slate-300"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* メディア */}
        <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
          {project.thumb ? (
            <img
              src={project.thumb}
              alt={`${project.title} preview`}
              className="h-full w-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-sm text-slate-400">
              Preview
            </div>
          )}
        </div>

        {/* 本文 */}
        <div className="space-y-4 p-4">
          <p className="text-sm leading-7 text-slate-700 md:text-base">{project.summary}</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-700">
              {project.kind}
            </span>
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
              >
                Open App {/* 別候補：Live */}
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm hover:border-slate-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
