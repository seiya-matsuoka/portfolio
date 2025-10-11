import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '../data/projects';
import { asset } from '../lib/asset';

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);

  // ギャラリー（thumb + images）
  const gallery = useMemo(() => {
    const arr: string[] = [];
    if (project.thumb) arr.push(asset(project.thumb)!);
    if (project.images?.length) arr.push(...project.images.map((p) => asset(p)!));
    return arr;
  }, [project.thumb, project.images]);

  const [idx, setIdx] = useState(0);
  const hasGallery = gallery.length > 0;

  useEffect(() => {
    setIdx(0);
  }, [project.slug]);

  const go = (next: number) => {
    if (!hasGallery) return;
    const len = gallery.length;
    setIdx(((next % len) + len) % len);
  };
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  // プリロード
  useEffect(() => {
    if (!hasGallery) return;
    const preload = (i: number) => {
      const img = new Image();
      img.src = gallery[((i % gallery.length) + gallery.length) % gallery.length];
    };
    preload(idx + 1);
    preload(idx - 1);
  }, [idx, hasGallery, gallery]);

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

  // キー操作（ESC / Tab / ← →）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // オーバーレイの外側クリックで閉じる
  const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const titleId = `proj-modal-title-${project.slug}`;
  const bodyText = project.description ?? project.summary;

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

        {/* メディア：ギャラリー or プレースホルダー */}
        <div
          className="relative w-full overflow-hidden bg-slate-100"
          aria-roledescription="carousel"
          aria-label="Project previews"
        >
          <div className="relative aspect-[16/9] w-full">
            {hasGallery ? (
              gallery.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt={`${project.title} preview ${i + 1}`}
                  className={`absolute inset-0 h-full w-full object-cover ${
                    i === idx ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-200`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={i === idx ? 'high' : 'auto'}
                  sizes="(min-width: 768px) 768px, calc(100vw - 2rem)"
                  aria-hidden={i === idx ? 'false' : 'true'}
                />
              ))
            ) : (
              <div className="absolute inset-0 grid h-full w-full place-items-center text-sm text-slate-400">
                Preview
              </div>
            )}
          </div>

          {/* コントロール */}
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute top-1/2 left-2 -translate-y-1/2 rounded-md bg-white/80 px-2 py-1 text-sm shadow hover:bg-white"
                aria-label="前の画像"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-white/80 px-2 py-1 text-sm shadow hover:bg-white"
                aria-label="次の画像"
              >
                →
              </button>

              {/* ドットナビ */}
              <div className="pointer-events-none absolute inset-x-0 bottom-2 grid place-items-center">
                <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => go(i)}
                      className={`h-2.5 w-2.5 rounded-full ${
                        i === idx ? 'bg-slate-900' : 'bg-slate-400'
                      }`}
                      aria-label={`画像 ${i + 1} を表示`}
                      aria-current={i === idx ? 'true' : 'false'}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* 本文 */}
        <div className="space-y-4 p-4">
          {/* 概要 */}
          <p className="text-sm leading-7 whitespace-pre-line text-slate-700 md:text-base">
            {bodyText}
          </p>

          {/* 機能リスト */}
          {project.features?.length ? (
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-800">主要機能</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* 技術タグ */}
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

          {/* CTA */}
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
              >
                Open App
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
