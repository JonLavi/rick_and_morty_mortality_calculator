const express = require('express');
const app = express();
const path = require('path');
const parser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");
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


const queryApi = () => {  
  let apiData = null;
  fetch('https://rickandmortyapi.com/api/character/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      apiData = data;
    })
}

queryApi();

app.listen(process.env.PORT || 3000, function () { // NEW
  console.log('App running');
});

