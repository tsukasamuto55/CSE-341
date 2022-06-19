const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');

const titleValidator = [
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Title should contain alpha-numeric characters only',
  }),
];

const artistValidator = [
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Artist name should contain alpha-numeric characters only',
  }),
];

const yearValidator = [
  validate({
    validator: 'isInt',
    message: 'Released Year strings need to be integer',
  }),
];

const languageValidator = [
  validate({
    validator: 'isAlpha',
    message: 'Language should contain only letters',
  }),
];

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: titleValidator,
    },
    artist: {
      type: String,
      required: true,
      validate: artistValidator,
    },
    releasedYear: {
      type: String,
      validate: yearValidator,
    },
    time: {
      type: String,
      required: true,
    },
    popularity: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: '{VALUE} is not supported',
      },
    },
    quality: {
      type: String,
      enum: {
        values: ['SD', 'HD', 'UHD'],
        message: '{VALUE} is not supported',
      },
    },
    language: { type: String, validate: languageValidator },
    playlist: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
  },
  { collection: 'songs' }
);

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
