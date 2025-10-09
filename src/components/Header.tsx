export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--color-border,theme(colors.slate.200))] bg-[color:var(--color-surface,white)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="text-base font-semibold tracking-tight md:text-lg">
          Seiya Matsuoka
        </a>
        <nav className="flex items-center gap-3">
          <a
            href="mailto:seiya.matsuoka0413@gmail.com"
            className="text-sm underline decoration-transparent hover:decoration-current"
          >
            Email
          </a>
          <a
            href="https://github.com/seiya-matsuoka"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm underline decoration-transparent hover:decoration-current"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
