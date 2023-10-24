'use client';

import { useState } from 'react';
import { useFetchUsers } from '@/hooks/use-fetch-users';
import HomeView from '@/pagesView/HomeView';

export default function Home() {
  const first = 10;
  const [page, setPage] = useState(1);
  const { data } = useFetchUsers(first, page);

  return <HomeView data={data} page={page} setPage={setPage} first={first} />;
}
