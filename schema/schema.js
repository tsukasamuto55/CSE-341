const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const RootQuery = require('./root_query');
const Mutation = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
