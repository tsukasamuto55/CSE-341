const graphql = require('graphql');
const db = require('../models/index');
const UserType = require('./typeDefs/user');
const SignUpInputType = require('./typeDefs/signupInput');
const LoginInput = require('./typeDefs/loginInput');
const SongType = require('./typeDefs/song');
const PlaylistType = require('./typeDefs/playlist');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: SignUpInputType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args, request) {
        return User.findOne({ email: args.email })
          .then((user) => {
            if (user) {
              throw new Error(
                `User with the email address "${args.email}" already exists`
              );
            }
            return bcrypt.hash(args.password, 12);
          })
          .then((hashedPassword) => {
            let user = new db.user({
              username: args.username,
              email: args.email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch((err) => {
            throw err;
          });
      },
    },
    addSong: {
      type: SongType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        artist: { type: new GraphQLNonNull(GraphQLString) },
        releasedYear: { type: new GraphQLNonNull(GraphQLInt) },
        time: { type: new GraphQLNonNull(GraphQLString) },
        popularity: {
          type: new GraphQLNonNull(GraphQLString),
          enum: ['low', 'medium', 'high'],
        },
        quality: {
          type: new GraphQLNonNull(GraphQLString),
          enum: ['SD', 'HD', 'UKTRA HD'],
        },
        language: { type: GraphQLString },
      },
      resolve(parent, args) {
        let song = new db.song({
          title: args.title,
          artist: args.artist,
          releasedYear: args.releasedYear,
          time: args.time,
          popularity: args.popularity,
          quality: args.quality,
          language: args.language,
        });
        return song
          .save()
          .then()
          .catch((err) => {
            throw err;
          });
      },
    },
    createPlaylist: {
      type: PlaylistType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString },
        userId: { type: GraphQLID },
        songId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let createdPlaylist;
        let playList = new db.playlist({
          name: args.name,
          genre: args.genre,
          user: '629c06cee4037e5a67a8f8b1',
        });
        return playList
          .save()
          .then((result) => {
            createdPlaylist = {
              ...result._doc,
              password: null,
              _id: result.id,
            };
            return User.findById('629c06cee4037e5a67a8f8b1');
          })
          .then((user) => {
            if (!user) throw new Error('User does not exist');
            user.createdPlaylist.push(playList);
            return user.save();
          })
          .then((result) => createdPlaylist)
          .catch((err) => {
            throw err;
          });
      },
    },
    updateUser: {
      type: UserType,
      description: 'Update a user info',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          db.user
            .findByIdAndUpdate(
              { _id: args.id },
              {
                $set: {
                  username: args.username,
                  email: args.email,
                  password: args.password,
                },
              },
              { new: true }
            )
            .exec((err, res) => {
              console.log('user', res);
              if (err) reject(err);
              else resolve(res);
            });
        });
      },
    },
    deleteUser: {
      type: UserType,
      description: 'Delete a user from database',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          db.user
            .findByIdAndDelete({ _id: args.id }, { new: true })
            .exec((err, res) => {
              console.log('user', res);
              if (err) reject(err);
              else resolve(res);
            });
        });
      },
    },
  },
});

module.exports = Mutation;
