import { ListFilterPanel } from '../../components/common/ListFilterPanel';
import type { FilterOption } from '../../lib/filterOptions';

type Props = {
  totalCount: number;
  filteredCount: number;
  kindOptions: FilterOption[];
  selectedKindValues: Set<string>;
  techOptions: FilterOption[];
  selectedTechValues: Set<string>;
  onToggleKind: (value: string) => void;
  onToggleTech: (value: string) => void;
  onClear: () => void;
};

export function LearningRepositoryFilters({
  totalCount,
  filteredCount,
  kindOptions,
  selectedKindValues,
  techOptions,
  selectedTechValues,
  onToggleKind,
  onToggleTech,
  onClear,
}: Props) {
  return (
    <ListFilterPanel
      panelId="learning-repositories-filters-panel"
      itemLabel="learning repositories"
      totalCount={totalCount}
      filteredCount={filteredCount}
      kindOptions={kindOptions}
      selectedKindValues={selectedKindValues}
      techOptions={techOptions}
      selectedTechValues={selectedTechValues}
      onToggleKind={onToggleKind}
      onToggleTech={onToggleTech}
      onClear={onClear}
    />
  );
}
