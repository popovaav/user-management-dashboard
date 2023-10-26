'use client';

import { useState } from 'react';
import { useFetchUsers } from '@/hooks/use-fetch-users';
import HomeView from '@/pagesView/HomeView';
import { AGE, ASC, DESC, FIRST, NAME } from '@/constants/constants';
import { useGetTotalItems } from '@/hooks/use-get-total-items';
import useQueryParams from '@/hooks/use-query-params';
import { useDebouncedCallback } from 'use-debounce';

export default function Home() {
  const { setQueryParam, getQueryParam, hasQueryParams, removeAllQueryParams } =
    useQueryParams();
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState(NAME);
  const [sortOrder, setSortOrder] = useState(ASC);
  const [valueInput, setValueInput] = useState({ firstName: '', age: '' });
  const { data, loading } = useFetchUsers(
    FIRST,
    page,
    sortField,
    sortOrder,
    getQueryParam(NAME),
    getQueryParam(AGE)
  );
  const { data: dataTotal } = useGetTotalItems(
    getQueryParam(NAME),
    getQueryParam(AGE)
  );

  const debouncedSetQueryParam = useDebouncedCallback((id, value) => {
    setQueryParam(id, value);
  }, 700);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setValueInput({ ...valueInput, [id]: value });
    debouncedSetQueryParam(id, value);
    setPage(1);
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === ASC ? DESC : ASC);
    } else {
      setSortField(field);
      setSortOrder(ASC);
    }
  };

  const handleClearFilters = () => {
    removeAllQueryParams();
    setValueInput({ firstName: '', age: '' });
  };

  return (
    <HomeView
      data={data}
      dataTotal={dataTotal}
      page={page}
      setPage={setPage}
      first={FIRST}
      handleSort={handleSort}
      sortOrder={sortOrder}
      sortField={sortField}
      valueInput={valueInput}
      handleInputChange={handleInputChange}
      loading={loading}
      disabled={!hasQueryParams()}
      handleClearFilters={handleClearFilters}
    />
  );
}
