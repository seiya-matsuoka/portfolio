type Props = {
  message: string;
};

export function EmptyState({ message }: Props) {
  return (
    <div
      className="rounded-md border p-6"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-surface)',
        color: 'var(--color-muted)',
      }}
    >
      {message}
    </div>
  );
}
