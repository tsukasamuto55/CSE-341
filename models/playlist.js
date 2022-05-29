const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playlistSchema = new Schema(
  {
    name: { type: String },
    genre: { type: String },
    songId: [{ type: String }],
  },
  { collection: 'playlists' }
);

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
