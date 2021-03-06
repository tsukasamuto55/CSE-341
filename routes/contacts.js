const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const Contact = require('../models/contact');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

// show all contacts
routes.get('/', (req, res) => {
  const results = connect.getCollection().find();
  results.toArray().then((contact_list) => {
    res.status(200);
    res.render('contacts/index', { contacts: contact_list });
    console.log('Returned All Contacts');
  });
});

routes.post('/', (req, res) => {
  let newContact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    favoriteFood: req.body.favoriteFood,
    location: req.body.location,
    hobby: req.body.hobby,
    birthday: req.body.birthday,
  });

  newContact.save((err, res) => {
    if (err) res.status(500).json(err);
    else {
      console.log(`A new contact with the id: ${res._id} is added.`);
    }
  });
  res.status(201).json(`New contact Id: ${newContact._id}`);
  // res.redirect(`/contacts/${newContact}`);
});

// Show one contact
routes.get('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const results = connect.getCollection().find({ _id: contactId });

  results.toArray().then((contact_list) => {
    res.render('contacts/index', { contacts: contact_list });
    console.log(`Returned Contact: ${req.params.id}`);
  });
});

// edit a contact
routes.put('/:id', (req, res) => {
  const { id } = req.params;
  let contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    favoriteFood: req.body.favoriteFood,
    location: req.body.location,
    hobby: req.body.hobby,
    birthday: req.body.birthday,
  };

  Contact.findByIdAndUpdate(id, contact, { new: true }, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(204).send();
  });
});

// delete a contact
routes.delete('/:id', (req, res) => {
  const { id } = req.params;
  const response = {
    message: 'Contact has been removed',
    _id: id,
  };

  Contact.findByIdAndRemove(id, (err) => {
    if (err) return res.status(500).send(err);

    return res.status(200).send(response);
  });
});

module.exports = routes;
