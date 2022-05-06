const routes = require('express').Router();
const bodyParser = require('body-parser');
const Contact = require('../models/contact');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.put('/:id', (req, res) => {
  Contact.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Contact.findOne({ _id: req.params.id }).then((contact) => {
      res.send(contact);
    });
  });
});

module.exports = routes;
