const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Emily Muto is my wife. Please add "/family" at the end of URL to see all of my family members.')
})

module.exports = routes 