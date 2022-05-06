const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

routes.get('/', (req, res) => {
  const results = connect.getCollection().find();
  results.toArray().then((contact_list) => {
    res.render('contacts', { contacts: contact_list });
    console.log('Returned All Contacts');
  });
});

routes.get('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const results = connect.getCollection().find({ _id: contactId });

  results.toArray().then((contact_list) => {
    res.render('contacts', { contacts: contact_list });
    console.log(`Returned Contact: ${req.params.id}`);
  });
});

module.exports = routes;
