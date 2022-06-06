const graphql = require('graphql');
const { GraphQLString, GraphQLInputObjectType, GraphQLNonNull } = graphql;

const SignupUserInputType = new GraphQLInputObjectType({
  name: 'SignupUserInpuy',
  fields: () => ({
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = SignupUserInputType;
