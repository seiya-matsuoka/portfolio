import type { KeyboardEventHandler, MouseEventHandler } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';
import { LinkButton } from '../../components/common/LinkButton';
import { KindBadge } from '../../components/common/KindBadge';
import { TechTagList } from '../../components/common/TechTagList';
import type { PersonalProject } from '../../data/personalProjects';
import { asset } from '../../lib/asset';

type Props = {
  personalProject: PersonalProject;
  onOpen: (slug: string) => void;
  priority?: boolean;
};

function StatusBadge({ status }: { status: PersonalProject['status'] }) {
  const map: Record<PersonalProject['status'], { color: string }> = {
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

export function PersonalProjectCard({ personalProject, onOpen, priority = false }: Props) {
  const handleOpen = () => onOpen(personalProject.slug);

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

  const isFeatured = personalProject.featured === true;

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
      aria-label={`「${personalProject.title}」の詳細を開く`}
      className={articleClass}
    >
      {/* サムネ */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg"
        style={{ background: 'var(--color-surface)' }}
      >
        {personalProject.thumb ? (
          <img
            src={asset(personalProject.thumb)}
            alt={`${personalProject.title} thumbnail`}
            className="h-full w-full object-cover"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-xs text-slate-400">
            No Image
          </div>
        )}

        {personalProject.featured && (
          <span
            className="absolute top-3 left-3 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
            style={{
              backgroundColor: 'var(--featured-badge-bg)',
              color: 'var(--featured-badge-fg)',
            }}
          >
            Featured
          </span>
        )}
      </div>

      {/* 本文 */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3
              className="line-clamp-1 text-sm leading-tight font-semibold md:text-base"
              style={{ color: 'var(--color-fg)' }}
            >
              {personalProject.title}
            </h3>
          </div>

          <StatusBadge status={personalProject.status} />
        </div>

        <p className="text-[13px] leading-6" style={{ color: 'var(--color-muted)' }}>
          {personalProject.summary}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          <KindBadge>{personalProject.kind}</KindBadge>
          <TechTagList items={personalProject.tech} maxVisible={5} />
        </div>

        {/* CTA */}
        <div className="mt-1 flex items-center gap-2">
          {personalProject.liveUrl && (
            <LinkButton href={personalProject.liveUrl} variant="primary" onClick={onCtaClick}>
              <FaPlayCircle className="h-4 w-4" aria-hidden="true" />
              <span>Demo</span>
            </LinkButton>
          )}
          <LinkButton href={personalProject.repoUrl} onClick={onCtaClick}>
            <SiGithub className="h-4 w-4" aria-hidden="true" />
            <span>GitHub</span>
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
