// .env variables DB_STRING
const dotenv = require('dotenv');
dotenv.config();

// databases
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

let _client;
let _collection;

const initDatabase = () => {
  mongoose.connect(process.env.DB_STRING, (err, client) => {
    if (err) throw err;
    _client = client;
    _collection = client.collection('contacts');
    console.log('DB connected successfully');
  });
};

const getCollection = () => {
  return _collection;
};

module.exports = { initDatabase, getCollection };

// const initDatabase = () => {
//   MongoClient.connect(process.env.DB_STRING, (err, client) => {
//     if (err) throw err;
//     _client = client;
//     _collection = client.db('cse341').collection('contacts');
//     console.log('DB connected successfully');
//   });
// };
