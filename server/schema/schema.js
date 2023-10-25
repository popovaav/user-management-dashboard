const graphql = require('graphql');
const axios = require('axios');
const { GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql');

const { GraphQLObjectType, } = graphql;

function sortUsers(users, sortField, sortOrder) {
  return users.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else if (sortOrder === 'desc') {
      return a[sortField] < b[sortField] ? 1 : -1;
    } else {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
  });
}

const TotalItemsType = new GraphQLObjectType({
  name: 'TotalItems',
  fields: () => ({
    total: { type: GraphQLInt },
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      args: {
        first: { type: GraphQLInt },
        page: { type: GraphQLInt },
        sortField: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        const { first, page, sortField, sortOrder } = args;
        const offset = (page - 1) * first;
        return axios.get(`http://localhost:3001/users`)
          .then(response => {
            let users = response.data;
            if (sortField && sortOrder) {
              users = sortUsers(users, sortField, sortOrder);
            }
            return users.slice(offset, offset + first);
          });
      }
    },
    totalItems: {
      type: TotalItemsType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3001/users`)
          .then(response => {
            return { total: response.data.length };
          });
      }
    }
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
});
