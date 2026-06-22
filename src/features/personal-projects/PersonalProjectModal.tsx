import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { PersonalProject } from '../../data/personalProjects';
import { asset } from '../../lib/asset';
import { FaChevronLeft, FaChevronRight, FaPlayCircle } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';
import { LinkButton } from '../../components/common/LinkButton';
import { TagList } from '../../components/common/TagList';

type Props = {
  personalProject: PersonalProject;
  onClose: () => void;
};

export function PersonalProjectModal({ personalProject, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);

  // ギャラリー（thumb + images）
  const gallery = useMemo(() => {
    const arr: string[] = [];
    if (personalProject.thumb) arr.push(asset(personalProject.thumb)!);
    if (personalProject.images?.length) arr.push(...personalProject.images.map((p) => asset(p)!));
    return arr;
  }, [personalProject.thumb, personalProject.images]);

  const [idx, setIdx] = useState(0);
  const hasGallery = gallery.length > 0;

  useEffect(() => {
    setIdx(0);
  }, [personalProject.slug]);

  const go = (next: number) => {
    if (!hasGallery) return;
    const len = gallery.length;
    setIdx(((next % len) + len) % len);
  };
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  // スワイプ検出用
  const swipePointerIdRef = useRef<number | null>(null);
  const swipeStartXRef = useRef(0);
  const swipeStartYRef = useRef(0);
  const swipeActiveRef = useRef(false);
  const SWIPE_THRESHOLD = 40; // px

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType !== 'touch' || !hasGallery) return;
    swipePointerIdRef.current = e.pointerId;
    swipeStartXRef.current = e.clientX;
    swipeStartYRef.current = e.clientY;
    swipeActiveRef.current = false;
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (
      e.pointerType !== 'touch' ||
      swipePointerIdRef.current === null ||
      e.pointerId !== swipePointerIdRef.current
    ) {
      return;
    }

    const dx = e.clientX - swipeStartXRef.current;
    const dy = e.clientY - swipeStartYRef.current;

    // 縦横方向の強さによって判定する
    if (!swipeActiveRef.current) {
      // ほぼ動いていない場合はそのまま
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;

      // 横方向の動きが強い場合はスワイプ開始
      if (Math.abs(dx) > Math.abs(dy)) {
        swipeActiveRef.current = true;
        // 縦スクロールよりスワイプを優先する
        e.preventDefault();
      } else {
        // 縦方向の動きが強い場合はキャンセル
        swipePointerIdRef.current = null;
      }
    }
  };

  const finishSwipe = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      e.pointerType !== 'touch' ||
      swipePointerIdRef.current === null ||
      e.pointerId !== swipePointerIdRef.current
    ) {
      return;
    }

    const dx = e.clientX - swipeStartXRef.current;
    const dy = e.clientY - swipeStartYRef.current;

    if (swipeActiveRef.current && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    }

    swipePointerIdRef.current = null;
    swipeActiveRef.current = false;
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    finishSwipe(e);
  };

  const handlePointerCancel: React.PointerEventHandler<HTMLDivElement> = (e) => {
    finishSwipe(e);
  };

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

  const titleId = `personal-project-modal-title-${personalProject.slug}`;
  const descId = `personal-project-modal-desc-${personalProject.slug}`;
  const bodyText = personalProject.description ?? personalProject.summary;
  const tagItems = [personalProject.kind, ...personalProject.tech];

  return (
    <div
      onClick={onOverlayClick}
      className="modal-overlay fixed inset-x-0 top-0 z-50 grid place-items-center overflow-y-auto bg-black/50 backdrop-blur-sm"
      aria-labelledby={titleId}
      role="dialog"
      aria-modal="true"
      aria-describedby={descId}
    >
      <div
        ref={dialogRef}
        className="modal-dialog animate-in fade-in zoom-in-95 flex w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] shadow-lg duration-150 motion-reduce:transform-none motion-reduce:transition-none"
      >
        {/* ヘッダー */}
        <div className="flex shrink-0 items-center justify-between border-b border-[color:var(--color-border)] p-4">
          <h2
            id={titleId}
            className="text-lg font-semibold md:text-xl"
            style={{ color: 'var(--color-fg)' }}
          >
            {personalProject.title}
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
            aria-label="Personal project previews"
          >
            <div
              className="relative aspect-[16/9] w-full touch-pan-y"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              {hasGallery ? (
                gallery.map((src, i) => (
                  <img
                    key={`${src}-${i}`}
                    src={src}
                    alt={`${personalProject.title} preview ${i + 1}`}
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
                {/* 左ボタン */}
                <button
                  type="button"
                  onClick={prev}
                  className="group absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-md outline-offset-2 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-[color:var(--color-ring)] md:h-11 md:w-11"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-fg)',
                    opacity: 0.9,
                  }}
                  aria-label="前の画像"
                >
                  <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* 右ボタン */}
                <button
                  type="button"
                  onClick={next}
                  className="group absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-md outline-offset-2 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-[color:var(--color-ring)] md:h-11 md:w-11"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-fg)',
                    opacity: 0.9,
                  }}
                  aria-label="次の画像"
                >
                  <FaChevronRight className="h-5 w-5" aria-hidden="true" />
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
            {/* CTA */}
            <div className="flex items-center gap-2">
              {personalProject.liveUrl && (
                <LinkButton href={personalProject.liveUrl} variant="primary">
                  <FaPlayCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Demo</span>
                </LinkButton>
              )}
              <LinkButton href={personalProject.repoUrl}>
                <SiGithub className="h-4 w-4" aria-hidden="true" />
                <span>GitHub</span>
              </LinkButton>
            </div>

            {/* 概要 */}
            <p
              id={descId}
              className="text-sm leading-7 whitespace-pre-line md:text-base"
              style={{ color: 'var(--color-fg)' }}
            >
              {bodyText}
            </p>

            {/* 機能リスト */}
            {personalProject.features?.length ? (
              <div>
                <h3 className="mb-1 text-sm font-semibold" style={{ color: 'var(--color-fg)' }}>
                  主な機能
                </h3>
                <ul
                  className="list-disc space-y-1 pl-5 text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {personalProject.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* 技術タグ */}
            <TagList items={tagItems} className="gap-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
