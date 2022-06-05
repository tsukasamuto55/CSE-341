const graphql = require('graphql');
const db = require('../../models/index');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } =
  graphql;

const PopularityEnumType = require('./enum');
const UserType = require('./user');

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    artist: { type: GraphQLString },
    releasedYear: { type: GraphQLInt },
    time: { type: GraphQLString },
    // composer: { type: UserType },
    popularity: {
      type: PopularityEnumType,
      required: true,
    },
    quality: {
      type: GraphQLString,
      enum: ['SD', 'HD', 'ULTRA HD'],
      required: true,
    },
    language: { type: GraphQLString },
  }),
});

module.exports = SongType;
