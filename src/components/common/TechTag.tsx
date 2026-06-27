import { getTechnologyMeta } from '../../data/technologyMeta';
import { asset } from '../../lib/asset';

export type TechTagVariant = 'compact' | 'profile';

type Props = {
  name: string;
  variant?: TechTagVariant;
};

const variantClassMap: Record<TechTagVariant, { root: string; icon: string }> = {
  compact: {
    root: 'gap-1.5 rounded border px-1.5 py-0.5 text-[11px]',
    icon: 'h-3 w-3',
  },
  profile: {
    root: 'gap-2 rounded-md border px-2.5 py-1 text-sm font-medium',
    icon: 'h-4 w-4',
  },
};

export function TechTag({ name, variant = 'compact' }: Props) {
  const meta = getTechnologyMeta(name);
  const classes = variantClassMap[variant];

  return (
    <span
      className={`inline-flex items-center ${classes.root}`}
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-surface)',
        color: 'var(--color-fg)',
      }}
    >
      {meta.iconSrc ? (
        <img
          src={asset(meta.iconSrc)}
          alt=""
          className={`${classes.icon} shrink-0 object-contain`}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      ) : null}
      <span>{meta.label}</span>
    </span>
  );
}
