const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    releasedYear: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    popularity: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: '{VALUE} is not supported',
      },
    },
    quality: {
      type: String,
      enum: {
        values: ['SD', 'HD', 'UHD'],
        message: '{VALUE} is not supported',
      },
    },
    language: { type: String },
    playlist: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
  },
  { collection: 'songs' }
);

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
