const db = require('../../models/index');

module.exports = {
  Mutation: {
    async addPlaylist(_, { playlistInput: { name, genre } }) {
      const addPlaylist = new db.playlist({
        name,
        genre,
      });
      const res = await addPlaylist.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deletePlaylist(_, { ID }) {
      const wasDeleted = (await db.playlist.deleteOne({ _id: ID }))
        .deletedCount;
      return wasDeleted; // if something was deleted, return 1, if nothing was deleted, return 1
    },
  },
  Query: {
    async getPlaylist(_, { ID }) {
      return await db.playlist.findById(ID);
    },
    async getPlaylists(_, args) {
      return await db.playlist.find();
    },
  },
};
