const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, validate: [isEmail, 'Please enter a valid email'] },
    password: {
      type: String,
      minLength: 6,
    },
    googleId: { type: String },
    createdSong: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
