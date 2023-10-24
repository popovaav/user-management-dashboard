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

export const useFetchUsers = (first: number, page: number) => {
  const FETCH_USERS = gql`
    query FetchUsers($first: Int, $page: Int) {
      users(first: $first, page: $page) {
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
    },
    fetchPolicy: 'cache-first',
  } as QueryHookOptions<IUsersData>);

  return {
    loading,
    error,
    data,
  };
};
