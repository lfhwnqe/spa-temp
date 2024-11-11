// todoFilter.tsx
import React, { useCallback } from 'react';
import { useAtom } from 'jotai';
import { filterAtom } from './atoms';
import { FilterType } from './types';

interface FilterButtonProps {
  type: FilterType;
  currentFilter: FilterType;
  onClick: (type: FilterType) => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  type,
  currentFilter,
  onClick,
  children
}) => (
  <button
    onClick={() => onClick(type)}
    className={`px-3 py-1 rounded-lg ${
      currentFilter === type
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {children}
  </button>
);

const TodoFilter: React.FC = () => {
  const [filter, setFilter] = useAtom(filterAtom);

  const handleFilterChange = useCallback((newFilter: FilterType): void => {
    setFilter(newFilter);
  }, [setFilter]);

  return (
    <div className="flex justify-center gap-2 mb-4">
      <FilterButton
        type="all"
        currentFilter={filter}
        onClick={handleFilterChange}
      >
        All
      </FilterButton>
      <FilterButton
        type="active"
        currentFilter={filter}
        onClick={handleFilterChange}
      >
        Active
      </FilterButton>
      <FilterButton
        type="completed"
        currentFilter={filter}
        onClick={handleFilterChange}
      >
        Completed
      </FilterButton>
    </div>
  );
};

export default TodoFilter;