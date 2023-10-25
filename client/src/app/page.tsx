'use client';

import { useState } from 'react';
import { useFetchUsers } from '@/hooks/use-fetch-users';
import HomeView from '@/pagesView/HomeView';
import { ASC, DESC } from '@/constants/constants';

export default function Home() {
  const first = 10;
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const { data } = useFetchUsers(first, page, sortField, sortOrder);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === ASC ? DESC : ASC);
    } else {
      setSortField(field);
      setSortOrder(ASC);
    }
  };

  return (
    <HomeView
      data={data}
      page={page}
      setPage={setPage}
      first={first}
      handleSort={handleSort}
      sortOrder={sortOrder}
      sortField={sortField}
    />
  );
}
