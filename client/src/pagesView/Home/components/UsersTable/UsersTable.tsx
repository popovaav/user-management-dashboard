import { AGE, DESC, NAME } from '@/constants/constants';
import Arrow from '@/components/Icons/Arrow';
import React from 'react';

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
          <th
            className="text-start p-2.5 min-w-[305px] capitalize cursor-pointer group-hover"
            onClick={(event) => onSortClick(event, NAME)}
          >
            <div className="flex gap-x-3 items-center">
              <input
                placeholder="Name"
                id="firstName"
                className="h-10 border border-gray-200 rounded-lg p-2.5"
                value={valueInput?.firstName}
                onChange={handleInputChange}
              />
              <Arrow
                className={`${
                  sortOrder === DESC
                    ? 'rotate-180 hidden group-hover:visible'
                    : 'hidden group-hover:visible'
                }`}
              />
              {sortOrder && sortField === NAME && (
                <Arrow
                  className={`${sortOrder === DESC ? 'rotate-180' : ''}`}
                />
              )}
            </div>
          </th>
          <th
            className="text-start p-2.5 min-w-[305px] cursor-pointer"
            onClick={(event) => onSortClick(event, AGE)}
          >
            <div className="flex gap-x-3 items-center">
              <input
                placeholder="Age"
                id="age"
                className="h-10 border border-gray-200 rounded-lg p-2.5"
                value={valueInput?.age}
                onChange={handleInputChange}
              />
              {sortOrder && sortField === AGE && (
                <Arrow
                  className={`${sortOrder === DESC ? 'rotate-180' : ''}`}
                />
              )}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={3} rowSpan={1} className="text-center">
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
