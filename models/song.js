const mongoose = require('mongoose');
const songSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    releasedYear: { type: Number, required: true },
    time: { type: String, required: true },
    popularity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    quality: { type: String, enum: ['SD', 'HD', 'ULTRA HD'], required: true },
    language: { type: String },
  },
  { collection: 'songs' }
);

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
