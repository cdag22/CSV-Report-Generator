const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const util = require('./utilities');

const app = express();
const port = 3000;
const csvFilePath = './csv-data.csv';

let csv = '';

// app.use(bodyParser.raw());
app.use(express.static(__dirname + '/public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.status(200);
  res.render('index', { csv });
});

app.get('/download_csv', (req, res) => {
  if (csv) {
    fs.writeFile(csvFilePath, csv, { encoding: 'utf8' }, (error) => {
      if (error) {
        res.status(500);
        res.redirect('/');
      } else {
        res.setHeader('Content-disposition', 'attachment; filename=csv-data.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
      }
    });
  } else {
    res.status(404);
    res.redirect('/');
  }
});

app.post('/upload_csv', (req, res) => {
  let buff = [];
  req.on('data', chunk => {
    buff.push(chunk);
  });
  req.on('end', () => {
    let data = Buffer.concat(buff).toString();
    csv = util.convertToCSV(data);
    res.status(200);
    res.redirect('/');
  });
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})