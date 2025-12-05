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

// URL <-> 状態 のヘルパ
const STATUS_SET = new Set<StatusOption>(['ALL', 'DONE', 'WIP']);
const ALL_KINDS: ProjectKind[] = Array.from(new Set(all.map((p) => p.kind)));

function parseStatusFromURL(sp: URLSearchParams): StatusOption {
  const s = sp.get('status')?.toUpperCase() as StatusOption | undefined;
  return s && STATUS_SET.has(s) ? s : 'ALL';
}

function parseKindsFromURL(sp: URLSearchParams, validKinds: ProjectKind[]): Set<ProjectKind> {
  const raw = sp.get('kind');
  if (!raw) return new Set();
  const want = raw.split(',').map((s) => s.trim());
  const filtered = want.filter((x): x is ProjectKind => validKinds.includes(x as ProjectKind));
  return new Set(filtered);
}

function equalSet<A>(a: Set<A>, b: Set<A>) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

export default function App() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedProject = useMemo(
    () => all.find((p) => p.slug === selectedSlug) ?? null,
    [selectedSlug]
  );
  const openedViaClickRef = useRef(false);
  const qp = useQueryParam('p');

  // フィルタ状態（URLから遅延初期化）
  const [status, setStatus] = useState<StatusOption>(() =>
    parseStatusFromURL(new URLSearchParams(window.location.search))
  );
  const [selectedKinds, setSelectedKinds] = useState<Set<ProjectKind>>(() =>
    parseKindsFromURL(new URLSearchParams(window.location.search), ALL_KINDS)
  );
  const kindOptions: ProjectKind[] = ALL_KINDS;

  const suppressSyncRef = useRef(false);

  // 起動時：?p を反映。戻る/進むはURL→状態に復元
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);

    // モーダル
    const p = sp.get('p');
    if (p && all.some((x) => x.slug === p)) setSelectedSlug(p);

    const onPop = () => {
      const sp2 = new URLSearchParams(window.location.search);
      suppressSyncRef.current = true;

      // モーダル
      const val = sp2.get('p');
      if (val && all.some((x) => x.slug === val)) setSelectedSlug(val);
      else setSelectedSlug(null);

      // フィルタ
      setStatus(parseStatusFromURL(sp2));
      setSelectedKinds(parseKindsFromURL(sp2, ALL_KINDS));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // 状態 -> URL 同期
  useEffect(() => {
    if (suppressSyncRef.current) {
      suppressSyncRef.current = false;
      return;
    }

    const url = new URL(window.location.href);
    const sp = url.searchParams;

    const curStatus = parseStatusFromURL(sp);
    const curKinds = parseKindsFromURL(sp, ALL_KINDS);

    const statusChanged = curStatus !== status;
    const kindsChanged = !equalSet(curKinds, selectedKinds);

    if (!statusChanged && !kindsChanged) return; // 一致している

    if (status === 'ALL') sp.delete('status');
    else sp.set('status', status);

    if (selectedKinds.size === 0) sp.delete('kind');
    else sp.set('kind', Array.from(selectedKinds).join(','));

    url.search = sp.toString();
    window.history.pushState(null, '', url.toString());
  }, [status, selectedKinds]);

  // フィルタ操作
  const toggleKind = (k: ProjectKind) => {
    setSelectedKinds((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const resetKinds = () => setSelectedKinds(new Set());

  // モーダル操作
  const openModal = (slug: string) => {
    setSelectedSlug(slug);
    openedViaClickRef.current = true;
    qp.set(slug, 'push');
  };

  const closeModal = () => {
    if (openedViaClickRef.current) {
      openedViaClickRef.current = false;
      window.history.back();
    } else {
      qp.set(null, 'replace');
    }
    setSelectedSlug(null);
  };

  // フィルタ + ソート
  const filtered = useMemo(() => {
    const matchStatus = (p: Project) => (status === 'ALL' ? true : p.status === status);
    const matchKind = (p: Project) => (selectedKinds.size === 0 ? true : selectedKinds.has(p.kind));

    return all.filter((p) => matchStatus(p) && matchKind(p));
  }, [status, selectedKinds]);

  const sorted = useMemo(() => {
    const toTS = (s?: string) => (s ? new Date(s).getTime() : 0);

    return [...filtered].sort((a, b) => {
      // featured の有無でソート
      const aFeat = a.featured ? 1 : 0;
      const bFeat = b.featured ? 1 : 0;
      if (aFeat !== bFeat) {
        // featured === true が前に来る
        return bFeat - aFeat;
      }

      // 更新日降順
      const byDate = toTS(b.updatedAt) - toTS(a.updatedAt);
      if (byDate !== 0) return byDate;

      // タイトルの辞書順
      return a.title.localeCompare(b.title);
    });
  }, [filtered]);

  return (
    <div className="min-h-dvh bg-[color:var(--color-bg,theme(colors.slate.50))] text-[color:var(--color-fg,theme(colors.slate.800))]">
      <a
        href="#main"
        className="sr-only fixed top-3 left-3 z-[100] rounded border bg-[color:var(--color-surface)] px-3 py-2 text-sm focus:not-sr-only"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-fg)' }}
      >
        本文へスキップ
      </a>

      <Header />
      <main id="main" className="mx-auto max-w-6xl px-4" tabIndex={-1}>
        {/* ヒーロー */}
        <section className="py-10 md:py-14">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Personal Projects</h1>
          <p className="mt-3 max-w-2xl leading-7" style={{ color: 'var(--color-muted)' }}>
            学習目的の個人開発で作成した成果物の一覧。
            {/* <br />
            React / TypeScript / JavaScript を中心に学習中。 */}
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

        {/* ライブリージョン */}
        <div className="sr-only" role="status" aria-live="polite">
          {sorted.length}件に絞り込みました
        </div>

        {/* グリッド */}
        <section className="pb-16" aria-label="プロジェクト一覧">
          {sorted.length === 0 ? (
            <div
              className="rounded-md border p-6"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-muted)',
              }}
            >
              条件に一致する項目がありません。
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {sorted.map((p, i) => (
                <ProjectCard key={p.slug} project={p} onOpen={openModal} priority={i === 0} />
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
