const PubSub = require('../helpers/pub_sub.js');

const dummyStats = [
  {
    "name": "Rick",
    "deathCount": 1,
    "aliveCount": 2,
    "unknownCount": 0,
    "mortalityRate": 50,
    "list": ['Earth','Earth (C-137)']
  },
  {
    "name": "Morty",
    "deathCount": 50,
    "aliveCount": 200,
    "unknownCount": 1,
    "mortalityRate": 20,
    "list": ['Earth', 'Unknown']
  }
]

const StatCalculator = function () {
  this.characters = [];
}

StatCalculator.prototype.bindEvents = function () {
  PubSub.subscribe('Mortality:character-list-ready', (event) => {
    this.characters = event.detail;
    // console.log('characters have arrived:', this.characters);
    // this.processData();
    PubSub.publish('StatCalculator:character-stats-ready', dummyStats);
  });
};



module.exports = StatCalculator;
