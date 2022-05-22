const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.playlist = require('./playlist.js');
db.song = require('./song.js');
db.user = require('./user.js');

module.exports = db;
