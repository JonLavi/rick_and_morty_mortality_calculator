const PubSub = require('../helpers/pub_sub.js');

const StatCalculator = function () {
  this.characters = [];
}

StatCalculator.prototype.bindEvents = function () {
  PubSub.subscribe('Mortality:character-stats-ready', (event) => {
    this.characters = event.detail;
    console.log('characters have arrived:', this.characters);
    this.processData();
  });
};


StatCalculator.prototype.processData = function () {
  // this.findRicks()
  // this.findMortys()
  // this.findStatus(characters)
  // this.survivalRate(characters)
  // this.numberOfEpisodes(characters)
  // this.numberOfDimensions()
};

StatCalculator.prototype.methodName = function () {

};


StatCalculator.prototype.findRicks = function (characters) {
  // return characters.filter(character => character.name.includes('Rick'));
};

StatCalculator.prototype.findMortys = function () {
  console.log(`processing mortys:`, this.characters);
  console.log(typeof(this.characters))
  const listOfMortys = this.characters.filter(character => character.name.includes('Morty'));
  console.log('list of mortys:', listOfMortys);
};



module.exports = StatCalculator;
