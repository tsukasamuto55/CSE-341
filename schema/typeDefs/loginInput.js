const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const LoginInput = new GraphQLObjectType({
  name: 'LoginInput',
  fields: () => ({
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = LoginInput;
