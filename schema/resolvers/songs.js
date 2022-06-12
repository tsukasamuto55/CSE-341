const db = require('../../models/index');

module.exports = {
  Mutation: {
    async addSong(
      _,
      { title, artist, releasedYear, time, popularity, quality, language }
    ) {
      const addSong = new db.song({
        title,
        artist,
        releasedYear,
        time,
        popularity,
        quality,
        language,
      });
      const res = await addSong.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteSong(_, { ID }) {
      const wasDeleted = (await db.song.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted; // if something was deleted, return 1, if nothing was deleted, return 1
    },
  },
  Query: {
    async song(_, { ID }) {
      return await db.song.findById(ID);
    },
    async songs(_, args) {
      return await db.song.find();
    },
  },
};
