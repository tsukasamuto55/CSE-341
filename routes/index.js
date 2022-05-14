const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Welcome to CSE 341 Contacts API');
});
routes.use('/', require('./swagger'));
routes.use('/contacts', require('./contacts'));

module.exports = routes;
