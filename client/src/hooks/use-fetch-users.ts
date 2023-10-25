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
  sortOrder: string
) => {
  const FETCH_USERS = gql`
    query FetchUsers(
      $first: Int
      $page: Int
      $sortField: String
      $sortOrder: String
    ) {
      users(
        first: $first
        page: $page
        sortField: $sortField
        sortOrder: $sortOrder
      ) {
        id
        firstName
        age
      }
      totalItems {
        total
      }
    }
  `;

  const { loading, error, data } = useQuery<IUsersData>(FETCH_USERS, {
    variables: {
      first,
      page,
      sortField,
      sortOrder,
    },
  } as QueryHookOptions<IUsersData>);

  return {
    loading,
    error,
    data,
  };
};
