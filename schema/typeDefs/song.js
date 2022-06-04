const graphql = require('graphql');
const db = require('../../models/index');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

const PopularityEnumType = require('./enum');

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    title: { type: GraphQLString },
    artist: { type: GraphQLString },
    releasedYear: { type: GraphQLInt },
    time: { type: GraphQLString },
    popularity: {
      type: PopularityEnumType,
      required: true,
    },
    quality: {
      type: GraphQLString,
      enum: ['SD', 'HD', 'UKTRA HD'],
      required: true,
    },
    language: { type: GraphQLString },
  }),
});

module.exports = SongType;
