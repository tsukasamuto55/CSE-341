const routes = require('express').Router();

routes.get('/contacts', (req, res) => {
    const MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(process.env.DB_STRING, function(err, db) {
    if (err) throw err;
    const dbo = db.db('cse341');
    dbo.collection('contacts').find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
        })
    })
})

module.exports = routes;