const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const connection = require('./db/connect');

connection.initDatabase();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.use('/', require('./routes'))
app.use(express.static("public"));

app.listen(port, (err) => {
    if (err) console.log('There are some errors');
    console.log(`Listening on Port ${port}`)
})
