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
    async addSong(
      _,
      {
        songInput: {
          title,
          artist,
          releasedYear,
          time,
          popularity,
          quality,
          language,
        },
      }
    ) {
      try {
        const newSong = new db.song({
          title,
          artist,
          releasedYear,
          time,
          popularity,
          quality,
          language,
        });
        const res = await newSong.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteSong(_, { ID }) {
      try {
        const wasDeleted = (await db.song.deleteOne({ _id: ID })).deletedCount;
        return wasDeleted;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Query: {
    async getSong(_, { ID }) {
      try {
        return await db.song.findById(ID);
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSongs(_, args) {
      try {
        return await db.song.find();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
