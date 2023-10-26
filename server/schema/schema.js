const graphql = require("graphql");
const axios = require("axios");
const {
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const { GraphQLObjectType } = graphql;

let allUsers = [];
axios.get(`http://localhost:3001/users`).then((response) => {
  allUsers = response.data;
});

function sortUsers(users, sortField, sortOrder) {
  return users.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else if (sortOrder === "desc") {
      return a[sortField] < b[sortField] ? 1 : -1;
    } else {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
  });
}

function filterUsers(users, searchName, searchAge) {
  let filteredUsers = [...users];

  if (searchName) {
    const searchNameLower = searchName.toLowerCase();
    filteredUsers = filteredUsers.filter((user) =>
      user.firstName.toLowerCase().includes(searchNameLower),
    );
  }

  if (searchAge) {
    filteredUsers = filteredUsers.filter((user) => user.age === +searchAge);
  }

  return filteredUsers;
}

const TotalItemsType = new GraphQLObjectType({
  name: "TotalItems",
  fields: () => ({
    total: { type: GraphQLInt },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      args: {
        first: { type: GraphQLInt },
        page: { type: GraphQLInt },
        sortField: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
        searchName: { type: GraphQLString },
        searchAge: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        const { first, sortField, sortOrder, searchName, searchAge, page } =
          args;

        let users = allUsers;

        users = filterUsers(users, searchName, searchAge);

        users = sortUsers(users, sortField, sortOrder);

        const offset = (page - 1) * first;
        const endIndex = offset + first;

        if (users.length <= first) {
          return users;
        }

        if (endIndex > users.length) {
          return users.slice(first);
        }

        return users.slice(offset, endIndex);
      },
    },
    totalItems: {
      type: TotalItemsType,
      args: {
        searchName: { type: GraphQLString },
        searchAge: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        const { searchName, searchAge } = args;

        filterUsers(allUsers, searchName, searchAge);

        return { total: filterUsers(allUsers, searchName, searchAge).length };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
