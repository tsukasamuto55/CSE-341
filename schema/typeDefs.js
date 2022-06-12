const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    username: String
    email: String
    password: String
    token: String
  }

  type Playlist {
    name: String
    genre: String
    songId: String
    # songs: Song
  }

  type Song {
    title: String
    artist: String
    releasedYear: String
    time: String
    # popularity: enum: ['Low', 'Medium', 'High']
    # quality: enum: ['SD', 'HD', 'Ultra HD']
    language: String
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  input SignupInput {
    username: String
    email: String
    password: String
    confirmPassword: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    user(id: ID!): User
    playlist(id: ID!): Playlist
    song(id: ID!): Song
    users: [User]
    playlists: [Playlist]
    songs: [Song]
  }

  type Mutation {
    signupUser(signupInput: SignupInput): User
    loginUser(loginInput: LoginInput): User
    editUser(ID: ID, userInput: UserInput): Boolean
    deleteUser(ID: ID!): Boolean
  }
`;
