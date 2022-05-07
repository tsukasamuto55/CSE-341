const routes = require('express').Router();
const bodyParser = require('body-parser');
const Contact = require('../models/contact');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.put('/:id', (req, res) => {
  const { id } = req.params;
  Contact.findByIdAndUpdate(id, req.body, { new: true }, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(204).send();
  });
});

module.exports = routes;
