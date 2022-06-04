const graphql = require('graphql');
const db = require('../../models/index');

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const PlaylistType = require('./playlist');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    playlistId: { type: GraphQLString },
    playlists: {
      type: new GraphQLList(PlaylistType),
      resolve(parent, args) {
        return db.user.findById(args.id);
      },
    },
  }),
});

module.exports = UserType;
