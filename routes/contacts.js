const routes = require('express').Router();
const connect = require('../db/connect');

routes.get('/contacts', (req, res) => {
   connect.getCollection().find().toArray((err, result) => {
       if (err) throw err;
       res.json(result);
       console.log('Contacts query Succesful')
   });
});

module.exports = routes;