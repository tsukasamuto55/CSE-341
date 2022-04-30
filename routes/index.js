const routes = require('express').Router();
const familyData = require('../data.json');

routes.get('/', (req, res) => {
    res.send('Emily Muto is my wife. Please add "/family" at the end of URL to see all of my family members.')
})

routes.get('/contacts', (require('./contacts')));

routes.get('/family', (req, res) => {
  const data = familyData
  res.render('family', {...data});
})

module.exports = routes 