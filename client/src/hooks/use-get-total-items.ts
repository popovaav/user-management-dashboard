import { gql, QueryHookOptions, useQuery } from '@apollo/client';

export interface ITotalItemsData {
  totalItems: {
    total: number;
  };
}

export const useGetTotalItems = (
  searchName: string | null,
  searchAge: string | null
) => {
  const GET_TOTAL_ITEMS = gql`
    query GetTotalItems($searchName: String, $searchAge: String) {
      totalItems(searchName: $searchName, searchAge: $searchAge) {
        total
      }
    }
  `;

  const { loading, error, data } = useQuery<ITotalItemsData>(GET_TOTAL_ITEMS, {
    variables: {
      searchName,
      searchAge,
    },
  } as QueryHookOptions<ITotalItemsData>);

  return {
    loading,
    error,
    data,
  };
};
