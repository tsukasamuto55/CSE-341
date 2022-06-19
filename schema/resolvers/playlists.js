const db = require('../../models/index');

const songs = async (songIds) => {
  try {
    const songs = await db.song.find({ _id: { $in: songIds } });
    return songs.map((song) => ({
      ...song._doc,
      playlist: playlist.bind(this, song._doc.playlist),
    }));
  } catch {
    throw err;
  }
};

const playlist = async (playlistId) => {
  try {
    const playlist = await db.playlist.findById(playlistId);
    return {
      ...playlist._doc,
      songs: songs.bind(this, playlist._doc.songs),
    };
  } catch (err) {
    throw err;
  }
};

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
        const playlist = await db.playlist.findById(ID);
        return {
          ...playlist._doc,
          songs: songs.bind(this, playlist._doc.songs),
        };
      } catch (err) {
        new Error(err.message);
      }
    },
    async getPlaylists(_, args) {
      try {
        const playlists = await db.playlist.find();
        return playlists.map((playlist) => ({
          ...playlist._doc,
          songs: songs.bind(this, playlist._doc.songs),
        }));
      } catch (err) {
        new Error(err.message);
      }
    },
  },
};
