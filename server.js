const express = require('express');
const template = require('./message');
const app = express();
const port = 3000;

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.status(200);
})

app.post('/upload_csv', (req, res) => {
  req.json();
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`)
})