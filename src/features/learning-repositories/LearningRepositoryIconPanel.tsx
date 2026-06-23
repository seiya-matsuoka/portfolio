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
  const isSingleIcon = visibleIcons.length <= 1;

  const iconImageClass = isModal
    ? isSingleIcon
      ? 'h-28 w-28 sm:h-36 sm:w-36'
      : 'h-28 w-28'
    : isSingleIcon
      ? 'h-28 w-28'
      : 'h-24 w-24';

  const iconTileClass = isModal
    ? isSingleIcon
      ? 'rounded-3xl p-5 sm:p-7'
      : 'rounded-3xl p-5'
    : isSingleIcon
      ? 'rounded-2xl p-6'
      : 'rounded-2xl p-5';

  const iconGapClass = isModal ? 'gap-6 sm:gap-8' : 'gap-5 sm:gap-7';

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden ${className}`.trim()}
      style={{ background: 'var(--learning-icon-panel-bg)' }}
      aria-label={`${title} technology icons`}
    >
      <div className="absolute inset-0 grid place-items-center">
        {visibleIcons.length > 0 ? (
          <div
            className={`flex max-w-full flex-nowrap items-center justify-center ${iconGapClass}`}
          >
            {visibleIcons.map((icon) => (
              <div
                key={`${icon.name}-${icon.src}`}
                className={`grid shrink-0 place-items-center border shadow-sm ${iconTileClass}`}
                style={{
                  borderColor: 'var(--learning-icon-tile-border)',
                  background: 'var(--learning-icon-tile-bg)',
                  boxShadow: 'var(--learning-icon-tile-shadow)',
                }}
              >
                <img
                  src={asset(icon.src)}
                  alt={`${icon.name} icon`}
                  className={`${iconImageClass} object-contain`.trim()}
                  loading={priority ? 'eager' : 'lazy'}
                  fetchPriority={priority ? 'high' : 'auto'}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Icon
          </div>
        )}
      </div>
    </div>
  );
}
