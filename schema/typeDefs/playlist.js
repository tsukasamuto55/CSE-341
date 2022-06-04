const graphql = require('graphql');
const db = require('../../models/index');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

const SongType = require('./song');

const PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  fields: () => ({
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    songId: { type: GraphQLID },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parent, args) {
        return db.song.find(parent.songId);
      },
    },
  }),
});

module.exports = PlaylistType;
