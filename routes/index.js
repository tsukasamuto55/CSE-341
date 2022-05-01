const routes = require('express').Router();
const familyData = require('../data.json');

routes.get('/', async (req, res) => {
  try {
    res.render('index');
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
})

routes.use('/home', (require('./home')))

routes.use('/contacts', (require('./contacts')));

routes.get('/family', (req, res) => {
  const data = familyData;
  res.render('family', {...data});
})

module.exports = routes 