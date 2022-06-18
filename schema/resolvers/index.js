const songResolvers = require('./songs');
const playlistResolvers = require('./playlists');

module.exports = {
  Query: {
    ...songResolvers.Query,
    ...playlistResolvers.Query,
  },
  Mutation: {
    ...songResolvers.Mutation,
    ...playlistResolvers.Mutation,
  },
};
