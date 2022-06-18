const db = require('../../models/index');
const { ApolloError } = require('apollo-server-errors');

// const songs = async (songIds) => {
//   try {
//     const songs = await db.song.find({ _id: { $in: songIds } });
//     return songs.map((song) => ({
//       ...song._doc,
//       playlist: playlist.bind(this, song._doc.playlist),
//     }));
//   } catch (err) {
//     throw new ApolloError(err);
//   }
// };

// const playlist = async (playlistIds) => {
//   try {
//     const playlists = await db.playlist.find({ _id: { $in: playlistIds } });
//     return playlists.map((playlist) => ({
//       ...playlist._doc,
//       song: song.bind(this, playlist._doc.songs),
//     }));
//   } catch (err) {
//     throw new ApolloError(err);
//   }
// };

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
        throw new ApolloError(err);
      }
    },
    async editPlaylist(_, { ID, playlistInput: { name, genre } }) {
      const wasEdited = (
        await db.playlist.updateOne({ _id: ID }, { name, genre })
      ).modifiedCount;

      console.log(wasEdited);

      if (wasEdited > 0) return wasEdited;
      else throw new ApolloError('No information has been modified.');
    },
    async deletePlaylist(_, { ID }) {
      const wasDeleted = (await db.playlist.deleteOne({ _id: ID }))
        .deletedCount;
      if (wasDeleted > 0) return wasDeleted;
      else throw new ApolloError('No playlist has been deleted');
    },
  },
  Query: {
    async getPlaylist(_, { ID }) {
      try {
        return await db.playlist.findById(ID);
      } catch (err) {
        new ApolloError(err.message);
      }
    },
    async getPlaylists(_, args) {
      try {
        return await db.playlist.find();
      } catch (err) {
        new ApolloError(err.message);
      }
    },
  },
};
