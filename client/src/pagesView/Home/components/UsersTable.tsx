import React from 'react';
import SortFilterHeaderCell from '@/pagesView/Home/components/SortFilterHeaderCell';
import { AGE, NAME } from '@/constants/constants';

interface UsersTable {
  data: {
    id: string;
    firstName: string;
    age: number;
  }[];
  handleSort: (field: string) => void;
  sortOrder: string;
  sortField: string;
  valueInput: { firstName: string; age: string };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const UsersTable = ({
  data,
  handleSort,
  sortOrder,
  sortField,
  handleInputChange,
  valueInput,
  loading,
}: UsersTable) => {
  const onSortClick = (e: React.MouseEvent, fieldName: string) => {
    if (e.target instanceof Element && e.target.nodeName === 'INPUT') {
      return;
    }
    handleSort(fieldName);
  };

  return (
    <table className="w-full max-w-[600px]">
      <thead>
        <tr className="border-b border-black p-4">
          <th className="w-14 text-start p-2.5">ID</th>
          <SortFilterHeaderCell
            value={valueInput?.firstName}
            onChange={handleInputChange}
            sortField={sortField}
            sortBy={NAME}
            sortOrder={sortOrder}
            onSortClick={onSortClick}
            placeholder="Name"
            id="firstName"
          />
          <SortFilterHeaderCell
            value={valueInput?.age}
            onChange={handleInputChange}
            sortField={sortField}
            sortBy={AGE}
            sortOrder={sortOrder}
            onSortClick={onSortClick}
            placeholder="Age"
            id="age"
          />
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={3} rowSpan={1} className="text-center p-20">
              Loading...
            </td>
          </tr>
        ) : (
          data?.map(({ id, firstName, age }) => (
            <tr className="w-full" key={id}>
              <td className="p-2.5">{id}</td>
              <td className="p-2.5">{firstName}</td>
              <td className="p-2.5">{age}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UsersTable;
