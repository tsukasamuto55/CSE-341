const routes = require('express').Router();

routes.get('/contacts', (req, res) => {
    res.send('Contacts')
})

module.exports = routes 