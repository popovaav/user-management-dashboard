import { gql } from '@apollo/client';
import { ASC, DESC, NAME } from '../../../src/constants/constants';

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

export const mocksWithData = [
  {
    request: {
      query: FETCH_USERS,
      variables: {
        first: 10,
        page: 1,
        sortField: NAME,
        sortOrder: ASC,
        searchName: null,
        searchAge: null,
      },
    },
    result: {
      data: {
        users: [
          {
            id: '1',
            firstName: 'Alice',
            age: 30,
          },
          {
            id: '2',
            firstName: 'Jhon',
            age: 25,
          },
          {
            id: '3',
            firstName: 'Mikki',
            age: 54,
          },
        ],
        totalItems: {
          total: 3,
        },
      },
    },
  },
];

export const mocksWithDataDesc = [
  {
    request: {
      query: FETCH_USERS,
      variables: {
        first: 10,
        page: 1,
        sortField: NAME,
        sortOrder: DESC,
        searchName: null,
        searchAge: null,
      },
    },
    result: {
      data: {
        users: [
          {
            id: '3',
            firstName: 'Mikki',
            age: 54,
          },
          {
            id: '2',
            firstName: 'Jhon',
            age: 25,
          },
          {
            id: '1',
            firstName: 'Alice',
            age: 30,
          },
        ],
        totalItems: {
          total: 3,
        },
      },
    },
  },
];

export const mocksWithFilterAge = [
  {
    request: {
      query: FETCH_USERS,
      variables: {
        first: 10,
        page: 1,
        sortField: NAME,
        sortOrder: ASC,
        searchName: null,
        searchAge: '30',
      },
    },
    result: {
      data: {
        users: [
          {
            id: '1',
            firstName: 'Alice',
            age: 30,
          },
        ],
        totalItems: {
          total: 1,
        },
      },
    },
  },
];
