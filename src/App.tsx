import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { Filters } from './components/Filters';
import { projects as all } from './data/projects';
import type { Project, ProjectKind, ProjectStatus } from './data/projects';

function useQueryParam(name: string) {
  const get = () => new URLSearchParams(window.location.search).get(name);
  const set = (value: string | null, mode: 'push' | 'replace' = 'push') => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    if (value === null) params.delete(name);
    else params.set(name, value);
    url.search = params.toString();
    if (mode === 'push') window.history.pushState(null, '', url.toString());
    else window.history.replaceState(null, '', url.toString());
  };
  return { get, set };
}

type StatusOption = 'ALL' | ProjectStatus;

export default function App() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedProject = useMemo(
    () => all.find((p) => p.slug === selectedSlug) ?? null,
    [selectedSlug]
  );
  const openedViaClickRef = useRef(false);
  const qp = useQueryParam('p');

  useEffect(() => {
    const p = qp.get();
    if (p && all.some((x) => x.slug === p)) setSelectedSlug(p);
    const onPop = () => {
      const val = qp.get();
      if (val && all.some((x) => x.slug === val)) setSelectedSlug(val);
      else setSelectedSlug(null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (slug: string) => {
    setSelectedSlug(slug);
    openedViaClickRef.current = true;
    qp.set(slug, 'push'); // 戻るで閉じられる
  };

  const closeModal = () => {
    if (openedViaClickRef.current) {
      openedViaClickRef.current = false;
      window.history.back(); // 直前のURLに戻して閉じる
    } else {
      // 初期URLに?pがある
      qp.set(null, 'replace'); // p を消して一覧に戻す
    }
    setSelectedSlug(null);
  };

  // ===== フィルタ状態 =====
  const [status, setStatus] = useState<StatusOption>('ALL');
  const [selectedKinds, setSelectedKinds] = useState<Set<ProjectKind>>(new Set());

  const kindOptions: ProjectKind[] = useMemo(() => Array.from(new Set(all.map((p) => p.kind))), []);

  const toggleKind = (k: ProjectKind) => {
    setSelectedKinds((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };
  const resetKinds = () => setSelectedKinds(new Set());

  // ===== フィルタ + ソート =====
  const filtered = useMemo(() => {
    const matchStatus = (p: Project) => (status === 'ALL' ? true : p.status === status);
    const matchKind = (p: Project) => (selectedKinds.size === 0 ? true : selectedKinds.has(p.kind));

    return all.filter((p) => matchStatus(p) && matchKind(p));
  }, [status, selectedKinds]);

  const sorted = useMemo(() => {
    const toTS = (s?: string) => (s ? new Date(s).getTime() : 0);
    return [...filtered].sort((a, b) => {
      const byDate = toTS(b.updatedAt) - toTS(a.updatedAt);
      if (byDate !== 0) return byDate;
      return a.title.localeCompare(b.title);
    });
  }, [filtered]);

  return (
    <div className="min-h-dvh bg-[color:var(--color-bg,theme(colors.slate.50))] text-[color:var(--color-fg,theme(colors.slate.800))]">
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        {/* ヒーロー */}
        <section className="py-10 md:py-14">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Personal Projects</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            一言文章(候補：個人開発で作った小さなゲームとWebアプリの一覧です。)
          </p>
        </section>

        {/* フィルタ */}
        <section className="mb-6">
          <Filters
            status={status}
            onChangeStatus={setStatus}
            kindOptions={kindOptions}
            selectedKinds={selectedKinds}
            onToggleKind={toggleKind}
            onResetKinds={resetKinds}
          />
        </section>

        {/* グリッド */}
        <section className="pb-16">
          {sorted.length === 0 ? (
            <div className="rounded-md border border-slate-200 bg-white p-6 text-slate-500">
              条件に一致する項目がありません。
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {sorted.map((p) => (
                <ProjectCard key={p.slug} project={p} onOpen={openModal} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* モーダル */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}

      <footer className="border-t border-[color:var(--color-border,theme(colors.slate.200))] py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Seiya Matsuoka
      </footer>
    </div>
  );
}
