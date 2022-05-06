const routes = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

routes.use(bodyParser.urlencoded({ extended: true }));

const contactSchema = {
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: String,
};

const Contact = mongoose.model('Contact', contactSchema);

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
    else console.log('A new account was inserted successfully');
  });

  res.redirect('/newContact');
});

module.exports = routes;
