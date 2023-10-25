import { gql, QueryHookOptions, useQuery } from '@apollo/client';

export interface IUsersData {
  users: {
    id: string;
    firstName: string;
    age: number;
  }[];
  totalItems: {
    total: number;
  };
}

export const useFetchUsers = (
  first: number,
  page: number,
  sortField: string,
  sortOrder: string,
  searchName: string,
  searchAge: string
) => {
  const FETCH_USERS = gql`
    query FetchUsers(
      $first: Int
      $page: Int
      $sortField: String
      $sortOrder: String
      $searchName: String
      $searchAge: String
    ) {
      users(
        first: $first
        page: $page
        sortField: $sortField
        sortOrder: $sortOrder
        searchName: $searchName
        searchAge: $searchAge
      ) {
        id
        firstName
        age
      }
    }
  `;

  const { loading, error, data } = useQuery<IUsersData>(FETCH_USERS, {
    variables: {
      first,
      page,
      sortField,
      sortOrder,
      searchName,
      searchAge,
    },
  } as QueryHookOptions<IUsersData>);

  return {
    loading,
    error,
    data,
  };
};
