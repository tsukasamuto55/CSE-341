const userResolvers = require('./users');
const songResolvers = require('./songs');
const playlistResolvers = require('./playlists');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...songResolvers.Query,
    ...playlistResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...songResolvers.Mutation,
    ...playlistResolvers.Mutation,
  },
};
