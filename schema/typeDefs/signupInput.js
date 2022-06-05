const graphql = require('graphql');
const db = require('../../models/index');

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } =
  graphql;

const SignUpInputType = new GraphQLObjectType({
  name: 'SignUpInput',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = SignUpInputType;
