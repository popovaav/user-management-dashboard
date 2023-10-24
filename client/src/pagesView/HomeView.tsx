import { Dispatch, SetStateAction } from 'react';
import UsersTable from '@/pagesView/Home/components/UsersTable/UsersTable';
import Pagination from '@/pagesView/Home/components/UsersTable/Pagination';
import { IUsersData } from '@/hooks/use-fetch-users';

interface HomeView {
  page: number;
  first: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: IUsersData | undefined;
}

const HomeView = ({ data, page, setPage, first }: HomeView) => (
  <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-y-10">
    <h1 className="font-bold text-3xl">Users</h1>
    <UsersTable data={data?.users ?? []} />
    <Pagination
      page={page}
      setPage={setPage}
      totalItems={data?.totalItems?.total ?? 0}
      itemsPerPage={first}
    />
  </main>
);

export default HomeView;
