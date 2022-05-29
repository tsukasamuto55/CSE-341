const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
