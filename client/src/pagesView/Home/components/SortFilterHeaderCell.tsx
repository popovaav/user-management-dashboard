import { DESC } from '@/constants/constants';
import Arrow from '@/components/Icons/Arrow';
import React from 'react';

interface SortFilterHeaderCell {
  onSortClick: (e: React.MouseEvent, fieldName: string) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: string;
  sortField: string;
  sortBy: string;
  placeholder: string;
  id: string;
}

const SortFilterHeaderCell = ({
  onSortClick,
  value,
  onChange,
  sortBy,
  sortOrder,
  sortField,
  placeholder,
  id,
}: SortFilterHeaderCell) => (
  <th
    className="text-start p-2.5 min-w-[305px] capitalize cursor-pointer"
    onClick={(event) => onSortClick(event, sortBy)}
  >
    <div className="flex gap-x-3 items-center">
      <input
        placeholder={placeholder}
        id={id}
        className="h-10 border border-gray-200 rounded-lg p-2.5"
        value={value}
        onChange={onChange}
      />
      {sortOrder && sortField === sortBy && (
        <Arrow className={`${sortOrder === DESC ? 'rotate-180' : ''}`} />
      )}
    </div>
  </th>
);

export default SortFilterHeaderCell;
