const db = require('../../models/index');

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
        console.log(ID);
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
