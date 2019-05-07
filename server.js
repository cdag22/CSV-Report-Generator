const express = require('express');
const bodyParser = require('body-parser');
const util = require('./utilities');

const template = require('./responseTemplate');
const app = express();
const port = 3000;

app.use(bodyParser.text());
app.use(express.static('client'));


app.get('/', (req, res) => {
  res.status(200);
});


app.post('/upload_csv', (req, res) => {
  let csv = util.convertToCSV(req.body);
  res.status(200);
  res.render(template, { csv })
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})