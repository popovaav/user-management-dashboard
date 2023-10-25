'use client';

import { useState } from 'react';
import { useFetchUsers } from '@/hooks/use-fetch-users';
import HomeView from '@/pagesView/HomeView';
import { AGE, ASC, DESC, FIRST, NAME } from '@/constants/constants';
import { useGetTotalItems } from '@/hooks/use-get-total-items';
import useQueryParams from '@/hooks/use-query-params';

export default function Home() {
  const { setQueryParam, getQueryParam, queryParams } = useQueryParams();
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState(NAME);
  const [sortOrder, setSortOrder] = useState(ASC);
  const [valueInput, setValueInput] = useState({ firstName: '', age: '' });
  const { data, loading } = useFetchUsers(
    FIRST,
    page,
    sortField,
    sortOrder,
    getQueryParam(NAME) || valueInput?.firstName,
    getQueryParam(AGE) || valueInput?.age
  );
  const { data: dataTotal } = useGetTotalItems(
    getQueryParam(NAME) || valueInput?.firstName,
    getQueryParam(AGE) || valueInput?.age
  );

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === ASC ? DESC : ASC);
    } else {
      setSortField(field);
      setSortOrder(ASC);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setValueInput({ ...valueInput, [id]: value });
    setQueryParam(id, value);
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
    />
  );
}
