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
const UserType = require('./user');

const PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLString },
    // user: { type: UserType },
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
