import type { KeyboardEventHandler, MouseEventHandler } from 'react';
import { SiGithub } from 'react-icons/si';
import { LinkButton } from '../../components/common/LinkButton';
import { KindBadge } from '../../components/common/KindBadge';
import { TechTagList } from '../../components/common/TechTagList';
import type { LearningRepository } from '../../data/learningRepositories';
import { LearningRepositoryIconPanel } from './LearningRepositoryIconPanel';

type Props = {
  learningRepository: LearningRepository;
  onOpen: (slug: string) => void;
  priority?: boolean;
};

function StatusBadge({ status }: { status: LearningRepository['status'] }) {
  const map: Record<LearningRepository['status'], { color: string }> = {
    DONE: { color: 'var(--status-done-fg)' },
    WIP: { color: 'var(--status-wip-fg)' },
  };
  return (
    <span
      className="inline-flex items-center rounded-md border px-2 py-0.5 text-[11px]"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-surface)',
        color: map[status].color,
      }}
    >
      {status}
    </span>
  );
}

export function LearningRepositoryCard({ learningRepository, onOpen, priority = false }: Props) {
  const handleOpen = () => onOpen(learningRepository.slug);

  const onCtaClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // モーダルと干渉させない
    e.stopPropagation();
  };

  const onKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  const isFeatured = learningRepository.featured === true;

  const baseClass = 'group cursor-pointer rounded-lg border transition-transform duration-150';

  const featuredClass =
    'border-[color:var(--featured-card-border)] bg-[color:var(--featured-card-bg)] shadow-md hover:-translate-y-1 hover:shadow-lg';

  const normalClass =
    'border-[color:var(--color-border)] bg-[color:var(--color-card)] shadow-[0_1px_0_0_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:shadow-md';

  const articleClass = `${baseClass} ${isFeatured ? featuredClass : normalClass}`;

  return (
    <article
      onClick={handleOpen}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`「${learningRepository.title}」の詳細を開く`}
      className={articleClass}
    >
      {/* アイコン */}
      <div className="relative">
        <LearningRepositoryIconPanel
          icons={learningRepository.icons}
          title={learningRepository.title}
          className="rounded-t-lg"
          priority={priority}
        />

        {learningRepository.featured && (
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
              style={{
                backgroundColor: 'var(--featured-badge-bg)',
                color: 'var(--featured-badge-fg)',
              }}
            >
              Featured
            </span>
          </div>
        )}
      </div>

      {/* 本文 */}
      <div className="flex flex-col gap-3 p-4">
        <h3
          className="line-clamp-1 text-sm leading-tight font-semibold md:text-base"
          style={{ color: 'var(--color-fg)' }}
        >
          {learningRepository.title}
        </h3>

        <p className="text-[13px] leading-6" style={{ color: 'var(--color-muted)' }}>
          {learningRepository.summary}
        </p>

        <TechTagList items={learningRepository.tech} maxVisible={4} />

        {/* CTA / Meta */}
        <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
          <div className="flex items-center gap-2">
            <LinkButton href={learningRepository.repoUrl} onClick={onCtaClick}>
              <SiGithub className="h-4 w-4" aria-hidden="true" />
              <span>GitHub</span>
            </LinkButton>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 self-end">
            <KindBadge>{learningRepository.kind}</KindBadge>
            <StatusBadge status={learningRepository.status} />
          </div>
        </div>
      </div>
    </article>
  );
}
