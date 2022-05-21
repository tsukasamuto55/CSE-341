const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    genre: { type: String, required: true },
  },
  { collection: 'playlists' }
);

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
