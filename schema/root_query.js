const graphql = require('graphql');
const db = require('../models/index');

const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;

const UserType = require('./typeDefs/user');
const SongType = require('./typeDefs/song');
const PlaylistType = require('./typeDefs/playlist');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      description: 'List a user based on a user ID from database',
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return db.user.findById(args.id);
      },
    },
    song: {
      type: SongType,
      description: 'List a song based on a song ID from database',
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return db.song.findById(args.id);
      },
    },
    playlist: {
      type: PlaylistType,
      description: 'List a playlist based on a playlist ID from database',
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return db.playlist.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      description: 'List all users',
      resolve(parent, args) {
        return db.user.find({});
      },
    },
    songs: {
      type: new GraphQLList(SongType),
      description: 'List all songs',
      resolve(parent, args) {
        return db.song.find({});
      },
    },
    playlists: {
      type: new GraphQLList(PlaylistType),
      description: 'List all playlists',
      resolve(parent, args) {
        return db.playlist.find({});
      },
    },
  },
});

module.exports = RootQuery;
