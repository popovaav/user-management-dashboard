import React, { Dispatch, SetStateAction } from 'react';
import UsersTable from '@/pagesView/Home/components/UsersTable';
import Pagination from '@/pagesView/Home/components/Pagination';
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
  disabled: boolean;
  handleClearFilters: () => void;
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
  disabled,
  handleClearFilters,
}: HomeView) => (
  <div className="flex min-h-screen flex-col items-center justify-start p-24 relative">
    <div className="flex flex-col max-w-[600px] gap-y-10">
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-3xl">Users</h1>
        <button
          className="flex items-center text-sm aria-disabled:text-slate-400"
          onClick={handleClearFilters}
          disabled={disabled}
          aria-disabled={disabled}
        >
          Clear filters x
        </button>
      </div>
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
  </div>
);

export default HomeView;
