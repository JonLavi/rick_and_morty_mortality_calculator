const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Mortality = function (){
 this.characters = [];
 this.numberOfPages = null;
};

Mortality.prototype.bindEvents = function () {
  this.getData();
  console.log('got characters:', this.characters);
  PubSub.publish('Mortality:character-list-ready', this.characters);
};

Mortality.prototype.getData = function() {
  this.getDataFromMultipleApiPages(26);
};

Mortality.prototype.getDataFromMultipleApiPages = function (numberOfPages) {
  for (var i = 0; i < numberOfPages; i++) {
    this.getDataFromApiPage(i);
  }
}

Mortality.prototype.getDataFromApiPage = function (page) {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  const requestHelper = new RequestHelper(url);
  const dataPromise = requestHelper.get();
  dataPromise.then((data) => {
    data.results.forEach((character) => {
      this.characters.push(character);
    });
  });
  dataPromise.catch((err) => {
  console.error(err)
  });
};


// function: getAllCharacterData(){

  // function: retrieveNumberOfPages(){
  // Run an api request to determine the number of Api pages
  // save the number of pages to a variable
  // }


  // function: retrieveAllApiPages(){
  // - Perform an Api request for the given number of pages(variable),
  // - and append the data to the list of characters
     // { Loop: for i in numberOfPages
     //   perform an Api request (page).
     //   append the returned data to the array of characters (class variable);
     // }
  // }

//}


module.exports = Mortality;
