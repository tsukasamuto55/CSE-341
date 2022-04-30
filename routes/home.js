const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send(`Hello! You're in Home Page!!`)
})

module.exports = routes;