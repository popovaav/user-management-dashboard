import { Dispatch, SetStateAction } from 'react';
import UsersTable from '@/pagesView/Home/components/UsersTable/UsersTable';
import Pagination from '@/pagesView/Home/components/UsersTable/Pagination';
import { IUsersData } from '@/hooks/use-fetch-users';
import { ITotalItemsData } from '@/hooks/use-get-total-items';

interface HomeView {
  page: number;
  first: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: IUsersData | undefined;
  handleSort: (field: string) => void;
  sortOrder: string;
  sortField: string;
  valueInput: { firstName: string; age: string };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  dataTotal: ITotalItemsData | undefined;
}

const HomeView = ({
  data,
  page,
  setPage,
  first,
  handleSort,
  sortOrder,
  sortField,
  valueInput,
  handleInputChange,
  loading,
  dataTotal,
}: HomeView) => (
  <div className="flex min-h-screen flex-col items-center justify-start p-24 gap-y-10 relative">
    <h1 className="font-bold text-3xl">Users</h1>
    <UsersTable
      data={data?.users ?? []}
      handleSort={handleSort}
      sortField={sortField}
      sortOrder={sortOrder}
      valueInput={valueInput}
      handleInputChange={handleInputChange}
      loading={loading}
    />
    <Pagination
      page={page}
      setPage={setPage}
      totalItems={dataTotal?.totalItems?.total ?? 0}
      itemsPerPage={first}
    />
  </div>
);

export default HomeView;
