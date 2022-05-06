const routes = require('express').Router();
const bodyParser = require('body-parser');
const Contact = require('../models/contact');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.get('/', (req, res) => {
  res.render('newContact');
});

routes.post('/', (req, res) => {
  let newContact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  });

  newContact.save((err, res) => {
    if (err) console.log(err);
    else console.log(`A new contact with the id: ${res._id} is added.`);
  });

  res.redirect('/newContact');
});

module.exports = routes;
