const routes = require('express').Router();
const familyData = require('../data.json');

routes.use('/home', (require('./home')))

routes.use('/contacts', (require('./contacts')));

routes.use('/family', (req, res) => {
  const data = familyData;
  res.render('family', {...data});
})

module.exports = routes 