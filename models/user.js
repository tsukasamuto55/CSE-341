const mongoose = require('mongoose');
const { isEmail } = require('validator');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
];

const userSchema = new Schema(
  {
    username: { type: String, required: true, validate: nameValidator },
    email: {
      type: String,
      required: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
    },
    // googleId: { type: String },
    token: { type: String },
    createdSong: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
