import { useEffect, useMemo, useRef, useState } from 'react';
import { EmptyState } from '../components/common/EmptyState';
import { SectionHeader } from '../components/common/SectionHeader';
import { learningRepositories, learningRepositoriesUpdatedAt } from '../data/learningRepositories';
import { LearningRepositoryCard } from '../features/learning-repositories/LearningRepositoryCard';
import { LearningRepositoryFilters } from '../features/learning-repositories/LearningRepositoryFilters';
import { LearningRepositoryModal } from '../features/learning-repositories/LearningRepositoryModal';
import {
  createFilterOptions,
  equalSet,
  readSelectedSearchParamValues,
  toFilterValue,
  writeSelectedSearchParamValues,
} from '../lib/filterOptions';
import { createTechnologyFilterOptions } from '../lib/technologyFilterOptions';
import type { LearningRepository } from '../data/learningRepositories';

function useQueryParam(name: string) {
  const set = (value: string | null, mode: 'push' | 'replace' = 'push') => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    if (value === null) params.delete(name);
    else params.set(name, value);
    url.search = params.toString();
    if (mode === 'push') window.history.pushState(null, '', url.toString());
    else window.history.replaceState(null, '', url.toString());
  };
  return { set };
}

const KIND_OPTIONS = createFilterOptions(learningRepositories.map((repo) => repo.kind));
const TECH_OPTIONS = createTechnologyFilterOptions(
  learningRepositories.flatMap((repo) => repo.tech)
);

function parseKindsFromURL(searchParams: URLSearchParams) {
  return readSelectedSearchParamValues(searchParams, 'kind', KIND_OPTIONS);
}

function parseTechsFromURL(searchParams: URLSearchParams) {
  return readSelectedSearchParamValues(searchParams, 'tech', TECH_OPTIONS);
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
  const [selectedKindValues, setSelectedKindValues] = useState<Set<string>>(() =>
    parseKindsFromURL(new URLSearchParams(window.location.search))
  );
  const [selectedTechValues, setSelectedTechValues] = useState<Set<string>>(() =>
    parseTechsFromURL(new URLSearchParams(window.location.search))
  );

  // 起動時：?r を反映。戻る/進むはURL→状態に復元
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);

    // モーダル
    const r = sp.get('r');
    if (r && learningRepositories.some((repo) => repo.slug === r)) setSelectedSlug(r);

    const onPop = () => {
      const sp2 = new URLSearchParams(window.location.search);

      // モーダル
      const val = sp2.get('r');
      if (val && learningRepositories.some((repo) => repo.slug === val)) setSelectedSlug(val);
      else setSelectedSlug(null);

      // フィルタ
      setSelectedKindValues(parseKindsFromURL(sp2));
      setSelectedTechValues(parseTechsFromURL(sp2));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // 状態 -> URL 同期
  useEffect(() => {
    const url = new URL(window.location.href);
    const sp = url.searchParams;

    const curKinds = parseKindsFromURL(sp);
    const curTechs = parseTechsFromURL(sp);

    const kindsChanged = !equalSet(curKinds, selectedKindValues);
    const techsChanged = !equalSet(curTechs, selectedTechValues);
    const hasLegacyStatusFilter = sp.has('status');

    if (!kindsChanged && !techsChanged && !hasLegacyStatusFilter) return;

    writeSelectedSearchParamValues(sp, 'kind', selectedKindValues, KIND_OPTIONS);
    writeSelectedSearchParamValues(sp, 'tech', selectedTechValues, TECH_OPTIONS);
    sp.delete('status');

    url.search = sp.toString();
    window.history.pushState(null, '', url.toString());
  }, [selectedKindValues, selectedTechValues]);

  // フィルタ操作
  const toggleKind = (value: string) => {
    setSelectedKindValues((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const toggleTech = (value: string) => {
    setSelectedTechValues((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedKindValues(new Set());
    setSelectedTechValues(new Set());
  };

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
    const matchKind = (repo: LearningRepository) =>
      selectedKindValues.size === 0 ? true : selectedKindValues.has(toFilterValue(repo.kind));
    const matchTech = (repo: LearningRepository) =>
      selectedTechValues.size === 0
        ? true
        : repo.tech.some((tech) => selectedTechValues.has(toFilterValue(tech)));

    return learningRepositories.filter((repo) => matchKind(repo) && matchTech(repo));
  }, [selectedKindValues, selectedTechValues]);

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
        description="学習に使用したリポジトリの一覧"
        lastUpdated={learningRepositoriesUpdatedAt}
      />

      {/* フィルタ */}
      <section className="mb-6">
        <LearningRepositoryFilters
          totalCount={learningRepositories.length}
          filteredCount={sorted.length}
          kindOptions={KIND_OPTIONS}
          selectedKindValues={selectedKindValues}
          techOptions={TECH_OPTIONS}
          selectedTechValues={selectedTechValues}
          onToggleKind={toggleKind}
          onToggleTech={toggleTech}
          onClear={clearFilters}
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
            {sorted.map((repo, index) => (
              <LearningRepositoryCard
                key={repo.slug}
                learningRepository={repo}
                onOpen={openModal}
                priority={index === 0}
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
