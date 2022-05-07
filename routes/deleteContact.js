const routes = require('express').Router();
const Contact = require('../models/contact');

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
