const express = require("express");
const app = express();
const port = process.env.PORT || 3000; 
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', require('./routes'))

const families = [
    {
        name: 'Emily Muto',
        hobby: 'Drawing'
    },
    {
        name: 'Sakuya Muto',
        hobby: 'Watching Blippi'
    }
]

app.get('/home', (req, res) => {
  res.render('home');
})

app.listen(port, (err) => {
    if (err) console.log('There are some errors');
    console.log(`Listening on Port ${port}`)
})