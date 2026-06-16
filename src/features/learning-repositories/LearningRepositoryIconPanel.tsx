import type { LearningRepositoryIcon } from '../../data/learningRepositories';
import { asset } from '../../lib/asset';

type Props = {
  icons: LearningRepositoryIcon[];
  title: string;
  variant?: 'card' | 'modal';
  className?: string;
  priority?: boolean;
};

export function LearningRepositoryIconPanel({
  icons,
  title,
  variant = 'card',
  className = '',
  priority = false,
}: Props) {
  const visibleIcons = icons.slice(0, 2);
  const isModal = variant === 'modal';

  const sizeClass = isModal
    ? visibleIcons.length <= 1
      ? 'h-24 w-24 md:h-28 md:w-28'
      : 'h-20 w-20 md:h-24 md:w-24'
    : visibleIcons.length <= 1
      ? 'h-20 w-20 md:h-24 md:w-24'
      : 'h-16 w-16 md:h-20 md:w-20';

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden ${className}`.trim()}
      style={{ background: 'var(--color-surface)' }}
      aria-label={`${title} technology icons`}
    >
      <div className="absolute inset-0 grid place-items-center">
        {visibleIcons.length > 0 ? (
          <div className="flex items-center justify-center gap-5 md:gap-7">
            {visibleIcons.map((icon) => (
              <div
                key={`${icon.name}-${icon.src}`}
                className="grid place-items-center rounded-2xl border p-4 shadow-sm"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-card)',
                }}
              >
                <img
                  src={asset(icon.src)}
                  alt={`${icon.name} icon`}
                  className={`${sizeClass} object-contain`.trim()}
                  loading={priority ? 'eager' : 'lazy'}
                  fetchPriority={priority ? 'high' : 'auto'}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-400">Icon</div>
        )}
      </div>
    </div>
  );
}
