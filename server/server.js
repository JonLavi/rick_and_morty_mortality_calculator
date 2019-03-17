const express = require('express');
const app = express();
const path = require('path');
const parser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(client => {
    const db = client.db("heroku_0lvv9stq");
    const apiCollection = db.collection("rick_and_morty_og_api");
    const apiRouter = createRouter(apiCollection);
    app.use("/api", apiRouter);
  })
  .catch(console.error)
  .then(
    fetch('https://rickandmortyapi.com/api/character/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      apiRouter.post(data);
    })
  );

app.listen(process.env.PORT || 3000, function () { // NEW
  console.log('App running');
});

