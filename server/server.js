const express = require('express');
const app = express();
const path = require('path');
const parser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");
const ApiQueryHelper = require('./helpers/ApiQueryHelper');
let fetch = require("node-fetch");

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

//process.env.MONGODB_URI || 

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })
  .then(client => {
    const db = client.db("heroku_0lvv9stq");
    const apiCollection = db.collection("api_character_data");
    const apiRouter = createRouter(apiCollection);
    app.use("/api", apiRouter);
  })
  .catch(console.error);

apiQueryHelper = new ApiQueryHelper();
const characters = apiQueryHelper.getAllCharacters();
console.log(characters);

app.listen(process.env.PORT || 3000, function () { // NEW
  console.log('App running');
});

