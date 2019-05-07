const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const util = require('./utilities');

const app = express();
const port = 3000;
let csv = '';

// app.use(bodyParser.raw());
app.use(express.static('views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.status(200);
  res.render('index', { csv });
});


app.post('/upload_csv', (req, res) => {
  let buff = [];
  req.on('data', chunk => {
    buff.push(chunk);
  });
  req.on('end', () => {
    let data = Buffer.concat(buff).toString();
    csv = util.convertToCSV(data);
    // console.log('csv', csv);
    res.status(200);
    res.redirect('/');
  });

});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})