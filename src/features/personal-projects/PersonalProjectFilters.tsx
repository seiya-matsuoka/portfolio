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

export function PersonalProjectFilters({
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
      panelId="personal-projects-filters-panel"
      itemLabel="personal projects"
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
