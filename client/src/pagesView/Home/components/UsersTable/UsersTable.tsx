import { AGE, DESC, NAME } from '@/constants/constants';
import Arrow from '@/components/Icons/Arrow';

interface UsersTable {
  data: {
    id: string;
    firstName: string;
    age: number;
  }[];
  handleSort: (field: string) => void;
  sortOrder: string;
  sortField: string;
}

const UsersTable = ({ data, handleSort, sortOrder, sortField }: UsersTable) => (
  <table className="w-full max-w-[600px]">
    <thead>
      <tr className="border-b border-black p-4">
        <th className="w-14 text-start p-2.5">ID</th>
        <th
          className="text-start p-2.5 min-w-[305px] capitalize cursor-pointer"
          onClick={() => handleSort(NAME)}
        >
          <div className="flex gap-x-3 items-center">
            Name
            {sortOrder && sortField === NAME && (
              <Arrow className={`${sortOrder === DESC ? 'rotate-180' : ''}`} />
            )}
          </div>
        </th>
        <th
          className="text-start p-2.5 min-w-[240px] cursor-pointer"
          onClick={() => handleSort(AGE)}
        >
          <div className="flex gap-x-3 items-center">
            Age
            {sortOrder && sortField === AGE && (
              <Arrow className={`${sortOrder === DESC ? 'rotate-180' : ''}`} />
            )}
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {data?.map(({ id, firstName, age }) => (
        <tr className="w-full" key={id}>
          <td className="p-2.5">{id}</td>
          <td className="p-2.5">{firstName}</td>
          <td className="p-2.5">{age}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UsersTable;
