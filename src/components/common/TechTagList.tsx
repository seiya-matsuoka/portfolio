import { TechTag, type TechTagVariant } from './TechTag';

type Props = {
  items: string[];
  maxVisible?: number;
  variant?: TechTagVariant;
  className?: string;
};

export function TechTagList({ items, maxVisible, variant = 'compact', className = '' }: Props) {
  const visibleItems = typeof maxVisible === 'number' ? items.slice(0, maxVisible) : items;
  const hiddenCount = typeof maxVisible === 'number' ? Math.max(items.length - maxVisible, 0) : 0;
  const hiddenCountClass = variant === 'profile' ? 'text-sm' : 'text-[11px]';

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`.trim()}>
      {visibleItems.map((item) => (
        <TechTag key={item} name={item} variant={variant} />
      ))}
      {hiddenCount > 0 && (
        <span className={hiddenCountClass} style={{ color: 'var(--color-muted)' }}>
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
