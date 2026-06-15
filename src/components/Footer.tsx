export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border,theme(colors.slate.200))] py-6 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} Seiya Matsuoka
    </footer>
  );
}
