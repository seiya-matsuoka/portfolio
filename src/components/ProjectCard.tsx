import type { MouseEventHandler } from 'react';
import type { Project } from '../data/projects';
import { asset } from '../lib/asset';
import { SiGithub } from 'react-icons/si';
import { FaPlayCircle } from 'react-icons/fa';

type Props = {
  project: Project;
  onOpen: (slug: string) => void;
  priority?: boolean;
};

function StatusBadge({ status }: { status: Project['status'] }) {
  const map: Record<Project['status'], { color: string }> = {
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

export function ProjectCard({ project, onOpen, priority = false }: Props) {
  const handleOpen = () => onOpen(project.slug);

  const onCtaClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // モーダルと干渉させない
    e.stopPropagation();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <article
      onClick={handleOpen}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`「${project.title}」の詳細を開く`}
      className="group cursor-pointer rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-transform duration-150 hover:-translate-y-0.5"
    >
      {/* サムネ */}
      <div
        className="aspect-[16/9] w-full overflow-hidden rounded-t-lg"
        style={{ background: 'var(--color-surface)' }}
      >
        {project.thumb ? (
          <img
            src={asset(project.thumb)}
            alt={`${project.title} thumbnail`}
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
      </div>

      {/* 本文 */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3
            className="line-clamp-1 text-sm leading-tight font-semibold md:text-base"
            style={{ color: 'var(--color-fg)' }}
          >
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-[13px] leading-6" style={{ color: 'var(--color-muted)' }}>
          {project.summary}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
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
          {project.tech.slice(0, 4).map((t) => (
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
          {project.tech.length > 4 && (
            <span className="text-[11px] text-slate-500">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-1 flex items-center gap-2">
          {project.liveUrl && (
            <a
              onClick={onCtaClick}
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
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
            >
              <FaPlayCircle className="h-4 w-4" aria-hidden="true" />
              <span>Demo</span>
            </a>
          )}
          <a
            onClick={onCtaClick}
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
    </article>
  );
}
