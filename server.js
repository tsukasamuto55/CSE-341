const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.use('/', require('./routes'))
app.use(express.static("public"));

const familyData = require('./data.json');


app.get('/family', (req, res) => {
  const data = familyData
  res.render('family', {...data});
})

app.listen(port, (err) => {
    if (err) console.log('There are some errors');
    console.log(`Listening on Port ${port}`)
})

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.DB_STRING, function(err, db) {
  if (err) throw err;
  const dbo = db.db('cse341');
  dbo.collection('contacts').find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  })
})