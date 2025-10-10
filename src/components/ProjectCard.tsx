import type { MouseEventHandler } from 'react';
import type { Project } from '../data/projects';

type Props = {
  project: Project;
  onOpen: (slug: string) => void;
};

function StatusBadge({ status }: { status: Project['status'] }) {
  const map: Record<Project['status'], string> = {
    DONE: 'bg-green-50 text-green-700 border-green-200',
    WIP: 'bg-amber-50 text-amber-700 border-amber-200',
    ARCHIVED: 'bg-slate-50 text-slate-600 border-slate-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] ${map[status]}`}
    >
      {status}
    </span>
  );
}

export function ProjectCard({ project, onOpen }: Props) {
  const handleOpen = () => onOpen(project.slug);

  const onCtaClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // モーダルと干渉させない
    e.stopPropagation();
  };

  return (
    <article
      onClick={handleOpen}
      className="group cursor-pointer rounded-lg border border-[color:var(--color-border,theme(colors.slate.200))] bg-[color:var(--color-card,white)] shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-transform duration-150 hover:-translate-y-0.5"
    >
      {/* サムネ */}
      <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-slate-100">
        {project.thumb ? (
          <img
            src={project.thumb}
            alt={`${project.title} thumbnail`}
            className="h-full w-full object-cover"
            loading="lazy"
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
          <h3 className="line-clamp-1 text-sm leading-tight font-semibold md:text-base">
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>

        <p className="line-clamp-2 text-[13px] leading-6 text-slate-600">{project.summary}</p>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-700">
            {project.kind}
          </span>
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-700"
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
              className="rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
            >
              Open App {/* 別候補：Live */}
            </a>
          )}
          <a
            onClick={onCtaClick}
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm hover:border-slate-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
