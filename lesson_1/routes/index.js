const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Emily Muto')
})

module.exports = routes 