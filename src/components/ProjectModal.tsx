import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '../data/projects';
import { asset } from '../lib/asset';
import { SiGithub } from 'react-icons/si';
import { FaPlayCircle } from 'react-icons/fa';

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
  const descId = `proj-modal-desc-${project.slug}`;
  const bodyText = project.description ?? project.summary;

  return (
    <div
      onClick={onOverlayClick}
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
      aria-labelledby={titleId}
      role="dialog"
      aria-modal="true"
      aria-describedby={descId}
    >
      <div
        ref={dialogRef}
        className="animate-in fade-in zoom-in-95 flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] shadow-lg duration-150 motion-reduce:transform-none motion-reduce:transition-none"
      >
        {/* ヘッダー */}
        <div className="flex shrink-0 items-center justify-between border-b border-[color:var(--color-border)] p-4">
          <h2
            id={titleId}
            className="text-lg font-semibold md:text-xl"
            style={{ color: 'var(--color-fg)' }}
          >
            {project.title}
          </h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="rounded-md border px-2.5 py-1.5 text-sm outline-offset-2 hover:border-slate-300 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
            aria-label="Close"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-fg)',
            }}
          >
            ×
          </button>
        </div>

        {/* ギャラリー＋本文 */}
        <div className="min-h-0 flex-1 overflow-y-auto">
        {/* メディア：ギャラリー or プレースホルダー */}
        <div
          className="relative w-full overflow-hidden"
          style={{ background: 'var(--color-surface)' }}
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
                  } transition-opacity duration-200 motion-reduce:transition-none`}
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
                className="absolute top-1/2 left-2 -translate-y-1/2 rounded-md px-2 py-1 text-sm shadow"
                style={{ background: 'var(--color-surface)', opacity: 0.9 }}
                aria-label="前の画像"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md px-2 py-1 text-sm shadow"
                style={{ background: 'var(--color-surface)', opacity: 0.9 }}
                aria-label="次の画像"
              >
                →
              </button>

              {/* ドットナビ */}
              <div className="pointer-events-none absolute inset-x-0 bottom-2 grid place-items-center">
                <div
                  className="pointer-events-auto inline-flex items-center gap-1 rounded-full px-2 py-1"
                  style={{ background: 'var(--color-surface)', opacity: 0.9 }}
                >
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => go(i)}
                      className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background: i === idx ? 'var(--color-fg)' : 'var(--color-border)',
                        }}
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
          <p
            id={descId}
            className="text-sm leading-7 whitespace-pre-line md:text-base"
            style={{ color: 'var(--color-fg)' }}
          >
            {bodyText}
          </p>

          {/* 機能リスト */}
          {project.features?.length ? (
            <div>
              <h3 className="mb-1 text-sm font-semibold" style={{ color: 'var(--color-fg)' }}>
                主な機能
              </h3>
              <ul
                className="list-disc space-y-1 pl-5 text-sm"
                style={{ color: 'var(--color-muted)' }}
              >
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* 技術タグ */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded border px-1.5 py-0.5 text-[11px]"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-fg)',
              }}
            >
              {project.kind}
            </span>
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded border px-1.5 py-0.5 text-[11px]"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-fg)',
                }}
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
                className="inline-flex items-center gap-1.5 rounded-md border border-transparent px-3 py-1.5 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-contrast)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--color-accent)')
                }
              >
                <FaPlayCircle className="h-4 w-4" aria-hidden="true" />
                <span>Demo</span>
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-secondary inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
            >
              <SiGithub className="h-4 w-4" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
