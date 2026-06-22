import { useEffect, useLayoutEffect, useRef } from 'react';
import { SiGithub } from 'react-icons/si';
import { LinkButton } from '../../components/common/LinkButton';
import { TagList } from '../../components/common/TagList';
import type { LearningRepository } from '../../data/learningRepositories';
import { LearningRepositoryIconPanel } from './LearningRepositoryIconPanel';

type Props = {
  learningRepository: LearningRepository;
  onClose: () => void;
};

export function LearningRepositoryModal({ learningRepository, onClose }: Props) {
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

  // キー操作（ESC / Tab）
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

  const titleId = `learning-repository-modal-title-${learningRepository.slug}`;
  const descId = `learning-repository-modal-desc-${learningRepository.slug}`;
  const bodyText = learningRepository.description ?? learningRepository.summary;
  const tagItems = [learningRepository.kind, ...learningRepository.tech];

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
            {learningRepository.title}
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

        {/* アイコン＋本文 */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* メディア：技術アイコン */}
          <LearningRepositoryIconPanel
            icons={learningRepository.icons}
            title={learningRepository.title}
            variant="modal"
          />

          {/* 本文 */}
          <div className="space-y-4 p-4">
            {/* CTA */}
            <div className="flex items-center gap-2">
              <LinkButton href={learningRepository.repoUrl}>
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

            {/* 学習内容 */}
            {learningRepository.learningItems?.length ? (
              <div>
                <h3 className="mb-1 text-sm font-semibold" style={{ color: 'var(--color-fg)' }}>
                  主な学習内容
                </h3>
                <ul
                  className="list-disc space-y-1 pl-5 text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {learningRepository.learningItems.map((item, i) => (
                    <li key={i}>{item}</li>
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
