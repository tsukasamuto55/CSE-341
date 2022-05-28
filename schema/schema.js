const graphql = require('graphql');
const _ = require('lodash');
const db = require('../models/index');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID, required: true },
    username: { type: GraphQLString, required: true },
    email: { type: GraphQLString, required: true },
    password: { type: GraphQLString, required: true },
  }),
});

const PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  fields: () => ({
    id: { type: GraphQLID, required: true },
    name: { type: GraphQLString, required: true },
    genre: { type: GraphQLString, required: true },
  }),
});

const SongType = new GraphQLObjectType({
  name: 'Song',
  fields: () => ({
    id: { type: GraphQLID, required: true },
    title: { type: GraphQLString, required: true },
    artist: { type: GraphQLString, required: true },
    releasedYear: { type: GraphQLInt, required: true },
    time: { type: GraphQLString, required: true },
    popularity: {
      type: GraphQLString,
      enum: ['low', 'medium', 'high'],
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
      },
    },
    songs: {
      type: new GraphQLList(SongType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return songs;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new db.user({
          username: args.username,
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
