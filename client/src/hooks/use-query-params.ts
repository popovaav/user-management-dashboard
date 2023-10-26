'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  const setQueryParam = (queryName: string, value: string) => {
    router.push(`${pathname}?${createQueryString(queryName, value)}`);
  };

  const getQueryParam = (queryName: string) => {
    return searchParams.get(queryName);
  };

  const removeAllQueryParams = () => {
    router.replace(pathname);
  };

  const hasQueryParams = () => {
    const keys = searchParams.keys();
    return !keys.next().done;
  };

  return {
    queryParams: searchParams,
    setQueryParam,
    getQueryParam,
    removeAllQueryParams,
    hasQueryParams,
  };
}
