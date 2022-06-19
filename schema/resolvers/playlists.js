const db = require('../../models/index');

module.exports = {
  Mutation: {
    async createPlaylist(_, { playlistInput: { name, genre, songs } }) {
      try {
        const createPlaylist = new db.playlist({
          name,
          genre,
          songs,
        });
        const res = await createPlaylist.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    async editPlaylist(_, { ID, playlistInput: { name, genre, songs } }) {
      const wasEdited = (
        await db.playlist.updateOne({ _id: ID }, { name, genre, songs })
      ).modifiedCount;

      console.log(wasEdited);

      if (wasEdited > 0) return wasEdited;
      else throw new ApolloError('No information has been modified.');
    },
    async deletePlaylist(_, { ID }) {
      const wasDeleted = (await db.playlist.deleteOne({ _id: ID }))
        .deletedCount;
      if (wasDeleted > 0) return wasDeleted;
      else throw new Error('No playlist has been deleted');
    },
  },
  Query: {
    async getPlaylist(_, { ID }) {
      try {
        return await db.playlist.findById(ID);
      } catch (err) {
        new Error(err.message);
      }
    },
    async getPlaylists(_, args) {
      try {
        return await db.playlist.find();
      } catch (err) {
        new Error(err.message);
      }
    },
  },
  Playlist: {
    songs: async (playlist, args, context, info) => {
      await db.playlist.populate('songs').exec();
      console.log(playlist);
      return db.playlist.songs;
    },
  },
};
