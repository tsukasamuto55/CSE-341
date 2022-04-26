const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const familyData = require('./data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', require('./routes'))
app.use(express.static("public"));



app.get('/family', (req, res) => {
  const data = familyData
  res.render('family', {...data});
})

app.listen(port, (err) => {
    if (err) console.log('There are some errors');
    console.log(`Listening on Port ${port}`)
})