const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    username: String!
    email: String!
    password: String
    token: String
  }

  type Playlist {
    name: String!
    genre: String
    # songId: String
    # songs: Song
  }

  type Song {
    title: String!
    artist: String
    releasedYear: String
    time: String
    popularity: PopularityEnum
    quality: QualityEnum
    language: String
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

  input UserInput {
    username: String
    email: String
    password: String
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SongInput {
    title: String!
    artist: String!
    releasedYear: String!
    time: String!
    popularity: PopularityEnum!
    quality: QualityEnum!
    language: String
  }

  input PlaylistInput {
    name: String!
    genre: String!
    user: ID
    songs: [ID]
  }

  type Query {
    getUser(ID: ID!): User
    getPlaylist(ID: ID!): Playlist
    getSong(ID: ID!): Song
    getUsers: [User]
    getPlaylists: [Playlist]
    getSongs: [Song]
  }

  type Mutation {
    signupUser(signupInput: SignupInput): User
    loginUser(loginInput: LoginInput): User
    editUser(ID: ID, userInput: UserInput): Boolean
    deleteUser(ID: ID!): Boolean
    addSong(songInput: SongInput): Song
    deleteSong(ID: ID): Boolean
    addPlaylist(playlistInput: PlaylistInput): Playlist
    deletePlaylist(ID: ID): Boolean
  }
`;
