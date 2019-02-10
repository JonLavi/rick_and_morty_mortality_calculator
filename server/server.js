const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(3000, function () { // NEW
  console.log('App running on port 3000');
});
