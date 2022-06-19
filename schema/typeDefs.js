const { gql } = require('apollo-server-express');

module.exports = gql`
  type Playlist {
    _id: ID
    name: String!
    genre: String
    songs: [Song]
  }

  type Song {
    _id: ID
    title: String!
    artist: String
    releasedYear: String
    time: String
    popularity: PopularityEnum
    quality: QualityEnum
    language: String
    playlist: Playlist
  }

  enum PopularityEnum {
    Low
    Medium
    High
  }

  enum QualityEnum {
    SD
    HD
    UHD
  }

  input SongInput {
    title: String
    artist: String
    releasedYear: String
    time: String
    popularity: PopularityEnum
    quality: QualityEnum
    language: String
  }

  input PlaylistInput {
    name: String
    genre: String
    songs: [ID]
  }

  type Query {
    getPlaylist(ID: ID!): Playlist
    getSong(ID: ID!): Song
    getPlaylists: [Playlist]
    getSongs: [Song]
  }

  type Mutation {
    addSong(songInput: SongInput): Song
    deleteSong(ID: ID): Boolean
    createPlaylist(playlistInput: PlaylistInput): Playlist
    editPlaylist(ID: ID, playlistInput: PlaylistInput): Boolean
    deletePlaylist(ID: ID): Boolean
  }
`;
