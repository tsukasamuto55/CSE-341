const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    genre: { type: String, required: true },
    songId: { type: String, required: true },
  },
  { collection: 'playlists' }
);

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
