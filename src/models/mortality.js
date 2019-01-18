const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Mortality = function (){
 this.characters = null;
};


Mortality.prototype.getData = function () {
  const url = 'https://rickandmortyapi.com/api/character/';
  const requestHelper = new RequestHelper(url);
  const dataPromise = requestHelper.get();
  dataPromise.then((data) => {
    this.characters = data.results;
    console.log(data);
    this.processData();
    PubSub.publish('Mortality:character-data-ready',this.data);
  });
  dataPromise.catch((err) => {
  console.error(err)
  });
};

Mortality.prototype.processData = function () {
  this.findRicks()
  // this.findStatusRicks()
  this.findMortys()
  // this.findStatusMortys()
  // this.survivalRateRicks()
  // this.survivalRateMortys()
  // this.numberOfEpisodesRicks()
  // this.numberOfEpisodesMortys()
  // this.numberOfUniversesRicks()
  // this.numberOfUniversesMortys()
};

Mortality.prototype.findRicks = function () {
  console.log(typeof this.characters);
  const listOfRicks = this.characters.filter(character => character.name.includes('Rick'));
  console.log(listOfRicks);
};


Mortality.prototype.findMortys = function () {
  console.log(typeof this.characters);
  const listOfMortys = this.characters.filter(character => character.name.includes('Morty'));
  console.log(listOfMortys);
};

module.exports = Mortality;
