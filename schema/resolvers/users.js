const db = require('../../models/index');
const { ApolloServer, gql, UserInputError } = require('apollo-server-express');
const { ApolloError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  Mutation: {
    async signupUser(
      _,
      { signupInput: { username, email, password, confirmPassword } }
    ) {
      if (!(email && password && username && confirmPassword)) {
        res.status(400).send('All input is required');
      }

      const oldUser = await db.user.findOne({ email });

      if (oldUser) {
        throw new ApolloError(
          'A user is already registered with the email: ' + email,
          'USER_ALREADY_EXISTS'
        );
      }

      var encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new db.user({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign({ user_id: newUser._id, email }, 'UNSAFESTRING', {
        expiresIn: '1h',
      });

      newUser.token = token;

      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      if (!(email && password)) {
        res.status(400).send('All input is required');
      }

      const user = await db.user.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign({ user_id: user._id, email }, 'UNSAFESTRING', {
          expiresIn: '1h',
        });

        // save user token
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
      }
    },
    async editUser(_, { ID }) {
      const wasEdited = (
        await db.user.updateOne({ _id: ID }, { username, email, password })
      ).modifiedCount;
      return wasEdited; // if something was edited, return 1, if nothing was edited, return 1
    },

    async deleteUser(_, { ID }) {
      const wasDeleted = (await db.user.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted; // if something was deleted, return 1, if nothing was deleted, return 1
    },
  },
  Query: {
    async user(_, { ID }) {
      return await db.user.findById(ID);
    },
    async playlist(_, { ID }) {
      return await db.playlist.findById(ID);
    },
    async song(_, { ID }) {
      return await db.song.findById(ID);
    },
    async users(_, args) {
      return await db.user.find();
    },
    async playlists(_, args) {
      return await db.playlist.find();
    },
    async songs(_, args) {
      return await db.song.find();
    },
  },
};
