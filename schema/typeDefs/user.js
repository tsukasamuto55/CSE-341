const graphql = require('graphql');
const db = require('../../models/index');

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } =
  graphql;

const PlaylistType = require('./playlist');
const SongType = require('./song');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    token: { type: GraphQLString },
    createdSong: { type: SongType },
    playlists: {
      type: new GraphQLList(PlaylistType),
      resolve(parent, args) {
        return db.user.findById(args.id);
      },
    },
  }),
});

module.exports = UserType;
