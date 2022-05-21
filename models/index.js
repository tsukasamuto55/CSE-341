const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.playlist = require('./playlist.js')(mongoose);
db.song = require('./song.js')(mongoose);
db.user = require('./user.js')(mongoose);

module.exports = db;
