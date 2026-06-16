import { useEffect, useMemo, useRef, useState } from 'react';
import { EmptyState } from '../components/common/EmptyState';
import { SectionHeader } from '../components/common/SectionHeader';
import { learningRepositories } from '../data/learningRepositories';
import { LearningRepositoryCard } from '../features/learning-repositories/LearningRepositoryCard';
import { LearningRepositoryFilters } from '../features/learning-repositories/LearningRepositoryFilters';
import { LearningRepositoryModal } from '../features/learning-repositories/LearningRepositoryModal';
import type {
  LearningRepository,
  LearningRepositoryKind,
  LearningRepositoryStatus,
} from '../data/learningRepositories';

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

type StatusOption = 'ALL' | LearningRepositoryStatus;

// URL <-> 状態 のヘルパ
const STATUS_SET = new Set<StatusOption>(['ALL', 'DONE', 'WIP']);
const ALL_KINDS: LearningRepositoryKind[] = Array.from(
  new Set(learningRepositories.map((repo) => repo.kind))
);

function parseStatusFromURL(sp: URLSearchParams): StatusOption {
  const s = sp.get('status')?.toUpperCase() as StatusOption | undefined;
  return s && STATUS_SET.has(s) ? s : 'ALL';
}

function parseKindsFromURL(
  sp: URLSearchParams,
  validKinds: LearningRepositoryKind[]
): Set<LearningRepositoryKind> {
  const raw = sp.get('kind');
  if (!raw) return new Set();
  const want = raw.split(',').map((s) => s.trim());
  const filtered = want.filter((x): x is LearningRepositoryKind =>
    validKinds.includes(x as LearningRepositoryKind)
  );
  return new Set(filtered);
}

function equalSet<A>(a: Set<A>, b: Set<A>) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

export function LearningRepositoriesPage() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedLearningRepository = useMemo(
    () => learningRepositories.find((repo) => repo.slug === selectedSlug) ?? null,
    [selectedSlug]
  );
  const openedViaClickRef = useRef(false);
  const qp = useQueryParam('r');

  // フィルタ状態（URLから遅延初期化）
  const [status, setStatus] = useState<StatusOption>(() =>
    parseStatusFromURL(new URLSearchParams(window.location.search))
  );
  const [selectedKinds, setSelectedKinds] = useState<Set<LearningRepositoryKind>>(() =>
    parseKindsFromURL(new URLSearchParams(window.location.search), ALL_KINDS)
  );
  const kindOptions: LearningRepositoryKind[] = ALL_KINDS;

  const suppressSyncRef = useRef(false);

  // 起動時：?r を反映。戻る/進むはURL→状態に復元
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);

    // モーダル
    const r = sp.get('r');
    if (r && learningRepositories.some((repo) => repo.slug === r)) setSelectedSlug(r);

    const onPop = () => {
      const sp2 = new URLSearchParams(window.location.search);
      suppressSyncRef.current = true;

      // モーダル
      const val = sp2.get('r');
      if (val && learningRepositories.some((repo) => repo.slug === val)) setSelectedSlug(val);
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
  const toggleKind = (k: LearningRepositoryKind) => {
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
    const matchStatus = (repo: LearningRepository) =>
      status === 'ALL' ? true : repo.status === status;
    const matchKind = (repo: LearningRepository) =>
      selectedKinds.size === 0 ? true : selectedKinds.has(repo.kind);

    return learningRepositories.filter((repo) => matchStatus(repo) && matchKind(repo));
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
    <>
      <SectionHeader
        title="Learning Repositories"
        description="学習のために作成したリポジトリの一覧。"
      />

      {/* フィルタ */}
      <section className="mb-6">
        <LearningRepositoryFilters
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
      <section className="pb-16" aria-label="学習リポジトリ一覧">
        {sorted.length === 0 ? (
          <EmptyState message="条件に一致する項目がありません。" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {sorted.map((repo, i) => (
              <LearningRepositoryCard
                key={repo.slug}
                learningRepository={repo}
                onOpen={openModal}
                priority={i === 0}
              />
            ))}
          </div>
        )}
      </section>

      {/* モーダル */}
      {selectedLearningRepository && (
        <LearningRepositoryModal
          learningRepository={selectedLearningRepository}
          onClose={closeModal}
        />
      )}
    </>
  );
}
