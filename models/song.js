const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const songSchema = new Schema(
  {
    title: { type: String },
    artist: { type: String },
    releasedYear: { type: Number },
    time: { type: String },
    popularity: {
      type: String,
      enum: ['low', 'medium', 'high'],
    },
    quality: { type: String, enum: ['SD', 'HD', 'ULTRA HD'], required: true },
    language: { type: String },
  },
  { collection: 'songs' }
);

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
