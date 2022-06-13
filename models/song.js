const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const songSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    releasedYear: { type: Number },
    time: { type: String, required: true },
    popularity: {
      type: String,
      enum: ['Low', 'Medium', 'high'],
    },
    quality: { type: String, enum: ['SD', 'HD', 'UHD'] },
    language: { type: String },
  },
  { collection: 'songs' }
);

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
